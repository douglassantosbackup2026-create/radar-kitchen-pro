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

test.describe("wizard detalhe", () => {
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

  test("Começar agora: compras → produção → pedido", async ({ page }) => {
    await page.goto(`/app/oportunidades/${SLUG}`);
    await expect(page.getByRole("heading", { name: NOME })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole("heading", { name: "Começar agora", level: 2 })).toBeVisible();

    await page.getByRole("button", { name: "2. Compras" }).click();
    await page.getByRole("button", { name: "Enviar para Compras" }).click();
    await expectToast(page, /item\(ns\) adicionados|Já estava na lista/);

    await page.getByRole("button", { name: "3. Produção" }).click();
    await page.getByRole("button", { name: "Montar produção" }).click();
    await expectToast(page, /tarefa\(s\) na produção|Produção já montada/);

    await page.getByRole("button", { name: "4. Pedido" }).click();
    await page.getByLabel("Cliente").fill(id);
    await page.getByLabel("Qtd").fill("1");
    await page.getByRole("button", { name: "Criar pedido" }).click();
    await expectToast(page, "Pedido criado");

    await page.getByRole("link", { name: "Ver pedidos" }).click();
    await expect(page.getByText(id, { exact: true })).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("pedido pago", () => {
  let id: string;

  test.beforeAll(() => {
    id = runId();
  });

  test.afterAll(async () => {
    await cleanupByPrefix(id);
  });

  test("marcar pago registra entrada", async ({ page }) => {
    await page.goto("/app/pedidos");
    await expect(page.getByRole("heading", { name: "Pedidos" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByLabel("Cliente")).toBeVisible({ timeout: 30_000 });
    // Hidratação: espera lista ou vazio
    await expect(
      page.getByText("Nenhum pedido registrado ainda.").or(page.locator("table tbody tr").first()),
    ).toBeVisible({ timeout: 30_000 });

    await page.getByLabel("Cliente").fill(id);
    await page.getByLabel("Produto").fill("Brownie Dubai");
    await page.getByLabel("Qtd").fill("1");
    await page.getByLabel("Valor").fill("50");
    await expect(page.getByLabel("Cliente")).toHaveValue(id);

    await page.getByRole("button", { name: "Salvar" }).click();
    await expect(page.getByText(id, { exact: true })).toBeVisible({ timeout: 20_000 });

    const row = page.locator("tr").filter({ has: page.getByText(id, { exact: true }) });
    await row.getByRole("button", { name: "Não" }).click();
    await expectToast(page, /Pago/);
    await expect(row.getByRole("button", { name: "Sim" })).toBeVisible({ timeout: 10_000 });
  });
});
