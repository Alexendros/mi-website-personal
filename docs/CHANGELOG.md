# Changelog — alexendros-me

Síntesis cronológica de hitos del repo. Registro operativo, no log de ejecución.
Para detalle histórico de planes originales, ver git log.

---

## 2026-09-03 — v0.8.0 · Renombre Ideas y Acciones

Versión unificada v0.8.0. Renombre de las dos colecciones de contenido: `espensar` → `ideas` y `esposible` → `acciones` (carpetas `app/` y `content/`, etiquetas "Ideas"/"Acciones" en ES y EN, slugs de los 5 artículos sin cambios). Redirecciones 308 permanentes en `vercel.json` para las 4 rutas legacy (`/espensar` → `/ideas`, `/espensar/:slug` → `/ideas/:slug`, `/esposible` → `/acciones`, `/esposible/:slug` → `/acciones/:slug`).

- **Código**: tipos (`CollectionType`), loader, `og-image.tsx` (`IDEAS_THEME`/`ACCIONES_THEME`), i18n es/en (`ideasLabel`/`accionesLabel`, `backIdeas`/`backAcciones`, `sectionIdeas`/`sectionAcciones`), `translated-labels.tsx` (`BackIdeasLabel`/`BackAccionesLabel`), `home-content.tsx`, `search-dialog.tsx`, colecciones + `[slug]` + opengraph-image, scripts (`sitemap-ideas.xml`/`sitemap-acciones.xml`, search-index, feeds `feed-ideas.*`/`feed-acciones.*`), `sw.js` precache.
- **Tests**: `vitest.setup.ts` con mock de `localStorage` para Node 26 (35 tests reparados; 259 passed, CI verde: typecheck, lint, build, verify:vercel).
- **Licencia**: CC BY-NC-SA 4.0 en `LICENSE` y `package.json` (anticomercial).
- **Documentación**: ROADMAP/TASKS/ARCHITECTURE/docs-README corregidos y contrastados con el código real.
- **Notion**: creada la página "Website Alexendros.Me · Espacio libre de dinero" con el método de desarrollo por baterías de preguntas + contraste con la IA de Notion (secciones 🧠 Ideas y ⚡ Acciones).

## 2026-04-14 — Sesión UX (lotes A/B/C/D) + residuos de consistencia

Cierre de la pasada de identidad visual y accesibilidad sobre la landing. Tres PRs encadenados (#21, #22) más un lote D ligero de contenido.

### chore(format) — Prettier 3 aplicado al repo (`27c9449`)

Pase de formato sobre 15 archivos tras configurar el quality gate del 2026-04-13. Sin cambios funcionales.

### PR #21 — Lotes A / B / C

**Lote A · a11y + placeholders**

- Skip-link al contenido principal para lectores de pantalla y navegación por teclado.
- Favicon migrado a `app/icon.svg` por convención Next.js (elimina `<link rel="icon">` manual).
- `ParticleBg` respeta `prefers-reduced-motion: reduce` (no anima si el sistema lo pide).
- `/about` Acto I reescrito sin texto placeholder.

**Lote B · pulido de identidad**

- Nav activo con barra animada bajo el link en curso + sombra scroll-aware al separarse del hero.
- Hero reforzado: eyebrow, pill "Disponible" y CTA invertido con primario en "Hablemos".
- Footer con email `contacto@alexendros.me` visible (antes solo iconos sociales).
- `/uses` pasa a `.headline` para alinear tipografía con el resto de páginas.

**Lote C · novedad visual**

- View Transitions API habilitada para navegación entre rutas.
- Grain noise sutil en `body` para romper planos oklch uniformes.
- Hero glow reubicado a pseudo-elemento para no penalizar el LCP.
- `StackMarquee` sin `drop-shadow` redundante (ya lo aporta el glow global).
- `/projects` reestructurado en secciones por estado (producción, desarrollo, roadmap).

### PR #22 — Residuos de consistencia

- `app/not-found.tsx` y `app/error.tsx` pasan a `.headline` + `.site-shell` para alinearse con el resto de páginas.
- `public/sitemap.xml`: `lastmod` actualizado a 2026-04-14 en las rutas tocadas.
- `app/apple-icon.tsx` nuevo con `ImageResponse` 180×180 + `dynamic = "force-static"`. Colores en hex porque Satori no admite `oklch()`.

### Lote D · contenido ligero

- `/contact`: nueva sección "Tiempo de respuesta" entre Email y Redes (24–48h laborables, guía para primer email útil).
- `/projects` · roadmap: reformulado con verticales explícitas (StageKit → música electrónica, LexKit → despachos, GestKit → gestorías). Sin URLs ni promesas de fecha.

---

## 2026-04-13 — Arquitectura CSS enterprise + responsividad mobile-first

Refactor transversal del sistema de estilos y responsividad. Plan en [`humming-tumbling-mitten.md`](../../.claude/plans/humming-tumbling-mitten.md).

### CSS modularizado en `app/styles/`

`app/globals.css` pasa a ser índice (11 líneas). El contenido se parte en 8 parciales por responsabilidad:

- `tokens.css` — colores oklch, radios, fuentes, sombras, easings, `--tap-target-min`, `--measure-prose`, `--safe-inset-x`.
- `breakpoints.css` — escala completa `sm/md/lg/xl/2xl` (antes sólo `md`).
- `typography.css` — type scale fluido vía `clamp()` + clases `.display`, `.headline`, `.title`, `.prose-lead`.
- `base.css` — reset, `::selection`, `:focus-visible` con `--ring-focus`, backdrop glow.
- `components.css` — clases identitarias (`.site-shell`, `.site-nav`, `.site-footer`, `.hero-section`, `.hero-signature`, `.tool-badge`, `.project-grid`, `.legal-doc`, `.legal-table`, `.contact-row`, `.marquee-track`, `.icon-link`, `.section`, `.section-below-fold`).
- `utilities.css` — `@utility animate-marquee/no-scrollbar/mask-fade-x` + `@custom-variant` data-\* de shadcn.
- `motion.css` — keyframes + override global `prefers-reduced-motion: reduce`.
- `print.css` — optimización imprimible de páginas legales.

### Responsividad mobile-first

- Mobile-first real: base 320px, cada breakpoint añade. `sm:` (640), `md:` (768), `lg:` (1024), `xl:` (1280) disponibles.
- Tipografía fluida con `clamp()` — sustituye cadenas `text-4xl md:text-5xl` manuales.
- Container queries preparadas en `.project-grid` y `.tool-badge`.

### Clases identitarias sobre utilidades sueltas

- `app/page.tsx`: hero pasa a `.hero-section` + `.hero-signature` (`text-shadow` via token `--shadow-glow-primary`, fin de la violación `color-mix` inline).
- `app/about/page.tsx`: tabla UVP con `.legal-table` (reflow a lista `data-label` bajo 640px).
- `app/contact/page.tsx`: `.contact-row` (stack móvil, label auto).
- `app/herramientas/page.tsx`: `.tool-badge` con `whitespace-normal` + `min-h: 44px` + `overflow-wrap: anywhere`.
- `app/legal/layout.tsx`: `.legal-doc` con `max-width: var(--measure-prose)`.
- `components/nav.tsx`: `.site-nav` + `.site-nav__inner` + `.site-nav__links`.
- `components/footer.tsx`: `.site-footer` + `.icon-link` (hit-area 44×44 WCAG).
- `components/stack-marquee.tsx`: `.marquee-viewport` + `.marquee-track` (mask + pause hover formalizados).

### Correcciones WCAG 2.1 AA

- `components/ui/button.tsx`: `default` pasa a `h-11` / `size-11` (antes `h-9` — por debajo del mínimo 44px).
- Iconos footer: `.icon-link` con padding genera hit-area ≥44px (antes SVG 20px sin padding).
- `:focus-visible` global con `--ring-focus` sustituye outlines por ruta de componente.

### Verificación

- `pnpm typecheck` → 0 errores.
- `pnpm lint` → 0 errores, 0 warnings.
- `pnpm build` → 13 páginas estáticas generadas.
- Cero `oklch()` o `#hex` en `app/`/`components/` fuera de tokens (excepciones documentadas: `stack-marquee.tsx` marcas externas; `particle-bg.tsx` fallbacks de canvas; `app/layout.tsx` `themeColor` meta; `app/icon.svg` favicon).

---

## 2026-04-13 — /APP_calidad · Quality gate pre-deploy

Toolchain ampliada y quality gate ejecutado antes del deploy a Vercel.

### Toolchain añadido

- **Prettier 3.8** (`.prettierrc.json`, `.prettierignore`): `semi: true`, `singleQuote: false` (alineado con el código existente), `printWidth: 100`, `trailingComma: "all"`.
- **eslint-config-prettier**: integrado al final del flat config para desactivar reglas que chocan con Prettier.
- **depcheck 1.4** (`.depcheckrc.json`): ignora falsos positivos estructurales (tailwindcss y @tailwindcss/postcss se cargan vía PostCSS, tw-animate-css vía CSS `@import`, @types/node ambient, eslint-config-next requerido por `next lint`).
- **ts-prune 0.10**: ejecución manual; entries detectados son convenciones Next.js (`default`/`metadata` exports en `app/**/page.tsx`) y subcomponentes shadcn expuestos para consumo externo — sin deuda real.
- **ESLint**: regla `no-console: ["warn", { allow: ["warn", "error"] }]` añadida. `console.error` legítimo en `app/error.tsx` pasa.
- **Scripts**: `format`, `format:check`, `deadcode:deps`, `deadcode:exports` en [package.json](../package.json).

### Quality gate ejecutado (verde)

- `pnpm lint` → 0 errores, 0 warnings.
- `pnpm typecheck` → 0 errores.
- `pnpm format:check` → todos los archivos conformes (23 archivos reformateados en este pase).
- `pnpm deadcode:deps` → sin issues.
- `pnpm build` → 11 páginas estáticas generadas, export a `out/` sin warnings.

### Checklist ISO 25010 — firma pre-deploy

| Característica | Estado | Evidencia                                                                                                                                     |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Funcionalidad  | ✅     | 11 rutas estáticas renderizan; nav desktop+mobile, legales completos, JSON-LD validado.                                                       |
| Rendimiento    | ⏳     | CWV targets definidos en CLAUDE.md (LCP<2.0s desktop); Lighthouse pendiente post-deploy (Fase 4).                                             |
| Compatibilidad | ✅     | Next.js 15 static export + React 19; navegadores modernos; responsive con Tailwind v4.                                                        |
| Usabilidad     | ✅     | Test de 5 segundos superado; nav accesible; contenido legal en es-ES.                                                                         |
| Fiabilidad     | ✅     | Sin backend → superficie de fallo mínima; `app/error.tsx` + `app/not-found.tsx` cubren edge cases.                                            |
| Seguridad      | ✅     | CSP strict + HSTS preload + X-Frame-Options DENY ([vercel.json](../vercel.json)); `'unsafe-inline'` mitigado por ausencia de input y backend. |
| Mantenibilidad | ✅     | TS strict + `noUncheckedIndexedAccess`; ESLint flat + Prettier + depcheck limpios; estructura documentada en CLAUDE.md.                       |
| Portabilidad   | ✅     | Static export → cualquier CDN; sin envs requeridas en runtime; sin paths hardcoded.                                                           |

### Deuda técnica documentada (aceptada)

- **Sin tests automatizados**: ROI bajo para landing estática sin lógica de negocio; revaluar si se añade interactividad no trivial.
- **Sin CI pipeline**: el build de Vercel actúa como gate implícito; GitHub Actions con `lint + typecheck + format:check + build` es el siguiente paso natural post-deploy.
- **`next lint` deprecado**: warning de Next.js 16; migrar a ESLint CLI directo cuando se actualice el framework.

## 2026-04-11 — Split a repo standalone

- Extraído de `alexendros-monorepo@a180d73` como repositorio independiente.
- Reemplazadas dependencias `@repo/*` por equivalentes inline:
  - shadcn/ui → `components/ui/` (5 componentes activos: badge, button, card, separator, sheet).
  - tokens oklch → `app/globals.css` directo.
  - `cn()` helper → `lib/utils.ts`.
- `TASKS.md` creado con checklist de deploy Vercel + DNS.
- Sin dependencia de Turborepo ni workspaces pnpm.

## 2026-04-08 → 2026-04-09 — Fase 3 · MVP completo (3/3 planes)

Cierre de la Fase 3: shell de layout, contenido + legales, SEO y headers. 11 páginas estáticas, 0 errores TypeScript, build exportado a `out/`.

### Plan 01 — Shell de layout + hero (2026-04-08)

- `app/layout.tsx` refactor: eliminado `data-kit="stagekit"`; tokens `:root` oklch como paleta de marca personal.
- `lib/site.ts` con `siteConfig` (nav, legalNav, links, email, location).
- `components/nav.tsx` responsive (Sheet mobile, desktop links, `"use client"` por `usePathname`).
- `components/footer.tsx` Server Component con links legales y sociales (`target="_blank"` + `rel="noopener noreferrer"`).
- `app/page.tsx` hero + bio + projects preview + stack, Server Component, sin imágenes para LCP < 2 s.
- `lucide-react` como dependencia explícita (antes transitiva vía `@repo/ui`).

### Plan 02 — Páginas de contenido + legales (2026-04-09)

- 4 páginas de contenido: `/about` (narrativa 3 actos), `/projects` (portfolio alexendros.pro + alexendros.me), `/uses` (stack), `/contact` (mailto + socials, sin formulario).
- 3 páginas legales con contenido real:
  - `/legal/aviso-legal` — LSSI-CE Art. 10, NIF 21002968N (riesgo T-03-03 aceptado: requerido por ley).
  - `/legal/privacidad` — RGPD Art. 13, 8 secciones, SCCs, periodos de retención.
  - `/legal/cookies` — Guía AEPD 2023, inventario de cookies.
- `app/legal/layout.tsx` con tipografía manual vía variantes arbitrarias Tailwind (sin dependencia `@tailwindcss/typography`).
- Email `contacto@alexendros.me` expuesto en `/contact` (riesgo T-03-04 aceptado: contacto intencional).

### Plan 03 — SEO, headers y build verificado (2026-04-09)

- `lib/structured-data.ts` con `personJsonLd` + `websiteJsonLd` (schema Person + WebSite), inyectado en `app/layout.tsx` vía `dangerouslySetInnerHTML` (la metadata API no cubre scripts arbitrarios).
- `public/sitemap.xml` y `public/robots.txt` estáticos. Motivo: `output: "export"` en Next.js 15 no soporta `app/sitemap.ts` ni `app/robots.ts` como route handlers.
- `public/og/opengraph-image.png` (1200×630) pre-generada con ImageMagick. Motivo: `next/og ImageResponse` requiere runtime incompatible con static export.
- `vercel.json` con 6 security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, CSP con `'unsafe-inline'` documentado (hydration de Next.js + JSON-LD inline + Tailwind v4), HSTS 2 años + preload, `Referrer-Policy: strict-origin-when-cross-origin`, Permissions-Policy (camera/mic/geo bloqueados).

---

## Contexto de fase original

- Periodo: 2026-04-07 (contexto) → 2026-04-09 (cierre de Fase 3).
- Alcance: 3 planes, 8 páginas estáticas, SEO completo, security headers, build verificado.
- Tareas diferidas a post-MVP: analytics con consentimiento, animaciones complejas, i18n, blog/MDX, dynamic OG images.
- Deploy Vercel + DNS siempre fue user-setup manual (sin credenciales en código).
