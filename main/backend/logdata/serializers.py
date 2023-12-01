from rest_framework import serializers
from .models import LogData
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .documents import *

class LogDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogData
        fields = ('user_id', 'timestamp', 'status', 'error_message', 'request', 'response')


class LogDataDocumentSerializer(DocumentSerializer):

    class Meta(object):
        """Meta options."""
        model = LogData
        document = LogDataDocument
        fields = ('id' ,'user_id', 'timestamp', 'status', 'error_message', 'request', 'response')
