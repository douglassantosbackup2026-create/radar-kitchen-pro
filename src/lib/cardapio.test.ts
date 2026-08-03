import { describe, expect, it } from "vitest";
import type { Oportunidade } from "@/data/facaevenda";
import {
  cardapioPadrao,
  montarTextoWhatsApp,
  sugestoesDoMomento,
} from "./cardapio";

function op(slug: string, nome = slug, preco = 10): Oportunidade {
  return {
    slug,
    nome,
    categoria: "Teste",
    selo: "Viral",
    imagem: "",
    indice: 80,
    criterios: [],
    lucroEstimado: 100,
    investimento: 50,
    precoSugerido: preco,
    custoUnitario: 3,
    tempoMin: 30,
    dificuldade: 1,
    demanda: 3,
    rendimento: "20 unidades",
    validade: "2 dias",
    porQue: [],
    ingredientes: [],
    preparo: [],
    compras: [],
    comprasDetalhe: [],
    comoVender: [],
    checklist: [],
  };
}

describe("sugestoesDoMomento", () => {
  it("prioriza do dia e da semana e limita a 4", () => {
    const lista = [op("a"), op("b"), op("c"), op("d"), op("e")];
    const r = sugestoesDoMomento(op("dia", "Dia"), op("semana", "Semana"), lista);
    expect(r.map((o) => o.slug)).toEqual(["dia", "semana", "a", "b"]);
  });

  it("não duplica quando doDia está na lista", () => {
    const dia = op("a", "A");
    const r = sugestoesDoMomento(dia, op("b"), [dia, op("c"), op("d")]);
    expect(r.map((o) => o.slug)).toEqual(["a", "b", "c", "d"]);
  });
});

describe("montarTextoWhatsApp", () => {
  it("monta lista com preços e CTA", () => {
    const prefs = cardapioPadrao(op("x", "Brownie", 12), null, []);
    prefs.nomeNegocio = "Doces da Ana";
    prefs.whatsapp = "11999998888";
    const texto = montarTextoWhatsApp(prefs);
    expect(texto).toContain("*Doces da Ana*");
    expect(texto).toContain("Brownie");
    expect(texto).toContain("Peça no Zap");
    expect(texto).toContain("wa.me");
  });

  it("ignora itens não incluídos", () => {
    const prefs = cardapioPadrao(op("x", "A", 10), op("y", "B", 20), []);
    prefs.itens[1]!.incluido = false;
    const texto = montarTextoWhatsApp(prefs);
    expect(texto).toContain("A");
    expect(texto).not.toContain("• B");
  });
});
