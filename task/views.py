from django.shortcuts import render
from .models import Mantenimiento,Gestion_mantenimiento
from django.http.response import JsonResponse
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required


@login_required
def create_task(request):
    schema_url = request.scheme + '://' + request.get_host()

    try: 

        nombre = request.POST["nombre"]
        descripcion = request.POST["descripcion"]
        fecha_inicio = request.POST["fecha_inicio"]
        fecha_fin = request.POST["fecha_fin"]
        estado = request.POST["estado"]
        responsable = request.POST["responsable"]
        tipo_mantenimiento = request.POST["tipo_mantenimiento"]
        observaciones = request.POST["observaciones"]


        new_task= Mantenimiento.objects.create(nombre=nombre,  descripcion=descripcion, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin,
                                    estado=estado, responsable=responsable, tipo=tipo_mantenimiento, observaciones = observaciones)
        
        return JsonResponse({'status': "success",
                                "message":"Tarea Creada Correctamente",
                                "redirect":""}) 

    except Exception as e: 
         print(e)
         return JsonResponse({'status': "error",
                              "message":"no se puedo crear la tarea",
                              "redirect":""})

@login_required
def Initial_task(request):
    schema_url = request.scheme + '://' + request.get_host()

    try: 

        date_now = datetime.strptime(str(datetime.now()+timedelta(hours=5)), "%Y-%m-%d %H:%M:%S.%f")
        fecha_inicio = date_now
        fecha_fin = None

        id_mantenimiento = request.POST["id_mantenimiento"]
        responsable = request.POST["responsable"]

        exists = Gestion_mantenimiento.objects.filter(id_mantenimiento = id_mantenimiento).exists()
        if exists: 
            return JsonResponse({'status': "error",
                                "message":"Este mantenimiemto ya fue iniciado",
                                "redirect":""}) 

        new_initial_task= Gestion_mantenimiento.objects.create(id_mantenimiento=id_mantenimiento,responsable=responsable,fecha_inicio=fecha_inicio,fecha_fin=fecha_fin)        
        return JsonResponse({'status': "success",
                                "message":"Tarea Iniciada Correctamente",
                                "redirect":""}) 

    except Exception as e: 
         print(e)
         return JsonResponse({'status': "error",
                              "message":"no se pudo iniciar la tarea",
                              "redirect":""}) 
    
@login_required
def final_task(request):
    schema_url = request.scheme + '://' + request.get_host()

    try: 

        date_now = datetime.strptime(str(datetime.now()+timedelta(hours=5)), "%Y-%m-%d %H:%M:%S.%f")
        fecha_fin = date_now

        id_mantenimiento = request.POST["id_mantenimiento"]

        exists = Gestion_mantenimiento.objects.filter(id_mantenimiento = id_mantenimiento).exists()
        if not exists: 
            return JsonResponse({'status': "error",
                                "message":"Para finalizar esta tarea, debes inicializarla",
                                "redirect":""}) 

        Mantenimiento_readed = Gestion_mantenimiento.objects.get(id_mantenimiento=id_mantenimiento)

        if Mantenimiento_readed.fecha_fin != None: 
            return JsonResponse({'status': "error",
                                "message":"Esta tarea ya fue finalizada",
                                "redirect":""})


        Mantenimiento_readed.fecha_fin = fecha_fin
        Mantenimiento_readed.save()
        return JsonResponse({'status': "success",
                                "message":"Tarea finalizada Correctamente",
                                "redirect":""}) 

    except Exception as e: 
         print(e)
         return JsonResponse({'status': "error",
                              "message":"no se pudo finalizar la tarea",
                              "redirect":""}) 

@login_required
def save_diagnostico(request):
    schema_url = request.scheme + '://' + request.get_host()

    try: 

        id_mantenimiento = int(request.POST["id_mantenimiento"])
        diagnostico = request.POST["diagnostico-update"]

        exists = Gestion_mantenimiento.objects.filter(id_mantenimiento = id_mantenimiento).exists()
        if not exists: 
            return JsonResponse({'status': "error",
                                "message":"Para realizar el diagnostico debe iniciar la tarea",
                                "redirect":""}) 

        Mantenimiento_readed = Gestion_mantenimiento.objects.get(id_mantenimiento=id_mantenimiento)


        Mantenimiento_readed.diagnostico = diagnostico 
        Mantenimiento_readed.save()
        return JsonResponse({'status': "success",
                                "message":"Diagnostico guardado Correctamente",
                                "redirect":""}) 

    except Exception as e: 
         print(e)
         return JsonResponse({'status': "error",
                              "message":"no se pudo guardar el diagnostico",
                              "redirect":""}) 
    


@login_required
def save_observation(request):
    schema_url = request.scheme + '://' + request.get_host()

    try: 

        id_mantenimiento = int(request.POST["id_mantenimiento"])
        observation = request.POST["observations-update"]

        exists = Gestion_mantenimiento.objects.filter(id_mantenimiento = id_mantenimiento).exists()
        if not exists: 
            return JsonResponse({'status': "error",
                                "message":"Para realizar la observacion debes iniciar la tarea",
                                "redirect":""}) 

        Mantenimiento_readed = Gestion_mantenimiento.objects.get(id_mantenimiento=id_mantenimiento)


        Mantenimiento_readed.observaciones = observation
        Mantenimiento_readed.save()
        return JsonResponse({'status': "success",
                                "message":"Observacion guardado Correctamente",
                                "redirect":""}) 

    except Exception as e: 
         print(e)
         return JsonResponse({'status': "error",
                              "message":"no se pudo guardar la observacion",
                              "redirect":""}) 