import { ImageResponse } from "next/og";
import { getRawContent, getContentCollection } from "@/lib/content/loader";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = await getContentCollection("acciones");
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function AccionesOG({ params }: Props) {
  const { slug } = await params;
  const article = await getRawContent("acciones", slug);

  const title = article?.frontmatter.title ?? "Acciones";
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
        background: "linear-gradient(135deg, #0f1a17 0%, #182620 100%)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Top branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#67d9b2",
          fontSize: "20px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>Alexendros</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.7 }}>Acciones</span>
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
            color: "#eaf5f0",
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
              color: "#88a098",
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
          color: "#586b63",
          fontSize: "18px",
        }}
      >
        {date && <span>{date}</span>}
      </div>
    </div>,
    { ...size },
  );
}
