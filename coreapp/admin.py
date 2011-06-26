import models
from django.contrib import admin
  
  
from coreapp.models import  TaskPage,Task
  
  
admin.site.register(models.TaskPage)
admin.site.register(models.Task)
  
