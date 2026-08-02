import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { brl } from "@/data/facaevenda";
import { useDesafiosComProgresso } from "@/lib/db";

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

function formatProgresso(tipo: string, valor: number) {
  return tipo === "faturamento" ? brl(valor) : String(Math.round(valor));
}

function Desafios() {
  const { data, isPending, isError } = useDesafiosComProgresso();

  return (
    <Pagina titulo="Desafios" descricao="Progresso real a partir dos seus pedidos e lançamentos.">
      {isPending && <Carregando texto="Carregando desafios..." />}
      {isError && <Erro />}
      {data && data.length === 0 && <Vazio texto="Nenhum desafio cadastrado ainda." />}
      {data && data.length > 0 && (
        <div className="grid gap-5 md:grid-cols-3">
          {data.map((d) => {
            const meta = Number(d.meta) || 1;
            const pct = Math.min(100, (d.progresso / meta) * 100);
            return (
              <Painel key={d.id}>
                <p className="font-display text-lg font-semibold">{d.titulo}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {formatProgresso(d.tipo, d.progresso)} de {formatProgresso(d.tipo, meta)} ·{" "}
                  {pct.toFixed(0)}%
                </p>
                <p className="mt-3 text-sm">
                  {pct >= 100 ? `Conquistado ${d.medalha}` : d.medalha}
                </p>
              </Painel>
            );
          })}
        </div>
      )}
    </Pagina>
  );
}
