from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.shortcuts import render, redirect, get_object_or_404

## Models
from .models import Pedido, DetallePedido, Usuario
## Forms
from .forms import PedidoForm, DetallePedidoFormSet, UsuarioForm

from django.contrib import messages
import json, sys



# Login
def login_user(request):
    logout(request)
    resp = {"status":'failed','msg':''}
    username = ''
    password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                resp['status']='success'
            else:
                resp['msg'] = "Nombre o contraseña incorrectos"
        else:
            resp['msg'] = "Nombre o contraseña incorrectos"
    return HttpResponse(json.dumps(resp),content_type='application/json')

@login_required
def administrar_ordenes(request):
    pedidos = Pedido.objects.all()
    return render(request, 'administrar_ordenes.html', {'pedidos': pedidos})

@login_required
def registrar_pedido(request):
    if request.method == 'POST':
        pedido_form = PedidoForm(request.POST)
        detalles_formset = DetallePedidoFormSet(request.POST)
        if pedido_form.is_valid() and detalles_formset.is_valid():
            pedido = pedido_form.save()
            detalles_formset.instance = pedido
            detalles_formset.save()
            messages.success(request, 'Pedido registrado correctamente.')
            return redirect('administrar_ordenes')
    else:
        pedido_form = PedidoForm()
        detalles_formset = DetallePedidoFormSet()
    return render(request, 'registrar_pedido.html', {'pedido_form': pedido_form, 'detalles_formset': detalles_formset})

@login_required
def editar_pedido(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    if request.method == 'POST':
        pedido_form = PedidoForm(request.POST, instance=pedido)
        detalles_formset = DetallePedidoFormSet(request.POST, instance=pedido)
        if pedido_form.is_valid() and detalles_formset.is_valid():
            pedido_form.save()
            detalles_formset.save()
            messages.success(request, 'Pedido actualizado correctamente.')
            return redirect('administrar_ordenes')
    else:
        pedido_form = PedidoForm(instance=pedido)
        detalles_formset = DetallePedidoFormSet(instance=pedido)
    return render(request, 'editar_pedido.html', {'pedido_form': pedido_form, 'detalles_formset': detalles_formset})

@login_required
def eliminar_pedido(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    pedido.delete()
    messages.success(request, 'Pedido eliminado correctamente.')
    return redirect('administrar_ordenes')

@login_required
def completar_pedido(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    pedido.estado = 3  # Cambiar estado a "Listo"
    pedido.save()
    messages.success(request, 'Pedido marcado como completado.')
    return redirect('administrar_ordenes')

@login_required
def marcar_pago(request, pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    #TODO Implementar lógica de pago
    pedido.estado = 4  # Cambiar estado a "Entregado"
    pedido.save()
    messages.success(request, 'Pago del pedido registrado.')
    return redirect('administrar_ordenes')


## Usuarios Listado
@login_required
def usuario_list(request):
    usuarios = Usuario.objects.all()
    return render(request, 'usuario/usuario_list.html', {'usuarios': usuarios})

## Crear usuario
def usuario_create(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Usuario creado con éxito.')
            return redirect('usuario_list')
    else:
        form = UsuarioForm()
    return render(request, 'usuario/usuario_form.html', {'form': form})

## editar usuario
@login_required
def usuario_edit(request, pk):
    usuario = get_object_or_404(Usuario, pk=pk)
    if request.method == 'POST':
        form = UsuarioForm(request.POST, instance=usuario)
        if form.is_valid():
            form.save()
            messages.success(request, 'Usuario actualizado con éxito.')
            return redirect('usuario_list')
    else:
        form = UsuarioForm(instance=usuario)
    return render(request, 'usuario/usuario_form.html', {'form': form})

## Eliminar usuario
@login_required
def usuario_delete(request, pk):
    usuario = get_object_or_404(Usuario, pk=pk)
    if request.method == 'POST':
        usuario.delete()
        messages.success(request, 'Usuario eliminado con éxito.')
        return redirect('usuario_list')
    return render(request, 'usuario/delete_usuario.html', {'usuario': usuario})


