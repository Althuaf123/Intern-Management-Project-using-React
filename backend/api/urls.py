from django.urls import path,include
from .views import *

urlpatterns = [
    path('signup/',SignUp.as_view()),
    path('login/',Login.as_view()),
    path('logout/',Logout.as_view()),
    path('view/intern/',ViewInterns.as_view()),
    path('get/users/',GetUser.as_view())
]
