from django.shortcuts import render

from rest_framework import viewsets
from .serializers import ContactSerializer
from .models import Contact

class ContactViewSet(viewsets.ModelViewSet):
  queryset = Contact.objects.all().order_by('last_name', 'first_name')
  serializer_class = ContactSerializer
