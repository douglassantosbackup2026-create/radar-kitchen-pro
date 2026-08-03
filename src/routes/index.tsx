import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { FeedProvasTelegram } from "@/components/DepoimentoTelegram";
import { HeroVendasAnimadas } from "@/components/HeroVendasAnimadas";
import { Selo } from "@/components/Selo";
import { landingTsl, type LandingCta, type Plan, type PlanId } from "@/data/landing";
import { landingLp } from "@/data/landing-lp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: landingLp.meta.title },
      { name: "description", content: landingLp.meta.description },
      { property: "og:title", content: landingLp.meta.title },
      { property: "og:description", content: landingLp.meta.description },
    ],
  }),
  component: LandingLp,
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
        {children ?? landingLp.hero.cta.label}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
    >
      {children ?? landingLp.hero.cta.label}
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
    <section className={`border-t border-border px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{children}</h2>;
}

function Marquee() {
  const text = landingLp.marquee.repeat(6);
  return (
    <div className="overflow-hidden border-y border-border bg-card/60 py-3" aria-hidden>
      <div className="flex w-max animate-marquee">
        <p className="whitespace-nowrap pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {text}
        </p>
        <p className="whitespace-nowrap pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
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

function LandingLp() {
  const L = landingLp;

  return (
    <main>
      {/* URGENCY */}
      <div className="sticky top-0 z-50 bg-success px-4 py-2.5 text-center text-primary-foreground">
        <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold">
          <Clock className="size-4 shrink-0" aria-hidden />
          {L.urgency.label} {L.urgency.endsOn}
        </p>
      </div>

      {/* HERO */}
      <section className="gold-grid relative overflow-hidden px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            {L.brand}
          </p>
          <h1 className="mt-6 text-2xl font-bold leading-[1.25] md:text-4xl lg:text-[2.35rem]">
            {L.hero.h1.map((part) =>
              part.highlight ? (
                <span key={part.text} className="text-gold">
                  {part.text}
                </span>
              ) : (
                <span key={part.text}>{part.text}</span>
              ),
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{L.hero.sub}</p>

          <div className="mx-auto mt-10 flex max-w-sm justify-center">
            <HeroVendasAnimadas />
          </div>

          <div className="mt-10 flex justify-center">
            <CTA to={L.hero.cta.to} plano={L.hero.cta.plano}>
              {L.hero.cta.label}
            </CTA>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {L.hero.trust.map((t) => (
              <li
                key={t.k}
                className="rounded-xl border border-border bg-card/80 px-4 py-2.5 text-left text-sm"
              >
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-gold">
                  {t.k}
                </span>
                <span className="font-semibold">{t.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ESFORÇO */}
      <Secao>
        <Titulo>{L.effort.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{L.effort.p}</p>
        <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <img
            src={L.effort.screenshot}
            alt={L.effort.screenshotAlt}
            width={1600}
            height={900}
            className="h-auto w-full"
            loading="lazy"
          />
        </figure>
        <div className="mt-8">
          <CTA to={L.effort.cta.to} plano={L.effort.cta.plano}>
            {L.effort.cta.label}
          </CTA>
        </div>
      </Secao>

      <Marquee />

      {/* PROVAS */}
      <Secao className="bg-card/40">
        <Titulo>{L.proofs.h2}</Titulo>
        <div className="mx-auto mt-10 max-w-xl">
          <FeedProvasTelegram
            titulo={L.proofs.feed.titulo}
            subtitulo={L.proofs.feed.subtitulo}
            items={L.proofs.items}
          />
        </div>
        <div className="mt-10">
          <CTA>Quero vender com o Radar agora</CTA>
        </div>
      </Secao>

      {/* AUTORIDADE */}
      <Secao>
        <Titulo>{L.authority.h2}</Titulo>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {L.authority.items.map((item) => (
            <article key={item.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{item.titulo}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.texto}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <CTA to={L.hero.cta.to} plano={L.hero.cta.plano}>
            {L.hero.cta.label}
          </CTA>
        </div>
      </Secao>

      <Marquee />

      {/* CATÁLOGO */}
      <Secao className="bg-card/40">
        <Titulo>{L.catalog.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-muted-foreground">{L.catalog.p}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {L.catalog.groups.map((g) => (
            <div key={g.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{g.titulo}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {g.itens.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <CTA to={L.catalog.cta.to} plano={L.catalog.cta.plano}>
            {L.catalog.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* EXCLUSIVOS */}
      <Secao>
        <Titulo>{L.exclusives.h2}</Titulo>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {L.exclusives.items.map((item) => (
            <article key={item.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.texto}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <CTA to={L.exclusives.cta.to} plano={L.exclusives.cta.plano}>
            {L.exclusives.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* WHY */}
      <Secao className="bg-card/40">
        <Titulo>{L.why.h2}</Titulo>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {L.why.points.map((p) => (
            <div key={p.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{p.titulo}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.texto}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <CTA to={L.why.cta.to} plano={L.why.cta.plano}>
            {L.why.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* PLANO 4 PASSOS */}
      <Secao>
        <Titulo>{L.plan4.h2}</Titulo>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {L.plan4.steps.map((s) => (
            <article key={s.n} className="rounded-3xl border border-border bg-card p-6">
              <p className="font-display text-3xl font-bold text-gold">{s.n}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.texto}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <CTA to={L.plan4.cta.to} plano={L.plan4.cta.plano}>
            {L.plan4.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* BÔNUS */}
      <Secao className="bg-card/40">
        <Titulo>E se você quiser acelerar as vendas?</Titulo>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {L.bonus.map((b) => (
            <article key={b.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{b.titulo}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{b.texto}</p>
              <p className="mt-5 text-sm">
                <span className="text-muted-foreground line-through">{b.de}</span>
                <span className="ml-2 font-display text-2xl font-bold text-gold">{b.por}</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{b.regra}</p>
            </article>
          ))}
        </div>
      </Secao>

      {/* STACK + PLANOS */}
      <Secao>
        <Titulo>{L.stack.h2}</Titulo>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <tbody>
              {L.stack.rows.map((r) => (
                <tr key={r.nome} className="border-b border-border/60">
                  <td className="px-6 py-3">{r.nome}</td>
                  <td className="px-6 py-3 text-muted-foreground">{r.valor}</td>
                </tr>
              ))}
              <tr className="bg-secondary/40 font-semibold">
                <td className="px-6 py-4" colSpan={2}>
                  {L.stack.totalAvulso}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{L.stack.nota}</p>

        <h2 className="mt-16 max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          {L.plansIntro}
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {landingTsl.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} featured={plan.id === "semestral"} />
          ))}
        </div>
      </Secao>

      {/* COMUNIDADE */}
      <Secao className="bg-card/40">
        <Titulo>{L.community.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{L.community.p}</p>
        <div className="mt-8">
          <CTA to={L.community.cta.to} plano={L.community.cta.plano}>
            {L.community.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* GARANTIA + FAQ */}
      <Secao>
        <div className="rounded-3xl border border-success/30 bg-card p-8 md:p-10">
          <p className="text-xs uppercase tracking-widest text-success">{L.garantia.label}</p>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">{L.garantia.h2}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{L.garantia.p}</p>
        </div>

        <h2 className="mt-16 text-3xl font-bold md:text-4xl">Perguntas frequentes</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {L.faq.map(([p, r]) => (
            <div key={p} className="py-6">
              <dt className="font-display font-semibold">{p}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{r}</dd>
            </div>
          ))}
        </dl>
      </Secao>

      {/* FINAL */}
      <Secao className="bg-card/40">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{L.final.h2}</h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTA to={L.final.ctaPrimary.to} plano={L.final.ctaPrimary.plano}>
            {L.final.ctaPrimary.label}
          </CTA>
          <Link
            to={L.final.ctaSecondary.to}
            className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-4 text-base font-semibold transition-colors hover:border-gold/50"
          >
            {L.final.ctaSecondary.label}
          </Link>
        </div>
      </Secao>
    </main>
  );
}
