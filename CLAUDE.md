# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for "Mixcoac Residencial" — a real estate development of 8 exclusive houses in Colonia Mixcoac, CDMX. Built with vanilla HTML, CSS, and JavaScript (no frameworks or build tools).

## Development

No build step required. Open `index.html` directly in a browser or use any static file server.

```bash
python -m http.server 8000
```

## Architecture

Single-page site with three core files:

- **`index.html`** — All page sections in order: Hero (`#inicio`), Proyecto, Casas, Acabados, Avance de Obra, Ubicación, Contacto. Also contains three modals: `#contactModal` (appointment), `#imgModal` (image zoom), `#brochureModal` (brochure download lead capture).
- **`css/styles.css`** — Complete styling using CSS variables, Flexbox/Grid layouts, and responsive breakpoints (1024px, 768px, 480px). Organized by section with BEM naming.
- **`js/main.js`** — All interactivity in one `DOMContentLoaded` block. Sections: hero slideshow, sticky header, active nav link tracking, hamburger menu, Casas tabs (Tipo A/B/C), per-slider image carousels, image zoom modal, Proyecto slider, Avance de Obra slider, contact modal, form validation (simulated submit), brochure modal.

## JS Patterns

- All sliders share the same pattern: `goTo(index)` wraps with modulo, `setInterval` auto-advances, `mouseenter`/`mouseleave` pause/resume.
- Form validation (`validateForm`) injects `.form__error` spans inline; submit is simulated (no real backend).
- Modals toggle `modal--open` class + `body.style.overflow = 'hidden'`. Three independent modals: `#contactModal`, `#imgModal`, `#brochureModal`.
- Scroll-reveal uses `IntersectionObserver` adding `reveal--visible` to elements with `.reveal` class.

## Design System

CSS variables in `:root` (`css/styles.css`):
- Brand accent: `#8B5E3C` (warm brown), hover: `#6D4A2E`
- Fonts: `Roboto Slab` (headings), `Montserrat` (body) via Google Fonts
- `--header-height: 70px`, `--header-height-expanded: 110px`, `--max-width: 1200px`

## Assets

- `assets/images/` — Hero banner, logos (`rm_logo.png`, `logo_ILO_Desarrollos.png`), floor plans (`planos/tipo-a.png`, `tipo-b.png`, `tipo-c.png`), acabados swatches, slider images
- `documentacion/` — Wireframe reference document

## Key Conventions

- All content in Spanish (`lang="es"`)
- No external JS dependencies — vanilla ES6+
- Semantic HTML5 with `aria-label` attributes
- Placeholder images use `placeholder.co` CDN
