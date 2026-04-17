<h1 align="center">
  🥑 CM Aguacates Quindío
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
</p>

<p align="center">
  Landing page profesional para empresa comercializadora de aguacates del Quindío, Colombia.
  <br />
  Diseño responsive · Animaciones CSS · Galería con lightbox · Formulario Netlify · WhatsApp directo
</p>

---

## Características

- **Hero animado** — Banner con overlay degradado, badge de país y estadísticas con contador animado
- **Catálogo de variedades** — 8 variedades de aguacate con tarjetas interactivas (Hass, Papelillo, Santana, Choquette y más)
- **Galería con Lightbox** — Navegación de imágenes con teclado (←→ y Escape), zoom animado
- **Formulario de contacto** — Integrado con Netlify Forms, validación de teléfono en frontend
- **WhatsApp flotante** — Botón pulsante con animación para contacto directo
- **Navbar inteligente** — Se compacta al hacer scroll, menú hamburger con animación X en mobile
- **Animaciones scroll** — Elementos con fade-in activados por IntersectionObserver
- **SEO básico** — Meta description, lang, title descriptivo

---

## Stack

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica |
| **CSS3** | Diseño, animaciones, responsive |
| **JavaScript Vanilla** | Interactividad sin dependencias |
| **Font Awesome 6** | Iconografía |
| **Google Fonts** | Inter + Outfit |
| **Netlify Forms** | Backend del formulario de contacto |

---

## Estructura

```
cmaguacates/
├── index.html       # Página principal
├── style.css        # Todos los estilos y animaciones
├── script.js        # Interactividad (lightbox, contador, navbar, formulario)
└── img/
    ├── cosecha-campo.jpg
    ├── cosecha-canastas.jpg
    ├── bodega-almacen.jpg
    ├── bodega-platanal.jpg
    └── bodega-canastas.jpg
```

---

## Correr localmente

```bash
# Clonar el repositorio
git clone https://github.com/leonardeco/cmaguacates.git
cd cmaguacates

# Abrir directamente en el navegador
# (no requiere servidor ni dependencias)
open index.html
```

---

## Despliegue en Netlify

1. Conecta el repo en [app.netlify.com](https://app.netlify.com)
2. **Build command:** *(vacío — sitio estático)*
3. **Publish directory:** `.` *(raíz del proyecto)*
4. El formulario de contacto funciona automáticamente gracias al atributo `data-netlify="true"`

---

## Empresa

**CM Aguacates Quindío** — Comercializadora con más de 10 años de experiencia en compra y venta de aguacates en Armenia, Quindío.

- 📞 WhatsApp: [+57 304 474 2638](https://wa.me/573044742638)
- 📧 Email: Marinillo188@hotmail.com
- 📍 Ubicación: Armenia, Quindío — Colombia

---

## Autor

**Leonardo Guzmán** — [@leonardeco](https://github.com/leonardeco)
