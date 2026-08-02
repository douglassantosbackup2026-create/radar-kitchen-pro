import { Link } from "@tanstack/react-router";
import { Selo } from "@/components/Selo";
import { brl, type Oportunidade } from "@/data/facaevenda";

type Props = {
  o: Oportunidade;
  favorito?: boolean;
  onToggleFavorito?: () => void;
};

export function CardOportunidade({ o, favorito = false, onToggleFavorito }: Props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold/40">
      {onToggleFavorito && (
        <button
          type="button"
          aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorito();
          }}
          className="absolute right-3 top-14 z-10 rounded-full bg-background/90 px-2.5 py-1 text-sm shadow-sm transition-colors hover:bg-background"
        >
          {favorito ? "★" : "☆"}
        </button>
      )}
      <Link
        to="/app/oportunidades/$slug"
        params={{ slug: o.slug }}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={o.imagem}
            alt={o.nome}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Selo selo={o.selo} />
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-xs font-semibold text-gold">
            {o.indice}/100
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3 className="font-display text-lg font-semibold">{o.nome}</h3>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Lucro estimado</dt>
              <dd className="font-semibold text-gold">{brl(o.lucroEstimado)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Investimento</dt>
              <dd className="font-semibold">{brl(o.investimento)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Tempo</dt>
              <dd className="font-semibold">{o.tempoMin} min</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Demanda</dt>
              <dd className="font-semibold text-gold">{"★".repeat(o.demanda)}</dd>
            </div>
          </dl>
          <span className="mt-auto inline-flex items-center justify-center rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-success-hover">
            Começar agora
          </span>
        </div>
      </Link>
    </div>
  );
}
