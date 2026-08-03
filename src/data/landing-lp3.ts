import type { FaqItem, LandingCta } from "@/data/landing";

export const landingLp3 = {
  brand: "Faça & Venda PRO",
  version: "PRO · ATUALIZADO 2026",
  meta: {
    title: "Faça & Venda PRO — Pare de adivinhar o que vender",
    description:
      "Radar com oportunidade do dia, biblioteca de fichas, custo, preço e lucro. Escolha, produza e venda — direto do celular.",
  },
  updated: "Atualizado 03/08/2026",
  hero: {
    h1: "Pare de adivinhar o que vender. Abra o Radar e produza com lucro.",
    sub: "Oportunidade do dia com custo, preço e lucro — direto do celular, sem abrir mão da família.",
    cta: {
      label: "Quero o Radar — a partir de R$21/mês",
      to: "/assinar",
      plano: "semestral",
    } as const satisfies LandingCta,
    trust: "Semestral R$127 · equivale a R$21,17/mês · Garantia 7 dias · Sem fidelidade no Mensal",
  },
  packs: [
    {
      code: "RD",
      titulo: "Radar",
      texto: "Oportunidade do Dia e tendências com potencial de margem",
      meta: "ação.necessáriaescolher → produzir",
    },
    {
      code: "BB",
      titulo: "Biblioteca",
      texto: "Fichas completas: receita, custo, preço e lucro estimados",
      meta: "tipo: fichas prontas",
    },
    {
      code: "OP",
      titulo: "Operação",
      texto: "Compras, produção, pedidos e financeiro do dia",
      meta: "formato: checklist na mão",
    },
  ],
  changelog: {
    label: "Changelog",
    h2: "Tudo que você recebe na assinatura.",
    badge: "2026 · Atualizado",
    items: [
      "Oportunidade do Dia — uma escolha clara para produzir agora",
      "Radar de tendências — o que está vendendo, com antecedência",
      "Biblioteca de fichas — doces, salgados, marmitas e panificação",
      "Custo, preço sugerido e lucro estimado em cada receita",
      "Lista de compras editável — do plano da semana para o mercado",
      "Checklist de produção + pedidos sem planilha solta",
      "Calendário comercial — datas que vendem, com antecedência",
    ],
  },
  workspace: {
    label: "Workspace",
    h2: "Explorer",
    folders: [
      { name: "radar/", kind: "folder" as const },
      { name: "biblioteca/", kind: "folder" as const },
      { name: "producao/", kind: "folder" as const },
      { name: "pedidos/", kind: "folder" as const },
      { name: "oportunidade-do-dia.md", kind: "file" as const },
      { name: "precificacao.md", kind: "file" as const },
    ],
    shortcuts: [
      { keys: "Dia", action: "Oportunidade do Dia" },
      { keys: "Lista", action: "Compras da semana" },
      { keys: "Caixa", action: "Financeiro do dia" },
    ],
    highlight: {
      title: "Pack completo",
      price: "a partir de R$21/mês",
      items: [
        { k: "Radar", v: "todo dia" },
        { k: "Biblioteca", v: "dezenas de fichas" },
        { k: "Operação", v: "incluso" },
      ],
    },
  },
  props: {
    label: "Propriedades",
    h2: "Conteúdo",
    rows: [
      { k: "Tipo", v: "Assinatura" },
      { k: "Formato", v: "Pronto para vender" },
      { k: "Acesso", v: "Celular e desktop" },
      { k: "Garantia", v: "7 dias" },
    ],
    categoriesLabel: "Categorias",
    categories: ["Doces", "Salgados", "Marmitas", "Panificação", "Datas"],
    includedLabel: "Inclusos",
    included: ["Radar", "Precificação", "Compras", "Produção", "Pedidos", "Financeiro"],
  },
  readme: {
    label: "README.md",
    forWho: {
      h3: "Pra quem é essa plataforma",
      items: [
        "Você quer vender de casa, mas trava na hora de escolher o que produzir.",
        "Fica girando no Instagram caçando moda da semana — e no fim não faz nada.",
        "Produz sem saber se sobrou margem, ou cobra no achismo.",
      ],
    },
    transform: {
      h3: "A transformação",
      p: 'De "travada sem saber o que vender" para "escolheu, precificou e produziu" — com o Radar apontando a oportunidade e a ficha pronta na mão.',
    },
  },
  stats: [
    { k: "+4.200", v: "Cozinheiras na lógica" },
    { k: "R$21", v: "por mês no Semestral" },
    { k: "7d", v: "Garantia incondicional" },
    { k: "< R$100", v: "para começar a maioria" },
  ],
  plansIntro: {
    h2: "Escolha o período",
    sub: "Mesmos benefícios · Destaque no Semestral · Sem fidelidade no Mensal",
  },
  guarantee: {
    label: "Risco zero",
    h2: "7 dias para testar sem risco.",
    p: "Se em uma semana você não encontrar pelo menos uma oportunidade que valha a pena produzir, devolvemos 100% do valor.",
  },
  faq: [
    [
      "Preciso ter experiência na cozinha?",
      "Não. Cada ficha traz passo a passo, tempo e nível de dificuldade.",
    ],
    [
      "Serve só para doces?",
      "Não. Há marmitas, salgados, bebidas, panificação e café da manhã.",
    ],
    [
      "Funciona no celular?",
      "Sim — feito para usar com uma mão só, dentro da cozinha.",
    ],
    [
      "As receitas são atualizadas?",
      "Sim. O Radar adiciona novidades toda semana.",
    ],
    [
      "Quanto preciso investir para começar?",
      "A maioria das oportunidades começa com menos de R$100 em ingredientes.",
    ],
    [
      "Posso cancelar quando quiser?",
      "Sim. Sem fidelidade no Mensal — cancele em um clique.",
    ],
    [
      "Como recebo o acesso?",
      "Após a confirmação do pagamento, o acesso à plataforma é liberado. Enquanto isso, você pode conhecer o protótipo em /app.",
    ],
    [
      "E se eu me arrepender?",
      "7 dias de garantia. Não gostou, devolvemos 100% do valor.",
    ],
  ] as const satisfies readonly FaqItem[],
  final: {
    h2: "Pare de adivinhar. Comece a vender.",
    cta: {
      label: "Quero o Radar — a partir de R$21/mês",
      to: "/assinar",
      plano: "semestral",
    } as const satisfies LandingCta,
    note: "Pagamento por período · Acesso à plataforma · Garantia 7 dias",
  },
} as const;
