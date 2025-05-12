
from django.urls import path
from login import views 

urlpatterns = [
    path('login/', views.inicio, name = 'login'),
    path('logout/', views.logout, name = 'logout'),
]