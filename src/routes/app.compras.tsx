import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import {
  useAdicionarCompra,
  useAtualizarCompra,
  useCompras,
  useExcluirCompra,
  useToggleCompra,
  type CompraRow,
} from "@/lib/db";

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

function LinhaCompra({
  compra,
  onToggle,
  onRemover,
  removendo,
}: {
  compra: CompraRow;
  onToggle: () => void;
  onRemover: () => void;
  removendo: boolean;
}) {
  const atualizar = useAtualizarCompra();
  const [item, setItem] = useState(compra.item);
  const [qtd, setQtd] = useState(compra.qtd);

  useEffect(() => {
    setItem(compra.item);
    setQtd(compra.qtd);
  }, [compra.id, compra.item, compra.qtd]);

  function salvar(nextItem = item, nextQtd = qtd) {
    const nome = nextItem.trim();
    const quantidade = nextQtd.trim();
    if (!nome) {
      setItem(compra.item);
      toast.error("Informe o nome do item");
      return;
    }
    if (nome === compra.item && quantidade === compra.qtd) return;
    atualizar.mutate(
      { id: compra.id, item: nome, qtd: quantidade },
      {
        onSuccess: () => toast.success("Item atualizado"),
        onError: () => {
          setItem(compra.item);
          setQtd(compra.qtd);
          toast.error("Não foi possível atualizar");
        },
      },
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-2 py-3">
      <input
        type="checkbox"
        checked={compra.comprado}
        onChange={onToggle}
        aria-label={`Marcar ${compra.item} como comprado`}
        className="h-4 w-4 shrink-0 accent-[var(--success)]"
      />
      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onBlur={() => salvar()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        aria-label="Nome do item"
        className={`min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-gold/50 ${
          compra.comprado ? "text-muted-foreground line-through" : ""
        }`}
      />
      <input
        value={qtd}
        onChange={(e) => setQtd(e.target.value)}
        onBlur={() => salvar()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        aria-label="Quantidade"
        placeholder="Qtd"
        className="w-24 rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-gold/50"
      />
      <button
        type="button"
        aria-label={`Remover ${compra.item}`}
        disabled={removendo}
        onClick={onRemover}
        className="shrink-0 text-xs text-destructive hover:underline"
      >
        Remover
      </button>
    </li>
  );
}

function Compras() {
  const { data, isPending, isError } = useCompras();
  const toggle = useToggleCompra();
  const adicionar = useAdicionarCompra();
  const excluir = useExcluirCompra();
  const [item, setItem] = useState("");
  const [qtd, setQtd] = useState("");

  return (
    <Pagina titulo="Compras" descricao="Edite a lista, marque o que já comprou e adicione o que faltar.">
      <Painel>
        {isPending && <Carregando />}
        {isError && <Erro />}
        {data && data.length === 0 && <Vazio texto="Sua lista está vazia." />}
        <ul className="divide-y divide-border">
          {data?.map((c) => (
            <LinhaCompra
              key={c.id}
              compra={c}
              onToggle={() => toggle.mutate({ id: c.id, comprado: !c.comprado })}
              removendo={excluir.isPending}
              onRemover={() =>
                excluir.mutate(c.id, {
                  onSuccess: () => toast.success("Item removido"),
                  onError: () => toast.error("Não foi possível remover"),
                })
              }
            />
          ))}
        </ul>

        <form
          className="mt-6 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const nome = item.trim();
            if (!nome) return;
            adicionar.mutate(
              { item: nome, qtd: qtd.trim() },
              {
                onSuccess: () => {
                  toast.success("Item adicionado");
                  setItem("");
                  setQtd("");
                },
                onError: () => toast.error("Não foi possível adicionar"),
              },
            );
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
      </Painel>
    </Pagina>
  );
}
