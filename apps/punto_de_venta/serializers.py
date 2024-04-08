from rest_framework import serializers
from .models import Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte

# class MesaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Mesa
#         fields = '__all__'

class PlatilloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platillo
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ('mesa', 'tipo_pedido', 'id', 'nombre_cliente', 'direccion', 'estado', 'total', 'cambio', 'pago')

class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = '__all__'

class IngresoDiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngresoDiario
        fields = '__all__'

class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimiento
        fields = '__all__'

class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'

# class UsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Usuario
#         fields = '__all__'
