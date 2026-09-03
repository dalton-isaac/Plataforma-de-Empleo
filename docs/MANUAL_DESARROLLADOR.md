# 🛠️ Manual de Desarrollador — Plataforma TalentoEC

> **Plataforma Web Universitaria de Empleo y Pasantías de Quito**  
> **Pontificia Universidad Católica del Ecuador (PUCE)**  
> **Versión del Documento:** 1.0.0 — Ciclo Académico 2026  
> **Stack Principal:** Python 3.10+, Flask 3.1+, PostgreSQL 14+, SQLAlchemy 3.x, ES6+ Fetch, CSS3 BEM  
> **Autores:** Isaac Oña, Leandro Frutos, Axel Masache  

---

## 📑 Tabla de Contenidos

1. [Arquitectura del Sistema y Tecnologías](#1-arquitectura-del-sistema-y-tecnologías)
   - [1.1. Patrón Arquitectónico (MVC Modularizado)](#11-patrón-arquitectónico-mvc-modularizado)
   - [1.2. Stack Tecnológico Detallado](#12-stack-tecnológico-detallado)
   - [1.3. Árbol de Directorios y Responsabilidades](#13-árbol-de-directorios-y-responsabilidades)
   - [1.4. Diagrama de Arquitectura en Capas (Mermaid)](#14-diagrama-de-arquitectura-en-capas-mermaid)
2. [Modelo de Base de Datos y Diagrama ERD](#2-modelo-de-base-de-datos-y-diagrama-erd)
   - [2.1. Diagrama Entidad-Relación (Mermaid ERD)](#21-diagrama-entidad-relación-mermaid-erd)
   - [2.2. Diccionario de Datos Exhaustivo](#22-diccionario-de-datos-exhaustivo)
   - [2.3. Restricciones de Integridad (CheckConstraints)](#23-restricciones-de-integridad-checkconstraints)
   - [2.4. Estrategia de Borrado Suave (*Soft Delete*)](#24-estrategia-de-borrado-suave-soft-delete)
   - [2.5. Triggers y Procedimientos Almacenados (PL/pgSQL)](#25-triggers-y-procedimientos-almacenados-plpgsql)
3. [Guía de Configuración e Instalación del Entorno Local](#3-guía-de-configuración-e-instalación-del-entorno-local)
   - [3.1. Prerrequisitos del Sistema](#31-prerrequisitos-del-sistema)
   - [3.2. Clonación y Creación del Entorno Virtual (`venv`)](#32-clonación-y-creación-del-entorno-virtual-venv)
   - [3.3. Instalación de Dependencias](#33-instalación-de-dependencias)
   - [3.4. Configuración de Variables de Entorno (`.env`)](#34-configuración-de-variables-de-entorno-env)
   - [3.5. Inicialización y Poblado de la Base de Datos (`init_db.py`)](#35-inicialización-y-poblado-de-la-base-de-datos-init_dbpy)
   - [3.6. Ejecución del Servidor en Modo Desarrollo](#36-ejecución-del-servidor-en-modo-desarrollo)
4. [Catálogo Exhaustivo de Rutas y API REST](#4-catálogo-exhaustivo-de-rutas-y-api-rest)
   - [4.1. Vistas Web HTML (Jinja2)](#41-vistas-web-html-jinja2)
   - [4.2. Endpoints de Autenticación y Sesión](#42-endpoints-de-autenticación-y-sesión)
   - [4.3. Endpoints del Catálogo de Ofertas de Empleo](#43-endpoints-del-catálogo-de-ofertas-de-empleo)
   - [4.4. Endpoints de Postulaciones y Pipeline Kanban](#44-endpoints-de-postulaciones-y-pipeline-kanban)
   - [4.5. Endpoints de la Bolsa de Favoritos](#45-endpoints-de-la-bolsa-de-favoritos)
   - [4.6. Endpoints Administrativos y de Consulta](#46-endpoints-administrativos-y-de-consulta)
   - [4.7. Ejemplos de Payloads JSON (Peticiones y Respuestas)](#47-ejemplos-de-payloads-json-peticiones-y-respuestas)
5. [Seguridad y Control de Acceso Basado en Roles (RBAC)](#5-seguridad-y-control-de-acceso-basado-en-roles-rbac)
   - [5.1. Mecanismo de Autenticación con Sesiones Firmadas](#51-mecanismo-de-autenticación-con-sesiones-firmadas)
   - [5.2. Decorador `@login_requerido`](#52-decorador-login_requerido)
   - [5.3. Fábrica de Decoradores `@rol_requerido`](#53-fábrica-de-decoradores-rol_requerido)
   - [5.4. Cifrado Criptográfico de Contraseñas (PBKDF2:SHA256)](#54-cifrado-criptográfico-de-contraseñas-pbkdf2sha256)
   - [5.5. Controladores de Error Personalizados (HTTP 403 y 404)](#55-controladores-de-error-personalizados-http-403-y-404)
6. [Arquitectura Frontend y JavaScript](#6-arquitectura-frontend-y-javascript)
   - [6.1. Organización Modular de `script.js`](#61-organización-modular-de-scriptjs)
   - [6.2. Postulación en 1 Clic con Fetch Asíncrono](#62-postulación-en-1-clic-con-fetch-asíncrono)
   - [6.3. Live Preview Reactivo del Formulario de Publicación](#63-live-preview-reactivo-del-formulario-de-publicación)
   - [6.4. Tablero Kanban Dinámico y Sincronización](#64-tablero-kanban-dinámico-y-sincronización)
   - [6.5. Sistema de Tokens CSS y Regla 60/30/10 en `style.css`](#65-sistema-de-tokens-css-y-regla-603010-en-stylecss)
7. [Suite de Pruebas Automatizadas](#7-suite-de-pruebas-automatizadas)
   - [7.1. Organización de la Suite de Pruebas (`tests/`)](#71-organización-de-la-suite-de-pruebas-tests)
   - [7.2. Catálogo de Casos de Prueba (37 Tests Verificados)](#72-catálogo-de-casos-de-prueba-37-tests-verificados)
   - [7.3. Ejecución de la Suite](#73-ejecución-de-la-suite)
   - [7.4. Guía para Escribir Nuevas Pruebas Unitarias](#74-guía-para-escribir-nuevas-pruebas-unitarias)
8. [Guía de Despliegue en Producción](#8-guía-de-despliegue-en-producción)
   - [8.1. Arquitectura de Servidores de Producción](#81-arquitectura-de-servidores-de-producción)
   - [8.2. Servidor WSGI: Gunicorn (Linux) / Waitress (Windows Server)](#82-servidor-wsgi-gunicorn-linux--waitress-windows-server)
   - [8.3. Configuración de Proxy Inverso Nginx](#83-configuración-de-proxy-inverso-nginx)
   - [8.4. Configuración de Certificados SSL con Certbot](#84-configuración-de-certificados-ssl-con-certbot)
   - [8.5. Parámetros Críticos de Seguridad en Producción](#85-parámetros-críticos-de-seguridad-en-producción)
   - [8.6. Estrategia de Respaldo y Restauración de Base de Datos (`pg_dump`)](#86-estrategia-de-respaldo-y-restauración-de-base-de-datos-pg_dump)

---

## 1. Arquitectura del Sistema y Tecnologías

### 1.1. Patrón Arquitectónico (MVC Modularizado)

TalentoEC está concebida bajo el patrón arquitectónico **Modelo-Vista-Controlador (MVC)** desacoplado, combinando renderizado en el servidor mediante plantillas Jinja2 para la estructura semántica y navegación SEO-friendly, con una capa de APIs REST en JSON consumidas asíncronamente por el cliente web:

- **Modelo (`models.py`, `schema_plpgsql.sql`):** Representa las entidades de negocio mapeadas a tablas de PostgreSQL a través de SQLAlchemy 3.x. Gestiona el ciclo de vida de los datos, el cifrado de contraseñas, validaciones lógicas mediante métodos de instancia y restricciones `CheckConstraint` nativas.
- **Controlador (`app.py`, `auth.py`, `config.py`):** Define los endpoints HTTP de la aplicación, orquesta las peticiones entrantes, ejecuta las verificaciones de autenticación y autorización basadas en roles (RBAC) mediante decoradores de Python, y coordina transacciones con la base de datos.
- **Vista (`templates/*.html`, `script.js`, `style.css`):** Interfaces HTML5 semánticas que extienden una estructura base común, enriquecidas con JavaScript vanilla moderno (ES6+) para manejo de eventos reactivos, Live Preview en tiempo real y componentes visuales regidos por el sistema de tokens de diseño.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          FLUJO ARQUITECTÓNICO MVC                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Navegador Web (DOM / Eventos)                                             │
│         │                  ▲                                                │
│         │ HTTP Form /      │ HTML renderizado (Jinja2) /                    │
│         │ JSON Fetch       │ JSON Responses                                 │
│         ▼                  │                                                │
│   Controlador Flask (`app.py`) ◄─── Control de Roles (`auth.py`)            │
│         │                  ▲                                                │
│         │ Query / Commit   │ Model Instances / Dictionaries                 │
│         ▼                  │                                                │
│   Capa ORM (`models.py`) ───┼──► PostgreSQL 14+ (Tablas, Triggers, SP)      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.2. Stack Tecnológico Detallado

| Capa / Componente | Tecnología | Versión | Propósito en TalentoEC |
| :--- | :--- | :--- | :--- |
| **Lenguaje Backend** | Python | `>= 3.10` (compatible 3.11/3.14) | Motor de ejecución del servidor web y scripts de inicialización. |
| **Framework Web** | Flask | `3.1.3` | Enrutamiento de URLs, manejo de peticiones HTTP, sesiones y renderizado. |
| **ORM / Acceso a Datos**| Flask-SQLAlchemy / SQLAlchemy | `3.1.1` / `2.0.52` | Mapeo objeto-relacional, migraciones declarativas y gestión de transacciones. |
| **Driver PostgreSQL** | psycopg2-binary | `2.9.12` | Adaptador C de alto rendimiento para comunicación con PostgreSQL. |
| **Motor de Base de Datos** | PostgreSQL | `>= 14.0` | Base de datos relacional ACID con soporte para CheckConstraints, Triggers y PL/pgSQL. |
| **Seguridad Criptográfica** | Werkzeug | `3.1.8` | Funciones `generate_password_hash` y `check_password_hash` con algoritmo PBKDF2:SHA256. |
| **Variables de Entorno** | python-dotenv | `1.2.3` | Carga de credenciales y configuraciones sensibles desde `.env`. |
| **Motor de Plantillas** | Jinja2 | `3.1.5` | Generación de vistas HTML del lado del servidor con inyección de variables. |
| **Frontend Dinámico** | JavaScript Vanilla | ECMAScript 2022+ | Manejo de eventos en cliente, llamadas `fetch()` asíncronas, Live Preview y Kanban. |
| **Diseño y Estilos** | CSS3 Nativo (Variables `:root`) | N/A | Sistema de diseño de alta fidelidad, regla 60/30/10 y diseño responsive mobile-first. |
| **Servidor WSGI (Prod)** | Gunicorn / Waitress | `>= 22.0` / `>= 3.0` | Servidor de aplicaciones WSGI para entornos Linux y Windows Server. |
| **Proxy Inverso (Prod)** | Nginx | `>= 1.22` | Terminación TLS/SSL, compresión gzip y despacho de archivos estáticos. |

---

### 1.3. Árbol de Directorios y Responsabilidades

```text
Plataforma_UI/
├── app.py                      # Controlador principal: configuración Flask, rutas web y endpoints REST API.
├── models.py                   # Modelos de datos SQLAlchemy, CheckConstraints y serializadores to_dict().
├── auth.py                     # Módulo de seguridad RBAC: decoradores @login_requerido y @rol_requerido.
├── config.py                   # Carga de variables de entorno y configuración de conexión a PostgreSQL.
├── init_db.py                  # Script de creación del esquema y carga masiva de datos iniciales (seed).
├── schema_plpgsql.sql          # Triggers de negocio, procedimientos almacenados y tabla de auditoría.
├── requirements.txt            # Especificación estricta de dependencias Python para pip.
├── script.js                   # Módulo JavaScript frontend: fetch REST, Kanban, Live Preview, autocompletado.
├── style.css                   # Hoja de estilos central: tokens :root, layout responsive, temas y componentes.
│
├── assets/                     # Recursos multimedia estáticos
│   ├── images/                 # Fotografías y logotipos de empresas asociadas (PNG).
│   └── svg/                    # Iconografía vectorial, badges y avatares por rol.
│
├── templates/                  # Vistas HTML renderizadas por Jinja2
│   ├── index.html              # Landing page principal y catálogo público de ofertas.
│   ├── postulacion.html        # Vista master-detail de ofertas de empleo y postulación en 1 clic.
│   ├── desarrollo.html         # Módulo de CV Builder, habilidades formativas y cursos.
│   ├── reclutadores.html       # Panel exclusivo de empresas: publicación de vacantes y Kanban de candidatos.
│   ├── postulaciones.html      # Historial de postulaciones del candidato con semáforo de estado.
│   ├── favoritos.html          # Bolsa de vacantes guardadas por el candidato autenticado.
│   ├── editar_vacante.html     # Formulario de edición para reclutadores de ofertas existentes.
│   ├── 403.html                # Vista de error: Acceso Denegado por permisos insuficientes.
│   └── 404.html                # Vista de error: Recurso no encontrado.
│
├── tests/                      # Suite de pruebas automatizadas con unittest
│   ├── test_auth.py            # Pruebas de registro, login y manejo de sesiones.
│   ├── test_crud_ofertas.py    # Pruebas de creación, edición, soft delete y reactivación de vacantes.
│   ├── test_flujo_completo.py  # Pruebas integrales de flujo extremo a extremo y restricciones cruzadas.
│   ├── test_integridad_bd.py   # Pruebas de CheckConstraints, Triggers y Stored Procedures PL/pgSQL.
│   └── test_roles_y_permisos.py# Pruebas de aislamiento RBAC y control de acceso.
│
└── docs/                       # Documentación técnica y funcional del proyecto
    ├── MANUAL_USUARIO.md       # Manual operativo para candidatos y empresas.
    └── MANUAL_DESARROLLADOR.md # Manual de arquitectura, bases de datos, APIs y despliegue.
```

---

### 1.4. Diagrama de Arquitectura en Capas (Mermaid)

```mermaid
flowchart TD
    subgraph CLIENTE["🌐 Capa Cliente (Navegador Web)"]
        UI["Interfaz de Usuario (HTML5 / CSS3)"]
        JS["Motor Cliente (script.js)"]
        FETCH["Capa de Red (Fetch API ES6+)"]
        UI --> JS
        JS --> FETCH
    end

    subgraph PROXY["🛡️ Capa de Despacho y Seguridad Web (Producción)"]
        NGINX["Nginx (Reverse Proxy / SSL / Estáticos)"]
        WSGI["Servidor WSGI (Gunicorn / Waitress)"]
        NGINX -->|Pasa peticiones dinámicas| WSGI
    end

    subgraph BACKEND["⚙️ Capa de Aplicación Flask (MVC)"]
        APP["Controlador Principal (app.py)"]
        AUTH["Control de Acceso RBAC (auth.py)"]
        JINJA["Motor de Plantillas (Jinja2)"]
        WSGI --> APP
        APP --> AUTH
        APP --> JINJA
    end

    subgraph ORM["🧩 Capa de Acceso a Datos (ORM)"]
        MODELS["Modelos Declarativos (models.py)"]
        SA["SQLAlchemy Engine & Session"]
        APP --> MODELS
        MODELS --> SA
    end

    subgraph DATABASE["🗄️ Capa de Persistencia (PostgreSQL 14+)"]
        PG[("Base de Datos: plataformaempleo")]
        TABLES["Tablas Relacionales (6 entidades principales)"]
        CONSTRAINTS["Reglas de Integridad (CheckConstraints & Unicidad)"]
        TRIGGERS["Triggers & Auditoría (schema_plpgsql.sql)"]
        PROCEDURES["Procedimientos Almacenados (PL/pgSQL)"]
        SA --> PG
        PG --- TABLES
        PG --- CONSTRAINTS
        PG --- TRIGGERS
        PG --- PROCEDURES
    end

    FETCH -->|HTTP / JSON| NGINX
    JINJA -.->|HTML Renderizado| UI
```

---

## 2. Modelo de Base de Datos y Diagrama ERD

### 2.1. Diagrama Entidad-Relación (Mermaid ERD)

El modelo de datos relacional de TalentoEC consta de 6 entidades centrales y una tabla auxiliar de auditoría para la trazabilidad de los cambios en el pipeline de selección:

```mermaid
erDiagram
    EMPRESA ||--o{ OFERTA_EMPLEO : "publica"
    CANDIDATO ||--o{ POSTULACION : "realiza"
    OFERTA_EMPLEO ||--o{ POSTULACION : "recibe"
    CANDIDATO ||--o{ FAVORITO : "guarda"
    OFERTA_EMPLEO ||--o{ FAVORITO : "es_guardada"
    CANDIDATO ||--o{ HABILIDAD_CERTIFICACION : "posee"
    POSTULACION ||--o{ AUDITORIA_POSTULACION : "genera_trazabilidad"

    EMPRESA {
        int id_empresa PK
        string nombre_empresa "UNIQUE, NOT NULL"
        numeric ranking "CHECK (0.00..5.00)"
    }

    CANDIDATO {
        int id_candidato PK
        string nombre "NOT NULL"
        int edad "CHECK (16..99)"
        string correo "UNIQUE, NOT NULL"
        string contrasena "HASH PBKDF2"
        string cv_pdf_url "NULLABLE"
        string perfil_linkedin "NULLABLE"
        numeric salario_pretendido "CHECK (>= 0)"
        string rol "CHECK ('candidato','reclutador','admin')"
    }

    OFERTA_EMPLEO {
        int id_oferta PK
        int id_empresa FK "NOT NULL"
        string titulo "NOT NULL"
        numeric salario "CHECK (salario >= 460.00)"
        string modalidad "Remoto, Híbrido, Presencial"
        int anos_experiencia "CHECK (0..20)"
        string ubicacion_exacta
        text funciones
        text requisitos_tecnicos
        boolean activo "DEFAULT TRUE (Soft Delete)"
    }

    POSTULACION {
        int id_postulacion PK
        int id_candidato FK "NOT NULL"
        int id_oferta FK "NOT NULL"
        string estado "CHECK ('Pendiente','En Evaluación','Entrevista','Aceptada','Rechazada')"
        date fecha_postulacion "NOT NULL"
    }

    FAVORITO {
        int id_favorito PK
        int id_candidato FK "NOT NULL"
        int id_oferta FK "NOT NULL"
    }

    HABILIDAD_CERTIFICACION {
        int id_habilidad PK
        int id_candidato FK "NOT NULL"
        string descripcion "NOT NULL"
        boolean verificada "DEFAULT FALSE"
    }

    AUDITORIA_POSTULACION {
        int id_auditoria PK
        int id_postulacion "NOT NULL"
        string estado_anterior
        string estado_nuevo
        string usuario_accion
        timestamp fecha_cambio
    }
```

---

### 2.2. Diccionario de Datos Exhaustivo

#### 1. Tabla: `empresa`
Representa a las personas jurídicas o reclutadores corporativos afiliados que emiten ofertas laborales.

| Campo | Tipo SQL | Nulo | Por Defecto | Restricciones | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_empresa` | `SERIAL` / `INTEGER` | No | Auto-incremental | `PRIMARY KEY` | Identificador único de la empresa. |
| `nombre_empresa` | `VARCHAR(150)` | No | — | `UNIQUE`, `chk_empresa_nombre` | Razón social o nombre comercial (mínimo 2 caracteres). |
| `ranking` | `NUMERIC(5, 2)` | Sí | `5.00` | `chk_empresa_ranking` | Calificación de clima y cumplimiento laboral (0.00 a 5.00). |

#### 2. Tabla: `candidato`
Contiene las cuentas de usuario de la plataforma, discriminadas funcionalmente por su rol (`candidato`, `reclutador`, `admin`).

| Campo | Tipo SQL | Nulo | Por Defecto | Restricciones | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_candidato` | `SERIAL` / `INTEGER` | No | Auto-incremental | `PRIMARY KEY` | Identificador unívoco del usuario. |
| `nombre` | `VARCHAR(150)` | No | — | `chk_candidato_nombre` | Nombres y apellidos completos (mínimo 2 caracteres). |
| `edad` | `INTEGER` | Sí | `NULL` | `chk_candidato_edad` | Edad del usuario (restringida entre 16 y 99 años). |
| `correo` | `VARCHAR(150)` | No | — | `UNIQUE`, `chk_candidato_correo_formato` | Correo electrónico institucional o personal validado por regex. |
| `contrasena` | `VARCHAR(255)` | No | — | Hash seguro | Hash criptográfico generado mediante Werkzeug PBKDF2:SHA256. |
| `cv_pdf_url` | `VARCHAR(255)` | Sí | `NULL` | — | Ruta relativa o enlace externo al documento PDF del currículum. |
| `perfil_linkedin` | `VARCHAR(255)` | Sí | `NULL` | — | URL pública al perfil profesional en LinkedIn. |
| `salario_pretendido` | `NUMERIC(10, 2)` | Sí | `NULL` | `chk_candidato_salario` | Expectativa salarial neta mensual en USD (debe ser `>= 0`). |
| `rol` | `VARCHAR(50)` | No | `'candidato'` | `chk_candidato_rol` | Rol del sistema: `'candidato'`, `'reclutador'` o `'admin'`. |

#### 3. Tabla: `oferta_empleo`
Publicaciones de empleo y pasantías emitidas por las empresas. Soporta borrado lógico mediante la columna `activo`.

| Campo | Tipo SQL | Nulo | Por Defecto | Restricciones | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_oferta` | `SERIAL` / `INTEGER` | No | Auto-incremental | `PRIMARY KEY` | Identificador único de la vacante. |
| `id_empresa` | `INTEGER` | No | — | `FOREIGN KEY (empresa.id_empresa)` | Identificador de la empresa empleadora. |
| `titulo` | `VARCHAR(150)` | No | — | `chk_oferta_titulo` | Título del cargo ofertado (mínimo 3 caracteres). |
| `salario` | `NUMERIC(10, 2)` | Sí | `NULL` | `chk_oferta_salario_minimo` | Remuneración mensual en USD (mínimo legal ecuatoriano: `$460.00`). |
| `modalidad` | `VARCHAR(50)` | Sí | `'Híbrido'` | — | Formato de trabajo: `'Remoto'`, `'Presencial'`, `'Híbrido'`. |
| `anos_experiencia` | `INTEGER` | Sí | `0` | `chk_oferta_experiencia` | Años de experiencia previa requeridos (rango de 0 a 20). |
| `ubicacion_exacta` | `VARCHAR(255)` | Sí | `'Quito'` | — | Sector, ciudad o dirección física donde opera el cargo. |
| `funciones` | `TEXT` | Sí | `NULL` | — | Descripción detallada de responsabilidades y actividades. |
| `requisitos_tecnicos` | `TEXT` | Sí | `NULL` | — | Lista de competencias, herramientas y formación académica. |
| `activo` | `BOOLEAN` | No | `TRUE` | — | Bandera de visibilidad pública (*Soft Delete*). |

#### 4. Tabla: `postulacion`
Asociación formal entre un candidato y una vacante laboral en una fase determinada del pipeline de selección.

| Campo | Tipo SQL | Nulo | Por Defecto | Restricciones | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_postulacion` | `SERIAL` / `INTEGER` | No | Auto-incremental | `PRIMARY KEY` | Identificador único de la postulación. |
| `id_candidato` | `INTEGER` | No | — | `FOREIGN KEY (candidato.id_candidato)` | Identificador del postulante. |
| `id_oferta` | `INTEGER` | No | — | `FOREIGN KEY (oferta_empleo.id_oferta)` | Identificador de la vacante. |
| `estado` | `VARCHAR(50)` | No | `'Pendiente'` | `chk_postulacion_estado` | Fase actual en el Kanban de reclutamiento. |
| `fecha_postulacion`| `DATE` | No | `CURRENT_DATE` | — | Fecha calendario en que se envió la postulación. |
| *Restricción Única* | — | — | — | `uq_postulacion_candidato_oferta` | Impide que un candidato se postule dos veces a la misma vacante. |

#### 5. Tabla: `favorito`
Marcadores personales guardados por candidatos para postularse posteriormente.

| Campo | Tipo SQL | Nulo | Por Defecto | Restricciones | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_favorito` | `SERIAL` / `INTEGER` | No | Auto-incremental | `PRIMARY KEY` | Identificador de la relación de favorito. |
| `id_candidato` | `INTEGER` | No | — | `FOREIGN KEY (candidato.id_candidato)` | Candidato propietario del marcador. |
| `id_oferta` | `INTEGER` | No | — | `FOREIGN KEY (oferta_empleo.id_oferta)` | Vacante marcada como favorita. |
| *Restricción Única* | — | — | — | `uq_favorito_candidato_oferta` | Evita duplicar el registro de favorito para la misma combinación. |

#### 6. Tabla: `habilidad_certificacion`
Competencias técnicas y certificaciones curriculares acreditadas por los candidatos.

| Campo | Tipo SQL | Nulo | Por Defecto | Restricciones | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_habilidad` | `SERIAL` / `INTEGER` | No | Auto-incremental | `PRIMARY KEY` | Identificador de la habilidad registrada. |
| `id_candidato` | `INTEGER` | No | — | `FOREIGN KEY (candidato.id_candidato)` | Candidato titular de la habilidad. |
| `descripcion` | `VARCHAR(255)` | No | — | `chk_habilidad_descripcion` | Nombre de la destreza o certificación (mínimo 2 caracteres). |
| `verificada` | `BOOLEAN` | Sí | `FALSE` | — | Indicador de validación académica por la PUCE o entidad aliada. |

---

### 2.3. Restricciones de Integridad (CheckConstraints)

TalentoEC delega la máxima rigurosidad de validación en el motor PostgreSQL mediante `CheckConstraint` declarados en SQLAlchemy:

```python
# Definición de restricciones en models.py
db.CheckConstraint("ranking >= 0.00 AND ranking <= 5.00", name="chk_empresa_ranking")
db.CheckConstraint("length(trim(nombre_empresa)) >= 2", name="chk_empresa_nombre")
db.CheckConstraint("edad IS NULL OR (edad >= 16 AND edad <= 99)", name="chk_candidato_edad")
db.CheckConstraint("rol IN ('candidato', 'reclutador', 'admin')", name="chk_candidato_rol")
db.CheckConstraint("salario_pretendido IS NULL OR salario_pretendido >= 0", name="chk_candidato_salario")
db.CheckConstraint("length(trim(nombre)) >= 2", name="chk_candidato_nombre")
db.CheckConstraint("correo ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'", name="chk_candidato_correo_formato")
db.CheckConstraint("salario IS NULL OR salario >= 460.00", name="chk_oferta_salario_minimo")
db.CheckConstraint("anos_experiencia IS NULL OR (anos_experiencia >= 0 AND anos_experiencia <= 20)", name="chk_oferta_experiencia")
db.CheckConstraint("length(trim(titulo)) >= 3", name="chk_oferta_titulo")
db.CheckConstraint("length(trim(descripcion)) >= 2", name="chk_habilidad_descripcion")
db.CheckConstraint("estado IN ('Pendiente', 'En Evaluación', 'Entrevista', 'Aceptada', 'Rechazada')", name="chk_postulacion_estado")
```

> [!IMPORTANT]
> **Salario Mínimo Legal Ecuatoriano:** La restricción `chk_oferta_salario_minimo` garantiza que ninguna oferta de empleo publicada en el portal pueda estipular una remuneración inferior a **$460.00 USD**, cumpliendo el Código del Trabajo ecuatoriano para evitar ofertas precarias.

---

### 2.4. Estrategia de Borrado Suave (*Soft Delete*)

En sistemas de reclutamiento, el borrado físico (`DELETE FROM oferta_empleo WHERE id = ...`) generaría pérdida de datos histórica catastrófica, violando la integridad referencial de candidatos postulados en meses previos.

TalentoEC implementa **Soft Delete** mediante el campo `activo` (`BOOLEAN`):
1. **Pausar Vacante:** El endpoint `POST /vacantes/<id>/desactivar` establece `activo = False` sin borrar registros hijos.
2. **Filtrado en Frontend Público:** Las consultas públicas en `inicio()` y `get_ofertas()` aplican:
   ```python
   ofertas = OfertaEmpleo.query.filter_by(activo=True).all()
   ```
3. **Visibilidad Reclutador:** El tablero `/reclutadores` consulta todas las vacantes (`OfertaEmpleo.query.all()`), mostrando una insignia visual "Pausada / Oculta" y ofreciendo el botón de reactivación con 1 clic (`POST /vacantes/<id>/reactivar`).

---

### 2.5. Triggers y Procedimientos Almacenados (PL/pgSQL)

El archivo [`schema_plpgsql.sql`](file:///c:/Users/ISAAC/Desktop/Plataforma_UI/schema_plpgsql.sql) define la lógica relacional avanzada ejecutada en el motor de base de datos:

1. **Trigger `trg_validar_postulacion` (BEFORE INSERT ON `postulacion`):**
   - Ejecuta `fn_validar_postulacion()`.
   - Verifica en tiempo de inserción que el usuario sea estrictamente de rol `'candidato'`.
   - Impide postulaciones a vacantes con `activo = FALSE`.
2. **Trigger `trg_auditar_postulacion` (AFTER UPDATE OF estado ON `postulacion`):**
   - Ejecuta `fn_auditar_cambio_estado_postulacion()`.
   - Registra en la tabla `auditoria_postulacion` el cambio de estado, valor anterior, valor nuevo y marca de tiempo (`CURRENT_TIMESTAMP`).
3. **Procedimientos Almacenados:**
   - `sp_registrar_postulacion(IN p_id_candidato, IN p_id_oferta)`: Inserción atómica y transaccional con validaciones de existencia.
   - `sp_cambiar_fase_kanban(IN p_id_postulacion, IN p_nuevo_estado)`: Transición segura de estado en el pipeline.
   - `sp_publicar_oferta(...)`: Creación de vacantes con control de reglas salariales.

---

## 3. Guía de Configuración e Instalación del Entorno Local

### 3.1. Prerrequisitos del Sistema

Asegúrese de contar con las siguientes herramientas instaladas en su equipo de desarrollo:
- **Python 3.10 o superior** (comprobar con `python --version` o `python3 --version`).
- **PostgreSQL 14.x o superior** (servicio de base de datos corriendo en el puerto 5432).
- **Git** (para control de versiones).

---

### 3.2. Clonación y Creación del Entorno Virtual (`venv`)

#### En Windows (PowerShell):
```powershell
# 1. Clonar el repositorio y acceder a la carpeta del proyecto
git clone https://github.com/dalton-isaac/Plataforma-de-Empleo.git Plataforma_UI
cd Plataforma_UI

# 2. Crear el entorno virtual aislado
python -m venv venv

# 3. Habilitar ejecución de scripts en la sesión actual y activar el venv
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\venv\Scripts\Activate.ps1
```

#### En Linux / macOS (Bash / Zsh):
```bash
# 1. Clonar el repositorio y acceder a la carpeta del proyecto
git clone https://github.com/dalton-isaac/Plataforma-de-Empleo.git Plataforma_UI
cd Plataforma_UI

# 2. Crear el entorno virtual aislado
python3 -m venv venv

# 3. Activar el entorno virtual
source venv/bin/activate
```

---

### 3.3. Instalación de Dependencias

Con el entorno virtual activado (`(venv)` visible en la terminal):
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

### 3.4. Configuración de Variables de Entorno (`.env`)

Cree un archivo llamado `.env` en la raíz del proyecto. Este archivo contiene los parámetros que [`config.py`](file:///c:/Users/ISAAC/Desktop/Plataforma_UI/config.py) leerá automáticamente:

```env
# Configuración del Motor PostgreSQL
DB_USER=postgres
DB_PASSWORD=tu_password_local
DB_HOST=localhost
DB_PORT=5432
DB_NAME=plataformaempleo

# Clave Secreta para Cifrado de Cookies de Sesión
SECRET_KEY=talentoec-desarrollo-secreto-puce-2026-super-seguro

# Entorno de Flask
FLASK_ENV=development
FLASK_DEBUG=1
```

> [!NOTE]
> La clase `Config` en `config.py` genera dinámicamente la cadena de conexión de SQLAlchemy con el formato:
> `postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}`.

Antes de inicializar los datos, verifique que la base de datos exista en PostgreSQL. Si no existe, créela desde el cliente `psql`:
```sql
CREATE DATABASE plataformaempleo;
```

---

### 3.5. Inicialización y Poblado de la Base de Datos (`init_db.py`)

Ejecute el script de inicialización para crear las tablas relacionales, instalar los triggers de auditoría y cargar los datos de prueba iniciales:

```bash
python init_db.py
```

**Salida esperada:**
```text
Conectando a la base de datos y creando tablas...
[OK] Tablas creadas con éxito.
[OK] Triggers, Auditoría y Stored Procedures (PL/pgSQL) instalados exitosamente.
[OK] Datos de prueba de TalentoEC insertados exitosamente.

Resumen de registros cargados:
  * 10 Empresas
  * 4 Candidatos
  * 5 Habilidades registradas
  * 12 Ofertas de empleo
  * 4 Postulaciones activas
  * 2 Ofertas guardadas como favoritas
```

---

### 3.6. Ejecución del Servidor en Modo Desarrollo

Inicie la aplicación Flask:
```bash
python app.py
```

El servidor web arrancará en modo debug con recarga automática:
```text
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
 * Restarting with stat
```

Abra su navegador en: **`http://127.0.0.1:5000`**

---

## 4. Catálogo Exhaustivo de Rutas y API REST

### 4.1. Vistas Web HTML (Jinja2)

| Método | Ruta / URL | Rol Requerido | Tipo Petición | Respuestas HTTP | Descripción Funcional |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/` ó `/index.html` | Público | Browser GET | `200` | Landing page principal con ofertas activas destacadas. |
| `GET` | `/postulacion` | Público | Browser GET | `200` | Catálogo interactivo master-detail con buscador y filtros. |
| `GET` | `/desarrollo` | Público | Browser GET | `200` | Página de CV Builder con IA, habilidades y desarrollo formativo. |
| `GET` | `/reclutadores` | `reclutador`, `admin` | Browser GET | `200`, `302` | Panel de gestión de vacantes, formulario de publicación y Kanban. |
| `GET` | `/postulaciones` | Autenticado | Browser GET / JSON | `200`, `302` | Historial personal de postulaciones del usuario en sesión. |
| `GET` | `/favoritos` | `candidato` | Browser GET / JSON | `200`, `302` | Bolsa personal de vacantes guardadas por el candidato. |
| `GET` | `/vacantes/<id>/editar`| `reclutador`, `admin` | Browser GET | `200`, `404`, `302` | Formulario de edición para una vacante existente. |

---

### 4.2. Endpoints de Autenticación y Sesión

| Método | Endpoint | Rol Requerido | Formato | Respuestas HTTP | Descripción Funcional |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/registro` | Público | Form / JSON | `201`, `400`, `409` | Crea una cuenta (candidato o reclutador) e inicia sesión automáticamente. |
| `POST` | `/api/registro` | Público | JSON | `201`, `400`, `409` | Endpoint API REST equivalente para consumo vía fetch AJAX. |
| `POST` | `/login` | Público | Form / JSON | `200`, `400`, `401` | Autentica credenciales y genera cookie de sesión firmada. |
| `POST` | `/api/login` | Público | JSON | `200`, `400`, `401` | Endpoint API REST para autenticación asíncrona modal. |
| `GET` | `/api/usuario-actual` | Público | JSON | `200` | Retorna el estado de autenticación y datos públicos del usuario en sesión. |
| `POST` / `GET` | `/logout` | Autenticado | Browser / Form | `302` | Limpia la sesión del servidor y redirige al inicio con encabezados `no-cache`. |
| `POST` / `GET` | `/api/logout` | Autenticado | JSON / Fetch | `200` | Cierre de sesión asíncrono para clientes SPA / modales. |

---

### 4.3. Endpoints del Catálogo de Ofertas de Empleo

| Método | Endpoint | Rol Requerido | Formato | Respuestas HTTP | Descripción Funcional |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/ofertas` | Público | JSON | `200` | Listado completo de todas las ofertas laborales activas (`activo=True`). |
| `GET` | `/api/ofertas/<int:id>`| Público | JSON | `200`, `404` | Detalle específico de una vacante por su ID. |
| `POST` | `/vacantes/nueva` | `reclutador`, `admin` | Form / JSON | `201`, `400`, `403` | Publica una nueva vacante en el sistema. |
| `POST` | `/api/ofertas` | `reclutador`, `admin` | JSON | `201`, `400`, `403` | Endpoint REST para creación de ofertas vía JSON. |
| `POST` | `/vacantes/<id>/editar`| `reclutador`, `admin` | Form / JSON | `200`, `400`, `404` | Actualiza los datos de una vacante existente. |
| `POST` | `/vacantes/<id>/desactivar`| `reclutador`, `admin` | Form / JSON | `200`, `404` | Pausa una vacante (*Soft Delete*, establece `activo=False`). |
| `POST` | `/vacantes/<id>/reactivar` | `reclutador`, `admin` | Form / JSON | `200`, `404` | Reactiva una vacante pausada en el catálogo público (`activo=True`). |

---

### 4.4. Endpoints de Postulaciones y Pipeline Kanban

| Método | Endpoint | Rol Requerido | Formato | Respuestas HTTP | Descripción Funcional |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/api/postular` | `candidato` | JSON / Form | `201`, `200`, `400`, `403`, `404` | Registra la postulación en 1 clic del candidato autenticado. |
| `POST` | `/api/postulacion/<int:id>/estado` | `reclutador`, `admin` | JSON / Form | `200`, `400`, `403`, `404` | Mueve al candidato a una nueva fase del Kanban (Pendiente, Evaluación, Entrevista, Aceptada, Rechazada). |

---

### 4.5. Endpoints de la Bolsa de Favoritos

| Método | Endpoint | Rol Requerido | Formato | Respuestas HTTP | Descripción Funcional |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `POST` | `/favoritos/agregar/<int:id>` | `candidato` | Form / JSON | `200`, `403`, `404` | Guarda una vacante en la lista de favoritos en PostgreSQL y sesión. |
| `POST` | `/favoritos/eliminar/<int:id>`| `candidato` | Form / JSON | `200`, `403`, `404` | Remueve una vacante de los favoritos del candidato. |

---

### 4.6. Endpoints Administrativos y de Consulta

| Método | Endpoint | Rol Requerido | Formato | Respuestas HTTP | Descripción Funcional |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `GET` | `/api/candidatos` | `reclutador`, `admin` | JSON | `200`, `403` | Listado completo de candidatos registrados con perfil seguro. |
| `GET` | `/api/empresas` | Público | JSON | `200` | Catálogo de empresas afiliadas con ranking y total de vacantes. |

---

### 4.7. Ejemplos de Payloads JSON (Peticiones y Respuestas)

#### 1. Inicio de Sesión (`POST /api/login`)
**Petición (Request):**
```json
{
  "correo": "mateo.morales@estudiantes.ec",
  "contrasena": "candidato123"
}
```
**Respuesta Exitosa (`200 OK`):**
```json
{
  "mensaje": "¡Bienvenido de nuevo, Mateo Morales!",
  "usuario": {
    "id_candidato": 1,
    "nombre": "Mateo Morales",
    "correo": "mateo.morales@estudiantes.ec",
    "rol": "candidato",
    "edad": 21,
    "salario_pretendido": 500.0,
    "cv_pdf_url": "assets/cv_mateo_morales.pdf",
    "perfil_linkedin": "https://linkedin.com/in/mateomorales-demo",
    "habilidades": ["Diseño UI/UX en Figma", "HTML5 & CSS3 Responsive"]
  }
}
```

#### 2. Postulación en 1 Clic (`POST /api/postular`)
**Petición (Request con cookie de sesión activa):**
```json
{
  "id_oferta": 2
}
```
**Respuesta Creación Exitosa (`201 Created`):**
```json
{
  "mensaje": "¡Postulación registrada con éxito para 'Desarrollador Front-End Junior'!",
  "id_postulacion": 5,
  "estado": "Pendiente",
  "ya_postulado": false
}
```
**Respuesta Duplicada Idempotente (`200 OK`):**
```json
{
  "mensaje": "Ya te encuentras postulado a la vacante 'Desarrollador Front-End Junior'. Estado actual: Pendiente",
  "id_postulacion": 5,
  "estado": "Pendiente",
  "ya_postulado": true
}
```

#### 3. Actualización de Fase Kanban (`POST /api/postulacion/5/estado`)
**Petición (Reclutador autenticado):**
```json
{
  "estado": "Entrevista"
}
```
**Respuesta Exitosa (`200 OK`):**
```json
{
  "mensaje": "Candidato movido a la fase 'Entrevista' con éxito.",
  "id_postulacion": 5,
  "estado": "Entrevista"
}
```

#### 4. Publicación de Nueva Vacante (`POST /api/ofertas`)
**Petición (Reclutador autenticado):**
```json
{
  "titulo": "Asistente QA & Automatización Junior",
  "id_empresa": 2,
  "salario": 680.0,
  "modalidad": "Híbrido",
  "anos_experiencia": 0,
  "ubicacion_exacta": "Quito Norte",
  "funciones": "Creación y ejecución de casos de prueba automatizados con Python y Selenium.",
  "requisitos_tecnicos": "Estudiante de Sistemas, nociones de testing y Git."
}
```
**Respuesta Exitosa (`201 Created`):**
```json
{
  "mensaje": "Vacante 'Asistente QA & Automatización Junior' publicada con éxito.",
  "oferta": {
    "id_oferta": 13,
    "id_empresa": 2,
    "empresa": "Software Solutions EC",
    "titulo": "Asistente QA & Automatización Junior",
    "salario": 680.0,
    "modalidad": "Híbrido",
    "anos_experiencia": 0,
    "ubicacion_exacta": "Quito Norte",
    "activo": true
  }
}
```

---

## 5. Seguridad y Control de Acceso Basado en Roles (RBAC)

### 5.1. Mecanismo de Autenticación con Sesiones Firmadas

TalentoEC implementa autenticación basada en sesiones en servidor respaldadas por cookies criptográficamente firmadas por Flask mediante el secreto `SECRET_KEY`.

Variables almacenadas en la sesión al autenticarse:
- `session["usuario_id"]`: Identificador entero del usuario en la tabla `candidato`.
- `session["usuario_nombre"]`: Nombre completo del usuario para personalización visual.
- `session["usuario_correo"]`: Dirección de correo registrada.
- `session["usuario_rol"]`: Cadena que define los permisos (`"candidato"`, `"reclutador"`, `"admin"`).
- `session["favoritos"]`: Diccionario en memoria que almacena los IDs de ofertas marcadas para consulta instantánea.

---

### 5.2. Decorador `@login_requerido`

Ubicado en [`auth.py`](file:///c:/Users/ISAAC/Desktop/Plataforma_UI/auth.py), intercepta las solicitudes para asegurar que exista una sesión activa antes de acceder al controlador:

```python
def login_requerido(f):
    @wraps(f)
    def decorada(*args, **kwargs):
        if "usuario_id" not in session:
            # Si es petición AJAX / API REST -> responde JSON 401 Unauthorized
            if request.is_json or request.path.startswith("/api/"):
                return jsonify({
                    "error": "Debes iniciar sesión para realizar esta acción.", 
                    "autenticado": False
                }), 401
            # Si es navegación web estándar -> redirige a inicio con flash message
            flash("Debes iniciar sesión para acceder a esa página.", "danger")
            return redirect(url_for("inicio"))
        return f(*args, **kwargs)
    return decorada
```

---

### 5.3. Fábrica de Decoradores `@rol_requerido`

Permite restringir funciones a uno o varios roles específicos:

```python
def rol_requerido(rol_o_roles):
    roles_permitidos = [rol_o_roles] if isinstance(rol_o_roles, str) else list(rol_o_roles)

    def decorador(f):
        @wraps(f)
        def decorada(*args, **kwargs):
            # 1. Validar autenticación básica
            if "usuario_id" not in session:
                if request.is_json or request.path.startswith("/api/"):
                    return jsonify({"error": "Debes iniciar sesión para realizar esta acción.", "autenticado": False}), 401
                flash("Debes iniciar sesión para acceder a esa página.", "danger")
                return redirect(url_for("inicio"))

            # 2. Validar rol autorizado
            rol_actual = session.get("usuario_rol")
            if rol_actual not in roles_permitidos:
                if request.is_json or request.path.startswith("/api/"):
                    return jsonify({"error": "No tienes permisos para acceder a esta función.", "rol": rol_actual}), 403
                flash("No tienes permisos para acceder a esa página.", "danger")
                return redirect(url_for("inicio"))

            return f(*args, **kwargs)
        return decorada
    return decorador
```

#### Ejemplos de uso en el código:
```python
@app.route("/reclutadores")
@rol_requerido(["reclutador", "admin"])
def reclutadores():
    # Solo accesible para cuentas corporativas o administradores
    ...

@app.route("/favoritos/agregar/<int:oferta_id>", methods=["POST"])
@rol_requerido(["candidato"])
def agregar_favorito(oferta_id):
    # Solo candidatos pueden guardar ofertas
    ...
```

---

### 5.4. Cifrado Criptográfico de Contraseñas (PBKDF2:SHA256)

Ninguna contraseña se almacena en texto plano. En [`models.py`](file:///c:/Users/ISAAC/Desktop/Plataforma_UI/models.py), la clase `Candidato` implementa métodos seguros utilizando Werkzeug:

```python
def set_password(self, password_plano):
    """Genera y almacena el hash seguro utilizando PBKDF2 con HMAC-SHA256 y sal aleatoria."""
    self.contrasena = generate_password_hash(password_plano)

def check_password(self, password_plano):
    """Compara en tiempo constante la contraseña provista contra el hash almacenado."""
    return check_password_hash(self.contrasena, password_plano)
```

---

### 5.5. Controladores de Error Personalizados (HTTP 403 y 404)

TalentoEC implementa manejadores de error con detección dual (JSON vs HTML) en [`app.py`](file:///c:/Users/ISAAC/Desktop/Plataforma_UI/app.py):

```python
@app.errorhandler(404)
def pagina_no_encontrada(e):
    if request.is_json or request.path.startswith("/api/"):
        return jsonify({"error": "El recurso solicitado no fue encontrado en el servidor.", "codigo": 404}), 404
    return render_template("404.html"), 404

@app.errorhandler(403)
def acceso_denegado(e):
    if request.is_json or request.path.startswith("/api/"):
        return jsonify({"error": "No tienes los permisos requeridos para acceder a este recurso.", "codigo": 403}), 403
    return render_template("403.html"), 403
```

---

## 6. Arquitectura Frontend y JavaScript

### 6.1. Organización Modular de `script.js`

El frontend de TalentoEC opera mediante un único script estructurado modularmente sin dependencias pesadas:
- **Módulo de Autocompletado y Sugerencias:** Búsqueda en vivo de puestos y ciudades mediante `setupJobSuggestions` y `setupCityAutocomplete`.
- **Módulo de Detalle Master-Detail:** Renderizado dinámico de la columna derecha de vacantes al hacer clic sobre una tarjeta de la lista.
- **Módulo de Postulación en 1 Clic:** Envío asíncrono con feedback háptico y banners toast de notificación.
- **Módulo de Publicación y Live Preview:** Reactividad inmediata en el panel de reclutadores.
- **Módulo de Tablero Kanban:** Movimiento de postulaciones entre fases con persistencia en base de datos.
- **Módulo de Modales y Autenticación:** Formularios modales de Login y Registro con validación en cliente.

---

### 6.2. Postulación en 1 Clic con Fetch Asíncrono

En [`script.js`](file:///c:/Users/ISAAC/Desktop/Plataforma_UI/script.js#L910-L950), el botón de postulación ejecuta:

```javascript
const response = await fetch('/api/postular', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({ id_oferta: parseInt(jobId, 10) })
});

const data = await response.json();

if (response.status === 401) {
  // Si no está autenticado, despliega el modal de inicio de sesión
  showLoginModal();
  showToast("Inicia sesión como candidato para postularte.", "warning");
  return;
}

if (response.status === 403) {
  showToast(data.error, "error");
  return;
}

if (response.ok) {
  showToast(data.mensaje, "success");
  btn.textContent = "✓ Ya te has postulado";
  btn.classList.add("btn-applied");
}
```

---

### 6.3. Live Preview Reactivo del Formulario de Publicación

Al redactar una vacante en `/reclutadores`, los campos de entrada (`#input-titulo`, `#input-salario`, `#input-modalidad`, etc.) están vinculados mediante listeners de eventos `input`:

```javascript
// Actualización reactiva instantánea en la tarjeta de previsualización
tituloInput.addEventListener('input', (e) => {
  previewTitle.textContent = e.target.value.trim() || "Título del Cargo Ofertado";
});

salarioInput.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  previewSalary.textContent = val ? `$${val.toFixed(2)} USD / mes` : "$0.00 USD / mes";
});
```

Esto permite al reclutador visualizar con precisión de píxel cómo verán los estudiantes su vacante antes de guardarla.

---

### 6.4. Tablero Kanban Dinámico y Sincronización

El tablero de reclutadores divide a los aspirantes en 5 columnas: `Pendiente`, `En Evaluación`, `Entrevista`, `Aceptada`, `Rechazada`. Al cambiar un selector o mover una tarjeta:

```javascript
async function cambiarFasePostulacion(postulacionId, nuevoEstado) {
  try {
    const response = await fetch(`/api/postulacion/${postulacionId}/estado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    const result = await response.json();
    if (response.ok) {
      showToast(result.mensaje, "success");
      moverTarjetaEnDOM(postulacionId, nuevoEstado);
    } else {
      showToast(result.error || "No se pudo actualizar el estado.", "error");
    }
  } catch (err) {
    showToast("Error de conexión al actualizar la fase.", "error");
  }
}
```

---

### 6.5. Sistema de Tokens CSS y Regla 60/30/10 en `style.css`

El diseño de TalentoEC se rige estrictamente por la **regla cromática 60/30/10**:
- **60% Dominante:** `--color-primary` (`#1D4ED8` Azul Institucional) y fondos neutros estructurados.
- **30% Secundario:** `--color-secondary` (`#F8FAFC` Blanco Pizarra) en cards, paneles y menús.
- **10% Acento:** `--color-accent` (`#F97316` Naranja Enérgico) reservado con exclusividad para botones de postulación, acciones primarias y badges de alerta.

```css
/* Tokens de Diseño en style.css */
:root {
  --color-primary: #1D4ED8;
  --color-primary-dark: #1e40af;
  --color-primary-light: #eff6ff;
  --color-secondary: #F8FAFC;
  --color-accent: #F97316;
  --color-accent-dark: #ea580c;
  --color-accent-light: #ffedd5;
  --color-neutral-dark: #1E293B;
  --color-neutral-muted: #64748B;
  --color-neutral-light: #E2E8F0;
  
  --font-family-title: 'Poppins', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  
  --border-radius-sm: 6px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
}
```

---

## 7. Suite de Pruebas Automatizadas

### 7.1. Organización de la Suite de Pruebas (`tests/`)

TalentoEC cuenta con una suite integral de **37 pruebas automatizadas** organizadas en 5 suites especializadas construidas sobre el framework estándar de Python `unittest`:

```text
tests/
├── test_auth.py             # 5 Tests: Login, Registro, Logout y Manejo de Sesión.
├── test_crud_ofertas.py     # 6 Tests: Publicación, Edición, Soft Delete y Reactivación.
├── test_flujo_completo.py   # 9 Tests: Postulación en 1 clic, Historial, RBAC y Errores 404.
├── test_integridad_bd.py    # 11 Tests: CheckConstraints, Triggers y Stored Procedures PL/pgSQL.
└── test_roles_y_permisos.py # 6 Tests: Aislamiento estricto de roles y Favoritos.
```

---

### 7.2. Catálogo de Casos de Prueba (37 Tests Verificados)

```
======================================================================
SUITE                   MÉTODO DE PRUEBA                               DESCRIPCIÓN
======================================================================
test_auth               test_registro_exitoso                          Crea un nuevo usuario y valida sesión.
test_auth               test_registro_correo_duplicado                 Verifica rechazo con código HTTP 409.
test_auth               test_login_exitoso                             Comprueba credenciales válidas y cookie.
test_auth               test_login_credenciales_invalidas              Verifica rechazo de contraseña errónea (401).
test_auth               test_logout                                    Comprueba destrucción limpia de sesión.
----------------------------------------------------------------------
test_crud_ofertas       test_crear_oferta_via_form                    Publicación exitosa mediante formulario web.
test_crud_ofertas       test_crear_oferta_via_json                    Publicación exitosa mediante API JSON (201).
test_crud_ofertas       test_crear_oferta_validacion_error             Rechazo de ofertas sin título o salario malo.
test_crud_ofertas       test_editar_oferta_get_y_post                  Actualización de campos de oferta existente.
test_crud_ofertas       test_desactivar_oferta_soft_delete             Pausa suave de vacante (activo = False).
test_crud_ofertas       test_reactivar_oferta                          Reactivación en catálogo público (activo = True).
----------------------------------------------------------------------
test_flujo_completo     test_registro_candidato                        Flujo de bienvenida de postulante.
test_flujo_completo     test_registro_reclutador                       Registro empresarial y redirección al portal.
test_flujo_completo     test_postulacion_rapida_y_duplicados           Postulación en 1 clic y manejo idempotente.
test_flujo_completo     test_reclutador_no_puede_postular              Bloqueo de aplicación a cuentas corporativas.
test_flujo_completo     test_historial_mis_postulaciones               Verificación de visibilidad en /postulaciones.
test_flujo_completo     test_kanban_cambio_fase                        Transición de etapas en pipeline de selección.
test_flujo_completo     test_aislamiento_roles_candidato_denegado      Candidato bloqueado de /reclutadores.
test_flujo_completo     test_logout_redireccion_y_limpieza             Redirección y vaciado de variables.
test_flujo_completo     test_error_404                                 Respuesta de error para rutas inexistentes.
----------------------------------------------------------------------
test_integridad_bd      test_check_salario_minimo_oferta               BD rechaza salarios < $460 USD.
test_integridad_bd      test_check_edad_candidato_minima               BD rechaza candidatos menores de 16 años.
test_integridad_bd      test_check_rol_invalido_candidato              BD rechaza roles diferentes a permitidos.
test_integridad_bd      test_check_ranking_empresa_rango               BD exige ranking en rango [0.00, 5.00].
test_integridad_bd      test_unique_postulacion_duplicada              BD previene duplicar (candidato, oferta).
test_integridad_bd      test_unique_favorito_duplicado                 BD previene duplicar ofertas en favoritos.
test_integridad_bd      test_trigger_bloquea_postulacion_reclutador    Trigger PL/pgSQL impide postular a reclutador.
test_integridad_bd      test_trigger_bloquea_postulacion_oferta_inactiva Trigger PL/pgSQL impide postular a inactiva.
test_integridad_bd      test_trigger_auditoria_cambio_fase             Trigger audita cambios en auditoria_postulacion.
test_integridad_bd      test_stored_procedure_sp_publicar_oferta       Ejecuta procedimiento sp_publicar_oferta.
test_integridad_bd      test_stored_procedure_sp_cambiar_fase_kanban   Ejecuta procedimiento sp_cambiar_fase_kanban.
----------------------------------------------------------------------
test_roles_y_permisos   test_crear_vacante_sin_sesion_bloqueado        Bloqueo 401/302 a usuarios anónimos.
test_roles_y_permisos   test_crear_vacante_como_candidato_bloqueado    Bloqueo 403 a candidatos en /vacantes/nueva.
test_roles_y_permisos   test_crear_vacante_como_reclutador_exitoso     Permiso concedido para reclutador autenticado.
test_roles_y_permisos   test_editar_y_desactivar_vacante_como_reclutador Control completo sobre ciclo de vida de oferta.
test_roles_y_permisos   test_favoritos_bloqueado_para_reclutador       Reclutador no puede agregar a favoritos.
test_roles_y_permisos   test_carrito_favoritos_flujo_completo          Flujo completo de agregar, ver y eliminar favs.
======================================================================
```

---

### 7.3. Ejecución de la Suite

Para correr la totalidad de los 37 casos de prueba de forma verbosa:

```bash
python -m unittest discover -s tests -p "test_*.py" -v
```

**Resultado esperado:**
```text
Ran 37 tests in 19.509s

OK
```

Para correr únicamente un módulo específico:
```bash
python -m unittest tests/test_integridad_bd.py -v
```

---

### 7.4. Guía para Escribir Nuevas Pruebas Unitarias

Al agregar nuevas funcionalidades a TalentoEC, siga este patrón estándar con `unittest.TestCase`:

```python
import unittest
import json
from app import app
from models import db, Candidato

class MiNuevaFuncionalidadTestCase(unittest.TestCase):
    def setUp(self):
        """Se ejecuta antes de CADA test: aísla el entorno."""
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'clave-de-prueba'
        self.client = app.test_client()

        with app.app_context():
            db.create_all()
            # Crear fixtures necesarios
            candidato = Candidato(nombre="Test User", correo="test@puce.ec", rol="candidato")
            candidato.set_password("claveSegura123")
            db.session.add(candidato)
            db.session.commit()
            self.user_id = candidato.id_candidato

    def tearDown(self):
        """Se ejecuta al finalizar CADA test: limpia la base de datos."""
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_mi_nuevo_endpoint_json(self):
        # 1. Simular sesión autenticada
        with self.client.session_transaction() as sess:
            sess['usuario_id'] = self.user_id
            sess['usuario_rol'] = 'candidato'

        # 2. Ejecutar petición REST
        response = self.client.post('/api/nuevo-endpoint', 
                                    data=json.dumps({"parametro": "valor"}),
                                    content_type='application/json')

        # 3. Aserciones estrictas
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data.get("exito"))
```

---

## 8. Guía de Despliegue en Producción

### 8.1. Arquitectura de Servidores de Producción

En entornos de producción, el servidor de desarrollo integrado de Flask (`app.run()`) **nunca debe utilizarse** debido a su naturaleza monohilo y falta de defensas contra ataques de denegación de servicio.

La arquitectura recomendada para TalentoEC se compone de:
1. **Cliente Web:** HTTPS en puerto estándar 443.
2. **Nginx:** Servidor proxy inverso que termina SSL, aplica compresión gzip y despacha directamente los archivos de `assets/`, `style.css` y `script.js`.
3. **Servidor WSGI (Gunicorn en Linux / Waitress en Windows):** Procesa peticiones dinámicas en workers concurrentes.
4. **PostgreSQL:** Base de datos con conexiones protegidas por TLS (`sslmode=require`).

---

### 8.2. Servidor WSGI: Gunicorn (Linux) / Waitress (Windows Server)

#### Opción A: Despliegue en Linux con Gunicorn
Instalar Gunicorn:
```bash
pip install gunicorn
```

Ejecución directa recomendada (4 workers concurrentes):
```bash
gunicorn -w 4 -b 127.0.0.1:5000 app:app --access-logfile /var/log/talentoec_access.log --error-logfile /var/log/talentoec_error.log
```

**Creación de servicio systemd (`/etc/systemd/system/talentoec.service`):**
```ini
[Unit]
Description=Servicio Web TalentoEC (PUCE)
After=network.target postgresql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/talentoec
Environment="PATH=/var/www/talentoec/venv/bin"
EnvironmentFile=/var/www/talentoec/.env
ExecStart=/var/www/talentoec/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Habilitar e iniciar el servicio:
```bash
sudo systemctl daemon-reload
sudo systemctl enable talentoec
sudo systemctl start talentoec
```

#### Opción B: Despliegue en Windows Server con Waitress
Instalar Waitress:
```powershell
pip install waitress
```

Ejecución en producción:
```powershell
waitress-serve --listen=127.0.0.1:5000 app:app
```

---

### 8.3. Configuración de Proxy Inverso Nginx

Cree el bloque de configuración en `/etc/nginx/sites-available/talentoec`:

```nginx
upstream talentoec_backend {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name talentoec.puce.edu.ec;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name talentoec.puce.edu.ec;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/talentoec.puce.edu.ec/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/talentoec.puce.edu.ec/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Optimización de Estáticos
    location /assets/ {
        alias /var/www/talentoec/assets/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location /style.css {
        alias /var/www/talentoec/style.css;
        expires 7d;
    }

    location /script.js {
        alias /var/www/talentoec/script.js;
        expires 7d;
    }

    # Despacho de Peticiones Dinámicas a Flask / WSGI
    location / {
        proxy_pass http://talentoec_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90;
    }
}
```

Habilitar el sitio y reiniciar Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/talentoec /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 8.4. Configuración de Certificados SSL con Certbot

Para obtener e instalar certificados TLS/SSL gratuitos de Let's Encrypt automáticamente:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d talentoec.puce.edu.ec
```

Certbot configurará la renovación automática mediante temporizadores de systemd.

---

### 8.5. Parámetros Críticos de Seguridad en Producción

Al pasar a producción, verifique estrictamente los siguientes parámetros en su archivo `.env` o en las variables del servidor:

1. **Generación de `SECRET_KEY` criptográfica:**
   Genere una clave criptográfica de 64 caracteres hexadecimales:
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```
   Asigne el resultado en el `.env` de producción:
   ```env
   SECRET_KEY=9f4a8b2c5e1d7f6a3b0c9e8d7a6b5c4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c
   ```

2. **Desactivar Debug Mode:**
   Asegúrese de que `debug=False` esté activo en el servidor:
   ```env
   FLASK_DEBUG=0
   FLASK_ENV=production
   ```

3. **Conexión Cifrada a PostgreSQL:**
   Agregue el parámetro de SSL en la cadena de conexión:
   ```env
   DATABASE_URL=postgresql://usuario:password@db.servidor.ec:5432/plataformaempleo?sslmode=require
   ```

4. **Cookies de Sesión Seguras:**
   En entornos HTTPS, configure Flask para exigir directivas seguras en cookies de sesión:
   ```python
   app.config.update(
       SESSION_COOKIE_SECURE=True,
       SESSION_COOKIE_HTTPONLY=True,
       SESSION_COOKIE_SAMESITE='Lax',
   )
   ```

---

### 8.6. Estrategia de Respaldo y Restauración de Base de Datos (`pg_dump`)

#### 1. Creación de Respaldos con `pg_dump`
Generar un respaldo completo en formato binario comprimido de alto rendimiento:
```bash
pg_dump -U postgres -h localhost -F c -b -v -f "talentoec_backup_$(date +%Y%m%d_%H%M%S).dump" plataformaempleo
```

O en formato de texto plano SQL para inspección manual:
```bash
pg_dump -U postgres -h localhost -F p -v -f "talentoec_backup_$(date +%Y%m%d).sql" plataformaempleo
```

#### 2. Automatización con Cron (Backups Diarios con Rotación)
Edite el crontab del usuario del sistema:
```bash
crontab -e
```

Agregue la siguiente tarea para ejecutar el respaldo a las 02:00 AM todos los días y eliminar archivos con más de 30 días de antigüedad:
```bash
0 2 * * * pg_dump -U postgres -F c plataformaempleo > /var/backups/talentoec/backup_$(date +\%F).dump && find /var/backups/talentoec/ -type f -name "*.dump" -mtime +30 -delete
```

#### 3. Restauración de Base de Datos con `pg_restore`
En caso de contingencia o migración de servidor:
```bash
# 1. Crear base de datos vacía en el nuevo servidor
createdb -U postgres -h localhost plataformaempleo

# 2. Restaurar desde el archivo .dump comprimido
pg_restore -U postgres -h localhost -d plataformaempleo -v "talentoec_backup_20260903.dump"
```

Si el respaldo es un archivo `.sql` plano:
```bash
psql -U postgres -h localhost -d plataformaempleo -f "talentoec_backup_20260903.sql"
```

---

> [!TIP]
> Para soporte adicional o reporte de incidencias técnicas en el código, comuníquese con el equipo de desarrollo de la PUCE o consulte el [Manual de Usuario](MANUAL_USUARIO.md).
