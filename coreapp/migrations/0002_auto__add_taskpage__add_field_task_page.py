# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'TaskPage'
        db.create_table('coreapp_taskpage', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=30)),
            ('createddate', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updateddate', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal('coreapp', ['TaskPage'])

        # Adding field 'Task.page'
        db.add_column('coreapp_task', 'page', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['coreapp.TaskPage'], null=True), keep_default=False)


    def backwards(self, orm):
        
        # Deleting model 'TaskPage'
        db.delete_table('coreapp_taskpage')

        # Deleting field 'Task.page'
        db.delete_column('coreapp_task', 'page_id')


    models = {
        'coreapp.task': {
            'Meta': {'object_name': 'Task'},
            'createddate': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'page': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['coreapp.TaskPage']", 'null': 'True'}),
            'text': ('django.db.models.fields.TextField', [], {}),
            'updateddate': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'coreapp.taskpage': {
            'Meta': {'object_name': 'TaskPage'},
            'createddate': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'}),
            'updateddate': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['coreapp']
