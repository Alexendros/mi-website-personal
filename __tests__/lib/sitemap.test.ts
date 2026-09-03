import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function runSitemapScript(): void {
  execFileSync("npx", ["tsx", "scripts/generate-sitemap.ts"], {
    stdio: "pipe",
  });
}

function readFile(name: string): string {
  return fs.readFileSync(path.join(process.cwd(), "public", name), "utf-8");
}

describe("generate-sitemap", () => {
  it("writes index + 3 segmented sitemaps", () => {
    runSitemapScript();
    for (const f of [
      "sitemap.xml",
      "sitemap-pages.xml",
      "sitemap-ideas.xml",
      "sitemap-acciones.xml",
    ]) {
      expect(fs.existsSync(path.join(process.cwd(), "public", f))).toBe(true);
    }
  });

  it("index references all three sub-sitemaps", () => {
    const xml = readFile("sitemap.xml");
    expect(xml).toContain("sitemap-pages.xml");
    expect(xml).toContain("sitemap-ideas.xml");
    expect(xml).toContain("sitemap-acciones.xml");
  });

  it("pages sitemap includes /now and /tags", () => {
    const xml = readFile("sitemap-pages.xml");
    expect(xml).toContain("https://alexendros.me/now");
    expect(xml).toContain("https://alexendros.me/tags");
    expect(xml).toContain("https://alexendros.me/");
    expect(xml).toContain("https://alexendros.me/legal/aviso-legal");
  });

  it("article sitemaps include image: namespace", () => {
    const esp = readFile("sitemap-ideas.xml");
    expect(esp).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
    expect(esp).toMatch(/<image:image>[\s\S]*<\/image:image>/);
    const spos = readFile("sitemap-acciones.xml");
    expect(spos).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
  });

  it("article image:loc points to /opengraph-image.png (root OG)", () => {
    const esp = readFile("sitemap-ideas.xml");
    const locations = esp.match(/<image:loc>([^<]+)<\/image:loc>/g) ?? [];
    expect(locations.length).toBeGreaterThan(0);
    for (const loc of locations) {
      expect(loc).toContain("/opengraph-image.png");
      expect(loc).not.toContain("/[slug]/opengraph-image.png");
    }
  });

  it("XML is well-formed (basic structural check)", () => {
    const indexXml = readFile("sitemap.xml");
    expect(indexXml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(indexXml).toMatch(/<sitemapindex[^>]*>/);
    expect(indexXml.endsWith("</sitemapindex>\n")).toBe(true);

    for (const f of ["sitemap-pages.xml", "sitemap-ideas.xml", "sitemap-acciones.xml"]) {
      const xml = readFile(f);
      expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
      expect(xml).toMatch(/<urlset[^>]*>/);
      expect(xml.endsWith("</urlset>\n")).toBe(true);
    }
  });
});
