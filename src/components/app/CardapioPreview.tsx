import { brl } from "@/data/facaevenda";
import { itensIncluidos, type CardapioPrefs } from "@/lib/cardapio";

export function CardapioPreview({ prefs }: { prefs: CardapioPrefs }) {
  const itens = itensIncluidos(prefs);
  const zap = prefs.whatsapp.replace(/\D/g, "");

  return (
    <div
      className="mx-auto flex aspect-[4/5] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-gold/40 bg-card p-6 text-foreground shadow-sm"
      aria-label="Preview do cardápio para Instagram"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">Faça &amp; Venda</p>
      <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
        {prefs.nomeNegocio.trim() || "Minha cozinha"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{prefs.titulo.trim() || "Cardápio da semana"}</p>

      <ul className="mt-6 flex-1 space-y-3 overflow-hidden">
        {itens.length === 0 && (
          <li className="text-sm text-muted-foreground">Marque itens no editor para aparecer aqui.</li>
        )}
        {itens.map((i) => (
          <li key={i.slug} className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-2">
            <span className="font-medium leading-snug">{i.nome}</span>
            <span className="shrink-0 font-display font-semibold tabular-nums text-success">
              {brl(i.preco)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Peça no Zap</p>
        <p className="mt-1 font-display text-lg font-semibold">
          {zap.length >= 10
            ? zap.replace(/^55/, "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
            : prefs.whatsapp.trim() || "Seu WhatsApp"}
        </p>
      </div>
    </div>
  );
}
