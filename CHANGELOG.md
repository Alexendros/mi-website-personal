# Changelog

Todos los cambios destacables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog 1.1.0](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [SemVer 2.0.0](https://semver.org/lang/es/).

## [0.8.0] — 2026-09-03 · Ideas y Acciones

### Cambiado

- **Renombre de colecciones**: `/espensar` → `/ideas` y `/esposible` → `/acciones`. Renombradas las carpetas `app/espensar`→`app/ideas`, `app/esposible`→`app/acciones` (incluidos los subdirectorios `[slug]/` con sus páginas y OG images), `content/espensar`→`content/ideas`, `content/esposible`→`content/acciones`. Etiquetas unificadas a "Ideas" / "Acciones" en ES y EN. Slugs de los 5 artículos sin cambios.
- **Redirecciones 308** en `vercel.json` para rutas legacy: `/espensar`→`/ideas`, `/espensar/:slug`→`/ideas/:slug`, `/esposible`→`/acciones`, `/esposible/:slug`→`/acciones/:slug`.
- **Código**: `lib/content/types.ts` (`CollectionType = "ideas" | "acciones"`), `lib/content/loader.ts`, `lib/og-image.tsx` (`IDEAS_THEME`/`ACCIONES_THEME`), i18n `es.ts`/`en.ts` (`ideasLabel`/`accionesLabel`, `backIdeas`/`backAcciones`, `sectionIdeas`/`sectionAcciones`, `{ideasLink}`/`{accionesLink}`), `components/translated-labels.tsx` (`BackIdeasLabel`/`BackAccionesLabel`), `components/home-content.tsx`, `components/search-dialog.tsx`, `app/page.tsx`, páginas de colección y de artículo, `scripts/generate-sitemap.ts` (sitemap-ideas.xml/sitemap-acciones.xml), `scripts/generate-search-index.ts`, `scripts/generate-feeds.ts` (feed-ideas._/feed-acciones._), `public/sw.js` precache.
- **Licencia**: LICENSE file + `package.json` unificados a **CC BY-NC-SA 4.0** (anticomercial, coherente con el sello €Ç del footer). README actualizado.
- **Versión**: unificada a `v0.8.0` (package.json, README badge, package-lock.json).
- **Documentación**: ROADMAP.md, TASKS.md, ARCHITECTURE.md, docs/README.md corregidos y contrastados con el código real.

### Añadido

- **Página de proyecto en Notion** "Website Alexendros.Me · Espacio libre de dinero" en la base de datos de proyectos, con método de desarrollo basado en baterías de preguntas y contraste con la IA de Notion para las secciones 🧠 Ideas y ⚡ Acciones.
- **vitest.setup.ts**: mock de `localStorage` para compatibilidad con Node 26 (35 tests reparados).

## [0.7.2] — 2026-08-XX · Release automation fixes

### Corregido

- Workflow de release: push del tag solo en rama `main` protegida (`fix push tag only`).
- `chore(release): v0.7.2`.

## [0.7.1] — 2026-08-XX · Release workflow split

### Cambiado

- Workflow de release dividido en dos jobs: `check-version` + `do-release`.
- Añadido `upload-artifact` de `out/**`.

## [0.7.0] — 2026-08-XX · Changelog tooling

### Añadido

- `scripts/extract-changelog.sh` para extraer la sección de changelog.
- Publicación del changelog de release en el README (marcadores `RELEASE_SECTION_START`/`END`).

## [0.6.0] — 2026-08-XX · CI a11y y rendimiento

### Añadido

- Jobs CI de accesibilidad (WCAG contrast) y rendimiento con cobertura 100%.
- Auto-update de snapshots de regresión visual.
- `feat`: OG dinámicas (Plan E), print mode (Plan C.3), feeds segmentados por colección, cobertura del content loader.
- `pr-summary`, badge Lighthouse semanal y plantilla de issue `bug.yml`.

### Cambiado

- ESLint config (worktree, Node 20), `typescript` 6.0.3, `typescript-eslint` 8.65.0, `@vercel/analytics` 2.x, `@types/node` 26.x.
- CSP: migración de estilos inline a clases CSS.
- Husky pre-commit + lint-staged + `scripts/validate-action-shas.ts`.

## [0.5.0] — 2026-07-17 · Auditoría + Magnificación

### Añadido

- **Vercel Web Analytics** (@vercel/analytics v1.4.1): componente `<Analytics />` en `app/layout.tsx` siguiendo el patrón oficial Next.js App Router. Activación pendiente desde Vercel Dashboard.
- **Parser gray-matter**: migración de regex manual a librería `gray-matter` para extracción tipada de frontmatter YAML en `lib/content/loader.ts`.
- **theme.js estático**: script anti-FOUC extraído del inline `<head>` a `public/theme.js`, referenciado vía `<script>` en layout. Aplica clase dark/light antes del primer paint.
- **content-visibility: auto**: optimización de renderizado para secciones below-fold en `components.css` (`.section-below-fold`, `.marquee-section` excluidas para compatibilidad E2E).
- **Lighthouse CI budgets**: presupuestos de rendimiento en `lighthouserc.cjs`: LCP <4000ms (warn), CLS <0.1 (error), TBT <300ms (warn), resource budgets (documento <25KB, scripts <250KB, CSS <50KB, fuentes <150KB, total <450KB). Performance score ≥0.85.
- **Sitemaps segmentados**: `scripts/generate-sitemap.ts` genera `sitemap.xml` (índice) + `sitemap-pages.xml` + `sitemap-espensar.xml` + `sitemap-esposible.xml` con `lastmod` reales desde frontmatter. Integrado como paso pre-build.
- **Validación JSON-LD en CI**: `scripts/validate-jsonld.ts` escanea `out/` post-build, extrae 44 bloques `application/ld+json` en 14 páginas y valida `@context` + `@type`.
- **A11y axe-core en CI**: tests `a11y.spec.ts` des-excluidos de `playwright.config.ts` — 5 páginas verificadas WCAG 2.1 AA en cada CI pipeline.
- **Health-check sintético**: `scripts/health-check.sh` para monitorización externa (cron-job.org, UptimeRobot): HTTP 200 en home + feeds + sitemaps + security headers.
- **AUDITORIA-CRITICA.md**: informe completo repo+web nivel PROFUNDO. 6 defectos encontrados, 6 corregidos. Plan de magnificación 3 fases (8 ítems). Salud del proyecto: 9.8/10.

- **Modo claro/oscuro** (Tarea 7): soporte completo `prefers-color-scheme` + toggle manual (System/Light/Dark) con persistencia localStorage. Tokens OKLCH light mode calculados perceptualemente (hue 85 superficies, hue 315 texto, contraste ≥4.5:1 WCAG AA). ThemeProvider + ThemeToggle (Radix Popover, iconos Monitor/Sun/Moon). Script anti-FOUC inline en `<head>`.
- **Banner anti-monetización** (Tarea 5): aviso superior fijo "Este espacio es libre de dinero. Sin anuncios, sin afiliados, sin tracking. Lo comercial vive en alexendros.dev". Descartable (localStorage), respeta `prefers-reduced-motion`, animación slide-down/up, glass effect con `--ax-glass-*` tokens.
- **Enlace a alexendros.dev** (Tarea 8): nav desktop "Productos" + footer "Hub de productos → alexendros.dev" con icono ExternalLink, `target="_blank" rel="noopener noreferrer"`.
- **Tags firmados + GitHub Releases** (Tarea 6): workflow `release.yml` con `workflow_dispatch`, GPG signing en runner self-hosted, `softprops/action-gh-release@v2`, artifacts `out/**/*`.

### Corregido

- **CI hardening**: GitHub Actions pineados a commit SHA exactos (checkout, setup-node, upload-artifact, action-gh-release). Shell injection prevenido en `release.yml` (inputs → env). Schedule CI reducido de cada 30min a cada 6h. `concurrency` + `cancel-in-progress` añadido.
- **Dependabot cooldown**: `cooldown.default-days: 7` añadido a ambos ecosistemas (npm + github-actions).
- **Badge a11y contraste**: `--ax-accent-fg` en light mode corregido de `oklch(0.08→0.05)` para alcanzar ≥4.5:1 WCAG AA en badges "En construcción".
- **CSS huérfano**: 4 declaraciones sueltas eliminadas de `components.css` (`width: 2rem`, `WhiteSpace`, reglas pseudo).
- **CHANGELOG.md** (Tarea 1): URLs repo actualizadas `Alexendros/website-alexendrosme` → `Iniciativas-Alexendros/website-alexendrosme`.
- **CI unificado v4** (Tarea 2): `actions/checkout@v4`, `setup-node@v4` con `node-version-file: .nvmrc`, `upload-artifact@v4`, `concurrency` + `cancel-in-progress`.
- **package.json engines.node** (Tarea 3): `>=24` → `>=22` (alineado con `.nvmrc` = 22).
- **Sitemaps/JSON-LD**: snapshot regression actualizados (12 imágenes). Build + tests + lint + tsc 0 errores.

### Seguridad

- CI workflows: SHA pinning en los 4 GitHub Actions, sanitización de inputs vía `env`, schedule anti-oversampling.

### Cambiado

- `app/layout.tsx`: `<script>` inline reemplazado por referencia a `public/theme.js` con Next.js `Script` component.
- `lib/content/loader.ts`: `gray-matter` reemplaza parser regex manual.
- `lighthouserc.cjs`: añadidos presupuestos de rendimiento y recursos.
- `playwright.config.ts`: eliminada exclusión de tests a11y en CI.
- `app/styles/tokens/colors.css`: añadidos tokens light mode vía `@media (prefers-color-scheme: light)` y `[data-theme="light"]` overrides.
- `app/styles/tokens/index.css`: capa semántica shadcn reactiva a tema (media query + data-theme).
- `app/styles/tokens/spacing.css`: removido `color-scheme: dark` hardcoded.
- `app/layout.tsx`: envuelto en `<ThemeProvider>`, script anti-FOUC, `viewport.colorScheme: "dark light"`, clase `dark` removida de `<html>`.
- `components/nav.tsx`: integrado `<ThemeToggle />`, añadido enlace "Productos" (desktop-only).
- `components/footer.tsx`: añadido enlace "Hub de productos → alexendros.dev".
- `app/styles/components.css`: estilos `.anti-monetization-banner`, `.desktop-only`, utilidades glass.

## [0.3.0] — 2026-05-09 · SPA landing v2

### Añadido

- **SPA one-page**: tres secciones ancla (`#biografia`, `#misiones`, `#experiencias`) con smooth scroll, `scroll-margin-top` e IntersectionObserver para active nav state.
- **Atmósfera Vergina Imperial v0.2.2**: cuatro capas CSS (`haze`, `spark`, `dust`, `vignette`) con animación `atm-drift`, respeta `prefers-reduced-motion`.
- **FAB Convócame**: mailto + Telegram (en preparación) + Matrix (próximamente). Popover Radix, foco-trap nativo, Escape devuelve foco al trigger.
- **FAB Mis aliados**: Claude AI + Proton + Playlist (TBD). Popover Radix con `rel="sponsored nofollow"`.
- **Redirects 308** en `vercel.json` para las 6 rutas legacy (`/autobiografia→/#biografia`, `/proyectos→/#misiones`, `/experiencia→/#experiencias`, `/contacto→/`, `/bitacora→/`, `/uses→/#experiencias`).
- **Legales pedagógicas** (4-bloques: esencial / detalle / derechos / texto formal): aviso-legal, privacidad, cookies. Sin botones de aceptación (no hay cookies de terceros).
- **Tests E2E Playwright** (46 passed, 0 failed): smoke, skip-link, FABs, anchors, responsive, axe-core WCAG 2.1 AA sobre 4 rutas × 3 viewports.
- **CI job `e2e`** en GitHub Actions (pnpm install → playwright install → test, artefacto de fallo).
- `components/ui/popover.tsx`: Popover Radix shadcn-style sobre `radix-ui`.
- `lib/contact.ts`: `buildMailto()` + tipos de estado de contacto.

### Cambiado

- `components/nav.tsx`: eliminadas rutas `/bitacora`, `/uses`, `/contacto`, `/proyectos`, `/autobiografia`, `/experiencia`. Nav reducido a 3 anchors. Logo hace `scrollTo(top:0, smooth)`.
- `lib/site.ts`: `siteConfig.nav` reducido; añadidos `siteConfig.contact` y `siteConfig.referrals`.
- `components/footer.tsx`: enlace de afiliados apunta a `#experiencias` (anchor SPA); eliminado enlace muerto `/experiencia#recomendaciones`.
- `app/layout.tsx`: integra `<Atmosphere />` y `pb-28 md:pb-0` en `<main>` para el FAB.
- `vercel.json`: añadidos 6 redirects permanentes.
- `app/styles/components.css`: añadidos `.mission-card`, `.referral-item`, `.atm*`, `.fab-stack`, `.fab-btn`, `.fab-item*`, `.fab-divider`, `.fab-section-label`.
- `app/styles/motion.css`: añadido `@keyframes atm-drift` + override `prefers-reduced-motion` para `.atm*`.

### Eliminado

- Rutas `/autobiografia`, `/bitacora`, `/contacto`, `/experiencia`, `/proyectos`, `/uses` (seis carpetas `app/<ruta>/`).
- `app/uses/redirect-client.tsx` (client component huérfano).

### Documentación

- `docs/auditoria-tecnica-2026-04-14.md`: renombrado desde `AUDITORÍA TÉCNICA alexendros.md` + nota de snapshot histórico superseded.
- `docs/AUDIT-REPORT.md`: ya existente en main.

### Eliminado

- (pendiente)

### Corregido

- (pendiente)

### Seguridad

- (pendiente)

## [0.2.0] - 2026-06-27

### Added

- Design system completo con 75+ tokens CSS con prefijo `--ax-*`
- `DESIGN.md` con documentación YAML frontmatter + markdown del sistema de diseño
- Tokens: colores (5 semánticos + 3 neutrales + accent), motion (3 durations + 3 easings), spacing (radius, z-index, layout)
- Triple cadena de aliases: `--ax-accent` → `--ax-brand-primary` → `--primary` (shadcn)
- DOCUMENTATION.md: guía de uso de tokens en componentes

### Changed

- Migración completa de tokens `--*` a `--ax-*` en 27 archivos (256 ocurrencias)
- `package.json`: name → `website-alexendrosme`, version → `0.2.0`, license → MIT
- CI workflow: pnpm → npm (pnpm incompatible con entorno)
- Repo renombrado: `mi-website-personal` → `website-alexendrosme`
- 22 referencias actualizadas en 16 archivos de documentación

### Fixed

- `gray-matter` build crash: pin `js-yaml@~3.14.1` (v5.x eliminó `safeLoad`)
- npm override para resolver vulnerabilidad moderada en postcss

## [0.1.0] — 2026-MM-DD

### Añadido

- Versión inicial del repositorio con canon de documentación aplicado.

[0.8.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.7.2...v0.8.0
[0.7.2]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.3.0...v0.5.0
[0.3.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Iniciativas-Alexendros/website-alexendrosme/releases/tag/v0.1.0
