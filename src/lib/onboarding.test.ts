import { describe, expect, it } from "vitest";
import {
  ASSINATURA_MENSAL,
  faltaParaAssinatura,
  faturamentoPagoMes,
  lucroDuasFornadas,
  progressoMeta,
  recuperouAssinatura,
} from "./onboarding";

describe("lucroDuasFornadas", () => {
  it("multiplica o lucro estimado por 2", () => {
    expect(lucroDuasFornadas(80)).toBe(160);
    expect(lucroDuasFornadas(42.5)).toBe(85);
  });
});

describe("faturamentoPagoMes", () => {
  const agora = new Date(2026, 7, 3); // 3 ago 2026

  it("soma só pedidos pagos do mês corrente", () => {
    const total = faturamentoPagoMes(
      [
        { pago: true, valor: 30, created_at: "2026-08-01T12:00:00.000Z" },
        { pago: true, valor: 20, created_at: "2026-08-02T12:00:00.000Z" },
        { pago: false, valor: 100, created_at: "2026-08-02T12:00:00.000Z" },
        { pago: true, valor: 50, created_at: "2026-07-20T12:00:00.000Z" },
      ],
      agora,
    );
    expect(total).toBe(50);
  });

  it("inclui pagos sem created_at", () => {
    expect(faturamentoPagoMes([{ pago: true, valor: "15" }], agora)).toBe(15);
  });
});

describe("recuperouAssinatura", () => {
  it("fica true a partir do valor da assinatura mensal", () => {
    expect(recuperouAssinatura(ASSINATURA_MENSAL - 0.01)).toBe(false);
    expect(recuperouAssinatura(ASSINATURA_MENSAL)).toBe(true);
    expect(recuperouAssinatura(100)).toBe(true);
  });
});

describe("faltaParaAssinatura", () => {
  it("não fica negativo", () => {
    expect(faltaParaAssinatura(10)).toBe(37);
    expect(faltaParaAssinatura(100)).toBe(0);
  });
});

describe("progressoMeta", () => {
  it("limita em 100%", () => {
    expect(progressoMeta(250, 500)).toBe(0.5);
    expect(progressoMeta(1000, 500)).toBe(1);
    expect(progressoMeta(100, null)).toBe(0);
  });
});
