from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model,authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from .models import *
from .authorization import *
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator

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
        fields = [ 'id','email', 'password']
    


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        exclude = ("password",)

class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    def get_image(self, user):
        if user.image:
            print(user.image)
            image_url = user.image.url
            print(image_url)
            if image_url.startswith('/media/media'):
                image_url = image_url.replace('/media/media', '/media')
                print(image_url)
            return image_url
        else:
            return None
    class Meta:
        model = UserAccount
        exclude = ("password",) 


class BatchCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Batch
        fields = '__all__'

class BatchEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['batch_num','is_active']

class InternCreateSerializer(serializers.ModelSerializer):

    is_cc = serializers.BooleanField(default=False)
    is_mentor = serializers.BooleanField(default=False)
    is_sc = serializers.BooleanField(default=False)

    class Meta:
        model = Intern
        fields = ['id','user','batch_id','is_cc','is_mentor','is_sc']

    def create(self,validated_data):
        print(validated_data)
        user_data = validated_data.get('user')
        print(user_data,validated_data.get('user'))
        batch_id = validated_data.get('batch_id')
        
        user_account = UserAccount.objects.get(email = user_data)

        user_account.is_cc = validated_data.get('is_cc', False)
        user_account.is_mentor = validated_data.get('is_mentor', False)
        user_account.is_sc = validated_data.get('is_sc', False)

        user_account.is_administrator = False

        user_account.save()

        intern = Intern.objects.create(user = user_account, batch_id = batch_id)

        

        return intern
    

class InternEditSerializer(serializers.ModelSerializer):
    is_cc = serializers.BooleanField(default=False)
    is_mentor = serializers.BooleanField(default=False)
    is_sc = serializers.BooleanField(default=False)

    class Meta:
        model = Intern
        fields = ['id', 'user', 'batch_id', 'is_cc', 'is_mentor', 'is_sc']

    def update(self, data, validated_data):
        user_data = validated_data.pop('user')

        data.user.is_cc = validated_data.get('is_cc', False)
        data.user.is_mentor = validated_data.get('is_mentor', False)
        data.user.is_sc = validated_data.get('is_sc', False)

        data.user.save()

        data.batch_is = validated_data.get('batch_id', data.batch_id)

        data.save()

        return data
 
class TaskCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tasks
        fields = '__all__'

class TaskUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tasks
        fields = '__all__'

class InternDetailSerializer (serializers.ModelSerializer) :

    user = UserSerializer()
    batch_id = BatchCreateSerializer()

    class Meta:
        model = Intern
        fields = '__all__'


class SetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    uid = serializers.CharField()
    token = serializers.CharField()
    class Meta:
        fields = '__all__'

    def validate(self, attrs):
        password = attrs.get('password')
        token = attrs.get('token')
        uid = attrs.get('uid')
        if uid and token:
            uid_decoded = force_str(urlsafe_base64_decode(uid))
            user = UserAccount.objects.get(id = uid_decoded)
            attrs['user_id'] = uid_decoded
            # Validate the token and decode
            # is_token_valid = default_token_generator.check_token(user, token)
            token_generator = CustomToken()
            is_token_valid = token_generator.check_token(user,token)
            if is_token_valid:
                try:
                    validate_password(password, user)
                except exceptions.ValidationError as e:
                    serializer_errors = serializers.as_serializer_error(e)
                    raise exceptions.ValidationError(
                        {"password": serializer_errors["errors"]}
                    )
                return attrs
            else: 
                raise exceptions.ValidationError('Invalid token')


         


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