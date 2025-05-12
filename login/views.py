from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout 
from django.views.decorators.http import require_POST



@login_required
def inicio(request):

    return render(request ,'base.html')

@require_POST
 
def logout(request):
        logout(request)