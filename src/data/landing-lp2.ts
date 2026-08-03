import type { FaqItem, LandingCta } from "@/data/landing";

export const landingLp2 = {
  brand: "Faça & Venda PRO",
  meta: {
    title: "Faça & Venda PRO — Descubra o que vender e produza com lucro",
    description:
      "Oportunidade do dia, biblioteca, custo, preço sugerido e lucro estimado. Escolha, produza e venda — direto do celular.",
  },
  urgency: "Oferta desta página: planos Mensal, Semestral e Anual com acesso imediato após o checkout.",
  hero: {
    h1: "Descubra o que vender hoje — e produza com lucro de verdade.",
    sub: "Receitas práticas com custo, preço sugerido e plano de produção para transformar a cozinha em renda, sem abrir mão do sabor.",
    cta: { label: "Quero descobrir o que vender!", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
    trust: [
      { k: "Acesso", v: "Imediato na plataforma" },
      { k: "Compra", v: "100% segura" },
      { k: "Garantia", v: "7 dias total" },
    ],
  },
  benefits: {
    h2: "Benefícios do produto",
    items: [
      "Oportunidade do Dia todo dia",
      "Custo, preço e lucro estimados",
      "Biblioteca com dezenas de fichas",
      "Doces, salgados, marmitas e mais",
      "Precificação editável na hora",
      "Fácil para quem não tem prática",
      "Adeus à dúvida do que vender",
      "Acesso no celular ou desktop",
    ],
    cta: { label: "Sim, quero vender com mais clareza", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  gallery: {
    h2: "Veja oportunidades ao vivo na plataforma",
    note: "Cards abaixo vêm do Radar (dados reais do app).",
  },
  proofs: {
    h2: "Veja o que vamos publicar quando coletarmos histórias reais",
    items: [
      { titulo: "Depoimento 1", texto: "[Coletar] — transformou hobby em renda extra." },
      { titulo: "Depoimento 2", texto: "[Coletar] — primeira fornada na primeira semana." },
      { titulo: "Depoimento 3", texto: "[Coletar] — parou de chutar preço e ganhou margem." },
      { titulo: "Depoimento 4", texto: "[Coletar] — usa o Radar no celular na cozinha." },
    ],
  },
  prepare: {
    h2: "Veja o que você vai preparar e vender",
    items: [
      { titulo: "Doces que saem rápido", texto: "Brownies, copos, brigadeiros — com margem clara." },
      { titulo: "Salgados e lanches", texto: "Opções de alto giro para o dia a dia." },
      { titulo: "Marmitas e refeições", texto: "Quando o Radar aponta demanda local." },
      { titulo: "Datas sazonais", texto: "Calendário comercial com antecedência." },
    ],
    more: "+ dezenas de outras fichas no Radar e na biblioteca",
  },
  categories: {
    h2: "Divididas em módulos completos",
    items: [
      { titulo: "Café e lanches", texto: "Ideias rápidas para o começo do dia" },
      { titulo: "Doces e sobremesas", texto: "Alto ticket visual para Instagram" },
      { titulo: "Salgados práticos", texto: "Giro constante na vizinhança" },
      { titulo: "Marmitas e refeições", texto: "Quando a oportunidade pede volume" },
      { titulo: "Panificação", texto: "Pães e massas com precificação" },
      { titulo: "Datas comemorativas", texto: "Agenda que vende sozinha" },
      { titulo: "Gestão da cozinha", texto: "Compras, produção, pedidos" },
      { titulo: "Financeiro", texto: "Entrou, saiu e lucro do dia" },
    ],
    cta: { label: "Quero todas as oportunidades", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  forYou: {
    h2: "Esta plataforma é perfeita para você que:",
    items: [
      "Quer vender melhor sem viver adivinhando o que produzir",
      "Sente que perde tempo caçando receita na internet",
      "Quer custo, preço e lucro claros antes de comprar ingredientes",
      "Cansou de produzir e não saber se sobrou margem",
      "Precisa de ideias rápidas para o dia, a semana e as datas",
      "Quer agradar clientes e organizar a cozinha como negócio",
    ],
  },
  bonus: {
    h2: "Compre agora e receba + 3 bônus",
    label: "Presente especial",
    items: [
      {
        titulo: "Lista de compras essencial",
        texto: "Do plano da semana para o mercado — editável.",
        de: "R$29,90",
        por: "Grátis",
      },
      {
        titulo: "Cardápio digital pronto",
        texto: "Template para WhatsApp e Instagram.",
        de: "R$39,90",
        por: "Grátis",
      },
      {
        titulo: "Aulão iFood e WhatsApp Business",
        texto: "Posicionamento local para vender mais.",
        de: "R$24,90",
        por: "Grátis*",
      },
    ],
    nota: "* Aulão incluso a partir do Semestral/Anual conforme a oferta. Valor total dos bônus — liberados na assinatura.",
  },
  plansIntro: {
    h2: "Escolha seu plano",
    sub: "Oferta por período · Acesso à plataforma · Sem fidelidade no Mensal",
  },
  social: {
    h2: "+4.200 cozinheiras já usam a lógica Faça & Venda",
    rating: "4.9",
    nota: "Meta de prova social — substituir por avaliações reais quando coletadas.",
  },
  guarantee: {
    label: "Risco zero",
    h2: "Garantia incondicional de 7 dias",
    p: "Teste a plataforma por 7 dias. Se não encontrar pelo menos uma oportunidade que valha produzir, devolvemos 100% do valor — sem perguntas.",
    cta: { label: "Quero assinar com segurança", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  receive: {
    h2: "Como você vai receber",
    items: [
      { titulo: "No celular", texto: "Acesse onde estiver" },
      { titulo: "No computador", texto: "Tela grande para precificar" },
      { titulo: "Na cozinha", texto: "Checklist e compras na mão" },
      { titulo: "Checkout em breve", texto: "Enquanto isso, conheça /app" },
    ],
  },
  faq: [
    [
      "As receitas realmente ajudam a vender?",
      "Sim. Cada ficha traz potencial comercial: demanda, investimento, preço sugerido e lucro estimado — não é só “gostosa”.",
    ],
    [
      "É só para quem quer dieta / restrição?",
      "Não. O foco é vender o que está pedindo agora na confeitaria e comida caseira — doces, salgados, marmitas e mais.",
    ],
    [
      "Preciso de ingredientes caros?",
      "Não. A maioria das oportunidades começa com menos de R$100 em ingredientes de mercado comum.",
    ],
    [
      "Serve para a família / clientes da rua?",
      "Sim. A ideia é agradar quem compra e deixar margem clara para quem vende.",
    ],
    [
      "É simples de usar?",
      "Sim. Feito para o dia a dia: escolha a oportunidade, precifique, compre, produza e registre o pedido.",
    ],
    [
      "Preciso saber cozinhar?",
      "Ajuda, mas cada ficha traz passo a passo, tempo e dificuldade. Iniciantes conseguem acompanhar.",
    ],
    [
      "Como recebo o acesso?",
      "Após o pagamento (quando o checkout estiver ativo), a plataforma libera. Enquanto isso você pode explorar /app.",
    ],
    [
      "E se eu não gostar?",
      "7 dias de garantia. Não ficou satisfeita, devolvemos o valor.",
    ],
    [
      "Por quanto tempo tenho acesso?",
      "Enquanto a assinatura estiver ativa (Mensal, Semestral ou Anual). Sem fidelidade no Mensal.",
    ],
  ] as const satisfies readonly FaqItem[],
  final: {
    cta: { label: "Ver oferta e escolher plano", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
} as const;
