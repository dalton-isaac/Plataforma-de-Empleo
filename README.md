# 🚀 TalentoEC - Plataforma de Búsqueda de Empleo para Jóvenes y Estudiantes (Quito)

Plataforma web universitaria y bolsa de empleo diseñada con enfoque **Mobile-First** para conectar a estudiantes universitarios y jóvenes de 18 a 30 años en **Quito, Ecuador** con su primer empleo o pasantías formativas sin requerir experiencia previa.

---

## 🎨 Sistema de Diseño (Regla 60/30/10)

* **Dominante (60%):** Azul `#1D4ED8` — Estructura, headers, identidad de marca y navegación.
* **Secundario / Fondo (30%):** Blanco Nieve `#F8FAFC` — Fondos de página y tarjetas contenedoras.
* **Acento (10%):** Naranja `#F97316` — Exclusivo para llamadas a la acción clave (**Postulación Rápida en 1 Clic**, notificaciones, insignias activas).
* **Texto & Neutro Oscuro:** Gris Pizarra `#1E293B`.
* **Tipografías:**
  * Títulos: `Poppins` (SemiBold 32px para H1, Medium 24px para H2).
  * Cuerpo & Acciones: `Inter` (Regular 16px para textos, Medium 14px para botones).

---

## 📱 Pantallas y Funcionalidades Principales

### 1. `index.html` — Landing Page Principal
* Hero Section con buscador inteligente por cargo y sector de Quito.
* Sección de Desarrollo Profesional y mentorías.
* Carrusel deslizable de ofertas destacadas con etiquetas **"Sin Experiencia"** y salarios en USD ($460 - $750).
* Barra de empresas afiliadas e integración responsive con menú hamburguesa para móviles.

### 2. `postulacion.html` — Búsqueda de Empleos y Postulación Rápida
* Barra de búsqueda con filtros por categoría en carrusel horizontal táctil (*Todos, Sin Experiencia, TI & Software, Diseño UX/UI, Marketing, Soporte TI*).
* Arquitectura **Master-Detail** adaptativa:
  * **Móviles (<1024px):** Listado vertical con apertura a pantalla completa del detalle y botón "Volver a la lista".
  * **Escritorio (≥1024px):** Vista dividida con panel de detalle lateral fijado (*sticky*).
* Modal interactivo de **Postulación Rápida con 1 Clic** (simulador de envío sin fricción).

### 3. `desarrollo.html` — Desarrollo Personal & CV Builder
* Maquetación con **Flexbox puro** y **activos vectoriales SVG**.
* **Pestaña 1 (Plantillas de CV):** 6 plantillas vectoriales en SVG orientadas a estudiantes universitarios (*Moderna Estudiantil, Minimalista Tech, Creativa UX/UI, etc.*) con modal de personalización.
* **Pestaña 2 (Resaltador de Habilidades con IA):** Diagnóstico automático de CV, extracción de competencias clave, certificaciones detectadas y sugerencias personalizadas para el mercado laboral de Quito.
* **Pestaña 3 (Verificación de Competencias):** Perfil estudiantil con avatar SVG y cuadrícula de insignias digitales verificadas (*Frontend, Figma UX/UI, Marketing, Python, Inglés B2, Soporte TI*).

### 4. `reclutadores.html` — Portal de Empresas & Tablero Kanban
* Banner corporativo para reclutadores de Quito con ilustración SVG.
* **Formulario de Publicación de Vacantes con Live Preview en Tiempo Real:** Los cambios se reflejan al instante en la tarjeta previa.
* **Tablero Kanban de Candidatos:** 4 columnas de seguimiento de contratación (*Nuevos, En revisión, Entrevista, Decisión final*) con buscador dinámico y modal visor de currículum del estudiante.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico** (Mobile-First, SEO optimizado con meta tags y accesibilidad).
* **CSS3 Vanilla & Flexbox** (Variables CSS, transiciones suaves, soporte responsive y Grid).
* **JavaScript Moderno (ES6+)** (Filtrado en tiempo real, Live Preview, gestión de modales y tabs).
* **Gráficos Vectoriales SVG** (Ilustraciones y badges vectoriales de alta definición).

---

## 💻 Cómo Ejecutar Localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/dalton-isaac/Plataforma-de-Empleo.git
   cd Plataforma-de-Empleo
   ```

2. Inicia un servidor HTTP local (Python o Live Server):
   ```bash
   # Con Python 3:
   python -m http.server 8000
   ```

3. Abre tu navegador en:
   * **Inicio:** [http://localhost:8000/index.html](http://localhost:8000/index.html)
   * **Búsqueda & Postulación:** [http://localhost:8000/postulacion.html](http://localhost:8000/postulacion.html)
   * **Desarrollo Personal:** [http://localhost:8000/desarrollo.html](http://localhost:8000/desarrollo.html)
   * **Portal Reclutadores:** [http://localhost:8000/reclutadores.html](http://localhost:8000/reclutadores.html)

---

## 👥 Equipo y Créditos

* **Proyecto Universitario - Grupo 4**
* **Quito, Ecuador** - 2026
