import { describe, expect, it } from "vitest";
import {
  calcularPrecificacao,
  formatQtdUnidade,
  margemCatalogo,
  parseRendimento,
} from "./calculadora";
import type { Oportunidade } from "@/data/facaevenda";

describe("parseRendimento", () => {
  it("extrai número de strings como 60 unidades", () => {
    expect(parseRendimento("60 unidades")).toBe(60);
  });

  it("usa fallback 24 quando não há dígitos", () => {
    expect(parseRendimento("sem número")).toBe(24);
  });
});

describe("calcularPrecificacao", () => {
  it("calcula custo, preço e lucro da fornada", () => {
    const r = calcularPrecificacao(["A", "B"], [40, 60], 20, 50);
    expect(r.custoTotal).toBe(100);
    expect(r.custoUnitario).toBe(5);
    expect(r.precoUnitario).toBe(10);
    expect(r.lucroTotal).toBe(100);
  });
});

describe("margemCatalogo", () => {
  it("deriva margem do preço e custo", () => {
    const o = {
      precoSugerido: 10,
      custoUnitario: 4,
    } as Oportunidade;
    expect(margemCatalogo(o)).toBe(60);
  });
});

describe("formatQtdUnidade", () => {
  it("formata quantidade e unidade", () => {
    expect(formatQtdUnidade({ nome: "Morango", qtd: 1, unidade: "kg", custo: 20 })).toBe("1 kg");
  });
});
