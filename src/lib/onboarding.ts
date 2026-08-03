import { brl } from "@/data/facaevenda";

export const ASSINATURA_MENSAL = 47;
export const FORNADAS_ALVO = 2;
export const METAS_MENSAIS = [500, 1000, 2000] as const;

export type MetaMensal = (typeof METAS_MENSAIS)[number];

export type PreferenciasOnboarding = {
  metaMensal: MetaMensal | null;
  onboardingConcluido: boolean;
  producaoMontadaSlug: string | null;
};

const STORAGE_KEY = "fv_onboarding_preferencias";

const defaultPreferencias = (): PreferenciasOnboarding => ({
  metaMensal: null,
  onboardingConcluido: false,
  producaoMontadaSlug: null,
});

function isMetaMensal(v: unknown): v is MetaMensal {
  return typeof v === "number" && (METAS_MENSAIS as readonly number[]).includes(v);
}

export function lerPreferencias(): PreferenciasOnboarding {
  if (typeof window === "undefined") return defaultPreferencias();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferencias();
    const parsed = JSON.parse(raw) as Partial<PreferenciasOnboarding>;
    return {
      metaMensal: isMetaMensal(parsed.metaMensal) ? parsed.metaMensal : null,
      onboardingConcluido: Boolean(parsed.onboardingConcluido),
      producaoMontadaSlug:
        typeof parsed.producaoMontadaSlug === "string" && parsed.producaoMontadaSlug.length > 0
          ? parsed.producaoMontadaSlug
          : null,
    };
  } catch {
    return defaultPreferencias();
  }
}

function escreverPreferencias(prefs: PreferenciasOnboarding) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function salvarMeta(meta: MetaMensal): PreferenciasOnboarding {
  const next: PreferenciasOnboarding = {
    ...lerPreferencias(),
    metaMensal: meta,
    onboardingConcluido: true,
  };
  escreverPreferencias(next);
  return next;
}

export function marcarProducaoMontada(slug: string): PreferenciasOnboarding {
  const next: PreferenciasOnboarding = {
    ...lerPreferencias(),
    producaoMontadaSlug: slug,
  };
  escreverPreferencias(next);
  return next;
}

export function lucroDuasFornadas(lucroEstimado: number): number {
  return Math.round(lucroEstimado * FORNADAS_ALVO * 100) / 100;
}

export type PedidoParaMeta = {
  pago: boolean;
  valor: number | string;
  created_at?: string | null;
};

function inicioMesAtual(agora = new Date()): Date {
  return new Date(agora.getFullYear(), agora.getMonth(), 1);
}

export function faturamentoPagoMes(pedidos: PedidoParaMeta[], agora = new Date()): number {
  const inicio = inicioMesAtual(agora).getTime();
  return pedidos
    .filter((p) => {
      if (!p.pago) return false;
      if (!p.created_at) return true;
      const t = new Date(p.created_at).getTime();
      return !Number.isNaN(t) && t >= inicio;
    })
    .reduce((acc, p) => acc + Number(p.valor), 0);
}

export function recuperouAssinatura(faturamento: number): boolean {
  return faturamento >= ASSINATURA_MENSAL;
}

export function faltaParaAssinatura(faturamento: number): number {
  return Math.max(0, Math.round((ASSINATURA_MENSAL - faturamento) * 100) / 100);
}

export function progressoMeta(faturamento: number, meta: MetaMensal | null): number {
  if (!meta || meta <= 0) return 0;
  return Math.min(1, faturamento / meta);
}

export function formatMetaLabel(meta: MetaMensal): string {
  return brl(meta);
}
