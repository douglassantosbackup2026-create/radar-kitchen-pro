import { useEffect, useState } from "react";

type Notif = {
  id: number;
  titulo: string;
  corpo: string;
  quando: string;
};

const FILA: Omit<Notif, "id" | "quando">[] = [
  { titulo: "Pix recebido", corpo: "Morango do Amor — R$ 56,88" },
  { titulo: "Novo pedido", corpo: "Brownie Dubai · 12 un — R$ 84,00" },
  { titulo: "Pix recebido", corpo: "Copo da Felicidade — R$ 42,00" },
  { titulo: "Venda confirmada", corpo: "Brigadeiro Gourmet — R$ 65,50" },
  { titulo: "Pix recebido", corpo: "Pudim no pote — R$ 38,00" },
  { titulo: "Novo pedido", corpo: "Cocada cremosa · 20 un — R$ 70,00" },
  { titulo: "Pix recebido", corpo: "Bolo de pote — R$ 48,00" },
  { titulo: "Novo pedido", corpo: "Palha italiana · 15 un — R$ 52,50" },
];

const INTERVALO_MS = 1600;
const MAX_VISIVEIS = 4;

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-white" aria-hidden>
      <path d="M12 2c.4 3.2-1.2 5.2-2.8 6.8C7.4 10.6 6 12.4 6 15.2 6 18.4 8.6 21 12 21s6-2.6 6-5.8c0-2.2-1-4-2.4-5.6-.8-.9-1.6-1.8-2-3.2-.2 1.4.2 2.6 1 3.6.6.8 1.4 1.4 1.8 2.4.2-.8 0-1.6-.4-2.4C14.8 8.2 12.8 6.2 12 2z" />
    </svg>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function empilhar(prev: Notif[], item: Omit<Notif, "id" | "quando">, id: number): Notif[] {
  const envelhecidas = prev.map((n, idx) => ({
    ...n,
    quando: idx === 0 ? "1 min" : `${idx + 1} min`,
  }));
  return [{ ...item, id, quando: "agora" }, ...envelhecidas].slice(0, MAX_VISIVEIS);
}

export function HeroVendasAnimadas() {
  const reduced = usePrefersReducedMotion();
  const [visiveis, setVisiveis] = useState<Notif[]>([]);

  useEffect(() => {
    if (reduced) {
      setVisiveis(
        FILA.slice(0, MAX_VISIVEIS).map((n, i) => ({
          ...n,
          id: i + 1,
          quando: i === 0 ? "agora" : `${i} min`,
        })),
      );
      return;
    }

    let nextId = 0;
    let cursor = 0;

    // Primeira notificação imediata
    nextId += 1;
    setVisiveis(empilhar([], FILA[0]!, nextId));
    cursor = 1;

    const timer = window.setInterval(() => {
      const item = FILA[cursor % FILA.length]!;
      cursor += 1;
      nextId += 1;
      const id = nextId;
      setVisiveis((prev) => empilhar(prev, item, id));
    }, INTERVALO_MS);

    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div
      className="hero-phone mx-auto w-full max-w-[280px]"
      role="img"
      aria-label="Notificações de vendas e Pix entrando na conta sem parar"
    >
      <div className="hero-phone__frame relative overflow-hidden rounded-[2.25rem] border-[6px] border-zinc-900 bg-zinc-950 shadow-2xl ring-1 ring-black/40">
        <div className="relative z-20 flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-white">
          <span>09:41</span>
          <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1 text-[10px] opacity-90">
            <span aria-hidden>●●●</span>
            <span>70%</span>
          </span>
        </div>

        <div className="hero-phone__wallpaper absolute inset-0" aria-hidden />

        <div className="relative z-10 flex min-h-[420px] flex-col justify-start gap-2 px-3 pb-8 pt-14">
          {visiveis.map((n) => (
            <article
              key={n.id}
              className="hero-phone__notif-live flex items-start gap-2.5 rounded-2xl border border-white/10 bg-black/45 px-3 py-2.5 text-left shadow-lg backdrop-blur-md"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
                <FlameIcon />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-semibold leading-tight text-white">{n.titulo}</p>
                  <span className="shrink-0 text-[10px] text-white/60">{n.quando}</span>
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-white/80">{n.corpo}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
