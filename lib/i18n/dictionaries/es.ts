import type { TranslationDict } from "../types";

const es: TranslationDict = {
  locale: {
    name: "Español",
    short: "ES",
  },

  // ── Nav ────────────────────────────────────────────────
  nav: {
    biografia: "(Auto)biografía",
    misiones: "Misiones",
    experiencias: "Experiencias",
    productos: "Productos",
    productosLabel: "Hub de productos — alexendros.dev",
    menuLabel: "Abrir menú",
    menuCloseLabel: "Cerrar menú",
    navLabel: "Navegación principal",
    logoLabel: "Alexendros — volver al inicio",
    skipToContent: "Saltar al contenido",
    now: "Ahora",
  },

  // ── Hero ────────────────────────────────────────────────
  hero: {
    eyebrow: "Valencia · pensamiento, soberanía digital y libertades",
    signature: "Alexendros. Grandes soluciones de un ingenio no previsto.",
    lead: "Espacio personal y libre de dinero: humanismo, soberanía digital y crítica tecnológica. Lo que se vende vive en {link}; aquí solo se piensa, se escribe y se comparte.",
    leadLink: "alexendros.dev",
    tagline: "Ánimo de todo tipo. Lucro ni idea de quién es.",
    ctaContact: "Convócame",
    ctaAbout: "Conóceme",
  },

  // ── Home sections ───────────────────────────────────────
  sections: {
    biografia: {
      title: "(Auto)biografía",
      p1: "Me llamo Alejandro Domingo Agustí, aunque en la red respondo a Alexendros. Nací en Valencia y he pasado de la hostelería y la gestión al desarrollo de software, sin título intermedio que lo justifique: aprendí a leer negocios antes que a escribir código, y luego escribí código para entender los negocios.",
      p2: "Este sitio es mi espacio libre de dinero: aquí no se vende nada, solo se piensa en voz alta sobre soberanía digital, privacidad, software libre y crítica tecnológica. No creo en la tecnología neutral, ni en la inevitabilidad del progreso. Creo en elegir con criterio, autohospedar lo crítico y mantener la libertad como variable de diseño. Si quieres lo comercial, está en {link}; si quieres lo que pienso sin filtro, quédate aquí.",
      p2Link: "alexendros.dev",
      p3: "Mi trabajo técnico gira en torno a Next.js, TypeScript, Supabase y Stripe, pero este proyecto es un acto de racionalidad límite: un sitio estático, sin analytics invasivos ni dependencias que no pueda justificar. Escribo para quienes sospechan de la narrativa oficial de la innovación y prefieren protocolos abiertos a plataformas cerradas.",
    },
    misiones: {
      title: "Misiones",
      desc: "Compromisos reales. Público cuando hay algo operativo, no antes.",
    },
    misionAlexendrosDev: {
      title: "alexendros.dev",
      status: "En construcción",
      description:
        "Mi proyecto comercial, a propósito fuera de este espacio: lo que se cobra y se vende vive allí, no en el .me.",
    },
    experiencias: {
      title: "Experiencias",
      desc: "Lo extra-laboral que me ha formado, el stack que uso y los aliados que recomiendo.",
    },
    expFormacion: {
      category: "Formación de base",
      items: [
        "Años en hostelería, gestión y atención al cliente — aprendí a leer negocios antes que a escribir código.",
        "Transición al software: autodidacta intensivo. Next.js, Supabase, Stripe, Docker.",
        "Primer proyecto freelance. Apertura del repositorio público. Decisión firme de trabajar en abierto.",
      ],
    },
    expStack: {
      category: "Stack actual",
      items: [
        "Next.js 16 App Router · TypeScript strict · React 19",
        "Supabase (Postgres + Auth + Storage + RLS)",
        "Stripe (Subscriptions + Connect Express)",
        "Tailwind CSS v4 · shadcn/ui · Radix UI",
        "Turborepo · Vercel · GitHub Actions",
        "Playwright · Vitest",
      ],
    },
    expHerramientas: {
      category: "Herramientas de mi día a día",
      items: [
        "Claude Code y OpenCode — Mi apoyo en el desarrollo de código y producción de proyectos.",
        "Proton.me — Mail, VPN, Drive, IA... todo un ecosistema privado alojado en Suiza con cifrado de alta seguridad.",
        "Hostinger — Dominios cuando necesito control total y precio honesto.",
        "GitHub — Aquí encontrarás casi todos mis trabajos y proyectos de software, los cuales trato de tratar con la máxima profesionalidad sin pérdida de contenido original y soluciones creativas.",
      ],
    },
    publicaciones: {
      title: "Últimos ensayos",
      desc: "Lo último en {ideasLink} y {accionesLink}.",
      ideasLabel: "Ideas",
      accionesLabel: "Acciones",
      empty: "No hay publicaciones aún.",
    },
    stackMarquee: {
      title: "Mis tecnologías favoritas",
      desc: "El stack con el que construyo, en movimiento.",
    },
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    legalNavLabel: "Navegación legal",
    avisoLegal: "Aviso legal",
    privacidad: "Privacidad",
    cookies: "Cookies",
    seguridad: "Seguridad",
    hubProductos: "Hub de productos → alexendros.dev",
    hubLabel: "Hub de productos — alexendros.dev",
    copyright:
      "· Alejandro Domingo Agustí · Anticomercial: cópialo, úsalo, compártelo. No comercies con ello. F.A.F.O.",
    quote: "¿De qué sirve el dinero a quien no sabe usarlo? Ya lo tengo yo.",
  },

  // ── Anti-monetization banner ────────────────────────────
  antiMonetization: {
    text: "Este espacio es libre de {strong}. Sin anuncios, sin afiliados, sin tracking.",
    strong: "monetización",
    link: "Lo comercial vive en alexendros.dev",
    dismissLabel: "Cerrar aviso de espacio libre de monetización",
  },

  // ── Theme toggle ────────────────────────────────────────
  theme: {
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
    ariaLabel: "Tema actual: {theme}. Click para cambiar.",
  },

  // ── Locale toggle ───────────────────────────────────────
  localeToggle: {
    ariaLabel: "Idioma actual: {locale}. Cambiar idioma.",
  },

  // ── Collection pages ────────────────────────────────────
  collection: {
    label: "Colección",
    empty: "No hay artículos publicados aún.",
    backHome: "← Volver al inicio",
  },

  // ── Article pages ────────────────────────────────────────
  article: {
    backIdeas: "← Volver a Ideas",
    backAcciones: "← Volver a Acciones",
    tagsLabel: "Etiquetas",
    minutesShort: "min de lectura",
    tocTitle: "En este artículo",
  },

  // ── /now page ──────────────────────────────────────────
  now: {
    title: "/now",
    desc: "Qué estoy haciendo ahora. Inspirado por la idea de Derek Sivers (sive.rs/now).",
    lastUpdatedPrefix: "Actualizado:",
    sectionBuilding: "Construyendo",
    buildingItems:
      "alexendros.dev — Mi hub de productos comerciales (Next.js, Supabase, Stripe) · website-alexendros.me — Este sitio, siempre en evolución",
    sectionReading: "Leyendo",
    readingItems: "La renta básica — Daniel Raventós · Technopoly — Neil Postman",
    sectionFocus: "Enfoque",
    focusItems:
      "Soberanía digital y protocolos abiertos · Crítica tecnológica materialista · Desarrollo de software ético y sostenible",
    footerBack: "← Volver al inicio",
    empty: "Actualización en progreso — vuelve pronto.",
  },

  // ── Tags page ───────────────────────────────────────────
  tags: {
    indexTitle: "Etiquetas",
    detailLabel: "Etiqueta",
    indexEmpty: "No hay etiquetas aún.",
    backToTags: "← Todas las etiquetas",
    countLabelOne: "etiqueta",
    countLabelMany: "etiquetas",
    detailCountOne: "artículo con esta etiqueta",
    detailCountMany: "artículos con esta etiqueta",
  },

  // ── PWA ─────────────────────────────────────────────────
  pwa: {
    updateReady: "Nueva versión disponible",
    updateApply: "Actualizar",
    updateDismiss: "Más tarde",
  },

  // ── Search ───────────────────────────────────────────────
  search: {
    trigger: "Buscar",
    triggerAria: "Abrir búsqueda",
    placeholder: "Busca en artículos...",
    noResults: 'No se encontraron resultados para "{query}".',
    results: '{count} resultado(s) para "{query}"',
    sectionIdeas: "Ideas",
    sectionAcciones: "Acciones",
    shortcut: "Buscar (⌘K)",
  },

  // ── Errors ──────────────────────────────────────────────
  errors: {
    notFoundTitle: "Página no encontrada",
    notFoundDesc: "Esta página no existe o fue movida.",
    notFoundCta: "Volver al inicio",
    errorTitle: "Algo salió mal",
    errorDesc: "Ha ocurrido un error inesperado. Intenta de nuevo.",
    errorCta: "Volver al inicio",
  },

  // ── Contact ─────────────────────────────────────────────
  contact: {
    fabLabel: "Acciones de contacto",
    emailLabel: "Enviar correo",
    telegramLabel: "Telegram",
    statusPreparacion: "En preparación",
    statusProximamente: "Próximamente",
    contactame: "Contáctame",
  },
};

export default es;
