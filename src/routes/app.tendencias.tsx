import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { Selo } from "@/components/Selo";
import type { Selo as SeloTipo } from "@/data/facaevenda";
import { useDatas, useOportunidades, useTendencias } from "@/lib/db";

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
  const tendencias = useTendencias();
  const datas = useDatas();
  const oportunidades = useOportunidades();
  const maisVendidas = [...(oportunidades.data?.lista ?? [])]
    .sort((a, b) => b.indice - a.indice)
    .slice(0, 5);

  return (
    <Pagina titulo="Tendências" descricao="Essa semana, segundo o Radar Faça & Venda™.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Painel titulo="📈 Explodindo agora">
          {tendencias.isPending && <Carregando />}
          {tendencias.isError && <Erro />}
          <ul className="space-y-4">
            {tendencias.data?.map((t) => (
              <li key={t.id} className="flex items-start justify-between gap-4">
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
          {oportunidades.isPending && <Carregando />}
          {oportunidades.isError && <Erro />}
          <ol className="space-y-3 text-sm">
            {maisVendidas.map((m, i) => (
              <li key={m.slug} className="flex gap-3">
                <span className="w-5 text-muted-foreground">{i + 1}.</span>
                <span className="flex-1">{m.nome}</span>
                <span className="tabular-nums text-gold">{m.indice}</span>
              </li>
            ))}
          </ol>
        </Painel>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {datas.data?.slice(0, 2).map((c) => (
          <Painel key={c.id} titulo={`📅 ${c.data}`}>
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
