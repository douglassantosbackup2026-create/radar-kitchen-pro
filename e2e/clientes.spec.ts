import { expect, test } from "@playwright/test";
import { cleanupByPrefix, expectToast, runId } from "./helpers";

test.describe.configure({ mode: "serial" });

test.describe("CRUD clientes", () => {
  let id: string;

  test.beforeAll(() => {
    id = runId();
  });

  test.afterAll(async () => {
    await cleanupByPrefix(id);
  });

  test("criar, editar e excluir cliente", async ({ page }) => {
    await page.goto("/app/clientes");
    await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible({ timeout: 30_000 });
    // Espera hidratação / dados (heading estático sozinho não basta)
    await expect(page.getByRole("heading", { name: "Carla", level: 2 })).toBeVisible({
      timeout: 30_000,
    });

    const form = page.locator("form").filter({
      has: page.getByRole("button", { name: /Adicionar cliente|Salvar alterações/ }),
    });
    await form.getByRole("textbox", { name: "Nome" }).fill(id);
    await form.getByRole("textbox", { name: "Telefone" }).fill("11999990000");
    await form.getByRole("textbox", { name: "Favorito" }).fill("Brownie");
    await expect(form.getByRole("textbox", { name: "Nome" })).toHaveValue(id);

    await form.getByRole("button", { name: "Adicionar cliente" }).click();
    await expectToast(page, "Cliente criado");
    await expect(page.getByRole("heading", { name: id, level: 2 })).toBeVisible({ timeout: 15_000 });

    const card = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: id, level: 2 }) });
    await card.getByRole("button", { name: "Editar" }).click();
    await expect(page.getByRole("button", { name: "Salvar alterações" })).toBeVisible();

    await form.getByRole("textbox", { name: "Telefone" }).fill("11888887777");
    await form.getByRole("button", { name: "Salvar alterações" }).click();
    await expectToast(page, "Cliente atualizado");
    await expect(page.getByText("11888887777")).toBeVisible({ timeout: 15_000 });

    const cardAtualizado = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: id, level: 2 }) });
    await cardAtualizado.getByRole("button", { name: "Excluir" }).click();
    await expectToast(page, "Cliente removido");
    await expect(page.getByRole("heading", { name: id, level: 2 })).toHaveCount(0, {
      timeout: 15_000,
    });
  });
});
