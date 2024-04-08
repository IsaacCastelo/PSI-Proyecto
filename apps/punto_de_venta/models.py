from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


# Create your models here.
# class Mesa(models.Model):
#     id = models.CharField(max_length=3, primary_key=True)

class Platillo(models.Model):
    nombre = models.CharField(max_length=255)
    descripción = models.CharField(max_length=255)
    precio = models.FloatField()

class Pedido(models.Model):
    fecha = models.DateField(auto_now_add=True)
    estado = models.IntegerField(choices=[(1, 'Pendiente'), (2, 'En proceso'), (3, 'Listo'), (4, 'Entregado')], default=1)
    total = models.FloatField(null=True)
    mesa = models.CharField(max_length=10, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    tipo_pago = models.CharField(max_length=255, null=True)
    cambio = models.FloatField(default=0.0)
    pago = models.FloatField(default=0.0)
    tipo_pedido = models.IntegerField(choices=[(1, 'Local'), (2, 'Domicilio'), (3, 'Recoger')])
    nombre_cliente = models.CharField(max_length=255, null=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)

class DetallePedido(models.Model):
    cantidad = models.IntegerField()
    precio = models.FloatField()
    notas = models.CharField(max_length=500, blank=True)
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
    
# class Usuario(AbstractUser):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     nombre_usuario = models.CharField(max_length=50)
#     contrasenia = models.CharField(max_length=50)
#     tipo_usuario = models.IntegerField(choices=[(1, 'Cliente'), (2, 'Administrador')])

#     groups = models.ManyToManyField(
#         'auth.Group',
#         verbose_name=_('groups'),
#         blank=True,
#         help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
#         related_name='usuario_groups',  # Cambia 'usuario_groups' a un nombre único que prefieras
#         related_query_name='user',
#     )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         verbose_name=_('user permissions'),
#         blank=True,
#         help_text=_('Specific permissions for this user.'),
#         related_name='usuario_user_permissions',  # Cambia 'usuario_user_permissions' a un nombre único que prefieras
#         related_query_name='user',
#     )
    