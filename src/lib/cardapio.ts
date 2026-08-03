import { brl, type Oportunidade } from "@/data/facaevenda";

export type CardapioItem = {
  slug: string;
  nome: string;
  preco: number;
  incluido: boolean;
};

export type CardapioPrefs = {
  nomeNegocio: string;
  whatsapp: string;
  titulo: string;
  itens: CardapioItem[];
};

const STORAGE_KEY = "fv_cardapio";
const MAX_SUGESTOES = 4;

export const CARDAPIO_TITULO_PADRAO = "Cardápio da semana";

export function sugestoesDoMomento(
  doDia: Oportunidade | null | undefined,
  daSemana: Oportunidade | null | undefined,
  todas: Oportunidade[],
): Oportunidade[] {
  const vistos = new Set<string>();
  const out: Oportunidade[] = [];

  const push = (o: Oportunidade | null | undefined) => {
    if (!o || vistos.has(o.slug) || out.length >= MAX_SUGESTOES) return;
    vistos.add(o.slug);
    out.push(o);
  };

  push(doDia);
  push(daSemana);
  for (const o of todas) {
    push(o);
    if (out.length >= MAX_SUGESTOES) break;
  }
  return out;
}

export function itensDeOportunidades(ops: Oportunidade[]): CardapioItem[] {
  return ops.map((o) => ({
    slug: o.slug,
    nome: o.nome,
    preco: o.precoSugerido,
    incluido: true,
  }));
}

export function cardapioPadrao(
  doDia: Oportunidade | null | undefined,
  daSemana: Oportunidade | null | undefined,
  todas: Oportunidade[],
): CardapioPrefs {
  return {
    nomeNegocio: "Minha cozinha",
    whatsapp: "",
    titulo: CARDAPIO_TITULO_PADRAO,
    itens: itensDeOportunidades(sugestoesDoMomento(doDia, daSemana, todas)),
  };
}

function isItem(v: unknown): v is CardapioItem {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.slug === "string" &&
    typeof o.nome === "string" &&
    typeof o.preco === "number" &&
    typeof o.incluido === "boolean"
  );
}

export function lerCardapio(): CardapioPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CardapioPrefs>;
    if (!Array.isArray(parsed.itens) || !parsed.itens.every(isItem)) return null;
    return {
      nomeNegocio: typeof parsed.nomeNegocio === "string" ? parsed.nomeNegocio : "Minha cozinha",
      whatsapp: typeof parsed.whatsapp === "string" ? parsed.whatsapp : "",
      titulo: typeof parsed.titulo === "string" ? parsed.titulo : CARDAPIO_TITULO_PADRAO,
      itens: parsed.itens,
    };
  } catch {
    return null;
  }
}

export function salvarCardapio(prefs: CardapioPrefs): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function itensIncluidos(prefs: CardapioPrefs): CardapioItem[] {
  return prefs.itens.filter((i) => i.incluido);
}

export function montarTextoWhatsApp(prefs: CardapioPrefs): string {
  const itens = itensIncluidos(prefs);
  const linhas = [
    `*${prefs.nomeNegocio.trim() || "Minha cozinha"}*`,
    prefs.titulo.trim() || CARDAPIO_TITULO_PADRAO,
    "",
    ...itens.map((i) => `• ${i.nome} — ${brl(i.preco)}`),
  ];
  if (itens.length === 0) {
    linhas.push("• (adicione itens ao cardápio)");
  }
  linhas.push("", "Peça no Zap 👇");
  const zap = prefs.whatsapp.replace(/\D/g, "");
  if (zap.length >= 10) {
    linhas.push(`https://wa.me/55${zap.replace(/^55/, "")}`);
  } else if (prefs.whatsapp.trim()) {
    linhas.push(prefs.whatsapp.trim());
  }
  return linhas.join("\n");
}

export function linkWhatsAppCompartilhar(texto: string): string {
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

/** Mescla itens salvos com oportunidades atuais (mantém preços/inclusão editados). */
export function sincronizarItens(
  salvos: CardapioItem[],
  oportunidades: Oportunidade[],
): CardapioItem[] {
  const porSlug = new Map(salvos.map((i) => [i.slug, i]));
  const resultado: CardapioItem[] = [];
  const vistos = new Set<string>();

  for (const o of oportunidades) {
    vistos.add(o.slug);
    const antigo = porSlug.get(o.slug);
    resultado.push(
      antigo
        ? { ...antigo, nome: o.nome }
        : { slug: o.slug, nome: o.nome, preco: o.precoSugerido, incluido: false },
    );
  }

  for (const i of salvos) {
    if (!vistos.has(i.slug)) resultado.push(i);
  }
  return resultado;
}
