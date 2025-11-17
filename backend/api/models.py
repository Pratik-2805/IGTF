from django.db import models
from django.utils import timezone


class ExhibitorRegistration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('contacted', 'Contacted'),
        ('paid', 'Paid'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    company_name = models.CharField(max_length=255, verbose_name="Company Name")
    contact_person_name = models.CharField(max_length=255, verbose_name="Contact Person Name")
    designation = models.CharField(max_length=255, verbose_name="Designation")
    email_address = models.EmailField(verbose_name="Email Address")
    contact_number = models.CharField(max_length=20, verbose_name="Contact Number")
    product_service = models.CharField(max_length=255, verbose_name="Product/Service")
    company_address = models.TextField(verbose_name="Company Address")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Exhibitor Registration"
        verbose_name_plural = "Exhibitor Registrations"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.company_name} - {self.contact_person_name}"
    
class VistorRegistration(models.Model):
    First_name = models.CharField(max_length=255, verbose_name="Firts Name")
    Last_name = models.CharField(max_length=255, verbose_name="Last Name")
    company_name = models.CharField(max_length=255, verbose_name="Company Name")
    email_address = models.EmailField(verbose_name="Email Address")
    contact_number = models.CharField(max_length=20, verbose_name="Contact Number")
    industry = models.CharField(max_length=255, verbose_name="Industry")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Visitor Registration"
        verbose_name_plural = "Visitor Registrations"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.First_name} {self.Last_name} - {self.company_name}"
    

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=10)  # For emoji icons
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Event(models.Model):
    title = models.CharField(max_length=200)
    location = models.TextField()
    venue = models.CharField(max_length=200, default="")  # Add this field
    start_date = models.DateField()
    end_date = models.DateField()
    time_schedule = models.CharField(max_length=100, default="10:00 AM - 7:00 PM")  # Rename from 'time'
    exhibitors_count = models.CharField(max_length=50, default="400+")  # Change from IntegerField
    buyers_count = models.CharField(max_length=50, default="6000+")  # Change from IntegerField
    countries_count = models.CharField(max_length=50, default="40+")  # Change from IntegerField
    sectors_count = models.CharField(max_length=50, default="16")  # Change from IntegerField
    is_active = models.BooleanField(default=True)  # Add this field
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['start_date']

class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Gallery Images"