from django.db import models

# Create your models here.

class TaskPage(models.Model):
            name = models.CharField(max_length=30,unique=True)
            createddate = models.DateTimeField(auto_now_add=True)
            updateddate = models.DateTimeField(auto_now=True)
            
            
            def getGoodName(self):
                newstring =  self.name.replace("-"," ")
                return newstring.replace("_"," ")
            
            def __unicode__(self):
                        return "text = %s" %(self.name)
       



class Task(models.Model):
       text = models.TextField()
       createddate = models.DateTimeField(auto_now_add=True)
       updateddate = models.DateTimeField(auto_now=True)
       page = models.ForeignKey(TaskPage,null=True)
       deleted = models.BooleanField(default=False)
     
       
       def __unicode__(self):
            return "comment = %s" %(self.text[:50])
        
        

           
                   
 
        

