from django.shortcuts import render
from .models import tabla_employee
from django.http.response import JsonResponse
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required


@login_required
def create_employee(request):
    schema_url = request.scheme + '://' + request.get_host()

    try: 
        
        identificacion = request.POST["identificacion"]
        nombre = request.POST["nombre"]
        apellido = request.POST["apellido"]
        correo = request.POST["correo"]
        telefono = request.POST["telefono"]
        estado_civil = request.POST["estado_Civil"]
        edad = request.POST["edad"]
        sexo = request.POST["sexo"]
        cargo = request.POST["cargo"]
        salario = request.POST["salario"]
        tipo_contrato = request.POST["tipo_contrato"]
        fecha_ingreso = request.POST["fecha_ingreso"]
        jornada_laboral = request.POST["jornada_laboral"]
        arl = request.POST["arl"]
        eps = request.POST["eps"]
        area = request.POST["area"]
        observaciones = request.POST["observaciones"]


        new_employee= tabla_employee.objects.create(identificacion=identificacion, nombre=nombre,  apellido=apellido, correo=correo, telefono=telefono,
                                    estado_Civil=estado_civil, edad=edad, sexo=sexo, cargo=cargo, salario=salario, tipo_contrato=tipo_contrato,
                                    fecha_ingreso=fecha_ingreso, jornada_laboral=jornada_laboral, arl=arl, eps=eps, area=area, observaciones = observaciones)
        
        return JsonResponse({'status': "success",
                                "message":"Empleado Creado Correctamente",
                                "redirect":""}) 

    except Exception as e: 
         print(e)
         return JsonResponse({'status': "error",
                              "message":"No se pudo crear el empleado",
                              "redirect":""})
    

    
@login_required   
def delete_employee(request,employee_id):
    try:

        employee = tabla_employee.objects.get(id= employee_id)
        tabla_employee.delete()
        return JsonResponse({'status': "success",
                                "message":"Empleado eliminado Correctamente",
                                "redirect":""})         
    
    except Exception as e:
         print(e)
         return JsonResponse({'status': "error",
                              "message":"No se pudo eliminar el empleado",
                              "redirect":""})