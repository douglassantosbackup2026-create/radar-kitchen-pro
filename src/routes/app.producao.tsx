import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { producaoHoje } from "@/data/facaevenda";

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
  const [feitos, setFeitos] = useState<string[]>([]);
  return (
    <Pagina titulo="Produção" descricao="Tudo em checklist. Marque conforme for fazendo.">
      <Painel titulo="Hoje">
        <ul className="space-y-3">
          {producaoHoje.map((t) => {
            const feito = feitos.includes(t);
            return (
              <li key={t}>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={feito}
                    onChange={() => setFeitos((f) => (feito ? f.filter((x) => x !== t) : [...f, t]))}
                    className="h-4 w-4 accent-[var(--success)]"
                  />
                  <span className={feito ? "text-muted-foreground line-through" : ""}>{t}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          {feitos.length} de {producaoHoje.length} concluídos
        </p>
      </Painel>
    </Pagina>
  );
}
