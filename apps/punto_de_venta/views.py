from rest_framework import generics
from .models import Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte
from .serializers import PlatilloSerializer, PedidoSerializer, DetallePedidoSerializer, IngresoDiarioSerializer, MovimientoSerializer, ReporteSerializer
from django.contrib.auth.models import User
from datetime import datetime

# class MesaListCreate(generics.ListCreateAPIView):
#     queryset = Mesa.objects.all()
#     serializer_class = MesaSerializer

# class MesaDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Mesa.objects.all()
#     serializer_class = MesaSerializer

class PlatilloListCreate(generics.ListCreateAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

class PlatilloDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

class PedidoListCreate(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    def perform_create(self, serializer):
        print('POST', serializer)
        return serializer.save(
            created_by= User.objects.get(username='admin'),
            estado=1,
            fecha=datetime.now().date()
        )
        # serializer.save(
        #     created_by=self.request.user,
        #     estado='Pendiente',
        #     fecha=datetime.now().date()
        # )



class PedidoDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class DetallePedidoListCreate(generics.ListCreateAPIView):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class IngresoDiarioListCreate(generics.ListCreateAPIView):
    queryset = IngresoDiario.objects.all()
    serializer_class = IngresoDiarioSerializer

class IngresoDiarioDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = IngresoDiario.objects.all()
    serializer_class = IngresoDiarioSerializer

class MovimientoListCreate(generics.ListCreateAPIView):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer

class MovimientoDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer

class ReporteListCreate(generics.ListCreateAPIView):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer

class ReporteDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer