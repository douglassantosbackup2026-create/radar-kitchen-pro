import { createFileRoute, Link } from "@tanstack/react-router";

const TITULO = "Assinar o Faça & Venda PRO";
const DESC = "Escolha o plano mensal ou anual e receba todos os dias uma nova oportunidade de faturar na sua cozinha.";

export const Route = createFileRoute("/assinar")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Assinar,
});

function Assinar() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg rounded-3xl border border-gold/30 bg-card p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Em breve</p>
        <h1 className="mt-4 text-3xl font-bold">O checkout ainda está sendo preparado.</h1>
        <p className="mt-4 text-muted-foreground">
          Os planos Mensal (R$47) e Anual (R$297) serão liberados junto com o login e a área da
          assinante. Enquanto isso, você já pode navegar pela plataforma.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/app"
            className="rounded-xl bg-success px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-success-hover"
          >
            Conhecer a plataforma
          </Link>
          <Link to="/" className="rounded-xl border border-border px-6 py-3 font-semibold">
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
