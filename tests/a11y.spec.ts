import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "home", path: "/" },
  { name: "ideas (collection)", path: "/ideas" },
  { name: "ideas: crítica tecnológica", path: "/ideas/critica-tecnologica" },
  { name: "ideas: manifiesto elígete a ti", path: "/ideas/manifiesto-eligete-a-ti" },
  { name: "ideas: soberanía digital", path: "/ideas/soberania-digital" },
  { name: "acciones (collection)", path: "/acciones" },
  { name: "acciones: escape del feudo", path: "/acciones/escape-del-feudo-algoritmico" },
  { name: "acciones: protocolos vs plataformas", path: "/acciones/protocolos-vs-plataformas" },
  { name: "now", path: "/now" },
  { name: "tags (index)", path: "/tags" },
  { name: "tags: Alexendros", path: "/tags/Alexendros" },
  { name: "tags: algoritmos", path: "/tags/algoritmos" },
  { name: "legal: aviso legal", path: "/legal/aviso-legal" },
  { name: "legal: privacidad", path: "/legal/privacidad" },
  { name: "legal: cookies", path: "/legal/cookies" },
  { name: "legal: seguridad", path: "/legal/seguridad" },
  { name: "error 404", path: "/nonexistent-page" },
];

for (const { name, path } of pages) {
  test.describe(`a11y WCAG 2.1 AA · ${name}`, () => {
    test("sin violaciones axe-core", async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      if (results.violations.length > 0) {
        const summary = results.violations
          .map(
            (v) =>
              `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target.join(", ")).join(" | ")}`,
          )
          .join("\n\n");
        console.error(`Violations on ${path}:\n${summary}`);
      }

      expect(results.violations).toHaveLength(0);
    });
  });
}
