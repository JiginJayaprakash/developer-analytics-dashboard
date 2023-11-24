from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_api import views

router = routers.DefaultRouter()
router.register(r'data', views.Rest_ApiView, 'data')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/rest/', include(router.urls)),
    path('api/visit/<int:user_id>', views.hello_world),
]