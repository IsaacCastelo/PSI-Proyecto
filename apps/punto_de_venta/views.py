from rest_framework import generics
from apps.punto_de_venta.backends import CustomUsuarioBackend
from .models import Platillo, Pedido, DetallePedido, IngresoDiario, Movimiento, Reporte, Usuario
from .serializers import PlatilloSerializer, PedidoSerializer, DetallePedidoSerializer, IngresoDiarioSerializer, MovimientoSerializer, ReporteSerializer, UsuarioSerializer
from django.contrib.auth.models import User
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

class CustomAuthToken(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        nombre_usuario = request.data.get('nombre_usuario')
        contraseña = request.data.get('contraseña')
        
        user = CustomUsuarioBackend().authenticate(request, nombre_usuario=nombre_usuario, contraseña=contraseña)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Nombre de usuario o contraseña incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

class PlatilloListCreate(generics.ListCreateAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

class PlatilloDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer
    
    def perform_destroy(self, instance):
        instance.activo = False
        instance.save()

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
    
class DetallePedidoDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
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
    
class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
