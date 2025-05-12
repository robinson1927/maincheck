from django.contrib import admin
from django.urls import path, include
from task import views

#endpoints: ruta de entrada de comunicacion el back con el font 
urlpatterns = [
    path('crear_tarea/', views.create_task, name = 'crear_tarea'),
    path('iniciar_tarea/', views.Initial_task, name = 'iniciar_tarea'),
    path('guardar_diagnostico/', views.save_diagnostico, name = 'guardar_diagnostico'),
    path('guardar_observacion/', views.save_observation, name = 'guardar_observacion'),
    path('finalizar_tarea/', views.final_task, name = 'finalizar_tarea'),
        
]