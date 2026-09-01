document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // DATOS CENTRALIZADOS DE OFERTAS DE EMPLEO (QUITO - JÓVENES & ESTUDIANTES)
  // ==========================================================================
  const jobsData = [
    {
      id: 1,
      title: "Desarrollador Front-End Junior",
      company: "Software Solutions EC",
      location: "Quito, Ecuador (Remoto)",
      salary: "$650 - $750 USD / mes",
      badge: "Sin Experiencia",
      category: "ti",
      mode: "remoto",
      tags: ["Remoto Completo", "Jornada Flexible", "Postulación Inmediata"],
      description: "Buscamos un estudiante o recién graduado con entusiasmo por la tecnología para unirse a nuestro equipo de desarrollo en Quito. Tendrás la oportunidad de participar en el diseño y maquetación de aplicaciones web reales, recibiendo acompañamiento constante de ingenieros senior.",
      responsibilities: [
        "Maquetar componentes web responsivos utilizando HTML5, CSS3 y JavaScript moderno.",
        "Implementar diseños de interfaz trasladados desde Figma con precisión de píxeles.",
        "Colaborar en la resolución de incidencias y optimización del rendimiento en navegadores.",
        "Participar en reuniones diarias de equipo (Scrum) y sesiones de aprendizaje técnico."
      ],
      requirements: [
        "Estudiante universitario (a partir de 3er semestre) o recién graduado en Sistemas, Software o afines.",
        "Conocimientos básicos demostrables en HTML, CSS y fundamentos de programación.",
        "Ganas de aprender y capacidad de trabajo en equipo.",
        "Residencia en Quito o disponibilidad para trabajo remoto en horario ecuatoriano."
      ],
      benefits: [
        "Flexibilidad de horarios para exámenes y asistencia a clases universitarias.",
        "Mentoría directa 1 a 1 con un desarrollador experimentado.",
        "Certificado oficial de prácticas preprofesionales válido para tu universidad.",
        "Posibilidad real de contratación fija según desempeño al finalizar el periodo."
      ]
    },
    {
      id: 2,
      title: "Pasantía de Diseño UX/UI",
      company: "Corporación Multimedios",
      location: "Quito Norte (Sector La Carolina)",
      salary: "$460 USD / mes (Pasantía)",
      badge: "Sin Experiencia",
      category: "diseno",
      mode: "hibrido",
      tags: ["Híbrido (2 días presencial)", "Medio Tiempo", "Tutor Asignado"],
      description: "Oportunidad de pasantía formativa para estudiantes de Diseño Gráfico, Multimedia o Comunicación Visual. Diseñarás interfaces centradas en el usuario, wireframes y flujos interactivos para plataformas educativas.",
      responsibilities: [
        "Diseñar wireframes y prototipos interactivos en Figma siguiendo sistemas de diseño modernos.",
        "Realizar pruebas básicas de usabilidad con usuarios finales y documentar mejoras de interfaz.",
        "Crear recursos gráficos vectoriales y preparar componentes para los desarrolladores front-end.",
        "Mantener la coherencia visual de la marca en todos los entregables digitales."
      ],
      requirements: [
        "Estudiante universitario activo en Diseño Gráfico, Diseño Multimedia o afines.",
        "Manejo básico o intermedio de Figma (componentes, Auto Layout y prototipado).",
        "Sensibilidad por la tipografía, teoría del color y accesibilidad web.",
        "Portafolio académico o proyectos personales que demuestren interés en UX/UI."
      ],
      benefits: [
        "Convenio oficial de pasantías con validación de horas universitarias.",
        "Acceso gratuito a cursos de diseño avanzado y licencias profesionales.",
        "Ambiente de trabajo colaborativo y moderno frente al parque La Carolina.",
        "Bono mensual de transporte y alimentación."
      ]
    },
    {
      id: 3,
      title: "Asistente de Marketing Digital",
      company: "Agencia Click Vértice",
      location: "Quito (Sector Cumbayá)",
      salary: "$500 - $580 USD / mes",
      badge: "Sin Experiencia",
      category: "marketing",
      mode: "presencial",
      tags: ["Presencial / Cumbayá", "Turno Matutino", "Capacitación Pagada"],
      description: "Buscamos un joven dinámico con habilidades de comunicación para apoyar en la gestión de redes sociales, creación de copys y monitoreo de campañas digitales para clientes locales.",
      responsibilities: [
        "Programar y monitorear publicaciones en Instagram, TikTok y LinkedIn.",
        "Redactar textos persuasivos (copywriting) para anuncios y publicaciones orgánicas.",
        "Generar reportes semanales de interacción y alcance de contenidos.",
        "Apoyar en sesiones fotográficas y cobertura de eventos de clientes."
      ],
      requirements: [
        "Estudiante de Marketing, Publicidad, Comunicación o carreras afines.",
        "Excelente ortografía, redacción creativa y manejo de tendencias en redes sociales.",
        "Conocimientos básicos de herramientas de edición (Canva, CapCut o Adobe Suite).",
        "Proactividad y disposición para proponer ideas innovadoras."
      ],
      benefits: [
        "Capacitación continua en pauta digital (Meta Ads y Google Ads).",
        "Horario adaptado a jornadas universitarias (matutino o vespertino).",
        "Excelente clima laboral con actividades de integración y networking.",
        "Oportunidades de crecimiento hacia el cargo de Community Manager Senior."
      ]
    },
    {
      id: 4,
      title: "Soporte Técnico Junior",
      company: "Redes y Sistemas Cía. Ltda.",
      location: "Quito Centro Histórico",
      salary: "$480 - $520 USD / mes",
      badge: "Sin Experiencia",
      category: "soporte",
      mode: "presencial",
      tags: ["Presencial", "Jornada Completa", "Estabilidad Laboral"],
      description: "Excelente oportunidad para estudiantes técnicos o ingenieros en formación para adquirir experiencia en soporte a usuarios, mantenimiento de hardware y administración básica de redes corporativas.",
      responsibilities: [
        "Atender tickets de soporte de primer nivel para usuarios de oficina.",
        "Instalar sistemas operativos, paquetes ofimáticos y software corporativo.",
        "Realizar mantenimiento preventivo y correctivo de computadores de escritorio y laptops.",
        "Verificar el correcto funcionamiento de conexiones de red LAN y periféricos."
      ],
      requirements: [
        "Egresado técnico o estudiante de Ingeniería en Sistemas, Telemática o Electrónica.",
        "Conocimiento práctico en ensamblaje y diagnóstico de computadores.",
        "Vocación de servicio, paciencia y buena comunicación interpersonal.",
        "Disponibilidad para trabajar en el sector centro de Quito."
      ],
      benefits: [
        "Contrato con todos los beneficios de ley ecuatoriana (IESS, décimos, vacaciones).",
        "Capacitación técnica en servidores Windows Server y routers Mikrotik.",
        "Subsidio de almuerzo en cafetería de la empresa.",
        "Plan de carrera hacia el área de Infraestructura y Redes."
      ]
    }
  ];

  let currentSelectedJobId = 1;

  // ==========================================================================
  // 1. MENÚ HAMBURGUESA MÓVIL
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isActive = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      menuToggle.innerHTML = isActive ? `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ` : `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });

    const navLinks = document.querySelectorAll('.nav-link, .btn-secondary-nav, .btn-primary-nav');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      });
    });
  }

  // ==========================================================================
  // 2. DESPLAZAMIENTO DEL CARRUSEL DE EMPLEOS (En Home si aplica)
  // ==========================================================================
  const carouselContainer = document.getElementById('carousel-container');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  if (carouselContainer && btnPrev && btnNext) {
    const getScrollAmount = () => {
      const card = carouselContainer.querySelector('.job-card');
      if (card) {
        const cardStyle = window.getComputedStyle(carouselContainer);
        const gap = parseInt(cardStyle.getPropertyValue('gap')) || 24;
        return card.offsetWidth + gap;
      }
      return 300;
    };

    btnNext.addEventListener('click', () => {
      carouselContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      carouselContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 3. CARRUSEL DE EMPRESAS AFILIADAS
  // ==========================================================================
  const brandsTrack = document.getElementById('brands-track');
  const btnBrandsPrev = document.getElementById('brands-prev');
  const btnBrandsNext = document.getElementById('brands-next');

  if (brandsTrack && btnBrandsPrev && btnBrandsNext) {
    let scrollPos = 0;
    const itemWidth = 150;
    
    btnBrandsNext.addEventListener('click', () => {
      const maxScroll = brandsTrack.scrollWidth - brandsTrack.parentElement.clientWidth;
      scrollPos = Math.min(scrollPos + itemWidth, maxScroll);
      brandsTrack.style.transform = `translateX(-${scrollPos}px)`;
    });

    btnBrandsPrev.addEventListener('click', () => {
      scrollPos = Math.max(scrollPos - itemWidth, 0);
      brandsTrack.style.transform = `translateX(-${scrollPos}px)`;
    });
  }

  // ==========================================================================
  // 3.5. BUSCADOR INTELIGENTE EN EL HEADER CON AUTOCOMPLETE (TODAS LAS PÁGINAS)
  // ==========================================================================
  const headerSearchForm = document.getElementById('search-form');
  const headerSearchJob = document.getElementById('search-job');
  const headerSearchLocation = document.getElementById('search-location');
  const headerSearchBtn = document.getElementById('btn-search-icon');
  const suggestionsDropdown = document.getElementById('search-suggestions-dropdown');

  let availableJobsList = [...jobsData];

  async function loadJobsForAutocomplete() {
    try {
      const res = await fetch('/api/ofertas');
      if (res.ok) {
        const apiJobs = await res.json();
        if (Array.isArray(apiJobs) && apiJobs.length > 0) {
          const mappedApiJobs = apiJobs.map(job => ({
            id: job.id_oferta || job.id,
            title: job.titulo || job.title,
            company: job.empresa || job.company || 'Empresa Aliada',
            location: job.ubicacion || job.location || 'Quito, Ecuador',
            salary: job.sueldo ? `$${job.sueldo} USD` : (job.salary || 'A convenir'),
            badge: job.experiencia_requerida ? 'Con Experiencia' : 'Sin Experiencia',
            category: job.categoria || job.category || 'general',
            mode: job.modalidad || job.mode || 'presencial',
            tags: job.tags || [job.modalidad || 'Presencial'],
            description: job.descripcion || job.description || ''
          }));
          availableJobsList = mappedApiJobs;
        }
      }
    } catch (e) {
      // Usar jobsData local si no hay conexión API
    }
  }
  loadJobsForAutocomplete();

  const getCategoryIcon = (category) => {
    switch ((category || '').toLowerCase()) {
      case 'ti':
      case 'software':
      case 'desarrollo':
        return '💻';
      case 'diseno':
      case 'ux':
      case 'ui':
        return '🎨';
      case 'marketing':
      case 'publicidad':
        return '📱';
      case 'soporte':
      case 'redes':
        return '🛠️';
      default:
        return '💼';
    }
  };

  const highlightMatch = (text, query) => {
    if (!query || !text) return text || '';
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const performHeaderSearch = (customQuery = null) => {
    const q = customQuery !== null ? customQuery : (headerSearchJob ? headerSearchJob.value.trim() : '');
    const location = headerSearchLocation ? headerSearchLocation.value.trim() : '';

    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (location) params.append('location', location);

    const targetUrl = `postulacion.html?${params.toString()}`;
    window.location.href = targetUrl;
  };

  if (headerSearchForm) {
    headerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      performHeaderSearch();
    });
  }

  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performHeaderSearch();
    });
  }

  if (headerSearchJob && suggestionsDropdown) {
    let currentFocus = -1;

    const showSuggestions = (query) => {
      const q = query.toLowerCase().trim();
      if (!q) {
        suggestionsDropdown.style.display = 'none';
        suggestionsDropdown.innerHTML = '';
        currentFocus = -1;
        return;
      }

      const matches = availableJobsList.filter(job => {
        const title = (job.title || '').toLowerCase();
        const company = (job.company || '').toLowerCase();
        const category = (job.category || '').toLowerCase();
        const desc = (job.description || '').toLowerCase();
        const tags = Array.isArray(job.tags) ? job.tags.join(' ').toLowerCase() : '';
        return title.includes(q) || company.includes(q) || category.includes(q) || desc.includes(q) || tags.includes(q);
      }).slice(0, 6);

      if (matches.length === 0) {
        suggestionsDropdown.innerHTML = `
          <div class="suggestion-empty">
            🔍 No se encontraron sugerencias para "<strong>${query}</strong>". <br>
            <span style="font-size: 0.78rem; color: #94a3b8;">Haz clic en la lupa o presiona Enter para buscar en todas las ofertas.</span>
          </div>
        `;
        suggestionsDropdown.style.display = 'block';
        currentFocus = -1;
        return;
      }

      suggestionsDropdown.innerHTML = matches.map((job, idx) => `
        <div class="suggestion-item" data-index="${idx}" data-title="${job.title}">
          <div class="suggestion-icon">${getCategoryIcon(job.category)}</div>
          <div class="suggestion-content">
            <div class="suggestion-title">${highlightMatch(job.title, query)}</div>
            <div class="suggestion-subtitle">
              <span>🏢 ${highlightMatch(job.company, query)}</span>
              <span>•</span>
              <span>📍 ${job.location}</span>
            </div>
          </div>
          <span class="suggestion-badge">${job.badge || 'Sin Experiencia'}</span>
        </div>
      `).join('');

      suggestionsDropdown.style.display = 'block';
      currentFocus = -1;

      suggestionsDropdown.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const title = item.getAttribute('data-title');
          headerSearchJob.value = title;
          suggestionsDropdown.style.display = 'none';
          performHeaderSearch(title);
        });
      });
    };

    headerSearchJob.addEventListener('input', (e) => {
      showSuggestions(e.target.value);
    });

    headerSearchJob.addEventListener('focus', (e) => {
      if (e.target.value.trim().length > 0) {
        showSuggestions(e.target.value);
      }
    });

    headerSearchJob.addEventListener('keydown', (e) => {
      const items = suggestionsDropdown.querySelectorAll('.suggestion-item');
      if (!items || items.length === 0 || suggestionsDropdown.style.display === 'none') {
        if (e.key === 'Enter') {
          e.preventDefault();
          performHeaderSearch();
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        setActiveSuggestion(items, currentFocus);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        setActiveSuggestion(items, currentFocus);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
          items[currentFocus].click();
        } else {
          performHeaderSearch();
        }
      } else if (e.key === 'Escape') {
        suggestionsDropdown.style.display = 'none';
        currentFocus = -1;
      }
    });

    const setActiveSuggestion = (items, index) => {
      items.forEach(i => i.classList.remove('active'));
      if (items[index]) {
        items[index].classList.add('active');
        items[index].scrollIntoView({ block: 'nearest' });
      }
    };

    document.addEventListener('click', (e) => {
      if (headerSearchForm && !headerSearchForm.contains(e.target)) {
        suggestionsDropdown.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // 3.6. FILTRO DE CIUDADES DE ECUADOR (AUTOCOMPLETE Y SELECTOR)
  // ==========================================================================
  const ecuadorCities = [
    { name: "Quito", province: "Pichincha (Capital)", icon: "🏛️", badge: "Capital" },
    { name: "Guayaquil", province: "Guayas", icon: "⚓", badge: "Costa" },
    { name: "Cuenca", province: "Azuay", icon: "🏰", badge: "Sierra" },
    { name: "Santo Domingo", province: "Sto. Domingo de los Tsáchilas", icon: "🌴", badge: "Costa / Sierra" },
    { name: "Ambato", province: "Tungurahua", icon: "🌺", badge: "Sierra" },
    { name: "Manta", province: "Manabí", icon: "⛵", badge: "Costa" },
    { name: "Portoviejo", province: "Manabí", icon: "🌳", badge: "Costa" },
    { name: "Machala", province: "El Oro", icon: "🍌", badge: "Costa" },
    { name: "Loja", province: "Loja", icon: "🎻", badge: "Sur" },
    { name: "Ibarra", province: "Imbabura", icon: "🏔️", badge: "Norte" },
    { name: "Riobamba", province: "Chimborazo", icon: "🌋", badge: "Sierra" },
    { name: "Esmeraldas", province: "Esmeraldas", icon: "🏖️", badge: "Costa" },
    { name: "Quevedo", province: "Los Ríos", icon: "🌾", badge: "Costa" },
    { name: "Remoto (Todo Ecuador)", province: "100% Online / A Distancia", icon: "🌐", badge: "Teletrabajo" }
  ];

  function setupCityAutocomplete(inputElement, dropdownElement, onSelectCallback) {
    if (!inputElement || !dropdownElement) return;

    let currentFocus = -1;

    const renderCityList = (query = '') => {
      const rawQ = query.toLowerCase().trim();
      const q = rawQ.replace(/,\s*ecuador/gi, '').replace(/\(todo ecuador\)/gi, '').trim();

      const filtered = ecuadorCities.filter(c => {
        if (!q) return true;
        return c.name.toLowerCase().includes(q) || c.province.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        dropdownElement.innerHTML = `
          <div class="suggestion-empty">
            📍 No se encontró la ciudad "<strong>${query}</strong>". <br>
            <span style="font-size: 0.78rem; color: #94a3b8;">Puedes escribir el nombre de tu localidad manualmente.</span>
          </div>
        `;
        dropdownElement.style.display = 'block';
        currentFocus = -1;
        return;
      }

      dropdownElement.innerHTML = `
        <div style="padding: 6px 14px; font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9;">
          Ciudades de Ecuador
        </div>
        ${filtered.map((c, idx) => `
          <div class="suggestion-item" data-index="${idx}" data-city="${c.name}">
            <div class="suggestion-icon">${c.icon}</div>
            <div class="suggestion-content">
              <div class="suggestion-title">${highlightMatch(c.name, q)}</div>
              <div class="suggestion-subtitle">
                <span>📍 ${highlightMatch(c.province, q)}</span>
              </div>
            </div>
            <span class="suggestion-badge" style="background: #e0f2fe; color: #0369a1;">${c.badge}</span>
          </div>
        `).join('')}
      `;

      dropdownElement.style.display = 'block';
      currentFocus = -1;

      dropdownElement.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const cityName = item.getAttribute('data-city');
          const valueToSet = cityName.startsWith('Remoto') ? cityName : `${cityName}, Ecuador`;
          inputElement.value = valueToSet;
          dropdownElement.style.display = 'none';
          if (typeof onSelectCallback === 'function') {
            onSelectCallback(valueToSet);
          }
        });
      });
    };

    inputElement.addEventListener('focus', () => {
      renderCityList(inputElement.value);
    });

    inputElement.addEventListener('input', (e) => {
      renderCityList(e.target.value);
    });

    inputElement.addEventListener('keydown', (e) => {
      const items = dropdownElement.querySelectorAll('.suggestion-item');
      if (!items || items.length === 0 || dropdownElement.style.display === 'none') {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        items.forEach(i => i.classList.remove('active'));
        if (items[currentFocus]) {
          items[currentFocus].classList.add('active');
          items[currentFocus].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items.forEach(i => i.classList.remove('active'));
        if (items[currentFocus]) {
          items[currentFocus].classList.add('active');
          items[currentFocus].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        if (currentFocus > -1 && items[currentFocus]) {
          e.preventDefault();
          items[currentFocus].click();
        }
      } else if (e.key === 'Escape') {
        dropdownElement.style.display = 'none';
        currentFocus = -1;
      }
    });

    document.addEventListener('click', (e) => {
      if (!inputElement.contains(e.target) && !dropdownElement.contains(e.target)) {
        dropdownElement.style.display = 'none';
      }
    });
  }

  // Vincular dropdown de ciudad en el header (index.html)
  const headerLocationInput = document.getElementById('search-location');
  const headerLocationDropdown = document.getElementById('location-suggestions-dropdown');
  const btnLocationIcon = document.getElementById('btn-location-icon');

  if (headerLocationInput && headerLocationDropdown) {
    setupCityAutocomplete(headerLocationInput, headerLocationDropdown);

    if (btnLocationIcon) {
      btnLocationIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        headerLocationInput.focus();
      });
    }
  }

  // ==========================================================================
  // 4. LÓGICA DE POSTULACIÓN / FILTROS / MASTER-DETAIL (PÁGINA POSTULACIÓN)
  // ==========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const jobCards = document.querySelectorAll('.search-job-card');
  const searchInput = document.getElementById('job-search-input');
  const locationSearchInput = document.getElementById('location-search-input');
  const btnSearchTrigger = document.getElementById('btn-search-trigger');
  const jobDetailColumn = document.getElementById('job-detail-column');
  const btnBackToList = document.getElementById('btn-back-to-list');
  const jobsCountBadge = document.getElementById('jobs-count-badge');

  // Lectura de parámetros de búsqueda en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('q');
  const locationParam = urlParams.get('location');

  if (queryParam && searchInput) {
    searchInput.value = queryParam;
  }
  if (locationParam && locationSearchInput) {
    locationSearchInput.value = locationParam;
  }

  const updateJobDetailView = (jobId) => {
    const job = availableJobsList.find(j => j.id === jobId) || jobsData.find(j => j.id === jobId);
    if (!job) return;

    currentSelectedJobId = jobId;

    const detailTitle = document.getElementById('detail-title');
    const detailCompany = document.getElementById('detail-company');
    const detailSalary = document.getElementById('detail-salary');
    const detailTags = document.getElementById('detail-tags');
    const detailDesc = document.getElementById('detail-description');
    const detailResp = document.getElementById('detail-responsibilities');
    const detailReq = document.getElementById('detail-requirements');
    const detailBen = document.getElementById('detail-benefits');

    if (detailTitle) detailTitle.textContent = job.title;
    if (detailCompany) detailCompany.textContent = `${job.company} • ${job.location}`;
    if (detailSalary) detailSalary.textContent = job.salary;
    if (detailDesc) detailDesc.textContent = job.description;

    if (detailTags && Array.isArray(job.tags)) {
      detailTags.innerHTML = job.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
    }

    if (detailResp && Array.isArray(job.responsibilities)) {
      detailResp.innerHTML = job.responsibilities.map(r => `
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${r}</span>
        </li>
      `).join('');
    }

    if (detailReq && Array.isArray(job.requirements)) {
      detailReq.innerHTML = job.requirements.map(req => `
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${req}</span>
        </li>
      `).join('');
    }

    if (detailBen && Array.isArray(job.benefits)) {
      detailBen.innerHTML = job.benefits.map(b => `
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>${b}</span>
        </li>
      `).join('');
    }

    jobCards.forEach(card => {
      const cId = parseInt(card.getAttribute('data-job-id'));
      if (cId === jobId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if (window.innerWidth < 1024 && jobDetailColumn) {
      jobDetailColumn.classList.add('mobile-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (jobCards.length > 0) {
    jobCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-card-apply')) {
          return;
        }
        const jobId = parseInt(card.getAttribute('data-job-id'));
        updateJobDetailView(jobId);
      });
    });
  }

  if (btnBackToList && jobDetailColumn) {
    btnBackToList.addEventListener('click', () => {
      jobDetailColumn.classList.remove('mobile-active');
    });
  }

  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');
        let visibleCount = 0;

        jobCards.forEach(card => {
          const category = card.getAttribute('data-category');
          const exp = card.getAttribute('data-experience');
          const mode = card.getAttribute('data-mode');

          let match = false;
          if (filter === 'all') {
            match = true;
          } else if (filter === 'sin-experiencia' && exp === 'sin-experiencia') {
            match = true;
          } else if (filter === 'remoto' && (mode === 'remoto' || mode === 'hibrido')) {
            match = true;
          } else if (filter === category) {
            match = true;
          }

          if (match) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (jobsCountBadge) {
          jobsCountBadge.textContent = `${visibleCount} oferta${visibleCount !== 1 ? 's' : ''}`;
        }
      });
    });
  }

  // Vincular dropdown de ciudad en página de postulación (postulacion.html)
  const postulacionLocationDropdown = document.getElementById('postulacion-location-dropdown');
  if (locationSearchInput && postulacionLocationDropdown) {
    setupCityAutocomplete(locationSearchInput, postulacionLocationDropdown, () => {
      executeSearch();
    });
  }

  const executeSearch = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const rawLoc = locationSearchInput ? locationSearchInput.value.toLowerCase().trim() : '';
    const locQuery = rawLoc.replace(/,\s*ecuador/gi, '').replace(/\(todo ecuador\)/gi, '').trim();

    let visibleCount = 0;
    let firstVisibleJobId = null;

    jobCards.forEach(card => {
      const title = (card.querySelector('.card-job-title')?.textContent || '').toLowerCase();
      const company = (card.querySelector('.card-company-name')?.textContent || '').toLowerCase();
      const snippet = (card.querySelector('.card-snippet')?.textContent || '').toLowerCase();
      const metaTags = Array.from(card.querySelectorAll('.meta-tag')).map(t => t.textContent.toLowerCase()).join(' ');
      const category = (card.getAttribute('data-category') || '').toLowerCase();
      const exp = (card.getAttribute('data-experience') || '').toLowerCase();
      const mode = (card.getAttribute('data-mode') || '').toLowerCase();

      const matchesQuery = !query || title.includes(query) || company.includes(query) || snippet.includes(query) || category.includes(query) || exp.includes(query) || mode.includes(query);

      let matchesLoc = true;
      if (locQuery && locQuery !== 'ecuador' && locQuery !== 'todo ecuador') {
        if (locQuery === 'remoto' || locQuery.startsWith('remoto')) {
          matchesLoc = mode === 'remoto' || mode === 'hibrido' || metaTags.includes('remoto');
        } else {
          // Coincide con la ciudad indicada o la oferta es remota (disponible a nivel nacional)
          matchesLoc = metaTags.includes(locQuery) || mode === 'remoto' || title.includes(locQuery) || snippet.includes(locQuery);
        }
      }

      if (matchesQuery && matchesLoc) {
        card.style.display = 'flex';
        visibleCount++;
        if (!firstVisibleJobId) {
          firstVisibleJobId = parseInt(card.getAttribute('data-job-id'));
        }
      } else {
        card.style.display = 'none';
      }
    });

    if (jobsCountBadge) {
      jobsCountBadge.textContent = `${visibleCount} oferta${visibleCount !== 1 ? 's' : ''}`;
    }

    if (firstVisibleJobId !== null) {
      updateJobDetailView(firstVisibleJobId);
    }
  };

  if (searchInput) searchInput.addEventListener('input', executeSearch);
  if (locationSearchInput) locationSearchInput.addEventListener('input', executeSearch);
  if (btnSearchTrigger) btnSearchTrigger.addEventListener('click', executeSearch);

  // Si se ingresó con parámetros en la URL (?q=... o ?location=...), ejecutar la búsqueda automáticamente
  if (queryParam || locationParam) {
    executeSearch();
  }

  // ==========================================================================
  // 5. SIMULADOR DE "POSTULACIÓN RÁPIDA" (Modal interactivo)
  // ==========================================================================
  const applyModal = document.getElementById('apply-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalConfirmBtn = document.getElementById('btn-modal-confirm');
  const modalJobTitle = document.getElementById('modal-job-title');
  const modalCompanyName = document.getElementById('modal-company-name');

  window.openApplyModal = (id, title, company) => {
    if (applyModal && modalJobTitle && modalCompanyName) {
      modalJobTitle.textContent = title;
      modalCompanyName.textContent = company;
      applyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.handleCardApplyClick = (event, jobId) => {
    event.stopPropagation();
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
      window.openApplyModal(job.id, job.title, job.company);
    }
  };

  window.openApplyModalFromDetail = () => {
    const job = jobsData.find(j => j.id === currentSelectedJobId);
    if (job) {
      window.openApplyModal(job.id, job.title, job.company);
    }
  };

  const closeApplyModal = () => {
    if (applyModal) {
      applyModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeApplyModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeApplyModal);
  if (applyModal) {
    applyModal.addEventListener('click', (e) => {
      if (e.target === applyModal) closeApplyModal();
    });
  }

  // ==========================================================================
  // 6. LÓGICA DE PESTAÑAS & MODALES EN PÁGINA "DESARROLLO PERSONAL"
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.desarrollo-tab-btn');
  const tabContents = document.querySelectorAll('.desarrollo-content-tab');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = document.getElementById(targetTabId);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  }

  // Modal Editor de Plantillas
  const templateModal = document.getElementById('template-modal');
  const modalTemplateClose = document.getElementById('modal-template-close');
  const modalTemplateName = document.getElementById('modal-template-name');
  const modalTemplateImg = document.getElementById('modal-template-preview-img');

  window.openTemplateEditor = (templateName, svgPath) => {
    if (templateModal && modalTemplateName && modalTemplateImg) {
      modalTemplateName.textContent = templateName;
      modalTemplateImg.src = svgPath;
      templateModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeTemplateModal = () => {
    if (templateModal) {
      templateModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalTemplateClose) modalTemplateClose.addEventListener('click', closeTemplateModal);
  if (templateModal) {
    templateModal.addEventListener('click', (e) => {
      if (e.target === templateModal) closeTemplateModal();
    });
  }

  window.saveTemplateAndNotify = () => {
    closeTemplateModal();
    alert('¡Plantilla personalizada con éxito! Tu currículum ha sido generado y descargado en formato PDF optimizado para ATS.');
  };

  // Modal Subida y Escaneo con IA
  const cvUploadModal = document.getElementById('cv-upload-modal');
  const modalCvClose = document.getElementById('modal-cv-close');

  window.openCvUploadModal = () => {
    if (cvUploadModal) {
      cvUploadModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCvUploadModal = () => {
    if (cvUploadModal) {
      cvUploadModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCvClose) modalCvClose.addEventListener('click', closeCvUploadModal);
  if (cvUploadModal) {
    cvUploadModal.addEventListener('click', (e) => {
      if (e.target === cvUploadModal) closeCvUploadModal();
    });
  }

  window.simulateAiScan = () => {
    closeCvUploadModal();
    alert('¡Análisis completado! La IA ha detectado 3 nuevas habilidades en tu CV y actualizado tus sugerencias para ofertas en Quito.');
  };

  // ==========================================================================
  // 7. LÓGICA PORTAL DE RECLUTADORES: LIVE PREVIEW & KANBAN
  // ==========================================================================
  
  // A. Live Preview Binding en Tiempo Real
  const inputTitle = document.getElementById('input-job-title');
  const inputCompany = document.getElementById('input-company-name');
  const selectCompany = document.getElementById('select-company');
  const selectModality = document.getElementById('select-modality');
  const inputLocation = document.getElementById('input-location');
  const inputSalaryMin = document.getElementById('input-salary-min');
  const inputSalaryMax = document.getElementById('input-salary-max');
  const inputDesc = document.getElementById('input-description');

  const previewTitle = document.getElementById('preview-title');
  const previewCompany = document.getElementById('preview-company');
  const previewModality = document.getElementById('preview-modality');
  const previewLocation = document.getElementById('preview-location');
  const previewSalary = document.getElementById('preview-salary');
  const previewSnippet = document.getElementById('preview-snippet');

  const updateLivePreviewCard = () => {
    if (previewTitle && inputTitle) {
      previewTitle.textContent = inputTitle.value.trim() || 'Título de la Posición';
    }
    if (previewCompany) {
      if (selectCompany && selectCompany.options[selectCompany.selectedIndex]) {
        previewCompany.textContent = selectCompany.options[selectCompany.selectedIndex].text;
      } else if (inputCompany) {
        previewCompany.textContent = inputCompany.value.trim() || 'Tu Empresa';
      }
    }
    if (previewModality && selectModality) {
      previewModality.textContent = `💼 ${selectModality.value}`;
    }
    if (previewLocation && inputLocation) {
      previewLocation.textContent = `📍 ${inputLocation.value.trim() || 'Quito'}`;
    }
    if (previewSalary) {
      if (inputSalaryMin && inputSalaryMax) {
        const min = inputSalaryMin.value || '460';
        const max = inputSalaryMax.value || '750';
        previewSalary.textContent = `$${min} - $${max} USD / mes`;
      } else if (inputSalaryMin) {
        previewSalary.textContent = `$${inputSalaryMin.value || '650'} USD / mes`;
      }
    }
    if (previewSnippet && inputDesc) {
      const text = inputDesc.value.trim() || 'Descripción de la vacante...';
      previewSnippet.textContent = text.length > 120 ? text.substring(0, 117) + '...' : text;
    }
  };

  if (inputTitle) inputTitle.addEventListener('input', updateLivePreviewCard);
  if (inputCompany) inputCompany.addEventListener('input', updateLivePreviewCard);
  if (selectCompany) selectCompany.addEventListener('change', updateLivePreviewCard);
  if (selectModality) selectModality.addEventListener('change', updateLivePreviewCard);
  if (inputLocation) inputLocation.addEventListener('input', updateLivePreviewCard);
  if (inputSalaryMin) inputSalaryMin.addEventListener('input', updateLivePreviewCard);
  if (inputSalaryMax) inputSalaryMax.addEventListener('input', updateLivePreviewCard);
  if (inputDesc) inputDesc.addEventListener('input', updateLivePreviewCard);

  // Ejecutar una vez al inicio si estamos en reclutadores.html
  if (previewTitle) updateLivePreviewCard();

  // B. Toggle Chips de Habilidades
  const skillChips = document.querySelectorAll('.skill-toggle-chip');
  skillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // C. Publicación de Vacante
  const publishModal = document.getElementById('publish-success-modal');
  const publishedJobName = document.getElementById('published-job-name');
  const modalPublishClose = document.getElementById('modal-publish-close');

  window.handleJobPublish = () => {
    if (publishModal && publishedJobName && inputTitle) {
      publishedJobName.textContent = inputTitle.value.trim() || 'Oferta de Empleo';
      publishModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closePublishModal = () => {
    if (publishModal) {
      publishModal.classList.remove('active');
      document.body.style.overflow = '';
      const kanbanSec = document.getElementById('kanban-section');
      if (kanbanSec) kanbanSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (modalPublishClose) modalPublishClose.addEventListener('click', window.closePublishModal);

  // D. Visor de CV de Candidato en Kanban
  const candidateModal = document.getElementById('candidate-cv-modal');
  const modalCandidateName = document.getElementById('modal-candidate-name');
  const modalCandidateUni = document.getElementById('modal-candidate-uni');
  const modalCandidateAvatar = document.getElementById('modal-candidate-avatar');
  const modalCandidateClose = document.getElementById('modal-candidate-close');

  window.openCandidateCvModal = (name, uni, skills, avatarUrl) => {
    if (candidateModal && modalCandidateName && modalCandidateUni) {
      modalCandidateName.textContent = name;
      modalCandidateUni.textContent = uni;
      if (modalCandidateAvatar && avatarUrl) {
        modalCandidateAvatar.src = avatarUrl;
      }
      candidateModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCandidateCvModal = () => {
    if (candidateModal) {
      candidateModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCandidateClose) modalCandidateClose.addEventListener('click', window.closeCandidateCvModal);

  // E. Buscador en Tablero Kanban
  window.filterKanbanCandidates = () => {
    const searchVal = document.getElementById('kanban-candidate-search')?.value.toLowerCase().trim() || '';
    const cards = document.querySelectorAll('.kanban-candidate-card');

    cards.forEach(card => {
      const name = card.querySelector('.candidate-name')?.textContent.toLowerCase() || '';
      const uni = card.querySelector('.candidate-uni')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.candidate-skill-tag')?.textContent.toLowerCase() || '';

      if (name.includes(searchVal) || uni.includes(searchVal) || tag.includes(searchVal)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ==========================================================================
  // SISTEMA DE AUTENTICACIÓN (LOGIN, REGISTRO Y GESTIÓN DE SESIÓN)
  // ==========================================================================

  const authModal = document.getElementById('auth-modal');
  const authModalClose = document.getElementById('auth-modal-close');
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabRegisterBtn = document.getElementById('tab-register-btn');
  const formLogin = document.getElementById('auth-form-login');
  const formRegister = document.getElementById('auth-form-register');
  const loginAlert = document.getElementById('login-alert');
  const registerAlert = document.getElementById('register-alert');

  // Abrir Modal de Autenticación
  window.openAuthModal = (tab = 'login') => {
    if (authModal) {
      window.switchAuthTab(tab);
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Limpiar alertas
      if (loginAlert) { loginAlert.className = 'auth-alert'; loginAlert.textContent = ''; }
      if (registerAlert) { registerAlert.className = 'auth-alert'; registerAlert.textContent = ''; }
    }
  };

  // Cerrar Modal
  window.closeAuthModal = () => {
    if (authModal) {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Alternar entre Login y Registro
  window.switchAuthTab = (tab) => {
    if (tab === 'register') {
      tabRegisterBtn?.classList.add('active');
      tabLoginBtn?.classList.remove('active');
      formRegister?.classList.add('active');
      formLogin?.classList.remove('active');
    } else {
      tabLoginBtn?.classList.add('active');
      tabRegisterBtn?.classList.remove('active');
      formLogin?.classList.add('active');
      formRegister?.classList.remove('active');
    }
  };

  if (authModalClose) authModalClose.addEventListener('click', window.closeAuthModal);
  if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => window.switchAuthTab('login'));
  if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => window.switchAuthTab('register'));

  // Cerrar modal al hacer clic en el fondo
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) window.closeAuthModal();
    });
  }

  // Vincular botones de Login y Registro del Navbar
  document.querySelectorAll('.btn-open-login, .btn-primary-nav, .button--orange-outline').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openAuthModal('login');
    });
  });

  document.querySelectorAll('.btn-open-register, .btn-secondary-nav, .button--outline').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openAuthModal('register');
    });
  });

  // Envío Formulario de Login
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const correo = document.getElementById('login-email')?.value.trim();
      const contrasena = document.getElementById('login-password')?.value.trim();
      const submitBtn = formLogin.querySelector('.auth-submit-btn');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Iniciando sesión...';
      }

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo, contrasena })
        });

        const data = await response.json();

        if (response.ok) {
          if (loginAlert) {
            loginAlert.className = 'auth-alert success';
            loginAlert.textContent = data.mensaje || '¡Inicio de sesión exitoso!';
          }
          setTimeout(() => {
            window.closeAuthModal();
            formLogin.reset();
            checkAuthStatus();
          }, 800);
        } else {
          if (loginAlert) {
            loginAlert.className = 'auth-alert error';
            loginAlert.textContent = data.error || 'Credenciales inválidas.';
          }
        }
      } catch (err) {
        if (loginAlert) {
          loginAlert.className = 'auth-alert error';
          loginAlert.textContent = 'Error de conexión con el servidor.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Iniciar Sesión';
        }
      }
    });
  }

  // Envío Formulario de Registro
  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('register-name')?.value.trim();
      const correo = document.getElementById('register-email')?.value.trim();
      const contrasena = document.getElementById('register-password')?.value.trim();
      const edad = document.getElementById('register-age')?.value;
      const salario_pretendido = document.getElementById('register-salary')?.value;
      const submitBtn = formRegister.querySelector('.auth-submit-btn');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creando cuenta...';
      }

      try {
        const response = await fetch('/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, correo, contrasena, edad, salario_pretendido })
        });

        const data = await response.json();

        if (response.ok) {
          if (registerAlert) {
            registerAlert.className = 'auth-alert success';
            registerAlert.textContent = data.mensaje || '¡Cuenta creada con éxito!';
          }
          setTimeout(() => {
            window.closeAuthModal();
            formRegister.reset();
            checkAuthStatus();
          }, 900);
        } else {
          if (registerAlert) {
            registerAlert.className = 'auth-alert error';
            registerAlert.textContent = data.error || 'No se pudo crear la cuenta.';
          }
        }
      } catch (err) {
        if (registerAlert) {
          registerAlert.className = 'auth-alert error';
          registerAlert.textContent = 'Error de conexión con el servidor.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Crear Cuenta Gratuita';
        }
      }
    });
  }

  // Cerrar Sesión
  window.logoutUser = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      checkAuthStatus();
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  // Verificar Estado de Autenticación y actualizar Navbars
  async function checkAuthStatus() {
    try {
      const response = await fetch('/api/usuario-actual');
      const data = await response.json();

      const authContainers = document.querySelectorAll('.site-nav__actions, .nav-auth');

      authContainers.forEach(container => {
        if (data.autenticado && data.usuario) {
          const inicial = data.usuario.nombre ? data.usuario.nombre.charAt(0).toUpperCase() : 'U';
          const primerNombre = data.usuario.nombre ? data.usuario.nombre.split(' ')[0] : 'Usuario';

          container.innerHTML = `
            <div class="nav-user-logged">
              <div class="nav-user-badge">
                <span class="nav-user-avatar">${inicial}</span>
                <span>Hola, ${primerNombre}</span>
              </div>
              <button class="nav-btn-logout" onclick="window.logoutUser()">Cerrar sesión</button>
            </div>
          `;
        } else {
          // Restaurar botones según estilo del contenedor
          if (container.classList.contains('site-nav__actions')) {
            container.innerHTML = `
              <a class="button button--outline btn-open-register" href="#">Crear Cuenta</a>
              <a class="button button--orange-outline btn-open-login" href="#">Iniciar sesión</a>
            `;
          } else {
            container.innerHTML = `
              <a href="#" class="btn-secondary-nav btn-open-register">Crear Cuenta</a>
              <a href="#" class="btn-primary-nav btn-open-login">Iniciar sesión</a>
            `;
          }

          // Re-vincular eventos
          container.querySelector('.btn-open-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.openAuthModal('login');
          });
          container.querySelector('.btn-open-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.openAuthModal('register');
          });
        }
      });
    } catch (err) {
      console.error('Error al verificar sesión:', err);
    }
  }

  // Ejecutar verificación de sesión al cargar
  checkAuthStatus();

});

