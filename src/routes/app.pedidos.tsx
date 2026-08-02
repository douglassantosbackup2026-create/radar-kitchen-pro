import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { brl } from "@/data/facaevenda";
import {
  useAtualizarPedido,
  useCriarPedido,
  useExcluirPedido,
  usePedidos,
} from "@/lib/db";

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

const status = ["Pendente", "Em produção", "Pronto", "Entregue"];

function Pedidos() {
  const { data, isPending, isError } = usePedidos();
  const atualizar = useAtualizarPedido();
  const criar = useCriarPedido();
  const excluir = useExcluirPedido();
  const [form, setForm] = useState({ cliente: "", produto: "", qtd: "1", valor: "" });

  return (
    <Pagina titulo="Pedidos" descricao="Muito simples. Quem pediu, o quê, quanto e se já pagou.">
      <Painel className="overflow-x-auto">
        {isPending && <Carregando />}
        {isError && <Erro />}
        {data && data.length === 0 && <Vazio texto="Nenhum pedido registrado ainda." />}
        {data && data.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Produto</th>
                <th className="pb-3">Qtd</th>
                <th className="pb-3">Valor</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Pago</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-medium">{p.cliente}</td>
                  <td className="py-3 text-muted-foreground">{p.produto}</td>
                  <td className="py-3 tabular-nums">{p.qtd}</td>
                  <td className="py-3 tabular-nums">{brl(Number(p.valor))}</td>
                  <td className="py-3">
                    <select
                      value={p.status}
                      aria-label={`Status do pedido de ${p.cliente}`}
                      onChange={(e) =>
                        atualizar.mutate(
                          { id: p.id, status: e.target.value },
                          {
                            onSuccess: () => toast.success("Status atualizado"),
                            onError: () => toast.error("Falha ao atualizar status"),
                          },
                        )
                      }
                      className="rounded-lg border border-border bg-background px-2 py-1 text-sm outline-none focus:border-gold/50"
                    >
                      {status.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() =>
                        atualizar.mutate(
                          { id: p.id, pago: !p.pago },
                          {
                            onSuccess: () => toast.success(p.pago ? "Marcado como não pago" : "Pago"),
                            onError: () => toast.error("Falha ao atualizar pagamento"),
                          },
                        )
                      }
                      className={p.pago ? "text-success" : "text-muted-foreground"}
                    >
                      {p.pago ? "Sim" : "Não"}
                    </button>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      disabled={excluir.isPending}
                      onClick={() =>
                        excluir.mutate(p.id, {
                          onSuccess: () => toast.success("Pedido excluído"),
                          onError: () => toast.error("Não foi possível excluir"),
                        })
                      }
                      className="text-xs text-destructive hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Painel>

      <Painel titulo="Novo pedido" className="mt-6">
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.cliente.trim() || !form.produto.trim()) {
              toast.error("Informe cliente e produto.");
              return;
            }
            criar.mutate(
              {
                cliente: form.cliente.trim(),
                produto: form.produto.trim(),
                qtd: Number(form.qtd) || 1,
                valor: Number(form.valor.replace(",", ".")) || 0,
              },
              {
                onSuccess: () => {
                  toast.success("Pedido criado");
                  setForm({ cliente: "", produto: "", qtd: "1", valor: "" });
                },
                onError: () => toast.error("Não foi possível criar o pedido"),
              },
            );
          }}
        >
          {([
            ["cliente", "Cliente", "min-w-40 flex-1"],
            ["produto", "Produto", "min-w-40 flex-1"],
            ["qtd", "Qtd", "w-20"],
            ["valor", "Valor", "w-28"],
          ] as const).map(([campo, rotulo, largura]) => (
            <input
              key={campo}
              value={form[campo]}
              onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
              placeholder={rotulo}
              aria-label={rotulo}
              className={`${largura} rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold/50`}
            />
          ))}
          <button
            type="submit"
            disabled={criar.isPending}
            className="rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-success-hover disabled:opacity-70"
          >
            Salvar
          </button>
        </form>
      </Painel>
    </Pagina>
  );
}
