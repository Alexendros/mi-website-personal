# Roadmap de website-alexendrosme

Espacio libre de dinero · alexendros.me · colecciones **🧠 Ideas** y **⚡ Acciones**.

Roadmap por fases y componentes, actualizado a **v0.8.0 (2026-09-03)**.

## Completado

### Infraestructura y fundaciones

- [x] **v0.1.0** — Lanzamiento inicial (estático, espensar + esposible).
- [x] **v0.2.0** — Sistema de diseño v1 (tokens `--ax-*`, DESIGN.md), renombrado `mi-website-personal` → `website-alexendrosme`, migración pnpm → npm.
- [x] **v0.2.0** — CI (typecheck + lint + build en PRs), Dependabot, plantilla de PR.

### Anti-monetización y sello

- [x] **v0.3.0** — Banner anti-monetización descartable, política de no-monetización visible, tags Git firmados (GPG) + GitHub Releases.
- [x] **v0.8.0** — Licencia unificada **CC BY-NC-SA 4.0** (LICENSE + package.json + README) con sello €Ç en el footer ("cópialo, úsalo, compártelo. No comercies con ello").

### Auditoría y calidad (v0.5.0 · 2026-07-17)

- [x] Vercel Web Analytics (`@vercel/analytics`), parser `gray-matter`, `theme.js` anti-FOUC.
- [x] Lighthouse budgets en CI (LCP < 4s, CLS < 0.1, TBT < 300ms) + `content-visibility`.
- [x] Sitemaps segmentados (`generate-sitemap.ts`), validación JSON-LD en CI (44 bloques).
- [x] Tests a11y axe-core WCAG 2.1 AA en CI + `health-check.sh`.
- [x] AUDITORIA-CRITICA.md: 6 defectos corregidos (shell injection, CSS huérfano, SHA pinning, etc.). Salud 9.8/10.

### Contenido y SEO (v0.5.0 → v0.8.0)

- [x] Modo claro/oscuro (ThemeProvider + ThemeToggle), modo claro ya activo en producción.
- [x] Internacionalización es/en (lib/i18n, locale-toggle), búsqueda en contenido (search-dialog + search-index.json).
- [x] RSS/Atom (feed.xml + feeds por colección), páginas de error (404, error boundary), enlace hub `alexendros.dev`.
- [x] OG dinámicas por artículo, print mode, feeds segmentados, cobertura de loader.

### Automatización de releases (v0.6.0 → v0.7.2)

- [x] CI a11y WCAG contrast + perf, auto-update de snapshots visuales, pr-summary + badge Lighthouse semanal + bug.yml.
- [x] Husky pre-commit + lint-staged + `validate-action-shas`, CSP: inline styles → clases.
- [x] `extract-changelog.sh`, publicación del changelog en README, split check-version + do-release, fix push de tag en main protegida.

### v0.8.0 · Renombre Ideas y Acciones (2026-09-03)

- [x] Renombre `/espensar` → `/ideas` y `/esposible` → `/acciones` (carpetas app + content, etiquetas ES/EN, slugs intactos).
- [x] Redirecciones 308 en vercel.json (4 rutas legacy), precache del SW, assets regenerados (sitemaps, feeds, search-index).
- [x] Página Notion **"Website Alexendros.Me · Espacio libre de dinero"** con método de desarrollo por baterías de preguntas + contraste con la IA de Notion.
- [x] Tests reparados bajo Node 26 (`vitest.setup.ts` mock localStorage): 259/259 passed, typecheck, lint, build y verify:vercel en verde.

## En progreso

- [ ] **Contenido Ideas/Acciones**: aplicar el método de la página Notion (batería de preguntas + contraste IA) para nuevas piezas en `/ideas` y `/acciones`.
- [ ] **v0.8.x** — Desarrollar el primer bloque de artículos según el gate de calidad (sin monetización, estático primero, minimalismo, WCAG 2.1 AA, CI verde).

## Futuro (por componente)

### Contenido

- [ ] Nuevas piezas `Ideas` y `Acciones` con la batería de preguntas (tesis en una frase, objeción más fuerte y respuesta, evidencia concreta, conexión con el espacio libre de dinero, acción concreta, título honesto).
- [ ] Contraste sistemático de cada pieza contra la IA de Notion antes de publicar.

### Privacidad

- [ ] Analytics privacy-first (Plausible EU / Umami) con consentimiento explícito, si se decide activar.
- [ ] Validación manual de JSON-LD en validator.schema.org (paso opcional pre-deploy).

### Hub y ecosistema

- [ ] Enlace real y sincronización de contenido con el hub `alexendros.dev` (bloqueado externo hasta su deploy).

## Principios

- **Sin monetización**: ningún patrocinio, afiliado o tracking publicitario.
- **Estático primero**: export estático salvo que haya razón técnica para SSR.
- **Minimalismo**: lo mínimo necesario, sin frameworks por frameworks.
- **Accesibilidad**: WCAG 2.1 AA como mínimo.
- **Anticomercial**: CC BY-NC-SA 4.0 — cópialo, úsalo, compártelo. No comercies con ello.
