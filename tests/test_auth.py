import unittest
import json
from app import app
from models import db, Candidato

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'test-secret-key'
        self.client = app.test_client()

        with app.app_context():
            db.create_all()
            # Crear un candidato de prueba
            c = Candidato(nombre="Estudiante Demo", correo="demo@estudiante.ec")
            c.set_password("segura123")
            db.session.add(c)
            db.session.commit()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_registro_exitoso(self):
        payload = {
            "nombre": "Nuevo Candidato",
            "correo": "nuevo@estudiante.ec",
            "contrasena": "clave12345",
            "edad": 22,
            "salario_pretendido": 550.00
        }
        res = self.client.post('/api/registro', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertIn("usuario", data)
        self.assertEqual(data["usuario"]["correo"], "nuevo@estudiante.ec")

        # Verificar sesión activa tras registro
        res_current = self.client.get('/api/usuario-actual')
        current_data = res_current.get_json()
        self.assertTrue(current_data["autenticado"])
        self.assertEqual(current_data["usuario"]["nombre"], "Nuevo Candidato")

    def test_registro_correo_duplicado(self):
        payload = {
            "nombre": "Duplicado Demo",
            "correo": "demo@estudiante.ec",
            "contrasena": "otraclave123"
        }
        res = self.client.post('/api/registro', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, 409)
        data = res.get_json()
        self.assertIn("error", data)

    def test_login_exitoso(self):
        payload = {
            "correo": "demo@estudiante.ec",
            "contrasena": "segura123"
        }
        res = self.client.post('/api/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("usuario", data)
        self.assertEqual(data["usuario"]["nombre"], "Estudiante Demo")

    def test_login_credenciales_invalidas(self):
        payload = {
            "correo": "demo@estudiante.ec",
            "contrasena": "clave_erronea"
        }
        res = self.client.post('/api/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, 401)
        data = res.get_json()
        self.assertIn("error", data)

    def test_logout(self):
        # Primero login
        self.client.post('/api/login', data=json.dumps({
            "correo": "demo@estudiante.ec",
            "contrasena": "segura123"
        }), content_type='application/json')

        # Logout
        res_logout = self.client.post('/api/logout')
        self.assertEqual(res_logout.status_code, 200)

        # Verificar sesión cerrada
        res_current = self.client.get('/api/usuario-actual')
        current_data = res_current.get_json()
        self.assertFalse(current_data["autenticado"])
        self.assertIsNone(current_data["usuario"])

if __name__ == '__main__':
    unittest.main()
