from django.contrib import admin
from .models import Mesa, Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte, Usuario

admin.site.register(Mesa)
admin.site.register(Platillo)
admin.site.register(Pedido)
admin.site.register(DetallePedido)
admin.site.register(IngresoDiario)
admin.site.register(Movimiento)
admin.site.register(Reporte)
admin.site.register(Usuario)

