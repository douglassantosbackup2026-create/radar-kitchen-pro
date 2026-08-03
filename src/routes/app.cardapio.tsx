import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CardapioPreview } from "@/components/app/CardapioPreview";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro } from "@/components/app/Estado";
import { brl } from "@/data/facaevenda";
import {
  cardapioPadrao,
  lerCardapio,
  linkWhatsAppCompartilhar,
  montarTextoWhatsApp,
  salvarCardapio,
  sincronizarItens,
  sugestoesDoMomento,
  type CardapioPrefs,
} from "@/lib/cardapio";
import { useOportunidades } from "@/lib/db";

export const Route = createFileRoute("/app/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio Digital — Faça & Venda PRO" },
      {
        name: "description",
        content: "Template editável para postar no WhatsApp e Instagram com as receitas do seu momento.",
      },
      { property: "og:title", content: "Cardápio Digital — Faça & Venda PRO" },
      {
        property: "og:description",
        content: "Monte o cardápio da semana e compartilhe em um toque.",
      },
    ],
  }),
  component: CardapioPage,
});

function CardapioPage() {
  const { data, isPending, isError } = useOportunidades();
  const [prefs, setPrefs] = useState<CardapioPrefs | null>(null);
  const [iniciado, setIniciado] = useState(false);

  useEffect(() => {
    if (!data || iniciado) return;
    const salvos = lerCardapio();
    if (salvos) {
      const momento = sugestoesDoMomento(data.doDia, data.daSemana, data.lista);
      const base = [...momento];
      for (const o of data.lista) {
        if (!base.some((b) => b.slug === o.slug)) base.push(o);
      }
      setPrefs({
        ...salvos,
        itens: sincronizarItens(salvos.itens, base.slice(0, Math.max(8, momento.length))),
      });
    } else {
      setPrefs(cardapioPadrao(data.doDia, data.daSemana, data.lista));
    }
    setIniciado(true);
  }, [data, iniciado]);

  const textoWa = useMemo(() => (prefs ? montarTextoWhatsApp(prefs) : ""), [prefs]);

  function atualizar(partial: Partial<CardapioPrefs>) {
    setPrefs((p) => (p ? { ...p, ...partial } : p));
  }

  function atualizarItem(slug: string, patch: Partial<CardapioPrefs["itens"][number]>) {
    setPrefs((p) => {
      if (!p) return p;
      return {
        ...p,
        itens: p.itens.map((i) => (i.slug === slug ? { ...i, ...patch } : i)),
      };
    });
  }

  function onSalvar() {
    if (!prefs) return;
    salvarCardapio(prefs);
    toast.success("Cardápio salvo neste aparelho");
  }

  async function onCopiar() {
    if (!prefs) return;
    try {
      await navigator.clipboard.writeText(textoWa);
      toast.success("Texto copiado — cole no WhatsApp ou Instagram");
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  }

  function onWhatsApp() {
    if (!prefs) return;
    window.open(linkWhatsAppCompartilhar(textoWa), "_blank", "noopener,noreferrer");
  }

  return (
    <Pagina
      titulo="Cardápio Digital"
      descricao="Template editável com as receitas do seu momento — pronto para WhatsApp e Instagram."
    >
      {isPending && <Carregando />}
      {isError && <Erro />}
      {prefs && (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Painel titulo="Seus dados">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-muted-foreground">Nome do negócio</span>
                  <input
                    value={prefs.nomeNegocio}
                    onChange={(e) => atualizar({ nomeNegocio: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-gold/50"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-muted-foreground">WhatsApp (com DDD)</span>
                  <input
                    value={prefs.whatsapp}
                    onChange={(e) => atualizar({ whatsapp: e.target.value })}
                    placeholder="11999998888"
                    inputMode="tel"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-gold/50"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="text-muted-foreground">Título do cardápio</span>
                  <input
                    value={prefs.titulo}
                    onChange={(e) => atualizar({ titulo: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-gold/50"
                  />
                </label>
              </div>
            </Painel>

            <Painel titulo="Itens do momento">
              <ul className="space-y-4">
                {prefs.itens.map((item) => (
                  <li
                    key={item.slug}
                    className="flex flex-wrap items-center gap-3 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                  >
                    <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.incluido}
                        onChange={(e) => atualizarItem(item.slug, { incluido: e.target.checked })}
                        className="h-4 w-4 accent-[var(--success)]"
                      />
                      <span className={`truncate font-medium ${item.incluido ? "" : "text-muted-foreground"}`}>
                        {item.nome}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">R$</span>
                      <input
                        type="number"
                        min={0}
                        step={0.5}
                        value={item.preco}
                        disabled={!item.incluido}
                        onChange={(e) =>
                          atualizarItem(item.slug, {
                            preco: Math.max(0, Number(e.target.value) || 0),
                          })
                        }
                        className="w-24 rounded-xl border border-border bg-background px-3 py-2 tabular-nums outline-none focus:border-gold/50 disabled:opacity-50"
                        aria-label={`Preço de ${item.nome}`}
                      />
                    </label>
                    <Link
                      to="/app/oportunidades/$slug"
                      params={{ slug: item.slug }}
                      className="text-xs font-medium text-gold underline underline-offset-4"
                    >
                      Ver receita
                    </Link>
                  </li>
                ))}
              </ul>
            </Painel>

            <Painel titulo="Texto para WhatsApp">
              <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm leading-relaxed">
                {textoWa}
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void onCopiar()}
                  className="rounded-xl bg-success px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-success-hover"
                >
                  Copiar texto
                </button>
                <button
                  type="button"
                  onClick={onWhatsApp}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:border-gold/50"
                >
                  Abrir WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onSalvar}
                  className="rounded-xl border border-gold/40 px-5 py-3 text-sm font-semibold text-gold hover:bg-gold/10"
                >
                  Salvar cardápio
                </button>
              </div>
            </Painel>
          </div>

          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Preview Instagram</p>
            <CardapioPreview prefs={prefs} />
            <p className="text-center text-sm text-muted-foreground">
              Tire um print deste preview e poste no Instagram Stories ou Feed.
            </p>
            <p className="text-center text-xs text-muted-foreground">
              {itensIncluidosCount(prefs)} item(ns) · total sugerido{" "}
              {brl(
                prefs.itens.filter((i) => i.incluido).reduce((a, i) => a + i.preco, 0),
              )}{" "}
              (soma dos preços unitários)
            </p>
          </div>
        </div>
      )}
    </Pagina>
  );
}

function itensIncluidosCount(prefs: CardapioPrefs) {
  return prefs.itens.filter((i) => i.incluido).length;
}
