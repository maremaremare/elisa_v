# coding: utf-8
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

from django import forms
from django.forms.widgets import *
# A simple contact form with four fields.
class ContactForm(forms.Form):
    pt_contact_name = forms.CharField()
    pt_contact_email = forms.EmailField()
    pt_contact_subject = forms.CharField()
    pt_contact_message = forms.CharField(widget=Textarea())

class Page(MPTTModel):
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children')
    title = models.CharField(max_length=255,unique=True)
    subtitle = models.CharField(max_length=255,unique=True)
    menu_name =  models.CharField(max_length=50,unique=True) 
    slug = models.CharField(max_length=50,unique=True)
    text = models.TextField()
    def __unicode__(self):
        return self.title
    def get_absolute_url(self):
        return 'http://www.eliza-v.ru/'+self.slug + '/'    