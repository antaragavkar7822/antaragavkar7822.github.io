(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const projectData = [
    {
      id: 'store-management', number: '01', title: 'Store Management System', short: 'A structured system for products, inventory and searchable data.',
      description: 'A practical store management application focused on product management, inventory management and organized data handling.',
      tech: ['Java', 'Python', 'DBMS'], filters: ['java', 'python', 'database'],
      features: ['Product management', 'Inventory management', 'Data management', 'Search / filter', 'Database integration'],
      galleryCount: 4, accent: 'lavender'
    },
    {
      id: 'memory-game', number: '02', title: 'Memory Game', short: 'A responsive card-matching game with score and timer feedback.',
      description: 'A browser-based memory game that brings card matching, score, timer and restart interactions together in a responsive interface.',
      tech: ['HTML', 'CSS', 'JavaScript'], filters: ['web'],
      features: ['Card matching', 'Score', 'Timer', 'Restart', 'Responsive UI', 'Animations'],
      galleryCount: 1, accent: 'sage'
    },
    {
      id: 'study-planner', number: '03', title: 'Study Planner', short: 'A focused task and schedule companion for study sessions.',
      description: 'A study planning interface for adding and completing tasks, shaping a schedule and tracking progress with local data handling.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Python'], filters: ['web', 'python'],
      features: ['Add / delete tasks', 'Complete tasks', 'Study schedule', 'Progress tracking', 'Local data handling'],
      galleryCount: 1, accent: 'periwinkle'
    },
    {
      id: 'student-result', number: '04', title: 'Student Result Management System', short: 'A records-focused system for marks and result calculation.',
      description: 'A database-oriented application for organizing student records, managing marks, calculating results and searching information.',
      tech: ['Python', 'DBMS'], filters: ['python', 'database'],
      features: ['Student records', 'Marks management', 'Result calculation', 'Search'],
      galleryCount: 1, accent: 'rose'
    },
    {
      id: 'expense-tracker', number: '05', title: 'Expense Tracker', short: 'A simple visual summary of spending, categories and totals.',
      description: 'A lightweight expense tracking interface for adding and deleting expenses, organizing categories and viewing total spending.',
      tech: ['HTML', 'CSS', 'JavaScript'], filters: ['web'],
      features: ['Add / delete expenses', 'Categories', 'Total spending', 'Visual summary'],
      galleryCount: 1, accent: 'sand'
    }
  ];

  const certificateData = [
    { id: 'nptel', provider: 'NPTEL', title: '[NPTEL COURSE NAME]', kind: 'Certification', note: 'Course name and certificate details to be added once verified.', tone: 'lavender' },
    { id: 'newton-school', provider: 'Newton School', title: '[NEWTON SCHOOL COURSE NAME]', kind: 'Certification', note: 'Course name and certificate details to be added once verified.', tone: 'sage' },
    { id: 'scaler', provider: 'Scaler', title: '[SCALER COURSE NAME]', kind: 'Certification', note: 'Course name and certificate details to be added once verified.', tone: 'blue' },
    { id: 'infosys', provider: 'Infosys Springboard', title: '[INFOSYS SPRINGBOARD COURSE NAME]', kind: 'Certification', note: 'Course name and certificate details to be added once verified.', tone: 'rose' },
    { id: 'matlab', provider: 'MATLAB', title: '[MATLAB COURSE/CERTIFICATION NAME]', kind: 'Certification', note: 'Course name and certificate details to be added once verified.', tone: 'sand' },
    { id: 'cdac', provider: 'CDAC', title: '10-Day Python & Web Development Training', kind: 'Training / Course', note: 'Topics may include Python, Web Development, HTML, CSS, JavaScript and other verified topics.', tone: 'lavender' }
  ];

  const projectModal = $('#project-modal');
  const certificateModal = $('#certificate-modal');
  const projectModalContent = $('#project-modal-content');
  const certificateModalContent = $('#certificate-modal-content');
  let lastFocused = null;
  let currentProject = null;
  let currentGalleryIndex = 0;
  let currentCertificateIndex = 0;

  function showToast(message) {
    const region = $('.toast-region');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(() => {
      toast.classList.add('is-leaving');
      window.setTimeout(() => toast.remove(), 380);
    }, 3600);
  }

  function projectArt(id, variant = 0, large = false) {
    const prefix = `${id}-${variant}-${large ? 'large' : 'small'}`;
    const common = `aria-hidden="true" focusable="false" viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg"`;
    const stroke = 'rgba(41,40,37,.65)';
    if (id === 'store-management') {
      return `<svg ${common} data-art="${prefix}"><rect width="600" height="360" fill="#c3bfd4"/><circle cx="486" cy="38" r="92" fill="#d8d4e1" opacity=".7"/><path d="M58 56h196M58 71h117" stroke="${stroke}" stroke-width="2"/><rect x="58" y="113" width="484" height="188" fill="#f8f5f0" opacity=".78"/><path d="M82 143h120M82 159h74M82 196h430M82 218h430M82 240h430M82 262h317" stroke="${stroke}" stroke-width="2" opacity=".55"/><circle cx="507" cy="143" r="17" fill="#b8c5b2"/><path d="M502 143l4 4 9-10" stroke="${stroke}" stroke-width="2" fill="none"/><rect x="352" y="134" width="105" height="38" fill="#aebbd5"/><path d="M366 153h77" stroke="${stroke}" stroke-width="2"/><text x="58" y="333" fill="${stroke}" font-family="monospace" font-size="11" letter-spacing="2">STORE / INVENTORY / DATA</text></svg>`;
    }
    if (id === 'memory-game') {
      const cards = [[186, 112], [248, 112], [310, 112], [372, 112], [186, 174], [248, 174], [310, 174], [372, 174]];
      const symbols = ['◌', '✳', '◒', '+', '◌', '✳', '◒', '+'];
      const cardMarkup = cards.map(([x, y], i) => `<rect x="${x}" y="${y}" width="48" height="48" rx="3" fill="${i === (variant % 8) ? '#f5f0e9' : '#b8c5b2'}"/><text x="${x + 24}" y="${y + 31}" text-anchor="middle" fill="${stroke}" font-family="Georgia" font-size="20">${symbols[i]}</text>`).join('');
      return `<svg ${common} data-art="${prefix}"><rect width="600" height="360" fill="#b8c5b2"/><path d="M55 60h110M435 60h110" stroke="${stroke}"/><text x="58" y="95" fill="${stroke}" font-family="Georgia" font-size="29">memory /</text><text x="542" y="95" text-anchor="end" fill="${stroke}" font-family="monospace" font-size="11">SCORE 08</text><rect x="168" y="98" width="264" height="158" fill="#cbd5c6" opacity=".7"/>${cardMarkup}<path d="M55 302h490" stroke="${stroke}" opacity=".45"/><text x="58" y="326" fill="${stroke}" font-family="monospace" font-size="11" letter-spacing="2">MATCH / FOCUS / PLAY</text></svg>`;
    }
    if (id === 'study-planner') {
      const y = [124, 163, 202, 241];
      const rows = y.map((row, i) => `<circle cx="102" cy="${row}" r="7" fill="${i < 2 ? '#697b67' : 'none'}" stroke="${stroke}" stroke-width="2"/><path d="M124 ${row}h${i === 1 ? 216 : 273}" stroke="${stroke}" stroke-width="2" opacity=".7"/><path d="M124 ${row + 10}h${i === 1 ? 160 : 206}" stroke="${stroke}" opacity=".3"/>`).join('');
      return `<svg ${common} data-art="${prefix}"><rect width="600" height="360" fill="#aebbd5"/><rect x="58" y="55" width="484" height="252" fill="#dbe1e9" opacity=".7"/><path d="M58 104h484" stroke="${stroke}" opacity=".45"/><text x="82" y="87" fill="${stroke}" font-family="Georgia" font-size="25">today's study</text><text x="513" y="86" text-anchor="end" fill="${stroke}" font-family="monospace" font-size="10">03 / 06</text>${rows}<rect x="414" y="115" width="92" height="31" fill="#d8c2c4"/><text x="460" y="135" text-anchor="middle" fill="${stroke}" font-family="monospace" font-size="9">+ ADD TASK</text></svg>`;
    }
    if (id === 'student-result') {
      return `<svg ${common} data-art="${prefix}"><rect width="600" height="360" fill="#d8c2c4"/><circle cx="500" cy="-18" r="142" fill="#eadadd" opacity=".7"/><text x="58" y="83" fill="${stroke}" font-family="Georgia" font-size="29">results</text><text x="542" y="83" text-anchor="end" fill="${stroke}" font-family="monospace" font-size="10">STUDENT / 04</text><rect x="58" y="112" width="484" height="155" fill="#f8f5f0" opacity=".74"/><path d="M78 146h440M78 180h440M78 214h440M204 125v126M373 125v126" stroke="${stroke}" opacity=".44"/><text x="88" y="137" fill="${stroke}" font-family="monospace" font-size="9">NAME</text><text x="228" y="137" fill="${stroke}" font-family="monospace" font-size="9">MARKS</text><text x="395" y="137" fill="${stroke}" font-family="monospace" font-size="9">RESULT</text><text x="88" y="169" fill="${stroke}" font-family="monospace" font-size="11">RECORD 01</text><text x="228" y="169" fill="${stroke}" font-family="monospace" font-size="11">— — —</text><text x="395" y="169" fill="#697b67" font-family="monospace" font-size="11">CALCULATE</text><text x="58" y="319" fill="${stroke}" font-family="monospace" font-size="11" letter-spacing="2">RECORDS / MARKS / SEARCH</text></svg>`;
    }
    return `<svg ${common} data-art="${prefix}"><rect width="600" height="360" fill="#d2cdbd"/><path d="M60 61h170M60 78h95" stroke="${stroke}" stroke-width="2"/><text x="60" y="115" fill="${stroke}" font-family="Georgia" font-size="29">spend /</text><text x="540" y="114" text-anchor="end" fill="${stroke}" font-family="monospace" font-size="10">THIS MONTH</text><circle cx="187" cy="214" r="75" fill="none" stroke="#f5f0e9" stroke-width="27"/><path d="M187 139a75 75 0 0 1 68 104" fill="none" stroke="#aebbd5" stroke-width="27"/><path d="M187 139v-0" stroke="#d8c2c4" stroke-width="27"/><text x="187" y="220" text-anchor="middle" fill="${stroke}" font-family="Georgia" font-size="22">₹ —</text><path d="M340 170h152M340 195h102M340 220h129M340 245h73" stroke="${stroke}" stroke-width="9" opacity=".5"/><text x="60" y="328" fill="${stroke}" font-family="monospace" font-size="11" letter-spacing="2">TRACK / SORT / SEE</text></svg>`;
  }

  function initLoader() {
    const loader = $('.page-loader');
    window.addEventListener('load', () => window.setTimeout(() => loader.classList.add('is-loaded'), prefersReducedMotion ? 50 : 800));
    window.setTimeout(() => loader.classList.add('is-loaded'), 2200);
  }

  function initTheme() {
    const toggle = $('.theme-toggle');
    let saved = null;
    try { saved = localStorage.getItem('antara-theme'); } catch (_) { /* storage can be unavailable in a preview */ }
    if (saved === 'dark') document.documentElement.dataset.theme = 'dark';
    const update = () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#252421' : '#f5f0e9');
    };
    toggle.addEventListener('click', () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      document.documentElement.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('antara-theme', dark ? 'light' : 'dark'); } catch (_) { }
      update();
    });
    update();
  }

  function initMobileNav() {
    const toggle = $('.mobile-nav-toggle');
    const menu = $('.nav-menu');
    const close = () => { toggle.classList.remove('is-open'); menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); };
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    $$('.nav-menu a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    document.addEventListener('mousemove', event => {
      mouseX = event.clientX; mouseY = event.clientY;
      dot.style.left = `${mouseX}px`; dot.style.top = `${mouseY}px`;
      document.body.classList.add('has-pointer');
    });
    const follow = () => { ringX += (mouseX - ringX) * .18; ringY += (mouseY - ringY) * .18; ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`; requestAnimationFrame(follow); };
    follow();
    $$('a, button, input, textarea, .project-card, .certificate-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion) return;
    $$('.magnetic').forEach(button => {
      button.addEventListener('mousemove', event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .12;
        const y = (event.clientY - rect.top - rect.height / 2) * .12;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener('mouseleave', () => { button.style.transform = ''; });
    });
  }

  function initTyping() {
    const target = $('.typed-role');
    const roles = ['Computer Engineering Student', 'Software Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast', 'Logical Thinker','Curious Mind','Innovative Thinker'];
    let roleIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const role = roles[roleIndex];
      target.textContent = role.slice(0, charIndex);
      if (!deleting && charIndex < role.length) { charIndex++; window.setTimeout(tick, 75); return; }
      if (!deleting && charIndex === role.length) { deleting = true; window.setTimeout(tick, 1500); return; }
      if (deleting && charIndex > 0) { charIndex--; window.setTimeout(tick, 35); return; }
      deleting = false; roleIndex = (roleIndex + 1) % roles.length; window.setTimeout(tick, 350);
    };
    tick();
  }

  function initReveals() {
    const items = $$('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) { items.forEach(item => item.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -35px' });
    items.forEach(item => observer.observe(item));
  }

  function initScrollUI() {
    const progress = $('.scroll-progress span');
    const sections = $$('main section[id]');
    const navLinks = $$('.nav-menu > a');
    const setProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    };
    window.addEventListener('scroll', setProgress, { passive: true }); setProgress();
    if (navLinks[0]) navLinks[0].classList.add('is-active');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      }), { threshold: .05, rootMargin: '-30% 0px -55% 0px' });
      sections.forEach(section => observer.observe(section));
    }
  }

  function initCounters() {
    const counters = $$('.counter');
    const animate = counter => {
      const end = Number(counter.dataset.value); const decimals = Number(counter.dataset.decimals || 0); const duration = prefersReducedMotion ? 0 : 1000; const startTime = performance.now();
      const draw = now => {
        const progress = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = (end * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(draw);
      };
      requestAnimationFrame(draw);
    };
    if (!('IntersectionObserver' in window)) { counters.forEach(animate); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); } }), { threshold: .6 });
    counters.forEach(counter => observer.observe(counter));
  }

  function initTimeline() {
    $$('.timeline-card').forEach(card => card.addEventListener('click', () => {
      const item = card.closest('.timeline-item');
      const willOpen = !item.classList.contains('is-open');
      $$('.timeline-item').forEach(other => { other.classList.remove('is-open'); const otherCard = $('.timeline-card', other); otherCard.setAttribute('aria-expanded', 'false'); $('.timeline-toggle', otherCard).textContent = '+'; });
      if (willOpen) { item.classList.add('is-open'); card.setAttribute('aria-expanded', 'true'); $('.timeline-toggle', card).textContent = '−'; }
      const openIndex = $$('.timeline-item').findIndex(item => item.classList.contains('is-open'));
      const line = $('.timeline-line span');
      if (line) line.style.height = `${Math.max(8, (openIndex + 1) / 4 * 100)}%`;
    }));
  }

  function renderProjects(filter = 'all') {
    const grid = $('#project-grid');
    const visible = projectData.filter(project => filter === 'all' || project.filters.includes(filter));
    $('#project-count').textContent = String(visible.length).padStart(2, '0');
    grid.innerHTML = projectData.map(project => {
      const hidden = filter !== 'all' && !project.filters.includes(filter) ? ' is-hidden' : '';
      return `<article class="project-card reveal${hidden}" data-project-id="${project.id}">
        <div class="project-visual" role="img" aria-label="Stylized visual for ${project.title}">${projectArt(project.id)}</div>
        <div class="project-card-header"><span class="project-number">${project.number} / 05</span><span class="project-tech">${project.tech.join(' · ')}</span></div>
        <h3>${project.title}</h3>
        <div class="project-card-footer"><p>${project.short}</p><button class="view-details" type="button" data-project-open="${project.id}">View details <span>↗</span></button></div>
      </article>`;
    }).join('');
    $$('.project-card.reveal', grid).forEach(card => { if (!card.classList.contains('is-hidden')) window.setTimeout(() => card.classList.add('is-visible'), 50); });
    $$('[data-project-open]', grid).forEach(button => button.addEventListener('click', () => openProject(button.dataset.projectOpen)));
  }

  function renderProjectModal(project, galleryIndex = 0) {
    const gallery = Array.from({ length: project.galleryCount }, (_, index) => index);
    projectModalContent.innerHTML = `<div class="modal-project-grid">
      <div class="modal-project-visual" role="img" aria-label="Large stylized visual for ${project.title}">${projectArt(project.id, galleryIndex, true)}</div>
      <div class="modal-project-info">
        <p class="modal-eyebrow">${project.number} / Selected project</p>
        <h2 class="modal-title" id="modal-title">${project.title}</h2>
        <p class="modal-description">${project.description}</p>
        <div class="modal-data"><div class="modal-data-block"><span>Technologies</span><p>${project.tech.join(' · ')}</p></div><div class="modal-data-block"><span>Features</span><div class="modal-features">${project.features.map(feature => `<span>${feature}</span>`).join('')}</div></div></div>
        <div class="modal-learning"><span>What I learned</span><p>Project-specific learning notes will be added here when verified.</p></div>
        <div class="modal-actions"><button class="modal-button" type="button" data-placeholder="GitHub">GitHub placeholder <span>↗</span></button><button class="modal-button" type="button" data-placeholder="Live demo">Live demo placeholder <span>↗</span></button></div>
      </div>
      <div class="modal-gallery"><div class="gallery-heading"><span>Gallery / ${String(galleryIndex + 1).padStart(2, '0')} of ${String(project.galleryCount).padStart(2, '0')}</span><div class="gallery-controls"><button type="button" data-gallery-prev aria-label="Previous gallery image">←</button><button type="button" data-gallery-next aria-label="Next gallery image">→</button></div></div><div class="gallery-main">${projectArt(project.id, galleryIndex, true)}</div><div class="gallery-thumbs">${gallery.map(index => `<button type="button" class="gallery-thumb${index === galleryIndex ? ' is-active' : ''}" data-gallery-index="${index}" aria-label="Open image ${index + 1}">${projectArt(project.id, index)}</button>`).join('')}</div></div>
    </div>`;
    $$('[data-placeholder]', projectModalContent).forEach(button => button.addEventListener('click', () => showToast(`${button.dataset.placeholder} link is a placeholder — add the verified URL in project data.`)));
    $('[data-gallery-prev]', projectModalContent).addEventListener('click', () => updateProjectGallery((galleryIndex - 1 + project.galleryCount) % project.galleryCount));
    $('[data-gallery-next]', projectModalContent).addEventListener('click', () => updateProjectGallery((galleryIndex + 1) % project.galleryCount));
    $$('[data-gallery-index]', projectModalContent).forEach(button => button.addEventListener('click', () => updateProjectGallery(Number(button.dataset.galleryIndex))));
  }

  function updateProjectGallery(index) { currentGalleryIndex = index; renderProjectModal(currentProject, currentGalleryIndex); }

  function openProject(id) {
    currentProject = projectData.find(project => project.id === id); currentGalleryIndex = 0; lastFocused = document.activeElement; renderProjectModal(currentProject); openModal(projectModal);
  }

  function renderCertificates(filter = 'all') {
    const grid = $('#certificate-grid');
    const visible = certificateData.filter(cert => filter === 'all' || cert.provider === filter);
    $('#certificate-count').textContent = String(visible.length).padStart(2, '0');
    grid.innerHTML = certificateData.map((cert, index) => { const hidden = filter !== 'all' && cert.provider !== filter ? ' is-hidden' : ''; return `<article class="certificate-card reveal${hidden}" data-certificate-index="${index}" tabindex="0" role="button" aria-label="Preview ${cert.provider} entry"><div class="certificate-paper"><span class="certificate-stamp">${cert.kind === 'Training / Course' ? 'TRAINING' : 'CERTIFICATE'}</span><span class="certificate-paper-title">${cert.title}</span><div class="art-bottomline"><span>${cert.provider}</span><span>AG / ${String(index + 1).padStart(2, '0')}</span></div></div><div class="certificate-meta"><span class="certificate-name">${cert.provider}</span><span class="certificate-view">Preview ↗</span></div></article>`; }).join('');
    $$('.certificate-card.reveal', grid).forEach(card => { if (!card.classList.contains('is-hidden')) window.setTimeout(() => card.classList.add('is-visible'), 50); card.addEventListener('click', () => openCertificate(Number(card.dataset.certificateIndex))); card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCertificate(Number(card.dataset.certificateIndex)); } }); });
  }

  function certificateTone(tone) { return { lavender: '#c3bfd4', sage: '#b8c5b2', blue: '#aebbd5', rose: '#d8c2c4', sand: '#d2cdbd' }[tone] || '#c3bfd4'; }

  function renderCertificateModal(index) {
    const cert = certificateData[index];
    certificateModalContent.innerHTML = `<div class="certificate-modal-content"><div class="certificate-large-paper" style="background:${certificateTone(cert.tone)}"><div class="certificate-large-mark"><span>${cert.provider.toUpperCase()}</span><span>AG / ${String(index + 1).padStart(2, '0')}</span></div><h3>${cert.title}</h3><div class="certificate-large-mark"><span>${cert.kind.toUpperCase()}</span><span>DETAILS PENDING</span></div></div><div class="certificate-modal-copy"><p class="modal-eyebrow">${cert.provider} / Learning archive</p><h2 id="certificate-modal-title">${cert.kind}</h2><p>${cert.note}</p><p class="verification-note">This entry intentionally keeps missing course and certificate details as placeholders. Replace them with verified information when available.</p><div class="certificate-modal-nav"><button type="button" data-certificate-prev aria-label="Previous certificate">←</button><button type="button" data-certificate-next aria-label="Next certificate">→</button></div></div></div>`;
    $('[data-certificate-prev]', certificateModalContent).addEventListener('click', () => updateCertificate((index - 1 + certificateData.length) % certificateData.length));
    $('[data-certificate-next]', certificateModalContent).addEventListener('click', () => updateCertificate((index + 1) % certificateData.length));
  }

  function updateCertificate(index) { currentCertificateIndex = index; renderCertificateModal(index); }
  function openCertificate(index) { currentCertificateIndex = index; lastFocused = document.activeElement; renderCertificateModal(index); openModal(certificateModal); }

  function openModal(backdrop) { backdrop.classList.add('is-open'); backdrop.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); const modal = $('.modal', backdrop); window.setTimeout(() => modal.focus(), 20); }
  function closeModal(backdrop) { backdrop.classList.remove('is-open'); backdrop.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus(); }

  function initModals() {
    $$('[data-close-modal]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal-backdrop'))));
    [projectModal, certificateModal].forEach(backdrop => backdrop.addEventListener('mousedown', event => { if (event.target === backdrop) closeModal(backdrop); }));
    document.addEventListener('keydown', event => {
      const active = $('.modal-backdrop.is-open'); if (!active) return;
      if (event.key === 'Escape') { closeModal(active); return; }
      if (active === projectModal && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) { const delta = event.key === 'ArrowLeft' ? -1 : 1; updateProjectGallery((currentGalleryIndex + delta + currentProject.galleryCount) % currentProject.galleryCount); }
      if (active === certificateModal && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) { const delta = event.key === 'ArrowLeft' ? -1 : 1; updateCertificate((currentCertificateIndex + delta + certificateData.length) % certificateData.length); }
      if (event.key === 'Tab') {
        const focusable = $$('button, a, input, textarea, [tabindex]:not([tabindex="-1"])', active).filter(el => !el.disabled);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  function initFilters() {
    $$('.filter-button').forEach(button => button.addEventListener('click', () => { $$('.filter-button').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); renderProjects(button.dataset.filter); }));
    $$('.certificate-filter').forEach(button => button.addEventListener('click', () => { $$('.certificate-filter').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); renderCertificates(button.dataset.certificateFilter); }));
  }

  function initContactForm() {
    const form = $('#contact-form');
    const fields = { name: $('#contact-name'), email: $('#contact-email'), message: $('#contact-message') };
    const clearError = field => { const row = field.closest('.form-row'); row.classList.remove('has-error'); const error = $(`[data-error-for="${field.name}"]`); if (error) error.textContent = ''; field.removeAttribute('aria-invalid'); };
    Object.values(fields).forEach(field => field.addEventListener('input', () => clearError(field)));
    form.addEventListener('submit', event => {
      event.preventDefault(); let valid = true;
      Object.values(fields).forEach(field => clearError(field));
      if (!fields.name.value.trim()) { setError(fields.name, 'Please add your name.'); valid = false; }
      if (!/^\S+@\S+\.\S+$/.test(fields.email.value.trim())) { setError(fields.email, 'Please enter a valid email.'); valid = false; }
      if (!fields.message.value.trim()) { setError(fields.message, 'Please add a message.'); valid = false; }
      if (!valid) { showToast('Please check the highlighted fields.'); return; }
      const subject = $('#contact-subject').value.trim() || 'Hello Antara';
      const body = `Hi Antara,\n\n${fields.message.value.trim()}\n\nFrom: ${fields.name.value.trim()} (${fields.email.value.trim()})`;
      showToast('Opening your email client…');
      window.location.href = `mailto:antarasamidhasushil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    function setError(field, message) { const row = field.closest('.form-row'); row.classList.add('has-error'); field.setAttribute('aria-invalid', 'true'); const error = $(`[data-error-for="${field.name}"]`); if (error) error.textContent = message; }
  }

  function initPlaceholders() { $$('[data-placeholder]').forEach(button => button.addEventListener('click', () => showToast(`${button.dataset.placeholder} URL is a placeholder — add the verified link when available.`))); }

  function initResume() { const link = $('[data-resume-download]'); if (link) link.addEventListener('click', () => showToast('Resume download started.')); }

  document.addEventListener('DOMContentLoaded', () => {
    initLoader(); initTheme(); initMobileNav(); initCursor(); initMagneticButtons(); initTyping(); initReveals(); initScrollUI(); initCounters(); initTimeline();
    renderProjects(); renderCertificates(); initFilters(); initModals(); initContactForm(); initPlaceholders(); initResume();
  });
})();
