# api/models.py
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
import uuid
from datetime import timedelta


# =====================================================
# Helper function (safe for migrations)
# =====================================================
def generate_token():
    return uuid.uuid4().hex


# =====================================================
# TEAM USER (Manager / Sales)
# =====================================================
class TeamUser(models.Model):
    """
    Team members (manager / sales). Username is optional until the user sets
    their password during the password-setup flow.
    """
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=(("manager", "Manager"), ("sales", "Sales")))
    password = models.CharField(max_length=255, null=True, blank=True)
    is_password_set = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)   # becomes True once password is set
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.is_password_set = True
        self.is_active = True
        self.save(update_fields=["password", "is_password_set", "is_active", "updated_at"])

    def check_password(self, raw_password) -> bool:
        if not self.password:
            return False
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.name} <{self.email}>"


# =====================================================
# PASSWORD SETUP TOKEN
# =====================================================
class PasswordSetupToken(models.Model):
    user_email = models.EmailField()
    token = models.CharField(max_length=255, unique=True, default=generate_token)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self) -> bool:
        return timezone.now() - self.created_at < timedelta(days=1)

    def __str__(self):
        return f"PasswordSetupToken({self.user_email})"


# =====================================================
# Exhibitor Registration
# =====================================================
class ExhibitorRegistration(models.Model):
    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=200, blank=True)
    designation = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    contact_number = models.CharField(max_length=50, blank=True)
    product = models.CharField(max_length=255, blank=True)
    address = models.TextField(blank=True)
    company_logo = models.ImageField(upload_to="exhibitor_logos/", null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=(
            ("pending", "Pending"),
            ("contacted", "Contacted"),
            ("paid", "Paid"),
            ("rejected", "Rejected"),
        ),
        default="pending",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.company_name} ({self.contact_person})"


# =====================================================
# Visitor Registration
# =====================================================
class VistorRegistration(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150, blank=True)
    company = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    industry_interest = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Visitor Registrations"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} <{self.email}>"


# =====================================================
# Category
# =====================================================
class Category(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=64, blank=True)  # emoji or icon name
    image = models.ImageField(upload_to="categories/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


# =====================================================
# Event
# =====================================================
class Event(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    time = models.CharField(max_length=120, blank=True)
    exhibitors = models.PositiveIntegerField(default=0)
    buyers = models.PositiveIntegerField(default=0)
    countries = models.PositiveIntegerField(default=0)
    sectors = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return self.title


# =====================================================
# Gallery Image
# =====================================================
class GalleryImage(models.Model):
    TYPE_CHOICES = (
        ("carousel", "Carousel"),
        ("banner", "Banner"),
        ("gallery", "Gallery"),
        ("exhibitor", "Exhibitor"),
    )

    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="gallery/")
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="gallery")
    display_order = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title or f"Image {self.pk}"
