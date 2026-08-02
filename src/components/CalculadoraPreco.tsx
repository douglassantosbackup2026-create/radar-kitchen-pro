import { useState } from "react";
import { brl } from "@/data/facaevenda";

const linhas = [
  { nome: "Chocolate", inicial: 32 },
  { nome: "Leite condensado", inicial: 18 },
  { nome: "Manteiga", inicial: 12 },
  { nome: "Embalagem", inicial: 9 },
];

export function CalculadoraPreco() {
  const [valores, setValores] = useState(linhas.map((l) => l.inicial));
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
        {linhas.map((l, i) => (
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
