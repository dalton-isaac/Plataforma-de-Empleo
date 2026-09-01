"""
init_db.py
──────────
Script para inicializar la base de datos PostgreSQL de TalentoEC y cargar datos de prueba.
Ejecutar UNA sola vez (o cada vez que quieras reiniciar la base de datos).
"""

from datetime import date
from app import app
from models import (
    db,
    Empresa,
    Candidato,
    OfertaEmpleo,
    HabilidadCertificacion,
    Postulacion,
    Favorito,
)

with app.app_context():
    print("Conectando a la base de datos y creando tablas...")
    with db.engine.connect() as conn:
        conn.execute(db.text("DROP SCHEMA public CASCADE; CREATE SCHEMA public;"))
        conn.commit()
    db.create_all()  # Crea las tablas según los modelos en models.py
    print("[OK] Tablas creadas con exito.")

    # ── 1. EMPRESAS AFILIADAS ────────────────────────────────────
    empresa1 = Empresa(
        nombre_empresa="Corporación Multimedios",
        ranking=4.80,
    )
    empresa2 = Empresa(
        nombre_empresa="Software Solutions EC",
        ranking=4.90,
    )
    empresa3 = Empresa(
        nombre_empresa="Agencia Click Vértice",
        ranking=4.50,
    )
    empresa4 = Empresa(
        nombre_empresa="Redes y Sistemas Cía. Ltda.",
        ranking=4.60,
    )

    db.session.add_all([empresa1, empresa2, empresa3, empresa4])
    db.session.flush()

    # ── 3. CANDIDATOS (JÓVENES Y ESTUDIANTES) & RECLUTADORES ─────
    candidato1 = Candidato(
        nombre="Mateo Morales",
        edad=21,
        correo="mateo.morales@estudiantes.ec",
        cv_pdf_url="assets/cv_mateo_morales.pdf",
        perfil_linkedin="https://linkedin.com/in/mateomorales-demo",
        salario_pretendido=500.00,
        rol="candidato",
    )
    candidato1.set_password("candidato123")

    candidato2 = Candidato(
        nombre="Valeria Torres",
        edad=22,
        correo="valeria.torres@estudiantes.ec",
        cv_pdf_url="assets/cv_valeria_torres.pdf",
        perfil_linkedin="https://linkedin.com/in/valeriatorres-dev",
        salario_pretendido=650.00,
        rol="candidato",
    )
    candidato2.set_password("candidato123")

    candidato3 = Candidato(
        nombre="Andrés Cevallos",
        edad=20,
        correo="andres.cevallos@estudiantes.ec",
        cv_pdf_url="assets/cv_andres_cevallos.pdf",
        perfil_linkedin="https://linkedin.com/in/andrescevallos-demo",
        salario_pretendido=460.00,
        rol="candidato",
    )
    candidato3.set_password("candidato123")

    # Usuario Reclutador de Empresa
    reclutador1 = Candidato(
        nombre="Sofía Reclutadora (Software Solutions EC)",
        edad=30,
        correo="reclutador@empresa.ec",
        cv_pdf_url=None,
        perfil_linkedin="https://linkedin.com/in/sofia-reclutadora",
        salario_pretendido=None,
        rol="reclutador",
    )
    reclutador1.set_password("reclutador123")

    db.session.add_all([candidato1, candidato2, candidato3, reclutador1])
    db.session.flush()

    # ── 4. HABILIDADES Y CERTIFICACIONES ────────────────────────
    hab1 = HabilidadCertificacion(
        id_candidato=candidato1.id_candidato,
        descripcion="Diseño UI/UX en Figma",
        verificada=True,
    )
    hab2 = HabilidadCertificacion(
        id_candidato=candidato1.id_candidato,
        descripcion="HTML5 & CSS3 Responsive",
        verificada=True,
    )
    hab3 = HabilidadCertificacion(
        id_candidato=candidato2.id_candidato,
        descripcion="Frontend con JavaScript (ES6+)",
        verificada=True,
    )
    hab4 = HabilidadCertificacion(
        id_candidato=candidato2.id_candidato,
        descripcion="Python & Flask / PostgreSQL",
        verificada=False,
    )
    hab5 = HabilidadCertificacion(
        id_candidato=candidato3.id_candidato,
        descripcion="Soporte Técnico & Redes CISCO",
        verificada=True,
    )

    db.session.add_all([hab1, hab2, hab3, hab4, hab5])

    # ── 5. OFERTAS DE EMPLEO (VACANTES REALES DE TALENTOEC) ─────
    oferta1 = OfertaEmpleo(
        id_empresa=empresa1.id_empresa,
        titulo="Pasantía de Diseño UX/UI",
        salario=460.00,
        modalidad="Híbrido (Flexible clases)",
        anos_experiencia=0,
        ubicacion_exacta="Quito Norte (La Carolina)",
        funciones="Colabora en el rediseño de plataformas educativas digitales y diseño de componentes en Figma.",
        requisitos_tecnicos="Manejo de Figma, nociones básicas de UI/UX y trabajo en equipo.",
    )
    oferta2 = OfertaEmpleo(
        id_empresa=empresa2.id_empresa,
        titulo="Desarrollador Front-End Junior",
        salario=650.00,
        modalidad="Remoto Completo",
        anos_experiencia=0,
        ubicacion_exacta="Remoto (Base Quito)",
        funciones="Desarrollo de interfaces web con HTML, CSS, JavaScript y consumo de APIs REST.",
        requisitos_tecnicos="HTML5, CSS3, JavaScript ES6+, Git y muchas ganas de aprender.",
    )
    oferta3 = OfertaEmpleo(
        id_empresa=empresa3.id_empresa,
        titulo="Asistente de Marketing Digital",
        salario=500.00,
        modalidad="Presencial (Part-time disp.)",
        anos_experiencia=0,
        ubicacion_exacta="Quito (Cumbayá)",
        funciones="Administración de redes sociales, creación de contenido multimedia básico e informes de métricas.",
        requisitos_tecnicos="Manejo de Canva / Illustrator y nociones de Meta Business Suite.",
    )
    oferta4 = OfertaEmpleo(
        id_empresa=empresa4.id_empresa,
        titulo="Soporte Técnico Junior",
        salario=480.00,
        modalidad="Presencial",
        anos_experiencia=0,
        ubicacion_exacta="Quito Centro Histórico",
        funciones="Mantenimiento preventivo de computadores, soporte a usuarios y configuración de redes locales.",
        requisitos_tecnicos="Sistemas operativos Windows/Linux y cableado estructurado.",
    )

    db.session.add_all([oferta1, oferta2, oferta3, oferta4])
    db.session.flush()

    # ── 6. POSTULACIONES DE PRUEBA (4 FASES DEL KANBAN) ─────────
    post1 = Postulacion(
        id_candidato=candidato1.id_candidato,
        id_oferta=oferta1.id_oferta,
        estado="Pendiente",
        fecha_postulacion=date.today(),
    )
    post2 = Postulacion(
        id_candidato=candidato2.id_candidato,
        id_oferta=oferta2.id_oferta,
        estado="En Evaluación",
        fecha_postulacion=date.today(),
    )
    post3 = Postulacion(
        id_candidato=candidato3.id_candidato,
        id_oferta=oferta4.id_oferta,
        estado="Entrevista",
        fecha_postulacion=date.today(),
    )
    post4 = Postulacion(
        id_candidato=candidato1.id_candidato,
        id_oferta=oferta2.id_oferta,
        estado="Aceptada",
        fecha_postulacion=date.today(),
    )

    db.session.add_all([post1, post2, post3, post4])

    # ── 7. FAVORITOS ────────────────────────────────────────────
    fav1 = Favorito(
        id_candidato=candidato1.id_candidato,
        id_oferta=oferta2.id_oferta,
    )
    fav2 = Favorito(
        id_candidato=candidato2.id_candidato,
        id_oferta=oferta1.id_oferta,
    )

    db.session.add_all([fav1, fav2])

    # Guardar todos los cambios
    db.session.commit()

    print("[OK] Datos de prueba de TalentoEC insertados exitosamente.")
    print("\nResumen de registros cargados:")
    print(f"  * {Empresa.query.count()} Empresas")
    print(f"  * {Candidato.query.count()} Candidatos")
    print(f"  * {HabilidadCertificacion.query.count()} Habilidades registradas")
    print(f"  * {OfertaEmpleo.query.count()} Ofertas de empleo")
    print(f"  * {Postulacion.query.count()} Postulaciones activas")
    print(f"  * {Favorito.query.count()} Ofertas guardadas como favoritas")