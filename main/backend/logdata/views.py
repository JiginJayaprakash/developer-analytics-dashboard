from rest_framework import viewsets
from .serializers import *
from .models import LogData
from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import datetime, timedelta

import random
from .documents import *
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
    FacetedSearchFilterBackend
)
from django_elasticsearch_dsl_drf.pagination import QueryFriendlyPageNumberPagination

class LogDataView(viewsets.ModelViewSet):
    serializer_class = LogDataSerializer
    queryset = LogData.objects.all()

@api_view(('GET',))
def hello_world(request, user_id):
    status = random.choice([True, False])
    error_msg = 'Random error' if status == False else ''
    response_msg = error_msg if status == False else 'Hello world'
    r = LogData(user_id=user_id, status=status, error_message = error_msg, request = user_id, response = response_msg)
    r.save()
    return Response(response_msg)

@api_view(('GET',))
def add_records(request, records):
    for x in range(records): 
        status = random.choice([True, False])
        error_msg = 'Random error' if status == False else ''
        response_msg = error_msg if status == False else 'Hello world'
        start = datetime.now()
        end = start - timedelta(days=30)
        random_date = start + (end - start) * random.random()
        random_user_id  = random.randint(1,100)
        r = LogData(user_id = random_user_id, status=status, error_message = error_msg, request = random_user_id, response = response_msg, timestamp = random_date)
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
   
    pagination_class = QueryFriendlyPageNumberPagination
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

    filter_fields = {
        'user_id': None,
        'timestamp': None,
        'status': None
    }
    ordering_fields = {
        'timestamp':  'timestamp',
    }
    ordering = ('timestamp')
        


