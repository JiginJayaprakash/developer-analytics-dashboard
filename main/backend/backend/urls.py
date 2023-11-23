from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_api import views

router = routers.DefaultRouter()
router.register(r'rest', views.Rest_ApiView, 'rest')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/rest/', include(router.urls)),
    path('api/<int:user_id>', views.hello_world),
]