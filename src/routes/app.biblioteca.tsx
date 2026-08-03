import { createFileRoute, Link } from "@tanstack/react-router";
import { Pagina } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { useCategorias } from "@/lib/db";

export const Route = createFileRoute("/app/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — Faça & Venda PRO" },
      { name: "description", content: "Todas as receitas organizadas por categoria: bolos, doces, salgados, marmitas e mais." },
      { property: "og:title", content: "Biblioteca — Faça & Venda PRO" },
      { property: "og:description", content: "Todas as receitas organizadas por categoria." },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  const categorias = useCategorias();

  return (
    <Pagina titulo="Biblioteca" descricao="Escolha uma categoria para ver as oportunidades.">
      {categorias.isError && <Erro />}
      {categorias.isPending && <Carregando />}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categorias.data?.map((c) => (
          <Link
            key={c.id}
            to="/app/oportunidades"
            search={{ cat: c.nome }}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold/40"
          >
            <span className="text-2xl" aria-hidden>
              {c.icone}
            </span>
            <p className="mt-3 font-display font-semibold">{c.nome}</p>
            <p className="text-sm text-muted-foreground">{c.total} receitas</p>
          </Link>
        ))}
      </div>
    </Pagina>
  );
}
