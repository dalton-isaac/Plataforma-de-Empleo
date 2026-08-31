"""
auth.py
───────
Módulo de seguridad para TalentoEC (Semana 3).
Contiene decoradores de autenticación y autorización basada en roles (RBAC).
"""

from functools import wraps
from flask import session, redirect, url_for, flash, request, jsonify


def login_requerido(f):
    """
    Decorador que exige una sesión activa (sin importar el rol).
    Soporta peticiones web estándar (con redirección y flash) y peticiones API JSON (con HTTP 401).
    """
    @wraps(f)
    def decorada(*args, **kwargs):
        if "usuario_id" not in session:
            if request.is_json or request.path.startswith("/api/"):
                return jsonify({"error": "Debes iniciar sesión para realizar esta acción.", "autenticado": False}), 401
            flash("Debes iniciar sesión para acceder a esa página.", "danger")
            return redirect(url_for("inicio"))
        return f(*args, **kwargs)
    return decorada


def rol_requerido(rol_o_roles):
    """
    Fábrica de decoradores: retorna un decorador que exige uno o varios roles específicos.
    Uso:
        @rol_requerido("reclutador")
        o
        @rol_requerido(["reclutador", "admin"])
    """
    roles_permitidos = [rol_o_roles] if isinstance(rol_o_roles, str) else list(rol_o_roles)

    def decorador(f):
        @wraps(f)
        def decorada(*args, **kwargs):
            if "usuario_id" not in session:
                if request.is_json or request.path.startswith("/api/"):
                    return jsonify({"error": "Debes iniciar sesión para realizar esta acción.", "autenticado": False}), 401
                flash("Debes iniciar sesión para acceder a esa página.", "danger")
                return redirect(url_for("inicio"))

            rol_actual = session.get("usuario_rol")
            if rol_actual not in roles_permitidos:
                if request.is_json or request.path.startswith("/api/"):
                    return jsonify({"error": "No tienes permisos para acceder a esta función.", "rol": rol_actual}), 403
                flash("No tienes permisos para acceder a esa página.", "danger")
                return redirect(url_for("inicio"))

            return f(*args, **kwargs)
        return decorada
    return decorador
