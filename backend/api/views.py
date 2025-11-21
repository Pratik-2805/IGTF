# api/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.core.mail import send_mail
from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone
from django.conf import settings
from .utils import upload_to_s3, delete_from_s3

import random
import uuid
from datetime import timedelta

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    ExhibitorRegistration,
    VisitorRegistration,
    Category,
    Event,
    GalleryImage,
    PasswordSetupToken,
)
from .serializers import (
    ExhibitorRegistrationSerializer,
    VisitorRegistrationSerializer,
    CategorySerializer,
    EventSerializer,
    GalleryImageSerializer,
)
from .utils import CustomTokenObtainPairSerializer, create_tokens_for_user

User = get_user_model()

# =====================================================================
# LOGIN (Single JWT serializer for ALL users)
# =====================================================================
class LoginView(TokenObtainPairView):
    """
    Uses CustomTokenObtainPairSerializer which injects user_id, username,
    email, role into token and response.
    """
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]


@api_view(['POST'])
@permission_classes([AllowAny])
def create_admin_user(request):
    """Creates default admin once (if not exists)."""
    if User.objects.filter(username='admin').exists():
        return Response({'message': 'Admin user already exists'})

    # Create using create_superuser to ensure proper flags
    User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123',
        role='admin'
    )
    return Response({'message': 'Admin user created'})


# =====================================================================
# TEAM USER MANAGEMENT (now using unified User model)
# =====================================================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_team_user(request):
    """Admin-only: Create team member & send password setup email."""
    # require admin role
    if not getattr(request.user, "role", None) == "admin" and not request.user.is_superuser:
        return Response({"detail": "Only admin can create team members"}, status=403)

    name = request.data.get("name")
    email = request.data.get("email")
    role = request.data.get("role")

    if not (name and email and role):
        return Response({"detail": "Name, email & role required"}, status=400)

    if role not in ["manager", "sales"]:
        return Response({"detail": "Invalid role"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"detail": "User already exists"}, status=400)

    # Create inactive user with temporary username; they will set real username during password setup
    temp_username = f"pending_{uuid.uuid4().hex[:8]}"
    user = User.objects.create(
        username=temp_username,
        email=email,
        first_name=name,
        role=role,
        is_active=False,
        is_password_set=False
    )
    user.save()

    # Create token linked to user
    token_obj = PasswordSetupToken.objects.create(user=user)

    # Link to frontend
    frontend = settings.FRONTEND_URL.rstrip("/")
    setup_link = f"{frontend}/create-password?token={token_obj.token}"

    # Send email
    send_mail(
        "Set Your Password",
        f"Hello {name},\nUse this link to set your password:\n{setup_link}\nThis link expires in 24 hours.",
        "no-reply@yourapp.com",
        [email]
    )

    return Response({
        "message": "Team member created, invitation sent",
        "email": email,
        "role": role
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_team_users(request):
    """List all non-admin team users (managers & sales)."""
    if not getattr(request.user, "role", None) == "admin" and not request.user.is_superuser:
        return Response({"detail": "Only admin can view team"}, status=403)

    users = User.objects.filter(role__in=["manager", "sales"]).order_by("-date_joined")
    data = [{
        "id": u.id,
        "name": u.get_full_name() or u.username,
        "username": u.username,
        "email": u.email,
        "role": u.role,
        "status": "active" if u.is_password_set else "inactive"
    } for u in users]

    return Response(data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_team_user(request, user_id):
    if not getattr(request.user, "role", None) == "admin" and not request.user.is_superuser:
        return Response({"detail": "Access denied"}, status=403)

    try:
        user = User.objects.get(id=user_id, role__in=["manager", "sales"])
        user.delete()
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    return Response({"message": "Team member removed"})


# =====================================================================
# OTP FLOW (Improved)
# =====================================================================

# OTP_STORE = { email: { "otp": 123456, "created_at": datetime } }
OTP_STORE = {}


@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    email = request.data.get("email")
    token = request.data.get("token")

    if not (email and token):
        return Response({"detail": "Email & token required"}, status=400)

    try:
        token_obj = PasswordSetupToken.objects.get(token=token)
    except PasswordSetupToken.DoesNotExist:
        return Response({"detail": "Invalid or expired link"}, status=400)

    # token linked to user; verify email matches
    if token_obj.user.email != email:
        return Response({"detail": "Email does not match invitation"}, status=403)

    # Generate OTP
    otp = random.randint(100000, 999999)
    OTP_STORE[email] = {
        "otp": otp,
        "created_at": timezone.now()
    }

    send_mail(
        "Your OTP Code",
        f"Your OTP is {otp}. It expires in 5 minutes.",
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
        return Response({"detail": "Email & OTP required"}, status=400)

    entry = OTP_STORE.get(email)

    if not entry:
        return Response({"detail": "OTP not found"}, status=400)

    # Check expiry
    if timezone.now() > entry["created_at"] + timedelta(minutes=5):
        OTP_STORE.pop(email, None)
        return Response({"detail": "OTP expired"}, status=400)

    if entry["otp"] != int(otp):
        return Response({"detail": "Invalid OTP"}, status=400)

    return Response({"message": "OTP verified"})


# =====================================================================
# PASSWORD CREATION (accepts username)
# =====================================================================

@api_view(['POST'])
@permission_classes([AllowAny])
def create_password(request):
    """
    Expected body:
    {
      "email": "...",
      "otp": "123456",
      "password": "newpass",
      "token": "invite-token",
      "username": "desired_username"
    }
    """

    email = request.data.get("email")
    otp = request.data.get("otp")
    password = request.data.get("password")
    token = request.data.get("token")
    username = request.data.get("username")

    if not (email and otp and password and token and username):
        return Response({"detail": "Missing required fields (email, otp, password, token, username)"}, status=400)

    # OTP VALIDATION
    entry = OTP_STORE.get(email)
    if not entry:
        return Response({"detail": "OTP not found"}, status=400)

    if timezone.now() > entry["created_at"] + timedelta(minutes=5):
        OTP_STORE.pop(email, None)
        return Response({"detail": "OTP expired"}, status=400)

    if entry["otp"] != int(otp):
        return Response({"detail": "Invalid OTP"}, status=400)

    # TOKEN VALIDATION (1 DAY)
    try:
        token_obj = PasswordSetupToken.objects.get(token=token)
    except PasswordSetupToken.DoesNotExist:
        return Response({"detail": "Invalid link"}, status=400)

    # token_obj.user is the FK to User
    if token_obj.user.email != email:
        return Response({"detail": "Email mismatch"}, status=403)

    if not token_obj.is_valid():
        return Response({"detail": "Link expired"}, status=400)

    # SET PASSWORD + USERNAME
    user = token_obj.user

    # Check username uniqueness across users (exclude current user)
    if User.objects.filter(username=username).exclude(id=user.id).exists():
        return Response({"detail": "Username already taken"}, status=400)

    user.username = username
    user.set_password(password)
    user.mark_password_set()
    user.save()

    # Cleanup
    OTP_STORE.pop(email, None)
    token_obj.delete()

    # Optionally return tokens immediately so frontend can redirect/log in
    tokens = create_tokens_for_user(user)

    return Response({
        "message": "Password created successfully",
        "refresh": tokens["refresh"],
        "access": tokens["access"],
        "role": user.role,
        "username": user.username,
        "email": user.email
    })


# =====================================================================
# UNIVERSAL LOGIN (username + password) -> supports admin & team users
# =====================================================================

@api_view(['POST'])
@permission_classes([AllowAny])
def universal_login(request):
    """
    Single login endpoint that accepts:
    { "username": "...", "password": "..." }
    Uses Django authenticate() which works with the unified User model.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not (username and password):
        return Response({"detail": "Username & password required"}, status=400)

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"detail": "Invalid username or password"}, status=400)

    tokens = create_tokens_for_user(user)

    return Response({
        "refresh": tokens["refresh"],
        "access": tokens["access"],
        "role": user.role if not user.is_superuser else "admin",
        "name": user.get_full_name() or user.username,
        "email": user.email
    })


# =====================================================================
# Legacy team_login kept for compatibility (accepts email OR username)
# =====================================================================

@api_view(['POST'])
@permission_classes([AllowAny])
def team_login(request):
    """
    Legacy: supports either:
    - { "email": "...", "password": "..." }
    - { "username": "...", "password": "..." }
    """
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")

    if not password or (not email and not username):
        return Response({"detail": "Email/username & password required"}, status=400)

    try:
        if email:
            user = User.objects.get(email=email)
        else:
            user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"detail": "Invalid credentials"}, status=400)

    # ensure password set
    if not user.is_password_set:
        return Response({"detail": "Password not set"}, status=400)

    # check password
    if not user.check_password(password):
        return Response({"detail": "Invalid credentials"}, status=400)

    tokens = create_tokens_for_user(user)

    return Response({
        "refresh": tokens['refresh'],
        "access": tokens['access'],
        "role": user.role,
        "name": user.get_full_name() or user.username,
        "email": user.email
    })


# =====================================================================
# CRUD VIEWSETS
# =====================================================================

class ExhibitorRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ExhibitorRegistration.objects.all().order_by('-created_at')
    serializer_class = ExhibitorRegistrationSerializer
    permission_classes = [AllowAny]


class VisitorRegistrationViewSet(viewsets.ModelViewSet):
    queryset = VisitorRegistration.objects.all().order_by('-created_at')
    serializer_class = VisitorRegistrationSerializer
    permission_classes = [AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    http_method_names = ['get', 'post', 'delete']

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        file_obj = request.FILES.get("image")
        if file_obj:
            url = upload_to_s3(file_obj, folder="categories")
            data["image"] = url

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def perform_destroy(self, instance):
        if instance.image:
            delete_from_s3(instance.image)
        instance.delete()


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-start_date')
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        file_obj = request.FILES.get("image")
        if file_obj:
            url = upload_to_s3(file_obj, folder="gallery")
            data["image"] = url

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()

        file_obj = request.FILES.get("image")

        if file_obj:
            # delete old image
            if instance.image:
                delete_from_s3(instance.image)

            # upload new one
            url = upload_to_s3(file_obj, folder="gallery")
            data["image"] = url

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def perform_destroy(self, instance):
        if instance.image:
            delete_from_s3(instance.image)
        instance.delete()
