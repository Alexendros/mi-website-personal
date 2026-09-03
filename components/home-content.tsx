"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactFab } from "@/components/contact-fab";
import { StackMarquee } from "@/components/stack-marquee";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import type { getContentCollection } from "@/lib/content/loader";
import type { CollectionType } from "@/lib/content/types";

type ArticleSummary = Omit<Awaited<ReturnType<typeof getContentCollection>>[number], "content"> & {
  type: CollectionType;
};

interface HomeContentProps {
  latestArticles: ArticleSummary[];
  years: {
    misionYear: string;
  };
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface ExperienceSection {
  key: string;
  categoryKey: string;
  itemsKey: string;
}

const EXPERIENCE_SECTIONS: ExperienceSection[] = [
  {
    key: "formacion",
    categoryKey: "sections.expFormacion.category",
    itemsKey: "sections.expFormacion.items",
  },
  { key: "stack", categoryKey: "sections.expStack.category", itemsKey: "sections.expStack.items" },
  {
    key: "herramientas",
    categoryKey: "sections.expHerramientas.category",
    itemsKey: "sections.expHerramientas.items",
  },
];

export function HomeContent({ latestArticles, years }: HomeContentProps) {
  const { t, tArray, locale } = useI18n();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="site-shell hero-section">
        <div className="cluster-center">
          <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
        </div>
        <h1 className="hero-signature hero-signature--shimmer hero-animate">
          {t("hero.signature")}
        </h1>
        <p
          className="prose-lead"
          dangerouslySetInnerHTML={{
            __html: t("hero.lead").replace(
              "{link}",
              `<a href="https://alexendros.dev" target="_blank" rel="noopener noreferrer" class="brand-link">${t("hero.leadLink")}</a>`,
            ),
          }}
        />
        <p className="hero-tagline">{t("hero.tagline")}</p>
        <div className="cluster">
          <Button asChild>
            <a href={`mailto:${siteConfig.contact.email}`}>{t("hero.ctaContact")}</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#biografia">{t("hero.ctaAbout")}</a>
          </Button>
        </div>
      </section>

      <hr className="site-shell shrink-0 bg-border h-px w-full border-0" />

      {/* ── (Auto)biografía ────────────────────────────────── */}
      <section
        id="biografia"
        className="site-shell section section-below-fold scroll-section"
        aria-labelledby="h2-biografia"
      >
        <div className="content-container stack-lg">
          <h2 id="h2-biografia" className="headline">
            {t("sections.biografia.title")}
          </h2>
          <div className="stack-md prose">
            <p>{t("sections.biografia.p1")}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: t("sections.biografia.p2").replace(
                  "{link}",
                  `<a href="https://alexendros.dev" target="_blank" rel="noopener noreferrer" class="brand-link">${t("sections.biografia.p2Link")}</a>`,
                ),
              }}
            />
            <p>{t("sections.biografia.p3")}</p>
          </div>
        </div>
      </section>

      <hr className="site-shell shrink-0 bg-border h-px w-full border-0" />

      {/* ── Misiones ──────────────────────────────────────── */}
      <section
        id="misiones"
        className="site-shell section section-below-fold scroll-section"
        aria-labelledby="h2-misiones"
      >
        <div className="content-container stack-lg">
          <div className="section-head">
            <h2 id="h2-misiones" className="headline">
              {t("sections.misiones.title")}
            </h2>
            <p className="section-desc">{t("sections.misiones.desc")}</p>
          </div>

          <div className="stack-xl-gap">
            <div className="mission-card">
              <div className="mission-card__header">
                <div className="min-w-0">
                  <h3 className="card-title">{t("sections.misionAlexendrosDev.title")}</h3>
                  <p className="card-subtitle">{years.misionYear}</p>
                </div>
                <Badge variant="default" className="shrink-0">
                  {t("sections.misionAlexendrosDev.status")}
                </Badge>
              </div>
              <p className="card-body">{t("sections.misionAlexendrosDev.description")}</p>
              <div className="cluster-sm">
                {["Next.js", "Supabase", "Prisma", "Stripe", "Turborepo"].map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <a
                href="https://alexendros.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link brand-link"
              >
                alexendros.dev →
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="site-shell shrink-0 bg-border h-px w-full border-0" />

      {/* ── Experiencias ──────────────────────────────────── */}
      <section
        id="experiencias"
        className="site-shell section section-below-fold scroll-section"
        aria-labelledby="h2-experiencias"
      >
        <div className="content-container stack-xl">
          <div className="section-head">
            <h2 id="h2-experiencias" className="headline">
              {t("sections.experiencias.title")}
            </h2>
            <p className="section-desc">{t("sections.experiencias.desc")}</p>
          </div>

          {EXPERIENCE_SECTIONS.map(({ key, categoryKey, itemsKey }) => (
            <div key={key} className="exp-category">
              <h3 className="title">{t(categoryKey)}</h3>
              <ul className="exp-list">
                {tArray(itemsKey).map((item, i) => (
                  <li key={i} className="exp-item">
                    <span className="exp-arrow" aria-hidden="true">
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <hr className="site-shell shrink-0 bg-border h-px w-full border-0" />

      {/* ── Últimos ensayos ──────────────────────────────── */}
      <section
        id="publicaciones"
        className="site-shell section section-below-fold scroll-section"
        aria-labelledby="h2-publicaciones"
      >
        <div className="content-container stack-lg">
          <div className="section-head">
            <h2 id="h2-publicaciones" className="headline">
              {t("sections.publicaciones.title")}
            </h2>
            <p
              className="section-desc"
              dangerouslySetInnerHTML={{
                __html: t("sections.publicaciones.desc")
                  .replace(
                    "{ideasLink}",
                    `<a href="/ideas" class="brand-link">${t("sections.publicaciones.ideasLabel")}</a>`,
                  )
                  .replace(
                    "{accionesLink}",
                    `<a href="/acciones" class="brand-link">${t("sections.publicaciones.accionesLabel")}</a>`,
                  ),
              }}
            />
          </div>

          {latestArticles.length === 0 ? (
            <p className="empty-state">{t("sections.publicaciones.empty")}</p>
          ) : (
            <div className="stack-lg">
              {latestArticles.map((article) => (
                <article key={`${article.type}-${article.slug}`}>
                  <Link href={`/${article.type}/${article.slug}`} className="article-item">
                    <time dateTime={article.frontmatter.date} className="ds-caption">
                      {formatDate(article.frontmatter.date, locale)}
                    </time>
                    <h3 className="article-item__title">{article.frontmatter.title}</h3>
                    {article.frontmatter.description && (
                      <p className="article-item__desc">{article.frontmatter.description}</p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <hr className="site-shell shrink-0 bg-border h-px w-full border-0" />

      {/* ── StackMarquee ───────────────────────────────────── */}
      <section aria-labelledby="h2-stack-marquee" className="marquee-section">
        <h2 id="h2-stack-marquee" className="site-shell headline marquee-heading">
          {t("sections.stackMarquee.title")}
        </h2>
        <p className="site-shell prose-lead marquee-desc">{t("sections.stackMarquee.desc")}</p>
        <StackMarquee />
      </section>

      <div className="fab-stack" role="region" aria-label={t("contact.fabLabel")}>
        <ContactFab />
      </div>
    </>
  );
}
