from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import Rest_Api
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
import random
import json
from .documents import *
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    CompoundSearchFilterBackend
)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
)

class Rest_ApiView(viewsets.ModelViewSet):
    serializer_class = Rest_ApiSerializer
    queryset = Rest_Api.objects.all()

@api_view(('GET',))
def hello_world(request, user_id):
    status = random.choice([True, False])
    error_msg = 'Random error' if status == False else '' 
    response = Response('Hello world')
    r = Rest_Api(user_id=user_id, status=status, error_message = error_msg, request = request, response = response)
    r.save()
    return response



# Create your views here.

class LogDataDocumentView(DocumentViewSet):
    document = LogDataDocument
    serializer_class = LogDataDocumentSerializer
    #lookup_field = 'first_name'
    fielddata=True
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        CompoundSearchFilterBackend,
    ]
   
    search_fields = ('user_id', 'timestamp', 'status', 'error_message', 'request', 'response')
    multi_match_search_fields = ('user_id', 'timestamp', 'status', 'error_message', 'request', 'response')
    filter_fields = {
      'user_id', 'timestamp', 'status', 'error_message', 'request', 'response'
    }
    ordering_fields = {
        'id': 'timestamp',
    }
    ordering = ( 'id'  ,)
        


