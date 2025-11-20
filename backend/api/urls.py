# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminTokenObtainPairView,
    create_admin_user,
    create_team_user,
    list_team_users,
    delete_team_user,
    send_otp,
    verify_otp,
    create_password,
    team_login,                     # FIXED: Correct login function
    ExhibitorRegistrationViewSet,
    VisitorRegistrationViewSet,
    CategoryViewSet,
    EventViewSet,
    GalleryImageViewSet
)

router = DefaultRouter()
router.register(r'exhibitor-registrations', ExhibitorRegistrationViewSet, basename='exhibitor')
router.register(r'visitor-registrations', VisitorRegistrationViewSet, basename='visitor')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'events', EventViewSet, basename='events')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')

urlpatterns = [
    # Admin login
    path('api/token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Bootstrap admin creation
    path('api/create-admin/', create_admin_user),

    # Team user management
    path('api/team/create/', create_team_user),
    path('api/team/list/', list_team_users),
    path('api/team/delete/<int:user_id>/', delete_team_user),

    # Password setup flow
    path('api/password/send-otp/', send_otp),
    path('api/password/verify-otp/', verify_otp),
    path('api/password/create/', create_password),

    # Team login (Manager/Sales)
    path('api/team/login/', team_login),

    # Default router mappings
    path('api/', include(router.urls)),
]
