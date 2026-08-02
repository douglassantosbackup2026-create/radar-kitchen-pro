import type { Selo as SeloTipo } from "@/data/facaevenda";

const mapa: Record<SeloTipo, string> = {
  Explodindo: "🔥",
  Viral: "🚀",
  Crescendo: "📈",
  "Venda constante": "⭐",
};

export function Selo({ selo }: { selo: SeloTipo }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold-soft px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gold uppercase">
      <span aria-hidden>{mapa[selo]}</span>
      {selo}
    </span>
  );
}
