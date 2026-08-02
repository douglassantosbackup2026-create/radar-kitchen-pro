import { useEffect, useState } from "react";
import { brl, type Oportunidade } from "@/data/facaevenda";
import {
  calcularPrecificacao,
  custosIniciais,
  formatQtdUnidade,
  itensCompras,
  margemCatalogo,
  parseRendimento,
  type ResultadoPrecificacao,
} from "@/lib/calculadora";

const linhasDemo = [
  { nome: "Chocolate", inicial: 32 },
  { nome: "Leite condensado", inicial: 18 },
  { nome: "Manteiga", inicial: 12 },
  { nome: "Embalagem", inicial: 9 },
];

/** Calculadora genérica da landing — mantida sem vínculo a oportunidade. */
export function CalculadoraPrecoDemo() {
  const [valores, setValores] = useState(linhasDemo.map((l) => l.inicial));
  const [margem, setMargem] = useState(65);
  const [rendimento, setRendimento] = useState(24);

  const custoTotal = valores.reduce((a, b) => a + b, 0);
  const custoUnitario = custoTotal / rendimento;
  const precoUnitario = custoUnitario / (1 - margem / 100);
  const lucroTotal = precoUnitario * rendimento - custoTotal;

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Ingredientes</p>
        {linhasDemo.map((l, i) => (
          <label key={l.nome} className="block">
            <span className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{l.nome}</span>
              <span className="tabular-nums">{brl(valores[i]!)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={80}
              step={1}
              value={valores[i]}
              onChange={(e) =>
                setValores((v) => v.map((x, j) => (j === i ? Number(e.target.value) : x)))
              }
              className="mt-2 w-full accent-[var(--gold)]"
              aria-label={l.nome}
            />
          </label>
        ))}
        <label className="block">
          <span className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rendimento</span>
            <span className="tabular-nums">{rendimento} un</span>
          </span>
          <input
            type="range"
            min={6}
            max={100}
            value={rendimento}
            onChange={(e) => setRendimento(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--gold)]"
            aria-label="Rendimento"
          />
        </label>
        <label className="block">
          <span className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Margem desejada</span>
            <span className="tabular-nums">{margem}%</span>
          </span>
          <input
            type="range"
            min={20}
            max={85}
            value={margem}
            onChange={(e) => setMargem(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--gold)]"
            aria-label="Margem desejada"
          />
        </label>
      </div>

      <div className="flex flex-col justify-center gap-4 rounded-2xl bg-secondary p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Custo por unidade</p>
          <p className="font-display text-2xl font-semibold">{brl(custoUnitario)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Preço sugerido</p>
          <p className="font-display text-4xl font-bold text-gold">{brl(precoUnitario)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Lucro na fornada</p>
          <p className="font-display text-2xl font-semibold text-success">{brl(lucroTotal)}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Mexa nos ingredientes e veja o preço e o lucro mudarem na hora.
        </p>
      </div>
    </div>
  );
}

type Props = {
  oportunidade: Oportunidade;
  onResultados?: (r: ResultadoPrecificacao) => void;
};

export function CalculadoraPreco({ oportunidade, onResultados }: Props) {
  const detalhe = itensCompras(oportunidade);
  const itens = detalhe.map((d) => d.nome);
  const [valores, setValores] = useState(() => custosIniciais(oportunidade));
  const [margem, setMargem] = useState(() => margemCatalogo(oportunidade));
  const [rendimento, setRendimento] = useState(() => parseRendimento(oportunidade.rendimento));

  const resultado = calcularPrecificacao(itens, valores, rendimento, margem);
  const maxSlider = Math.max(80, Math.ceil(Math.max(resultado.custoTotal, ...valores, 1) * 1.5));

  useEffect(() => {
    onResultados?.(resultado);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync on calc inputs
  }, [
    resultado.custoTotal,
    resultado.custoUnitario,
    resultado.precoUnitario,
    resultado.lucroTotal,
    resultado.rendimento,
    resultado.margem,
    oportunidade.slug,
  ]);

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Ingredientes — {oportunidade.nome}
        </p>
        {detalhe.map((d, i) => (
          <label key={`${oportunidade.slug}-${d.nome}`} className="block">
            <span className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {d.nome}{" "}
                <span className="text-xs opacity-70">({formatQtdUnidade(d)})</span>
              </span>
              <span className="tabular-nums">{brl(valores[i] ?? 0)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={maxSlider}
              step={1}
              value={valores[i] ?? 0}
              onChange={(e) =>
                setValores((v) => v.map((x, j) => (j === i ? Number(e.target.value) : x)))
              }
              className="mt-2 w-full accent-[var(--gold)]"
              aria-label={`${d.nome} ${formatQtdUnidade(d)}`}
            />
          </label>
        ))}
        <label className="block">
          <span className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rendimento</span>
            <span className="tabular-nums">{rendimento} un</span>
          </span>
          <input
            type="range"
            min={6}
            max={100}
            value={rendimento}
            onChange={(e) => setRendimento(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--gold)]"
            aria-label="Rendimento"
          />
        </label>
        <label className="block">
          <span className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Margem desejada</span>
            <span className="tabular-nums">{margem}%</span>
          </span>
          <input
            type="range"
            min={20}
            max={85}
            value={margem}
            onChange={(e) => setMargem(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--gold)]"
            aria-label="Margem desejada"
          />
        </label>
      </div>

      <div className="flex flex-col justify-center gap-4 rounded-2xl bg-secondary p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Custo por unidade</p>
          <p className="font-display text-2xl font-semibold">{brl(resultado.custoUnitario)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Seu preço</p>
          <p className="font-display text-4xl font-bold text-gold">{brl(resultado.precoUnitario)}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/50 px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Preço sugerido PRO</p>
          <p className="mt-1 font-display text-xl font-semibold">{brl(oportunidade.precoSugerido)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Diferença:{" "}
            {brl(resultado.precoUnitario - oportunidade.precoSugerido)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Lucro na fornada</p>
          <p className="font-display text-2xl font-semibold text-success">{brl(resultado.lucroTotal)}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Ajuste o que você paga no mercado e veja o preço e o lucro na hora.
        </p>
      </div>
    </div>
  );
}
