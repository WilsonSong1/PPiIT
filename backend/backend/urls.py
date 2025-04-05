from django.contrib import admin
from django.urls import path
from api.views import register

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register, name='register'),
]