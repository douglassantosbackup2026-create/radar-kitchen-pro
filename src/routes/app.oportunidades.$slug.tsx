import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { IndiceOportunidade } from "@/components/IndiceOportunidade";
import { Painel } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { Selo } from "@/components/Selo";
import { brl } from "@/data/facaevenda";
import {
  useAdicionarCompras,
  useFavoritos,
  useOportunidade,
  useToggleFavorito,
} from "@/lib/db";
import { itensCompras, formatQtdUnidade } from "@/lib/calculadora";

export const Route = createFileRoute("/app/oportunidades/$slug")({
  head: ({ params }) => {
    const nome = params.slug.replace(/-/g, " ");
    const titulo = `${nome} — Faça & Venda PRO`;
    const desc = `Receita completa, custo, preço sugerido e lucro estimado de ${nome}.`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Detalhe,
});

function Detalhe() {
  const { slug } = Route.useParams();
  const { data: o, isPending, isError } = useOportunidade(slug);
  const adicionarCompras = useAdicionarCompras();
  const favoritos = useFavoritos();
  const toggleFavorito = useToggleFavorito();
  const [feitos, setFeitos] = useState<string[]>([]);
  const isFavorito = (favoritos.data ?? []).some((f) => f.oportunidade_slug === slug);

  if (isPending) return <Carregando texto="Carregando receita..." />;
  if (isError) return <Erro />;
  if (!o) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">Receita não encontrada</h1>
        <Link to="/app/oportunidades" className="mt-4 inline-block text-gold underline underline-offset-4">
          Ver todas as oportunidades
        </Link>
      </div>
    );
  }

  const margem = ((o.precoSugerido - o.custoUnitario) / o.precoSugerido) * 100;
  const listaCompras = itensCompras(o);

  return (
    <article>
      <Link to="/app/oportunidades" className="text-sm text-muted-foreground hover:text-gold">
        ← Oportunidades
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold">{o.nome}</h1>
        <Selo selo={o.selo} />
        <button
          type="button"
          disabled={toggleFavorito.isPending}
          onClick={() => {
            toggleFavorito.mutate(o.slug, {
              onSuccess: (r) =>
                toast.success(r.favorito ? "Adicionado aos favoritos" : "Removido dos favoritos"),
              onError: () => toast.error("Não foi possível atualizar o favorito."),
            });
          }}
          className="rounded-xl border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-gold/40"
          aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorito ? "★ Favorito" : "☆ Favoritar"}
        </button>
        <Link
          to="/app/calculadoras"
          search={{ produto: o.slug }}
          className="rounded-xl border border-gold/40 px-3 py-1.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
        >
          Abrir na calculadora
        </Link>
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
              {listaCompras.map((c) => (
                <li key={c.nome} className="flex justify-between gap-3">
                  <span>
                    🛒 {c.nome}{" "}
                    <span className="text-xs opacity-70">({formatQtdUnidade(c)})</span>
                  </span>
                  <span className="tabular-nums">{brl(c.custo)}</span>
                </li>
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
            disabled={adicionarCompras.isPending}
            onClick={() => {
              adicionarCompras.mutate(
                listaCompras.map((c) => ({ item: c.nome, qtd: "" })),
                {
                  onSuccess: (r) => {
                    if (r.adicionados === 0) {
                      toast.message("Já estava na lista", {
                        description: "Esses itens já existiam em Compras.",
                      });
                    } else {
                      toast.success(
                        `${r.adicionados} item(ns) adicionados` +
                          (r.ignorados > 0 ? ` · ${r.ignorados} já existiam` : ""),
                      );
                    }
                  },
                  onError: () => toast.error("Não foi possível atualizar as compras."),
                },
              );
            }}
            className="w-full rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover disabled:opacity-70"
          >
            {adicionarCompras.isPending ? "Adicionando..." : "Adicionar ao plano da semana"}
          </button>
        </div>
      </div>
    </article>
  );
}
