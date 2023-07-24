from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .serializer import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer

class SignUp(GenericAPIView):
    serializer_class = UserCreateSerializer
    def post(self, request): 
        data = request.data.copy()
        
        serializer = self.serializer_class(data=data)

        if not serializer.is_valid():
            return Response({'message': serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        print(serializer,"data")
        user = serializer.save()
        # user = serializer.create(serializer.validated_data)
        # user = UserAccount.objects.create_user(**data)
        response = {
            "message" : "Successfully registered",
            "email" : user.email,
            "name":user.name
        }
        return Response(response, status=status.HTTP_201_CREATED)

class Login(GenericAPIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format = None):
        # data = request.data
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception = True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email = email,password = password)
            print(user)
            print(email)
            print(password)
 

            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({'message':'Successfully Logged In','access' : str(refresh.access_token),'refresh':str(refresh)})
            
            else:
                return Response({'error':{'non_field_errors':['Email or Password is wrong']}},status = status.HTTP_400_BAD_REQUEST)
            

        

class Logout(APIView):
    def post(self,request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message':'Successfully logged out'}, status = status.HTTP_205_RESET_CONTENT)
        
        except Exception as e:
            return Response({'message':'Login first!'},status=status.HTTP_400_BAD_REQUEST)
        

class ViewInterns(APIView):

    def get(self, request):
        queryset = UserAccount.objects.filter(is_administrator = True, is_admin = False).all().order_by('-date_joined')
        serialized = UserSerializer(queryset, many=True)

        return Response(serialized.data)
    
class ViewAdministrator(APIView):

    def get(self, request):
        administrator = UserAccount.objects.filter(is_administrator = True)
class GetUser(APIView):

    def get(self, request):

        email = request.GET.get('email')
        user = UserAccount.objects.get(email=email)
        serializer = UserSerializer(user)
        print(request)
        return Response(serializer.data)


