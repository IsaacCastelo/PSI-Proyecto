from rest_framework import generics
from .models import Mesa, Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte
from .serializers import MesaSerializer, PlatilloSerializer, PedidoSerializer, DetallePedidoSerializer, IngresoDiarioSerializer, MovimientoSerializer, ReporteSerializer

class MesaListCreate(generics.ListCreateAPIView):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

class PlatilloListCreate(generics.ListCreateAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

class PedidoListCreate(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class DetallePedidoListCreate(generics.ListCreateAPIView):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class IngresoDiarioListCreate(generics.ListCreateAPIView):
    queryset = IngresoDiario.objects.all()
    serializer_class = IngresoDiarioSerializer

class MovimientoListCreate(generics.ListCreateAPIView):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer

class ReporteListCreate(generics.ListCreateAPIView):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer