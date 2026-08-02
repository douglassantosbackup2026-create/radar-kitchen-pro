import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Selo } from "@/components/Selo";
import { calendario, tendencias, maisVendidas, type Selo as SeloTipo } from "@/data/facaevenda";

export const Route = createFileRoute("/app/tendencias")({
  head: () => ({
    meta: [
      { title: "Tendências — Faça & Venda PRO" },
      { name: "description", content: "O que está explodindo em vendas nesta semana, segundo o Radar Faça & Venda." },
      { property: "og:title", content: "Tendências — Faça & Venda PRO" },
      { property: "og:description", content: "O que está explodindo em vendas nesta semana." },
    ],
  }),
  component: Tendencias,
});

function Tendencias() {
  return (
    <Pagina titulo="Tendências" descricao="Essa semana, segundo o Radar Faça & Venda™.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Painel titulo="📈 Explodindo agora">
          <ul className="space-y-4">
            {tendencias.map((t) => (
              <li key={t.nome} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display font-semibold">{t.nome}</p>
                  <p className="text-sm text-muted-foreground">{t.nota}</p>
                </div>
                <Selo selo={t.selo as SeloTipo} />
              </li>
            ))}
          </ul>
        </Painel>
        <Painel titulo="🥇 Mais vendidas">
          <ol className="space-y-3 text-sm">
            {maisVendidas.map((m, i) => (
              <li key={m} className="flex gap-3">
                <span className="w-5 text-muted-foreground">{i + 1}.</span>
                {m}
              </li>
            ))}
          </ol>
        </Painel>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {calendario.slice(0, 2).map((c) => (
          <Painel key={c.mes} titulo={`📅 ${c.data}`}>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {c.itens.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </Painel>
        ))}
      </div>
    </Pagina>
  );
}
