from django.contrib import admin
from django.urls import path
from kb_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name="home"),
]
