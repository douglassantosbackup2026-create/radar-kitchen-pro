import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { desafios } from "@/data/facaevenda";

export const Route = createFileRoute("/app/desafios")({
  head: () => ({
    meta: [
      { title: "Desafios — Faça & Venda PRO" },
      { name: "description", content: "Bata metas de venda e conquiste medalhas dentro da plataforma." },
      { property: "og:title", content: "Desafios — Faça & Venda PRO" },
      { property: "og:description", content: "Bata metas de venda e conquiste medalhas." },
    ],
  }),
  component: Desafios,
});

function Desafios() {
  return (
    <Pagina titulo="Desafios" descricao="Venda, bata a meta, ganhe a medalha.">
      <div className="grid gap-5 md:grid-cols-3">
        {desafios.map((d) => {
          const pct = Math.min(100, (d.progresso / d.meta) * 100);
          return (
            <Painel key={d.titulo}>
              <p className="font-display text-lg font-semibold">{d.titulo}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {d.progresso} de {d.meta} · {pct.toFixed(0)}%
              </p>
              <p className="mt-3 text-sm">{pct >= 100 ? `Conquistado ${d.medalha}` : d.medalha}</p>
            </Painel>
          );
        })}
      </div>
    </Pagina>
  );
}
