import { useEffect, useState } from "react";
import { brl, type Oportunidade } from "@/data/facaevenda";
import {
  calcularPrecificacao,
  custosIniciais,
  formatQtdUnidade,
  itensCompras,
  margemCatalogo,
  margemFromPreco,
  parseRendimento,
  type ResultadoPrecificacao,
} from "@/lib/calculadora";

const linhasDemo = [
  { nome: "Chocolate", inicial: 32 },
  { nome: "Leite condensado", inicial: 18 },
  { nome: "Manteiga", inicial: 12 },
  { nome: "Embalagem", inicial: 9 },
];

function InputCusto({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <input
          type="number"
          min={0}
          step={0.5}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          aria-label={`${label} em reais`}
          className="w-24 rounded-lg border border-border bg-background px-2 py-1 text-right tabular-nums outline-none focus:border-gold/50"
        />
      </span>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--gold)]"
        aria-label={label}
      />
    </label>
  );
}

/** Calculadora genérica da landing — mantida sem vínculo a oportunidade. */
export function CalculadoraPrecoDemo() {
  const [valores, setValores] = useState(linhasDemo.map((l) => l.inicial));
  const [margem, setMargem] = useState(65);
  const [rendimento, setRendimento] = useState(24);
  const [precoDraft, setPrecoDraft] = useState("");

  const custoTotal = valores.reduce((a, b) => a + b, 0);
  const custoUnitario = custoTotal / Math.max(1, rendimento);
  const precoUnitario = custoUnitario / (1 - margem / 100);
  const lucroTotal = precoUnitario * rendimento - custoTotal;

  useEffect(() => {
    setPrecoDraft(precoUnitario.toFixed(2));
  }, [precoUnitario]);

  function aplicarPreco(raw: string) {
    const preco = Number(raw.replace(",", "."));
    if (!Number.isFinite(preco) || preco <= 0) {
      setPrecoDraft(precoUnitario.toFixed(2));
      return;
    }
    setMargem(margemFromPreco(custoUnitario, preco));
    setPrecoDraft(preco.toFixed(2));
  }

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Ingredientes</p>
        {linhasDemo.map((l, i) => (
          <InputCusto
            key={l.nome}
            label={l.nome}
            value={valores[i]!}
            max={80}
            onChange={(n) => setValores((v) => v.map((x, j) => (j === i ? n : x)))}
          />
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
            value={Math.min(85, Math.max(20, margem))}
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
        <label className="block">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Seu preço de venda</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-gold">R$</span>
            <input
              type="number"
              min={0.01}
              step={0.01}
              value={precoDraft}
              onChange={(e) => setPrecoDraft(e.target.value)}
              onBlur={() => aplicarPreco(precoDraft)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              aria-label="Preço de venda"
              className="w-full max-w-[10rem] rounded-xl border border-border bg-background px-3 py-2 font-display text-3xl font-bold text-gold outline-none focus:border-gold/50"
            />
          </div>
        </label>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Lucro na fornada</p>
          <p className="font-display text-2xl font-semibold text-success">{brl(lucroTotal)}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Edite custos ou o preço de venda — margem e lucro atualizam na hora.
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
  const [precoDraft, setPrecoDraft] = useState("");

  const resultado = calcularPrecificacao(itens, valores, rendimento, margem);
  const maxSlider = Math.max(80, Math.ceil(Math.max(resultado.custoTotal, ...valores, 1) * 1.5));

  useEffect(() => {
    setPrecoDraft(resultado.precoUnitario.toFixed(2));
  }, [resultado.precoUnitario]);

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

  function aplicarPreco(raw: string) {
    const preco = Number(raw.replace(",", "."));
    if (!Number.isFinite(preco) || preco <= 0) {
      setPrecoDraft(resultado.precoUnitario.toFixed(2));
      return;
    }
    setMargem(margemFromPreco(resultado.custoUnitario, preco));
    setPrecoDraft(preco.toFixed(2));
  }

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Ingredientes — {oportunidade.nome}
        </p>
        {detalhe.map((d, i) => (
          <InputCusto
            key={`${oportunidade.slug}-${d.nome}`}
            label={`${d.nome} (${formatQtdUnidade(d)})`}
            value={valores[i] ?? 0}
            max={maxSlider}
            onChange={(n) => setValores((v) => v.map((x, j) => (j === i ? n : x)))}
          />
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
            <span className="tabular-nums">{Math.round(margem)}%</span>
          </span>
          <input
            type="range"
            min={20}
            max={85}
            value={Math.min(85, Math.max(20, margem))}
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
        <label className="block">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Seu preço de venda</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-gold">R$</span>
            <input
              type="number"
              min={0.01}
              step={0.01}
              value={precoDraft}
              onChange={(e) => setPrecoDraft(e.target.value)}
              onBlur={() => aplicarPreco(precoDraft)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              aria-label="Preço de venda"
              className="w-full max-w-[10rem] rounded-xl border border-border bg-background px-3 py-2 font-display text-3xl font-bold text-gold outline-none focus:border-gold/50"
            />
          </div>
        </label>
        <div className="rounded-xl border border-border/60 bg-card/50 px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Preço sugerido PRO</p>
          <p className="mt-1 font-display text-xl font-semibold">{brl(oportunidade.precoSugerido)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Diferença: {brl(resultado.precoUnitario - oportunidade.precoSugerido)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Lucro na fornada</p>
          <p className="font-display text-2xl font-semibold text-success">{brl(resultado.lucroTotal)}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Edite custos ou o preço de venda — margem e lucro atualizam na hora.
        </p>
      </div>
    </div>
  );
}
