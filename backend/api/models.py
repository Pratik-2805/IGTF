import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from datetime import timedelta


# ---------------------------------------------------
# EXISTING MODELS (unchanged)
# ---------------------------------------------------
class ExhibitorRegistration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('contacted', 'Contacted'),
        ('paid', 'Paid'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    company_name = models.CharField(max_length=255)
    contact_person_name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    email_address = models.EmailField()
    contact_number = models.CharField(max_length=20)
    product_service = models.CharField(max_length=255)
    company_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.company_name} - {self.contact_person_name}"


class VistorRegistration(models.Model):
    First_name = models.CharField(max_length=255)
    Last_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    email_address = models.EmailField()
    contact_number = models.CharField(max_length=20)
    industry = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.First_name} {self.Last_name} - {self.company_name}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=10)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=200)
    location = models.TextField()
    venue = models.CharField(max_length=200, default="")
    start_date = models.DateField()
    end_date = models.DateField()
    time_schedule = models.CharField(max_length=100, default="10:00 AM - 7:00 PM")
    exhibitors_count = models.CharField(max_length=50, default="400+")
    buyers_count = models.CharField(max_length=50, default="6000+")
    countries_count = models.CharField(max_length=50, default="40+")
    sectors_count = models.CharField(max_length=50, default="16")
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_date']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Gallery Images"

    def __str__(self):
        return self.title


# ---------------------------------------------------
# CUSTOM USER FOR TEAM MANAGEMENT + ACTIVATION FLOW
# ---------------------------------------------------
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("manager", "Manager"),
        ("sales", "Sales"),
    )

    name = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="sales")

    # 🔥 important for activation system
    is_password_set = models.BooleanField(default=False)

    def __str__(self):
        return self.username


# ---------------------------------------------------
# PASSWORD SETUP TOKEN (expiry: 1 hour)
# ---------------------------------------------------
class PasswordSetupToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        return self.created_at >= timezone.now() - timedelta(hours=1)
