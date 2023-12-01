from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from logdata import views

router = routers.DefaultRouter()
router.register(r'data', views.LogDataView, 'data')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/rest/', include(router.urls)),
    path('api/visit/<int:user_id>', views.hello_world),
    path('api/random/<int:records>', views.add_records),
    path('api/search/' , views.LogDataDocumentView.as_view({'get': 'list'})),
]