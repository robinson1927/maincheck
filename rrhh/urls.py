from django.contrib import admin
from django.urls import path, include
from rrhh import views

#endpoints: ruta de entrada de comunicacion el back con el font 
urlpatterns = [
    path('create_employee/', views.create_employee, name = 'crear_empleado'),
    path('delete_employee/<employee_id>', views.delete_employee, name = 'eliminar_empleado'),
    
]