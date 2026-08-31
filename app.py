"""
app.py
──────
Punto de entrada de la aplicación TalentoEC.
Configura la aplicación Flask, conecta la base de datos PostgreSQL con SQLAlchemy,
y define las rutas para las vistas HTML y las APIs REST.
"""

from datetime import date
from flask import Flask, render_template, send_from_directory, jsonify, request
from config import Config
from models import (
    db,
    PlanContratacion,
    Empresa,
    Candidato,
    OfertaEmpleo,
    ResenaEmpresa,
    HabilidadCertificacion,
    Postulacion,
    Favorito,
)

# Inicializar Flask configurando la carpeta templates y sirviendo estáticos desde la raíz
app = Flask(__name__, template_folder="templates", static_folder=".", static_url_path="")
app.config.from_object(Config)

# Conectar la app con la instancia de SQLAlchemy definida en models.py
db.init_app(app)


# ══════════════════════════════════════════════════════════════
# RUTAS DE VISTAS (PÁGINAS HTML)
# ══════════════════════════════════════════════════════════════

@app.route("/")
@app.route("/index.html")
def inicio():
    """Página principal: Landing page con ofertas destacadas."""
    ofertas = OfertaEmpleo.query.all()
    return render_template("index.html", ofertas=ofertas)


@app.route("/postulacion")
@app.route("/postulacion.html")
def postulacion():
    """Página de búsqueda de empleos y postulación rápida."""
    ofertas = OfertaEmpleo.query.all()
    return render_template("postulacion.html", ofertas=ofertas)


@app.route("/desarrollo")
@app.route("/desarrollo.html")
def desarrollo():
    """Página de desarrollo profesional y CV Builder."""
    return render_template("desarrollo.html")


@app.route("/reclutadores")
@app.route("/reclutadores.html")
def reclutadores():
    """Página de portal de empresas y tablero de reclutadores."""
    return render_template("reclutadores.html")


# ══════════════════════════════════════════════════════════════
# RUTAS DE API REST (JSON)
# ══════════════════════════════════════════════════════════════

@app.route("/api/ofertas", methods=["GET"])
def get_ofertas():
    """Retorna el listado de todas las ofertas de empleo en formato JSON."""
    ofertas = OfertaEmpleo.query.all()
    resultado = []
    for oferta in ofertas:
        resultado.append({
            "id_oferta": oferta.id_oferta,
            "titulo": oferta.titulo,
            "empresa": oferta.empresa.nombre_empresa if oferta.empresa else "Empresa",
            "salario": float(oferta.salario) if oferta.salario else None,
            "modalidad": oferta.modalidad,
            "anos_experiencia": oferta.anos_experiencia,
            "ubicacion_exacta": oferta.ubicacion_exacta,
            "funciones": oferta.funciones,
            "requisitos_tecnicos": oferta.requisitos_tecnicos,
        })
    return jsonify(resultado)


@app.route("/api/ofertas/<int:oferta_id>", methods=["GET"])
def get_oferta_detalle(oferta_id):
    """Retorna el detalle de una oferta específica."""
    oferta = OfertaEmpleo.query.get_or_404(oferta_id)
    return jsonify({
        "id_oferta": oferta.id_oferta,
        "titulo": oferta.titulo,
        "empresa": oferta.empresa.nombre_empresa if oferta.empresa else "Empresa",
        "salario": float(oferta.salario) if oferta.salario else None,
        "modalidad": oferta.modalidad,
        "anos_experiencia": oferta.anos_experiencia,
        "ubicacion_exacta": oferta.ubicacion_exacta,
        "funciones": oferta.funciones,
        "requisitos_tecnicos": oferta.requisitos_tecnicos,
    })


@app.route("/api/postular", methods=["POST"])
def crear_postulacion():
    """Crea una nueva postulación para un candidato."""
    data = request.get_json() or {}
    id_candidato = data.get("id_candidato", 1)  # Candidato por defecto
    id_oferta = data.get("id_oferta")

    if not id_oferta:
        return jsonify({"error": "El campo 'id_oferta' es obligatorio"}), 400

    nueva_postulacion = Postulacion(
        id_candidato=id_candidato,
        id_oferta=id_oferta,
        estado="Pendiente",
        fecha_postulacion=date.today(),
    )
    db.session.add(nueva_postulacion)
    db.session.commit()

    return jsonify({
        "mensaje": "Postulación registrada correctamente",
        "id_postulacion": nueva_postulacion.id_postulacion,
    }), 201


@app.route("/api/candidatos", methods=["GET"])
def get_candidatos():
    """Retorna el listado de candidatos registrados."""
    candidatos = Candidato.query.all()
    resultado = []
    for c in candidatos:
        resultado.append({
            "id_candidato": c.id_candidato,
            "nombre": c.nombre,
            "edad": c.edad,
            "correo": c.correo,
            "perfil_linkedin": c.perfil_linkedin,
            "salario_pretendido": float(c.salario_pretendido) if c.salario_pretendido else None,
            "habilidades": [h.descripcion for h in c.habilidades],
        })
    return jsonify(resultado)


@app.route("/api/empresas", methods=["GET"])
def get_empresas():
    """Retorna el listado de empresas afiliadas."""
    empresas = Empresa.query.all()
    resultado = []
    for e in empresas:
        resultado.append({
            "id_empresa": e.id_empresa,
            "nombre_empresa": e.nombre_empresa,
            "ranking": float(e.ranking) if e.ranking else None,
            "plan": e.plan_contratacion.nombre_plan if e.plan_contratacion else None,
            "total_ofertas": len(e.ofertas),
        })
    return jsonify(resultado)


if __name__ == "__main__":
    app.run(debug=True)