from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model,authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *


class UserCreateSerializer(serializers.ModelSerializer):
    company = serializers.CharField()   
    class Meta:
        model = UserAccount
        fields = ("name", "email","company", "password")

    def validate(self, data):
        user = UserAccount(name=data["name"],email=data['email'],password=data['password'])
        password = data.get("password")

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {"password": serializer_errors["non_field_errors"]}
            )
       
        return data

    def create(self, validated_data):
        print(validated_data)
        user = UserAccount.objects.create_user(
            name=validated_data["name"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        print(user.id,validated_data["company"])
        admin = Administrator.objects.create(user_id=user.id,company=validated_data["company"])
        print(admin)
        return user

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta:
        model = UserAccount
        fields = ['email', 'password']


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    def get_image(self, user):
        if user.image:
            image_url = user.image.url
            if image_url.startswith('/media/media'):
                image_url = image_url.replace('/media/media', '/media')
            return image_url
        else:
            return None
    class Meta:
        model = UserAccount
        fields = "__all__" 

    # class Meta:
    #     model = UserAccount
    #     fields = (
    #         "id",
    #         "name",
    #         "email",
    #         "image"
    #     )

# class ImageSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
#     class Meta:
#         model = User
#         fields = '__all__'
#     def update(self, instance, validated_data):
#         if validated_data.get('image'):
#             instance.image.delete(save=False)
#         return super().update(instance, validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.name
        token['email'] = user.email
        token['id'] = user.id       
        token['image'] = "http://127.0.0.1:8000/api"+user.image.url if user.image else 'https://bootdey.com/img/Content/avatar/avatar7.png'
        
        return token