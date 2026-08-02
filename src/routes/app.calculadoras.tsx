import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { CalculadoraPreco } from "@/components/CalculadoraPreco";
import { brl } from "@/data/facaevenda";
import {
  useAdicionarCompras,
  useAdicionarTarefas,
  useCriarPedido,
  useOportunidades,
} from "@/lib/db";
import { itensCompras, type ResultadoPrecificacao } from "@/lib/calculadora";

type Search = { produto?: string | undefined };

export const Route = createFileRoute("/app/calculadoras")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const produto = search["produto"];
    return {
      produto: typeof produto === "string" ? produto : undefined,
    };
  },
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
  const { produto: produtoSearch } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isPending, isError } = useOportunidades();
  const adicionarCompras = useAdicionarCompras();
  const adicionarTarefas = useAdicionarTarefas();
  const criarPedido = useCriarPedido();
  const [meta, setMeta] = useState(5000);
  const [investimento, setInvestimento] = useState(150);
  const [resultado, setResultado] = useState<ResultadoPrecificacao | null>(null);
  const [pedidoForm, setPedidoForm] = useState({ cliente: "", qtd: "1" });

  const lista = data?.lista ?? [];
  const selecionada = useMemo(() => {
    if (lista.length === 0) return null;
    return lista.find((o) => o.slug === produtoSearch) ?? lista[0] ?? null;
  }, [lista, produtoSearch]);

  const lucroUnit =
    resultado && resultado.precoUnitario > resultado.custoUnitario
      ? resultado.precoUnitario - resultado.custoUnitario
      : selecionada
        ? selecionada.precoSugerido - selecionada.custoUnitario
        : 0;

  const rendimento = resultado?.rendimento ?? 1;
  const qtdUnidades = lucroUnit > 0 ? Math.ceil(meta / lucroUnit) : 0;
  const fornadasMeta = rendimento > 0 ? Math.ceil(qtdUnidades / rendimento) : 0;
  const precoUnit = resultado?.precoUnitario ?? selecionada?.precoSugerido ?? 0;

  if (isPending) {
    return (
      <Pagina titulo="Calculadoras" descricao="Esse módulo sozinho já paga a assinatura.">
        <Carregando texto="Carregando oportunidades..." />
      </Pagina>
    );
  }

  if (isError || !selecionada) {
    return (
      <Pagina titulo="Calculadoras" descricao="Esse módulo sozinho já paga a assinatura.">
        <Erro />
      </Pagina>
    );
  }

  const falta = Math.max(0, selecionada.investimento - investimento);
  const fornadasInvest =
    selecionada.investimento > 0 ? Math.floor(investimento / selecionada.investimento) : 0;
  const lucroInvestEstimado =
    fornadasInvest * (resultado?.lucroTotal ?? selecionada.lucroEstimado);
  const nomesCompras = itensCompras(selecionada).map((i) => i.nome);

  return (
    <Pagina titulo="Calculadoras" descricao="Escolha o produto e veja preço, meta e investimento.">
      <label className="mb-6 block max-w-md">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">Produto</span>
        <select
          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-gold/40"
          value={selecionada.slug}
          onChange={(e) => {
            setResultado(null);
            setPedidoForm({ cliente: "", qtd: "1" });
            void navigate({
              search: (prev: Search) => ({ ...prev, produto: e.target.value }),
              replace: true,
            });
          }}
          aria-label="Produto para calcular"
        >
          {lista.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.nome}
            </option>
          ))}
        </select>
      </label>

      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">Precificação</h2>
      <CalculadoraPreco
        key={selecionada.slug}
        oportunidade={selecionada}
        onResultados={setResultado}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={adicionarCompras.isPending}
          onClick={() => {
            adicionarCompras.mutate(
              nomesCompras.map((item) => ({ item, qtd: "" })),
              {
                onSuccess: (r) => {
                  if (r.adicionados === 0) {
                    toast.message("Nada novo", {
                      description: "Esses itens já estavam na lista de compras.",
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
          className="rounded-xl bg-success px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-success-hover disabled:opacity-70"
        >
          {adicionarCompras.isPending ? "Enviando..." : "Enviar para Compras"}
        </button>
        <button
          type="button"
          disabled={adicionarTarefas.isPending || selecionada.checklist.length === 0}
          onClick={() => {
            adicionarTarefas.mutate(selecionada.checklist, {
              onSuccess: (r) => {
                if (!r || r.adicionados === 0) {
                  toast.message("Produção já montada", {
                    description: "As tarefas do checklist já estavam na lista.",
                  });
                } else {
                  toast.success(`${r.adicionados} tarefa(s) na produção`);
                }
              },
              onError: () => toast.error("Não foi possível montar a produção."),
            });
          }}
          className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-gold/40 disabled:opacity-70"
        >
          {adicionarTarefas.isPending ? "Montando..." : "Montar produção"}
        </button>
        <Link to="/app/compras" className="text-sm font-medium text-gold underline underline-offset-4">
          Ver compras
        </Link>
        <Link to="/app/producao" className="text-sm font-medium text-gold underline underline-offset-4">
          Ver produção
        </Link>
      </div>

      <Painel titulo="Criar pedido com este preço" className="mt-6">
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const qtd = Math.max(1, Number(pedidoForm.qtd) || 1);
            if (!pedidoForm.cliente.trim()) {
              toast.error("Informe o nome do cliente.");
              return;
            }
            criarPedido.mutate(
              {
                cliente: pedidoForm.cliente.trim(),
                produto: selecionada.nome,
                qtd,
                valor: Math.round(precoUnit * qtd * 100) / 100,
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
            <p className="mt-1 font-display text-lg font-semibold">
              {brl(precoUnit * Math.max(1, Number(pedidoForm.qtd) || 1))}
            </p>
          </div>
          <button
            type="submit"
            disabled={criarPedido.isPending}
            className="rounded-xl bg-success px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-success-hover disabled:opacity-70"
          >
            {criarPedido.isPending ? "Salvando..." : "Criar pedido"}
          </button>
          <Link to="/app/pedidos" className="self-center text-sm font-medium text-gold underline underline-offset-4">
            Ver pedidos
          </Link>
        </form>
      </Painel>

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
          <p className="mt-6 text-sm text-muted-foreground">
            Com <strong className="text-foreground">{selecionada.nome}</strong> você precisa de:
          </p>
          <ul className="mt-3 space-y-3">
            <li className="flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3">
              <span className="font-display text-xl font-semibold">{qtdUnidades}</span>
              <span className="text-sm text-muted-foreground">unidades</span>
            </li>
            <li className="flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3">
              <span className="font-display text-xl font-semibold">{fornadasMeta}</span>
              <span className="text-sm text-muted-foreground">fornadas</span>
            </li>
            <li className="rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
              Lucro por unidade: {brl(lucroUnit)}
            </li>
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
          <p className="mt-6 text-sm text-muted-foreground">
            Investimento mínimo do catálogo: {brl(selecionada.investimento)}
          </p>
          <ul className="mt-3 space-y-3">
            {falta > 0 ? (
              <li className="rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
                Faltam {brl(falta)} para montar a primeira fornada de {selecionada.nome}.
              </li>
            ) : (
              <>
                <li className="flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3">
                  <span className="font-display text-xl font-semibold">{fornadasInvest}</span>
                  <span className="text-sm text-muted-foreground">fornadas possíveis</span>
                </li>
                <li className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3 text-sm">
                  <span>Lucro estimado</span>
                  <span className="text-success">{brl(lucroInvestEstimado)}</span>
                </li>
              </>
            )}
          </ul>
        </Painel>
      </div>
    </Pagina>
  );
}
