from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Rest_ApiSerializer
from .models import Rest_Api
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
import random
import json


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