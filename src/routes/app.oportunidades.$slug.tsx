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
  useAdicionarTarefas,
  useCriarPedido,
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

const PASSOS = ["Precificar", "Compras", "Produção", "Pedido"] as const;

function Detalhe() {
  const { slug } = Route.useParams();
  const { data: o, isPending, isError } = useOportunidade(slug);
  const adicionarCompras = useAdicionarCompras();
  const adicionarTarefas = useAdicionarTarefas();
  const criarPedido = useCriarPedido();
  const favoritos = useFavoritos();
  const toggleFavorito = useToggleFavorito();
  const [passo, setPasso] = useState(1);
  const [pedidoForm, setPedidoForm] = useState({ cliente: "", qtd: "1" });
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
  const qtd = Math.max(1, Number(pedidoForm.qtd) || 1);
  const valorPedido = Math.round(o.precoSugerido * qtd * 100) / 100;

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

      <Painel titulo="Começar agora" className="mt-6">
        <ol className="mb-6 flex flex-wrap gap-2">
          {PASSOS.map((label, i) => {
            const n = i + 1;
            const ativo = passo === n;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setPasso(n)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    ativo ? "bg-gold text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n}. {label}
                </button>
              </li>
            );
          })}
        </ol>

        {passo === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Preço sugerido <span className="font-semibold text-foreground">{brl(o.precoSugerido)}</span> ·
              custo {brl(o.custoUnitario)} · margem {margem.toFixed(0)}%.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/app/calculadoras"
                search={{ produto: o.slug }}
                className="rounded-xl bg-success px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-success-hover"
              >
                Abrir calculadora
              </Link>
              <button
                type="button"
                onClick={() => setPasso(2)}
                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:border-gold/40"
              >
                Próximo: Compras
              </button>
            </div>
          </div>
        )}

        {passo === 2 && (
          <div className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {listaCompras.map((c) => (
                <li key={c.nome} className="flex justify-between gap-3">
                  <span>
                    {c.nome}{" "}
                    <span className="text-xs opacity-70">({formatQtdUnidade(c)})</span>
                  </span>
                  <span className="tabular-nums">{brl(c.custo)}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={adicionarCompras.isPending || listaCompras.length === 0}
                onClick={() => {
                  adicionarCompras.mutate(
                    listaCompras.map((c) => ({
                      item: c.nome,
                      qtd: formatQtdUnidade(c),
                    })),
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
                        setPasso(3);
                      },
                      onError: () => toast.error("Não foi possível atualizar as compras."),
                    },
                  );
                }}
                className="rounded-xl bg-success px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-success-hover disabled:opacity-70"
              >
                {adicionarCompras.isPending ? "Enviando..." : "Enviar para Compras"}
              </button>
              <Link to="/app/compras" className="text-sm font-medium text-gold underline underline-offset-4">
                Ver compras
              </Link>
              <button
                type="button"
                onClick={() => setPasso(3)}
                className="text-sm text-muted-foreground underline underline-offset-4"
              >
                Pular
              </button>
            </div>
          </div>
        )}

        {passo === 3 && (
          <div className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {o.checklist.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={adicionarTarefas.isPending || o.checklist.length === 0}
                onClick={() => {
                  adicionarTarefas.mutate(o.checklist, {
                    onSuccess: (r) => {
                      if (!r || r.adicionados === 0) {
                        toast.message("Produção já montada", {
                          description: "As tarefas do checklist já estavam na lista.",
                        });
                      } else {
                        toast.success(`${r.adicionados} tarefa(s) na produção`);
                      }
                      setPasso(4);
                    },
                    onError: () => toast.error("Não foi possível montar a produção."),
                  });
                }}
                className="rounded-xl bg-success px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-success-hover disabled:opacity-70"
              >
                {adicionarTarefas.isPending ? "Montando..." : "Montar produção"}
              </button>
              <Link to="/app/producao" className="text-sm font-medium text-gold underline underline-offset-4">
                Ver produção
              </Link>
              <button
                type="button"
                onClick={() => setPasso(4)}
                className="text-sm text-muted-foreground underline underline-offset-4"
              >
                Pular
              </button>
            </div>
          </div>
        )}

        {passo === 4 && (
          <form
            className="flex flex-wrap items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!pedidoForm.cliente.trim()) {
                toast.error("Informe o nome do cliente.");
                return;
              }
              criarPedido.mutate(
                {
                  cliente: pedidoForm.cliente.trim(),
                  produto: o.nome,
                  qtd,
                  valor: valorPedido,
                  status: "Pendente",
                  pago: false,
                },
                {
                  onSuccess: () => {
                    toast.success("Pedido criado");
                    setPedidoForm({ cliente: "", qtd: "1" });
                  },
                  onError: () => toast.error("Não foi possível criar o pedido."),
                },
              );
            }}
          >
            <label className="min-w-[10rem] flex-1 text-sm">
              <span className="text-muted-foreground">Cliente</span>
              <input
                value={pedidoForm.cliente}
                onChange={(e) => setPedidoForm((f) => ({ ...f, cliente: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-gold/50"
                placeholder="Nome"
              />
            </label>
            <label className="w-24 text-sm">
              <span className="text-muted-foreground">Qtd</span>
              <input
                type="number"
                min={1}
                value={pedidoForm.qtd}
                onChange={(e) => setPedidoForm((f) => ({ ...f, qtd: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-gold/50"
              />
            </label>
            <div className="text-sm">
              <p className="text-muted-foreground">Valor</p>
              <p className="mt-1 font-display text-lg font-semibold">{brl(valorPedido)}</p>
            </div>
            <button
              type="submit"
              disabled={criarPedido.isPending}
              className="rounded-xl bg-success px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-success-hover disabled:opacity-70"
            >
              {criarPedido.isPending ? "Salvando..." : "Criar pedido"}
            </button>
            <Link
              to="/app/pedidos"
              className="self-center text-sm font-medium text-gold underline underline-offset-4"
            >
              Ver pedidos
            </Link>
          </form>
        )}
      </Painel>

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
            <ul className="space-y-2 text-sm text-muted-foreground">
              {o.checklist.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Use o passo Produção acima para enviar estas tarefas à lista do dia.
            </p>
          </Painel>
        </div>
      </div>
    </article>
  );
}
