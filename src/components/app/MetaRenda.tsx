import { brl } from "@/data/facaevenda";
import {
  ASSINATURA_MENSAL,
  FORNADAS_ALVO,
  progressoMeta,
  type MetaMensal,
} from "@/lib/onboarding";

export function MetaRenda({
  metaMensal,
  faturamento,
  lucroDuasFornadas,
  recuperou,
}: {
  metaMensal: MetaMensal | null;
  faturamento: number;
  lucroDuasFornadas: number | null;
  recuperou: boolean;
}) {
  if (!metaMensal) return null;

  const pct = progressoMeta(faturamento, metaMensal);
  const pctLabel = Math.round(pct * 100);

  return (
    <section className="rounded-2xl border border-gold/30 bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Meta do mês</p>
          <p className="mt-1 font-display text-xl font-bold">{brl(metaMensal)}</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-muted-foreground">Já faturou (pago)</p>
          <p className="font-semibold tabular-nums">{brl(faturamento)}</p>
        </div>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pctLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso da meta: ${pctLabel}%`}
      >
        <div className="h-full rounded-full bg-success transition-all" style={{ width: `${pctLabel}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{pctLabel}% da meta</p>

      {lucroDuasFornadas != null && lucroDuasFornadas > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          {FORNADAS_ALVO} fornadas desta oportunidade ≈{" "}
          <span className="font-semibold text-foreground">{brl(lucroDuasFornadas)}</span> de lucro estimado
        </p>
      )}

      {recuperou ? (
        <p className="mt-3 rounded-xl bg-success/10 px-3 py-2 text-sm font-medium text-success">
          Você já recuperou a assinatura ({brl(ASSINATURA_MENSAL)})
        </p>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          Assinatura mensal: {brl(ASSINATURA_MENSAL)} — registre pedidos pagos para acompanhar
        </p>
      )}
    </section>
  );
}
