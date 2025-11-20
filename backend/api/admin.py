from django.contrib import admin
from .models import (
    ExhibitorRegistration,
    VistorRegistration,
    Category,
    Event,
    GalleryImage,
    TeamUser,
    PasswordSetupToken
)

# ===============================
# TEAM USER
# ===============================
@admin.register(TeamUser)
class TeamUserAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "role", "is_active", "is_password_set", "created_at")
    search_fields = ("name", "email", "role")
    list_filter = ("role", "is_active", "is_password_set")
    readonly_fields = ("created_at", "updated_at")


# ===============================
# PASSWORD TOKEN
# ===============================
@admin.register(PasswordSetupToken)
class PasswordSetupTokenAdmin(admin.ModelAdmin):
    list_display = ("id", "user_email", "token", "created_at")
    search_fields = ("user_email", "token")
    readonly_fields = ("created_at",)


# ===============================
# EXHIBITOR REGISTRATION
# ===============================
@admin.register(ExhibitorRegistration)
class ExhibitorRegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "company_name",
        "contact_person",
        "email",
        "contact_number",
        "product",
        "status",
        "created_at",
    )
    list_filter = ("status",)
    search_fields = ("company_name", "contact_person", "email")
    readonly_fields = ("created_at",)


# ===============================
# VISITOR REGISTRATION
# ===============================
@admin.register(VistorRegistration)
class VistorRegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "first_name",
        "last_name",
        "company",
        "email",
        "phone",
        "industry_interest",
        "created_at",
    )
    search_fields = ("first_name", "last_name", "email", "company")
    list_filter = ("industry_interest",)
    readonly_fields = ("created_at",)


# ===============================
# CATEGORY
# ===============================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "icon", "created_at")
    search_fields = ("name",)
    readonly_fields = ("created_at",)


# ===============================
# EVENT
# ===============================
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "location",
        "start_date",
        "end_date",
        "is_published",
        "created_at",
    )
    list_filter = ("is_published", "start_date")
    search_fields = ("title", "location")
    readonly_fields = ("created_at",)


# ===============================
# GALLERY IMAGE
# ===============================
@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "type", "display_order", "created_at")
    list_filter = ("type",)
    search_fields = ("title",)
    readonly_fields = ("created_at",)
