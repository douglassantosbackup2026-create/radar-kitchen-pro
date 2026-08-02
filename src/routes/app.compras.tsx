import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { listaCompras } from "@/data/facaevenda";

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
  const [comprados, setComprados] = useState<string[]>([]);
  return (
    <Pagina titulo="Compras" descricao="Gerada automaticamente pelo seu plano da semana.">
      <Painel>
        <ul className="divide-y divide-border">
          {listaCompras.map((c) => {
            const ok = comprados.includes(c.item);
            return (
              <li key={c.item} className="py-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={ok}
                    onChange={() =>
                      setComprados((v) => (ok ? v.filter((x) => x !== c.item) : [...v, c.item]))
                    }
                    className="h-4 w-4 accent-[var(--success)]"
                  />
                  <span className={`flex-1 ${ok ? "text-muted-foreground line-through" : ""}`}>
                    {c.item}
                  </span>
                  <span className="text-sm text-muted-foreground">{c.qtd}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() => window.print()}
          className="mt-6 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold/50"
        >
          Imprimir lista
        </button>
      </Painel>
    </Pagina>
  );
}
