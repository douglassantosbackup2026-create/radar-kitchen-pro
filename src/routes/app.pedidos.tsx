import { createFileRoute } from "@tanstack/react-router";
import { Pagina, Painel } from "@/components/app/Pagina";
import { pedidos } from "@/data/facaevenda";

export const Route = createFileRoute("/app/pedidos")({
  head: () => ({
    meta: [
      { title: "Pedidos — Faça & Venda PRO" },
      { name: "description", content: "Controle simples de pedidos: cliente, produto, quantidade, pagamento e entrega." },
      { property: "og:title", content: "Pedidos — Faça & Venda PRO" },
      { property: "og:description", content: "Controle simples de pedidos e entregas." },
    ],
  }),
  component: Pedidos,
});

function Pedidos() {
  return (
    <Pagina titulo="Pedidos" descricao="Muito simples. Quem pediu, o quê, quanto e se já pagou.">
      <Painel className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="pb-3">Cliente</th>
              <th className="pb-3">Produto</th>
              <th className="pb-3">Qtd</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Pago</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pedidos.map((p) => (
              <tr key={p.cliente + p.produto}>
                <td className="py-3 font-medium">{p.cliente}</td>
                <td className="py-3 text-muted-foreground">{p.produto}</td>
                <td className="py-3 tabular-nums">{p.qtd}</td>
                <td className="py-3 text-muted-foreground">{p.status}</td>
                <td className="py-3">
                  <span className={p.pago ? "text-success" : "text-muted-foreground"}>
                    {p.pago ? "Sim" : "Não"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Painel>
    </Pagina>
  );
}
