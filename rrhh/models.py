from django.db import models

class tabla_employee(models.Model):
    identificacion = models.CharField(max_length=100,blank=True)
    nombre = models.CharField(max_length=200,blank=True)
    apellido = models.CharField(max_length=100,blank=True)
    correo = models.CharField(max_length=100,blank=True)
    telefono = models.CharField(max_length=100,blank=True)
    estado_Civil = models.TextField(blank=True)
    edad = models.CharField(max_length=100,blank=True)
    sexo = models.CharField(max_length=100,blank=True)
    cargo = models.CharField(max_length=100,blank=True)
    salario = models.CharField(max_length=100,blank=True)
    tipo_contrato = models.CharField(max_length=100,blank=True)
    fecha_ingreso = models.CharField(max_length=100,blank=True)
    jornada_laboral = models.CharField(max_length=100,blank=True)
    arl = models.CharField(max_length=100,blank=True)
    eps = models.CharField(max_length=100,blank=True)
    vacaciones = models.CharField(max_length=100,blank=True)
    area = models.CharField(max_length=100,blank=True)
    observaciones = models.CharField(max_length=100,blank=True)

