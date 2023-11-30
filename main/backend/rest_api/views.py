from rest_framework import viewsets
from .serializers import *
from .models import Rest_Api
from rest_framework.response import Response
from rest_framework.decorators import api_view

import random
from .documents import *
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
    FacetedSearchFilterBackend
)

class Rest_ApiView(viewsets.ModelViewSet):
    serializer_class = Rest_ApiSerializer
    queryset = Rest_Api.objects.all()

@api_view(('GET',))
def hello_world(request, user_id):
    status = random.choice([True, False])
    error_msg = 'Random error' if status == False else ''
    response_msg = error_msg if status == False else 'Hello world'
    r = Rest_Api(user_id=user_id, status=status, error_message = error_msg, request = user_id, response = response_msg)
    r.save()
    return Response(response_msg)


class LogDataDocumentView(DocumentViewSet):
    document = LogDataDocument
    serializer_class = LogDataDocumentSerializer
    lookup_field = 'id'
    fielddata=True
    filter_backends = [
        OrderingFilterBackend,
        SearchFilterBackend,
        FilteringFilterBackend,
        FacetedSearchFilterBackend
    ]
   
    search_fields = ('user_id', 'timestamp', 'status')
    multi_match_search_fields = ('user_id', 'timestamp')
    filter_fields = {
      'user_id', 'timestamp', 'status'
    }

    faceted_search_fields = {
        'state_global': {
            'field': 'state.raw',
            'enabled': True,
            'global': True,  # This makes the aggregation global
        },
    }
        # Define filtering fields
    # filter_fields = {
    #     'user_id': None,
    #     'timestamp': 'name.raw',
    #     'status': 'city.raw'
    # }

    filter_fields = {
        'user_id': None,
        'timestamp': None,
        'status': None
    }
    ordering_fields = {
        'timestamp': 'desc',
    }
    ordering = ('timestamp')
        


