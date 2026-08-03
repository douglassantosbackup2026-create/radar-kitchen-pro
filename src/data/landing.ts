export type PlanId = "mensal" | "semestral" | "anual";
export type LandingCta = { label: string; to: "/assinar" | "/app"; plano?: PlanId };
export type FaqItem = readonly [pergunta: string, resposta: string];

export type Plan = {
  id: PlanId;
  nome: string;
  preco: string;
  periodo: string;
  nota: string;
  destaque?: string;
  cta: string;
};

export const landingTsl = {
  brand: "Faça & Venda PRO",
  meta: {
    title: "Faça & Venda PRO — Descubra hoje o que vender amanhã",
    description:
      "Todos os dias: receita completa, custo, preço de venda, lucro estimado e plano de produção. Você não precisa procurar. Só escolher e vender.",
  },
  hero: {
    eyebrow: "Clube das receitas que vendem",
    h1: "Descubra hoje o que vender amanhã.",
    sub: "Todos os dias nossa equipe seleciona as receitas que estão fazendo mais sucesso em vendas e entrega tudo pronto: receita completa, custo, preço de venda, lucro estimado e plano de produção. Você não precisa procurar. Só escolher e vender.",
    cta: { label: "Quero descobrir o que vender hoje", to: "/assinar" } as const satisfies LandingCta,
    trust: "★★★★★ Mais de 4.200 cozinheiras já utilizam a plataforma.",
  },
  problem: {
    h2: "Enquanto milhares de pessoas passam horas procurando receitas...",
    p: "Um vídeo diz para vender brownie. No outro dia, cocada. Depois pudim. Depois mandioca na garrafa. A dúvida nunca acaba — e no fim você não faz nada.",
    bridge: "Você abre a plataforma e encontra exatamente o que vale a pena produzir hoje.",
    checklist: [
      "Receita",
      "Ingredientes",
      "Custo",
      "Preço",
      "Lucro",
      "Lista de compras",
      "Checklist",
    ],
  },
  truth: {
    label: "A verdade",
    p: "O problema não é cozinhar. Nem falta de receita. É não saber qual receita realmente vale a pena vender hoje.",
  },
  offer: {
    label: "A nova oportunidade",
    h2: "Faça & Venda PRO",
    p: "Uma assinatura que mostra as receitas que realmente estão vendendo. Toda semana novas oportunidades, tudo organizado, sem precisar procurar.",
  },
  radar: {
    label: "O mecanismo",
    h2: "Radar Faça & Venda™",
    p: "Nossa equipe acompanha diariamente tendências, sazonalidades e receitas com alto potencial comercial para selecionar apenas as melhores oportunidades. Você não perde tempo pesquisando — você entra e escolhe.",
  },
  daily: {
    h2: "O que você encontra todos os dias",
    items: [
      { icone: "🔥", titulo: "Oportunidade do Dia", texto: "Uma escolha por dia. Só uma." },
      { icone: "📈", titulo: "Tendências da Semana", texto: "O que está explodindo agora." },
      { icone: "📅", titulo: "Calendário Comercial", texto: "Datas que vendem, com antecedência." },
      { icone: "🥇", titulo: "Mais Vendidas", texto: "O ranking do que sai todo dia." },
      { icone: "🆕", titulo: "Novas Receitas", texto: "Atualização semanal do Radar." },
    ],
  },
  morning: {
    h2: "Imagine abrir o celular pela manhã e ver isso:",
    saudacao: "Bom dia, Maria 👋",
    label: "Hoje recomendamos",
  },
  ficha: {
    h2: "Cada receita já vem pronta para vender.",
    more: "Mais: modo de preparo, lista de compras, checklist de produção e o botão Adicionar ao plano da semana.",
  },
  calc: {
    h2: "Nunca mais fique em dúvida sobre quanto cobrar.",
    note: "Mexa nos ingredientes e veja o preço e o lucro mudarem na hora.",
  },
  ops: {
    h2: "Sua cozinha organizada como um pequeno negócio.",
    producao: ["Fazer Brownie", "Fazer Pudim", "Embalar", "Entregar"],
    pedidos: [
      { nome: "Maria", status: "Entregue" },
      { nome: "Joana", status: "Em produção" },
      { nome: "Carla", status: "Pendente" },
    ],
    cliente: {
      nome: "Maria",
      resumo: "Último pedido R$60 · Favorito: Pudim",
      aniversario: "Aniversário em 14/09",
    },
    financeiro: { entrou: 320, saiu: 85 },
  },
  weeks: {
    h2: "Toda semana entram novas oportunidades.",
    items: [
      { quando: "Semana passada", nome: "Morango do Amor" },
      { quando: "Essa semana", nome: "Brownie Dubai" },
      { quando: "Próxima", nome: "Copo Pistache" },
    ],
  },
  indice: {
    h2: "Índice de Oportunidade",
    p: "Cada receita recebe uma nota de 0 a 100. Você não precisa mais assistir 30 vídeos tentando adivinhar o que vale a pena. A receita já chega analisada pela nossa equipe.",
  },
  inclusos: {
    h2: "Veja tudo que está incluso",
    items: [
      "🔥 Oportunidade do Dia",
      "📈 Radar de Tendências",
      "📖 Biblioteca Completa",
      "💰 Precificação",
      "📅 Agenda",
      "🛒 Lista de Compras",
      "📦 Produção",
      "📝 Pedidos",
      "👥 Clientes",
      "📈 Financeiro",
      "📊 Simulador",
      "🏆 Desafios",
    ],
  },
  calendarioSazonal: {
    h2: "Você nunca fica perdida nas datas que mais vendem.",
    meses: [
      { mes: "Agosto", data: "Dia dos Pais", itens: ["Brownie", "Caixa Premium", "Bolo"] },
      { mes: "Outubro", data: "Dia das Crianças", itens: ["Pirulito", "Brigadeiro", "Maçã do Amor"] },
      { mes: "Novembro", data: "Black Friday", itens: ["Combos", "Caixas fechadas"] },
      { mes: "Dezembro", data: "Natal", itens: ["Panetone", "Rabanada", "Cestas"] },
    ],
  },
  plansIntro: "Quanto vale nunca mais perder tempo procurando o que vender?",
  planBenefits: [
    "Biblioteca completa de receitas",
    "Novas receitas toda semana",
    "Radar de tendências",
    "Calendário sazonal",
    "Precificação e simulador de lucro",
    "Lista de compras e produção",
    "Pedidos, clientes e financeiro",
    "Favoritos e desafios",
  ],
  plans: [
    {
      id: "mensal",
      nome: "Plano Mensal",
      preco: "R$47",
      periodo: "/mês",
      nota: "por mês, sem fidelidade",
      cta: "Assinar mensal",
    },
    {
      id: "semestral",
      nome: "Plano Semestral",
      preco: "R$127",
      periodo: "/semestre",
      nota: "equivale a R$21,17/mês",
      destaque: "Mais escolhido",
      cta: "Assinar semestral",
    },
    {
      id: "anual",
      nome: "Plano Anual",
      preco: "R$197",
      periodo: "/ano",
      nota: "equivale a R$16,42/mês",
      cta: "Quero assinar",
    },
  ] satisfies Plan[],
  garantia: {
    label: "Garantia",
    h2: "7 dias para testar sem risco.",
    p: "Se você não encontrar pelo menos uma oportunidade que valha a pena produzir, devolvemos 100% do valor.",
  },
  faq: [
    [
      "Preciso ter experiência na cozinha?",
      "Não. Cada receita traz o passo a passo completo, tempo de preparo e nível de dificuldade.",
    ],
    [
      "As receitas são atualizadas?",
      "Sim. O Radar Faça & Venda™ adiciona novas oportunidades toda semana.",
    ],
    [
      "Quanto preciso investir para começar?",
      "A maioria das oportunidades começa com menos de R$100 em ingredientes.",
    ],
    ["Serve só para doces?", "Não. Há marmitas, salgados, bebidas, panificação e café da manhã."],
    [
      "Funciona no celular?",
      "Sim, a plataforma foi feita para ser usada no celular dentro da cozinha.",
    ],
    [
      "Posso cancelar quando quiser?",
      "Sim, a assinatura é sem fidelidade e o cancelamento é feito em um clique.",
    ],
    [
      "Como funciona a garantia?",
      "Você tem 7 dias para testar. Se não gostar, devolvemos 100% do valor.",
    ],
    ["Recebo suporte?", "Sim, atendimento por e-mail em até 24 horas úteis."],
  ] as const satisfies readonly FaqItem[],
  final: {
    h2: "Todos os dias uma nova oportunidade de faturar na sua cozinha.",
    ctaPrimary: {
      label: "Quero descobrir o que vender hoje",
      to: "/assinar",
      plano: "semestral",
    } as const satisfies LandingCta,
    ctaSecondary: {
      label: "Quer ver por dentro? Conheça a plataforma",
      to: "/app",
    } as const satisfies LandingCta,
  },
} as const;
