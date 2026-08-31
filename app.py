"""
app.py
──────
Punto de entrada de la aplicación TalentoEC.
Configura la aplicación Flask, conecta la base de datos PostgreSQL con SQLAlchemy,
y define las rutas para las vistas HTML y las APIs REST.
"""

from datetime import date
from flask import Flask, render_template, send_from_directory, jsonify, request, session
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
# RUTAS DE AUTENTICACIÓN (LOGIN, REGISTRO, SESIÓN)
# ══════════════════════════════════════════════════════════════

@app.route("/api/registro", methods=["POST"])
def registro():
    """Registra una nueva cuenta de candidato y crea la sesión automáticamente."""
    data = request.get_json() or {}
    nombre = data.get("nombre", "").strip()
    correo = data.get("correo", "").strip().lower()
    contrasena = data.get("contrasena", "").strip()
    edad = data.get("edad")
    salario_pretendido = data.get("salario_pretendido")

    if not nombre or not correo or not contrasena:
        return jsonify({"error": "Nombre, correo y contraseña son obligatorios."}), 400

    if len(contrasena) < 6:
        return jsonify({"error": "La contraseña debe tener al menos 6 caracteres."}), 400

    # Verificar si el correo ya está registrado
    if Candidato.query.filter_by(correo=correo).first():
        return jsonify({"error": "Este correo electrónico ya se encuentra registrado."}), 409

    nuevo_candidato = Candidato(
        nombre=nombre,
        correo=correo,
        edad=int(edad) if edad else None,
        salario_pretendido=float(salario_pretendido) if salario_pretendido else None,
    )
    nuevo_candidato.set_password(contrasena)

    db.session.add(nuevo_candidato)
    db.session.commit()

    # Iniciar sesión automáticamente
    session["usuario_id"] = nuevo_candidato.id_candidato
    session["usuario_nombre"] = nuevo_candidato.nombre
    session["usuario_correo"] = nuevo_candidato.correo
    session["usuario_rol"] = "candidato"

    return jsonify({
        "mensaje": "¡Cuenta creada exitosamente!",
        "usuario": nuevo_candidato.to_dict()
    }), 201


@app.route("/api/login", methods=["POST"])
def login():
    """Valida credenciales e inicia sesión para un candidato."""
    data = request.get_json() or {}
    correo = data.get("correo", "").strip().lower()
    contrasena = data.get("contrasena", "").strip()

    if not correo or not contrasena:
        return jsonify({"error": "Por favor ingresa tu correo y contraseña."}), 400

    candidato = Candidato.query.filter_by(correo=correo).first()

    if not candidato or not candidato.check_password(contrasena):
        return jsonify({"error": "Correo o contraseña incorrectos."}), 401

    # Establecer variables de sesión
    session["usuario_id"] = candidato.id_candidato
    session["usuario_nombre"] = candidato.nombre
    session["usuario_correo"] = candidato.correo
    session["usuario_rol"] = "candidato"

    return jsonify({
        "mensaje": f"¡Bienvenido de nuevo, {candidato.nombre}!",
        "usuario": candidato.to_dict()
    }), 200


@app.route("/api/usuario-actual", methods=["GET"])
def usuario_actual():
    """Retorna los datos del usuario autenticado en la sesión actual."""
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"autenticado": False, "usuario": None})

    candidato = db.session.get(Candidato, usuario_id)
    if not candidato:
        session.clear()
        return jsonify({"autenticado": False, "usuario": None})

    return jsonify({
        "autenticado": True,
        "usuario": candidato.to_dict()
    })


@app.route("/api/logout", methods=["POST", "GET"])
def logout():
    """Cierra la sesión del usuario actual."""
    session.clear()
    return jsonify({"mensaje": "Sesión cerrada correctamente.", "autenticado": False}), 200


# ══════════════════════════════════════════════════════════════
# RUTAS DE API REST (OFERTAS, POSTULACIONES, EMPRESAS)
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
    oferta = db.get_or_404(OfertaEmpleo, oferta_id)
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
    """Crea una nueva postulación para el usuario en sesión o candidato enviado."""
    data = request.get_json() or {}
    id_candidato = session.get("usuario_id") or data.get("id_candidato", 1)
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
    resultado = [c.to_dict() for c in candidatos]
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