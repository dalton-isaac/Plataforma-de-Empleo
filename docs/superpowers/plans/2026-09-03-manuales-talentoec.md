# Manual de Usuario y Manual de Desarrollador para TalentoEC - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear el Manual de Usuario y el Manual de Desarrollador para la plataforma TalentoEC, con diagramas Mermaid, tablas de endpoints, modelos ERD y guías de uso y despliegue, enlazándolos desde el README principal.

**Architecture:** Documentación estructurada dual en formato Markdown dentro del directorio `docs/` (`docs/MANUAL_USUARIO.md` y `docs/MANUAL_DESARROLLADOR.md`), con diagramas Mermaid integrados y actualización del índice de navegación en `README.md`.

**Tech Stack:** Markdown (GitHub Flavored), Mermaid.js (diagramas de flujo, arquitectura y ERD), Python 3.10+, Flask 3.x, SQLAlchemy ORM, PostgreSQL.

**Spec:** `docs/superpowers/specs/2026-09-03-manuales-talentoec-design.md`

## Global Constraints

- Todos los archivos de documentación deben residir en `docs/` con nombres `MANUAL_USUARIO.md` y `MANUAL_DESARROLLADOR.md`.
- Usar sintaxis estándar de Mermaid compatible con renderizadores de GitHub/GitLab.
- Todos los modelos, tablas, rutas y decoradores descritos deben corresponder exactamente con el código real de `models.py`, `app.py`, `auth.py` y la suite de tests en `tests/`.
- No usar marcadores de posición ("TBD", "TODO", "implementar luego").

---

### Task 1: Crear el Manual de Usuario (`docs/MANUAL_USUARIO.md`)

**Files:**
- Create: `docs/MANUAL_USUARIO.md`

**Interfaces:**
- Consumes: Flujos funcionales de `templates/` (`index.html`, `postulacion.html`, `desarrollo.html`, `reclutadores.html`, `postulaciones.html`, `favoritos.html`) y controladores en `app.py`.
- Produces: Guía de uso completa para usuarios finales (Candidatos y Reclutadores).

- [ ] **Step 1: Redactar `docs/MANUAL_USUARIO.md`**
  Incluir:
  - Portada, información general, autores (PUCE: Isaac Oña, Leandro Frutos, Axel Masache).
  - Tabla de credenciales de prueba preconfiguradas y matriz de permisos RBAC.
  - Guía de inicio de sesión, registro como Candidato y registro como Reclutador (con empresa).
  - Guía del Candidato: buscador con filtros en tiempo real, carrusel de etiquetas, postulación en 1 clic, historial de postulaciones (`/postulaciones`) con 4 estados, favoritos (`/favoritos`) y CV Builder con IA (`/desarrollo`).
  - Guía del Reclutador: portal de reclutadores (`/reclutadores`), creación de vacantes con Live Preview, edición, borrado suave (pausar) y reactivación, y gestión del Tablero Kanban con selector de fases y visor de CV.
  - Diagramas Mermaid de flujo de postulación y navegación.
  - Sección de Preguntas Frecuentes (FAQ).

- [ ] **Step 2: Verificar sintaxis del Manual de Usuario**
  Comprobar que no existan enlaces rotos ni bloques de código o diagramas Mermaid mal formateados.

- [ ] **Step 3: Commitear cambios**
  ```bash
  git add docs/MANUAL_USUARIO.md
  git commit -m "docs: agregar manual de usuario detallado con diagramas mermaid y flujos por rol"
  ```

---

### Task 2: Crear el Manual de Desarrollador (`docs/MANUAL_DESARROLLADOR.md`)

**Files:**
- Create: `docs/MANUAL_DESARROLLADOR.md`

**Interfaces:**
- Consumes: Código fuente de `app.py`, `models.py`, `auth.py`, `config.py`, `init_db.py`, `script.js`, `style.css` y `tests/`.
- Produces: Documento técnico de ingeniería para desarrolladores y evaluadores técnicos.

- [ ] **Step 1: Redactar `docs/MANUAL_DESARROLLADOR.md`**
  Incluir:
  - Arquitectura en capas y stack tecnológico (Python 3.10+, Flask, SQLAlchemy, PostgreSQL, Vanilla JS).
  - Diagrama Mermaid de Arquitectura en Capas y árbol de directorios.
  - Modelo de base de datos relacional: Diagrama ERD Mermaid (`empresa`, `candidato`, `oferta_empleo`, `postulacion`, `favorito`, `habilidad_certificacion`), restricciones `CheckConstraint` y estrategia de soft delete.
  - Guía de instalación y entorno local (Windows PowerShell y Linux/macOS `venv`, PostgreSQL, `.env`, `init_db.py`).
  - Catálogo de Rutas y API REST: tablas completas con métodos, URLs, roles exigidos, payloads JSON/Form y códigos HTTP.
  - Seguridad y RBAC: funcionamiento de `@login_requerido` y `@rol_requerido`, manejo de sesiones y hash de contraseñas.
  - Arquitectura Frontend: módulos de `script.js` (Postulación 1 clic, Live Preview, Kanban reactivo) y sistema de diseño CSS 60/30/10 en `style.css`.
  - Suite de Pruebas Automatizadas: descripción de los 5 archivos en `tests/`, comando de ejecución con `unittest` y cómo escribir nuevos tests.
  - Guía de Despliegue en Producción: WSGI con Gunicorn / Waitress, Nginx reverse proxy, variables de entorno seguras y respaldos con `pg_dump`.

- [ ] **Step 2: Verificar sintaxis y consistencia técnica**
  Comprobar consistencia con `models.py` y `app.py`.

- [ ] **Step 3: Commitear cambios**
  ```bash
  git add docs/MANUAL_DESARROLLADOR.md
  git commit -m "docs: agregar manual de desarrollador con diagrama erd, arquitectura, catalogo api y despliegue"
  ```

---

### Task 3: Actualizar `README.md` y Verificar Suite de Pruebas

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: `docs/MANUAL_USUARIO.md` y `docs/MANUAL_DESARROLLADOR.md`.
- Produces: Índice de documentación centralizado en la portada del repositorio.

- [ ] **Step 1: Modificar `README.md` para enlazar los manuales**
  Agregar una sección prominente "📚 Documentación Oficial del Proyecto" con accesos directos al Manual de Usuario y Manual de Desarrollador.

- [ ] **Step 2: Ejecutar la suite de pruebas unitarias existente**
  Ejecutar:
  ```powershell
  python -m unittest discover -s tests -p "test_*.py" -v
  ```
  Verificar que las 23 pruebas sigan pasando exitosamente sin regresiones.

- [ ] **Step 3: Commitear cambios**
  ```bash
  git add README.md
  git commit -m "docs: enlazar manual de usuario y manual de desarrollador en README"
  ```
