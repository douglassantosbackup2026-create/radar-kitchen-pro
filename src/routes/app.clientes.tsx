import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { brl } from "@/data/facaevenda";
import { useClientes } from "@/lib/db";

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
  const { data, isPending, isError } = useClientes();

  return (
    <Pagina titulo="Clientes" descricao="No aniversário, você recebe uma notificação para oferecer.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      {data && data.length === 0 && <Vazio texto="Nenhum cliente cadastrado ainda." />}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((c) => (
          <Painel key={c.id}>
            <h2 className="font-display text-xl font-semibold">{c.nome}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Último pedido</dt>
                <dd className="font-semibold">{brl(Number(c.ultimo_pedido))}</dd>
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
