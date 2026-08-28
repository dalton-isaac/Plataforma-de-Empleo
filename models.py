from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class PlanContratacion(db.Model):
    __tablename__ = "plan_contratacion"

    id_plan = db.Column(db.Integer, primary_key=True)
    nombre_plan = db.Column(db.String(100), nullable=False)

    # Relaciones
    empresas = db.relationship("Empresa", backref="plan_contratacion", lazy=True)

    def __repr__(self):
        return f"<PlanContratacion {self.nombre_plan}>"


class Empresa(db.Model):
    __tablename__ = "empresa"

    id_empresa = db.Column(db.Integer, primary_key=True)
    id_plan = db.Column(db.Integer, db.ForeignKey('plan_contratacion.id_plan'), nullable=False)
    nombre_empresa = db.Column(db.String(150), nullable=False)
    ranking = db.Column(db.Numeric(precision=5, scale=2), nullable=True)

    # Relaciones
    ofertas = db.relationship("OfertaEmpleo", backref="empresa", lazy=True)
    resenas = db.relationship("ResenaEmpresa", backref="empresa", lazy=True)

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

    # Relaciones
    resenas = db.relationship("ResenaEmpresa", backref="candidato", lazy=True)
    habilidades = db.relationship("HabilidadCertificacion", backref="candidato", lazy=True)
    postulaciones = db.relationship("Postulacion", backref="candidato", lazy=True)
    favoritos = db.relationship("Favorito", backref="candidato", lazy=True)

    def __repr__(self):
        return f"<Candidato {self.nombre}>"


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

    # Relaciones
    postulaciones = db.relationship("Postulacion", backref="oferta", lazy=True)
    favoritos = db.relationship("Favorito", backref="oferta", lazy=True)

    def __repr__(self):
        return f"<OfertaEmpleo {self.titulo}>"


class ResenaEmpresa(db.Model):
    __tablename__ = "resena_empresa"

    id_resena = db.Column(db.Integer, primary_key=True)
    id_candidato = db.Column(db.Integer, db.ForeignKey('candidato.id_candidato'), nullable=False)
    id_empresa = db.Column(db.Integer, db.ForeignKey('empresa.id_empresa'), nullable=False)
    comentario = db.Column(db.Text, nullable=True)
    calificacion = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f"<ResenaEmpresa {self.calificacion}/5>"


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

    def __repr__(self):
        return f"<Postulacion {self.estado}>"


class Favorito(db.Model):
    __tablename__ = "favorito"

    id_favorito = db.Column(db.Integer, primary_key=True)
    id_candidato = db.Column(db.Integer, db.ForeignKey('candidato.id_candidato'), nullable=False)
    id_oferta = db.Column(db.Integer, db.ForeignKey('oferta_empleo.id_oferta'), nullable=False)

    def __repr__(self):
        return f"<Favorito Candidato:{self.id_candidato} Oferta:{self.id_oferta}>"