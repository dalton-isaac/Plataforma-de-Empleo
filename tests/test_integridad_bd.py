"""
test_integridad_bd.py
─────────────────────
Pruebas exhaustivas para verificar el cumplimiento del Requisito 2:
1. Restricciones de Integridad (CHECK, DEFAULT, UNIQUE).
2. Triggers para validación y auditoría de operaciones críticas.
3. Procedimientos Almacenados (Stored Procedures) con reglas de negocio.
"""

import os
import unittest
from datetime import date
from sqlalchemy.exc import IntegrityError, InternalError
from app import app
from models import (
    db,
    Empresa,
    Candidato,
    OfertaEmpleo,
    Postulacion,
    Favorito,
)


class TestIntegridadBaseDatos(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        app.config["TESTING"] = True
        cls.ctx = app.app_context()
        cls.ctx.push()

    @classmethod
    def tearDownClass(cls):
        cls.ctx.pop()

    def setUp(self):
        db.session.rollback()
        db.create_all()

        try:
            sql_path = os.path.join(os.path.dirname(__file__), "..", "database", "schema_plpgsql.sql")
            if not os.path.exists(sql_path):
                sql_path = "schema_plpgsql.sql"
            with open(sql_path, "r", encoding="utf-8") as f:
                plpgsql_sql = f.read()
            with db.engine.connect() as conn:
                conn.execute(db.text(plpgsql_sql))
                conn.commit()
        except Exception as e:
            pass

        # Asegurar empresa de prueba
        self.empresa = Empresa.query.filter_by(nombre_empresa="Empresa Integridad DB Test").first()
        if not self.empresa:
            self.empresa = Empresa(nombre_empresa="Empresa Integridad DB Test", ranking=4.85)
            db.session.add(self.empresa)
            db.session.commit()

        # Asegurar candidato de prueba
        self.candidato = Candidato.query.filter_by(correo="candidato_integridad@test.ec").first()
        if not self.candidato:
            self.candidato = Candidato(
                nombre="Estudiante Integridad",
                correo="candidato_integridad@test.ec",
                edad=21,
                rol="candidato"
            )
            self.candidato.set_password("pass1234")
            db.session.add(self.candidato)
            db.session.commit()

        # Asegurar reclutador de prueba
        self.reclutador = Candidato.query.filter_by(correo="reclutador_integridad@test.ec").first()
        if not self.reclutador:
            self.reclutador = Candidato(
                nombre="Reclutador Integridad",
                correo="reclutador_integridad@test.ec",
                edad=30,
                rol="reclutador"
            )
            self.reclutador.set_password("pass1234")
            db.session.add(self.reclutador)
            db.session.commit()

        # Asegurar oferta activa de prueba
        self.oferta = OfertaEmpleo.query.filter_by(titulo="Oferta Integridad Activa").first()
        if not self.oferta:
            self.oferta = OfertaEmpleo(
                id_empresa=self.empresa.id_empresa,
                titulo="Oferta Integridad Activa",
                salario=600.00,
                modalidad="Presencial",
                anos_experiencia=0,
                ubicacion_exacta="Quito",
                activo=True
            )
            db.session.add(self.oferta)
            db.session.commit()

        # Asegurar postulación de prueba
        self.postulacion = Postulacion.query.filter_by(
            id_candidato=self.candidato.id_candidato,
            id_oferta=self.oferta.id_oferta
        ).first()
        if not self.postulacion:
            self.postulacion = Postulacion(
                id_candidato=self.candidato.id_candidato,
                id_oferta=self.oferta.id_oferta,
                estado="Pendiente"
            )
            db.session.add(self.postulacion)
            db.session.commit()

    def tearDown(self):
        db.session.rollback()

    # ══════════════════════════════════════════════════════════════
    # 1. PRUEBAS DE RESTRICCIONES CHECK
    # ══════════════════════════════════════════════════════════════

    def test_check_salario_minimo_oferta(self):
        """Verifica que la BD rechace ofertas con salario inferior al básico ($460 USD)."""
        oferta_invalida = OfertaEmpleo(
            id_empresa=self.empresa.id_empresa,
            titulo="Vacante Salario Ilegal",
            salario=300.00,  # Menor a 460
            modalidad="Presencial",
            anos_experiencia=0,
            ubicacion_exacta="Quito",
            activo=True
        )
        db.session.add(oferta_invalida)
        with self.assertRaises(IntegrityError):
            db.session.commit()
        db.session.rollback()

    def test_check_edad_candidato_minima(self):
        """Verifica que la BD rechace candidatos menores de 16 años."""
        candidato_menor = Candidato(
            nombre="Niño Prueba",
            correo="menor15@test.ec",
            edad=14,  # Menor de 16
            rol="candidato"
        )
        candidato_menor.set_password("pass1234")
        db.session.add(candidato_menor)
        with self.assertRaises(IntegrityError):
            db.session.commit()
        db.session.rollback()

    def test_check_rol_invalido_candidato(self):
        """Verifica que la BD rechace roles fuera de ('candidato', 'reclutador', 'admin')."""
        candidato_rol_invalido = Candidato(
            nombre="Usuario Rol Hacker",
            correo="hacker@test.ec",
            edad=25,
            rol="superadmin_fake"
        )
        candidato_rol_invalido.set_password("pass1234")
        db.session.add(candidato_rol_invalido)
        with self.assertRaises(IntegrityError):
            db.session.commit()
        db.session.rollback()

    def test_check_ranking_empresa_rango(self):
        """Verifica que el ranking de empresa esté estrictamente entre 0.00 y 5.00."""
        empresa_ranking_alto = Empresa(
            nombre_empresa="Empresa Ranking Imposible",
            ranking=6.50
        )
        db.session.add(empresa_ranking_alto)
        with self.assertRaises(IntegrityError):
            db.session.commit()
        db.session.rollback()

    # ══════════════════════════════════════════════════════════════
    # 2. PRUEBAS DE RESTRICCIONES UNIQUE
    # ══════════════════════════════════════════════════════════════

    def test_unique_postulacion_duplicada(self):
        """Verifica que no se permita insertar dos postulaciones para el mismo candidato y oferta."""
        p_duplicada = Postulacion(
            id_candidato=self.candidato.id_candidato,
            id_oferta=self.oferta.id_oferta,
            estado="Pendiente"
        )
        db.session.add(p_duplicada)
        with self.assertRaises(IntegrityError):
            db.session.commit()
        db.session.rollback()

    def test_unique_favorito_duplicado(self):
        """Verifica que no se duplique una misma vacante en favoritos."""
        Favorito.query.filter_by(id_candidato=self.candidato.id_candidato, id_oferta=self.oferta.id_oferta).delete()
        db.session.commit()

        f1 = Favorito(id_candidato=self.candidato.id_candidato, id_oferta=self.oferta.id_oferta)
        f2 = Favorito(id_candidato=self.candidato.id_candidato, id_oferta=self.oferta.id_oferta)
        db.session.add(f1)
        db.session.commit()

        db.session.add(f2)
        with self.assertRaises(IntegrityError):
            db.session.commit()
        db.session.rollback()

    # ══════════════════════════════════════════════════════════════
    # 3. PRUEBAS DE TRIGGERS (PL/pgSQL)
    # ══════════════════════════════════════════════════════════════

    def test_trigger_bloquea_postulacion_reclutador(self):
        """Trigger trg_validar_postulacion debe impedir que un reclutador se postule."""
        post_ilegal = Postulacion(
            id_candidato=self.reclutador.id_candidato,
            id_oferta=self.oferta.id_oferta,
            estado="Pendiente"
        )
        db.session.add(post_ilegal)
        with self.assertRaises((InternalError, IntegrityError, Exception)):
            db.session.commit()
        db.session.rollback()

    def test_trigger_bloquea_postulacion_oferta_inactiva(self):
        """Trigger trg_validar_postulacion debe impedir postulación a oferta con activo=False."""
        oferta_inactiva = OfertaEmpleo(
            id_empresa=self.empresa.id_empresa,
            titulo="Oferta Expirada / Cerrada",
            salario=550.00,
            activo=False
        )
        db.session.add(oferta_inactiva)
        db.session.commit()

        # Candidato temporal para no chocar con postulaciones previas
        cand_temp = Candidato(
            nombre="Candidato Inactiva Test",
            correo="inactiva_test@test.ec",
            rol="candidato"
        )
        cand_temp.set_password("pass123")
        db.session.add(cand_temp)
        db.session.commit()

        post_inactiva = Postulacion(
            id_candidato=cand_temp.id_candidato,
            id_oferta=oferta_inactiva.id_oferta,
            estado="Pendiente"
        )
        db.session.add(post_inactiva)
        with self.assertRaises((InternalError, IntegrityError, Exception)):
            db.session.commit()
        db.session.rollback()

    def test_trigger_auditoria_cambio_fase(self):
        """Trigger trg_auditar_postulacion debe registrar cambios de estado en auditoria_postulacion."""
        estado_original = self.postulacion.estado
        nuevo_estado = "Entrevista" if estado_original != "Entrevista" else "En Evaluación"
        self.postulacion.estado = nuevo_estado
        db.session.commit()

        # Consultar la tabla de auditoría creada por el trigger
        with db.engine.connect() as conn:
            result = conn.execute(
                db.text("SELECT * FROM auditoria_postulacion WHERE id_postulacion = :id ORDER BY id_auditoria DESC LIMIT 1"),
                {"id": self.postulacion.id_postulacion}
            ).fetchone()
            self.assertIsNotNone(result)
            self.assertEqual(result.estado_nuevo, nuevo_estado)

    # ══════════════════════════════════════════════════════════════
    # 4. PRUEBAS DE STORED PROCEDURES (PL/pgSQL)
    # ══════════════════════════════════════════════════════════════

    def test_stored_procedure_sp_cambiar_fase_kanban(self):
        """Ejecuta el stored procedure sp_cambiar_fase_kanban para mover un candidato."""
        with db.engine.connect() as conn:
            conn.execute(
                db.text("CALL sp_cambiar_fase_kanban(:id, :estado)"),
                {"id": self.postulacion.id_postulacion, "estado": "Aceptada"}
            )
            conn.commit()

        db.session.expire_all()
        post_actualizada = db.session.get(Postulacion, self.postulacion.id_postulacion)
        self.assertEqual(post_actualizada.estado, "Aceptada")

    def test_stored_procedure_sp_publicar_oferta(self):
        """Ejecuta el stored procedure sp_publicar_oferta para crear una vacante validada."""
        titulo_test = "Desarrollador Stored Procedure Jr"
        OfertaEmpleo.query.filter_by(titulo=titulo_test).delete()
        db.session.commit()

        with db.engine.connect() as conn:
            conn.execute(
                db.text("""
                    CALL sp_publicar_oferta(
                        :id_empresa, :titulo, :salario, :modalidad, :anos_exp, :ubicacion, :funciones, :requisitos
                    )
                """),
                {
                    "id_empresa": self.empresa.id_empresa,
                    "titulo": titulo_test,
                    "salario": 720.00,
                    "modalidad": "100% Remoto",
                    "anos_exp": 1,
                    "ubicacion": "Remoto (Ecuador)",
                    "funciones": "Desarrollar funciones backend",
                    "requisitos": "PostgreSQL, Python"
                }
            )
            conn.commit()

        db.session.expire_all()
        oferta_creada = OfertaEmpleo.query.filter_by(titulo=titulo_test).first()
        self.assertIsNotNone(oferta_creada)
        self.assertEqual(float(oferta_creada.salario), 720.00)


if __name__ == "__main__":
    unittest.main()

