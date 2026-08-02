import { expect, test } from "@playwright/test";

test("landing carrega", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
});

test("app início carrega", async ({ page }) => {
  await page.goto("/app");
  await expect(page.getByRole("heading", { name: /Bom dia/i })).toBeVisible({ timeout: 30_000 });
});

test("calculadoras mostra seletor de produto", async ({ page }) => {
  await page.goto("/app/calculadoras");
  await expect(page.getByLabel("Produto para calcular")).toBeVisible({ timeout: 30_000 });
});
