from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User


# class ExhibitorRegistrationViewSet(viewsets.ModelViewSet):
#     queryset = ExhibitorRegistration.objects.all()
#     serializer_class = ExhibitorRegistrationSerializer

#     def get_permissions(self):
#         if self.action in ['create']:
#             return [permissions.AllowAny()]  # Public can submit forms
#         return [permissions.IsAdminUser()]  # Only admin can view/list


# class VisitorRegistrationViewSet(viewsets.ModelViewSet):
#     queryset = VistorRegistration.objects.all()
#     serializer_class = VisitorRegistrationSerializer

#     def get_permissions(self):
#         if self.action in ['create']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]


# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
# def me(request):
#     user = request.user
#     return Response({
#         'username': user.username,
#         'is_staff': user.is_staff,
#         'is_superuser': user.is_superuser
#     })


class AdminTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

# Optional: Create admin user if doesn't exist
@api_view(['POST'])
@permission_classes([AllowAny])
def create_admin_user(request):
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        return Response({'message': 'Admin user created'})
    return Response({'message': 'Admin user already exists'})


class ExhibitorRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ExhibitorRegistration.objects.all().order_by('-created_at')
    serializer_class = ExhibitorRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class VisitorRegistrationViewSet(viewsets.ModelViewSet):
    queryset = VistorRegistration.objects.all().order_by('-created_at')
    serializer_class = VisitorRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-start_date')
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny] 

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer
    permission_classes = [permissions.IsAuthenticated]



