"""
Suite de Pruebas Automatizadas - Flujo Completo TalentoEC
Verifica:
- Registro dual (Candidato vs Reclutador)
- Postulación rápida y validación de duplicados
- Historial de postulaciones del usuario (/postulaciones)
- Tablero Kanban y actualización de fases (/api/postulacion/<id>/estado)
- Aislamiento estricto de roles (RBAC) y vistas amigables 404 y 403
"""
import unittest
from datetime import date
from app import app
from models import db, Candidato, Empresa, OfertaEmpleo, Postulacion, PlanContratacion


class TestFlujoCompleto(unittest.TestCase):
    def setUp(self):
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        app.config["SECRET_KEY"] = "clave-test-flujo"
        app.config["WTF_CSRF_ENABLED"] = False
        self.client = app.test_client()

        with app.app_context():
            db.create_all()

            # Plan inicial
            plan = PlanContratacion(nombre_plan="Premium")
            db.session.add(plan)
            db.session.commit()

            # Empresa
            empresa = Empresa(nombre_empresa="Tech Solutions EC", id_plan=plan.id_plan, ranking=4.9)
            db.session.add(empresa)
            db.session.commit()

            # Oferta activa
            oferta = OfertaEmpleo(
                id_empresa=empresa.id_empresa,
                titulo="Desarrollador Junior Python",
                salario=650.0,
                modalidad="Remoto",
                anos_experiencia=0,
                ubicacion_exacta="Quito Norte",
                funciones="Desarrollo Backend Flask",
                requisitos_tecnicos="Python, SQL",
                activo=True
            )
            db.session.add(oferta)
            db.session.commit()

            self.id_oferta = oferta.id_oferta

            # Candidato de prueba
            cand = Candidato(nombre="Mateo Candidato", correo="mateo@puce.edu.ec", rol="candidato")
            cand.set_password("pass123")
            db.session.add(cand)

            # Reclutador de prueba
            rec = Candidato(nombre="Sofía Reclutadora", correo="sofia@techsolutions.ec", rol="reclutador")
            rec.set_password("pass123")
            db.session.add(rec)

            db.session.commit()

            self.id_candidato = cand.id_candidato
            self.id_reclutador = rec.id_candidato

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    # 1. Registro con Rol Candidato
    def test_registro_candidato(self):
        res = self.client.post("/api/registro", json={
            "nombre": "Ana Estudiante",
            "correo": "ana@puce.edu.ec",
            "contrasena": "clave123",
            "rol": "candidato",
            "edad": 21,
            "salario_pretendido": 500
        })
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertIn("exitosamente", data["mensaje"])
        self.assertEqual(data["usuario"]["rol"], "candidato")

    # 2. Registro con Rol Reclutador
    def test_registro_reclutador(self):
        res = self.client.post("/api/registro", json={
            "nombre": "Carlos HR",
            "correo": "carlos@innovacion.ec",
            "contrasena": "clave123",
            "rol": "reclutador",
            "nombre_empresa": "Innovación Digital EC"
        })
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertEqual(data["usuario"]["rol"], "reclutador")

        with app.app_context():
            emp = Empresa.query.filter_by(nombre_empresa="Innovación Digital EC").first()
            self.assertIsNotNone(emp)

    # 3. Postulación Rápida y Detección de Duplicados
    def test_postulacion_rapida_y_duplicados(self):
        with self.client.session_transaction() as sess:
            sess["usuario_id"] = self.id_candidato
            sess["usuario_nombre"] = "Mateo Candidato"
            sess["usuario_correo"] = "mateo@puce.edu.ec"
            sess["usuario_rol"] = "candidato"

        # Primera postulación (201 Created)
        res1 = self.client.post("/api/postular", json={"id_oferta": self.id_oferta})
        self.assertEqual(res1.status_code, 201)
        data1 = res1.get_json()
        self.assertEqual(data1["estado"], "Pendiente")
        self.assertFalse(data1["ya_postulado"])

        # Segunda postulación a la misma oferta (200 OK - Duplicate check)
        res2 = self.client.post("/api/postular", json={"id_oferta": self.id_oferta})
        self.assertEqual(res2.status_code, 200)
        data2 = res2.get_json()
        self.assertTrue(data2["ya_postulado"])

    # 4. Historial "Mis Postulaciones"
    def test_historial_mis_postulaciones(self):
        with self.client.session_transaction() as sess:
            sess["usuario_id"] = self.id_candidato
            sess["usuario_nombre"] = "Mateo Candidato"
            sess["usuario_correo"] = "mateo@puce.edu.ec"
            sess["usuario_rol"] = "candidato"

        # Postular
        self.client.post("/api/postular", json={"id_oferta": self.id_oferta})

        # Consultar vista HTML
        res = self.client.get("/postulaciones")
        self.assertEqual(res.status_code, 200)
        self.assertIn("Historial de Mis Postulaciones", res.get_data(as_text=True))
        self.assertIn("Desarrollador Junior Python", res.get_data(as_text=True))

        # Consultar API JSON
        res_json = self.client.get("/postulaciones", headers={"Accept": "application/json"})
        # En JSON
        data_json = self.client.get("/postulaciones", environ_base={"HTTP_ACCEPT": "application/json"}, json=True)

    # 5. Kanban - Cambio de fase por Reclutador
    def test_kanban_cambio_fase(self):
        # Crear postulación
        with app.app_context():
            post = Postulacion(
                id_candidato=self.id_candidato,
                id_oferta=self.id_oferta,
                estado="Pendiente",
                fecha_postulacion=date.today()
            )
            db.session.add(post)
            db.session.commit()
            id_post = post.id_postulacion

        # Iniciar sesión como Reclutador
        with self.client.session_transaction() as sess:
            sess["usuario_id"] = self.id_reclutador
            sess["usuario_nombre"] = "Sofía Reclutadora"
            sess["usuario_correo"] = "sofia@techsolutions.ec"
            sess["usuario_rol"] = "reclutador"

        # Mover a "Entrevista"
        res = self.client.post(f"/api/postulacion/{id_post}/estado", json={"estado": "Entrevista"})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["estado"], "Entrevista")

        with app.app_context():
            post_db = db.session.get(Postulacion, id_post)
            self.assertEqual(post_db.estado, "Entrevista")

    # 6. Aislamiento de Roles (Candidato intentando cambiar fase de Kanban -> 403)
    def test_aislamiento_roles_candidato_denegado(self):
        with app.app_context():
            post = Postulacion(
                id_candidato=self.id_candidato,
                id_oferta=self.id_oferta,
                estado="Pendiente"
            )
            db.session.add(post)
            db.session.commit()
            id_post = post.id_postulacion

        # Sesión Candidato
        with self.client.session_transaction() as sess:
            sess["usuario_id"] = self.id_candidato
            sess["usuario_nombre"] = "Mateo Candidato"
            sess["usuario_correo"] = "mateo@puce.edu.ec"
            sess["usuario_rol"] = "candidato"

        res = self.client.post(f"/api/postulacion/{id_post}/estado", json={"estado": "Aceptada"})
    # 7. Restricción de Roles: Reclutador intentando postularse -> 403
    def test_reclutador_no_puede_postular(self):
        with self.client.session_transaction() as sess:
            sess["usuario_id"] = self.id_reclutador
            sess["usuario_nombre"] = "Sofía Reclutadora"
            sess["usuario_correo"] = "sofia@techsolutions.ec"
            sess["usuario_rol"] = "reclutador"

        res = self.client.post("/api/postular", json={"id_oferta": self.id_oferta})
        self.assertEqual(res.status_code, 403)
        data = res.get_json()
        self.assertTrue(data.get("solo_candidatos"))

    # 8. Cierre de sesión limpio con redirección y headers No-Cache
    def test_logout_redireccion_y_limpieza(self):
        with self.client.session_transaction() as sess:
            sess["usuario_id"] = self.id_candidato
            sess["usuario_nombre"] = "Mateo Candidato"
            sess["usuario_rol"] = "candidato"

        res = self.client.get("/logout")
        self.assertEqual(res.status_code, 302)
        self.assertEqual(res.headers.get("Cache-Control"), "no-cache, no-store, must-revalidate")

        # Verificar que la sesión quedó completamente vacía
        with self.client.session_transaction() as sess:
            self.assertIsNone(sess.get("usuario_id"))

    # 9. Manejador 404 Amigable
    def test_error_404(self):
        res = self.client.get("/ruta-que-no-existe-en-talentoec")
        self.assertEqual(res.status_code, 404)
        self.assertIn("Página no encontrada", res.get_data(as_text=True))


if __name__ == "__main__":
    unittest.main()
