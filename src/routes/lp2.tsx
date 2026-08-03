import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroVendasAnimadas } from "@/components/HeroVendasAnimadas";
import { Selo } from "@/components/Selo";
import { brl, oportunidadeDoDia as oportunidadeSeed } from "@/data/facaevenda";
import { landingTsl, type LandingCta, type Plan, type PlanId } from "@/data/landing";
import { landingLp2 } from "@/data/landing-lp2";
import { useOportunidades } from "@/lib/db";

export const Route = createFileRoute("/lp2")({
  head: () => ({
    meta: [
      { title: landingLp2.meta.title },
      { name: "description", content: landingLp2.meta.description },
      { property: "og:title", content: landingLp2.meta.title },
      { property: "og:description", content: landingLp2.meta.description },
    ],
  }),
  component: LandingLp2,
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
        {children ?? landingLp2.hero.cta.label}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
    >
      {children ?? landingLp2.hero.cta.label}
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
    <section className={`border-t border-border px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{children}</h2>;
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
      ) : (
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Oferta
        </p>
      )}
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
        Comprar agora
      </Link>
    </article>
  );
}

function LandingLp2() {
  const L = landingLp2;
  const oportunidades = useOportunidades();
  const doDia = oportunidades.data?.doDia ?? oportunidadeSeed;
  const lista = (oportunidades.data?.lista ?? [oportunidadeSeed]).slice(0, 8);

  return (
    <main>
      {/* URGENCY */}
      <div className="bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background">
        {L.urgency}
      </div>

      {/* HERO */}
      <section className="gold-grid relative overflow-hidden px-6 pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.brand}</p>
          <h1 className="mt-4 text-3xl font-bold leading-[1.15] md:text-5xl">{L.hero.h1}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{L.hero.sub}</p>
          <div className="mx-auto mt-8 flex max-w-sm justify-center">
            <HeroVendasAnimadas />
          </div>
          <div className="mt-8 flex justify-center">
            <CTA to={L.hero.cta.to} plano={L.hero.cta.plano}>
              {L.hero.cta.label}
            </CTA>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {L.hero.trust.map((t) => (
              <li
                key={t.k}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <span className="text-muted-foreground">{t.k}: </span>
                <span className="font-semibold">{t.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BENEFITS */}
      <Secao>
        <Titulo>{L.benefits.h2}</Titulo>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {L.benefits.items.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <CTA to={L.benefits.cta.to} plano={L.benefits.cta.plano}>
            {L.benefits.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* GALLERY LIVE */}
      <Secao className="bg-card/40">
        <Titulo>{L.gallery.h2}</Titulo>
        <p className="mt-3 text-sm text-muted-foreground">{L.gallery.note}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lista.map((o) => (
            <article key={o.slug} className="overflow-hidden rounded-3xl border border-border bg-card">
              <img
                src={o.imagem}
                alt={o.nome}
                width={640}
                height={400}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-display font-semibold">{o.nome}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{o.categoria}</p>
                <p className="mt-2 text-sm font-semibold text-gold">Lucro {brl(o.lucroEstimado)}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Destaque de hoje: <span className="font-semibold text-foreground">{doDia.nome}</span>
        </p>
      </Secao>

      {/* PROOFS */}
      <Secao>
        <Titulo>{L.proofs.h2}</Titulo>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {L.proofs.items.map((p) => (
            <article
              key={p.titulo}
              className="rounded-3xl border border-dashed border-border bg-card p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{p.titulo}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.texto}</p>
            </article>
          ))}
        </div>
      </Secao>

      {/* PREPARE */}
      <Secao className="bg-card/40">
        <Titulo>{L.prepare.h2}</Titulo>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {L.prepare.items.map((item) => (
            <article key={item.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.texto}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center font-display text-lg font-semibold text-gold">
          {L.prepare.more}
        </p>
      </Secao>

      {/* CATEGORIES */}
      <Secao>
        <Titulo>{L.categories.h2}</Titulo>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {L.categories.items.map((c) => (
            <div key={c.titulo} className="rounded-2xl border border-border bg-card px-4 py-4">
              <p className="font-semibold">{c.titulo}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.texto}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <CTA to={L.categories.cta.to} plano={L.categories.cta.plano}>
            {L.categories.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* FOR YOU */}
      <Secao className="bg-card/40">
        <Titulo>{L.forYou.h2}</Titulo>
        <ul className="mt-8 max-w-2xl space-y-3">
          {L.forYou.items.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span className="text-gold">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Secao>

      {/* BONUS */}
      <Secao>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.bonus.label}</p>
        <Titulo>{L.bonus.h2}</Titulo>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {L.bonus.items.map((b) => (
            <article key={b.titulo} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{b.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.texto}</p>
              <p className="mt-4 text-sm">
                <span className="text-muted-foreground line-through">{b.de}</span>
                <span className="ml-2 font-semibold text-success">{b.por}</span>
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{L.bonus.nota}</p>
      </Secao>

      {/* PLANS */}
      <Secao className="bg-card/40">
        <Titulo>{L.plansIntro.h2}</Titulo>
        <p className="mt-3 text-muted-foreground">{L.plansIntro.sub}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {landingTsl.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} featured={plan.id === "semestral"} />
          ))}
        </div>
      </Secao>

      {/* SOCIAL */}
      <Secao>
        <Titulo>{L.social.h2}</Titulo>
        <div className="mt-8 flex flex-wrap items-end gap-4">
          <p className="font-display text-5xl font-bold text-gold">{L.social.rating}</p>
          <p className="pb-1 text-sm text-muted-foreground">{L.social.nota}</p>
        </div>
      </Secao>

      {/* GUARANTEE */}
      <Secao className="bg-card/40">
        <p className="text-xs uppercase tracking-widest text-success">{L.guarantee.label}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">{L.guarantee.h2}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{L.guarantee.p}</p>
        <div className="mt-8">
          <CTA to={L.guarantee.cta.to} plano={L.guarantee.cta.plano}>
            {L.guarantee.cta.label}
          </CTA>
        </div>
      </Secao>

      {/* RECEIVE */}
      <Secao>
        <Titulo>{L.receive.h2}</Titulo>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {L.receive.items.map((r) => (
            <div key={r.titulo} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display font-semibold">{r.titulo}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* FAQ */}
      <Secao className="bg-card/40">
        <Titulo>Dúvidas frequentes</Titulo>
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
          <div className="mt-8 flex justify-center">
            <CTA to={L.final.cta.to} plano={L.final.cta.plano}>
              {L.final.cta.label}
            </CTA>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Checkout será configurado posteriormente.</p>
        </div>
      </Secao>
    </main>
  );
}
