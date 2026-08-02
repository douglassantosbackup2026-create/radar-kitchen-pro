import { useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { atalhosMobile, modulos } from "@/data/facaevenda";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const [maisAberto, setMaisAberto] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <Link to="/" className="px-3 py-2">
          <span className="font-display text-lg font-bold">
            Faça &amp; Venda <span className="text-gold">PRO</span>
          </span>
        </Link>
        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
          {modulos.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              activeOptions={{ exact: m.to === "/app" }}
              activeProps={{ className: "bg-sidebar-accent text-gold" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <span aria-hidden>{m.icone}</span>
              {m.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/assinar"
          className="mt-4 rounded-xl bg-success px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
        >
          Assinar PRO
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-5xl px-5 py-8 pb-28 md:px-8 md:py-10 lg:pb-10">
          <Outlet />
        </main>

        <nav
          className="fixed inset-x-0 bottom-0 z-40 border-t border-sidebar-border bg-sidebar/95 backdrop-blur lg:hidden"
          aria-label="Navegação principal"
        >
          <div className="mx-auto flex max-w-5xl items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
            {atalhosMobile.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                activeOptions={{ exact: m.to === "/app" }}
                activeProps={{ className: "text-gold" }}
                className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] text-sidebar-foreground"
              >
                <span className="text-base" aria-hidden>
                  {m.icone}
                </span>
                <span className="truncate">{m.label}</span>
              </Link>
            ))}
            <Sheet open={maisAberto} onOpenChange={setMaisAberto}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] text-sidebar-foreground"
                >
                  <span className="text-base" aria-hidden>
                    ☰
                  </span>
                  <span>Mais</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle className="font-display text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 grid gap-1">
                  {modulos.map((m) => (
                    <Link
                      key={m.to}
                      to={m.to}
                      activeOptions={{ exact: m.to === "/app" }}
                      activeProps={{ className: "bg-secondary text-gold" }}
                      onClick={() => setMaisAberto(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-secondary"
                    >
                      <span aria-hidden>{m.icone}</span>
                      {m.label}
                    </Link>
                  ))}
                </nav>
                <Link
                  to="/assinar"
                  onClick={() => setMaisAberto(false)}
                  className="mt-4 block rounded-xl bg-success px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Assinar PRO
                </Link>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </div>
  );
}
