import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { brl, clientes } from "@/data/facaevenda";

export const Route = createFileRoute("/app/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Faça & Venda PRO" },
      { name: "description", content: "Histórico de compras, produto favorito e aniversário de cada cliente." },
      { property: "og:title", content: "Clientes — Faça & Venda PRO" },
      { property: "og:description", content: "Histórico, favoritos e aniversários dos seus clientes." },
    ],
  }),
  component: Clientes,
});

function Clientes() {
  return (
    <Pagina titulo="Clientes" descricao="No aniversário, você recebe uma notificação para oferecer.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {clientes.map((c) => (
          <Painel key={c.nome}>
            <h2 className="font-display text-xl font-semibold">{c.nome}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Último pedido</dt>
                <dd className="font-semibold">{brl(c.ultimoPedido)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Comprou</dt>
                <dd>{c.comprou}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Favorito</dt>
                <dd>{c.favorito}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Telefone</dt>
                <dd>{c.telefone}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-gold">🎂 Aniversário em {c.aniversario}</p>
          </Painel>
        ))}
      </div>
    </Pagina>
  );
}
