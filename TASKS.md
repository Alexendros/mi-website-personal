# TASKS — website-alexendrosme

Lista viva de pendientes del repositorio standalone `website-alexendrosme`
(alexendros.me · espacio libre de dinero).

---

## 1. Infraestructura git ✅ (2026-04-12)

- [x] Repo creado: `github.com/Alexendros/PersonaWeb` (hoy `Iniciativas-Alexendros/website-alexendrosme`).
- [x] `main` pusheado, PR de audit mergeado.
- [x] Proteger `main` en GitHub (require PR + 1 review, status checks build/e2e/lhci, enforce admins).

## 2. Deploy Vercel ✅ (2026-04-12)

- [x] Proyecto importado (team `alexendros`).
- [x] Next.js preset, `npm run build`, **Output Directory vacío** (Vercel detecta `output: "export"`).
- [x] Sin variables de entorno.
- [x] Build verde, 11 páginas, first deploy OK.

## 3. DNS alexendros.me ✅ (2026-04-12)

- [x] Dominio custom añadido en Vercel (apex primary, www 308 → apex).
- [x] DNS Hostinger: `@` A → `216.198.79.1`, `www` CNAME → `40de9f12f17c018a.vercel-dns-017.com.`
- [x] SSL automático activo, HSTS preload live.
- [x] Validado: HTTP/2 200, CSP + HSTS + X-Frame-Options DENY + Permissions-Policy + Referrer-Policy.
- [x] `/sitemap.xml` y `/robots.txt` sirviendo 200.

## 4. Post-deploy — validaciones ✅

- [x] **Lighthouse audit** (2026-04-13): Desktop Perf 99 · A11y 96 · BP 100 · SEO 100; Mobile Perf 99 · A11y 96 · BP 100 · SEO 100.
- [x] **A11y color-contrast** (2026-06-13): `npm run test:e2e a11y` → 12/12 sin violaciones axe WCAG 2.1 AA.
- [x] **SEO**: `/sitemap.xml` y `/robots.txt` → HTTP/2 200 (2026-04-12).
- [x] **Smoke test** (2026-06-25): 14 rutas → 200 (home, 6× `/espensar`/`/esposible`, 3× `/legal/*`, robots, sitemap).
- [x] **JSON-LD**: Person + WebSite en la home, schema válido. Validación manual vía validator.schema.org queda como paso opcional.
- [x] **OG image**: `public/og/opengraph-image.png` configurada (OpenGraph + Twitter card).
- [x] IndexNow: key enviada a api.indexnow.org (202) y bing.com/indexnow (202). GSC requiere submit manual.

## 5. Mejoras aplicadas (2026-04-13 → 2026-06-13)

- [x] Preload de fuentes Geist (`next/font/local`).
- [x] `sameAs` JSON-LD verificado (GitHub, LinkedIn, X/Twitter).
- [ ] Analytics privacy-first (Plausible EU / Umami) con consentimiento explícito.
- [ ] Link real al hub `alexendros.dev` cuando esté deployado (bloqueado externo).
- [x] Microanimaciones con `tw-animate-css` (motion-safe).
- [x] StackMarquee "Mi caja de herramientas" entre Misiones y Experiencias.
- [x] Subida visual (shimmer oro, tarjetas glass, `--ease-spring`), reduced-motion intacto.

## 6. Higiene del repo ✅ (2026-04-12)

- [x] GitHub Actions CI: typecheck + lint + build (`.github/workflows/ci.yml`).
- [x] `.github/pull_request_template.md`.
- [x] Dependabot npm (weekly) + github-actions (monthly). _Migrado a Renovate (2026-08)._

## 7. Audit 2026-04-12 ✅

- [x] Auditoría de estructura canónica Next.js + shadcn.
- [x] Imports no usados (0), componentes UI huérfanos (0), CSS vars muertas (0).
- [x] `docs/history/` sintetizado en `docs/CHANGELOG.md` y eliminado.
- [x] `app/error.tsx` creado, `app/page.tsx` con metadata explícita.
- [x] Build verde: typecheck 0 errores, lint 0 warnings.

---

## 8. Reconversión `.me` → espacio libre de dinero ✅ (2026-06-25)

> Cambio de rumbo: el `.me` deja de ser landing comercial y pasa a contenido
> personal **antidinero**. Plan completo en `docs/reconversion-me.md`.

- [x] Plan estructural redactado (`docs/reconversion-me.md`).
- [x] Decisiones del autor (§6): afiliados fuera, **licencia = CC BY-NC-SA 4.0** (sello €Ç en el footer), `knowsAbout` reorientado a soberanía digital + filosofía política.
- [x] Purga de venta/afiliados (Proton, Hostinger, referral Claude).
- [x] Departamento de contenido `/espensar` + `/esposible` (MDX).
- [x] Reorientar `lib/site.ts` (sin vocabulario pro; la tech como materia de crítica).
- [x] Pieza divulgativa de cookies (capa manifiesto + capa formal).

---

## 9. Auditoría PROFUNDA + Saneamiento ✅ (2026-07-15)

> Informe en `AUDITORIA-CRITICA.md`. 6 defectos encontrados, 6 corregidos.

- [x] DEFECTO-001: Shell injection en release.yml (inputs → env).
- [x] DEFECTO-002: CSS huérfano en components.css (4 declaraciones sueltas).
- [x] DEFECTO-003: Dependabot sin cooldown (añadido 7 días).
- [x] DEFECTO-004: GitHub Actions sin pin a SHA (pineados).
- [x] DEFECTO-005: Propiedad CSS duplicada en marquee-section.
- [x] DEFECTO-006: CI schedule oversampling (30min → 6h).
- [x] DEFECTO-007: Descartado — JSON-LD presente y válido.
- [x] Magnificación 1: `gray-matter`, `theme.js` anti-flash, `content-visibility`.
- [x] Magnificación 2: budgets Lighthouse, sitemap segmentado, validación JSON-LD en CI.
- [x] Magnificación 3: a11y en CI, `health-check.sh`.
- [x] Verificación: build ✅, 38/38 tests, ESLint ✅, TS ✅, JSON-LD ✅, a11y ✅, visual 12/12.

## 10. Limpieza de ramas + worktree ✅ (2026-07-16)

- [x] Ramas remotas huérfanas eliminadas, worktree freebuff eliminado.
- [x] 2 stashes preservados.
- [x] Vercel Web Analytics cherry-pickeado a main (`@vercel/analytics` v1.4.1).
- [x] CHANGELOG.md actualizado con todas las entradas de v0.5.0.
- [x] RELEASE.md: procedimiento de release documentado.

---

## 11. v0.8.0 · Renombre Ideas y Acciones ✅ (2026-09-03)

> `/espensar` → `/ideas`, `/esposible` → `/acciones`. Etiquetas "Ideas"/"Acciones" en ES y EN.

- [x] Renombre de carpetas `app/` + `content/` (slugs intactos: manifiesto-eligete-a-ti, soberania-digital, critica-tecnologica, protocolos-vs-plataformas, escape-del-feudo-algoritmico).
- [x] Código: `CollectionType`, loader, og-image (IDEAS_THEME/ACCIONES_THEME), i18n es/en, translated-labels, home-content, search-dialog, colecciones + `[slug]` + opengraph-image.
- [x] Scripts: sitemap (sitemap-ideas.xml / sitemap-acciones.xml), search-index, feeds (feed-ideas.* / feed-acciones.*); `sw.js` precache.
- [x] Redirecciones 308 en vercel.json (4 rutas legacy).
- [x] Assets regenerados (build + `npx tsx scripts/generate-feeds.ts`).
- [x] 10 ficheros de test actualizados.
- [x] **Tests reparados bajo Node 26**: `vitest.setup.ts` (mock localStorage) → 259/259 passed.
- [x] CI verde: typecheck, lint, build, verify:vercel, deadcode.
- [x] Licencia unificada **CC BY-NC-SA 4.0** (LICENSE + package.json + README).
- [x] Versión unificada **v0.8.0** (package.json, package-lock, README badge, CHANGELOG).
- [x] Página Notion **"Website Alexendros.Me · Espacio libre de dinero"** con método de baterías de preguntas + contraste con IA de Notion.
- [x] Docs corregidas: ROADMAP, ARCHITECTURE, docs/README, CHANGELOG.

---

## 12. Próximas subfases (v0.8.x → v0.9.0)

### 12.1 Contenido Ideas / Acciones

- [ ] Aplicar la batería de preguntas (tesis en una frase, objeción más fuerte y respuesta, evidencia concreta, conexión con el espacio libre de dinero, acción concreta, título honesto) a cada nueva pieza.
- [ ] Contraste de cada pieza contra la IA de Notion antes de publicar (validar realismo y atacar la tesis).
- [ ] Primera pieza nueva de `Ideas` siguiendo el método (MDX en `content/ideas/`).
- [ ] Primera pieza nueva de `Acciones` siguiendo el método (MDX en `content/acciones/`).

### 12.2 Calidad y CI

- [ ] Verificar `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` antes de cada release.
- [ ] Regenerar feeds/sitemaps tras añadir piezas (`npm run build` + `npx tsx scripts/generate-feeds.ts`).

### 12.3 Privacidad y hub

- [ ] Decidir y, en su caso, integrar analytics privacy-first con consentimiento.
- [ ] Validación manual JSON-LD (validator.schema.org).
- [ ] Sincronización de contenido con `alexendros.dev` (bloqueado externo).

---

_Última actualización: 2026-09-03 — v0.8.0 · Renombre Ideas y Acciones, página Notion creada, licencia CC BY-NC-SA 4.0, docs corregidas. CI en verde (typecheck, lint, 259 tests, build). Salud del proyecto: 9.8/10._
