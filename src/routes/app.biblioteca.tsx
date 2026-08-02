import { createFileRoute, Link } from "@tanstack/react-router";
import { Pagina } from "@/components/app/Pagina";
import { categorias, oportunidades } from "@/data/facaevenda";

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
  return (
    <Pagina titulo="Biblioteca" descricao="Todas as receitas. Organizadas por categoria, nunca em PDF.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categorias.map((c) => (
          <div key={c.nome} className="rounded-2xl border border-border bg-card p-5">
            <span className="text-2xl" aria-hidden>
              {c.icone}
            </span>
            <p className="mt-3 font-display font-semibold">{c.nome}</p>
            <p className="text-sm text-muted-foreground">{c.total} receitas</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-widest text-gold">
        Adicionadas recentemente
      </h2>
      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {oportunidades.map((o) => (
          <li key={o.slug}>
            <Link
              to="/app/oportunidades/$slug"
              params={{ slug: o.slug }}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
            >
              <img src={o.imagem} alt="" loading="lazy" className="h-12 w-12 rounded-lg object-cover" />
              <span className="flex-1">
                <span className="block font-medium">{o.nome}</span>
                <span className="block text-sm text-muted-foreground">{o.categoria}</span>
              </span>
              <span className="text-sm text-gold">{o.indice}/100</span>
            </Link>
          </li>
        ))}
      </ul>
    </Pagina>
  );
}
