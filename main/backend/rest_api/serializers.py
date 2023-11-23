from rest_framework import serializers
from .models import Rest_Api

class Rest_ApiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rest_Api
        fields = ('user_id', 'timestamp', 'status', 'error_message', 'request', 'response')