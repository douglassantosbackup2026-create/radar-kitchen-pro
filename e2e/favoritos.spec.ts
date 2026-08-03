import { expect, test } from "@playwright/test";
import { expectToast, removeFavorito } from "./helpers";

test.describe.configure({ mode: "serial" });

test.describe("favoritos", () => {
  let slug: string | null = null;
  let nome: string | null = null;

  test.afterAll(async () => {
    if (slug) await removeFavorito(slug);
  });

  test("favoritar, filtrar e desfavoritar", async ({ page }) => {
    await page.goto("/app/oportunidades");
    await expect(page.getByRole("heading", { name: "Oportunidades" })).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.locator("div.group").first()).toBeVisible({ timeout: 30_000 });

    if ((await page.getByLabel("Adicionar aos favoritos").count()) === 0) {
      await page.getByLabel("Remover dos favoritos").first().click();
      await expectToast(page, "Removido dos favoritos");
    }

    const botaoAdd = page.getByLabel("Adicionar aos favoritos").first();
    await expect(botaoAdd).toBeVisible({ timeout: 15_000 });

    const card = page.locator("div.group").filter({ has: botaoAdd }).first();
    nome = (await card.locator("h3").textContent())?.trim() ?? null;
    const href = await card.locator('a[href*="/app/oportunidades/"]').getAttribute("href");
    slug = href?.split("/").pop()?.split("?")[0] ?? null;
    expect(slug).toBeTruthy();
    expect(nome).toBeTruthy();

    await botaoAdd.click();
    await expectToast(page, "Adicionado aos favoritos");

    await page.goto("/app/favoritos");
    await expect(page).toHaveURL(/fav=/, { timeout: 15_000 });
    await expect(page.getByRole("heading", { name: nome!, level: 3 })).toBeVisible({
      timeout: 15_000,
    });

    const favCard = page
      .locator("div.group")
      .filter({ has: page.getByRole("heading", { name: nome!, level: 3 }) });
    await favCard.getByLabel("Remover dos favoritos").click();
    await expectToast(page, "Removido dos favoritos");
    await expect(page.getByRole("heading", { name: nome!, level: 3 })).toHaveCount(0, {
      timeout: 15_000,
    });
  });
});
