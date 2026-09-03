# Resultado del Audit — alexendros-me

Fecha: 2026-04-12
Rama: `audit/cleanup-20260412`

> **Auditoría histórica**: describe el estado del repositorio **antes** de la
> reconversión a espacio libre de dinero (2026-06-25) y del renombre de secciones
> v0.8.0 (2026-09-03). Las rutas `/about`, `/contact`, `/projects` y `/uses`
> citadas ya no existen: hoy el sitio es `alexendros.me` con las colecciones
> `/ideas` y `/acciones`. Consulta `docs/CHANGELOG.md` para la evolución.

## Estado del build

- TypeScript errors: **0**
- ESLint warnings: **0** (aviso informativo: `next lint` deprecado en Next 16 — pendiente migrar a ESLint CLI, no bloqueante).
- Build: `next build` → **OK**, 11 páginas generadas, 2 exportadas al directorio estático.
- Static export: `out/` contiene las 8 rutas públicas + 404 + JSON-LD + sitemap + robots + OG.

### Bundle sizes (post-build)

| Route                | Size    | First Load JS |
| -------------------- | ------- | ------------- |
| `/`                  | 609 B   | 185 kB        |
| `/_not-found`        | 135 B   | 102 kB        |
| `/about`             | 1.62 kB | 112 kB        |
| `/contact`           | 604 B   | 182 kB        |
| `/legal/aviso-legal` | 135 B   | 102 kB        |
| `/legal/cookies`     | 135 B   | 102 kB        |
| `/legal/privacidad`  | 135 B   | 102 kB        |
| `/projects`          | 277 B   | 173 kB        |
| `/uses`              | 604 B   | 182 kB        |
| Shared chunks (base) | —       | 102 kB        |

## Inventario canónico (Next.js 15 App Router + static export)

| Archivo / Dir                                                                                   | Estado    | Acción recomendada                                  |
| ----------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------- |
| `app/layout.tsx`                                                                                | Necesario | —                                                   |
| `app/page.tsx`                                                                                  | Necesario | Añadida metadata propia (fix aplicado)              |
| `app/error.tsx`                                                                                 | Necesario | **Creado en este audit**                            |
| `app/not-found.tsx`                                                                             | Necesario | —                                                   |
| `app/globals.css`                                                                               | Necesario | 27 CSS vars, todas usadas                           |
| `app/about/`, `/contact/`, `/projects/`, `/uses/`                                               | Necesario | Todas con metadata                                  |
| `app/legal/{aviso-legal,privacidad,cookies}/`                                                   | Necesario | LSSI-CE / RGPD / AEPD                               |
| `components/ui/{badge,button,card,separator,sheet}.tsx`                                         | Funcional | Todos consumidos                                    |
| `components/{nav,footer}.tsx`                                                                   | Funcional | —                                                   |
| `lib/{site,structured-data,utils}.ts`                                                           | Funcional | Todos los campos consumidos                         |
| `public/fonts/`, `public/og/`                                                                   | Necesario | Referenciados en layout                             |
| `public/{sitemap.xml,robots.txt}`                                                               | Necesario | Estáticos (output:export no soporta route handlers) |
| `vercel.json`                                                                                   | Necesario | 6 security headers                                  |
| `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `components.json`, `eslint.config.mjs` | Necesario | Config base                                         |
| `docs/history/phase-03-alexendros-me/`                                                          | Heredado  | **Eliminado tras síntesis en `docs/CHANGELOG.md`**  |

## Archivos eliminados / sintetizados

- `docs/history/phase-03-alexendros-me/` (7 archivos, ~1.6k líneas) → sintetizado en `docs/CHANGELOG.md` (92 líneas).
- `CLAUDE.md` §2 y §8: referencias `docs/history/` → `docs/CHANGELOG.md`.
- `README.md`: referencia `docs/history/` → `docs/CHANGELOG.md`.

## Fixes aplicados

- `app/error.tsx:1-40` — error boundary raíz client-side (botón `reset` + fallback a `/`). Muestra `error.message` solo en desarrollo.
- `app/page.tsx:1,12-16` — añadida `export const metadata` con `title: "Inicio"`, `description` de `siteConfig` y canonical `/`.
- `docs/CHANGELOG.md` — síntesis cronológica de los 3 SUMMARY + CONTEXT.
- `TASKS.md` — reestructurado con sección 7 de audit y fixes completados.

## Seguridad

| Ítem                                    | Estado | Detalle                                                                                                                                                                                                                                                                              |
| --------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CSP                                     | PASS   | `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (hydration Next + JSON-LD inline); `style-src 'self' 'unsafe-inline'` (Tailwind v4 inline); `img-src 'self' data:`; `font-src 'self'`; `connect-src 'self'`; `frame-ancestors 'none'`. Sin fuentes externas no declaradas. |
| HSTS                                    | PASS   | `max-age=63072000; includeSubDomains; preload` (2 años).                                                                                                                                                                                                                             |
| X-Frame-Options                         | PASS   | `DENY`.                                                                                                                                                                                                                                                                              |
| X-Content-Type-Options                  | PASS   | `nosniff`.                                                                                                                                                                                                                                                                           |
| Referrer-Policy                         | PASS   | `strict-origin-when-cross-origin`.                                                                                                                                                                                                                                                   |
| Permissions-Policy                      | PASS   | `camera=(), microphone=(), geolocation=()`.                                                                                                                                                                                                                                          |
| Error handling                          | PASS   | `app/error.tsx` + `app/not-found.tsx` presentes.                                                                                                                                                                                                                                     |
| JSON-LD serialización                   | PASS   | 2 scripts (`Person`, `WebSite`) en `out/index.html`; `JSON.stringify` limpio sin caracteres conflictivos.                                                                                                                                                                            |
| Hardcoded colors fuera de tokens        | PASS   | 0 ocurrencias de `oklch(` / `#hex` / `rgb(` en `components/` ni `app/*/page.tsx`.                                                                                                                                                                                                    |
| Assets externos no declarados           | PASS   | 0 — todo local (`public/fonts`, `public/og`).                                                                                                                                                                                                                                        |
| `localhost` / paths absolutos en `out/` | PASS   | 0 (solo aparece como keyword en polyfills de Next — falso positivo esperado).                                                                                                                                                                                                        |

## Riesgo aceptado (documentado)

- CSP con `'unsafe-inline'` para `script-src` y `style-src`. Motivo: Next.js 15 hydration inline scripts + JSON-LD (`dangerouslySetInnerHTML` en `app/layout.tsx`) + Tailwind v4 estilos inline. Sin input de usuario ni backend — superficie de ataque mínima.
- NIF 21002968N expuesto en `/legal/aviso-legal` — requerido por LSSI-CE Art. 10.
- Email `contacto@alexendros.me` expuesto en `/contact` — contacto intencional.

## Pendientes (no bloqueantes)

Priorizados en `TASKS.md` tras este audit:

- P1 — Deploy Vercel + DNS `alexendros.me` (secciones 1-3 de TASKS).
- P1 — Lighthouse audit post-deploy (sección 4).
- P2 — Rotar `/projects` con casos reales (lexactu, afiladocs, argus).
- P2 — Verificar `sameAs` del JSON-LD Person.
- P3 — Analytics privacy-first con consentimiento.
- P5 — GitHub Actions CI, Dependabot.
- P6 — Migrar `next lint` → ESLint CLI cuando se actualice a Next 16.
