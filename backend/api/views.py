from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .serializer import *
from .models import *
from .authorization import *
from .signals import *
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

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
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception = True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email = email,password = password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                serialized_user =  UserSerializer                   (user)
                return Response({'message':'Successfully Logged In','access' : str(refresh.access_token),'refresh':str(refresh), 'data' : serialized_user.data})
            
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
        
# class CreateIntern(APIView) :
#     def post(self, request) : 
#         data = request.data
#         serializers = InternCreateSerializer.data

class ViewInterns(APIView):

    def get(self, request):

        interns = UserAccount.objects.filter(is_administrator = False, is_admin = False).all().order_by('-date_joined')
        serialized = UserSerializer(interns, many=True)

        return Response(serialized.data)
    
class ListMentors(APIView):

    def get(self, request):

        mentors = UserAccount.objects.filter(is_mentor = True, is_administrator = False, is_admin = False).all().order_by('-date_joined')
        serialized = UserSerializer(mentors, many = True)

        return Response(serialized.data)
    
class ListCC(APIView):

    def get(self, request):

        cc = UserAccount.objects.filter(is_cc = True, is_administrator = False, is_admin = False).all().order_by('-date_joined')
        serialized = UserSerializer(cc, many=True)

        return Response(serialized.data)
    
class ListSC(APIView):

    def get(self, request):

        sc = UserAccount.objects.filter(is_sc = True, is_administrator = False, is_admin = False).all().order_by('-date_joined')
        serialized = UserSerializer(sc, many=True)

        return Response(serialized.data)

    
class CreateBatch(APIView):

    def post(self, request):
        serializer = BatchCreateSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            print(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ViewBatch(APIView):
    def get(self,request):
        data = Batch.objects.all()
        serialized = BatchCreateSerializer(data, many=True)
        return Response(serialized.data)
    

class Editbatch(APIView):
    def patch(self, request, id):
        batch = Batch.objects.get(id=id)
        serializer = BatchEditSerializer(batch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteBatch(APIView):
    def delete(self,request, id):
        batch = Batch.objects.get(id=id)
        print(batch)
        batch.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    

class CreateIntern(APIView):
    def post(self,request):
        data = request.data.copy()
        email = data.pop('email')
        name = data.pop('name')
        user = UserAccount.objects.create(email = email,name=name)
        data['user'] = user.id
        serializer = InternCreateSerializer(data=data)

        if serializer.is_valid():
            intern = serializer.save()
            create_intern.send(sender=self.__class__, user=user)

            response_data = {
                'message':'New intern added.'
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            response_data = {
                'message':'Intern already exists'
            }
        return Response(response_data , status=status.HTTP_400_BAD_REQUEST)

    

class EditIntern(APIView):

    def patch(self,request, id):
        intern = Intern.objects.get(id=id)
        serializer = InternEditSerializer(intern, data=request.data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
class InternDetailView(APIView):
    def get(self, request, id):
        try:
            intern = Intern.objects.get(user_id=id)
        except Intern.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = InternDetailSerializer(intern)
        return Response(serializer.data)
    

class AssignTask(APIView):
    def post(self, request,format=None):
        print(1)
        serializer = TaskCreateSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print(3)
            task = Tasks.objects.create(**serializer.validated_data)
            task.save()
            return Response({'message': 'Task assigned to intern successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class TaskDetailsView(APIView):
    def get(self,request,id):
        try:
            tasks = Tasks.objects.filter(intern_id = id)
            serializer = TaskCreateSerializer(tasks, many=True)
            return Response(serializer.data)
        except Tasks.DoesNotExist:
            return Response({'message': 'No tasks found for the intern'}, status=status.HTTP_404_NOT_FOUND)

class TaskUpdateView(APIView):
    def post(self,request,id):
        task = Tasks.objects.get(id=id)
        serializer = TaskUpdateSerializer(task, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response({'message': 'Error occured'}, status=status.HTTP_400_BAD_REQUEST )
        
       
class SetPassword(APIView):

    def post(self, request, format=None):
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = UserAccount.objects.get(id=serializer.validated_data['user_id'])
            password = serializer.validated_data['password']

            user.set_password(password) 
            user.save()
            notification_email.send(sender=self.__class__, user=user)
            res = {
                "email":user.email,
                'message':"Password set successfully"
            }
            return Response(res,status=201)

        else:
            return Response(serializer.errors,status=400)





class GetUser(APIView):

    def get(self, request):

        id = request.query_params.get('id')
        print(id)
    
        user = UserAccount.objects.get(id=id)
        serializer = UserSerializer(user)
        print(request)
        return Response(serializer.data)


class EditAdministrator(APIView):

    def patch(self,request, id):
        print(request.data)
        # breakpoint()
        intern = UserAccount.objects.get(id=id)
        serializer = UserEditSerializer(intern, data=request.data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
