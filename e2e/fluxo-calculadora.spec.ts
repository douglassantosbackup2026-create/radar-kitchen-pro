import { expect, test } from "@playwright/test";
import {
  cleanupByPrefix,
  deleteIdsNotIn,
  expectToast,
  listCompraIds,
  listTarefaIds,
  runId,
} from "./helpers";

const SLUG = "brownie-dubai";
const NOME = "Brownie Dubai";

test.describe.configure({ mode: "serial" });

test.describe("fluxo calculadora", () => {
  let id: string;
  let comprasBefore: string[];
  let tarefasBefore: string[];

  test.beforeAll(async () => {
    id = runId();
    comprasBefore = await listCompraIds();
    tarefasBefore = await listTarefaIds();
  });

  test.afterAll(async () => {
    await cleanupByPrefix(id);
    await deleteIdsNotIn("itens_compra", comprasBefore);
    await deleteIdsNotIn("tarefas_producao", tarefasBefore);
  });

  test("oportunidade → calculadora → compras / produção / pedido", async ({ page }) => {
    await page.goto(`/app/oportunidades/${SLUG}`);
    await expect(page.getByRole("heading", { name: NOME })).toBeVisible({ timeout: 30_000 });
    await page.getByRole("link", { name: "Abrir na calculadora" }).click();

    await expect(page).toHaveURL(new RegExp(`/app/calculadoras`));
    await expect(page.getByLabel("Produto para calcular")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByLabel("Produto para calcular")).toHaveValue(SLUG);

    await page.getByRole("button", { name: "Enviar para Compras" }).click();
    await expectToast(page, /item\(ns\) adicionados|Nada novo/);

    await page.getByRole("link", { name: "Ver compras" }).click();
    await expect(page.getByRole("heading", { name: "Compras" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(/Chocolate|Manteiga|Ovos|Embalagem/).first()).toBeVisible({
      timeout: 15_000,
    });

    await page.goto(`/app/calculadoras?produto=${SLUG}`);
    await expect(page.getByLabel("Produto para calcular")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Montar produção" }).click();
    await expectToast(page, /tarefa\(s\) na produção|Produção já montada/);

    await page.getByRole("link", { name: "Ver produção" }).click();
    await expect(page.getByRole("heading", { name: "Produção" })).toBeVisible({ timeout: 30_000 });
    await expect(page.locator("ul li").first()).toBeVisible({ timeout: 15_000 });

    await page.goto(`/app/calculadoras?produto=${SLUG}`);
    await expect(page.getByLabel("Produto para calcular")).toBeVisible({ timeout: 30_000 });
    await page.getByLabel("Cliente").fill(id);
    await page.getByLabel("Qtd").fill("2");
    await page.getByRole("button", { name: "Criar pedido" }).click();
    await expectToast(page, "Pedido criado");

    await page.getByRole("link", { name: "Ver pedidos" }).click();
    await expect(page.getByRole("heading", { name: "Pedidos" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(id, { exact: true })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(NOME).first()).toBeVisible();
  });
});
