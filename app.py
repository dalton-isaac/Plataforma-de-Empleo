"""
app.py
──────
Punto de entrada de la aplicación TalentoEC.
Configura la aplicación Flask, conecta la base de datos PostgreSQL con SQLAlchemy,
y define las rutas para las vistas HTML y las APIs REST.
"""

from datetime import date
from flask import (
    Flask,
    render_template,
    send_from_directory,
    jsonify,
    request,
    session,
    redirect,
    url_for,
    flash,
)
from config import Config
from auth import login_requerido, rol_requerido
from models import (
    db,
    Empresa,
    Candidato,
    OfertaEmpleo,
    HabilidadCertificacion,
    Postulacion,
    Favorito,
)

# Inicializar Flask configurando la carpeta templates y sirviendo estáticos desde la raíz
app = Flask(__name__, template_folder="templates", static_folder=".", static_url_path="")
app.config.from_object(Config)

# Conectar la app con la instancia de SQLAlchemy definida en models.py
db.init_app(app)

# Asegurar que todas las tablas existan automáticamente al arrancar la aplicación
with app.app_context():
    db.create_all()


# ══════════════════════════════════════════════════════════════
# RUTAS DE VISTAS (PÁGINAS HTML)
# ══════════════════════════════════════════════════════════════

@app.route("/")
@app.route("/index.html")
def inicio():
    """Página principal: Landing page con ofertas destacadas activas."""
    ofertas = OfertaEmpleo.query.filter_by(activo=True).all()
    return render_template("index.html", ofertas=ofertas)


@app.route("/postulacion")
@app.route("/postulacion.html")
def postulacion():
    """Página de búsqueda de empleos y postulación rápida (solo activas)."""
    ofertas = OfertaEmpleo.query.filter_by(activo=True).all()
    return render_template("postulacion.html", ofertas=ofertas)


@app.route("/desarrollo")
@app.route("/desarrollo.html")
def desarrollo():
    """Página de desarrollo profesional y CV Builder."""
    return render_template("desarrollo.html")


@app.route("/reclutadores")
@app.route("/reclutadores.html")
@rol_requerido(["reclutador", "admin"])
def reclutadores():
    """Página de portal de empresas y tablero de reclutadores con listado de vacantes y Kanban."""
    ofertas = OfertaEmpleo.query.all()
    empresas = Empresa.query.all()
    postulaciones = Postulacion.query.order_by(Postulacion.id_postulacion.desc()).all()
    return render_template("reclutadores.html", ofertas=ofertas, empresas=empresas, postulaciones=postulaciones)


@app.route("/postulaciones")
@login_requerido
def mis_postulaciones():
    """Historial de postulaciones del candidato autenticado."""
    usuario_id = session.get("usuario_id")
    postulaciones = Postulacion.query.filter_by(id_candidato=usuario_id).order_by(Postulacion.id_postulacion.desc()).all()
    if request.is_json:
        return jsonify([p.to_dict() for p in postulaciones])
    return render_template("postulaciones.html", postulaciones=postulaciones)


# ══════════════════════════════════════════════════════════════
# RUTAS DE AUTENTICACIÓN (LOGIN, REGISTRO, SESIÓN)
# ══════════════════════════════════════════════════════════════

@app.route("/registro", methods=["GET", "POST"])
@app.route("/api/registro", methods=["POST"])
def registro():
    """Registra una nueva cuenta (Candidato o Reclutador) y crea la sesión automáticamente."""
    is_json = request.is_json

    if request.method == "POST":
        if is_json:
            data = request.get_json() or {}
            nombre = data.get("nombre", "").strip()
            correo = data.get("correo", "").strip().lower()
            contrasena = data.get("contrasena", "").strip()
            rol = data.get("rol", "candidato").strip().lower()
            edad = data.get("edad")
            salario_pretendido = data.get("salario_pretendido")
            nombre_empresa = data.get("nombre_empresa", "").strip()
        else:
            nombre = request.form.get("nombre", "").strip()
            correo = request.form.get("correo", request.form.get("email", "")).strip().lower()
            contrasena = request.form.get("contrasena", request.form.get("password", "")).strip()
            rol = request.form.get("rol", "candidato").strip().lower()
            edad = request.form.get("edad")
            salario_pretendido = request.form.get("salario_pretendido")
            nombre_empresa = request.form.get("nombre_empresa", "").strip()

        if not nombre or not correo or not contrasena:
            mensaje_err = "Nombre, correo y contraseña son obligatorios."
            if is_json:
                return jsonify({"error": mensaje_err}), 400
            flash(mensaje_err, "danger")
            return redirect(url_for("inicio"))

        if len(contrasena) < 6:
            mensaje_err = "La contraseña debe tener al menos 6 caracteres."
            if is_json:
                return jsonify({"error": mensaje_err}), 400
            flash(mensaje_err, "danger")
            return redirect(url_for("inicio"))

        # Verificar si el correo ya está registrado
        if Candidato.query.filter_by(correo=correo).first():
            mensaje_err = "Este correo electrónico ya se encuentra registrado."
            if is_json:
                return jsonify({"error": mensaje_err}), 409
            flash(mensaje_err, "danger")
            return redirect(url_for("inicio"))

        # Si se registra como reclutador y especificó empresa, asegurar que la empresa exista
        if rol == "reclutador" and nombre_empresa:
            empresa_existente = Empresa.query.filter_by(nombre_empresa=nombre_empresa).first()
            if not empresa_existente:
                nueva_empresa = Empresa(
                    nombre_empresa=nombre_empresa,
                    ranking=5.0
                )
                db.session.add(nueva_empresa)
                db.session.flush()

        nuevo_candidato = Candidato(
            nombre=nombre,
            correo=correo,
            rol=rol if rol in ["candidato", "reclutador"] else "candidato",
            edad=int(edad) if edad and str(edad).isdigit() else None,
            salario_pretendido=float(salario_pretendido) if salario_pretendido else None,
        )
        nuevo_candidato.set_password(contrasena)

        db.session.add(nuevo_candidato)
        db.session.commit()

        # Iniciar sesión automáticamente
        session["usuario_id"] = nuevo_candidato.id_candidato
        session["usuario_nombre"] = nuevo_candidato.nombre
        session["usuario_correo"] = nuevo_candidato.correo
        session["usuario_rol"] = nuevo_candidato.rol or "candidato"

        if is_json:
            return jsonify({
                "mensaje": "¡Cuenta creada exitosamente!",
                "usuario": nuevo_candidato.to_dict()
            }), 201

        flash(f"¡Bienvenido a TalentoEC, {nuevo_candidato.nombre}! Cuenta creada con éxito.", "success")
        if nuevo_candidato.rol == "reclutador":
            return redirect(url_for("reclutadores"))
        return redirect(url_for("inicio"))

    return redirect(url_for("inicio"))


@app.route("/login", methods=["GET", "POST"])
@app.route("/api/login", methods=["POST"])
def login():
    """Valida credenciales e inicia sesión para un candidato o reclutador."""
    is_json = request.is_json

    if request.method == "POST":
        if is_json:
            data = request.get_json() or {}
            correo = data.get("correo", data.get("email", "")).strip().lower()
            contrasena = data.get("contrasena", data.get("password", "")).strip()
        else:
            correo = request.form.get("correo", request.form.get("email", "")).strip().lower()
            contrasena = request.form.get("contrasena", request.form.get("password", "")).strip()

        if not correo or not contrasena:
            mensaje_err = "Por favor ingresa tu correo y contraseña."
            if is_json:
                return jsonify({"error": mensaje_err}), 400
            flash(mensaje_err, "danger")
            return redirect(url_for("inicio"))

        candidato = Candidato.query.filter_by(correo=correo).first()

        if not candidato or not candidato.check_password(contrasena):
            mensaje_err = "Correo o contraseña incorrectos."
            if is_json:
                return jsonify({"error": mensaje_err}), 401
            flash(mensaje_err, "danger")
            return redirect(url_for("inicio"))

        # Establecer variables de sesión
        session["usuario_id"] = candidato.id_candidato
        session["usuario_nombre"] = candidato.nombre
        session["usuario_correo"] = candidato.correo
        session["usuario_rol"] = candidato.rol or "candidato"

        if is_json:
            return jsonify({
                "mensaje": f"¡Bienvenido de nuevo, {candidato.nombre}!",
                "usuario": candidato.to_dict()
            }), 200

        flash(f"¡Bienvenido de nuevo, {candidato.nombre}!", "success")
        return redirect(url_for("inicio"))

    return redirect(url_for("inicio"))


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


@app.route("/logout", methods=["GET", "POST"])
def logout():
    """Cierra la sesión del usuario actual y redirige limpiamente a la página de Inicio."""
    session.clear()
    flash("Sesión cerrada correctamente.", "success")
    response = redirect(url_for("inicio"))
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response


@app.route("/api/logout", methods=["POST", "GET"])
def api_logout():
    """Endpoint REST para cerrar sesión mediante llamadas Fetch/AJAX."""
    session.clear()
    response = jsonify({"mensaje": "Sesión cerrada correctamente.", "autenticado": False})
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response, 200


# ══════════════════════════════════════════════════════════════
# CRUD DE OFERTAS DE EMPLEO / VACANTES (PROTEGIDO POR ROLES)
# ══════════════════════════════════════════════════════════════

@app.route("/api/ofertas", methods=["GET"])
def get_ofertas():
    """Listado público de todas las ofertas de empleo activas."""
    ofertas = OfertaEmpleo.query.filter_by(activo=True).all()
    return jsonify([o.to_dict() for o in ofertas])


@app.route("/vacantes/nueva", methods=["GET", "POST"])
@app.route("/api/ofertas", methods=["POST"])
@rol_requerido(["reclutador", "admin"])
def vacantes_nueva():
    """CRUD - Crear nueva vacante (Exclusivo para Reclutadores / Administradores)."""
    if request.method == "GET":
        return redirect(url_for("reclutadores"))

    # POST: Crear nueva vacante
    is_json = request.is_json
    if is_json:
        data = request.get_json() or {}
        titulo = data.get("titulo", "").strip()
        id_empresa = data.get("id_empresa")
        salario = data.get("salario")
        modalidad = data.get("modalidad", "Híbrido")
        anos_experiencia = data.get("anos_experiencia", 0)
        ubicacion_exacta = data.get("ubicacion_exacta", "Quito")
        funciones = data.get("funciones", "")
        requisitos_tecnicos = data.get("requisitos_tecnicos", "")
    else:
        titulo = request.form.get("titulo", "").strip()
        id_empresa = request.form.get("id_empresa")
        salario = request.form.get("salario")
        modalidad = request.form.get("modalidad", "Híbrido")
        anos_experiencia = request.form.get("anos_experiencia", 0)
        ubicacion_exacta = request.form.get("ubicacion_exacta", "Quito")
        funciones = request.form.get("funciones", "")
        requisitos_tecnicos = request.form.get("requisitos_tecnicos", "")

    if not titulo:
        msg = "El título de la vacante es obligatorio."
        if is_json:
            return jsonify({"error": msg}), 400
        flash(msg, "danger")
        return redirect(url_for("reclutadores"))

    # Si no se especifica empresa, asignar la primera disponible o 1
    if not id_empresa:
        primera_empresa = Empresa.query.first()
        id_empresa = primera_empresa.id_empresa if primera_empresa else 1

    try:
        salario_val = float(salario) if salario else None
        experiencia_val = int(anos_experiencia) if anos_experiencia else 0

        nueva_oferta = OfertaEmpleo(
            id_empresa=int(id_empresa),
            titulo=titulo,
            salario=salario_val,
            modalidad=modalidad,
            anos_experiencia=experiencia_val,
            ubicacion_exacta=ubicacion_exacta,
            funciones=funciones,
            requisitos_tecnicos=requisitos_tecnicos,
            activo=True,
        )
        db.session.add(nueva_oferta)
        db.session.commit()

        if is_json:
            return jsonify({
                "mensaje": f"Vacante '{nueva_oferta.titulo}' publicada con éxito.",
                "oferta": nueva_oferta.to_dict()
            }), 201

        flash(f"¡Vacante '{nueva_oferta.titulo}' publicada correctamente!", "success")
        return redirect(url_for("reclutadores"))

    except ValueError:
        msg = "Revisa que el salario y los años de experiencia sean números válidos."
        if is_json:
            return jsonify({"error": msg}), 400
        flash(msg, "danger")
        return redirect(url_for("reclutadores"))
    except Exception as e:
        db.session.rollback()
        msg = f"Ocurrió un error al guardar la vacante: {str(e)}"
        if is_json:
            return jsonify({"error": msg}), 500
        flash(msg, "danger")
        return redirect(url_for("reclutadores"))


@app.route("/vacantes/<int:oferta_id>/editar", methods=["GET", "POST"])
@rol_requerido(["reclutador", "admin"])
def editar_vacante(oferta_id):
    """CRUD - Editar una vacante existente (Exclusivo Reclutadores)."""
    oferta = db.get_or_404(OfertaEmpleo, oferta_id)

    if request.method == "POST":
        is_json = request.is_json
        if is_json:
            data = request.get_json() or {}
            titulo = data.get("titulo", oferta.titulo).strip()
            salario = data.get("salario")
            modalidad = data.get("modalidad", oferta.modalidad)
            anos_experiencia = data.get("anos_experiencia")
            ubicacion_exacta = data.get("ubicacion_exacta", oferta.ubicacion_exacta)
            funciones = data.get("funciones", oferta.funciones)
            requisitos_tecnicos = data.get("requisitos_tecnicos", oferta.requisitos_tecnicos)
        else:
            titulo = request.form.get("titulo", oferta.titulo).strip()
            salario = request.form.get("salario")
            modalidad = request.form.get("modalidad", oferta.modalidad)
            anos_experiencia = request.form.get("anos_experiencia")
            ubicacion_exacta = request.form.get("ubicacion_exacta", oferta.ubicacion_exacta)
            funciones = request.form.get("funciones", oferta.funciones)
            requisitos_tecnicos = request.form.get("requisitos_tecnicos", oferta.requisitos_tecnicos)

        try:
            oferta.titulo = titulo
            oferta.modalidad = modalidad
            oferta.ubicacion_exacta = ubicacion_exacta
            oferta.funciones = funciones
            oferta.requisitos_tecnicos = requisitos_tecnicos

            if salario is not None and salario != "":
                oferta.salario = float(salario)
            if anos_experiencia is not None and anos_experiencia != "":
                oferta.anos_experiencia = int(anos_experiencia)

            db.session.commit()

            if is_json:
                return jsonify({
                    "mensaje": f"Vacante '{oferta.titulo}' actualizada exitosamente.",
                    "oferta": oferta.to_dict()
                }), 200

            flash(f"Vacante '{oferta.titulo}' actualizada correctamente.", "success")
            return redirect(url_for("reclutadores"))

        except ValueError:
            msg = "Revisa que los valores numéricos ingresados sean válidos."
            if is_json:
                return jsonify({"error": msg}), 400
            flash(msg, "danger")
            return redirect(url_for("editar_vacante", oferta_id=oferta.id_oferta))

    # GET: renderizar plantilla de edición
    return render_template("editar_vacante.html", oferta=oferta)


@app.route("/vacantes/<int:oferta_id>/desactivar", methods=["POST"])
@rol_requerido(["reclutador", "admin"])
def desactivar_vacante(oferta_id):
    """CRUD - Desactivar vacante (Soft Delete - Exclusivo Reclutadores)."""
    oferta = db.get_or_404(OfertaEmpleo, oferta_id)
    oferta.activo = False
    db.session.commit()

    if request.is_json:
        return jsonify({"mensaje": f"Vacante '{oferta.titulo}' desactivada.", "activo": False}), 200

    flash(f"Vacante '{oferta.titulo}' pausada/desactivada del catálogo público.", "warning")
    return redirect(url_for("reclutadores"))


@app.route("/vacantes/<int:oferta_id>/reactivar", methods=["POST"])
@rol_requerido(["reclutador", "admin"])
def reactivar_vacante(oferta_id):
    """CRUD - Reactivar vacante pausada (Exclusivo Reclutadores)."""
    oferta = db.get_or_404(OfertaEmpleo, oferta_id)
    oferta.activo = True
    db.session.commit()

    if request.is_json:
        return jsonify({"mensaje": f"Vacante '{oferta.titulo}' reactivada.", "activo": True}), 200

    flash(f"Vacante '{oferta.titulo}' reactivada en el catálogo público.", "success")
    return redirect(url_for("reclutadores"))


@app.route("/api/ofertas/<int:oferta_id>", methods=["GET"])
def get_oferta_detalle(oferta_id):
    """Retorna el detalle de una oferta específica."""
    oferta = db.get_or_404(OfertaEmpleo, oferta_id)
    return jsonify(oferta.to_dict())


@app.route("/api/postular", methods=["POST"])
@login_requerido
def crear_postulacion():
    """Crea una nueva postulación para el usuario en sesión (Requiere Login y Rol Candidato)."""
    # Restricción estricta de rol: Empresas y Reclutadores NO pueden postularse
    rol_actual = session.get("usuario_rol")
    if rol_actual in ["reclutador", "admin"]:
        return jsonify({
            "error": "Las cuentas con perfil de Empresa / Reclutador no pueden postularse a ofertas de empleo. Inicia sesión como Candidato para aplicar.",
            "codigo": 403,
            "solo_candidatos": True
        }), 403

    data = request.get_json() or {}
    id_candidato = session.get("usuario_id")
    id_oferta = data.get("id_oferta") or request.form.get("id_oferta")

    if not id_oferta:
        return jsonify({"error": "El campo 'id_oferta' es obligatorio"}), 400

    try:
        id_oferta_int = int(id_oferta)
    except ValueError:
        return jsonify({"error": "ID de oferta no válido"}), 400

    # Verificar existencia de la oferta
    oferta = db.session.get(OfertaEmpleo, id_oferta_int)
    if not oferta or not oferta.activo:
        return jsonify({"error": "La oferta de empleo no existe o ya no se encuentra activa."}), 404

    # Verificar si el candidato ya se postuló a esta oferta
    existente = Postulacion.query.filter_by(id_candidato=id_candidato, id_oferta=id_oferta_int).first()
    if existente:
        return jsonify({
            "mensaje": f"Ya te encuentras postulado a la vacante '{oferta.titulo}'. Estado actual: {existente.estado}",
            "id_postulacion": existente.id_postulacion,
            "estado": existente.estado,
            "ya_postulado": True
        }), 200

    nueva_postulacion = Postulacion(
        id_candidato=id_candidato,
        id_oferta=id_oferta_int,
        estado="Pendiente",
        fecha_postulacion=date.today(),
    )
    db.session.add(nueva_postulacion)
    db.session.commit()

    return jsonify({
        "mensaje": f"¡Postulación registrada con éxito para '{oferta.titulo}'!",
        "id_postulacion": nueva_postulacion.id_postulacion,
        "estado": nueva_postulacion.estado,
        "ya_postulado": False
    }), 201


@app.route("/api/postulacion/<int:postulacion_id>/estado", methods=["POST"])
@rol_requerido(["reclutador", "admin"])
def actualizar_estado_postulacion(postulacion_id):
    """Actualiza la fase/estado de una postulación en el tablero Kanban (Reclutadores)."""
    postulacion = db.get_or_404(Postulacion, postulacion_id)
    data = request.get_json() or {}
    nuevo_estado = data.get("estado") or request.form.get("estado")

    estados_validos = ["Pendiente", "En Evaluación", "Entrevista", "Aceptada", "Rechazada"]
    if not nuevo_estado or nuevo_estado not in estados_validos:
        return jsonify({"error": f"Estado inválido. Debe ser uno de: {', '.join(estados_validos)}"}), 400

    postulacion.estado = nuevo_estado
    db.session.commit()

    if request.is_json or request.path.startswith("/api/"):
        return jsonify({
            "mensaje": f"Candidato movido a la fase '{nuevo_estado}' con éxito.",
            "id_postulacion": postulacion.id_postulacion,
            "estado": postulacion.estado
        }), 200

    flash(f"Candidato actualizado a la fase '{nuevo_estado}'.", "success")
    return redirect(url_for("reclutadores"))


# ══════════════════════════════════════════════════════════════
# MÓDULO DE CARRITO / VACANTES GUARDADAS (FAVORITOS - SEMANA 3)
# ══════════════════════════════════════════════════════════════

@app.route("/favoritos/agregar/<int:oferta_id>", methods=["POST"])
@rol_requerido(["candidato"])
def agregar_favorito(oferta_id):
    """Agrega una vacante a la bolsa de favoritos en PostgreSQL y en sesión (Solo Candidatos)."""
    oferta = db.get_or_404(OfertaEmpleo, oferta_id)
    usuario_id = session.get("usuario_id")

    # Persistencia en base de datos PostgreSQL
    existente = Favorito.query.filter_by(id_candidato=usuario_id, id_oferta=oferta_id).first()
    if not existente:
        nuevo_fav = Favorito(id_candidato=usuario_id, id_oferta=oferta_id)
        db.session.add(nuevo_fav)
        db.session.commit()

    # Sincronización en sesión
    favoritos = session.get("favoritos", {})
    favoritos[str(oferta_id)] = True
    session["favoritos"] = favoritos

    if request.is_json or request.path.startswith("/api/"):
        return jsonify({
            "mensaje": f"Vacante '{oferta.titulo}' guardada en tus favoritos.",
            "favoritos": list(favoritos.keys())
        }), 200

    flash(f"'{oferta.titulo}' guardada en tus vacantes favoritas.", "success")
    return redirect(request.referrer or url_for("inicio"))


@app.route("/favoritos", methods=["GET"])
@rol_requerido(["candidato"])
def ver_favoritos():
    """Visualiza la lista de vacantes guardadas por el candidato desde PostgreSQL."""
    usuario_id = session.get("usuario_id")
    fav_records = Favorito.query.filter_by(id_candidato=usuario_id).all()

    items = []
    favoritos_session = {}
    for fav in fav_records:
        if fav.oferta and fav.oferta.activo:
            items.append(fav.oferta)
            favoritos_session[str(fav.id_oferta)] = True

    # Sincronizar sesión
    session["favoritos"] = favoritos_session

    if request.is_json:
        return jsonify([o.to_dict() for o in items])

    return render_template("favoritos.html", items=items)


@app.route("/favoritos/eliminar/<int:oferta_id>", methods=["POST"])
@rol_requerido(["candidato"])
def eliminar_favorito(oferta_id):
    """Elimina una vacante de la bolsa de favoritos en PostgreSQL y en sesión."""
    usuario_id = session.get("usuario_id")
    existente = Favorito.query.filter_by(id_candidato=usuario_id, id_oferta=oferta_id).first()
    if existente:
        db.session.delete(existente)
        db.session.commit()

    favoritos = session.get("favoritos", {})
    clave = str(oferta_id)
    if clave in favoritos:
        del favoritos[clave]
        session["favoritos"] = favoritos

    if request.is_json or request.path.startswith("/api/"):
        return jsonify({"mensaje": "Vacante quitada de favoritos."}), 200

    flash("Vacante quitada de tus favoritos.", "success")
    return redirect(url_for("ver_favoritos"))


@app.route("/api/candidatos", methods=["GET"])
@rol_requerido(["reclutador", "admin"])
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


# ══════════════════════════════════════════════════════════════
# MANEJADORES DE ERROR AMIGABLES (404 & 403)
# ══════════════════════════════════════════════════════════════

@app.errorhandler(404)
def pagina_no_encontrada(e):
    """Manejador para páginas o recursos no encontrados."""
    if request.is_json or request.path.startswith("/api/"):
        return jsonify({"error": "El recurso solicitado no fue encontrado en el servidor.", "codigo": 404}), 404
    return render_template("404.html"), 404


@app.errorhandler(403)
def acceso_denegado(e):
    """Manejador para accesos no autorizados por rol (RBAC)."""
    if request.is_json or request.path.startswith("/api/"):
        return jsonify({"error": "No tienes los permisos requeridos para acceder a este recurso.", "codigo": 403}), 403
    return render_template("403.html"), 403


if __name__ == "__main__":
    app.run(debug=True)