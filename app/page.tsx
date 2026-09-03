import type { Metadata } from "next";
import { getContentCollection } from "@/lib/content/loader";
import { HomeContent } from "@/components/home-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [ideas, acciones] = await Promise.all([
    getContentCollection("ideas"),
    getContentCollection("acciones"),
  ]);

  const latestArticles = [
    ...ideas.slice(0, 3).map((item) => ({ ...item, type: "ideas" as const })),
    ...acciones.slice(0, 3).map((item) => ({ ...item, type: "acciones" as const })),
  ].sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return <HomeContent latestArticles={latestArticles} years={{ misionYear: "2024–" }} />;
}
