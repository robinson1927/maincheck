
from django.urls import path, include
from login import views
from two_factor.urls import urlpatterns as tf_urls 
from two_factor.views import LoginView

# URL de la vista login(pantalla)
urlpatterns = [
    #path('login/', views.inicio, name = 'login'),
    path('login/', LoginView.as_view(), name = 'login'),
    path('logout/', views.logout, name = 'logout'),
    path('', include(tf_urls)),  # incluye las rutas del 2FA
    
]