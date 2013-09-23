# coding: utf-8
# Create your views here.

from django.views.generic import TemplateView
from django.http import HttpResponseRedirect
from django.core.mail import send_mail
from django.shortcuts import render

from content.models import Page
from content.models import ContactForm


def contact(request):
    if request.method == 'POST':  # If the form has been submitted...
        form = ContactForm(request.POST)  # A form bound to the POST data
        if form.is_valid():
            subject = form.cleaned_data['pt_contact_subject']
            message = form.cleaned_data['pt_contact_message']
            sender = form.cleaned_data['pt_contact_email']

            recipients = ['info@example.com']

            send_mail(subject, message, sender, recipients)
            return HttpResponseRedirect('/thanks/')  # Redirect after POST # All validation rules pass

    else:
        form = ContactForm()  # An unbound form

    return render(request, 'form.html', {
        'form': form,
        'object': Page.objects.get(slug='contact_form'),
        'nodes': Page.objects.all()
    })


def thankyou(request):
    return render(request, 'page.html', {

        'title': 'Спасибо!',
        'nodes': Page.objects.all()
    })


class PageView(TemplateView):
    template_name = "page.html"

    def get_context_data(self, **kwargs):
        slug = self.kwargs.get('slug', None)
        if slug is None:
            slug = 'home'
        print slug
        context = super(PageView, self).get_context_data(**kwargs)
        context['object'] = Page.objects.get(slug=slug)
        context['nodes'] = Page.objects.all()
        return context