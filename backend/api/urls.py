from django.urls import path,include
from .views import *

urlpatterns = [
    path('signup/',SignUp.as_view()),
    path('login/',Login.as_view()),
    path('logout/',Logout.as_view()),
    path('view/intern/',ViewInterns.as_view()),
    path('view/intern-details/<int:id>',InternDetailView.as_view()),
    path('list/mentors/',ListMentors.as_view()),
    path('list/cc/',ListCC.as_view()),
    path('list/sc/',ListSC.as_view()),
    path('view/profile-view/',GetUser.as_view()),
    path('add/batch/',CreateBatch.as_view()),
    path('view/batch-list/',ViewBatch.as_view()),
    path('delete/batch/<int:id>',DeleteBatch.as_view()),
    path('edit/batch/<id>',Editbatch.as_view()),
    path('add/intern/',CreateIntern.as_view()),
    path('edit/intern/<id>',EditIntern.as_view()),
    path('set_password/',SetPassword.as_view()),
    path('edit/administrator/<id>',EditAdministrator.as_view()),
    path('add/tasks/',AssignTask.as_view()),
    path('view/tasks/<id>',TaskDetailsView.as_view()),
    path('edit/task/<id>',TaskUpdateView.as_view()),
]
