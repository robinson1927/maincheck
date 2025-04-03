from django.shortcuts import render
from django.http.response import JsonResponse

def main(request):

  return render(request, 'base.html') 

# ------Visual de Administradores -------- #

def tasks(request):

  return render(request, 'tasks.html')

def ejecution(request):

  return render(request, 'ejecution_tasks.html') 

def reports(request):

  return render(request, 'reports.html') 


def history(request):

  return render(request, 'history.html') 

