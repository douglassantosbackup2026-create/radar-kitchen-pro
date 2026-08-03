import { createFileRoute, Link } from "@tanstack/react-router";
import { Pagina } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { useDatas, useOportunidades } from "@/lib/db";

export const Route = createFileRoute("/app/calendario")({
  head: () => ({
    meta: [
      { title: "Calendário Comercial — Faça & Venda PRO" },
      { name: "description", content: "As datas que mais vendem no ano e o que produzir em cada uma delas." },
      { property: "og:title", content: "Calendário Comercial — Faça & Venda PRO" },
      { property: "og:description", content: "As datas que mais vendem no ano e o que produzir." },
    ],
  }),
  component: Calendario,
});

function matchSlug(item: string, lista: { nome: string; slug: string }[]) {
  const needle = item.trim().toLowerCase();
  return (
    lista.find((o) => o.nome.toLowerCase() === needle) ??
    lista.find((o) => o.nome.toLowerCase().includes(needle) || needle.includes(o.nome.toLowerCase())) ??
    lista.find((o) => o.slug.includes(needle.replace(/\s+/g, "-")))
  );
}

function Calendario() {
  const { data, isPending, isError } = useDatas();
  const oportunidades = useOportunidades();
  const lista = oportunidades.data?.lista ?? [];

  return (
    <Pagina titulo="Calendário Comercial" descricao="Você nunca fica perdida. Prepare-se com antecedência.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      <ol className="relative space-y-6 border-l border-border pl-6">
        {data?.map((c) => (
          <li key={c.id} className="relative">
            <span className="absolute -left-[1.9rem] top-2 h-3 w-3 rounded-full bg-gold" aria-hidden />
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-widest text-gold">{c.mes}</p>
              <h2 className="mt-1 font-display text-xl font-semibold">{c.data}</h2>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Recomendamos</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {c.itens.map((i) => {
                  const match = matchSlug(i, lista);
                  if (match) {
                    return (
                      <li key={i}>
                        <Link
                          to="/app/oportunidades/$slug"
                          params={{ slug: match.slug }}
                          className="inline-block rounded-full bg-secondary px-3 py-1 text-sm transition-colors hover:bg-gold/20 hover:text-gold"
                        >
                          {i}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={i} className="rounded-full bg-secondary px-3 py-1 text-sm">
                      {i}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Pagina>
  );
}
