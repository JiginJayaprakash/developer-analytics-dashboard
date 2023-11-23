from django.db import models

class Rest_Api(models.Model):
    user_id = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField()
    error_message = models.TextField(blank=True)
    request = models.TextField(blank=True)
    response = models.TextField(blank=True)

