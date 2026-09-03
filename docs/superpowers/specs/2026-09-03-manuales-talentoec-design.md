# Especificación de Diseño: Manual de Usuario y Manual de Desarrollador para TalentoEC

- **Fecha:** 2026-09-03
- **Proyecto:** TalentoEC - Plataforma Web Universitaria de Empleo (Quito)
- **Autores:** Isaac Oña, Leandro Frutos, Axel Masache (PUCE)
- **Estado:** Validado por el usuario - Listo para Plan de Implementación

---

## 1. Contexto y Objetivos

**TalentoEC** es una plataforma web desarrollada con Python (Flask), PostgreSQL (SQLAlchemy ORM), plantillas Jinja2 y frontend Vanilla (HTML5, CSS3, JavaScript ES6+). Conecta a estudiantes universitarios y jóvenes de Quito con pasantías y empleos, y proporciona a las empresas herramientas de publicación de vacantes y un tablero Kanban de selección de postulantes.

El objetivo de esta especificación es definir en detalle el contenido, estructura, formato y diagramas de dos documentos técnicos esenciales:
1. **Manual de Usuario (`docs/MANUAL_USUARIO.md`)**: Guía funcional orientada a los roles del sistema (Candidato y Reclutador).
2. **Manual de Desarrollador (`docs/MANUAL_DESARROLLADOR.md`)**: Documento de ingeniería de software con arquitectura, modelos de base de datos, catálogo de APIs REST, seguridad RBAC, pruebas unitarias y despliegue a producción.
3. **Actualización de `README.md`**: Enlaces directos y tabla de contenidos a la carpeta `docs/`.

---

## 2. Especificación del Manual de Usuario (`docs/MANUAL_USUARIO.md`)

El Manual de Usuario estará redactado con lenguaje claro, capturas conceptuales en ASCII/Markdown y diagramas Mermaid de flujo de procesos.

### 2.1. Estructura de Secciones

1. **Portada e Información General**:
   - Nombre de la plataforma, propósito y audiencia en Quito.
   - Integrantes del proyecto (PUCE).
   - Acceso rápido con credenciales de prueba preconfiguradas:
     - Candidato de prueba: `estudiante@ejemplo.com` / `password123`.
     - Reclutador de prueba: `empresa@ejemplo.com` / `password123`.
   - Matriz de permisos visual (qué puede hacer un visitante anónimo, un candidato y un reclutador).

2. **Primeros Pasos y Autenticación**:
   - Cómo acceder al sistema en local (`http://127.0.0.1:5000`).
   - Proceso de Registro:
     - Registro como Candidato: nombre, edad, correo electrónico institucional/personal, salario pretendido y contraseña segura.
     - Registro como Reclutador: datos del reclutador y creación dinámica de la Empresa asociada.
   - Inicio de sesión y persistencia de sesión por cookies cifradas.
   - Cierre de sesión seguro (`/logout`).

3. **Módulo del Candidato**:
   - **Búsqueda y Exploración de Vacantes (`/postulacion`)**:
     - Filtro por palabras clave en tiempo real (tecnologías, títulos).
     - Filtro por sector geográfico de Quito (La Carolina, Cumbayá, Quitumbe, Centro Norte, etc.).
     - Carrusel interactivo de etiquetas (*Sin Experiencia, TI & Software, Diseño UX/UI, Remoto, Marketing*).
     - Arquitectura *Master-Detail*: selección de tarjetas a la izquierda y panel de requisitos/funciones a la derecha.
   - **Postulación Rápida en 1 Clic**:
     - Botón de acción destacada (color acento `#F97316`).
     - Validación instantánea: confirmación de postulación registrada y prevención de postulaciones duplicadas.
   - **Historial de Postulaciones (`/postulaciones`)**:
     - Visualización del listado de postulaciones propias.
     - Semáforo de estados:
       - 🔵 `Pendiente`: recién registrada.
       - 🟠 `En Evaluación`: revisada por el reclutador.
       - 🟣 `Entrevista`: agendamiento de entrevista.
       - 🟢 `Aceptada`: candidato seleccionado.
   - **Vacantes Favoritas (`/favoritos`)**:
     - Marcado/desmarcado de vacantes favoritas mediante icono de estrella.
     - Vista unificada de ofertas guardadas para postulación posterior.
   - **CV Builder y Desarrollo Profesional (`/desarrollo`)**:
     - 6 plantillas de currículum en formato SVG.
     - Simulador de escaneo y análisis con IA (detección de palabras clave y habilidades).
     - Insignias de competencias verificadas.

4. **Módulo del Reclutador**:
   - **Portal de Empresas (`/reclutadores`)**:
     - Panel de control de la empresa.
   - **Gestión de Vacantes (CRUD)**:
     - **Crear Vacante**: formulario con *Live Preview* en tiempo real (permite observar la tarjeta exacta mientras se redacta la oferta).
     - **Editar Vacante (`/vacantes/<id>/editar`)**: modificación de título, salario (mínimo legal ecuatoriano $460 USD), funciones y requisitos técnicos.
     - **Borrado Suave (*Soft Delete*)**: botón de pausar vacante (`POST /vacantes/<id>/desactivar`) para retirarla del catálogo público sin perder postulantes.
     - **Reactivar Vacante**: botón para restaurar vacantes al catálogo público (`POST /vacantes/<id>/reactivar`).
   - **Tablero Kanban de Selección**:
     - 4 columnas sincronizadas con PostgreSQL (`Pendiente`, `En Evaluación`, `Entrevista`, `Aceptada`).
     - Selector desplegable dentro de cada tarjeta para avanzar o retroceder al candidato de fase.
     - Modal visor de perfil: datos de contacto, enlace a LinkedIn, enlaces a CV y competencias del postulante.
     - Filtro de búsqueda en tiempo real de candidatos dentro del Kanban.

5. **Diagramas Mermaid del Manual de Usuario**:
   - Diagrama de flujo del proceso de postulación (Candidato -> Postulación 1-Clic -> Transición en Kanban por Reclutador).
   - Diagrama de árbol de navegación por perfil de usuario.

6. **Preguntas Frecuentes (FAQ) y Soporte**:
   - Solución de problemas comunes (error 403 por intentar acceder a portal de reclutadores siendo candidato, error por correo duplicado, etc.).

---

## 3. Especificación del Manual de Desarrollador (`docs/MANUAL_DESARROLLADOR.md`)

El Manual de Desarrollador estará orientado a ingenieros de software, DevOps y profesores/evaluadores técnicos.

### 3.1. Estructura de Secciones

1. **Arquitectura del Sistema y Tecnologías**:
   - Arquitectura MVC modular ligera sobre Flask 3.x.
   - Stack tecnológico:
     - Backend: Python 3.10+, Flask 3.1+, Werkzeug (PBKDF2 SHA-256), Flask-SQLAlchemy 3.1+, psycopg2-binary 2.9+.
     - Base de Datos: PostgreSQL 14+ (producción/local) con soporte SQLite (pruebas unitarias).
     - Frontend: Jinja2, HTML5 semántico, CSS3 modular (regla 60/30/10), JavaScript ES6+ asíncrono con `Fetch API`.
   - Mapa de estructura de archivos y árbol de directorios con el rol de cada archivo (`app.py`, `models.py`, `auth.py`, `config.py`, `init_db.py`, `script.js`, `style.css`, `tests/`).
   - Diagrama Mermaid de Arquitectura en Capas (Presentación -> Lógica de Negocio / RBAC -> Capa ORM -> Persistencia PostgreSQL).

2. **Modelo de Base de Datos y Diagrama ERD**:
   - Diagrama Mermaid Entidad-Relación (ERD) con las 6 tablas:
     - `empresa` (PK: `id_empresa`, `nombre_empresa`, `ranking`).
     - `candidato` (PK: `id_candidato`, `nombre`, `edad`, `correo`, `contrasena`, `cv_pdf_url`, `perfil_linkedin`, `salario_pretendido`, `rol`).
     - `oferta_empleo` (PK: `id_oferta`, FK: `id_empresa`, `titulo`, `salario`, `modalidad`, `anos_experiencia`, `ubicacion_exacta`, `funciones`, `requisitos_tecnicos`, `activo`).
     - `postulacion` (PK: `id_postulacion`, FK: `id_candidato`, FK: `id_oferta`, `fecha_postulacion`, `estado`).
     - `favorito` (PK: `id_favorito`, FK: `id_candidato`, FK: `id_oferta`, `fecha_agregado`).
     - `habilidad_certificacion` (PK: `id_habilidad`, FK: `id_candidato`, `descripcion`, `tipo`).
   - Diccionario de Datos detallado: tipos de datos SQL, restricciones `CheckConstraint` (salario mínimo >= 460 USD, edades 16 a 99, expresiones regulares de correo, ranking 0 a 5).
   - Mecanismo de borrado suave (*Soft Delete*) en ofertas mediante el flag `activo = False`.

3. **Guía de Configuración e Instalación del Entorno Local**:
   - Prerrequisitos (Python 3.10+, PostgreSQL 14+, Git).
   - Paso a paso en **Windows (PowerShell)** y **Linux/macOS**:
     ```powershell
     # Windows
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     pip install -r requirements.txt
     ```
     ```bash
     # Linux / macOS
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```
   - Configuración de variables de entorno (`.env`):
     - `DATABASE_URL=postgresql://usuario:contrasena@localhost:5432/talentoec_db`
     - `SECRET_KEY=clave_secreta_para_sesiones`
     - `FLASK_ENV=development`
   - Inicialización y poblado de la base de datos con `python init_db.py`.
   - Ejecución del servidor de desarrollo con `python app.py`.

4. **Catálogo Exhaustivo de Rutas y API REST**:
   - **Rutas de Vistas (HTML)**:
     - `GET /` o `/index.html`: Landing page (Pública).
     - `GET /postulacion`: Catálogo de vacantes (Pública).
     - `GET /desarrollo`: CV Builder (Pública / Candidatos).
     - `GET /reclutadores`: Tablero Kanban y gestión (Requiere rol `reclutador` o `admin`).
     - `GET /postulaciones`: Historial personal (Requiere sesión activa).
     - `GET /favoritos`: Vacantes guardadas (Requiere sesión activa).
     - `GET /vacantes/<id>/editar`: Formulario de edición (Requiere rol `reclutador` o `admin`).
   - **Endpoints de Autenticación y Sesión**:
     - `POST /registro` y `POST /api/registro`: Registro de usuarios.
     - `POST /login` y `POST /api/login`: Inicio de sesión.
     - `GET /logout`: Cierre de sesión.
   - **Endpoints de Ofertas de Empleo**:
     - `POST /vacantes/nueva`: Creación de vacante (Reclutador/Admin).
     - `POST /vacantes/<id>/editar`: Actualización de vacante.
     - `POST /vacantes/<id>/desactivar`: Pausa suave de vacante (`activo=False`).
     - `POST /vacantes/<id>/reactivar`: Reactivación de vacante (`activo=True`).
   - **Endpoints de Postulaciones y Kanban**:
     - `POST /api/postulacion/rapida`: Postulación en 1 clic (Candidato).
     - `POST /api/postulacion/<id>/estado`: Actualización de columna en Kanban (Reclutador/Admin).
     - `GET /postulaciones` (con header `Accept: application/json`): Obtención de historial en JSON.
   - **Endpoints de Favoritos**:
     - `POST /api/favorito/toggle`: Alternar estado de favorito en base de datos.
   - Tabla de Códigos de Estado HTTP y manejo de errores (200, 201, 400, 403, 404, 500).

5. **Seguridad y Control de Acceso Basado en Roles (RBAC)**:
   - Decoradores en `auth.py`:
     - `@login_requerido`: Redirige al login o devuelve 401 si no hay sesión.
     - `@rol_requerido(roles_permitidos)`: Verifica el rol en sesión y retorna `403.html` o `{error: "Acceso denegado"}` con código HTTP 403.
   - Cifrado unidireccional de contraseñas con Werkzeug (`generate_password_hash` con método pbkdf2:sha256).
   - Manejadores de error centralizados en `app.py`: `@app.errorhandler(403)` y `@app.errorhandler(404)`.

6. **Arquitectura de Frontend y JavaScript**:
   - Patrón de eventos y delegación en `script.js`.
   - Consumo de APIs mediante `fetch` asíncrono con manejo de promesas y actualización de DOM.
   - Live Preview reactivo mediante listeners `input` en el formulario de creación de ofertas.
   - Sistema de diseño CSS en `style.css` (variables `:root`, paleta 60/30/10, media queries responsive).

7. **Suite de Pruebas Automatizadas**:
   - Estructura de pruebas en `tests/`:
     - `test_auth.py`: Pruebas de registro, login y hash de contraseñas.
     - `test_crud_ofertas.py`: Pruebas de creación, modificación, desactivación y reactivación.
     - `test_flujo_completo.py`: Prueba del ciclo extremo a extremo (registro candidato, búsqueda, postulación, cambio de estado en Kanban).
     - `test_integridad_bd.py`: Pruebas de restricciones de base de datos (`CheckConstraint`, duplicados, salarios mínimos).
     - `test_roles_y_permisos.py`: Pruebas de bloqueo de acceso no autorizado y verificación del código 403.
   - Ejecución de las 23 pruebas con `unittest`:
     ```powershell
     python -m unittest discover -s tests -p "test_*.py" -v
     ```
   - Buenas prácticas para agregar nuevos casos de prueba utilizando `setUp` y base de datos aislada en memoria/SQLite.

8. **Guía de Despliegue en Producción**:
   - Configuración de Servidor WSGI:
     - Linux: `gunicorn -w 4 -b 0.0.0.0:8000 app:app`
     - Windows Server: `waitress-serve --port=5000 app:app`
   - Buenas prácticas de seguridad en producción:
     - Generación de `SECRET_KEY` criptográfica (`python -c "import secrets; print(secrets.token_hex(32))"`).
     - Configuración de `DATABASE_URL` con SSL requerido (`sslmode=require`).
     - Desactivación de `debug=True`.
   - Configuración recomendada de Reverse Proxy (Nginx) y certificados SSL Let's Encrypt / Certbot.
   - Respaldo periódico de PostgreSQL (`pg_dump talentoec_db > backup.sql`).

---

## 4. Actualización del `README.md`

Se agregará al `README.md` principal una sección destacada con enlaces directos a:
- [Manual de Usuario](docs/MANUAL_USUARIO.md)
- [Manual de Desarrollador](docs/MANUAL_DESARROLLADOR.md)

---

## 5. Plan de Verificación

1. **Verificación de Enlaces y Sintaxis Markdown**:
   - Comprobar que todos los enlaces relativos entre `README.md`, `docs/MANUAL_USUARIO.md` y `docs/MANUAL_DESARROLLADOR.md` sean correctos.
   - Validar que todos los bloques de código y diagramas Mermaid cumplan con la sintaxis estándar.
2. **Consistencia con el Código Real**:
   - Verificar que cada ruta documentada en la tabla de APIs coincida exactamente con las funciones en `app.py`.
   - Verificar que cada columna y restricción documentada en el modelo ERD coincida con `models.py`.
   - Verificar que los comandos de pruebas coincidan con los 5 archivos en `tests/` y pasen al 100%.
