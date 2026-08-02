import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CalculadoraPreco } from "@/components/CalculadoraPreco";
import { IndiceOportunidade } from "@/components/IndiceOportunidade";
import { Selo } from "@/components/Selo";
import {
  brl,
  calendario,
  maisVendidas,
  oportunidadeDoDia,
  tendencias,
} from "@/data/facaevenda";

const TITULO = "Faça & Venda PRO — Descubra hoje o que vender amanhã";
const DESC =
  "Todos os dias nossa equipe seleciona as receitas que estão vendendo, calcula custo, preço e lucro e organiza tudo para você começar ainda hoje.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Landing,
});

function CTA({ children = "Quero descobrir o que vender hoje" }: { children?: string }) {
  return (
    <Link
      to="/assinar"
      className="inline-flex items-center justify-center rounded-xl bg-success px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
    >
      {children}
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

const inclusos = [
  "🔥 Oportunidade do Dia",
  "📈 Radar de Tendências",
  "📖 Biblioteca Completa",
  "💰 Precificação",
  "📅 Agenda",
  "🛒 Lista de Compras",
  "📦 Produção",
  "📝 Pedidos",
  "👥 Clientes",
  "📈 Financeiro",
  "📊 Simulador",
  "🏆 Desafios",
];

const faq = [
  ["Preciso ter experiência na cozinha?", "Não. Cada receita traz o passo a passo completo, tempo de preparo e nível de dificuldade."],
  ["As receitas são atualizadas?", "Sim. O Radar Faça & Venda™ adiciona novas oportunidades toda semana."],
  ["Quanto preciso investir para começar?", "A maioria das oportunidades começa com menos de R$100 em ingredientes."],
  ["Serve só para doces?", "Não. Há marmitas, salgados, bebidas, panificação e café da manhã."],
  ["Funciona no celular?", "Sim, a plataforma foi feita para ser usada no celular dentro da cozinha."],
  ["Posso cancelar quando quiser?", "Sim, a assinatura é sem fidelidade e o cancelamento é feito em um clique."],
  ["Como funciona a garantia?", "Você tem 7 dias para testar. Se não gostar, devolvemos 100% do valor."],
  ["Recebo suporte?", "Sim, atendimento por e-mail em até 24 horas úteis."],
];

function Landing() {
  return (
    <main>
      {/* HERO */}
      <section className="gold-grid relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto mb-8 flex max-w-6xl justify-end">
          <ThemeToggle />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Clube das receitas que vendem
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
              Descubra hoje o que vender amanhã.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Todos os dias nossa equipe seleciona as receitas que estão fazendo mais sucesso em
              vendas e entrega tudo pronto: receita completa, custo, preço de venda, lucro estimado
              e plano de produção. Você não precisa procurar. Só escolher e vender.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CTA />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="text-gold">★★★★★</span> Mais de 4.200 cozinheiras já utilizam a
              plataforma.
            </p>
          </div>

          <div className="rounded-3xl border border-gold/25 bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                🔥 Oportunidade do Dia
              </p>
              <span className="text-xs text-muted-foreground">hoje</span>
            </div>
            <img
              src={oportunidadeDoDia.imagem}
              alt={oportunidadeDoDia.nome}
              width={1024}
              height={768}
              className="mt-4 aspect-[16/10] w-full rounded-2xl object-cover"
            />
            <h2 className="mt-5 font-display text-2xl font-bold">🍓 {oportunidadeDoDia.nome}</h2>
            <dl className="mt-5 grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Demanda</dt>
                <dd className="mt-1 text-gold">★★★★★</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Lucro</dt>
                <dd className="mt-1 font-semibold text-gold">R$380</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Investimento</dt>
                <dd className="mt-1 font-semibold">R$72</dd>
              </div>
            </dl>
            <Link
              to="/app/oportunidades/$slug"
              params={{ slug: oportunidadeDoDia.slug }}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
            >
              Começar hoje
            </Link>
          </div>
        </div>
      </section>

      {/* 2 - A DOR */}
      <Secao>
        <Titulo>
          Enquanto milhares de pessoas passam horas procurando receitas no YouTube...
        </Titulo>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Um vídeo diz para vender brownie. No outro dia, cocada. Depois pudim. Depois mandioca na
          garrafa. A dúvida nunca acaba — e no fim você não faz nada.
        </p>
        <p className="mt-10 text-xl font-semibold">
          Você abre a plataforma e encontra exatamente o que vale a pena produzir hoje.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {["Receita", "Ingredientes", "Custo", "Preço", "Lucro", "Lista de compras", "Checklist"].map(
            (i) => (
              <li
                key={i}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
              >
                ✔ {i}
              </li>
            ),
          )}
        </ul>
      </Secao>

      {/* 3 - A VERDADE */}
      <Secao className="bg-card/40">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">A verdade</p>
        <Titulo>
          O problema não é cozinhar. Nem falta de receita. É não saber qual receita realmente vale a
          pena vender hoje.
        </Titulo>
      </Secao>

      {/* 4 + 5 - NOVA OPORTUNIDADE E MECANISMO */}
      <Secao>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              A nova oportunidade
            </p>
            <Titulo>Faça &amp; Venda PRO</Titulo>
            <p className="mt-6 text-lg text-muted-foreground">
              Uma assinatura que mostra as receitas que realmente estão vendendo. Toda semana novas
              oportunidades, tudo organizado, sem precisar procurar.
            </p>
          </div>
          <div className="rounded-3xl border border-gold/25 bg-gold-soft p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">O mecanismo</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-gold">Radar Faça &amp; Venda™</h3>
            <p className="mt-4 text-muted-foreground">
              Nossa equipe acompanha diariamente tendências, sazonalidades e receitas com alto
              potencial comercial para selecionar apenas as melhores oportunidades. Você não perde
              tempo pesquisando — você entra e escolhe.
            </p>
          </div>
        </div>
      </Secao>

      {/* 6 - O QUE VOCÊ ENCONTRA TODOS OS DIAS */}
      <Secao className="bg-card/40">
        <Titulo>O que você encontra todos os dias</Titulo>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["🔥", "Oportunidade do Dia", "Uma escolha por dia. Só uma."],
            ["📈", "Tendências da Semana", "O que está explodindo agora."],
            ["📅", "Calendário Comercial", "Datas que vendem, com antecedência."],
            ["🥇", "Mais Vendidas", "O ranking do que sai todo dia."],
            ["🆕", "Novas Receitas", "Atualização semanal do Radar."],
          ].map(([icone, titulo, texto]) => (
            <div key={titulo} className="rounded-2xl border border-border bg-card p-6">
              <span className="text-2xl" aria-hidden>
                {icone}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* 7 - MOCKUP CELULAR */}
      <Secao>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Titulo>Imagine abrir o celular pela manhã e ver isso:</Titulo>
          <div className="mx-auto w-full max-w-sm rounded-[2.25rem] border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Bom dia, Maria 👋</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-gold">Hoje recomendamos</p>
            <h3 className="mt-4 font-display text-2xl font-bold">Brownie Gourmet</h3>
            <p className="mt-1 text-gold">★★★★★ Alta procura</p>
            <div className="mt-5 rounded-2xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Lucro estimado</p>
              <p className="font-display text-3xl font-bold text-gold">R$280</p>
            </div>
            <span className="mt-5 flex items-center justify-center rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground">
              Começar agora
            </span>
          </div>
        </div>
      </Secao>

      {/* 8 - RECEITA PRONTA PARA VENDER */}
      <Secao className="bg-card/40">
        <Titulo>Cada receita já vem pronta para vender.</Titulo>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <img
            src={oportunidadeDoDia.imagem}
            alt="Morango do Amor pronto para venda"
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Preço sugerido", brl(oportunidadeDoDia.precoSugerido)],
                ["Custo por unidade", brl(oportunidadeDoDia.custoUnitario)],
                ["Lucro estimado", brl(oportunidadeDoDia.lucroEstimado)],
                ["Tempo de preparo", `${oportunidadeDoDia.tempoMin} min`],
                ["Rendimento", oportunidadeDoDia.rendimento],
                ["Validade", oportunidadeDoDia.validade],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-secondary p-4">
                  <p className="text-xs text-muted-foreground">{k}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{v}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Mais: modo de preparo, lista de compras, checklist de produção e o botão
              <span className="text-foreground"> Adicionar ao plano da semana</span>.
            </p>
          </div>
        </div>
      </Secao>

      {/* 9 - CALCULADORA */}
      <Secao>
        <Titulo>Nunca mais fique em dúvida sobre quanto cobrar.</Titulo>
        <div className="mt-10">
          <CalculadoraPreco />
        </div>
      </Secao>

      {/* 10 - COZINHA COMO NEGÓCIO */}
      <Secao className="bg-card/40">
        <Titulo>Sua cozinha organizada como um pequeno negócio.</Titulo>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Produção hoje</p>
            <ul className="mt-4 space-y-2 text-sm">
              {["Fazer Brownie", "Fazer Pudim", "Embalar", "Entregar"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-4 w-4 rounded border border-border" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Pedidos</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[["Maria", "Entregue"], ["Joana", "Em produção"], ["Carla", "Pendente"]].map(
                ([n, s]) => (
                  <li key={n} className="flex justify-between">
                    <span>{n}</span>
                    <span className="text-muted-foreground">{s}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Clientes</p>
            <p className="mt-4 font-display text-lg font-semibold">Maria</p>
            <p className="text-sm text-muted-foreground">Último pedido R$60 · Favorito: Pudim</p>
            <p className="mt-3 text-sm text-gold">🎂 Aniversário em 14/09</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Financeiro hoje</p>
            <p className="mt-4 text-sm text-muted-foreground">Entrou R$320 · Saiu R$85</p>
            <p className="mt-2 font-display text-3xl font-bold text-success">R$235</p>
            <p className="text-xs text-muted-foreground">lucro do dia</p>
          </div>
        </div>
      </Secao>

      {/* 11 - NOVAS OPORTUNIDADES */}
      <Secao>
        <Titulo>Toda semana entram novas oportunidades.</Titulo>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Semana passada", "Morango do Amor"],
            ["Essa semana", "Brownie Dubai"],
            ["Próxima", "Copo Pistache"],
          ].map(([quando, nome], i) => (
            <div
              key={nome}
              className={`rounded-2xl border p-6 ${i === 1 ? "border-gold/40 bg-gold-soft" : "border-border bg-card"}`}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{quando}</p>
              <p className={`mt-3 font-display text-xl font-semibold ${i === 1 ? "text-gold" : ""}`}>
                {nome}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-gold">📈 Tendências</p>
            <ul className="mt-4 space-y-3 text-sm">
              {tendencias.map((t) => (
                <li key={t.nome} className="flex items-center justify-between gap-4">
                  <span>{t.nome}</span>
                  <span className="text-xs text-muted-foreground">{t.nota}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-gold">🥇 Mais vendidas</p>
            <ol className="mt-4 space-y-3 text-sm">
              {maisVendidas.map((m, i) => (
                <li key={m} className="flex gap-3">
                  <span className="w-5 text-muted-foreground">{i + 1}.</span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Secao>

      {/* 12 - ÍNDICE DE OPORTUNIDADE */}
      <Secao className="bg-card/40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              📊 Índice de Oportunidade
            </p>
            <Titulo>Cada receita recebe uma nota de 0 a 100.</Titulo>
            <p className="mt-6 text-lg text-muted-foreground">
              Você não precisa mais assistir 30 vídeos tentando adivinhar o que vale a pena. A
              receita já chega analisada pela nossa equipe.
            </p>
          </div>
          <IndiceOportunidade
            indice={oportunidadeDoDia.indice}
            criterios={oportunidadeDoDia.criterios}
          />
        </div>
      </Secao>

      {/* 13 - INCLUSO */}
      <Secao>
        <Titulo>Veja tudo que está incluso</Titulo>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {inclusos.map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card px-5 py-6 text-sm font-medium"
            >
              {i}
            </div>
          ))}
        </div>
      </Secao>

      {/* CALENDÁRIO */}
      <Secao className="bg-card/40">
        <Titulo>Você nunca fica perdida nas datas que mais vendem.</Titulo>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {calendario.map((c) => (
            <div key={c.mes} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-widest text-gold">{c.mes}</p>
              <p className="mt-2 font-display text-lg font-semibold">{c.data}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {c.itens.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Secao>

      {/* 14 - PLANOS */}
      <Secao>
        <Titulo>Quanto vale nunca mais perder tempo procurando o que vender?</Titulo>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Plano Mensal</p>
            <p className="mt-4 font-display text-5xl font-bold">R$47</p>
            <p className="mt-1 text-sm text-muted-foreground">por mês, sem fidelidade</p>
            <Link
              to="/assinar"
              className="mt-8 flex items-center justify-center rounded-xl border border-border px-4 py-3 font-semibold transition-colors hover:border-gold/50"
            >
              Assinar mensal
            </Link>
          </div>
          <div className="rounded-3xl border border-gold/40 bg-gold-soft p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-gold">Plano Anual</p>
              <Selo selo="Explodindo" />
            </div>
            <p className="mt-4 font-display text-5xl font-bold text-gold">R$297</p>
            <p className="mt-1 text-sm text-muted-foreground">por ano — equivale a R$24,75/mês</p>
            <Link
              to="/assinar"
              className="mt-8 flex items-center justify-center rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
            >
              Quero assinar
            </Link>
          </div>
        </div>
        <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Biblioteca completa de receitas",
            "Novas receitas toda semana",
            "Radar de tendências",
            "Calendário sazonal",
            "Precificação e simulador de lucro",
            "Lista de compras e produção",
            "Pedidos, clientes e financeiro",
            "Favoritos e desafios",
          ].map((b) => (
            <li key={b}>✔ {b}</li>
          ))}
        </ul>
      </Secao>

      {/* 15 - GARANTIA + FAQ */}
      <Secao className="bg-card/40">
        <div className="rounded-3xl border border-success/30 bg-card p-8">
          <p className="text-xs uppercase tracking-widest text-success">Garantia</p>
          <h2 className="mt-3 font-display text-2xl font-bold">7 dias para testar sem risco.</h2>
          <p className="mt-3 text-muted-foreground">
            Se você não encontrar pelo menos uma oportunidade que valha a pena produzir, devolvemos
            100% do valor.
          </p>
        </div>

        <h2 className="mt-16 text-3xl font-bold md:text-4xl">Perguntas frequentes</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {faq.map(([p, r]) => (
            <div key={p} className="py-6">
              <dt className="font-display font-semibold">{p}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{r}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Todos os dias uma nova oportunidade de faturar na sua cozinha.
          </h2>
          <div className="mt-8">
            <CTA />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Quer ver por dentro?{" "}
            <Link to="/app" className="text-gold underline underline-offset-4">
              Conheça a plataforma
            </Link>
          </p>
        </div>
      </Secao>

      <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted-foreground">
        Faça &amp; Venda PRO — Radar Faça &amp; Venda™
      </footer>
    </main>
  );
}
