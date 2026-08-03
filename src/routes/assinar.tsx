import { createFileRoute, Link } from "@tanstack/react-router";
import { Selo } from "@/components/Selo";
import { landingTsl, type Plan, type PlanId } from "@/data/landing";

const TITULO = "Assinar o Faça & Venda PRO";
const DESC =
  "Escolha Mensal, Semestral ou Anual e descubra todos os dias o que vender na sua cozinha.";

const PLANOS: PlanId[] = ["mensal", "semestral", "anual"];

function parsePlano(v: unknown): PlanId | undefined {
  return typeof v === "string" && (PLANOS as string[]).includes(v) ? (v as PlanId) : undefined;
}

export const Route = createFileRoute("/assinar")({
  validateSearch: (search: Record<string, unknown>): { plano?: PlanId } => {
    const plano = parsePlano(search["plano"]);
    return plano ? { plano } : {};
  },
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Assinar,
});

function PlanPick({ plan, selected }: { plan: Plan; selected: boolean }) {
  const featured = plan.id === "semestral";
  return (
    <article
      className={`flex flex-col rounded-3xl border p-8 transition-shadow ${
        selected
          ? "border-gold ring-2 ring-gold/40 shadow-lg"
          : featured
            ? "border-gold/40 bg-gold-soft"
            : "border-border bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{plan.nome}</p>
        {plan.destaque ? <Selo selo="Explodindo" /> : null}
      </div>
      {plan.destaque ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gold">{plan.destaque}</p>
      ) : null}
      <p className="mt-4 font-display text-5xl font-bold">
        {plan.preco}
        <span className="text-base font-normal text-muted-foreground">{plan.periodo}</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{plan.nota}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
        {landingTsl.planBenefits.map((b) => (
          <li key={b}>✔ {b}</li>
        ))}
      </ul>
      <p className="mt-6 rounded-xl border border-dashed border-border px-4 py-3 text-center text-sm text-muted-foreground">
        Checkout em breve
      </p>
    </article>
  );
}

function Assinar() {
  const { plano } = Route.useSearch();
  const selected = plano ?? "semestral";

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold">
          Em breve
        </p>
        <h1 className="mt-4 text-center text-3xl font-bold md:text-5xl">
          Escolha seu plano Faça & Venda PRO
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Mensal, Semestral ou Anual — mesmos benefícios. O checkout ainda está sendo preparado.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {landingTsl.plans.map((plan) => (
            <PlanPick key={plan.id} plan={plan} selected={plan.id === selected} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/app"
            className="rounded-xl bg-success px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
          >
            Conhecer a plataforma
          </Link>
          <Link to="/" className="rounded-xl border border-border px-6 py-3 font-semibold">
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
