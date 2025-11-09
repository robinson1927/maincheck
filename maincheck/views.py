from django.shortcuts import render
from django.http.response import JsonResponse 
from task.models import Mantenimiento, Gestion_mantenimiento
from rrhh.models import tabla_employee
from django.contrib.auth.decorators import login_required
from datetime import timedelta

@login_required
def main(request):

  return render(request, 'base.html') 

# ------Visual de Administradores -------- #
@login_required
def tasks(request):

  return render(request, 'tasks.html')

@login_required
def rrhh(request):

  return render(request, 'employees.html')


@login_required
def ejecution(request):

  return render(request, 'ejecution_tasks.html') 

@login_required
def reports(request):

  return render(request, 'reports.html') 

@login_required
def history(request):

  return render(request, 'history.html') 

@login_required
def list_task(request):
  list_tasks = Mantenimiento.objects.values()

  events = []
  for task in list_tasks:

    event={
      '_id': task.get("id"),
      'title': task.get("nombre"),
      'description': task.get("descripcion"),
      'start': task.get("fecha_inicio"),
      'end': task.get("fecha_fin"),
      'status': task.get("estado"),
      'responsable': task.get("responsable"),
      'type': "Mantenimiento preventivo" if task.get("tipo") == "1" else "Mantenimiento correctivo" if task.get("tipo") == "2" else "Mantenimiento predictivo" if task.get("tipo") == "3" else "",
      'observations': task.get("observaciones")
    }

    events.append(event)

  return JsonResponse(events, safe= False)


@login_required
def list_task_ejecutions(request):
  list_tasks =list( Mantenimiento.objects.filter(id__in = Gestion_mantenimiento.objects.values('id_mantenimiento')))
  list_task_ejecutions = Gestion_mantenimiento.objects.values()


  events = []
  for task in list_tasks:
    for task_ejecution in list_task_ejecutions:


      if int(task.id) == int(task_ejecution.get("id_mantenimiento")):

        event={
          '_id': task.id,
          'title': task.nombre,
          'description': task.descripcion,
          'start': task_ejecution.get("fecha_inicio") - timedelta(hours=5) if task_ejecution.get("fecha_inicio")  is not None else ''  ,
          'end': task_ejecution.get("fecha_fin") - timedelta(hours=5) if task_ejecution.get("fecha_fin")  is not None else '' ,
          'Diag': task_ejecution.get("diagnostico"),
          'type': "Mantenimiento preventivo" if task.tipo == "1" else "Mantenimiento correctivo" if task.tipo == "2" else "Mantenimiento predictivo" if task.tipo == "3" else ""
        }

        events.append(event)

  return JsonResponse(events, safe= False)

@login_required
def list_employee(request):
  list_employee = tabla_employee.objects.values()

  events = []
  for employee in list_employee:

    event={
      '_id': employee.get("id"),
      'identity':employee.get("identificacion"),
      'firts_name': employee.get("nombre"),
      'last_name': employee.get("apellido"),
      'email': employee.get("correo"),
      'phone': employee.get("telefono"),
      'status': employee.get("estado_Civil"),
      'age': employee.get("edad"),
      'gender': employee.get("sexo"),
      'positions': employee.get("cargo"),
      'salary': employee.get("salario"),
      'contract': employee.get("tipo_contrato"),
      'date_admission': employee.get("fecha_ingreso"),
      'working_day': employee.get("jornada_laboral"),
      'arl': employee.get("arl"),
      'eps': employee.get("eps"),
      'holydays': employee.get("vacaciones"),
      'area': employee.get("area"),
      'observations': employee.get("observaciones")
    }

    events.append(event)

  return JsonResponse(events, safe= False)

