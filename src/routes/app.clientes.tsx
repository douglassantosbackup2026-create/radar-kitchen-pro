import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pagina, Painel } from "@/components/app/Pagina";
import { Carregando, Erro, Vazio } from "@/components/app/Estado";
import { brl } from "@/data/facaevenda";
import { aniversariosProximos } from "@/lib/aniversarios";
import {
  useAtualizarCliente,
  useClientes,
  useCriarCliente,
  useExcluirCliente,
  type ClienteRow,
} from "@/lib/db";

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

type FormCliente = {
  nome: string;
  telefone: string;
  favorito: string;
  comprou: string;
  ultimo_pedido: string;
  aniversario: string;
};

const vazio: FormCliente = {
  nome: "",
  telefone: "",
  favorito: "",
  comprou: "",
  ultimo_pedido: "",
  aniversario: "",
};

function Clientes() {
  const { data, isPending, isError } = useClientes();
  const criar = useCriarCliente();
  const atualizar = useAtualizarCliente();
  const excluir = useExcluirCliente();
  const [form, setForm] = useState<FormCliente>(vazio);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const proximos = new Map(
    aniversariosProximos(data ?? [], { dias: 7 }).map((a) => [a.id, a] as const),
  );

  function preencher(c: ClienteRow) {
    setEditandoId(c.id);
    setForm({
      nome: c.nome,
      telefone: c.telefone,
      favorito: c.favorito,
      comprou: c.comprou,
      ultimo_pedido: String(c.ultimo_pedido),
      aniversario: c.aniversario,
    });
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim()) {
      toast.error("Informe o nome do cliente.");
      return;
    }
    const payload = {
      nome: form.nome.trim(),
      telefone: form.telefone.trim(),
      favorito: form.favorito.trim(),
      comprou: form.comprou.trim(),
      ultimo_pedido: Number(form.ultimo_pedido.replace(",", ".")) || 0,
      aniversario: form.aniversario.trim(),
    };
    if (editandoId) {
      atualizar.mutate(
        { id: editandoId, ...payload },
        {
          onSuccess: () => {
            toast.success("Cliente atualizado");
            setEditandoId(null);
            setForm(vazio);
          },
          onError: () => toast.error("Não foi possível salvar o cliente."),
        },
      );
    } else {
      criar.mutate(payload, {
        onSuccess: () => {
          toast.success("Cliente criado");
          setForm(vazio);
        },
        onError: () => toast.error("Não foi possível criar o cliente."),
      });
    }
  }

  return (
    <Pagina titulo="Clientes" descricao="Cadastre, edite e acompanhe quem compra com você.">
      {isPending && <Carregando />}
      {isError && <Erro />}
      {data && data.length === 0 && <Vazio texto="Nenhum cliente cadastrado ainda." />}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((c) => (
          <Painel
            key={c.id}
            className={proximos.has(c.id) ? "border-gold/40 ring-1 ring-gold/30" : ""}
          >
            <h2 className="font-display text-xl font-semibold">{c.nome}</h2>
            {proximos.get(c.id)?.ehHoje && (
              <p className="mt-1 text-xs font-semibold text-gold">Aniversário hoje</p>
            )}
            {proximos.get(c.id) && !proximos.get(c.id)?.ehHoje && (
              <p className="mt-1 text-xs text-gold">
                Aniversário em {proximos.get(c.id)!.diaMes}
              </p>
            )}
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Último pedido</dt>
                <dd className="font-semibold">{brl(Number(c.ultimo_pedido))}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Comprou</dt>
                <dd>{c.comprou || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Favorito</dt>
                <dd>{c.favorito || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Telefone</dt>
                <dd>{c.telefone || "—"}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-gold">
              🎂 Aniversário em {c.aniversario || "—"}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => preencher(c)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:border-gold/40"
              >
                Editar
              </button>
              <button
                type="button"
                disabled={excluir.isPending}
                onClick={() => {
                  excluir.mutate(c.id, {
                    onSuccess: () => toast.success("Cliente removido"),
                    onError: () => toast.error("Não foi possível excluir."),
                  });
                }}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
              >
                Excluir
              </button>
            </div>
          </Painel>
        ))}
      </div>

      <Painel titulo={editandoId ? "Editar cliente" : "Novo cliente"} className="mt-6">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={salvar}>
          {(
            [
              ["nome", "Nome"],
              ["telefone", "Telefone"],
              ["favorito", "Favorito"],
              ["comprou", "Último produto"],
              ["ultimo_pedido", "Valor último pedido"],
              ["aniversario", "Aniversário"],
            ] as const
          ).map(([campo, rotulo]) => (
            <label key={campo} className="text-sm">
              <span className="text-muted-foreground">{rotulo}</span>
              <input
                value={form[campo]}
                onChange={(e) => setForm((f) => ({ ...f, [campo]: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-gold/50"
              />
            </label>
          ))}
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={criar.isPending || atualizar.isPending}
              className="rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-success-hover disabled:opacity-70"
            >
              {editandoId ? "Salvar alterações" : "Adicionar cliente"}
            </button>
            {editandoId && (
              <button
                type="button"
                onClick={() => {
                  setEditandoId(null);
                  setForm(vazio);
                }}
                className="rounded-xl border border-border px-4 py-2.5 text-sm"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </Painel>
    </Pagina>
  );
}
