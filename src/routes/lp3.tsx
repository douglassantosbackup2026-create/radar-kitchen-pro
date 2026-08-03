import { createFileRoute, Link } from "@tanstack/react-router";
import { Selo } from "@/components/Selo";
import { landingTsl, type LandingCta, type Plan, type PlanId } from "@/data/landing";
import { landingLp3 } from "@/data/landing-lp3";

export const Route = createFileRoute("/lp3")({
  head: () => ({
    meta: [
      { title: landingLp3.meta.title },
      { name: "description", content: landingLp3.meta.description },
      { property: "og:title", content: landingLp3.meta.title },
      { property: "og:description", content: landingLp3.meta.description },
    ],
  }),
  component: LandingLp3,
});

function CTA({
  children,
  to = "/assinar",
  plano,
}: {
  children?: string;
  to?: LandingCta["to"];
  plano?: PlanId;
}) {
  if (to === "/assinar") {
    return (
      <Link
        to="/assinar"
        search={{ plano: plano ?? "semestral" }}
        className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
      >
        {children ?? landingLp3.hero.cta.label}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
    >
      {children ?? landingLp3.hero.cta.label}
    </Link>
  );
}

function Secao({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-border px-6 py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

function PlanCard({ plan, featured }: { plan: Plan; featured?: boolean }) {
  return (
    <article
      className={`flex flex-col rounded-3xl border p-8 ${
        featured ? "border-gold/40 bg-gold-soft" : "border-border bg-card"
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
      <Link
        to="/assinar"
        search={{ plano: plan.id }}
        className={`mt-8 flex items-center justify-center rounded-xl px-4 py-3 font-semibold transition-colors ${
          featured
            ? "bg-success text-primary-foreground hover:bg-success-hover"
            : "border border-border hover:border-gold/50"
        }`}
      >
        {plan.cta}
      </Link>
    </article>
  );
}

function LandingLp3() {
  const L = landingLp3;

  return (
    <main>
      {/* UPDATED BAR */}
      <div className="border-b border-border bg-card/80 px-4 py-2 text-center text-xs font-medium text-muted-foreground">
        {L.updated}
      </div>

      {/* HERO */}
      <section className="gold-grid relative overflow-hidden px-6 pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.brand}</p>
            <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {L.version}
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-bold leading-[1.15] md:text-5xl">{L.hero.h1}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{L.hero.sub}</p>
          <div className="mt-8">
            <CTA to={L.hero.cta.to} plano={L.hero.cta.plano}>
              {L.hero.cta.label}
            </CTA>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{L.hero.trust}</p>
        </div>
      </section>

      {/* PACKS */}
      <Secao>
        <div className="grid gap-4 sm:grid-cols-3">
          {L.packs.map((pack) => (
            <article key={pack.code} className="rounded-3xl border border-border bg-card p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{pack.code}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{pack.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pack.texto}</p>
              <p className="mt-4 text-xs text-muted-foreground">{pack.meta}</p>
            </article>
          ))}
        </div>
      </Secao>

      {/* CHANGELOG */}
      <Secao className="bg-card/40">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.changelog.label}</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{L.changelog.h2}</h2>
        <p className="mt-3 inline-flex rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
          {L.changelog.badge}
        </p>
        <ul className="mt-10 space-y-3">
          {L.changelog.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted-foreground md:text-base">
              <span className="font-semibold text-success" aria-hidden>
                +
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Secao>

      {/* WORKSPACE EXPLORER */}
      <Secao>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.workspace.label}</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{L.workspace.h2}</h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-border" aria-hidden />
            <span className="size-2.5 rounded-full bg-border" aria-hidden />
            <span className="size-2.5 rounded-full bg-border" aria-hidden />
            <span className="ml-2 text-xs text-muted-foreground">faca-e-venda / plataforma</span>
          </div>
          <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Pastas
              </p>
              <ul className="mt-4 space-y-2 font-mono text-sm">
                {L.workspace.folders.map((f) => (
                  <li key={f.name} className="flex items-center gap-2 text-foreground">
                    <span className="text-muted-foreground" aria-hidden>
                      {f.kind === "folder" ? "📁" : "📄"}
                    </span>
                    {f.name}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Atalhos
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {L.workspace.shortcuts.map((s) => (
                  <li key={s.keys} className="flex items-center justify-between gap-3">
                    <span className="rounded border border-border bg-background px-2 py-0.5 text-xs font-semibold">
                      {s.keys}
                    </span>
                    <span className="text-muted-foreground">{s.action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                {L.workspace.highlight.title}
              </p>
              <p className="mt-3 font-display text-3xl font-bold">{L.workspace.highlight.price}</p>
              <ul className="mt-6 space-y-3">
                {L.workspace.highlight.items.map((item) => (
                  <li
                    key={item.k}
                    className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0"
                  >
                    <span className="font-medium">{item.k}</span>
                    <span className="text-muted-foreground">{item.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Secao>

      {/* PROPERTIES */}
      <Secao className="bg-card/40">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.props.label}</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{L.props.h2}</h2>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          {L.props.rows.map((row) => (
            <div key={row.k} className="rounded-2xl border border-border bg-card px-4 py-4">
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {row.k}
              </dt>
              <dd className="mt-1 font-semibold">{row.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-[10px] font-semibold uppercase tracking-widest text-gold">
          {L.props.categoriesLabel}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {L.props.categories.map((c) => (
            <li
              key={c}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium"
            >
              <span className="mr-1.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
                CAT
              </span>
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[10px] font-semibold uppercase tracking-widest text-gold">
          {L.props.includedLabel}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {L.props.included.map((i) => (
            <li key={i} className="rounded-xl border border-border bg-card px-3 py-1.5 text-sm">
              {i}
            </li>
          ))}
        </ul>
      </Secao>

      {/* README */}
      <Secao>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.readme.label}</p>
        <div className="mt-8 space-y-10">
          <div>
            <h3 className="font-display text-xl font-semibold">{L.readme.forWho.h3}</h3>
            <ul className="mt-4 space-y-3">
              {L.readme.forWho.items.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="text-gold" aria-hidden>
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">{L.readme.transform.h3}</h3>
            <p className="mt-4 text-muted-foreground">{L.readme.transform.p}</p>
          </div>
        </div>
      </Secao>

      {/* STATS */}
      <Secao className="bg-card/40">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {L.stats.map((s) => (
            <div key={s.v} className="text-center sm:text-left">
              <p className="font-display text-3xl font-bold text-gold md:text-4xl">{s.k}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* PLANS */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold md:text-4xl">{L.plansIntro.h2}</h2>
          <p className="mt-3 text-muted-foreground">{L.plansIntro.sub}</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {landingTsl.plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} featured={plan.id === "semestral"} />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-success">{L.guarantee.label}</p>
            <h3 className="mt-3 text-2xl font-bold">{L.guarantee.h2}</h3>
            <p className="mt-3 text-muted-foreground">{L.guarantee.p}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Secao className="bg-card/40">
        <h2 className="text-3xl font-bold md:text-4xl">FAQ</h2>
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {L.faq.map(([p, r]) => (
            <div key={p} className="py-6">
              <dt className="font-display font-semibold">{p}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{r}</dd>
            </div>
          ))}
        </dl>
      </Secao>

      {/* FINAL */}
      <Secao>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.brand}</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">{L.final.h2}</h2>
          <div className="mt-8 flex justify-center">
            <CTA to={L.final.cta.to} plano={L.final.cta.plano}>
              {L.final.cta.label}
            </CTA>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{L.final.note}</p>
        </div>
      </Secao>
    </main>
  );
}
