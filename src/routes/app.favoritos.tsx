import { createFileRoute } from "@tanstack/react-router";
import { Pagina } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { CardOportunidade } from "@/components/CardOportunidade";
import { useOportunidades } from "@/lib/db";

export const Route = createFileRoute("/app/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — Faça & Venda PRO" },
      { name: "description", content: "As receitas que você mais usa, sempre à mão." },
      { property: "og:title", content: "Favoritos — Faça & Venda PRO" },
      { property: "og:description", content: "As receitas que você mais usa, sempre à mão." },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { data, isPending, isError } = useOportunidades();
  const favoritas = data?.lista.slice(0, 2) ?? [];

  return (
    <Pagina titulo="Favoritos" descricao="As receitas que você usa toda semana.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      {data && favoritas.length === 0 && <Vazio />}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {favoritas.map((o) => (
          <CardOportunidade key={o.slug} o={o} />
        ))}
      </div>
    </Pagina>
  );
}
