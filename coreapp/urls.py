from django.conf.urls.defaults import *



urlpatterns = patterns('coreapp.views',
                       url(r'^$','displayTaskPage',name='pageurl2'),
             url(r'^name/(?P<page_name>[0-9a-zA-Z_-]+)/$','displayTasks',name='taskshomeurl'),        
            url(r'^addtask/$','addTask',name='addtaskurl'),                                     
            url(r'^deletetask/$','deleteTask',name='addtaskurl'),
            url(r'^pdeletetask/$','pdeleteTask',name='addtaskurl'),
             url(r'^undotask/$','undoTask',name='undotaskurl'),
            url(r'^displaypage/$','displayTaskPage',name='pageurl'),
            url(r'^createpage/$','createTaskPage',name='pagecreateurl'),
            url(r'^allpages/$','showAllPages',name="showallpageurl")   
        
       
       )



