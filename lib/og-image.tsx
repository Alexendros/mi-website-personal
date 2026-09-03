import { ImageResponse } from "next/og";
import { getRawContent } from "@/lib/content/loader";

export const OG_SIZE = { width: 1200, height: 630 };
export const CONTENT_TYPE = "image/png";

export interface OGTheme {
  /** Gradient background, e.g. "linear-gradient(135deg, #17130f 0%, #2a2318 100%)" */
  background: string;
  /** Accent color for branding (label + separator), e.g. "#d9b267" */
  accent: string;
  /** Title text color, e.g. "#f5f0ea" */
  title: string;
  /** Description text color, e.g. "#a09888" */
  description: string;
  /** Muted color for metadata (date), e.g. "#6b6358" */
  muted: string;
}

export const IDEAS_THEME: OGTheme = {
  background: "linear-gradient(135deg, #17130f 0%, #2a2318 100%)",
  accent: "#d9b267",
  title: "#f5f0ea",
  description: "#a09888",
  muted: "#6b6358",
};

export const ACCIONES_THEME: OGTheme = {
  background: "linear-gradient(135deg, #0f1a17 0%, #182620 100%)",
  accent: "#67d9b2",
  title: "#eaf5f0",
  description: "#88a098",
  muted: "#586b63",
};

export interface OGImageProps {
  collection: "ideas" | "acciones";
  slug: string;
  theme: OGTheme;
  sectionLabel: string;
}

/**
 * Genera una ImageResponse OG para un artículo de una colección.
 * Compartido entre app/ideas/[slug]/opengraph-image.tsx
 * y app/acciones/[slug]/opengraph-image.tsx.
 */
export async function ogImageResponse({
  collection,
  slug,
  theme,
  sectionLabel,
}: OGImageProps): Promise<ImageResponse> {
  const article = await getRawContent(collection, slug);

  const title = article?.frontmatter.title ?? sectionLabel;
  const description = article?.frontmatter.description ?? "";
  const date = article?.frontmatter.date
    ? new Date(article.frontmatter.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: theme.background,
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Top branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: theme.accent,
          fontSize: "20px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>Alexendros</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.7 }}>{sectionLabel}</span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "90%",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: theme.title,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: "24px",
              color: theme.description,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom: date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: theme.muted,
          fontSize: "18px",
        }}
      >
        {date && <span>{date}</span>}
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
