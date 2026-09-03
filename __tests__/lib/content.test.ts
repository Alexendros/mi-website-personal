import { vi, describe, it, expect } from "vitest";
import fs from "fs/promises";
import {
  calculateReadingTime,
  getContentCollection,
  getRawContent,
  getAllSlugs,
  getAllTags,
  getArticlesByTag,
  getRelatedContent,
} from "@/lib/content/loader";

describe("calculateReadingTime", () => {
  it("returns 1 for ~200 words", () => {
    expect(calculateReadingTime(Array(200).fill("w").join(" "))).toBe(1);
  });

  it("returns 2 for ~400 words", () => {
    expect(calculateReadingTime(Array(400).fill("w").join(" "))).toBe(2);
  });

  it("returns minimum 1 for empty content", () => {
    expect(calculateReadingTime("")).toBe(1);
  });

  it("strips markdown formatting before counting", () => {
    const md = "# Title\n\nSome **bold** text and `code`.";
    const minutes = calculateReadingTime(md);
    expect(minutes).toBeGreaterThanOrEqual(1);
  });

  it("counts words across whitespace including newlines", () => {
    const text = "word1\nword2\n\nword3\nword4";
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("strips fenced code blocks completely", () => {
    const longCodeBlock = "```\n" + Array(500).fill("inside-code").join(" ") + "\n```";
    expect(calculateReadingTime(longCodeBlock)).toBe(1);
  });
});

describe("getContentCollection", () => {
  it("assigns readingTime to each item", async () => {
    const items = await getContentCollection("ideas");
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(typeof item.readingTime).toBe("number");
      expect(item.readingTime).toBeGreaterThanOrEqual(1);
    }
  });

  it("returns items sorted newest first", async () => {
    const items = await getContentCollection("ideas");
    expect(items.length).toBeGreaterThan(0);
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1]?.frontmatter.date ?? "";
      const curr = items[i]?.frontmatter.date ?? "";
      expect(new Date(prev).getTime()).toBeGreaterThanOrEqual(new Date(curr).getTime());
    }
  });

  it("filters out draft articles", async () => {
    const items = await getContentCollection("ideas");
    for (const item of items) {
      expect(item.frontmatter.draft).toBe(false);
    }
  });

  it("returns items with slug derived from filename", async () => {
    const items = await getContentCollection("ideas");
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(typeof item.slug).toBe("string");
      expect(item.slug).not.toContain(".mdx");
      expect(item.slug).not.toContain(".md");
    }
  });
});

describe("getContentCollection error paths", () => {
  it("returns empty array when readdir throws ENOENT", async () => {
    const spy = vi.spyOn(fs, "readdir").mockRejectedValue({
      code: "ENOENT",
      message: "ENOENT: no such file or directory",
    } as NodeJS.ErrnoException);

    const result = await getContentCollection("ideas");
    expect(result).toEqual([]);

    spy.mockRestore();
  });

  it("re-throws non-ENOENT errors", async () => {
    const spy = vi.spyOn(fs, "readdir").mockRejectedValue(new Error("disk failure"));

    await expect(getContentCollection("ideas")).rejects.toThrow("disk failure");

    spy.mockRestore();
  });
});

describe("getRawContent", () => {
  it("returns null for non-existent slug", async () => {
    const result = await getRawContent("ideas", "this-slug-does-not-exist-xyz-99999");
    expect(result).toBeNull();
  });

  it("returns null for non-existent slug in other collection", async () => {
    const result = await getRawContent("acciones", "this-slug-does-not-exist-xyz-99999");
    expect(result).toBeNull();
  });

  it("returns null for draft articles", async () => {
    const spy = vi
      .spyOn(fs, "readFile")
      .mockResolvedValue(
        `---\ntitle: Draft Article\ndate: 2026-06-15T00:00:00.000Z\ndescription: A draft\ntags: [test]\ndraft: true\n---\nThis is a draft.`,
      );

    const result = await getRawContent("ideas", "__test-draft-999__");
    expect(result).toBeNull();

    spy.mockRestore();
  });

  it("handles invalid frontmatter by returning null", async () => {
    const spy = vi
      .spyOn(fs, "readFile")
      .mockResolvedValue(
        `---\ndate: 2026-06-15T00:00:00.000Z\ntags: []\ndraft: false\n---\nContent without title field`,
      );

    const result = await getRawContent("ideas", "__test-invalid-999__");
    expect(result).toBeNull();

    spy.mockRestore();
  });

  it("caches article data with content", async () => {
    const result = await getRawContent("ideas", "critica-tecnologica");
    expect(result).not.toBeNull();
    expect(result?.content).toBeTruthy();
    expect(typeof result?.content).toBe("string");
    expect(result?.slug).toBe("critica-tecnologica");
    expect(result?.frontmatter.title).toBeTruthy();
  });
});

describe("getAllSlugs", () => {
  it("returns all slugs for a collection", async () => {
    const slugs = await getAllSlugs("ideas");
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(typeof slug).toBe("string");
    }
  });

  it("returns unique slugs", async () => {
    const slugs = await getAllSlugs("ideas");
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("returns different slugs per collection", async () => {
    const ideas = await getAllSlugs("ideas");
    const acciones = await getAllSlugs("acciones");
    expect(ideas).not.toEqual(acciones);
  });
});

describe("getRelatedContent", () => {
  it("returns empty for non-existent slug", async () => {
    const result = await getRelatedContent("ideas", "non-existent-slug");
    expect(result).toEqual([]);
  });

  it("excludes the current article from results", async () => {
    const items = await getContentCollection("ideas");
    if (items.length === 0) return;
    const target = items[0] as (typeof items)[number];
    const result = await getRelatedContent("ideas", target.slug);
    expect(result.find((r) => r.slug === target.slug)).toBeUndefined();
  });

  it("returns articles sorted by tag overlap descending", async () => {
    const items = await getContentCollection("ideas");
    if (items.length === 0) return;
    const target = items[0] as (typeof items)[number];
    const result = await getRelatedContent("ideas", target.slug);
    if (result.length < 2) return; // skip if not enough articles to sort

    const currentTags = new Set(target.frontmatter.tags);
    let prevScore = Infinity;
    for (const article of result) {
      const score = article.frontmatter.tags.filter((t) => currentTags.has(t)).length;
      expect(score).toBeLessThanOrEqual(prevScore);
      prevScore = score;
    }
  });

  it("respects the limit parameter", async () => {
    const items = await getContentCollection("acciones");
    if (items.length === 0) return;
    const target = items[0] as (typeof items)[number];
    const result = await getRelatedContent("acciones", target.slug, 1);
    expect(result.length).toBeLessThanOrEqual(1);
  });

  it("defaults to limit of 3", async () => {
    const items = await getContentCollection("ideas");
    if (items.length === 0) return;
    const target = items[0] as (typeof items)[number];
    const result = await getRelatedContent("ideas", target.slug);
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

describe("getAllTags", () => {
  it("returns sorted unique tags", async () => {
    const tags = await getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    const sorted = [...tags].sort((a, b) => a.localeCompare(b, "es"));
    expect(tags).toEqual(sorted);
    expect(new Set(tags).size).toBe(tags.length);
  });
});

describe("getArticlesByTag", () => {
  it("returns empty for unknown tag", async () => {
    const articles = await getArticlesByTag("nonexistent-tag-xyz-12345");
    expect(articles).toEqual([]);
  });

  it("filters by tag and sorts newest first", async () => {
    const tags = await getAllTags();
    const target = tags[0];
    if (target === undefined) return;
    const articles = await getArticlesByTag(target);
    expect(articles.length).toBeGreaterThan(0);
    for (const a of articles) {
      expect(a.frontmatter.tags).toContain(target);
    }
    for (let i = 1; i < articles.length; i++) {
      const prev = articles[i - 1]?.frontmatter.date ?? "";
      const curr = articles[i]?.frontmatter.date ?? "";
      expect(new Date(prev).getTime()).toBeGreaterThanOrEqual(new Date(curr).getTime());
    }
  });
});
