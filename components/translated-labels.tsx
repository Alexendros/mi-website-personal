"use client";

import { useI18n } from "@/lib/i18n";

/** Renders the "Colección" / "Collection" label */
export function CollectionLabel() {
  const { t } = useI18n();
  return <>{t("collection.label")}</>;
}

/** Renders the empty state message */
export function CollectionEmpty() {
  const { t } = useI18n();
  return <>{t("collection.empty")}</>;
}

/** Renders "← Volver al inicio" / "← Back to home" */
export function BackHomeLabel() {
  const { t } = useI18n();
  return <>{t("collection.backHome")}</>;
}

/** Renders "← Volver a Ideas" / "← Back to Ideas" */
export function BackIdeasLabel() {
  const { t } = useI18n();
  return <>{t("article.backIdeas")}</>;
}

/** Renders "← Volver a Acciones" / "← Back to Acciones" */
export function BackAccionesLabel() {
  const { t } = useI18n();
  return <>{t("article.backAcciones")}</>;
}

/** Renders the aria-label for tags */
export function TagsLabel() {
  const { t } = useI18n();
  return <>{t("article.tagsLabel")}</>;
}

/** Renders "{N} min de lectura" / "{N} min read" for collection rows */
export function ReadingTime({ minutes }: { minutes: number }) {
  const { t } = useI18n();
  return (
    <span>
      <span aria-hidden="true">·</span> {minutes} {t("article.minutesShort")}
    </span>
  );
}

/** Locale-aware count + label picker (e.g. "5 tags" vs "1 tag").
 *  keyPathOne and keyPathMany are full dotted paths into the dictionaries.
 *  Always includes the numeric count; only the label switches between
 *  singular ("tag") and plural ("tags"). Caller composes surrounding sentence. */
export function pluralizeWithCount(count: number, keyPathOne: string, keyPathMany: string): string {
  const { t } = useI18n();
  return `${count} ${count === 1 ? t(keyPathOne) : t(keyPathMany)}`;
}

/** Renders the tags index heading + count (e.g. "5 etiquetas en total.").
 *  If count === 0, renders the empty-state message instead (defensive — callers
 *  can keep early-returning on empty as app/tags/page.tsx does today). */
export function TagsIndexHeader({ count }: { count: number }) {
  const { t } = useI18n();
  if (count === 0) {
    return (
      <header className="collection-header">
        <h1 className="headline">{t("tags.indexTitle")}</h1>
        <p className="empty-state">{t("tags.indexEmpty")}</p>
      </header>
    );
  }
  return (
    <header className="collection-header">
      <h1 className="headline">{t("tags.indexTitle")}</h1>
      <p className="prose-lead collection-desc">
        {pluralizeWithCount(count, "tags.countLabelOne", "tags.countLabelMany")} en total.
      </p>
    </header>
  );
}

/** Renders the tag-page header: "Etiqueta" / "Tag" + "#name" + count line */
export function TagPageHeader({ tag, count }: { tag: string; count: number }) {
  const { t } = useI18n();
  return (
    <header className="collection-header">
      <p className="ds-label collection-label">{t("tags.detailLabel")}</p>
      <h1 className="headline">#{tag}</h1>
      <p className="prose-lead collection-desc">
        {pluralizeWithCount(count, "tags.detailCountOne", "tags.detailCountMany")}.
      </p>
    </header>
  );
}

/** Renders "← Todas las etiquetas" / "← All tags" link back from tag detail */
export function BackToTagsLabel() {
  const { t } = useI18n();
  return <>{t("tags.backToTags")}</>;
}

/** Renders the tags-index empty-state message */
export function TagsEmpty() {
  const { t } = useI18n();
  return <>{t("tags.indexEmpty")}</>;
}

/** Locales-aware <time>: format an ISO date using the active locale */
export function LocalDate({ date }: { date: string }) {
  const { locale } = useI18n();
  const dateLocale = locale === "en" ? "en-US" : "es-ES";
  return (
    <time dateTime={date} className="ds-caption">
      {new Date(date).toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
}
