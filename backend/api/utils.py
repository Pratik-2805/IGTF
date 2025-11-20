# api/utils.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

# ==========================================
# ADMIN TOKEN (Django superuser login)
# ==========================================
class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Creates JWT for Django Admin (superuser).
    Only clean fields are encoded INSIDE the token,
    not returned separately in the response.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Fields encoded into JWT
        token["user_id"] = user.id
        token["username"] = user.username
        token["role"] = "admin"

        return token

    # DO NOT override validate() — we want SimpleJWT default behaviour.


# ==========================================
# TEAM USER TOKEN (Manager / Sales)
# ==========================================
def create_token_for_teamuser(team_user):
    """
    Creates JWT for TeamUser. Both tokens contain:
    - user_id
    - username
    - role
    """

    refresh = RefreshToken.for_user(team_user)

    # Add custom claims to refresh token
    refresh["user_id"] = team_user.id
    refresh["username"] = team_user.username
    refresh["role"] = team_user.role

    # Access token also contains same fields
    access = refresh.access_token
    access["user_id"] = team_user.id
    access["username"] = team_user.username
    access["role"] = team_user.role

    return {
        "refresh": str(refresh),
        "access": str(access),
    }
