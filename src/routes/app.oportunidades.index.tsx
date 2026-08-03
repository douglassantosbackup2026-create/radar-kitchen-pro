import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { CardOportunidade } from "@/components/CardOportunidade";
import { useFavoritos, useOportunidades, useToggleFavorito } from "@/lib/db";

type Search = { fav?: boolean | undefined; cat?: string | undefined };

export const Route = createFileRoute("/app/oportunidades/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    fav: search["fav"] === true || search["fav"] === "1" || search["fav"] === "true" ? true : undefined,
    cat: typeof search["cat"] === "string" && search["cat"].length > 0 ? search["cat"] : undefined,
  }),
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
  const { fav, cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isPending, isError } = useOportunidades();
  const favoritos = useFavoritos();
  const toggle = useToggleFavorito();
  const slugs = new Set((favoritos.data ?? []).map((f) => f.oportunidade_slug));

  let lista = data?.lista ?? [];
  if (fav) lista = lista.filter((o) => slugs.has(o.slug));
  if (cat) {
    const catLower = cat.toLowerCase();
    lista = lista.filter((o) => o.categoria.toLowerCase() === catLower);
  }

  return (
    <Pagina
      titulo="Oportunidades"
      descricao="Cada card é uma oportunidade de negócio analisada pela nossa equipe."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            void navigate({
              search: (prev) => ({ ...prev, fav: fav ? undefined : true }),
            })
          }
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            fav ? "bg-gold text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          {fav ? "★ Só favoritos" : "☆ Só favoritos"}
        </button>
        {cat && (
          <button
            type="button"
            onClick={() =>
              void navigate({
                search: (prev) => ({ ...prev, cat: undefined }),
              })
            }
            className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground"
          >
            Categoria: {cat} ×
          </button>
        )}
      </div>
      {(isPending || favoritos.isPending) && <Carregando />}
      {(isError || favoritos.isError) && <Erro />}
      {data && lista.length === 0 && (
        <Vazio
          texto={
            fav
              ? "Nenhum favorito ainda. Toque na estrela nos cards."
              : cat
                ? `Nenhuma oportunidade em ${cat}.`
                : "Nenhuma oportunidade cadastrada ainda."
          }
        />
      )}
      {lista.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {lista.map((o) => (
            <CardOportunidade
              key={o.slug}
              o={o}
              favorito={slugs.has(o.slug)}
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
      )}
      {fav && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/app/oportunidades" className="text-gold underline underline-offset-4">
            Ver todas
          </Link>
        </p>
      )}
    </Pagina>
  );
}
