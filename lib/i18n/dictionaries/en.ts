import type { TranslationDict } from "../types";

const en: TranslationDict = {
  locale: {
    name: "English",
    short: "EN",
  },

  // ── Nav ────────────────────────────────────────────────
  nav: {
    biografia: "(Auto)biography",
    misiones: "Missions",
    experiencias: "Experiences",
    productos: "Products",
    productosLabel: "Product hub — alexendros.dev",
    menuLabel: "Open menu",
    menuCloseLabel: "Close menu",
    navLabel: "Main navigation",
    logoLabel: "Alexendros — back to home",
    skipToContent: "Skip to content",
    now: "Now",
  },

  // ── Hero ────────────────────────────────────────────────
  hero: {
    eyebrow: "Valencia · thought, digital sovereignty & freedoms",
    signature: "Alexendros. Great solutions from unforeseen ingenuity.",
    lead: "Personal, money-free space: humanism, digital sovereignty and technological critique. The commercial stuff lives at {link}; here I only think, write, and share.",
    leadLink: "alexendros.dev",
    tagline: "All kinds of spirit. Profit — no idea who that is.",
    ctaContact: "Summon me",
    ctaAbout: "Get to know me",
  },

  // ── Home sections ───────────────────────────────────────
  sections: {
    biografia: {
      title: "(Auto)biography",
      p1: "My name is Alejandro Domingo Agustí, though online I go by Alexendros. Born in Valencia, I went from hospitality and management to software development, with no degree in between to justify it: I learned to read businesses before writing code, and then wrote code to understand businesses.",
      p2: "This site is my money-free space: nothing is sold here, I just think out loud about digital sovereignty, privacy, free software, and technological critique. I don't believe in neutral technology, nor in the inevitability of progress. I believe in choosing with criteria, self-hosting what's critical, and keeping freedom as a design variable. If you want the commercial side, it's at {link}; if you want what I think unfiltered, stay here.",
      p2Link: "alexendros.dev",
      p3: "My technical work revolves around Next.js, TypeScript, Supabase and Stripe, but this project is an act of bounded rationality: a static site, without invasive analytics or dependencies I can't justify. I write for those who suspect the official innovation narrative and prefer open protocols over closed platforms.",
    },
    misiones: {
      title: "Missions",
      desc: "Real commitments. Public when there's something operational, not before.",
    },
    misionAlexendrosDev: {
      title: "alexendros.dev",
      status: "Under construction",
      description:
        "My commercial project, deliberately outside this space: what's charged and sold lives there, not on the .me.",
    },
    experiencias: {
      title: "Experiences",
      desc: "The non-work experiences that shaped me, the stack I use, and the allies I recommend.",
    },
    expFormacion: {
      category: "Foundational training",
      items: [
        "Years in hospitality, management and customer service — I learned to read businesses before writing code.",
        "Transition to software: intensive self-taught. Next.js, Supabase, Stripe, Docker.",
        "First freelance project. Opened public repository. Firm decision to work in the open.",
      ],
    },
    expStack: {
      category: "Current stack",
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
      category: "My daily tools",
      items: [
        "Claude Code and OpenCode — My coding and project production companions.",
        "Proton.me — Mail, VPN, Drive, AI... a complete private ecosystem hosted in Switzerland with high-security encryption.",
        "Hostinger — Domains when I need full control and honest pricing.",
        "GitHub — You'll find almost all my work and software projects here, which I strive to handle with maximum professionalism without losing original content and creative solutions.",
      ],
    },
    publicaciones: {
      title: "Latest essays",
      desc: "The latest from {ideasLink} and {accionesLink}.",
      ideasLabel: "Ideas",
      accionesLabel: "Acciones",
      empty: "No posts yet.",
    },
    stackMarquee: {
      title: "My favorite technologies",
      desc: "The stack I build with, in motion.",
    },
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    legalNavLabel: "Legal navigation",
    avisoLegal: "Legal notice",
    privacidad: "Privacy",
    cookies: "Cookies",
    seguridad: "Security",
    hubProductos: "Product hub → alexendros.dev",
    hubLabel: "Product hub — alexendros.dev",
    copyright:
      "· Alejandro Domingo Agustí · Anti-commercial: copy it, use it, share it. Don't trade with it. F.A.F.O.",
    quote: "What use is money to those who don't know how to use it? I already have it.",
  },

  // ── Anti-monetization banner ────────────────────────────
  antiMonetization: {
    text: "This space is free of {strong}. No ads, no affiliates, no tracking.",
    strong: "monetization",
    link: "The commercial stuff lives at alexendros.dev",
    dismissLabel: "Close monetization-free notice",
  },

  // ── Theme toggle ────────────────────────────────────────
  theme: {
    system: "System",
    light: "Light",
    dark: "Dark",
    ariaLabel: "Current theme: {theme}. Click to change.",
  },

  // ── Locale toggle ───────────────────────────────────────
  localeToggle: {
    ariaLabel: "Current language: {locale}. Change language.",
  },

  // ── Collection pages ────────────────────────────────────
  collection: {
    label: "Collection",
    empty: "No articles published yet.",
    backHome: "← Back to home",
  },

  // ── Article pages ────────────────────────────────────────
  article: {
    backIdeas: "← Back to Ideas",
    backAcciones: "← Back to Acciones",
    tagsLabel: "Tags",
    minutesShort: "min read",
    tocTitle: "On this page",
  },

  // ── /now page ──────────────────────────────────────────
  now: {
    title: "/now",
    desc: "What I'm doing now. Inspired by Derek Sivers' idea (sive.rs/now).",
    lastUpdatedPrefix: "Updated:",
    sectionBuilding: "Building",
    buildingItems:
      "alexendros.dev — My commercial products hub (Next.js, Supabase, Stripe) · website-alexendros.me — This site, always evolving",
    sectionReading: "Reading",
    readingItems: "La renta básica — Daniel Raventós · Technopoly — Neil Postman",
    sectionFocus: "Focus",
    focusItems:
      "Digital sovereignty and open protocols · Materialist tech critique · Ethical and sustainable software development",
    footerBack: "← Back to home",
    empty: "Update in progress — check back soon.",
  },

  // ── Tags page ───────────────────────────────────────────
  tags: {
    indexTitle: "Tags",
    detailLabel: "Tag",
    indexEmpty: "No tags yet.",
    backToTags: "← All tags",
    countLabelOne: "tag",
    countLabelMany: "tags",
    detailCountOne: "article with this tag",
    detailCountMany: "articles with this tag",
  },

  // ── PWA ─────────────────────────────────────────────────
  pwa: {
    updateReady: "New version available",
    updateApply: "Update",
    updateDismiss: "Later",
  },

  // ── Search ───────────────────────────────────────────────
  search: {
    trigger: "Search",
    triggerAria: "Open search",
    placeholder: "Search articles...",
    noResults: 'No results found for "{query}".',
    results: '{count} result(s) for "{query}"',
    sectionIdeas: "Ideas",
    sectionAcciones: "Acciones",
    shortcut: "Search (⌘K)",
  },

  // ── Errors ──────────────────────────────────────────────
  errors: {
    notFoundTitle: "Page not found",
    notFoundDesc: "This page doesn't exist or has moved.",
    notFoundCta: "Back to home",
    errorTitle: "Something went wrong",
    errorDesc: "An unexpected error occurred. Please try again.",
    errorCta: "Back to home",
  },

  // ── Contact ─────────────────────────────────────────────
  contact: {
    fabLabel: "Contact actions",
    emailLabel: "Send email",
    telegramLabel: "Telegram",
    statusPreparacion: "Preparing",
    statusProximamente: "Coming soon",
    contactame: "Contact me",
  },
};

export default en;
