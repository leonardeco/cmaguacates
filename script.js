// Animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .card').forEach(el => observer.observe(el));

// Contador animado para las estadísticas
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (counter.dataset.counted) return;
                counter.dataset.counted = 'true';
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
            });
        }
    });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Validación del Formulario
document.getElementById('contactForm').addEventListener('submit', function (e) {
    const phone = document.getElementById('phone').value;
    const msg = document.getElementById('msg');

    if (phone.length < 10) {
        e.preventDefault();
        msg.innerText = "Mijo, verifique el teléfono (mínimo 10 números).";
        msg.style.color = "#e53e3e";
    } else {
        msg.innerText = "¡Enviando mensaje! Gracias por su confianza.";
        msg.style.color = "#2d6a1e";
    }
});

// Lightbox Gallery
let currentLightboxIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

function openLightbox(element) {
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-overlay span').textContent.trim();
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Find current index
    galleryItems.forEach((item, index) => {
        if (item === element) currentLightboxIndex = index;
    });

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event.target === document.getElementById('lightbox') || event.target.closest('.lightbox-close')) {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(event, direction) {
    event.stopPropagation();
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryItems.length - 1;
    if (currentLightboxIndex >= galleryItems.length) currentLightboxIndex = 0;

    const item = galleryItems[currentLightboxIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span').textContent.trim();

    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = img.alt;
    document.getElementById('lightbox-caption').textContent = caption;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(e, -1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(e, 1);
    }
});
