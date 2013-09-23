from django.conf.urls import patterns, include, url
from django.contrib import admin
from content.views import PageView, contact, thankyou
from content.models import Page
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
admin.autodiscover()
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'eliza_v.views.home', name='home'),
    # url(r'^eliza_v/', include('eliza_v.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^thanks/', thankyou),
    url(r'^contact_form/', contact),
    url(r'^(?P<slug>\w+)/$', PageView.as_view()),
    url(r'^$', PageView.as_view()),
)
