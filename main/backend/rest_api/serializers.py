from rest_framework import serializers
from .models import Rest_Api
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .documents import *

class Rest_ApiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rest_Api
        fields = ('user_id', 'timestamp', 'status', 'error_message', 'request', 'response')


class LogDataDocumentSerializer(DocumentSerializer):

    class Meta(object):
        """Meta options."""
        model = Rest_Api
        document = LogDataDocument
        fields = ('user_id', 'timestamp', 'status', 'error_message', 'request', 'response')
