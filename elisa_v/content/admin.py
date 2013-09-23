# coding: utf-8
from django.contrib import admin
from content.models import Page 
from treeadmin.admin import TreeAdmin

class TreeModelAdmin(TreeAdmin):
	# class Media:
 #        js = ['/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js', '/static/grappelli/tinymce_setup/tinymce_setup.js' ]
    pass

admin.site.register(Page, TreeModelAdmin)    