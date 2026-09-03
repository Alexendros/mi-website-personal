# Mi propio portal de contenido personal con código abierto accesible desde internet.

> Espacio personal con datos biográficos, ideas, ensayos y crítica tecnológica.

[![Deployed on Vercel](https://img.shields.io/badge/vercel-%23000000?logo=vercel&logoColor=white)](https://alexendros.me)
[![CI: build · e2e · lhci · a11y · perf](https://img.shields.io/github/actions/workflow/status/Iniciativas-Alexendros/website-alexendrosme/ci.yml?branch=main&logo=github&label=CI&style=flat-square)](https://github.com/Iniciativas-Alexendros/website-alexendrosme/actions/workflows/ci.yml)
[![Lighthouse](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2FAlexendros%2Fff3b2a0e0c6ea0a662af759b1fc5de14%2Fraw%2Flighthouse.json&logo=lighthouse&style=flat)](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Falexendros.me)
[![Release: v0.8.0](https://img.shields.io/github/v/release/Iniciativas-Alexendros/website-alexendrosme?logo=github&label=Release&style=flat-square)](https://github.com/Iniciativas-Alexendros/website-alexendrosme/releases)
[![Next.js](https://img.shields.io/badge/next.js-16-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-4-06b6d4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tests: 259 passed](https://img.shields.io/badge/tests-259%20passed-44cc11?logo=vitest)](https://github.com/Iniciativas-Alexendros/website-alexendrosme/actions)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-orange.svg)](LICENSE)

## Qué es

Sitio web personal estático para [alexendros.me](https://alexendros.me). Contenido editorial sobre soberanía digital, crítica tecnológica y alternativas al modelo de plataformas.

- **[Ideas](https://alexendros.me/ideas)** — reflexiones sobre tecnología y sociedad
- **[Acciones](https://alexendros.me/acciones)** — guías prácticas de alternativas

## Stack

| Capa      | Tecnología                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack)                                                 |
| Estilos   | [Tailwind CSS v4](https://tailwindcss.com) + design system `--ax-*`                                      |
| Tipado    | [TypeScript](https://www.typescriptlang.org) strict                                                      |
| Contenido | MDX + [gray-matter](https://github.com/jonschlinkert/gray-matter) + Zod                                  |
| UI        | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) + [Lucide](https://lucide.dev) |
| Deploy    | [Vercel](https://vercel.com) (export estático)                                                           |
| Testing   | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev)                                      |

## Desarrollo local

```bash
# Clonar
git clone git@github.com:Iniciativas-Alexendros/website-alexendrosme.git
cd website-alexendrosme

# Instalar
npm install

# Desarrollo
npm run dev          # localhost:3000 (Turbopack)

# Build
npm run build        # export estático en ./out

# Tests
npm run test         # unit (Vitest)
npm run test:e2e     # e2e (Playwright)

# Lint + tipos
npm run lint
npm run typecheck
```

## Estructura

```
├── app/                  # App Router (rutas + layouts)
│   ├── styles/           # CSS: tokens, base, components, prose
│   ├── ideas/            # Colección: reflexiones
│   ├── acciones/         # Colección: guías prácticas
│   └── legal/            # Páginas legales
├── components/           # Componentes React (shadcn/ui base)
├── content/              # MDX (ideas + acciones)
├── lib/                  # Utilidades (cn, content loader, schemas)
├── public/               # Assets estáticos
├── DESIGN.md             # Sistema de diseño v1
└── ARCHITECTURE.md       # Decisiones técnicas
```

## Sistema de diseño

Ver [DESIGN.md](DESIGN.md) para documentación completa de tokens, componentes y principios.

Tokens con prefijo `--ax-*` para colores, motion, spacing y layout. Triple cadena de aliases compatible con shadcn/ui.

## Licencia

[CC BY-NC-SA 4.0](LICENSE) — Anticomercial: cópialo, úsalo, compártelo. No comercies con ello.

<!-- RELEASE_SECTION_START -->
<!-- RELEASE_SECTION_END -->
