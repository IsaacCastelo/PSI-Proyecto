from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Mesa(models.Model):
    id = models.CharField(max_length=3, primary_key=True)

class Platillo(models.Model):
    nombre = models.CharField(max_length=255)
    descripción = models.CharField(max_length=255)
    precio = models.FloatField()

class Pedido(models.Model):
    fecha = models.DateField()
    estado = models.IntegerField(choices=[(1, 'Pendiente'), (2, 'En proceso'), (3, 'Listo'), (4, 'Entregado')])
    total = models.FloatField()
    monto_total = models.FloatField()
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo_pago = models.CharField(max_length=255)
    monto = models.FloatField()
    cambio = models.FloatField()
    pago = models.FloatField()
    tipo_pedido = models.IntegerField(choices=[(1, 'Local'), (2, 'Domicilio'), (3, 'Recoger')])

class DetallePedido(models.Model):
    cantidad = models.IntegerField()
    precio = models.FloatField()
    notas = models.CharField(max_length=500)
    platillo = models.ForeignKey(Platillo, on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)

class IngresoDiario(models.Model):
    Fecha = models.DateField()
    presupuesto = models.FloatField()

class Movimiento(models.Model):
    concepto = models.CharField(max_length=255)
    precio = models.FloatField()
    tipo = models.IntegerField(choices=[(1, 'Gasto'), (2, 'Ganancia')])
    presupuesto = models.ForeignKey(IngresoDiario, on_delete=models.CASCADE)

class Reporte(models.Model):
    tipo = models.CharField(max_length=255)
    fecha = models.DateField()
    notas = models.CharField(max_length=500)
    reporte = models.CharField(max_length=255)
    
class Usuario(models.Model):
    nombre_usuario = models.CharField(max_length=50)
    contrasenia = models.CharField(max_length=50)
    tipo_usuario = models.IntegerField(choices=[(1, 'Cliente'), (2, 'Administrador')])
    