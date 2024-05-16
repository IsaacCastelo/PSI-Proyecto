from django.contrib.auth.backends import BaseBackend
from .models import Usuario

class CustomUsuarioBackend(BaseBackend):
    def authenticate(self, request, nombre_usuario=None, contraseña=None):
        try:
            user = Usuario.objects.get(nombre_usuario=nombre_usuario)
            if self.check_password(contraseña, user.contraseña):
                return user
        except Usuario.DoesNotExist:
            return None

    def check_password(self, raw_password, hashed_password):
        return raw_password == hashed_password

    def get_user(self, user_id):
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None
