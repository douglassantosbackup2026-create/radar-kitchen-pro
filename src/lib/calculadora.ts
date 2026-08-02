import type { CompraDetalhe, Oportunidade } from "@/data/facaevenda";

export function parseRendimento(texto: string): number {
  const match = texto.match(/(\d+)/);
  return match ? Number(match[1]) : 24;
}

export function margemCatalogo(o: Oportunidade): number {
  if (o.precoSugerido <= 0) return 65;
  const m = ((o.precoSugerido - o.custoUnitario) / o.precoSugerido) * 100;
  return Math.min(85, Math.max(20, Math.round(m)));
}

export function formatQtdUnidade(item: CompraDetalhe): string {
  return `${item.qtd} ${item.unidade}`.trim();
}

export function itensCompras(o: Oportunidade): CompraDetalhe[] {
  if (o.comprasDetalhe.length > 0) {
    return o.comprasDetalhe.map((i) => ({
      nome: i.nome,
      qtd: i.qtd > 0 ? i.qtd : 1,
      unidade: i.unidade || "un",
      custo: i.custo,
    }));
  }
  const nomes = o.compras.length > 0 ? o.compras : ["Ingredientes"];
  const total = o.custoUnitario * parseRendimento(o.rendimento);
  const base = Math.round((total / nomes.length) * 100) / 100;
  return nomes.map((nome, i) => ({
    nome,
    qtd: 1,
    unidade: "un",
    custo:
      i === nomes.length - 1
        ? Math.max(0, Math.round((total - base * (nomes.length - 1)) * 100) / 100)
        : base,
  }));
}

export function custosIniciais(o: Oportunidade): number[] {
  return itensCompras(o).map((i) => i.custo);
}

export type ResultadoPrecificacao = {
  custoTotal: number;
  custoUnitario: number;
  precoUnitario: number;
  lucroTotal: number;
  rendimento: number;
  margem: number;
  itens: { item: string; valor: number }[];
};

export function calcularPrecificacao(
  itens: string[],
  valores: number[],
  rendimento: number,
  margem: number,
): ResultadoPrecificacao {
  const safeRendimento = Math.max(1, rendimento);
  const safeMargem = Math.min(85, Math.max(1, margem));
  const custoTotal = valores.reduce((a, b) => a + b, 0);
  const custoUnitario = custoTotal / safeRendimento;
  const precoUnitario = custoUnitario / (1 - safeMargem / 100);
  const lucroTotal = precoUnitario * safeRendimento - custoTotal;
  return {
    custoTotal,
    custoUnitario,
    precoUnitario,
    lucroTotal,
    rendimento: safeRendimento,
    margem: safeMargem,
    itens: itens.map((item, i) => ({ item, valor: valores[i] ?? 0 })),
  };
}
