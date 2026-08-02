import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { useAdicionarCompra, useCompras, useToggleCompra } from "@/lib/db";

export const Route = createFileRoute("/app/compras")({
  head: () => ({
    meta: [
      { title: "Lista de Compras — Faça & Venda PRO" },
      { name: "description", content: "Lista de compras gerada automaticamente a partir do seu plano da semana." },
      { property: "og:title", content: "Lista de Compras — Faça & Venda PRO" },
      { property: "og:description", content: "Lista gerada a partir do seu plano da semana." },
    ],
  }),
  component: Compras,
});

function Compras() {
  const { data, isPending, isError } = useCompras();
  const toggle = useToggleCompra();
  const adicionar = useAdicionarCompra();
  const [item, setItem] = useState("");
  const [qtd, setQtd] = useState("");

  return (
    <Pagina titulo="Compras" descricao="Gerada automaticamente pelo seu plano da semana.">
      <Painel>
        {isPending && <Carregando />}
        {isError && <Erro />}
        {data && data.length === 0 && <Vazio texto="Sua lista está vazia." />}
        <ul className="divide-y divide-border">
          {data?.map((c) => (
            <li key={c.id} className="py-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={c.comprado}
                  onChange={() => toggle.mutate({ id: c.id, comprado: !c.comprado })}
                  className="h-4 w-4 accent-[var(--success)]"
                />
                <span className={`flex-1 ${c.comprado ? "text-muted-foreground line-through" : ""}`}>
                  {c.item}
                </span>
                <span className="text-sm text-muted-foreground">{c.qtd}</span>
              </label>
            </li>
          ))}
        </ul>

        <form
          className="mt-6 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const nome = item.trim();
            if (!nome) return;
            adicionar.mutate({ item: nome, qtd: qtd.trim() });
            setItem("");
            setQtd("");
          }}
        >
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Ingrediente"
            aria-label="Ingrediente"
            className="min-w-40 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <input
            value={qtd}
            onChange={(e) => setQtd(e.target.value)}
            placeholder="Quantidade"
            aria-label="Quantidade"
            className="w-32 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <button
            type="submit"
            className="rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
          >
            Adicionar
          </button>
        </form>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-4 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold/50"
        >
          Imprimir lista
        </button>
      </Painel>
    </Pagina>
  );
}
