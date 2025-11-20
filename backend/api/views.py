from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.core.mail import send_mail
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    ExhibitorRegistration,
    VistorRegistration,
    Category,
    Event,
    GalleryImage,
    PasswordSetupToken
)
from .serializers import (
    ExhibitorRegistrationSerializer,
    VisitorRegistrationSerializer,
    CategorySerializer,
    EventSerializer,
    GalleryImageSerializer,
)
from .utils import CustomTokenObtainPairSerializer
import random


User = get_user_model()

# -------------------------------
# JWT Login for Admin/Manager/Sales
# -------------------------------
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]


# -------------------------------
# Optional: Create admin user
# -------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def create_admin_user(request):
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123'
        )
        return Response({'message': 'Admin user created'})
    return Response({'message': 'Admin user already exists'})


# -------------------------------------------------------
# ADMIN: Create Team Member (Inactive + Email Invite)
# -------------------------------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team_user(request):
    admin = request.user

    if admin.role != "admin":
        return Response({"detail": "Only admin can create team members."}, status=403)

    name = request.data.get("name")
    email = request.data.get("email")
    role = request.data.get("role")

    if not (name and email and role):
        return Response({"detail": "Name, email & role required"}, status=400)

    if role not in ["manager", "sales"]:
        return Response({"detail": "Invalid role"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"detail": "User already exists"}, status=400)

    # Create inactive user without password
    user = User.objects.create(
        username=email,
        email=email,
        name=name,
        role=role,
        is_active=False,
        is_password_set=False
    )

    # Create token for password setup
    token_obj = PasswordSetupToken.objects.create(user=user)

    # Send email with setup link
    setup_link = f"https://yourdomain.com/create-password?token={token_obj.token}"
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


# -------------------------------------------------------
# GET TEAM LIST
# -------------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_team_users(request):
    admin = request.user

    if admin.role != "admin":
        return Response({"detail": "Only admin can view team."}, status=403)

    users = User.objects.filter(role__in=["manager", "sales"])

    data = [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "role": u.role,
        "status": "active" if u.is_password_set else "inactive"
    } for u in users]

    return Response(data)


# -------------------------------------------------------
# DELETE TEAM USER
# -------------------------------------------------------
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_team_user(request, user_id):
    admin = request.user

    if admin.role != "admin":
        return Response({"detail": "Access denied"}, status=403)

    try:
        u = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    if u.role == "admin":
        return Response({"detail": "Cannot delete admin"}, status=400)

    u.delete()
    return Response({"message": "Team member removed"})


# -------------------------------------------------------
# OTP FLOW — SEND OTP
# -------------------------------------------------------
OTP_STORE = {}  # temporary memory store (replace with Redis for production)

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

    user = token_obj.user

    if user.email != email:
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


# -------------------------------------------------------
# OTP FLOW — VERIFY OTP
# -------------------------------------------------------
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


# -------------------------------------------------------
# CREATE PASSWORD — FINAL STEP
# -------------------------------------------------------
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

    user = token_obj.user

    if user.email != email:
        return Response({"detail": "Email mismatch"}, status=403)

    if not token_obj.is_valid():
        return Response({"detail": "Token expired"}, status=400)

    # Activate user + set password
    user.password = make_password(password)
    user.is_active = True
    user.is_password_set = True
    user.save()

    # Cleanup
    del OTP_STORE[email]
    token_obj.delete()

    return Response({"message": "Password created successfully!"})


# -------------------------------------------------------
# Existing CRUD APIs (leave unchanged)
# -------------------------------------------------------
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

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-start_date')
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer
    permission_classes = [AllowAny]
