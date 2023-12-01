from django.contrib import admin
from .models import LogData

class LogDataAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'status', 'error_message', 'request', 'response')


# Register your models here.
admin.site.register(LogData, LogDataAdmin)