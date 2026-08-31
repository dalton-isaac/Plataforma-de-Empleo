import unittest
import json
from app import app
from models import db, Empresa, PlanContratacion, OfertaEmpleo, Candidato

class CrudOfertasTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'test-secret-key'
        self.client = app.test_client()

        with app.app_context():
            db.create_all()
            plan = PlanContratacion(nombre_plan="Plan Pro CRUD")
            db.session.add(plan)
            db.session.flush()

            empresa = Empresa(id_plan=plan.id_plan, nombre_empresa="Tech Solutions Quito Test", ranking=4.8)
            db.session.add(empresa)
            db.session.flush()

            reclutador = Candidato(nombre="Reclutador CRUD", correo="reclutador_crud@empresa.ec", rol="reclutador")
            reclutador.set_password("reclutador123")
            db.session.add(reclutador)
            db.session.flush()

            oferta = OfertaEmpleo(
                id_empresa=empresa.id_empresa,
                titulo="Desarrollador Junior CRUD",
                salario=550.0,
                modalidad="Híbrido",
                anos_experiencia=0,
                ubicacion_exacta="Quito Norte",
                funciones="Desarrollo web en Python",
                requisitos_tecnicos="Python, Flask",
                activo=True
            )
            db.session.add(oferta)
            db.session.commit()

            self.empresa_id = empresa.id_empresa
            self.oferta_id = oferta.id_oferta

        # Login reclutador
        self.client.post('/api/login', data=json.dumps({
            "correo": "reclutador_crud@empresa.ec",
            "contrasena": "reclutador123"
        }), content_type='application/json')

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_crear_oferta_via_form(self):
        form_data = {
            "titulo": "Diseñador UI/UX Junior CRUD",
            "id_empresa": self.empresa_id,
            "salario": "480.00",
            "modalidad": "Remoto",
            "anos_experiencia": "0",
            "ubicacion_exacta": "Quito (Cumbayá)",
            "funciones": "Diseño en Figma",
            "requisitos_tecnicos": "Figma, CSS básico"
        }
        res = self.client.post('/vacantes/nueva', data=form_data, follow_redirects=True)
        self.assertEqual(res.status_code, 200)

        with app.app_context():
            nueva = OfertaEmpleo.query.filter_by(titulo="Diseñador UI/UX Junior CRUD").first()
            self.assertIsNotNone(nueva)
            self.assertEqual(float(nueva.salario), 480.00)
            self.assertTrue(nueva.activo)

    def test_crear_oferta_via_json(self):
        json_data = {
            "titulo": "Soporte TI Junior CRUD",
            "id_empresa": self.empresa_id,
            "salario": 460.00,
            "modalidad": "Presencial",
            "anos_experiencia": 0,
            "ubicacion_exacta": "Quito Sur",
            "funciones": "Mantenimiento de redes",
            "requisitos_tecnicos": "Redes, Hardware"
        }
        res = self.client.post('/api/ofertas', data=json.dumps(json_data), content_type='application/json')
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertIn("oferta", data)
        self.assertEqual(data["oferta"]["titulo"], "Soporte TI Junior CRUD")

    def test_crear_oferta_validacion_error(self):
        form_data = {
            "titulo": "Oferta Invalida CRUD",
            "id_empresa": self.empresa_id,
            "salario": "no-es-un-numero",
        }
        res = self.client.post('/vacantes/nueva', data=form_data, follow_redirects=True)
        self.assertEqual(res.status_code, 200)
        with app.app_context():
            oferta = OfertaEmpleo.query.filter_by(titulo="Oferta Invalida CRUD").first()
            self.assertIsNone(oferta)

    def test_editar_oferta_get_y_post(self):
        res_get = self.client.get(f'/vacantes/{self.oferta_id}/editar')
        self.assertEqual(res_get.status_code, 200)

        edit_data = {
            "titulo": "Desarrollador Full Stack Junior CRUD",
            "salario": "700.00",
            "modalidad": "Remoto Completo",
            "anos_experiencia": "1",
            "ubicacion_exacta": "Quito / Remoto",
            "funciones": "Desarrollo backend y frontend",
            "requisitos_tecnicos": "Python, Flask, JavaScript"
        }
        res_post = self.client.post(f'/vacantes/{self.oferta_id}/editar', data=edit_data, follow_redirects=True)
        self.assertEqual(res_post.status_code, 200)

        with app.app_context():
            oferta_actualizada = db.session.get(OfertaEmpleo, self.oferta_id)
            self.assertEqual(oferta_actualizada.titulo, "Desarrollador Full Stack Junior CRUD")
            self.assertEqual(float(oferta_actualizada.salario), 700.00)
            self.assertEqual(oferta_actualizada.modalidad, "Remoto Completo")

    def test_desactivar_oferta_soft_delete(self):
        res = self.client.post(f'/vacantes/{self.oferta_id}/desactivar', follow_redirects=True)
        self.assertEqual(res.status_code, 200)

        with app.app_context():
            oferta = db.session.get(OfertaEmpleo, self.oferta_id)
            self.assertFalse(oferta.activo)

        # Verificar que la API pública no retorna ofertas inactivas
        res_api = self.client.get('/api/ofertas')
        ofertas = res_api.get_json()
        ids = [o["id_oferta"] for o in ofertas]
        self.assertNotIn(self.oferta_id, ids)

    def test_reactivar_oferta(self):
        # Desactivar primero
        self.client.post(f'/vacantes/{self.oferta_id}/desactivar')

        # Reactivar
        res_reactivar = self.client.post(f'/vacantes/{self.oferta_id}/reactivar', follow_redirects=True)
        self.assertEqual(res_reactivar.status_code, 200)

        with app.app_context():
            oferta = db.session.get(OfertaEmpleo, self.oferta_id)
            self.assertTrue(oferta.activo)

if __name__ == '__main__':
    unittest.main()
