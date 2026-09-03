import { test, expect } from "@playwright/test";

test("homepage tiene biografía, metadatos y sección de últimos ensayos", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Alexendros/);
  await expect(page.locator("h1")).toContainText("Alexendros");

  const bio = page.locator("#biografia");
  await expect(bio).toBeVisible();
  const bioText = await bio.innerText();
  expect(bioText.split(/\s+/).length).toBeGreaterThan(150);

  const latest = page.locator("section", { hasText: "Últimos ensayos" });
  await expect(latest).toBeVisible();
  await expect(latest.locator('a[href="/ideas"]')).toBeVisible();
  await expect(latest.locator('a[href="/acciones"]')).toBeVisible();
});
