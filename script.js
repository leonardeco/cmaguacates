/**
 * CM Aguacates Quindío — script.js
 * Módulos: Navbar · Scroll Animations · Counter · Gallery Lightbox · Form · Scroll-to-Top · Footer Year
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initCounter();
  initLightbox();
  initContactForm();
  initScrollTop();
  initFooterYear();
  initActiveNav();
});

/* ─────────────────────────────────────────
   NAVBAR — scroll effect + hamburger menu
───────────────────────────────────────── */
function initNavbar() {
  const navbar    = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  // Compact navbar on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    // Show/hide scroll-top handled in initScrollTop
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

/* ─────────────────────────────────────────
   SCROLL ANIMATIONS — fade-in con IntersectionObserver
───────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .card').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   COUNTER — animación de estadísticas
───────────────────────────────────────── */
function initCounter() {
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll('.counter').forEach(counter => {
        if (counter.dataset.counted) return;
        counter.dataset.counted = 'true';

        const target   = +counter.getAttribute('data-target');
        const duration = 2000;
        const step     = target / (duration / 16);
        let current    = 0;

        const tick = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(tick);
          } else {
            counter.textContent = target;
          }
        };

        requestAnimationFrame(tick);
      });

      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  counterObserver.observe(statsBar);
}

/* ─────────────────────────────────────────
   LIGHTBOX — galería con navegación
───────────────────────────────────────── */
function initLightbox() {
  const galleryGrid   = document.getElementById('gallery-grid');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxCap   = document.getElementById('lightbox-caption');
  const btnClose      = document.getElementById('lightbox-close');
  const btnPrev       = document.getElementById('lightbox-prev');
  const btnNext       = document.getElementById('lightbox-next');

  if (!galleryGrid || !lightbox) return;

  const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function open(index) {
    currentIndex = index;
    const item    = items[currentIndex];
    const img     = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span').textContent.replace(/\s+/g, ' ').trim();

    lightboxImg.src         = img.src;
    lightboxImg.alt         = img.alt;
    lightboxCap.textContent = caption;

    lightbox.hidden            = false;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.hidden              = true;
    document.body.style.overflow = '';
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    open(currentIndex);
  }

  // Event delegation — galería
  galleryGrid.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (item) open(+item.dataset.index);
  });

  // Teclado en tarjetas
  galleryGrid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.gallery-item');
      if (item) { e.preventDefault(); open(+item.dataset.index); }
    }
  });

  // Controles del lightbox
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => navigate(-1));
  btnNext.addEventListener('click', () => navigate(1));

  // Click en el fondo
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  // Teclado global
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
}

/* ─────────────────────────────────────────
   FORMULARIO DE CONTACTO — validación
───────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const formMsg = document.getElementById('form-msg');
  if (!form) return;

  form.addEventListener('submit', e => {
    const phone = document.getElementById('phone').value.replace(/\D/g, '');

    if (phone.length < 10) {
      e.preventDefault();
      showFormMsg('Mijo, verifique el teléfono (mínimo 10 números).', 'error');
      return;
    }

    showFormMsg('¡Enviando mensaje! Gracias por su confianza.', 'success');
  });

  function showFormMsg(text, type) {
    formMsg.textContent  = text;
    formMsg.className    = `form-msg form-msg--${type}`;
  }
}

/* ─────────────────────────────────────────
   SCROLL TO TOP — botón flotante
───────────────────────────────────────── */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   ACTIVE NAV — resalta sección visible
───────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* ─────────────────────────────────────────
   FOOTER YEAR — año automático
───────────────────────────────────────── */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
