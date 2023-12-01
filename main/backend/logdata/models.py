from django.db import models
from datetime import datetime

class LogData(models.Model):
    user_id = models.IntegerField()
    timestamp = models.DateTimeField(default=datetime.now)
    status = models.BooleanField()
    error_message = models.TextField(blank=True)
    request = models.TextField(blank=True)
    response = models.TextField(blank=True)

