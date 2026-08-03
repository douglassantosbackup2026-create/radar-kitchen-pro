import { createFileRoute, Link } from "@tanstack/react-router";
import { CalculadoraPrecoDemo } from "@/components/CalculadoraPreco";
import { HeroVendasAnimadas } from "@/components/HeroVendasAnimadas";
import { IndiceOportunidade } from "@/components/IndiceOportunidade";
import { Selo } from "@/components/Selo";
import {
  brl,
  maisVendidas as maisVendidasSeed,
  oportunidadeDoDia as oportunidadeSeed,
  tendencias as tendenciasSeed,
  type Selo as SeloTipo,
} from "@/data/facaevenda";
import { landingTsl, type LandingCta, type Plan, type PlanId } from "@/data/landing";
import { useOportunidades, useTendencias } from "@/lib/db";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: landingTsl.meta.title },
      { name: "description", content: landingTsl.meta.description },
      { property: "og:title", content: landingTsl.meta.title },
      { property: "og:description", content: landingTsl.meta.description },
    ],
  }),
  component: Landing,
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
        search={plano ? { plano } : { plano: "semestral" }}
        className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
      >
        {children ?? landingTsl.hero.cta.label}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
    >
      {children ?? landingTsl.hero.cta.label}
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

function Landing() {
  const oportunidades = useOportunidades();
  const tendenciasQ = useTendencias();

  const oportunidadeDoDia = oportunidades.data?.doDia ?? oportunidadeSeed;
  const tendencias =
    tendenciasQ.data?.map((t) => ({ nome: t.nome, nota: t.nota, selo: t.selo })) ?? tendenciasSeed;
  const maisVendidas =
    oportunidades.data?.lista
      .slice()
      .sort((a, b) => b.indice - a.indice)
      .slice(0, 4)
      .map((o) => o.nome) ?? maisVendidasSeed;

  const L = landingTsl;
  const ops = L.ops;

  return (
    <main>
      {/* HERO */}
      <section className="gold-grid relative overflow-hidden px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            {L.hero.eyebrow}
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-[1.1] md:text-5xl lg:text-[3.25rem]">
            {L.hero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{L.hero.sub}</p>
          <div className="mx-auto mt-10 flex max-w-sm justify-center">
            <HeroVendasAnimadas />
          </div>
          <div className="mt-8 flex justify-center">
            <CTA to={L.hero.cta.to} plano="semestral">
              {L.hero.cta.label}
            </CTA>
          </div>
          <p className="mt-8 text-sm font-medium text-foreground">{L.hero.trust}</p>
        </div>
      </section>

      {/* PROBLEMA */}
      <Secao>
        <Titulo>{L.problem.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{L.problem.p}</p>
        <p className="mt-8 max-w-2xl text-lg font-medium">{L.problem.bridge}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {L.problem.checklist.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              ✔ {item}
            </li>
          ))}
        </ul>
      </Secao>

      {/* VERDADE */}
      <Secao className="bg-card/40">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.truth.label}</p>
        <p className="mt-4 max-w-3xl text-2xl font-bold leading-snug md:text-3xl">{L.truth.p}</p>
      </Secao>

      {/* OFERTA PRO */}
      <Secao>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.offer.label}</p>
        <Titulo>{L.offer.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{L.offer.p}</p>
      </Secao>

      {/* RADAR */}
      <Secao className="bg-card/40">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{L.radar.label}</p>
        <Titulo>{L.radar.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{L.radar.p}</p>
      </Secao>

      {/* DAILY */}
      <Secao>
        <Titulo>{L.daily.h2}</Titulo>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {L.daily.items.map((d) => (
            <article key={d.titulo} className="rounded-3xl border border-border bg-card p-6">
              <p className="text-2xl" aria-hidden>
                {d.icone}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold">{d.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.texto}</p>
            </article>
          ))}
        </div>
      </Secao>

      {/* MANHÃ */}
      <Secao className="bg-card/40">
        <Titulo>{L.morning.h2}</Titulo>
        <div className="mt-10 max-w-md rounded-3xl border border-border bg-card p-6 shadow-lg">
          <p className="font-display text-xl font-semibold">{L.morning.saudacao}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gold">
            {L.morning.label}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">{oportunidadeDoDia.nome}</h3>
          <p className="mt-2 text-sm text-gold">
            {"★".repeat(oportunidadeDoDia.demanda)} Alta procura
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Lucro estimado</p>
          <p className="font-display text-2xl font-bold text-gold">
            {brl(oportunidadeDoDia.lucroEstimado)}
          </p>
          <Link
            to="/app/oportunidades/$slug"
            params={{ slug: oportunidadeDoDia.slug }}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
          >
            Começar agora
          </Link>
        </div>
      </Secao>

      {/* FICHA */}
      <Secao>
        <Titulo>{L.ficha.h2}</Titulo>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <img
              src={oportunidadeDoDia.imagem}
              alt={oportunidadeDoDia.nome}
              width={1024}
              height={768}
              className="aspect-[16/10] w-full rounded-2xl object-cover"
            />
            <h3 className="mt-5 font-display text-2xl font-bold">{oportunidadeDoDia.nome}</h3>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs text-muted-foreground">Preço sugerido</dt>
                <dd className="mt-1 font-semibold">{brl(oportunidadeDoDia.precoSugerido)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Custo por unidade</dt>
                <dd className="mt-1 font-semibold">{brl(oportunidadeDoDia.custoUnitario)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Lucro estimado</dt>
                <dd className="mt-1 font-semibold text-gold">{brl(oportunidadeDoDia.lucroEstimado)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Tempo de preparo</dt>
                <dd className="mt-1 font-semibold">{oportunidadeDoDia.tempoMin} min</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Rendimento</dt>
                <dd className="mt-1 font-semibold">{oportunidadeDoDia.rendimento}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Validade</dt>
                <dd className="mt-1 font-semibold">{oportunidadeDoDia.validade}</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-muted-foreground">{L.ficha.more}</p>
          </div>
          <IndiceOportunidade
            indice={oportunidadeDoDia.indice}
            criterios={oportunidadeDoDia.criterios}
          />
        </div>
      </Secao>

      {/* CALCULADORA */}
      <Secao className="bg-card/40">
        <Titulo>{L.calc.h2}</Titulo>
        <p className="mt-4 max-w-2xl text-muted-foreground">{L.calc.note}</p>
        <div className="mt-10">
          <CalculadoraPrecoDemo />
        </div>
      </Secao>

      {/* OPS */}
      <Secao>
        <Titulo>{L.ops.h2}</Titulo>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Produção hoje</p>
            <ul className="mt-4 space-y-2 text-sm">
              {ops.producao.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-4 rounded border border-border" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Pedidos</p>
            <ul className="mt-4 space-y-2 text-sm">
              {ops.pedidos.map((p) => (
                <li key={p.nome} className="flex justify-between gap-2">
                  <span>{p.nome}</span>
                  <span className="text-muted-foreground">{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Clientes</p>
            <p className="mt-4 font-display font-semibold">{ops.cliente.nome}</p>
            <p className="mt-1 text-sm text-muted-foreground">{ops.cliente.resumo}</p>
            <p className="mt-3 text-sm">🎂 {ops.cliente.aniversario}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Financeiro hoje</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Entrou {brl(ops.financeiro.entrou)} · Saiu {brl(ops.financeiro.saiu)}
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-gold">
              {brl(ops.financeiro.entrou - ops.financeiro.saiu)}
            </p>
            <p className="text-xs text-muted-foreground">lucro do dia</p>
          </div>
        </div>
      </Secao>

      {/* SEMANAS + TENDÊNCIAS */}
      <Secao className="bg-card/40">
        <Titulo>{L.weeks.h2}</Titulo>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {L.weeks.items.map((w) => (
            <div key={w.quando} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-gold">{w.quando}</p>
              <p className="mt-2 font-display font-semibold">{w.nome}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Tendências</p>
            <ul className="mt-4 space-y-3">
              {tendencias.slice(0, 4).map((t) => (
                <li key={t.nome} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
                  <span className="font-medium">{t.nome}</span>
                  <Selo selo={t.selo as SeloTipo} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Mais vendidas</p>
            <ol className="mt-4 space-y-3">
              {maisVendidas.map((nome, i) => (
                <li key={nome} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
                  <span className="font-display font-bold text-gold">{i + 1}.</span>
                  <span className="font-medium">{nome}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Secao>

      {/* ÍNDICE copy */}
      <Secao>
        <Titulo>{L.indice.h2}</Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{L.indice.p}</p>
      </Secao>

      {/* INCLUSOS */}
      <Secao className="bg-card/40">
        <Titulo>{L.inclusos.h2}</Titulo>
        <ul className="mt-10 flex flex-wrap gap-3">
          {L.inclusos.items.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              {chip}
            </li>
          ))}
        </ul>
      </Secao>

      {/* CALENDÁRIO SAZONAL */}
      <Secao>
        <Titulo>{L.calendarioSazonal.h2}</Titulo>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {L.calendarioSazonal.meses.map((c) => (
            <div key={c.mes} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-gold">{c.mes}</p>
              <p className="mt-1 font-display font-semibold">{c.data}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.itens.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* PLANOS */}
      <Secao className="bg-card/40">
        <Titulo>{L.plansIntro}</Titulo>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {L.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} featured={plan.id === "semestral"} />
          ))}
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

      {/* CTA FINAL */}
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
