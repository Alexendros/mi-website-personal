import fs from "node:fs/promises";
import path from "node:path";
import { generateFeeds, generateCollectionFeeds } from "@/lib/feed";
import { getContentCollection } from "@/lib/content/loader";
import { siteConfig } from "@/lib/site";

async function main() {
  const [ideas, acciones] = await Promise.all([
    getContentCollection("ideas"),
    getContentCollection("acciones"),
  ]);

  // Master feed (all articles)
  const { rss, atom } = generateFeeds({ site: siteConfig, collections: { ideas, acciones } });
  await fs.writeFile(path.join(process.cwd(), "public", "feed.xml"), rss, "utf-8");
  await fs.writeFile(path.join(process.cwd(), "public", "feed.atom"), atom, "utf-8");

  // Per-collection feeds
  const { rss: ideasRss, atom: ideasAtom } = generateCollectionFeeds(
    siteConfig,
    "ideas",
    "Ideas",
    ideas,
  );
  await fs.writeFile(path.join(process.cwd(), "public", "feed-ideas.xml"), ideasRss, "utf-8");
  await fs.writeFile(path.join(process.cwd(), "public", "feed-ideas.atom"), ideasAtom, "utf-8");

  const { rss: accRss, atom: accAtom } = generateCollectionFeeds(
    siteConfig,
    "acciones",
    "Acciones",
    acciones,
  );
  await fs.writeFile(path.join(process.cwd(), "public", "feed-acciones.xml"), accRss, "utf-8");
  await fs.writeFile(path.join(process.cwd(), "public", "feed-acciones.atom"), accAtom, "utf-8");

  console.log("Feeds generated:");
  console.log("  public/feed.xml + public/feed.atom (master)");
  console.log("  public/feed-ideas.xml + public/feed-ideas.atom");
  console.log("  public/feed-acciones.xml + public/feed-acciones.atom");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
