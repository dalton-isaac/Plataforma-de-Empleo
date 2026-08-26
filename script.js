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

  const updateJobDetailView = (jobId) => {
    const job = jobsData.find(j => j.id === jobId);
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

    if (detailTags) {
      detailTags.innerHTML = job.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
    }

    if (detailResp) {
      detailResp.innerHTML = job.responsibilities.map(r => `
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${r}</span>
        </li>
      `).join('');
    }

    if (detailReq) {
      detailReq.innerHTML = job.requirements.map(req => `
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${req}</span>
        </li>
      `).join('');
    }

    if (detailBen) {
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

  const executeSearch = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    jobCards.forEach(card => {
      const title = card.querySelector('.card-job-title').textContent.toLowerCase();
      const company = card.querySelector('.card-company-name').textContent.toLowerCase();
      const snippet = card.querySelector('.card-snippet').textContent.toLowerCase();

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
    if (previewCompany && inputCompany) {
      previewCompany.textContent = inputCompany.value.trim() || 'Tu Empresa';
    }
    if (previewModality && selectModality) {
      previewModality.textContent = `💼 ${selectModality.value}`;
    }
    if (previewLocation && inputLocation) {
      previewLocation.textContent = `📍 ${inputLocation.value.trim() || 'Quito'}`;
    }
    if (previewSalary && inputSalaryMin && inputSalaryMax) {
      const min = inputSalaryMin.value || '460';
      const max = inputSalaryMax.value || '750';
      previewSalary.textContent = `$${min} - $${max} USD / mes`;
    }
    if (previewSnippet && inputDesc) {
      const text = inputDesc.value.trim() || 'Descripción de la vacante...';
      previewSnippet.textContent = text.length > 120 ? text.substring(0, 117) + '...' : text;
    }
  };

  if (inputTitle) inputTitle.addEventListener('input', updateLivePreviewCard);
  if (inputCompany) inputCompany.addEventListener('input', updateLivePreviewCard);
  if (selectModality) selectModality.addEventListener('change', updateLivePreviewCard);
  if (inputLocation) inputLocation.addEventListener('input', updateLivePreviewCard);
  if (inputSalaryMin) inputSalaryMin.addEventListener('input', updateLivePreviewCard);
  if (inputSalaryMax) inputSalaryMax.addEventListener('input', updateLivePreviewCard);
  if (inputDesc) inputDesc.addEventListener('input', updateLivePreviewCard);

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

});
