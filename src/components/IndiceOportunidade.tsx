import type { Criterio } from "@/data/facaevenda";

export function IndiceOportunidade({
  indice,
  criterios,
}: {
  indice: number;
  criterios?: Criterio[];
}) {
  return (
    <div className="rounded-2xl border border-gold/25 bg-gold-soft p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Índice Faça &amp; Venda</p>
        <p className="font-display text-3xl font-bold text-gold">
          {indice}
          <span className="text-base text-muted-foreground">/100</span>
        </p>
      </div>
      {criterios && (
        <ul className="mt-4 space-y-2.5">
          {criterios.map((c) => (
            <li key={c.nome} className="flex items-center gap-3 text-sm">
              <span className="w-44 shrink-0 text-muted-foreground">{c.nome}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <span className="block h-full rounded-full bg-gold" style={{ width: `${c.nota * 10}%` }} />
              </span>
              <span className="w-10 text-right tabular-nums text-foreground">{c.nota}/10</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
