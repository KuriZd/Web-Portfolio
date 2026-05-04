# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

## Architecture

React 19 + Vite 6 single-page portfolio. Styling via Tailwind CSS 4 (Vite plugin). No TypeScript — plain JSX throughout.

**Entry flow:** `index.html` → `src/main.jsx` → `src/App.jsx`

**App.jsx** orchestrates two phases:
1. **Intro screen** (2.5s animated splash, controlled by `showIntro` state)
2. **Main layout** — four scroll-anchored sections (`#home`, `#about`, `#portfolio`, `#contact`) rendered over a full-viewport Three.js canvas

**`src/assets/ShaderBackground.jsx`** — Three.js component with custom GLSL shaders. Renders an animated radial gradient with three color-cycling focal points directly onto a canvas behind all page content. Handles window resize.

**`src/Components/`** — individual section components. `HeroSection.jsx` is built out; the about/portfolio/contact sections are placeholders in App.jsx.

## Design System

- **Color accent:** cyan (`#42e3f1` / `#499AA1`), off-white text (`#f5f5dc`)
- **Motif:** glassmorphism — `backdrop-blur` + semi-transparent backgrounds throughout
- **Animations:** defined in `src/App.css` (fade-up, scale-in, pulse); applied via Tailwind `animate-*` or inline class names
- **Branding string:** `<KuriZd />` — used in Navbar logo and intro screen signature

## Routing

`react-router-dom` is installed but not yet wired up. Current navigation uses anchor hash links (`#home`, `#about`, etc.).
