import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadDotEnv() {
  try {
    const text = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env ausente — usa process.env
  }
}

loadDotEnv();

export function runId(): string {
  return `E2E-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY para cleanup E2E.");
  }
  client = createClient(url, key);
  return client;
}

export async function expectToast(page: Page, pattern: string | RegExp) {
  await expect(page.locator("[data-sonner-toast]").filter({ hasText: pattern }).first()).toBeVisible({
    timeout: 15_000,
  });
}

export async function listCompraIds(): Promise<string[]> {
  const { data, error } = await supabase().from("itens_compra").select("id");
  if (error) throw error;
  return (data ?? []).map((r) => r.id);
}

export async function listTarefaIds(): Promise<string[]> {
  const { data, error } = await supabase().from("tarefas_producao").select("id");
  if (error) throw error;
  return (data ?? []).map((r) => r.id);
}

export async function deleteByIds(table: "itens_compra" | "tarefas_producao", ids: string[]) {
  if (ids.length === 0) return;
  const { error } = await supabase().from(table).delete().in("id", ids);
  if (error) throw error;
}

export async function deleteIdsNotIn(
  table: "itens_compra" | "tarefas_producao",
  before: string[],
) {
  const after = table === "itens_compra" ? await listCompraIds() : await listTarefaIds();
  const beforeSet = new Set(before);
  const added = after.filter((id) => !beforeSet.has(id));
  await deleteByIds(table, added);
}

export async function cleanupByPrefix(prefix: string) {
  const db = supabase();
  const like = `${prefix}%`;
  await Promise.all([
    db.from("clientes").delete().like("nome", like),
    db.from("pedidos").delete().like("cliente", like),
    db.from("lancamentos").delete().like("descricao", like),
    db.from("itens_compra").delete().like("item", like),
    db.from("tarefas_producao").delete().like("titulo", like),
  ]);
}

export async function removeFavorito(slug: string) {
  const { error } = await supabase().from("favoritos").delete().eq("oportunidade_slug", slug);
  if (error) throw error;
}

/** Extrai o número de progresso de um card de desafio (`X de Y · N%`). */
export function parseProgressoTexto(texto: string): number {
  const brl = texto.match(/R\$\s*([\d.]+),(\d{2})/);
  if (brl) {
    const intPart = brl[1].replace(/\./g, "");
    return Number(`${intPart}.${brl[2]}`);
  }
  const plain = texto.match(/([\d.,]+)\s+de\s+/);
  if (!plain) throw new Error(`Não foi possível parsear progresso: ${texto}`);
  return Number(plain[1].replace(/\./g, "").replace(",", "."));
}

export async function progressoDesafio(page: Page, titulo: string): Promise<number> {
  const tituloEl = page.getByText(titulo, { exact: true });
  await expect(tituloEl).toBeVisible({ timeout: 30_000 });
  const card = tituloEl.locator("xpath=ancestor::*[.//p[contains(., '%')]][1]");
  const linha = card.locator("p").filter({ hasText: /de .+·/ });
  await expect(linha).toBeVisible();
  const text = (await linha.textContent()) ?? "";
  return parseProgressoTexto(text);
}
