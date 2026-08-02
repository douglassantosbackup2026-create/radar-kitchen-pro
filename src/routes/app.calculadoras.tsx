import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { CalculadoraPreco } from "@/components/CalculadoraPreco";
import { brl, oportunidades } from "@/data/facaevenda";

export const Route = createFileRoute("/app/calculadoras")({
  head: () => ({
    meta: [
      { title: "Calculadoras — Faça & Venda PRO" },
      { name: "description", content: "Precificação, simulador de meta de lucro e simulador de investimento." },
      { property: "og:title", content: "Calculadoras — Faça & Venda PRO" },
      { property: "og:description", content: "Precificação, meta de lucro e simulador de investimento." },
    ],
  }),
  component: Calculadoras,
});

function Calculadoras() {
  const [meta, setMeta] = useState(5000);
  const [investimento, setInvestimento] = useState(150);

  return (
    <Pagina titulo="Calculadoras" descricao="Esse módulo sozinho já paga a assinatura.">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">Precificação</h2>
      <CalculadoraPreco />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Painel titulo="Simulador de meta">
          <label className="block text-sm">
            <span className="text-muted-foreground">Quanto você quer ganhar por mês?</span>
            <input
              type="range"
              min={500}
              max={15000}
              step={100}
              value={meta}
              onChange={(e) => setMeta(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--gold)]"
              aria-label="Meta mensal"
            />
            <span className="mt-1 block font-display text-3xl font-bold text-gold">{brl(meta)}</span>
          </label>
          <p className="mt-6 text-sm text-muted-foreground">Você pode vender:</p>
          <ul className="mt-3 space-y-3">
            {oportunidades.map((o) => {
              const lucroUnit = o.precoSugerido - o.custoUnitario;
              const qtd = Math.ceil(meta / lucroUnit);
              return (
                <li key={o.slug} className="flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3">
                  <span className="font-display text-xl font-semibold">{qtd}</span>
                  <span className="text-sm text-muted-foreground">{o.nome}</span>
                </li>
              );
            })}
          </ul>
        </Painel>

        <Painel titulo="Simulador de investimento">
          <label className="block text-sm">
            <span className="text-muted-foreground">Quanto você tem para investir hoje?</span>
            <input
              type="range"
              min={30}
              max={600}
              step={10}
              value={investimento}
              onChange={(e) => setInvestimento(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--gold)]"
              aria-label="Investimento disponível"
            />
            <span className="mt-1 block font-display text-3xl font-bold text-gold">
              {brl(investimento)}
            </span>
          </label>
          <p className="mt-6 text-sm text-muted-foreground">O que vale a pena fazer:</p>
          <ul className="mt-3 space-y-3">
            {oportunidades
              .filter((o) => o.investimento <= investimento)
              .map((o) => (
                <li key={o.slug} className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3 text-sm">
                  <span>{o.nome}</span>
                  <span className="text-success">lucro {brl(o.lucroEstimado)}</span>
                </li>
              ))}
            {oportunidades.every((o) => o.investimento > investimento) && (
              <li className="rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
                Aumente um pouco o valor para liberar as primeiras oportunidades.
              </li>
            )}
          </ul>
        </Painel>
      </div>
    </Pagina>
  );
}
