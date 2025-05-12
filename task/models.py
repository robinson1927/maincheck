from django.db import models

# Create your models here.
class Mantenimiento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha_inicio = models.DateField(blank=True)
    fecha_fin = models.DateField(blank=True)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('en_proceso', 'En Proceso'), ('finalizado', 'Finalizado')])
    responsable = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    cliente = models.CharField(max_length=200)
    telefono_contacto = models.CharField(max_length=50)
    nombre_empresa = models.CharField(max_length=50)
    observaciones = models.CharField(max_length=500)

class Gestion_mantenimiento(models.Model):
    id_mantenimiento = models.IntegerField()
    nombre_maquina = models.CharField(max_length=200,blank=True)
    serial_maquina = models.CharField(max_length=100,blank=True)
    responsable = models.CharField(max_length=100,blank=True)
    observaciones = models.TextField(blank=True)
    diagnostico = models.TextField(blank=True)
    fecha_inicio = models.DateTimeField(blank=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)

# Create your models here.
