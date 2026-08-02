import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { brl } from "@/data/facaevenda";
import { useCriarLancamento, useLancamentos, type LancamentoRow } from "@/lib/db";

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

function resumir(lancamentos: LancamentoRow[]) {
  const hojeISO = new Date().toISOString().slice(0, 10);
  const mesISO = hojeISO.slice(0, 7);
  const doMes = lancamentos.filter((l) => l.dia.startsWith(mesISO));
  const soma = (ls: LancamentoRow[], tipo: string) =>
    ls.filter((l) => l.tipo === tipo).reduce((t, l) => t + Number(l.valor), 0);

  const deHoje = lancamentos.filter((l) => l.dia === hojeISO);
  const base = deHoje.length > 0 ? deHoje : lancamentos.slice(0, 5);

  const semanas = [1, 2, 3, 4].map((n) => ({
    semana: `S${n}`,
    faturamento: soma(
      doMes.filter((l) => Math.min(4, Math.ceil(Number(l.dia.slice(8, 10)) / 7)) === n),
      "entrada",
    ),
  }));

  const porProduto = new Map<string, number>();
  for (const l of doMes) {
    if (l.tipo !== "entrada" || !l.produto) continue;
    porProduto.set(l.produto, (porProduto.get(l.produto) ?? 0) + Number(l.valor));
  }
  const campeao = [...porProduto.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  return {
    hoje: { entrou: soma(base, "entrada"), saiu: soma(base, "saida"), lucro: soma(base, "entrada") - soma(base, "saida") },
    mes: {
      faturamento: soma(doMes, "entrada"),
      lucro: soma(doMes, "entrada") - soma(doMes, "saida"),
      campeao,
    },
    semanas,
  };
}

function Financeiro() {
  const { data, isPending, isError } = useLancamentos();
  const criar = useCriarLancamento();
  const f = resumir(data ?? []);
  const maior = Math.max(1, ...f.semanas.map((s) => s.faturamento));
  const [form, setForm] = useState({
    tipo: "entrada",
    descricao: "",
    valor: "",
    produto: "",
  });

  return (
    <Pagina titulo="Financeiro" descricao="O número que importa: quanto sobrou.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      <div className="grid gap-5 sm:grid-cols-3">
        {[
          ["Entrou hoje", brl(f.hoje.entrou), ""],
          ["Saiu hoje", brl(f.hoje.saiu), ""],
          ["Lucro hoje", brl(f.hoje.lucro), "text-success"],
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
            {f.semanas.map((s) => (
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
              <dd className="font-display text-2xl font-semibold">{brl(f.mes.faturamento)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Lucro</dt>
              <dd className="font-display text-2xl font-semibold text-success">{brl(f.mes.lucro)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Produto campeão</dt>
              <dd className="font-display text-xl font-semibold text-gold">{f.mes.campeao}</dd>
            </div>
          </dl>
        </Painel>
      </div>

      <Painel titulo="Novo lançamento" className="mt-6">
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const valor = Number(form.valor.replace(",", ".")) || 0;
            if (valor <= 0) {
              toast.error("Informe um valor maior que zero.");
              return;
            }
            criar.mutate(
              {
                tipo: form.tipo,
                descricao: form.descricao.trim(),
                valor,
                produto: form.produto.trim(),
                dia: new Date().toISOString().slice(0, 10),
              },
              {
                onSuccess: () => {
                  toast.success("Lançamento registrado");
                  setForm({ tipo: "entrada", descricao: "", valor: "", produto: "" });
                },
                onError: () => toast.error("Não foi possível salvar o lançamento"),
              },
            );
          }}
        >
          <select
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
            aria-label="Tipo"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold/50"
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
          <input
            value={form.descricao}
            onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
            placeholder="Descrição"
            aria-label="Descrição"
            className="min-w-40 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <input
            value={form.produto}
            onChange={(e) => setForm((f) => ({ ...f, produto: e.target.value }))}
            placeholder="Produto"
            aria-label="Produto"
            className="min-w-32 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <input
            value={form.valor}
            onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))}
            placeholder="Valor"
            aria-label="Valor"
            className="w-28 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <button
            type="submit"
            disabled={criar.isPending}
            className="rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-success-hover disabled:opacity-70"
          >
            Registrar
          </button>
        </form>
      </Painel>
    </Pagina>
  );
}
