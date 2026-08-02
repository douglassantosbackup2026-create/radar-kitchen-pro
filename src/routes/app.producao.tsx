import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { useAdicionarTarefa, useTarefas, useToggleTarefa } from "@/lib/db";

export const Route = createFileRoute("/app/producao")({
  head: () => ({
    meta: [
      { title: "Produção — Faça & Venda PRO" },
      { name: "description", content: "Seu checklist de produção do dia: fazer, embalar e entregar." },
      { property: "og:title", content: "Produção — Faça & Venda PRO" },
      { property: "og:description", content: "Seu checklist de produção do dia." },
    ],
  }),
  component: Producao,
});

function Producao() {
  const { data, isPending, isError } = useTarefas();
  const toggle = useToggleTarefa();
  const adicionar = useAdicionarTarefa();
  const [novo, setNovo] = useState("");

  const feitos = data?.filter((t) => t.feito).length ?? 0;

  return (
    <Pagina titulo="Produção" descricao="Tudo em checklist. Marque conforme for fazendo.">
      <Painel titulo="Hoje">
        {isPending && <Carregando />}
        {isError && <Erro />}
        {data && data.length === 0 && <Vazio texto="Nenhuma tarefa hoje. Adicione a primeira." />}
        <ul className="space-y-3">
          {data?.map((t) => (
            <li key={t.id}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.feito}
                  onChange={() => toggle.mutate({ id: t.id, feito: !t.feito })}
                  className="h-4 w-4 accent-[var(--success)]"
                />
                <span className={t.feito ? "text-muted-foreground line-through" : ""}>{t.titulo}</span>
              </label>
            </li>
          ))}
        </ul>

        <form
          className="mt-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const titulo = novo.trim();
            if (!titulo) return;
            adicionar.mutate(titulo);
            setNovo("");
          }}
        >
          <input
            value={novo}
            onChange={(e) => setNovo(e.target.value)}
            placeholder="Nova tarefa"
            aria-label="Nova tarefa"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50"
          />
          <button
            type="submit"
            className="rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
          >
            Adicionar
          </button>
        </form>

        {data && data.length > 0 && (
          <p className="mt-5 text-sm text-muted-foreground">
            {feitos} de {data.length} concluídos
          </p>
        )}
      </Painel>
    </Pagina>
  );
}
