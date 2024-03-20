"""
URL configuration for tacos_johnny project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from apps.punto_de_venta import views

urlpatterns = [

    path('admin/', admin.site.urls),
    path('mesas/', views.MesaListCreate.as_view(), name='mesa-list-create'),
    path('platillos/', views.PlatilloListCreate.as_view(), name='platillo-list-create'),
    path('pedidos/', views.PedidoListCreate.as_view(), name='pedido-list-create'),
    path('detalles-pedido/', views.DetallePedidoListCreate.as_view(), name='detalle-pedido-list-create'),
    path('ingresos-diarios/', views.IngresoDiarioListCreate.as_view(), name='ingreso-diario-list-create'),
    path('movimientos/', views.MovimientoListCreate.as_view(), name='movimiento-list-create'),
    path('reportes/', views.ReporteListCreate.as_view(), name='reporte-list-create'),

    
]