import unittest
import json
from app import app
from models import db, Empresa, PlanContratacion, OfertaEmpleo, Candidato

class RolesYPermisosTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'test-secret-key'
        self.client = app.test_client()

        with app.app_context():
            db.create_all()
            plan = PlanContratacion(nombre_plan="Plan Pro RBAC")
            db.session.add(plan)
            db.session.flush()

            empresa = Empresa(id_plan=plan.id_plan, nombre_empresa="Empresa Test RBAC", ranking=4.9)
            db.session.add(empresa)
            db.session.flush()

            candidato = Candidato(nombre="Estudiante RBAC", correo="estudiante_rbac@demo.ec", rol="candidato")
            candidato.set_password("clave123")
            db.session.add(candidato)

            reclutador = Candidato(nombre="Reclutador RBAC", correo="reclutador_rbac@empresa.ec", rol="reclutador")
            reclutador.set_password("reclutador123")
            db.session.add(reclutador)
            db.session.flush()

            oferta = OfertaEmpleo(
                id_empresa=empresa.id_empresa,
                titulo="Pasantía Frontend RBAC",
                salario=500.0,
                modalidad="Remoto",
                anos_experiencia=0,
                activo=True
            )
            db.session.add(oferta)
            db.session.commit()

            self.empresa_id = empresa.id_empresa
            self.oferta_id = oferta.id_oferta

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_crear_vacante_sin_sesion_bloqueado(self):
        payload = {
            "titulo": "Hack Vacancy",
            "id_empresa": self.empresa_id,
            "salario": 900.0
        }
        res_json = self.client.post('/api/ofertas', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res_json.status_code, 401)

        res_form = self.client.post('/vacantes/nueva', data=payload, follow_redirects=False)
        self.assertEqual(res_form.status_code, 302)

    def test_crear_vacante_como_candidato_bloqueado(self):
        # Login como candidato
        self.client.post('/api/login', data=json.dumps({
            "correo": "estudiante_rbac@demo.ec",
            "contrasena": "clave123"
        }), content_type='application/json')

        payload = {
            "titulo": "Vacante No Autorizada",
            "id_empresa": self.empresa_id,
            "salario": 700.0
        }
        res_json = self.client.post('/api/ofertas', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res_json.status_code, 403)

        res_form = self.client.post('/vacantes/nueva', data=payload, follow_redirects=False)
        self.assertEqual(res_form.status_code, 302)

    def test_crear_vacante_como_reclutador_exitoso(self):
        # Login como reclutador
        self.client.post('/api/login', data=json.dumps({
            "correo": "reclutador_rbac@empresa.ec",
            "contrasena": "reclutador123"
        }), content_type='application/json')

        payload = {
            "titulo": "Desarrollador Backend Junior RBAC",
            "id_empresa": self.empresa_id,
            "salario": 650.00,
            "modalidad": "Híbrido",
            "anos_experiencia": 0,
            "ubicacion_exacta": "Quito Norte"
        }
        res_json = self.client.post('/api/ofertas', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(res_json.status_code, 201)

    def test_editar_y_desactivar_vacante_como_reclutador(self):
        # Login como reclutador
        self.client.post('/api/login', data=json.dumps({
            "correo": "reclutador_rbac@empresa.ec",
            "contrasena": "reclutador123"
        }), content_type='application/json')

        # Editar
        res_edit = self.client.post(f'/vacantes/{self.oferta_id}/editar', data={
            "titulo": "Pasantía Frontend Actualizada",
            "salario": "550.00"
        }, follow_redirects=True)
        self.assertEqual(res_edit.status_code, 200)

        # Desactivar (Soft delete)
        res_desactivar = self.client.post(f'/vacantes/{self.oferta_id}/desactivar', follow_redirects=True)
        self.assertEqual(res_desactivar.status_code, 200)

        with app.app_context():
            oferta = db.session.get(OfertaEmpleo, self.oferta_id)
            self.assertFalse(oferta.activo)

    def test_carrito_favoritos_flujo_completo(self):
        # Login como estudiante
        self.client.post('/api/login', data=json.dumps({
            "correo": "estudiante_rbac@demo.ec",
            "contrasena": "clave123"
        }), content_type='application/json')

        # 1. Agregar a favoritos / carrito
        res_add = self.client.post(f'/favoritos/agregar/{self.oferta_id}', follow_redirects=True)
        self.assertEqual(res_add.status_code, 200)

        # 2. Ver lista de favoritos
        res_list = self.client.get('/favoritos')
        self.assertEqual(res_list.status_code, 200)
        self.assertIn("Pasantía Frontend", res_list.get_data(as_text=True))

        # 3. Eliminar de favoritos
        res_del = self.client.post(f'/favoritos/eliminar/{self.oferta_id}', follow_redirects=True)
        self.assertEqual(res_del.status_code, 200)

if __name__ == '__main__':
    unittest.main()
