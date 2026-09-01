from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Empresa(db.Model):
    __tablename__ = "empresa"

    id_empresa = db.Column(db.Integer, primary_key=True)
    nombre_empresa = db.Column(db.String(150), nullable=False)
    ranking = db.Column(db.Numeric(precision=5, scale=2), nullable=True)

    # Relaciones
    ofertas = db.relationship("OfertaEmpleo", backref="empresa", lazy=True)

    def __repr__(self):
        return f"<Empresa {self.nombre_empresa}>"


class Candidato(db.Model):
    __tablename__ = "candidato"

    id_candidato = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False)
    edad = db.Column(db.Integer, nullable=True)
    correo = db.Column(db.String(150), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    cv_pdf_url = db.Column(db.String(255), nullable=True)
    perfil_linkedin = db.Column(db.String(255), nullable=True)
    salario_pretendido = db.Column(db.Numeric(precision=10, scale=2), nullable=True)
    rol = db.Column(db.String(50), default="candidato", nullable=False)

    # Relaciones
    habilidades = db.relationship("HabilidadCertificacion", backref="candidato", lazy=True)
    postulaciones = db.relationship("Postulacion", backref="candidato", lazy=True)
    favoritos = db.relationship("Favorito", backref="candidato", lazy=True)

    def set_password(self, password_plano):
        """Genera y almacena el hash seguro de la contraseña."""
        self.contrasena = generate_password_hash(password_plano)

    def check_password(self, password_plano):
        """Verifica si la contraseña ingresada coincide con el hash almacenado."""
        return check_password_hash(self.contrasena, password_plano)

    def to_dict(self):
        """Retorna los datos del candidato en formato diccionario seguro (sin contraseña)."""
        return {
            "id_candidato": self.id_candidato,
            "nombre": self.nombre,
            "edad": self.edad,
            "correo": self.correo,
            "rol": self.rol,
            "cv_pdf_url": self.cv_pdf_url,
            "perfil_linkedin": self.perfil_linkedin,
            "salario_pretendido": float(self.salario_pretendido) if self.salario_pretendido else None,
            "habilidades": [h.descripcion for h in self.habilidades] if self.habilidades else []
        }

    def __repr__(self):
        return f"<Candidato {self.nombre} (Rol: {self.rol})>"


class OfertaEmpleo(db.Model):
    __tablename__ = "oferta_empleo"

    id_oferta = db.Column(db.Integer, primary_key=True)
    id_empresa = db.Column(db.Integer, db.ForeignKey('empresa.id_empresa'), nullable=False)
    titulo = db.Column(db.String(150), nullable=False)
    salario = db.Column(db.Numeric(precision=10, scale=2), nullable=True)
    modalidad = db.Column(db.String(50), nullable=True)
    anos_experiencia = db.Column(db.Integer, nullable=True)
    ubicacion_exacta = db.Column(db.String(255), nullable=True)
    funciones = db.Column(db.Text, nullable=True)
    requisitos_tecnicos = db.Column(db.Text, nullable=True)
    activo = db.Column(db.Boolean, default=True, nullable=False)

    # Relaciones
    postulaciones = db.relationship("Postulacion", backref="oferta", lazy=True)
    favoritos = db.relationship("Favorito", backref="oferta", lazy=True)

    def to_dict(self):
        """Retorna los datos de la oferta en formato diccionario."""
        return {
            "id_oferta": self.id_oferta,
            "id_empresa": self.id_empresa,
            "empresa": self.empresa.nombre_empresa if self.empresa else "Empresa",
            "titulo": self.titulo,
            "salario": float(self.salario) if self.salario else None,
            "modalidad": self.modalidad,
            "anos_experiencia": self.anos_experiencia,
            "ubicacion_exacta": self.ubicacion_exacta,
            "funciones": self.funciones,
            "requisitos_tecnicos": self.requisitos_tecnicos,
            "activo": self.activo,
        }

    def __repr__(self):
        return f"<OfertaEmpleo {self.titulo} (Activo: {self.activo})>"


class HabilidadCertificacion(db.Model):
    __tablename__ = "habilidad_certificacion"

    id_habilidad = db.Column(db.Integer, primary_key=True)
    id_candidato = db.Column(db.Integer, db.ForeignKey('candidato.id_candidato'), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    verificada = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Habilidad {self.descripcion}>"


class Postulacion(db.Model):
    __tablename__ = "postulacion"

    id_postulacion = db.Column(db.Integer, primary_key=True)
    id_candidato = db.Column(db.Integer, db.ForeignKey('candidato.id_candidato'), nullable=False)
    id_oferta = db.Column(db.Integer, db.ForeignKey('oferta_empleo.id_oferta'), nullable=False)
    estado = db.Column(db.String(50), default='Pendiente')
    fecha_postulacion = db.Column(db.Date, default=date.today)

    def to_dict(self):
        return {
            "id_postulacion": self.id_postulacion,
            "id_candidato": self.id_candidato,
            "id_oferta": self.id_oferta,
            "estado": self.estado,
            "fecha_postulacion": self.fecha_postulacion.strftime("%Y-%m-%d") if self.fecha_postulacion else None,
            "candidato": self.candidato.to_dict() if self.candidato else None,
            "oferta": self.oferta.to_dict() if self.oferta else None,
        }

    def __repr__(self):
        return f"<Postulacion #{self.id_postulacion} - {self.estado}>"


class Favorito(db.Model):
    __tablename__ = "favorito"

    id_favorito = db.Column(db.Integer, primary_key=True)
    id_candidato = db.Column(db.Integer, db.ForeignKey('candidato.id_candidato'), nullable=False)
    id_oferta = db.Column(db.Integer, db.ForeignKey('oferta_empleo.id_oferta'), nullable=False)

    def __repr__(self):
        return f"<Favorito Candidato:{self.id_candidato} Oferta:{self.id_oferta}>"