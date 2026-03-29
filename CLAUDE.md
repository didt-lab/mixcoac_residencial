# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for "Mixcoac Residencial" — a real estate development of 8 exclusive houses in Colonia Mixcoac, CDMX. Built with vanilla HTML, CSS, and JavaScript (no frameworks or build tools).

## Architecture

Single-page site with three core files:

- **`index.html`** — All page sections: Hero, Proyecto, Casas, Acabados, Avance de Obra, Ubicación, Contacto, plus a modal for appointment booking
- **`css/styles.css`** — Complete styling using CSS variables, Flexbox/Grid layouts, and responsive breakpoints (1024px, 768px, 480px)
- **`js/main.js`** — All interactivity: sticky header, mobile menu, house type tabs (Tipo A/B/C), auto-advancing carousel, modal, form validation, scroll-reveal animations via IntersectionObserver

## Development

No build step required. Open `index.html` directly in a browser or use any static file server.

```bash
# Example with Python
python -m http.server 8000
```

## Design System

CSS variables defined in `:root` in `css/styles.css`:
- Brand accent: `#8B5E3C` (warm brown)
- Fonts: `Cormorant Garamond` (headings), `Montserrat` (body) via Google Fonts
- Max content width: 1200px

CSS follows BEM naming convention and is organized by page section.

## Assets

- `assets/images/` — Hero banner, logo, floor plans (`planos/tipo-a.png`, `tipo-b.png`, `tipo-c.png`)
- `documentacion/` — Wireframe reference document

## Key Conventions

- All content is in Spanish (lang="es")
- Semantic HTML5 with aria-labels for accessibility
- No external JS dependencies — everything is vanilla ES6+
- Placeholder images use placeholder.co CDN
