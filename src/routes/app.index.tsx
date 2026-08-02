import { createFileRoute, Link } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { IndiceOportunidade } from "@/components/IndiceOportunidade";
import { brl } from "@/data/facaevenda";
import { aniversariosProximos } from "@/lib/aniversarios";
import { useClientes, useLancamentos, useOportunidades } from "@/lib/db";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Início — Faça & Venda PRO" },
      { name: "description", content: "Sua oportunidade do dia, a receita da semana e o resumo do seu negócio." },
      { property: "og:title", content: "Início — Faça & Venda PRO" },
      { property: "og:description", content: "Sua oportunidade do dia e o resumo do seu negócio." },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { data, isPending, isError } = useOportunidades();
  const lancamentos = useLancamentos();
  const clientes = useClientes();
  const aniversarios = aniversariosProximos(clientes.data ?? [], { dias: 7 });

  const hojeISO = new Date().toISOString().slice(0, 10);
  const doDia = (lancamentos.data ?? []).filter((l) => l.dia === hojeISO);
  const base = doDia.length > 0 ? doDia : (lancamentos.data ?? []).slice(0, 5);
  const soma = (tipo: string) =>
    base.filter((l) => l.tipo === tipo).reduce((t, l) => t + Number(l.valor), 0);
  const entrou = soma("entrada");
  const saiu = soma("saida");

  const o = data?.doDia;
  const semana = data?.daSemana;

  return (
    <Pagina titulo="Bom dia 👋" descricao="Hoje recomendamos uma oportunidade. Só uma.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      {o && (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-3xl border border-gold/30 bg-card">
            <img
              src={o.imagem}
              alt={o.nome}
              width={1024}
              height={768}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                🔥 Oportunidade do Dia
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">🥇 {o.nome}</h2>
              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["Lucro estimado", brl(o.lucroEstimado)],
                  ["Investimento", brl(o.investimento)],
                  ["Tempo", `${o.tempoMin} min`],
                  ["Dificuldade", "⭐".repeat(o.dificuldade)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="mt-1 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/app/oportunidades/$slug"
                params={{ slug: o.slug }}
                className="mt-6 flex items-center justify-center rounded-xl bg-success px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
              >
                Começar agora
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <IndiceOportunidade indice={o.indice} criterios={o.criterios} />
            {semana && (
              <Painel titulo="🔥 Receita da semana">
                <h3 className="font-display text-xl font-semibold">{semana.nome}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {semana.porQue.map((p) => (
                    <li key={p}>✔ {p}</li>
                  ))}
                </ul>
                <Link
                  to="/app/oportunidades/$slug"
                  params={{ slug: semana.slug }}
                  className="mt-5 flex items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gold/50"
                >
                  Quero fazer
                </Link>
              </Painel>
            )}
            <Painel titulo="Financeiro de hoje">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Entrou</p>
                  <p className="mt-1 font-semibold">{brl(entrou)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Saiu</p>
                  <p className="mt-1 font-semibold">{brl(saiu)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lucro</p>
                  <p className="mt-1 font-semibold text-success">{brl(entrou - saiu)}</p>
                </div>
              </div>
            </Painel>
            {aniversarios.length > 0 && (
              <Painel titulo="Aniversários da semana">
                <ul className="space-y-2 text-sm">
                  {aniversarios.map((a) => (
                    <li key={a.id} className="flex items-center justify-between gap-3">
                      <span>
                        {a.ehHoje ? "🎂 " : ""}
                        {a.nome}
                      </span>
                      <span className="text-muted-foreground">{a.ehHoje ? "hoje" : a.diaMes}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/app/clientes"
                  className="mt-4 inline-block text-sm font-medium text-gold underline underline-offset-4"
                >
                  Ver clientes
                </Link>
              </Painel>
            )}
          </div>
        </div>
      )}
    </Pagina>
  );
}
