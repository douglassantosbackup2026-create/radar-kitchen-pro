import { describe, expect, it } from "vitest";
import { aniversariosProximos, parseAniversario } from "./aniversarios";

describe("parseAniversario", () => {
  it("aceita DD/MM", () => {
    expect(parseAniversario("14/09")).toEqual({ dia: 14, mes: 9 });
  });

  it("aceita DD/MM/YYYY", () => {
    expect(parseAniversario("02/12/1990")).toEqual({ dia: 2, mes: 12 });
  });

  it("rejeita inválido", () => {
    expect(parseAniversario("ontem")).toBeNull();
  });
});

describe("aniversariosProximos", () => {
  it("inclui aniversário de hoje e da janela", () => {
    const hoje = new Date(2026, 7, 2); // 2 ago 2026
    const lista = aniversariosProximos(
      [
        { id: "1", nome: "Hoje", aniversario: "02/08" },
        { id: "2", nome: "Semana", aniversario: "05/08" },
        { id: "3", nome: "Longe", aniversario: "20/08" },
      ],
      { dias: 7, hoje },
    );
    expect(lista.map((a) => a.nome)).toEqual(["Hoje", "Semana"]);
    expect(lista[0]?.ehHoje).toBe(true);
    expect(lista[1]?.diasRestantes).toBe(3);
  });
});
