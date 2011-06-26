import datetime
import logging
import logging.config
from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.template.loader import render_to_string
import urllib2
import urllib
from models import  Task,TaskPage
from django.utils import simplejson
from django.template.defaultfilters import urlize








def displayTasks(request,page_name):
    '''Shared tasks'''   
    print "Page name ="+page_name
    tasks = Task.objects.filter(page__name__iexact=page_name,deleted=False).order_by("-updateddate");
    deleted_tasks = Task.objects.filter(page__name__iexact=page_name,deleted=True).order_by("-updateddate");
    page= TaskPage.objects.get(name__iexact=page_name)
    return render_to_response('main.html',{"tasks":tasks,'deleted_tasks':deleted_tasks,'page':page,'page_name':page_name},RequestContext(request))


def addTask(request):
    '''Add a task''' 
    d={}  
    
    pagename = request.POST["pagename"]
    page= TaskPage.objects.get(name__iexact=pagename)
     
     
     
    if "taskid" not in request.POST.keys(): 
            t = Task()
            t.text = request.POST['taskcontent']
            t.page =  page
            t.save()
            d['message'] = "Successfully added the task"
            d['text'] = t.text
            d['taskid']=t.id  
            d['update']=0  
    else :
            taskid= int(request.POST["taskid"])
            giventask = Task.objects.get(pk=taskid)
            giventask.text= request.POST['taskcontent']
            giventask.save();
            d['message'] = "Successfully updated  the task"
            d['text'] = urlize(giventask.text)
            d['taskid']=giventask.id;
            d['update']=1 
    #return all the tasks
    d['error']= "0"    
    json = simplejson.dumps(d)
    return HttpResponse(json)


def deleteTask(request):
        print "deleting the task "
        taskid = int(request.POST["taskid"])
        print taskid
        giventask = Task.objects.get(pk=taskid)
        giventask.deleted = True
        giventask.save();
        d={}
        d['error'] = "0"
        
        json = simplejson.dumps(d)
        return HttpResponse(json)
    
    
def undoTask(request):
        print "undo  the task "
        taskid = int(request.POST["taskid"])
        print taskid
        giventask = Task.objects.get(pk=taskid)
        giventask.deleted = False
        giventask.save();
        d={}
        d['error'] = "0"
        
        json = simplejson.dumps(d)
        return HttpResponse(json)    
    
def displayTaskPage(request):
         return render_to_response('page.html',{},RequestContext(request)) 
    
    
def createTaskPage(request):        
        pagename = request.POST['pagename']
        d={}
        pages= TaskPage.objects.filter(name__iexact=pagename)
        
       
        if len(pages) >  0 :
            d['error']="1"
            d["message"] = "Page already exists Try creating new page name"
            json = simplejson.dumps(d)
            return HttpResponse(json)        
        
        t = TaskPage()
        t.name = pagename
        t.save()
        
        
        d['error']="0"
                
        newurl = "/sharedtasks/name/"+pagename+"/"
        d['newurl']=newurl    
        json = simplejson.dumps(d)
        return HttpResponse(json)
    
    
def showAllPages(request):
    pages = TaskPage.objects.all()
    return render_to_response('allpages.html',{'pages':pages},RequestContext(request))   
          


def pdeleteTask(request):
        print "permenently deleting the task "
        taskid = int(request.POST["taskid"])
        print taskid
        giventask = Task.objects.get(pk=taskid)      
        giventask.delete();
        d={}
        d['error'] = "0"
        
        json = simplejson.dumps(d)
        return HttpResponse(json)
            

        
        
        
        
      
    
    
    
    
    
        
                
