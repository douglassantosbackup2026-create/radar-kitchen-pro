export type ClienteAniversario = {
  id: string;
  nome: string;
  aniversario: string;
};

export type AniversarioProximo = ClienteAniversario & {
  diaMes: string;
  diasRestantes: number;
  ehHoje: boolean;
};

/** Parse "DD/MM" or "DD/MM/YYYY" into month/day. Returns null if invalid. */
export function parseAniversario(texto: string): { dia: number; mes: number } | null {
  const m = texto.trim().match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/);
  if (!m) return null;
  const dia = Number(m[1]);
  const mes = Number(m[2]);
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12) return null;
  return { dia, mes };
}

function proximaData(dia: number, mes: number, ref: Date): Date {
  const ano = ref.getFullYear();
  let alvo = new Date(ano, mes - 1, dia);
  const hoje = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  if (alvo < hoje) alvo = new Date(ano + 1, mes - 1, dia);
  return alvo;
}

export function aniversariosProximos(
  clientes: ClienteAniversario[],
  opts: { dias?: number; hoje?: Date } = {},
): AniversarioProximo[] {
  const janela = opts.dias ?? 7;
  const ref = opts.hoje ?? new Date();
  const hoje = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());

  const lista: AniversarioProximo[] = [];
  for (const c of clientes) {
    const parsed = parseAniversario(c.aniversario);
    if (!parsed) continue;
    const alvo = proximaData(parsed.dia, parsed.mes, ref);
    const diffMs = alvo.getTime() - hoje.getTime();
    const diasRestantes = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diasRestantes < 0 || diasRestantes > janela) continue;
    lista.push({
      ...c,
      diaMes: `${String(parsed.dia).padStart(2, "0")}/${String(parsed.mes).padStart(2, "0")}`,
      diasRestantes,
      ehHoje: diasRestantes === 0,
    });
  }
  return lista.sort((a, b) => a.diasRestantes - b.diasRestantes);
}
