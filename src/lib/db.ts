import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Criterio, Oportunidade, Selo } from "@/data/facaevenda";
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

const imagens: Record<string, string> = {
  "morango-do-amor": morangoImg,
  "brownie-dubai": brownieImg,
  "copo-da-felicidade": copoImg,
  "brigadeiro-gourmet": brigadeiroImg,
};

export function imagemDe(slug: string) {
  return imagens[slug] ?? morangoImg;
}

function paraOportunidade(row: Tables["oportunidades"]["Row"]): Oportunidade {
  return {
    slug: row.slug,
    nome: row.nome,
    categoria: row.categoria,
    selo: row.selo as Selo,
    imagem: imagemDe(row.slug),
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
    compras: row.compras,
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

function useInvalidar(chave: string) {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: [chave] });
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

export function useAtualizarPedido() {
  const invalidar = useInvalidar("pedidos");
  return useMutation({
    mutationFn: async ({ id, ...campos }: { id: string } & Tables["pedidos"]["Update"]) => {
      const { error } = await supabase.from("pedidos").update(campos).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useCriarPedido() {
  const invalidar = useInvalidar("pedidos");
  return useMutation({
    mutationFn: async (pedido: Tables["pedidos"]["Insert"]) => {
      const { error } = await supabase.from("pedidos").insert(pedido);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}

export function useCriarLancamento() {
  const invalidar = useInvalidar("lancamentos");
  return useMutation({
    mutationFn: async (l: Tables["lancamentos"]["Insert"]) => {
      const { error } = await supabase.from("lancamentos").insert(l);
      if (error) throw error;
    },
    onSuccess: invalidar,
  });
}
