from django.contrib import admin
from .models import *

@admin.register(ExhibitorRegistration)
class ExhibitorRegistrationAdmin(admin.ModelAdmin):
    list_display = ('company_name','contact_person_name','email_address','contact_number','product_service','created_at')
    readonly_fields = ('created_at','updated_at')
    ordering = ('-created_at',)

@admin.register(VistorRegistration)
class VistorRegistrationAdmin(admin.ModelAdmin):
    list_display = ('First_name','Last_name','company_name','email_address','contact_number','industry','created_at')
    readonly_fields = ('created_at','updated_at')
    ordering = ('-created_at',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'created_at']
    search_fields = ['name']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'start_date', 'end_date', 'is_active']
    list_filter = ['is_active', 'start_date']
    search_fields = ['title', 'location']

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title']