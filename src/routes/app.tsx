import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { modulos } from "@/data/facaevenda";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
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
        <div className="flex items-center gap-1 border-b border-border bg-sidebar p-2 lg:hidden">
          <nav className="flex flex-1 gap-1 overflow-x-auto">
            {modulos.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              activeOptions={{ exact: m.to === "/app" }}
              activeProps={{ className: "bg-sidebar-accent text-gold" }}
              className="shrink-0 rounded-lg px-3 py-2 text-xs"
            >
              <span aria-hidden>{m.icone}</span> {m.label}
            </Link>
            ))}
          </nav>
        </div>
        <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
