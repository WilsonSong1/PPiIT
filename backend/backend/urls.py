from django.contrib import admin
from django.urls import path
from api.views import register,login
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('api/get_profile/', views.get_profile, name='get_profile'),
]