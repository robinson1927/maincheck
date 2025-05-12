"""
URL configuration for maincheck project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]"
"""
from django.contrib import admin
from django.urls import path, include
from maincheck import views

#endpoints: ruta de entrada de comunicacion el back con el font 
urlpatterns = [
    path('admin/', admin.site.urls),
    #path('admins/', include('cruds.urls')),
    path('inicio/', views.main, name = 'inicio'),
    

    path('tasks_page/', include('task.urls')),
    path('', include('login.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('tasks/', views.tasks, name = 'Tareas'),
    path('ejecution/', views.ejecution, name = 'ejecucion_tareas'),
    path('reports/', views.reports, name = 'Informes'),
    path('history/', views.history, name = 'history'),
    path('list_tasks/', views.list_task, name = 'lista_tareas'),
    path('list_tasks_ejecutions/', views.list_task_ejecutions, name = 'tareas_ejecutadas'),
    
]
