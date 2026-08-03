import { expect, test } from "@playwright/test";
import {
  cleanupByPrefix,
  expectToast,
  progressoDesafio,
  runId,
} from "./helpers";

const SLUG = "brownie-dubai";
const DESAFIO_FAT = "Fature R$3.000 no mês";
const DESAFIO_QTD = "Venda 20 brownies";

test.describe.configure({ mode: "serial" });

test.describe("desafios", () => {
  let id: string;

  test.beforeAll(() => {
    id = runId();
  });

  test.afterAll(async () => {
    await cleanupByPrefix(id);
  });

  test("lançamento de entrada aumenta progresso de faturamento", async ({ page }) => {
    await page.goto("/app/desafios");
    const antes = await progressoDesafio(page, DESAFIO_FAT);

    await page.goto("/app/financeiro");
    await expect(page.getByRole("heading", { name: "Financeiro" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Entrou hoje")).toBeVisible({ timeout: 30_000 });
    // Evita fill apagado por remount/hidratação
    await page.waitForTimeout(500);

    await page.getByLabel("Tipo").selectOption("entrada");
    const desc = page.getByLabel("Descrição");
    await desc.click();
    await desc.pressSequentially(id, { delay: 15 });
    await page.getByLabel("Produto").click();
    await page.getByLabel("Produto").pressSequentially("Brownie Dubai", { delay: 10 });
    await page.getByLabel("Valor").click();
    await page.getByLabel("Valor").pressSequentially("1", { delay: 10 });
    await expect(desc).toHaveValue(id);
    await page.getByRole("button", { name: "Registrar" }).click();
    await expect(desc).toHaveValue("", { timeout: 20_000 });

    await page.goto("/app/desafios");
    const depois = await progressoDesafio(page, DESAFIO_FAT);
    expect(depois).toBeGreaterThan(antes);
  });

  test("pedido de brownie sobe progresso e exclusão reverte", async ({ page }) => {
    await page.goto("/app/desafios");
    const antes = await progressoDesafio(page, DESAFIO_QTD);

    await page.goto(`/app/calculadoras?produto=${SLUG}`);
    await expect(page.getByLabel("Produto para calcular")).toBeVisible({ timeout: 30_000 });
    await page.getByLabel("Cliente").fill(id);
    await page.getByLabel("Qtd").fill("1");
    await page.getByRole("button", { name: "Criar pedido" }).click();
    await expectToast(page, "Pedido criado");

    await page.goto("/app/desafios");
    const depois = await progressoDesafio(page, DESAFIO_QTD);
    expect(depois).toBeGreaterThan(antes);

    await page.goto("/app/pedidos");
    await expect(page.getByText(id, { exact: true })).toBeVisible({ timeout: 30_000 });
    const row = page.locator("tr").filter({ has: page.getByText(id, { exact: true }) });
    await row.getByRole("button", { name: "Excluir" }).click();
    await expectToast(page, "Pedido excluído");

    await page.goto("/app/desafios");
    const final = await progressoDesafio(page, DESAFIO_QTD);
    expect(final).toBe(antes);
  });
});
