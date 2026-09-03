/* sw.js — Alexendros.me Service Worker v1
 *
 * Estrategia:
 *  - Assets versionados (/_next/static/, /fonts/): cache-first
 *  - HTML (navegación): network-first con fallback a caché (incluyendo "/" offline shell)
 *  - /sw.js y /workbox-*.js: NUNCA cacheados
 *  - Otros: network passthrough
 *
 * Auto-update: skipWaiting + clients.claim al activar.
 * Mensaje SKIP_WAITING desde cliente para forzar activación inmediata.
 */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `ax-static-${CACHE_VERSION}`;
const NAV_CACHE = `ax-nav-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/ideas",
  "/acciones",
  "/now",
  "/manifest.json",
  "/icon.svg",
];

const STATIC_PATTERNS = [
  /^\/_next\/static\//,
  /^\/fonts\//,
  /^\/og\//,
  /^\/search-index\.json$/,
];

const NEVER_CACHE = [/^\/sw\.js$/, /^\/workbox-.*\.js$/];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {
        // Precache failures son no-fatales — la red sirve los routes en next request.
      }),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (k) =>
              k.startsWith("ax-") && ![STATIC_CACHE, NAV_CACHE].includes(k),
          )
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Solo same-origin
  if (url.origin !== self.location.origin) return;

  // NUNCA cachear el SW o workbox
  if (NEVER_CACHE.some((re) => re.test(url.pathname))) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.method !== "GET") return;

  // Assets estáticos: cache-first
  if (STATIC_PATTERNS.some((re) => re.test(url.pathname))) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches
              .open(STATIC_CACHE)
              .then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      }),
    );
    return;
  }

  // Navegaciones HTML: network-first con fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches
              .open(NAV_CACHE)
              .then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return (
            caches.match("/") ||
            new Response("Offline", {
              status: 503,
              statusText: "Service Unavailable",
            })
          );
        }),
    );
    return;
  }

  // Resto: network passthrough
  event.respondWith(fetch(event.request));
});
