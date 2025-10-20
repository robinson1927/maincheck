from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class LoginViewTest(TestCase):
    def setUp(self):
        # Creamos un usuario de prueba
        self.user = User.objects.create_user(username="gerente1", password="Jo300607#")
        self.url = reverse("login")

    def test_login_correcto(self):
        response = self.client.post(self.url, {
            'username': 'gerente1',
            'password': 'Jo300607#'
        })

        # Si tu vista redirige al home o dashboard, debería ser 302
        # Si no redirige, solo asegúrate de que el status sea 200 y que el usuario esté autenticado
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.wsgi_request.user.is_authenticated)

    def test_login_incorrecto(self):
        response = self.client.post(self.url, {
            'username': 'gerente1',
            'password': '12345'
        })

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Usuario o contraseña incorrectos")