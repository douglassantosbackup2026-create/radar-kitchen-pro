import { createFileRoute } from "@tanstack/react-router";
import { Pagina } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { CardOportunidade } from "@/components/CardOportunidade";
import { useOportunidades } from "@/lib/db";

export const Route = createFileRoute("/app/oportunidades/")({
  head: () => ({
    meta: [
      { title: "Oportunidades — Faça & Venda PRO" },
      { name: "description", content: "As receitas com maior potencial de venda selecionadas pelo Radar Faça & Venda." },
      { property: "og:title", content: "Oportunidades — Faça & Venda PRO" },
      { property: "og:description", content: "As receitas com maior potencial de venda desta semana." },
    ],
  }),
  component: Oportunidades,
});

function Oportunidades() {
  const { data, isPending, isError } = useOportunidades();

  return (
    <Pagina titulo="Oportunidades" descricao="Cada card é uma oportunidade de negócio analisada pela nossa equipe.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      {data && data.lista.length === 0 && <Vazio texto="Nenhuma oportunidade cadastrada ainda." />}
      {data && data.lista.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.lista.map((o) => (
            <CardOportunidade key={o.slug} o={o} />
          ))}
        </div>
      )}
    </Pagina>
  );
}
