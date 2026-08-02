import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IndiceOportunidade } from "@/components/IndiceOportunidade";
import { Painel } from "@/components/app/Pagina";
import { Selo } from "@/components/Selo";
import { brl, oportunidades } from "@/data/facaevenda";

export const Route = createFileRoute("/app/oportunidades/$slug")({
  loader: ({ params }) => {
    const o = oportunidades.find((x) => x.slug === params.slug);
    if (!o) throw notFound();
    return { o };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Receita não encontrada" }, { name: "robots", content: "noindex" }] };
    }
    const titulo = `${loaderData.o.nome} — Faça & Venda PRO`;
    const desc = `Receita completa, custo, preço sugerido e lucro estimado de ${loaderData.o.nome}.`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: NaoEncontrada,
  component: Detalhe,
});

function NaoEncontrada() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Receita não encontrada</h1>
      <Link to="/app/oportunidades" className="mt-4 inline-block text-gold underline underline-offset-4">
        Ver todas as oportunidades
      </Link>
    </div>
  );
}

function Detalhe() {
  const { o } = Route.useLoaderData();
  const [feitos, setFeitos] = useState<string[]>([]);
  const [noPlano, setNoPlano] = useState(false);

  const margem = ((o.precoSugerido - o.custoUnitario) / o.precoSugerido) * 100;

  return (
    <article>
      <Link to="/app/oportunidades" className="text-sm text-muted-foreground hover:text-gold">
        ← Oportunidades
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold">{o.nome}</h1>
        <Selo selo={o.selo} />
      </div>

      <img
        src={o.imagem}
        alt={o.nome}
        width={1024}
        height={768}
        className="mt-6 aspect-[16/9] w-full rounded-3xl object-cover"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ["Custo unitário", brl(o.custoUnitario)],
          ["Preço sugerido", brl(o.precoSugerido)],
          ["Margem", `${margem.toFixed(0)}%`],
          ["Tempo", `${o.tempoMin} min`],
          ["Rendimento", o.rendimento],
          ["Validade", o.validade],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 font-display font-semibold">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Painel titulo="Ingredientes">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {o.ingredientes.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </Painel>
          <Painel titulo="Modo de preparo">
            <ol className="space-y-3 text-sm text-muted-foreground">
              {o.preparo.map((p, i) => (
                <li key={p} className="flex gap-3">
                  <span className="font-display font-semibold text-gold">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </Painel>
          <Painel titulo="Como vender">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {o.comoVender.map((c) => (
                <li key={c}>✔ {c}</li>
              ))}
            </ul>
          </Painel>
        </div>

        <div className="space-y-6">
          <IndiceOportunidade indice={o.indice} criterios={o.criterios} />
          <Painel titulo="Lista de compras">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {o.compras.map((c) => (
                <li key={c}>🛒 {c}</li>
              ))}
            </ul>
          </Painel>
          <Painel titulo="Checklist de produção">
            <ul className="space-y-2.5">
              {o.checklist.map((c) => {
                const feito = feitos.includes(c);
                return (
                  <li key={c}>
                    <label className="flex cursor-pointer items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={feito}
                        onChange={() =>
                          setFeitos((f) => (feito ? f.filter((x) => x !== c) : [...f, c]))
                        }
                        className="h-4 w-4 accent-[var(--success)]"
                      />
                      <span className={feito ? "text-muted-foreground line-through" : ""}>{c}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Painel>
          <button
            type="button"
            onClick={() => setNoPlano(true)}
            className="w-full rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
          >
            {noPlano ? "Adicionado ao plano da semana ✓" : "Adicionar ao plano da semana"}
          </button>
        </div>
      </div>
    </article>
  );
}
