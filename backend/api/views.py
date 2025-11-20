# api/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User as DjangoUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.conf import settings
import random

from .models import (
    ExhibitorRegistration,
    VistorRegistration,
    Category,
    Event,
    GalleryImage,
    TeamUser,
    PasswordSetupToken
)
from .serializers import (
    ExhibitorRegistrationSerializer,
    VisitorRegistrationSerializer,
    CategorySerializer,
    EventSerializer,
    GalleryImageSerializer,
    TeamUserSerializer
)
from .utils import AdminTokenObtainPairSerializer, create_token_for_teamuser

# Keep AdminToken view (Django User)
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer
    permission_classes = [AllowAny]


# Create superuser bootstrap endpoint (optional)
@api_view(['POST'])
@permission_classes([AllowAny])
def create_admin_user(request):
    if DjangoUser.objects.filter(username='admin').exists():
        return Response({'message': 'Admin user already exists'})

    DjangoUser.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123'
    )
    return Response({'message': 'Admin user created'})


# -----------------------
# TEAM: create team member (invite flow)
# -----------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team_user(request):
    if not getattr(request.user, 'is_superuser', False) and not getattr(request.user, 'is_staff', False):
        return Response({"detail": "Only admin/staff can create team members."}, status=403)

    name = request.data.get("name")
    email = request.data.get("email")
    role = request.data.get("role")

    if not (name and email and role):
        return Response({"detail": "Name, email & role required"}, status=400)

    if role not in ["manager", "sales"]:
        return Response({"detail": "Invalid role"}, status=400)

    if TeamUser.objects.filter(email=email).exists():
        return Response({"detail": "User already exists"}, status=400)

    # Create inactive team user
    user = TeamUser.objects.create(
        name=name,
        email=email,
        role=role,
        is_active=False,
        is_password_set=False
    )

    # Password setup token
    token_obj = PasswordSetupToken.objects.create(user_email=email)

    # 🔥 Use frontend URL from .env
    frontend = settings.FRONTEND_URL.rstrip("/")
    setup_link = f"{frontend}/create-password?token={token_obj.token}"

    # Send email
    send_mail(
        "Set Your Password",
        f"Hello {name},\nUse the link below to set your password:\n{setup_link}\n(This link expires in 1 hour.)",
        "no-reply@yourapp.com",
        [email]
    )

    return Response({
        "message": "Team member created & invitation email sent",
        "email": email,
        "role": role,
        "status": "inactive"
    })


# -----------------------
# Team list (only viewable by Django admin/staff)
# -----------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_team_users(request):
    if not getattr(request.user, 'is_superuser', False) and not getattr(request.user, 'is_staff', False):
        return Response({"detail": "Only admin/staff can view team."}, status=403)

    users = TeamUser.objects.all()

    data = [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "role": u.role,
        "status": "active" if u.is_password_set else "inactive"
    } for u in users]

    return Response(data)


# -----------------------
# DELETE team user
# -----------------------
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_team_user(request, user_id):
    if not getattr(request.user, 'is_superuser', False) and not getattr(request.user, 'is_staff', False):
        return Response({"detail": "Access denied"}, status=403)

    try:
        u = TeamUser.objects.get(id=user_id)
    except TeamUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    u.delete()
    return Response({"message": "Team member removed"})


# -----------------------
# OTP FLOW (temporary in-memory store) — replace with Redis in prod
# -----------------------
OTP_STORE = {}  # { email: otp }


@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    email = request.data.get("email")
    token = request.data.get("token")

    if not (email and token):
        return Response({"detail": "Email and token are required."}, status=400)

    # Validate token
    try:
        token_obj = PasswordSetupToken.objects.get(token=token)
    except PasswordSetupToken.DoesNotExist:
        return Response({"detail": "Invalid or expired link."}, status=400)

    if token_obj.user_email != email:
        return Response({"detail": "Email does not match invitation."}, status=403)

    # Generate OTP
    otp = random.randint(100000, 999999)
    OTP_STORE[email] = otp

    send_mail(
        "Your OTP Code",
        f"Your OTP is {otp}",
        "no-reply@yourapp.com",
        [email]
    )

    return Response({"message": "OTP sent"})


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response({"detail": "Email and OTP required"}, status=400)

    if OTP_STORE.get(email) != int(otp):
        return Response({"detail": "Invalid OTP"}, status=400)

    return Response({"message": "OTP verified"})


# -----------------------
# CREATE PASSWORD (final step for team user)
# -----------------------
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
@permission_classes([AllowAny])
def create_password(request):
    email = request.data.get("email")
    otp = request.data.get("otp")
    password = request.data.get("password")
    token = request.data.get("token")

    if not (email and otp and password and token):
        return Response({"detail": "Missing required fields"}, status=400)

    # OTP must match
    if OTP_STORE.get(email) != int(otp):
        return Response({"detail": "Invalid OTP"}, status=400)

    # Token must be valid
    try:
        token_obj = PasswordSetupToken.objects.get(token=token)
    except PasswordSetupToken.DoesNotExist:
        return Response({"detail": "Invalid link"}, status=400)

    if token_obj.user_email != email:
        return Response({"detail": "Email mismatch"}, status=403)

    if not token_obj.is_valid():
        return Response({"detail": "Token expired"}, status=400)

    # Find TeamUser
    try:
        user = TeamUser.objects.get(email=email)
    except TeamUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    # Activate user + set password
    user.set_password(password)

    # Cleanup
    OTP_STORE.pop(email, None)
    token_obj.delete()

    return Response({"message": "Password created successfully!"})


# -----------------------
# Team login (Manager / Sales)
# -----------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def team_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not (email and password):
        return Response({"detail": "Email & password required"}, status=400)

    try:
        user = TeamUser.objects.get(email=email)
    except TeamUser.DoesNotExist:
        return Response({"detail": "Invalid credentials"}, status=400)

    if not user.is_password_set:
        return Response({"detail": "Password not set"}, status=400)

    if not user.check_password(password):
        return Response({"detail": "Invalid credentials"}, status=400)

    tokens = create_token_for_teamuser(user)
    return Response({
        "refresh": tokens['refresh'],
        "access": tokens['access'],
        "role": user.role,
        "name": user.name,
        "email": user.email
    })


# -----------------------
# Existing CRUD APIs (unchanged semantics)
# -----------------------
class ExhibitorRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ExhibitorRegistration.objects.all().order_by('-created_at')
    serializer_class = ExhibitorRegistrationSerializer
    permission_classes = [AllowAny]


class VisitorRegistrationViewSet(viewsets.ModelViewSet):
    queryset = VistorRegistration.objects.all().order_by('-created_at')
    serializer_class = VisitorRegistrationSerializer
    permission_classes = [AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def post(self, request):
        image = request.FILES.get("image")
        if not image:
            return Response({"detail": "Image required"}, status=400)
        obj = Category.objects.create(image=image, name=request.data.get('name', ''))
        return Response({"url": obj.image.url})


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-start_date')
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer
    permission_classes = [AllowAny]
