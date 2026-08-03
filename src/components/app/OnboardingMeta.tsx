import { brl } from "@/data/facaevenda";
import { METAS_MENSAIS, type MetaMensal } from "@/lib/onboarding";

export function OnboardingMeta({
  onEscolher,
}: {
  onEscolher: (meta: MetaMensal) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-meta-titulo"
    >
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Renda extra</p>
        <h2 id="onboarding-meta-titulo" className="mt-2 font-display text-2xl font-bold">
          Quanto você quer fazer a mais por mês?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Escolha uma meta. O Radar organiza o que produzir para chegar lá — sem adivinhar o próximo passo.
        </p>
        <div className="mt-6 grid gap-3">
          {METAS_MENSAIS.map((meta) => (
            <button
              key={meta}
              type="button"
              onClick={() => onEscolher(meta)}
              className="rounded-2xl border border-border bg-background px-4 py-4 text-left transition-colors hover:border-gold/50 hover:bg-gold/5"
            >
              <span className="font-display text-xl font-bold">{brl(meta)}</span>
              <span className="mt-1 block text-xs text-muted-foreground">por mês, no seu ritmo</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
