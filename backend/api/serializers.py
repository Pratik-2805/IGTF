# api/serializers.py
from rest_framework import serializers
from .models import (
    ExhibitorRegistration,
    VisitorRegistration,
    Category,
    Event,
    GalleryImage,
    User,
)

class ExhibitorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExhibitorRegistration
        fields = '__all__'
        read_only_fields = ('id','created_at','updated_at')

    def validate_email_address(self, value):
        if not value:
            raise serializers.ValidationError("Email address is required")
        return value.lower()
    
    def validate_contact_number(self, value):
        if not value:
            raise serializers.ValidationError("Contact number is required")
        cleaned = ''.join(filter(str.isdigit, value))
        if len(cleaned) < 10:
            raise serializers.ValidationError("Contact number must be at least 10 digits")
        return value


class VisitorRegistrationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='First_name')
    last_name = serializers.CharField(source='Last_name')
    phone_number = serializers.CharField(source='contact_number')
    industry_interest = serializers.CharField(source='industry')

    class Meta:
        model = VisitorRegistration
        fields = (
            'id', 'first_name', 'last_name', 'company_name', 'email_address',
            'phone_number', 'industry_interest', 'created_at', 'updated_at'
        )
        read_only_fields = ('id','created_at','updated_at')

    def validate_email_address(self, value):
        if not value:
            raise serializers.ValidationError("Email address is required")
        return value.lower()

    def validate_contact_number(self, value):
        if not value:
            raise serializers.ValidationError("Contact number is required")
        cleaned = ''.join(filter(str.isdigit, value))
        if len(cleaned) < 10:
            raise serializers.ValidationError("Contact number must be at least 10 digits")
        return value


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon', 'image', 'created_at', 'updated_at']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'image', 'type', 'display_order', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'is_active', 'is_password_set', 'created_at']
        read_only_fields = ['id', 'is_active', 'is_password_set', 'created_at']
