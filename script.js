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
  // 4. LÓGICA DE POSTULACIÓN / FILTROS / MASTER-DETAIL (PÁGINA POSTULACIÓN)
  // ==========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const jobCards = document.querySelectorAll('.search-job-card');
  const searchInput = document.getElementById('job-search-input');
  const btnSearchTrigger = document.getElementById('btn-search-trigger');
  const jobDetailColumn = document.getElementById('job-detail-column');
  const btnBackToList = document.getElementById('btn-back-to-list');
  const jobsCountBadge = document.getElementById('jobs-count-badge');

  const updateJobDetailView = async (jobId) => {
    currentSelectedJobId = jobId;

    try {
      const res = await fetch(`/api/ofertas/${jobId}`);
      if (res.ok) {
        const data = await res.json();
        const detailTitle = document.getElementById('detail-title');
        const detailCompany = document.getElementById('detail-company');
        const detailSalary = document.getElementById('detail-salary');
        const detailDesc = document.getElementById('detail-description');
        const detailResp = document.getElementById('detail-responsibilities');
        const detailReq = document.getElementById('detail-requirements');
        const detailBadge = document.getElementById('detail-badge');

        if (detailTitle) detailTitle.textContent = data.titulo;
        if (detailCompany) detailCompany.textContent = `${data.empresa ? data.empresa.nombre_empresa : 'Empresa'} • ${data.ubicacion_exacta}`;
        if (detailSalary) detailSalary.textContent = `$${parseFloat(data.salario).toFixed(2)} USD / mes`;
        if (detailDesc) detailDesc.textContent = data.funciones || 'Oportunidad formativa para jóvenes en Quito.';
        if (detailBadge) detailBadge.textContent = data.anos_experiencia === 0 ? 'Sin Experiencia' : `${data.anos_experiencia} año(s) exp`;

        if (detailResp && data.funciones) {
          detailResp.innerHTML = `
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${data.funciones}</span>
            </li>
          `;
        }
        if (detailReq && data.requisitos_tecnicos) {
          detailReq.innerHTML = `
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${data.requisitos_tecnicos}</span>
            </li>
          `;
        }
      }
    } catch (e) {
      console.error('Error cargando detalle de oferta:', e);
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
        if (e.target.classList.contains('btn-card-apply') || e.target.closest('form')) {
          return;
        }
        const jobId = parseInt(card.getAttribute('data-job-id'));
        if (jobId) updateJobDetailView(jobId);
      });
    });

    // Cargar detalle de la primera vacante automáticamente
    const firstCard = jobCards[0];
    const firstId = parseInt(firstCard.getAttribute('data-job-id'));
    if (firstId) updateJobDetailView(firstId);
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

  const executeSearch = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    jobCards.forEach(card => {
      const title = card.querySelector('.card-job-title')?.textContent.toLowerCase() || '';
      const company = card.querySelector('.card-company-name')?.textContent.toLowerCase() || '';
      const snippet = card.querySelector('.card-snippet')?.textContent.toLowerCase() || '';

      if (title.includes(query) || company.includes(query) || snippet.includes(query)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (jobsCountBadge) {
      jobsCountBadge.textContent = `${visibleCount} oferta${visibleCount !== 1 ? 's' : ''}`;
    }
  };

  if (searchInput) searchInput.addEventListener('input', executeSearch);
  if (btnSearchTrigger) btnSearchTrigger.addEventListener('click', executeSearch);

  // Leer parámetro 'q' de la URL proveniente del Hero de inicio
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  if (qParam && searchInput) {
    searchInput.value = qParam;
    executeSearch();
  }

  // ==========================================================================
  // 5. POSTULACIÓN RÁPIDA REAL (CONEXIÓN API /api/postular)
  // ==========================================================================
  const applyModal = document.getElementById('apply-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalConfirmBtn = document.getElementById('btn-modal-confirm');
  const modalJobTitle = document.getElementById('modal-job-title');
  const modalCompanyName = document.getElementById('modal-company-name');
  const modalApplyMessage = document.getElementById('modal-apply-message');
  const modalApplyStatusTitle = document.getElementById('modal-apply-status-title');

  window.openApplyModal = (id, title, company, customMessage = '') => {
    if (applyModal && modalJobTitle && modalCompanyName) {
      modalJobTitle.textContent = title;
      modalCompanyName.textContent = company;
      if (modalApplyMessage && customMessage) {
        modalApplyMessage.textContent = customMessage;
      }
      applyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.handleCardApplyClick = async (event, jobId, jobTitle = '', jobCompany = '') => {
    if (event) event.stopPropagation();
    currentSelectedJobId = jobId;

    try {
      const response = await fetch('/api/postular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_oferta: jobId })
      });

      const data = await response.json();

      if (response.status === 401) {
        // Redirigir a login modal
        window.openAuthModal('login');
        const lAlert = document.getElementById('login-alert');
        if (lAlert) {
          lAlert.className = 'auth-alert error';
          lAlert.textContent = 'Debes iniciar sesión con tu cuenta de candidato para postularte.';
        }
        return;
      }

      if (response.ok) {
        window.openApplyModal(jobId, jobTitle || 'Oferta de Empleo', jobCompany || 'Empresa', data.mensaje);
      } else {
        alert(data.error || 'No se pudo completar la postulación.');
      }
    } catch (err) {
      console.error('Error al postular:', err);
      alert('Error de conexión al enviar la postulación.');
    }
  };

  window.openApplyModalFromDetail = () => {
    const activeCard = document.querySelector('.search-job-card.active') || document.querySelector('.search-job-card');
    if (activeCard) {
      const jobId = parseInt(activeCard.getAttribute('data-job-id'));
      const title = activeCard.querySelector('.card-job-title')?.textContent || 'Vacante';
      const company = activeCard.querySelector('.card-company-name')?.textContent || 'Empresa';
      window.handleCardApplyClick(null, jobId, title, company);
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

  // Función para mover candidatos de fase en el Kanban de Reclutadores
  window.changeCandidatePhase = async (postulacionId, nuevoEstado) => {
    try {
      const response = await fetch(`/api/postulacion/${postulacionId}/estado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        alert(data.error || 'Error al cambiar de fase.');
      }
    } catch (e) {
      console.error('Error al actualizar fase en Kanban:', e);
    }
  };

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

  // Selector de roles dentro del formulario de registro
  const roleBtnCandidato = document.getElementById('role-btn-candidato');
  const roleBtnReclutador = document.getElementById('role-btn-reclutador');
  const registerRoleInput = document.getElementById('register-role');
  const groupCompanyName = document.getElementById('group-company-name');
  const groupCandidateFields = document.getElementById('group-candidate-fields');
  const labelRegisterName = document.getElementById('label-register-name');

  if (roleBtnCandidato && roleBtnReclutador) {
    roleBtnCandidato.addEventListener('click', () => {
      roleBtnCandidato.classList.add('active');
      roleBtnReclutador.classList.remove('active');
      if (registerRoleInput) registerRoleInput.value = 'candidato';
      if (groupCompanyName) groupCompanyName.style.display = 'none';
      if (groupCandidateFields) groupCandidateFields.style.display = 'flex';
      if (labelRegisterName) labelRegisterName.textContent = 'Nombre Completo *';
    });

    roleBtnReclutador.addEventListener('click', () => {
      roleBtnReclutador.classList.add('active');
      roleBtnCandidato.classList.remove('active');
      if (registerRoleInput) registerRoleInput.value = 'reclutador';
      if (groupCompanyName) groupCompanyName.style.display = 'flex';
      if (groupCandidateFields) groupCandidateFields.style.display = 'none';
      if (labelRegisterName) labelRegisterName.textContent = 'Nombre del Reclutador *';
    });
  }

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
            window.location.reload();
          }, 600);
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

  // Envío Formulario de Registro con Roles
  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('register-name')?.value.trim();
      const correo = document.getElementById('register-email')?.value.trim();
      const contrasena = document.getElementById('register-password')?.value.trim();
      const rol = document.getElementById('register-role')?.value || 'candidato';
      const nombre_empresa = document.getElementById('register-company')?.value.trim();
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
          body: JSON.stringify({ nombre, correo, contrasena, rol, nombre_empresa, edad, salario_pretendido })
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
            if (rol === 'reclutador') {
              window.location.href = '/reclutadores';
            } else {
              window.location.reload();
            }
          }, 700);
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
      window.location.href = '/';
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  // Alias globales de compatibilidad para apertura de modales
  window.openLoginModal = () => window.openAuthModal('login');
  window.openRegisterModal = () => window.openAuthModal('register');

});


