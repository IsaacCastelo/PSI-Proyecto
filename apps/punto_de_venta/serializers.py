from rest_framework import serializers
from .models import Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte, Usuario

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

class UsuarioSerializer(serializers.ModelSerializer):
    contraseña = serializers.CharField(write_only=True)  # Campo de contraseña solo para escritura
    class Meta:
        model = Usuario
        fields = ('id', 'nombre_empleado', 'nombre_usuario', 'rol', 'contraseña')

    def create(self, validated_data):
        # Extraer la contraseña del validated_data
        contraseña = validated_data.pop('contraseña', None)

        # Crear el usuario sin la contraseña
        usuario = Usuario.objects.create(**validated_data)

        # Establecer la contraseña y guardar el usuario
        if contraseña is not None:
            usuario.contraseña = contraseña
            usuario.save()

        return usuario
