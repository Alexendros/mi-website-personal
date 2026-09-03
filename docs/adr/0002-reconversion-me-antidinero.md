# 0002. Reconversión de alexendros.me a espacio personal libre de dinero

- Estado: proposed
- Fecha: 2026-06-07
- Decisores: Alexendros
- Etiquetas: arquitectura, contenido, identidad

> **Actualización 2026-06-15**: el dominio comercial de referencia pasó de
> `alexendros.pro` a **`alexendros.dev`**. Las menciones a `alexendros.pro` en
> este ADR (registro fechado el 2026-06-07) deben leerse como `alexendros.dev`.
> El sitio en producción ya está unificado a `.dev`.

> **Actualización 2026-09-03 (v0.8.0)**: las rutas planificadas `/espensar` y
> `/esposible` se implementaron y posteriormente se renombraron a **`/ideas`** y
> **`/acciones`** (redirecciones 308 en `vercel.json`). Las fases 2/3/4 del plan
> original están completadas; el desarrollo de contenido continúa bajo los
> nombres `ideas`/`acciones`.

> Texto en formato MADR 4.0.0 · https://adr.github.io/madr/
>
> Plan operativo de detalle (inventario de purga línea a línea, arquitectura de
> directorios, fases): [`docs/reconversion-me.md`](../reconversion-me.md).

## Contexto y planteamiento del problema

`alexendros.me` y `alexendros.pro` deben ser dos cosas distintas, pero hoy no lo
son. El `.me` es, de facto, una **landing comercial que duplica el discurso de
`.pro`**: hero de venta (_"construyo, opero y cobro en mi propio SaaS"_, CTA
_"Convócame"_, consultoría), tabla comparativa "Alexendros vs Dev genérico",
**enlaces de afiliado monetizados** (Proton, Hostinger, referral de Claude) y
copyright restrictivo (_"Todos los derechos reservados"_).

El propósito declarado del dominio `.me` es el contrario: un espacio personal
**libre de dinero** (antidinero), de carácter ideológico, filosófico, nacional y
social. Lo comercial pertenece a `.pro`.

Restricciones del repo que condicionan la decisión: sitio **estático puro**
(`output: 'export'`), **sin backend / API / middleware**, repo público (sin
secretos), reglas de UI (colores solo vía tokens) y de SEO/legal vigentes.

Además, la documentación del propio repo describía una estructura inexistente
(rutas `/about`, `/projects`, `/uses`, `/contact`), lo que añade deuda de
trazabilidad.

## Drivers de la decisión

- Separación nítida de identidad: `.me` (antidinero) vs `.pro` (comercial).
- Coherencia entre discurso y código: nada de venta, afiliación ni tracking en
  el `.me`.
- Necesidad de un sistema de contenido escalable para ensayos (ideológicos,
  filosóficos, etc.) sin romper el export estático.
- Posicionamiento natural (SEO honesto) con rutas reales indexables.
- Mantener intacta la base sólida ya existente (headers, Lighthouse ~99, CSS
  departamentado, ausencia real de tracking).

## Opciones consideradas

- **A. Reconversión profunda**: purgar venta/afiliados, reorientar identidad,
  añadir el pensamiento (`/espensar`, MDX) y lo posible (`/esposible`) como
  rutas reales.
- **B. Capa ideológica encima**: añadir una sección sin tocar el resto.
- **C. Status quo**: mantener el `.me` como landing comercial.

## Resultado de la decisión

Opción elegida: **"A. Reconversión profunda"**, porque es la única que resuelve
la contradicción de raíz entre el propósito del dominio y su contenido actual, y
porque el autor define antidinero como rechazo activo (no mera ausencia) de la
monetización en este dominio.

Ejecución por fases (detalle en `docs/reconversion-me.md`):

1. ✅ **Hecha** — Estructura + saneado de documentación + ADR + README
   reescrito + nombres esPensar/esPosible fijados (esta PR).
2. ⏳ Purga de venta/afiliados + montaje de `/espensar` (MDX) y `/esposible` +
   reorientación de `lib/site.ts` y `lib/structured-data.ts`.
3. ⏳ Contenido (portada, `/sobre`, pieza de cookies, piezas de esPensar).
4. ⏳ Cierre: SEO (Article schema, sitemap dinámico), Lighthouse, deploy.

### Consecuencias positivas

- El `.me` cumple su propósito: espacio libre de dinero, sin tracking, con
  contenido propio.
- Mejor SEO natural (rutas reales vs anclas) y contenido escalable en MDX.
- Documentación veraz y trazable.

### Consecuencias negativas

- Pérdida de los ingresos por afiliación que hoy existen en el `.me` (asumido y
  alineado con la identidad antidinero; lo comercial migra a `.pro`).
- Trabajo de migración (rutas, loader de contenido, reescritura de copy).

## Validación

- `pnpm build` verde con export estático tras cada fase.
- Ausencia de afiliados/tracking verificable en el árbol y en cabeceras HTTP.
- Lighthouse ≥ 90 mantenido; rutas `/espensar`, `/espensar/[slug]`, `/esposible`, `/sobre`
  servidas 200 e indexables.
- Documentación (CLAUDE.md, TASKS.md) coincide con el árbol real.

## Pros y contras de las opciones

### A. Reconversión profunda

- Bueno, porque alinea por completo identidad y código.
- Bueno, porque deja base de contenido escalable.
- Malo, porque es la opción con más trabajo y elimina ingresos por afiliación.

### B. Capa ideológica encima

- Bueno, porque es incremental y de bajo riesgo.
- Malo, porque la contradicción de fondo (venta/afiliados) persiste.

### C. Status quo

- Bueno, porque no requiere esfuerzo.
- Malo, porque el `.me` sigue siendo una copia comercial de `.pro`.

## Más información

- Plan operativo: [`docs/reconversion-me.md`](../reconversion-me.md).
- PR de la fase 1: Alexendros/website-alexendrosme#54.
- Convención: `CONTRIBUTING.md` §14-15 (ADR/MADR para decisiones de arquitectura).
