import { z } from "zod";

export const FrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().datetime(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
  canonical: z.string().url().optional(),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export interface ContentItem {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTime: number;
}

export type CollectionType = "ideas" | "acciones";
