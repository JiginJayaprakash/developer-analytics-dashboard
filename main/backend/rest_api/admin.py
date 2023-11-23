from django.contrib import admin
from .models import Rest_Api

class Rest_ApiAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'status', 'error_message', 'request', 'response')


# Register your models here.
admin.site.register(Rest_Api, Rest_ApiAdmin)