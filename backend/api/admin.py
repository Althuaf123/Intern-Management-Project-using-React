from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Administrator)
admin.site.register(Batch)
admin.site.register(Intern)