import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { CardOportunidade } from "@/components/CardOportunidade";
import { useFavoritos, useOportunidades, useToggleFavorito } from "@/lib/db";

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
  const oportunidades = useOportunidades();
  const favoritos = useFavoritos();
  const toggle = useToggleFavorito();

  const slugs = new Set((favoritos.data ?? []).map((f) => f.oportunidade_slug));
  const favoritas = (oportunidades.data?.lista ?? []).filter((o) => slugs.has(o.slug));
  const isPending = oportunidades.isPending || favoritos.isPending;
  const isError = oportunidades.isError || favoritos.isError;

  return (
    <Pagina titulo="Favoritos" descricao="As receitas que você usa toda semana.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      {!isPending && !isError && favoritas.length === 0 && (
        <Vazio texto="Nenhum favorito ainda. Toque na estrela nas oportunidades." />
      )}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {favoritas.map((o) => (
          <CardOportunidade
            key={o.slug}
            o={o}
            favorito
            onToggleFavorito={() => {
              toggle.mutate(o.slug, {
                onSuccess: (r) =>
                  toast.success(r.favorito ? "Adicionado aos favoritos" : "Removido dos favoritos"),
                onError: () => toast.error("Não foi possível atualizar o favorito."),
              });
            }}
          />
        ))}
      </div>
    </Pagina>
  );
}
