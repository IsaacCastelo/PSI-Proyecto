from django import forms
from .models import Pedido, DetallePedido, Usuario, Mesa, Platillo, Reporte, IngresoDiario, Movimiento


class MesaForm(forms.ModelForm):
    class Meta:
        model = Mesa
        fields = ['id']


class PlatilloForm(forms.ModelForm):
    class Meta:
        model = Platillo
        fields = ['nombre', 'descripción', 'precio']
        widgets = {
            'descripción': forms.Textarea(attrs={'rows': 4, 'cols': 40}),
        }


class PedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['fecha', 'estado', 'total', 'monto_total', 'mesa',
                  'created_by', 'tipo_pago', 'monto', 'cambio', 'pago', 'tipo_pedido']
        widgets = {
            'fecha': forms.DateInput(attrs={'class': 'datepicker'}),
        }


class DetallePedidoForm(forms.ModelForm):
    class Meta:
        model = DetallePedido
        fields = ['cantidad', 'precio', 'notas', 'platillo']


DetallePedidoFormSet = forms.inlineformset_factory(
    Pedido, DetallePedido, form=DetallePedidoForm, extra=1, can_delete=True)


class IngresoDiarioForm(forms.ModelForm):
    class Meta:
        model = IngresoDiario
        fields = ['Fecha', 'presupuesto']
        widgets = {
            'Fecha': forms.DateInput(format=('%Y-%m-%d'), attrs={'type': 'date'}),
        }


class MovimientoForm(forms.ModelForm):
    class Meta:
        model = Movimiento
        fields = ['concepto', 'precio', 'tipo', 'presupuesto']
        widgets = {
            'tipo': forms.Select(choices=Movimiento.TIPOS),
        }


class ReporteForm(forms.ModelForm):
    class Meta:
        model = Reporte
        fields = ['tipo', 'fecha', 'notas', 'reporte']


# Usuarios forms
class UsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nombre_usuario', 'contrasenia', 'tipo_usuario']
        widgets = {
            'contrasenia': forms.PasswordInput(),
        }
