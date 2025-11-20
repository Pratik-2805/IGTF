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

    ExhibitorRegistrationViewSet,
    VisitorRegistrationViewSet,
    CategoryViewSet,
    EventViewSet,
    GalleryImageViewSet,
)
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'exhibitor-registrations', ExhibitorRegistrationViewSet, basename='exhibitor-registration')
router.register(r'visitor-registrations', VisitorRegistrationViewSet, basename='visitor-registration')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'events', EventViewSet, basename='event')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')

urlpatterns = [
    # JWT
    path('api/token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view()),

    # Admin bootstrap
    path('api/create-admin/', create_admin_user),

    # Team management
    path('api/team/create/', create_team_user),
    path('api/team/list/', list_team_users),
    path('api/team/delete/<int:user_id>/', delete_team_user),

    # Password creation flow
    path('api/password/send-otp/', send_otp),
    path('api/password/verify-otp/', verify_otp),
    path('api/password/create/', create_password),

    path('api/', include(router.urls)),
]
