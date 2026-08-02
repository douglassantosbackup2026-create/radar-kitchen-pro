import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { brl, financeiro } from "@/data/facaevenda";

export const Route = createFileRoute("/app/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — Faça & Venda PRO" },
      { name: "description", content: "Entradas, saídas, lucro do dia e faturamento do mês da sua cozinha." },
      { property: "og:title", content: "Financeiro — Faça & Venda PRO" },
      { property: "og:description", content: "Entradas, saídas e lucro da sua cozinha." },
    ],
  }),
  component: Financeiro,
});

function Financeiro() {
  const maior = Math.max(...financeiro.semanas.map((s) => s.faturamento));
  return (
    <Pagina titulo="Financeiro" descricao="O número que importa: quanto sobrou.">
      <div className="grid gap-5 sm:grid-cols-3">
        {[
          ["Entrou hoje", brl(financeiro.hoje.entrou), ""],
          ["Saiu hoje", brl(financeiro.hoje.saiu), ""],
          ["Lucro hoje", brl(financeiro.hoje.lucro), "text-success"],
        ].map(([k, v, cor]) => (
          <Painel key={k}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{k}</p>
            <p className={`mt-2 font-display text-3xl font-bold ${cor}`}>{v}</p>
          </Painel>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Painel titulo="Faturamento do mês">
          <div className="flex h-44 items-end gap-4">
            {financeiro.semanas.map((s) => (
              <div key={s.semana} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{brl(s.faturamento)}</span>
                <div
                  className="w-full rounded-t-lg bg-gold"
                  style={{ height: `${(s.faturamento / maior) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{s.semana}</span>
              </div>
            ))}
          </div>
        </Painel>
        <Painel titulo="Resumo do mês">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Faturamento</dt>
              <dd className="font-display text-2xl font-semibold">{brl(financeiro.mes.faturamento)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Lucro</dt>
              <dd className="font-display text-2xl font-semibold text-success">{brl(financeiro.mes.lucro)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Produto campeão</dt>
              <dd className="font-display text-xl font-semibold text-gold">{financeiro.mes.campeao}</dd>
            </div>
          </dl>
        </Painel>
      </div>
    </Pagina>
  );
}
