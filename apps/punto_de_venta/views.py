from rest_framework import viewsets
from .models import Mesa, Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte, Usuario
from .serializers import MesaSerializer, PlatilloSerializer, PedidoSerializer, DetallePedidoSerializer, IngresoDiarioSerializer, MovimientoSerializer, ReporteSerializer, UsuarioSerializer

class MesaViewSet(viewsets.ModelViewSet):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

class PlatilloViewSet(viewsets.ModelViewSet):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class IngresoDiarioViewSet(viewsets.ModelViewSet):
    queryset = IngresoDiario.objects.all()
    serializer_class = IngresoDiarioSerializer

class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer

class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
