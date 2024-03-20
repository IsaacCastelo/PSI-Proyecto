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
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Punto de venta
    path('Mesas/', views.mesa_list, name='mesa_list'),
    path('platillos/', views.platillo_list, name='platillo_list'),
    path('pedidos/', views.pedido_list, name='pedido_list'),
    path('detalle_pedidos/', views.detalle_pedido_list, name='detalle_pedido_list'),
    path('ingresos_diarios/', views.ingreso_diario_list, name='ingreso_diario_list'),
    path('movimientos/', views.movimiento_list, name='movimiento_list'),
    path('reportes/', views.reporte_list, name='reporte_list'),
]