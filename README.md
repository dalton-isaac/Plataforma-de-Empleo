# 🚀 TalentoEC - Plataforma Web Universitaria de Empleo (Quito)

**TalentoEC** es una plataforma web completa desarrollada con **Python (Flask)**, **PostgreSQL (SQLAlchemy)** y frontend moderno **Mobile-First (HTML5, CSS3, JavaScript ES6+)** para conectar a estudiantes universitarios y jóvenes de 18 a 30 años en **Quito, Ecuador** con su primer empleo, pasantías preprofesionales y oportunidades formativas.

---

## 👥 Integrantes del Proyecto (PUCE)
* **Isaac Oña**
* **Leandro Frutos**
* **Axel Masache**

---

## 📚 Documentación Oficial del Proyecto

El proyecto dispone de manuales técnicos y funcionales completos, actualizados y formalizados bajo estándares de ingeniería de software en el directorio [`docs/`](docs/):

| Documento | Audiencia | Propósito y Contenido Principal | Enlace |
| :--- | :--- | :--- | :--- |
| **📖 Manual de Usuario** | Candidatos (estudiantes / egresados), Empresas y Reclutadores en Quito | Guía de uso integral paso a paso de la interfaz web: registro diferenciado, inicio de sesión, postulación rápida en 1 clic, historial con semáforo de estados, bolsa de favoritos, CV Builder interactivo con IA, publicación de vacantes con *Live Preview*, tablero Kanban vivo y diagramas de flujo interactivos. | [**Ver Manual de Usuario**](docs/MANUAL_USUARIO.md) |
| **🛠️ Manual de Desarrollador** | Desarrolladores de Software, Arquitectos, Administradores de BD y DevOps | Documentación técnica exhaustiva del sistema: arquitectura MVC modularizada, stack tecnológico, árbol de directorios, diagrama Entidad-Relación (ERD) completo con diccionario de datos, procedimientos almacenados y triggers PL/pgSQL, catálogo de rutas y API REST con payloads JSON, seguridad RBAC (PBKDF2), suite de pruebas automatizadas (37 tests) y guía de despliegue en producción (WSGI/Gunicorn/Waitress + Nginx + SSL). | [**Ver Manual de Desarrollador**](docs/MANUAL_DESARROLLADOR.md) |

### 🧭 Resumen de Navegación de los Manuales

#### [📖 Manual de Usuario (`docs/MANUAL_USUARIO.md`)](docs/MANUAL_USUARIO.md)
* **1. Información General y Metadatos:** Propósito, audiencia universitaria en Quito, tabla de credenciales de prueba preconfiguradas y matriz de permisos por rol (RBAC).
* **2. Acceso al Sistema y Gestión de Cuenta:** Registro de candidatos y empresas, autenticación segura y persistencia de sesión.
* **3. Módulo del Candidato:** Exploración de vacantes con arquitectura Master-Detail, filtros dinámicos (Sin Experiencia, TI, etc.), postulación rápida en 1 clic, seguimiento de estados (`Pendiente`, `En Evaluación`, `Entrevista`, `Aceptada`), favoritos y CV Builder con 6 plantillas SVG y análisis de competencias.
* **4. Módulo del Reclutador:** Publicación interactiva con previsualización en vivo (*Live Preview*), edición de ofertas, borrado suave (*Soft Delete*) y reactivación de vacantes, y gestión de postulantes mediante tablero Kanban vivo con visor modal de perfiles.
* **5. Diagramas y Flujos (Mermaid):** Diagramas de navegación por rol, ciclo de vida de la postulación y máquina de estados del pipeline Kanban.
* **6. Preguntas Frecuentes (FAQ):** Preguntas y respuestas frecuentes organizadas por rol y canales de soporte técnico.

#### [🛠️ Manual de Desarrollador (`docs/MANUAL_DESARROLLADOR.md`)](docs/MANUAL_DESARROLLADOR.md)
* **1. Arquitectura del Sistema:** Patrón arquitectónico MVC modular, stack tecnológico (Python 3.10+, Flask 3.1+, PostgreSQL 14+, SQLAlchemy 3.x), responsabilidades por directorio y diagrama de arquitectura en capas (Mermaid).
* **2. Modelo de Base de Datos y Diagrama ERD:** Diagrama relacional completo con 8 entidades, diccionario de datos con tipos, nulos y llaves foráneas, restricciones de integridad (*CheckConstraints*), borrado suave y código fuente de triggers y procedimientos almacenados PL/pgSQL.
* **3. Configuración e Instalación Local:** Prerrequisitos, entorno virtual `venv`, variables de entorno (`.env`), inicialización y siembra de base de datos con `init_db.py`, y ejecución del servidor en modo desarrollo.
* **4. Catálogo de Rutas y API REST:** Mapeo detallado de todas las vistas Jinja2 y endpoints REST (Auth, Ofertas, Postulaciones, Favoritos, Estadísticas) acompañados de payloads JSON de solicitud y respuesta.
* **5. Seguridad y RBAC:** Implementación de decoradores `@login_requerido` y `@rol_requerido`, hashing PBKDF2:SHA256 y controladores de error HTTP 403 y 404.
* **6. Arquitectura Frontend:** Modularización en `script.js` (Fetch API, Live Preview reactivo, Kanban sincrónico) y tokens CSS bajo la regla 60/30/10 en `style.css`.
* **7. Suite de Pruebas Automatizadas:** Cobertura con 37 tests unitarios y de integración distribuidos en 5 módulos (`test_auth`, `test_crud_ofertas`, `test_flujo_completo`, `test_integridad_bd`, `test_roles_y_permisos`).
* **8. Guía de Despliegue en Producción:** Configuración de WSGI (Gunicorn / Waitress), reverse proxy Nginx con SSL/TLS (Let's Encrypt / Certbot) y directivas de endurecimiento de seguridad.

---

## 🎨 Sistema de Diseño (Regla 60/30/10)
* **Dominante (60%):** Azul `#1D4ED8` — Estructura, headers, navegación e identidad de marca.
* **Secundario / Fondo (30%):** Blanco Nieve `#F8FAFC` — Fondos de página y tarjetas contenedoras.
* **Acento (10%):** Naranja `#F97316` — Llamadas a la acción clave (**Postulación Rápida en 1 Clic**, notificaciones, alertas y badges).
* **Texto & Neutro Oscuro:** Gris Pizarra `#1E293B`.
* **Tipografías:**
  * Títulos: `Poppins` (SemiBold 32px para H1, Medium 24px para H2).
  * Cuerpo & Acciones: `Inter` (Regular 16px para párrafos, Medium 14px para botones).

---

## 🏗️ Arquitectura del Sistema y Base de Datos (PostgreSQL)

La base de datos relacional modelada con **SQLAlchemy** incluye:

1. **`planes_contratacion`**: Niveles de servicio para empresas (*Básico, Reclutador Pro, Corporativo*).
2. **`empresas`**: Empresas empleadoras en Quito con ranking y plan de suscripción.
3. **`candidatos`**: Usuarios del sistema con contraseñas cifradas (`generate_password_hash` con Werkzeug / PBKDF2), edad, salario pretendido y control de acceso basado en roles (**RBAC**): `candidato`, `reclutador`, `admin`.
4. **`ofertas_empleo`**: Vacantes con título, salario en USD, modalidad (*Remoto, Híbrido, Presencial*), años de experiencia requeridos, ubicación exacta en Quito, funciones, requisitos técnicos y bandera de borrado suave (`activo`).
5. **`postulaciones`**: Registro real de aplicaciones vinculando candidato con oferta, con 4 fases del ciclo de contratación:
   * 🔵 **`Pendiente`** (Nuevos postulantes)
   * 🟠 **`En Evaluación`** (Revisión de perfil técnico)
   * 🟣 **`Entrevista`** (Entrevista agendada)
   * 🟢 **`Aceptada`** (Candidato seleccionado)
6. **`favoritos`**: Bolsa de vacantes guardadas por el usuario.
7. **`habilidades_certificaciones`**: Competencias validadas y certificaciones del candidato.
8. **`resenas_empresas`**: Evaluaciones de clima laboral y feedback de pasantes.

---

## 🌟 Flujos de Usuario Implementados

### 1. 🎓 Flujo del Candidato (Estudiante / Joven Profesional)
* **Registro & Login Unificado:** Modal con selector de rol (*Candidato*), validación de contraseña segura y creación automática de sesión.
* **Exploración de Vacantes (`/postulacion`):**
  * Buscador en tiempo real por palabras clave y sector de Quito.
  * Carrusel táctil de filtros por categoría (*Sin Experiencia, TI & Software, Diseño UX/UI, Marketing, Soporte TI, Remoto*).
  * Arquitectura **Master-Detail** adaptativa (sticky en desktop, full-screen en móvil).
* **⚡ Postulación Rápida en 1 Clic:** Registra la aplicación directamente en la base de datos PostgreSQL, evitando duplicados con retroalimentación inmediata.
* **📋 Historial de Postulaciones (`/postulaciones`):** Vista privada para dar seguimiento al estado de todas las postulaciones realizadas.
* **⭐ Vacantes Guardadas (`/favoritos`):** Permite guardar vacantes favoritas para revisarlas posteriormente.
* **🛠️ Desarrollo Personal & CV Builder (`/desarrollo`):**
  * 6 plantillas de CV en formato SVG personalizables.
  * Simulador de escaneo y resaltado de habilidades con IA.
  * Perfil con insignias de competencias verificadas.

### 2. 🏢 Flujo del Reclutador (Empresa / RRHH)
* **Registro Corporativo:** Registro con creación dinámica de la empresa asociada.
* **CRUD Completo de Vacantes (`/reclutadores`):**
  * **Crear:** Formulario con **Live Preview en tiempo real**.
  * **Editar (`/vacantes/<id>/editar`):** Modificación de salarios, funciones y requisitos.
  * **Pausar / Desactivar:** Eliminación suave (*Soft Delete*) que retira la vacante del catálogo público sin perder su historial.
  * **Reactivar:** Restauración inmediata al catálogo.
* **📊 Tablero Kanban de Contratación Vivo:**
  * 4 columnas de seguimiento de candidatos conectadas a la base de datos.
  * Selector dinámico en cada tarjeta para avanzar candidatos de fase (`POST /api/postulacion/<id>/estado`).
  * Modal visor de currículum y datos de contacto del estudiante.
  * Buscador dinámico de postulantes en tiempo real.

---

## 🚀 Guía de Instalación y Ejecución

### Prerrequisitos
* Python 3.10+ instalado.
* PostgreSQL instalado y en ejecución (o SQLite para entorno de pruebas).

### Paso 1: Activar el Entorno Virtual
```powershell
# En Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# En Linux / macOS:
source venv/bin/activate
```

### Paso 2: Configurar Variables de Entorno (Opcional)
Si deseas conectar a tu base de datos PostgreSQL local, puedes crear un archivo `.env` o verificar `config.py`:
```ini
DATABASE_URL=postgresql://usuario:contrasena@localhost:5432/talentoec_db
SECRET_KEY=talentoec_secreto_super_seguro_2026
```

### Paso 3: Inicializar la Base de Datos con Datos de Prueba
```powershell
python init_db.py
```
> Esto creará todas las tablas en PostgreSQL e insertará datos iniciales de empresas, ofertas en Quito, candidatos y postulaciones en las 4 columnas del Kanban.

### Paso 4: Iniciar el Servidor Web Flask
```powershell
python app.py
```
El servidor se ejecutará en: **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 🧪 Ejecución de Pruebas Automatizadas

El proyecto incluye una suite completa de **37 pruebas unitarias y de integración** (distribuidas en 5 módulos de prueba: `test_auth`, `test_crud_ofertas`, `test_flujo_completo`, `test_integridad_bd` y `test_roles_y_permisos`) que validan la autenticación, CRUD de vacantes, control de acceso por roles (RBAC), favoritos, postulaciones, integridad referencial, triggers de auditoría, procedimientos almacenados y respuestas de error 404/403:

```powershell
python -m unittest discover -s tests -p "test_*.py" -v
```

---

## 🔒 Aislamiento de Interfaces y Seguridad (RBAC)
* **Decoradores `@login_requerido` y `@rol_requerido`**: Protegen rutas administrativas contra accesos no autorizados devolviendo páginas de error `403 Acceso Denegado`.
* **Navbar Dinámico Adaptativo**:
  * Candidatos ven: *Inicio*, *Bolsa de Empleo*, *Desarrollo*, *Postulaciones*.
  * Reclutadores ven: *Inicio*, *Portal Reclutadores*, *Bolsa de Empleo*.
  * Visitantes sin sesión ven: *Iniciar sesión* y *Crear Cuenta*.
* **Hashing Seguro de Contraseñas**: Ninguna contraseña se almacena en texto plano.

