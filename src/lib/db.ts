import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";
import type { CompraDetalhe, Criterio, Oportunidade, Selo } from "@/data/facaevenda";
import { parseRendimento } from "@/lib/calculadora";
import { useRealtimeTable } from "@/lib/realtime";
import morangoImg from "@/assets/morango-do-amor.jpg";
import brownieImg from "@/assets/brownie-dubai.jpg";
import copoImg from "@/assets/copo-da-felicidade.jpg";
import brigadeiroImg from "@/assets/brigadeiro-gourmet.jpg";

type Tables = Database["public"]["Tables"];
export type PedidoRow = Tables["pedidos"]["Row"];
export type ClienteRow = Tables["clientes"]["Row"];
export type TarefaRow = Tables["tarefas_producao"]["Row"];
export type CompraRow = Tables["itens_compra"]["Row"];
export type LancamentoRow = Tables["lancamentos"]["Row"];
export type TendenciaRow = Tables["tendencias"]["Row"];
export type DataRow = Tables["datas_comemorativas"]["Row"];
export type CategoriaRow = Tables["categorias"]["Row"];
export type FavoritoRow = Tables["favoritos"]["Row"];
export type DesafioRow = Tables["desafios"]["Row"];

export type DesafioComProgresso = DesafioRow & { progresso: number };

export type AdicionarComprasResultado = {
  adicionados: number;
  ignorados: number;
};

const imagens: Record<string, string> = {
  "morango-do-amor": morangoImg,
  "brownie-dubai": brownieImg,
  "copo-da-felicidade": copoImg,
  "brigadeiro-gourmet": brigadeiroImg,
};

export function imagemDe(slug: string) {
  return imagens[slug] ?? morangoImg;
}

function parseComprasDetalhe(raw: Json, compras: string[], custoUnitario: number, rendimento: string): CompraDetalhe[] {
  if (Array.isArray(raw) && raw.length > 0) {
    const parsed: CompraDetalhe[] = [];
    for (const item of raw) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const nome = typeof item["nome"] === "string" ? item["nome"] : null;
      const custo = typeof item["custo"] === "number" ? item["custo"] : Number(item["custo"]);
      const qtd = typeof item["qtd"] === "number" ? item["qtd"] : Number(item["qtd"] ?? 1);
      const unidade = typeof item["unidade"] === "string" && item["unidade"] ? item["unidade"] : "un";
      if (nome && Number.isFinite(custo)) {
        parsed.push({
          nome,
          qtd: Number.isFinite(qtd) && qtd > 0 ? qtd : 1,
          unidade,
          custo,
        });
      }
    }
    if (parsed.length > 0) return parsed;
  }
  if (compras.length === 0) {
    return [{ nome: "Ingredientes", qtd: 1, unidade: "un", custo: custoUnitario * parseRendimento(rendimento) }];
  }
  const total = custoUnitario * parseRendimento(rendimento);
  const base = Math.round((total / compras.length) * 100) / 100;
  return compras.map((nome, i) => ({
    nome,
    qtd: 1,
    unidade: "un",
    custo:
      i === compras.length - 1
        ? Math.max(0, Math.round((total - base * (compras.length - 1)) * 100) / 100)
        : base,
  }));
}

function paraOportunidade(row: Tables["oportunidades"]["Row"]): Oportunidade {
  const comprasDetalhe = parseComprasDetalhe(
    row.compras_detalhe,
    row.compras,
    Number(row.custo_unitario),
    row.rendimento,
  );
  return {
    slug: row.slug,
    nome: row.nome,
    categoria: row.categoria,
    selo: row.selo as Selo,
    imagem: row.imagem_url || imagemDe(row.slug),
    indice: row.indice,
    criterios: (Array.isArray(row.criterios) ? row.criterios : []) as unknown as Criterio[],
    lucroEstimado: Number(row.lucro_estimado),
    investimento: Number(row.investimento),
    precoSugerido: Number(row.preco_sugerido),
    custoUnitario: Number(row.custo_unitario),
    tempoMin: row.tempo_min,
    dificuldade: row.dificuldade as Oportunidade["dificuldade"],
    demanda: row.demanda as Oportunidade["demanda"],
    rendimento: row.rendimento,
    validade: row.validade,
    porQue: row.por_que,
    ingredientes: row.ingredientes,
    preparo: row.preparo,
    compras: row.compras.length > 0 ? row.compras : comprasDetalhe.map((c) => c.nome),
    comprasDetalhe,
    comoVender: row.como_vender,
    checklist: row.checklist,
  };
}

async function listarOportunidades() {
  const { data, error } = await supabase.from("oportunidades").select("*").order("ordem");
  if (error) throw error;
  return {
    lista: data.map(paraOportunidade),
    doDia: data.find((o) => o.destaque_do_dia) ?? data[0],
    daSemana: data.find((o) => o.receita_da_semana) ?? data[1] ?? data[0],
  };
}

export function useOportunidades() {
  return useQuery({
    queryKey: ["oportunidades"],
    queryFn: async () => {
      const r = await listarOportunidades();
      return {
        lista: r.lista,
        doDia: r.doDia ? paraOportunidade(r.doDia) : null,
        daSemana: r.daSemana ? paraOportunidade(r.daSemana) : null,
      };
    },
  });
}

export function useOportunidade(slug: string) {
  return useQuery({
    queryKey: ["oportunidade", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("oportunidades")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? paraOportunidade(data) : null;
    },
  });
}

export function useTendencias() {
  return useQuery({
    queryKey: ["tendencias"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tendencias").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });
}

export function useDatas() {
  return useQuery({
    queryKey: ["datas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("datas_comemorativas").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });
}

export function useCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categorias").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });
}

export function useClientes() {
  useRealtimeTable("clientes", ["clientes"]);
  return useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clientes").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });
}

export function usePedidos() {
  useRealtimeTable("pedidos", ["pedidos"]);
  return useQuery({
    queryKey: ["pedidos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useTarefas() {
  useRealtimeTable("tarefas_producao", ["tarefas"]);
  return useQuery({
    queryKey: ["tarefas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tarefas_producao").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });
}

export function useCompras() {
  useRealtimeTable("itens_compra", ["compras"]);
  return useQuery({
    queryKey: ["compras"],
    queryFn: async () => {
      const { data, error } = await supabase.from("itens_compra").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });
}

export function useLancamentos() {
  useRealtimeTable("lancamentos", ["lancamentos"]);
  return useQuery({
    queryKey: ["lancamentos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lancamentos")
        .select("*")
        .order("dia", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useFavoritos() {
  return useQuery({
    queryKey: ["favoritos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favoritos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useDesafiosComProgresso() {
  return useQuery({
    queryKey: ["desafios-progresso"],
    queryFn: async (): Promise<DesafioComProgresso[]> => {
      const [desafiosRes, pedidosRes, lancamentosRes] = await Promise.all([
        supabase.from("desafios").select("*").order("ordem"),
        supabase.from("pedidos").select("produto,qtd"),
        supabase.from("lancamentos").select("tipo,valor,dia"),
      ]);
      if (desafiosRes.error) throw desafiosRes.error;
      if (pedidosRes.error) throw pedidosRes.error;
      if (lancamentosRes.error) throw lancamentosRes.error;

      const mesISO = new Date().toISOString().slice(0, 7);
      const pedidos = pedidosRes.data ?? [];
      const lancamentos = lancamentosRes.data ?? [];

      return (desafiosRes.data ?? []).map((d) => {
        let progresso = 0;
        if (d.tipo === "faturamento") {
          progresso = lancamentos
            .filter((l) => l.tipo === "entrada" && l.dia.startsWith(mesISO))
            .reduce((t, l) => t + Number(l.valor), 0);
        } else {
          const match = d.produto_match.trim().toLowerCase();
          progresso = pedidos
            .filter((p) => match.length > 0 && p.produto.toLowerCase().includes(match))
            .reduce((t, p) => t + Number(p.qtd), 0);
        }
        return { ...d, progresso };
      });
    },
  });
}

function useInvalidar(chave: string) {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: [chave] });
}

export function useToggleFavorito() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      const { data: existente, error: errSelect } = await supabase
        .from("favoritos")
        .select("id")
        .eq("oportunidade_slug", slug)
        .maybeSingle();
      if (errSelect) throw errSelect;
      if (existente) {
        const { error } = await supabase.from("favoritos").delete().eq("id", existente.id);
        if (error) throw error;
        return { slug, favorito: false as const };
      }
      const { error } = await supabase.from("favoritos").insert({ oportunidade_slug: slug });
      if (error) throw error;
      return { slug, favorito: true as const };
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["favoritos"] });
    },
  });
}

export function useToggleTarefa() {
  const invalidar = useInvalidar("tarefas");
  return useMutation({
    mutationFn: async ({ id, feito }: { id: string; feito: boolean }) => {
      const { error } = await supabase.from("tarefas_producao").update({ feito }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useAdicionarTarefa() {
  const invalidar = useInvalidar("tarefas");
  return useMutation({
    mutationFn: async (titulo: string) => {
      const { error } = await supabase.from("tarefas_producao").insert({ titulo });
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useAdicionarTarefas() {
  const invalidar = useInvalidar("tarefas");
  return useMutation({
    mutationFn: async (titulos: string[]) => {
      if (titulos.length === 0) return { adicionados: 0 };
      const { data: existentes, error: errSelect } = await supabase
        .from("tarefas_producao")
        .select("titulo");
      if (errSelect) throw errSelect;
      const jaTem = new Set((existentes ?? []).map((t) => t.titulo.trim().toLowerCase()));
      const novos = titulos
        .map((t) => t.trim())
        .filter((t) => t.length > 0 && !jaTem.has(t.toLowerCase()))
        .map((titulo, i) => ({ titulo, ordem: i }));
      if (novos.length === 0) return { adicionados: 0, ignorados: titulos.length };
      const { error } = await supabase.from("tarefas_producao").insert(novos);
      if (error) throw error;
      return { adicionados: novos.length, ignorados: titulos.length - novos.length };
    },
    onSuccess: invalidar,
  });
}

export function useToggleCompra() {
  const invalidar = useInvalidar("compras");
  return useMutation({
    mutationFn: async ({ id, comprado }: { id: string; comprado: boolean }) => {
      const { error } = await supabase.from("itens_compra").update({ comprado }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useAdicionarCompra() {
  const invalidar = useInvalidar("compras");
  return useMutation({
    mutationFn: async ({ item, qtd }: { item: string; qtd: string }) => {
      const { error } = await supabase.from("itens_compra").insert({ item, qtd });
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useAdicionarCompras() {
  const invalidar = useInvalidar("compras");
  return useMutation({
    mutationFn: async (itens: { item: string; qtd: string }[]): Promise<AdicionarComprasResultado> => {
      if (itens.length === 0) return { adicionados: 0, ignorados: 0 };
      const { data: existentes, error: errSelect } = await supabase.from("itens_compra").select("item");
      if (errSelect) throw errSelect;
      const jaTem = new Set((existentes ?? []).map((c) => c.item.trim().toLowerCase()));
      const novos = itens.filter((i) => {
        const key = i.item.trim().toLowerCase();
        return key.length > 0 && !jaTem.has(key);
      });
      const ignorados = itens.length - novos.length;
      if (novos.length === 0) return { adicionados: 0, ignorados };
      const { error } = await supabase.from("itens_compra").insert(novos);
      if (error) throw error;
      return { adicionados: novos.length, ignorados };
    },
    onSuccess: invalidar,
  });
}

export function useAtualizarPedido() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...campos
    }: { id: string } & Tables["pedidos"]["Update"]): Promise<{ lancamentoCriado: boolean }> => {
      let pedidoAntes: Tables["pedidos"]["Row"] | null = null;
      if (campos.pago === true) {
        const { data, error: errSelect } = await supabase.from("pedidos").select("*").eq("id", id).single();
        if (errSelect) throw errSelect;
        pedidoAntes = data;
      }

      const { error } = await supabase.from("pedidos").update(campos).eq("id", id);
      if (error) throw error;

      if (campos.pago === true && pedidoAntes && !pedidoAntes.pago) {
        const { data: existente, error: errExist } = await supabase
          .from("lancamentos")
          .select("id")
          .eq("pedido_id", id)
          .maybeSingle();
        if (errExist) throw errExist;
        if (!existente) {
          const { error: errLanc } = await supabase.from("lancamentos").insert({
            tipo: "entrada",
            descricao: `Pedido ${pedidoAntes.cliente}`,
            produto: pedidoAntes.produto,
            valor: Number(pedidoAntes.valor),
            dia: new Date().toISOString().slice(0, 10),
            pedido_id: id,
          });
          if (errLanc) throw errLanc;
          return { lancamentoCriado: true };
        }
      }
      return { lancamentoCriado: false };
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["pedidos"] });
      void qc.invalidateQueries({ queryKey: ["lancamentos"] });
      void qc.invalidateQueries({ queryKey: ["desafios-progresso"] });
    },
  });
}

export function useExcluirPedido() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pedidos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["pedidos"] });
      void qc.invalidateQueries({ queryKey: ["desafios-progresso"] });
    },
  });
}

export function useCriarPedido() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pedido: Tables["pedidos"]["Insert"]) => {
      const { error } = await supabase.from("pedidos").insert(pedido);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["pedidos"] });
      void qc.invalidateQueries({ queryKey: ["desafios-progresso"] });
    },
  });
}

export function useCriarLancamento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (l: Tables["lancamentos"]["Insert"]) => {
      const { error } = await supabase.from("lancamentos").insert(l);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["lancamentos"] });
      void qc.invalidateQueries({ queryKey: ["desafios-progresso"] });
    },
  });
}

export function useExcluirCompra() {
  const invalidar = useInvalidar("compras");
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("itens_compra").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useExcluirTarefa() {
  const invalidar = useInvalidar("tarefas");
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tarefas_producao").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useCriarCliente() {
  const invalidar = useInvalidar("clientes");
  return useMutation({
    mutationFn: async (cliente: Tables["clientes"]["Insert"]) => {
      const { error } = await supabase.from("clientes").insert(cliente);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useAtualizarCliente() {
  const invalidar = useInvalidar("clientes");
  return useMutation({
    mutationFn: async ({ id, ...campos }: { id: string } & Tables["clientes"]["Update"]) => {
      const { error } = await supabase.from("clientes").update(campos).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useExcluirCliente() {
  const invalidar = useInvalidar("clientes");
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clientes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}
