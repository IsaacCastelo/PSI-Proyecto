from django.urls import path
from .views import (
    # MesaListCreate,
    # MesaDetailUpdateDelete,
    PlatilloListCreate,
    PlatilloDetailUpdateDelete,
    PedidoListCreate,
    PedidoDetailUpdateDelete,
    DetallePedidoListCreate,
    DetallePedidoDetailUpdateDelete,
    IngresoDiarioListCreate,
    IngresoDiarioDetailUpdateDelete,
    MovimientoListCreate,
    MovimientoDetailUpdateDelete,
    ReporteListCreate,
    ReporteDetailUpdateDelete,
)

urlpatterns = [
    # path('mesas/', MesaListCreate.as_view(), name='mesa-list-create'),
    # path('mesas/<str:pk>/', MesaDetailUpdateDelete.as_view(), name='mesa-detail-update-delete'),
    path('platillos/', PlatilloListCreate.as_view(), name='platillo-list-create'),
    path('platillos/<int:pk>/', PlatilloDetailUpdateDelete.as_view(), name='platillo-detail-update-delete'),
    path('pedidos/', PedidoListCreate.as_view(), name='pedido-list-create'),
    path('pedidos/<int:pk>/', PedidoDetailUpdateDelete.as_view(), name='pedido-detail-update-delete'),
    path('detalles-pedido/', DetallePedidoListCreate.as_view(), name='detalle-pedido-list-create'),
    path('detalles-pedido/<int:pk>/', DetallePedidoDetailUpdateDelete.as_view(), name='detalle-pedido-detail-update-delete'),
    path('ingresos-diarios/', IngresoDiarioListCreate.as_view(), name='ingreso-diario-list-create'),
    path('ingresos-diarios/<int:pk>/', IngresoDiarioDetailUpdateDelete.as_view(), name='ingreso-diario-detail-update-delete'),
    path('movimientos/', MovimientoListCreate.as_view(), name='movimiento-list-create'),
    path('movimientos/<int:pk>/', MovimientoDetailUpdateDelete.as_view(), name='movimiento-detail-update-delete'),
    path('reportes/', ReporteListCreate.as_view(), name='reporte-list-create'),
    path('reportes/<int:pk>/', ReporteDetailUpdateDelete.as_view(), name='reporte-detail-update-delete'),
]