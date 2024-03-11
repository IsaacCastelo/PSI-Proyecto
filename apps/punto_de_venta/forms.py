from django import forms
from .models import Pedido, DetallePedido

class PedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['fecha', 'estado', 'total', 'monto_total', 'mesa', 'created_by', 'tipo_pago', 'monto', 'cambio', 'pago', 'tipo_pedido']
        widgets = {
            'fecha': forms.DateInput(attrs={'class': 'datepicker'}),
        }

class DetallePedidoForm(forms.ModelForm):
    class Meta:
        model = DetallePedido
        fields = ['cantidad', 'precio', 'notas', 'platillo']

DetallePedidoFormSet = forms.inlineformset_factory(Pedido, DetallePedido, form=DetallePedidoForm, extra=1, can_delete=True)
