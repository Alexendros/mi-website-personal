import fs from "node:fs/promises";
import path from "node:path";
import { getContentCollection, getRawContent } from "@/lib/content/loader";
import type { CollectionType } from "@/lib/content/types";

interface SearchIndexItem {
  slug: string;
  type: CollectionType;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---\n/m, "") // remove frontmatter (already parsed)
    .replace(/[#*`~>_()!-]/g, " ") // remove markdown syntax
    .replace(/\n{2,}/g, " ") // collapse paragraphs
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

async function main() {
  const collections: CollectionType[] = ["ideas", "acciones"];
  const index: SearchIndexItem[] = [];

  for (const type of collections) {
    const items = await getContentCollection(type);
    for (const item of items) {
      const full = await getRawContent(type, item.slug);
      if (!full) continue;

      const contentStripped = stripMarkdown(full.content);
      // Take first 500 chars for the search index
      const content = contentStripped.slice(0, 500);

      index.push({
        slug: item.slug,
        type,
        title: item.frontmatter.title,
        description: item.frontmatter.description ?? "",
        tags: item.frontmatter.tags,
        content,
      });
    }
  }

  const outputPath = path.join(process.cwd(), "public", "search-index.json");
  await fs.writeFile(outputPath, JSON.stringify(index), "utf-8");

  console.log(
    `Search index generated: public/search-index.json (${index.length} articles, ${Buffer.byteLength(JSON.stringify(index), "utf-8")} bytes)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
