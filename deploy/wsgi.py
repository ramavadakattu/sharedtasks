import os, sys
sys.path.append('/home/djangoprojects/sharedtasks/sharedtasks')
os.environ['DJANGO_SETTINGS_MODULE'] = 'sharedtasks.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
