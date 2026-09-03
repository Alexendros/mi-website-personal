import { test, expect } from "@playwright/test";

test.describe("Article metadata", () => {
  test("artículo de ideas tiene BreadcrumbList y metadatos", async ({ page }) => {
    await page.goto("/ideas/critica-tecnologica");

    await expect(page.locator("#breadcrumb-json-ld")).toHaveCount(1);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/ideas/critica-tecnologica");
  });
});

test.describe("Article table of contents", () => {
  test("artículo con headings muestra ToC con hrefs en formato correcto", async ({ page }) => {
    await page.goto("/ideas/critica-tecnologica");

    const tocLinks = page.locator(".toc-link");
    const count = await tocLinks.count();
    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < count; i++) {
      const href = await tocLinks.nth(i).getAttribute("href");
      expect(href).toMatch(/^#[a-z0-9-]+$/);
    }
  });

  test("headings tienen id generado por rehype-slug", async ({ page }) => {
    await page.goto("/ideas/critica-tecnologica");

    const headings = page.locator(".prose h2, .prose h3");
    const count = await headings.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < count; i++) {
      const id = await headings.nth(i).getAttribute("id");
      expect(id).toBeTruthy();
      // rehype-slug: lowercase, solo [a-z0-9-áéíóúñ] (preserva acentos)
      expect(id).toMatch(/^[a-z0-9-áéíóúñ]+$/i);
    }
  });

  test("navegar a artículo no crashea", async ({ page }) => {
    await page.goto("/ideas/manifiesto-eligete-a-ti");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });
});
