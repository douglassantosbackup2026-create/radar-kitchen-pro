import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type DepoimentoTelegramItem = {
  id: string;
  nome: string;
  screenshot: string;
  alt: string;
};

type FeedProps = {
  titulo?: string;
  subtitulo?: string;
  items: DepoimentoTelegramItem[];
  className?: string;
};

export function FeedProvasTelegram({
  titulo = "Comunidade Faça & Venda",
  subtitulo = "Da comunidade · degustações e primeiras vendas",
  items,
  className,
}: FeedProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setAtual(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-white/10 bg-[#17212b] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b border-white/10 bg-[#232e3c] px-4 py-3 md:px-5">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-700 text-sm font-bold text-primary-foreground"
          aria-hidden
        >
          FV
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{titulo}</p>
          <p className="truncate text-xs text-white/55">{subtitulo}</p>
        </div>
      </header>

      <div className="bg-[#0e1621] px-3 py-5 md:px-5 md:py-6">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id}>
                <DepoimentoTelegram item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="left-1 border-white/15 bg-[#232e3c]/90 text-white hover:bg-[#2b3848] hover:text-white disabled:opacity-30 md:left-2"
          />
          <CarouselNext
            className="right-1 border-white/15 bg-[#232e3c]/90 text-white hover:bg-[#2b3848] hover:text-white disabled:opacity-30 md:right-2"
          />
        </Carousel>

        <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Depoimentos">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === atual}
              aria-label={`Ver depoimento de ${item.nome}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === atual ? "w-6 bg-gold" : "w-2 bg-white/25 hover:bg-white/40",
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DepoimentoTelegram({ item }: { item: DepoimentoTelegramItem }) {
  return (
    <figure className="mx-auto w-full max-w-md px-8 md:px-10">
      <img
        src={item.screenshot}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="w-full rounded-2xl border border-white/5 shadow-lg shadow-black/30"
      />
      <figcaption className="sr-only">
        Depoimento de {item.nome} na comunidade Faça & Venda
      </figcaption>
    </figure>
  );
}
