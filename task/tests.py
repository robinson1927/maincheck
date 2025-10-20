from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Mantenimiento  # Ajusta al nombre real de tu app/modelo

class CreateTaskViewTest(TestCase):

    def setUp(self):
        # Creamos un usuario para autenticarlo
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.login(username='testuser', password='testpass123')

        # URL de la vista a probar (ajústala al name de tu path si tienes uno)
        self.url = reverse('crear_tarea')

        # Datos de prueba
        self.data = {
            'nombre': 'Mantenimiento General',
            'descripcion': 'Revisión completa del sistema',
            'fecha_inicio': '2025-10-18',
            'fecha_fin': '2025-10-20',
            'estado': 'Pendiente',
            'responsable': 'Juan Pérez',
            'tipo_mantenimiento': 'Preventivo',
            'observaciones': 'Se debe revisar el cableado'
        }

    def test_create_task_success(self):
        """Debe crear una tarea correctamente cuando los datos son válidos"""
        response = self.client.post(self.url, self.data)

        # Verificar que el código de estado sea 200
        self.assertEqual(response.status_code, 200)

        # Parsear la respuesta JSON
        json_response = response.json()
        self.assertEqual(json_response['status'], 'success')
        self.assertEqual(json_response['message'], 'Tarea Creada Correctamente')

        # Verificar que se haya creado el registro en la BD
        self.assertTrue(Mantenimiento.objects.filter(nombre='Mantenimiento General').exists())

    def test_create_task_error(self):
        """Debe devolver error si falta algún campo"""
        # Eliminamos un campo para provocar el error
        data_incompleta = self.data.copy()
        del data_incompleta['nombre']

        response = self.client.post(self.url, data_incompleta)

        self.assertEqual(response.status_code, 200)
        json_response = response.json()
        self.assertEqual(json_response['status'], 'error')
        self.assertIn('no se puedo crear la tarea', json_response['message'])

    def test_requires_login(self):
        """No debe permitir acceso sin autenticarse"""
        self.client.logout()
        response = self.client.post(self.url, self.data)
        # Redirige al login por el decorador @login_required
        self.assertEqual(response.status_code, 302)
        self.assertIn('/login', response.url)