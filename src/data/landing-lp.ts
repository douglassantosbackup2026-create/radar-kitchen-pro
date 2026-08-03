import type { FaqItem, LandingCta } from "@/data/landing";

export const landingLp = {
  brand: "Faça & Venda PRO",
  meta: {
    title: "Faça & Venda PRO — Qualquer pessoa pode vender receitas que faturam",
    description:
      "Entenda como cozinheiras comuns estão ganhando dinheiro vendendo o que o Radar aponta todos os dias: receita, custo, preço e lucro prontos.",
  },
  urgency: {
    endsOn: "03/08/2026",
    label: "A oferta desta página acaba no dia",
  },
  hero: {
    h1: [
      { text: "Descubra como " },
      { text: "pessoas comuns", highlight: true },
      { text: " estão transformando " },
      { text: "receitas gostosas", highlight: true },
      { text: " em uma " },
      { text: "renda de até R$5.000 por mês", highlight: true },
      { text: "... " },
      { text: "mesmo começando do zero", highlight: true },
    ],
    sub: "Entenda como mulheres, que mal quebravam um ovo na cozinha, estão ganhando muito dinheiro vendendo receitas gostosas em casa.",
    cta: { label: "Quero descobrir o que vender agora", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
    trust: [
      { k: "Garantia", v: "7 dias" },
      { k: "Acesso", v: "imediato" },
      { k: "Assinatura", v: "100% sem fidelidade" },
      { k: "+4.200", v: "cozinheiras" },
    ],
  },
  effort: {
    h2: "Pouco esforço para vender…",
    p: "Quando a oportunidade do dia já vem com receita, lista de compras, preço e checklist, uma fornada bem escolhida basta para clientes pedirem de novo. Isso não é achismo — é o que a plataforma organiza todos os dias.",
    screenshot: "/app-home-renda-extra.png",
    screenshotAlt:
      "Tela do Faça & Venda PRO com meta do mês, oportunidade do dia e o botão Montar minha produção desta semana",
    cta: { label: "Quero começar a vender agora", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  marquee: "Receitas que vendem • Custo • Preço • Lucro • Produção • Pedidos • ",
  proofs: {
    h2: "Depois disso, o seu negócio pode crescer de forma extraordinária — com histórias reais da comunidade:",
    feed: {
      titulo: "Comunidade Faça & Venda",
      subtitulo: "Da comunidade · degustações e primeiras vendas",
    },
    items: [
      {
        id: "juliana",
        nome: "Juliana Campos",
        screenshot: "/depoimentos/juliana.png",
        alt: "Juliana conta que usou a Oportunidade do Dia do Radar (Morango do Amor) e fechou 12 encomendas",
      },
      {
        id: "patricia",
        nome: "Patricia Souza",
        screenshot: "/depoimentos/patricia.png",
        alt: "Patricia vendeu Brownie Dubai da Oportunidade do Dia na escola do filho",
      },
      {
        id: "camila",
        nome: "Camila Ferreira",
        screenshot: "/depoimentos/camila.png",
        alt: "Camila fez Copo da Felicidade do Radar e lotou a agenda do sábado",
      },
      {
        id: "ana",
        nome: "Ana Ribeiro",
        screenshot: "/depoimentos/ana.png",
        alt: "Ana vendeu Brigadeiro Gourmet seguindo lista e preço do Radar",
      },
      {
        id: "fernanda",
        nome: "Fernanda Lima",
        screenshot: "/depoimentos/fernanda.png",
        alt: "Fernanda vendeu Mandioca na Garrafa na feira do bairro com o Radar",
      },
      {
        id: "beatriz",
        nome: "Beatriz Mendes",
        screenshot: "/depoimentos/beatriz.png",
        alt: "Beatriz fez bolo de pote com o checklist do Faça & Venda e encheu a agenda",
      },
    ],
  },
  authority: {
    h2: "Provas de autoridade que vamos montar com o tempo",
    items: [
      {
        titulo: "Destaque externo",
        texto: "Matéria, feira ou concurso local de uma assinante. [Placeholder — coletar.]",
      },
      {
        titulo: "Validação em podcast / mídia",
        texto: "Convite a falar do negócio na cidade. [Placeholder — coletar.]",
      },
      {
        titulo: "Fácil até para iniciantes",
        texto: "Quem nunca vendeu e fez a primeira fornada com o Radar. [Placeholder — coletar.]",
      },
    ],
  },
  catalog: {
    h2: "Entrando hoje no Faça & Venda PRO, você para de ouvir: “o mesmo sabor de novo?”",
    p: "A biblioteca e o Radar entregam oportunidades em doces, salgados, marmitas e panificação — com ficha completa para produzir e vender.",
    groups: [
      {
        titulo: "Decidir",
        itens: ["Oportunidade do Dia", "Tendências", "Calendário comercial", "Mais vendidas", "Biblioteca"],
      },
      {
        titulo: "Executar",
        itens: ["Precificação", "Lista de compras", "Produção", "Pedidos"],
      },
      {
        titulo: "Crescer",
        itens: ["Clientes", "Financeiro", "Desafios", "Favoritos"],
      },
    ],
    cta: { label: "Quero acessar a plataforma agora", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  exclusives: {
    h2: "Você ainda terá acesso a módulos que fecham o ciclo da venda",
    items: [
      { titulo: "Precificação inteligente", texto: "Custo, margem e preço de venda editáveis na hora." },
      { titulo: "Lista de compras", texto: "Do plano da semana para o mercado — editável." },
      { titulo: "Produção + pedidos", texto: "Checklist e status sem planilha solta." },
      { titulo: "Financeiro do dia", texto: "Entrou, saiu e lucro — ligado aos pedidos pagos." },
      { titulo: "Calendário sazonal", texto: "Datas que vendem, com antecedência." },
    ],
    cta: { label: "Quero descobrir o que vender agora", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  why: {
    h2: "Por que o Radar Faça & Venda™ é diferente de “mais uma receita na internet”?",
    points: [
      {
        titulo: "Seleção comercial, não só gostosa",
        texto:
          "Acompanamos tendência, sazonalidade e potencial de margem para entregar o que vale a pena vender — não só o que viralizou no Reels.",
      },
      {
        titulo: "Balanceamento de negócio",
        texto:
          "Cada ficha traz investimento, preço sugerido, lucro estimado, tempo e checklist. Você replica e precifica com clareza.",
      },
    ],
    cta: { label: "Quero ver o Radar agora", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  plan4: {
    h2: "Eu te entrego mastigado: um plano para começar a vender",
    steps: [
      {
        n: 1,
        titulo: "Receita da oportunidade",
        texto: "Escolha o que o Radar aponta hoje — passo a passo, rendimento e validade inclusos.",
      },
      {
        n: 2,
        titulo: "Precificação correta",
        texto: "Simulador de custo, margem e lucro. Ajuste o preço de venda e veja o resultado na hora.",
      },
      {
        n: 3,
        titulo: "Cardápio e produção",
        texto: "Compras, checklist de produção e pedidos — do WhatsApp ao caixa.",
      },
      {
        n: 4,
        titulo: "Canais de venda",
        texto: "Bônus e orientação para divulgar (cardápio digital + aulão iFood/WhatsApp nos planos elegíveis).",
      },
    ],
    cta: { label: "Quero esse plano agora", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  bonus: [
    {
      titulo: "Bônus 1 — Cardápio Digital Pronto",
      texto: "Template editável para postar no WhatsApp e Instagram com as receitas do seu momento.",
      de: "R$97",
      por: "R$0",
      regra: "Incluso em todos os planos",
    },
    {
      titulo: "Bônus 2 — Aulão iFood e WhatsApp Business",
      texto: "Posicionamento local e delivery para quem quer escalar além do boca a boca.",
      de: "R$147",
      por: "R$0",
      regra: "Incluso a partir do Semestral (destaque) e Anual",
    },
  ],
  stack: {
    h2: "O que você recebe na assinatura",
    rows: [
      { nome: "Biblioteca + Oportunidade do Dia", valor: "R$97/mês" },
      { nome: "Radar de Tendências", valor: "R$67/mês" },
      { nome: "Precificação + simulador", valor: "R$47/mês" },
      { nome: "Compras + Produção", valor: "R$37/mês" },
      { nome: "Pedidos + Clientes + Financeiro", valor: "R$67/mês" },
      { nome: "Calendário + Desafios", valor: "R$27/mês" },
    ],
    totalAvulso: "R$342/mês se comprasse separado",
    nota: "Na prática você escolhe o período: Mensal, Semestral ou Anual — mesmos benefícios.",
  },
  community: {
    h2: "Você não vai ficar sozinha nisso",
    p: "A comunidade Faça & Venda (WhatsApp/Telegram) é onde assinantes trocam fornecedor, precificação, dúvidas de produção e comemoram venda — com a equipe por perto.",
    cta: { label: "Quero entrar na comunidade", to: "/assinar", plano: "semestral" } as const satisfies LandingCta,
  },
  garantia: {
    label: "Garantia",
    h2: "7 dias para testar sem risco.",
    p: "Se em uma semana você não encontrar pelo menos uma oportunidade que valha a pena produzir, devolvemos 100% do valor.",
  },
  faq: [
    [
      "Preciso ter experiência na cozinha?",
      "Não. Cada oportunidade traz passo a passo, tempo e nível de dificuldade.",
    ],
    [
      "Serve só para doces?",
      "Não. Há marmitas, salgados, bebidas, panificação e café da manhã.",
    ],
    [
      "Funciona no celular?",
      "Sim — a plataforma foi feita para usar com uma mão só, dentro da cozinha.",
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
      "Sim. Sem fidelidade — cancele em um clique.",
    ],
    [
      "Como funciona o suporte?",
      "E-mail em até 24h úteis. Planos maiores podem incluir suporte prioritário conforme a oferta.",
    ],
    [
      "Como recebo o acesso?",
      "Após a confirmação do pagamento (quando o checkout estiver ativo), o acesso à plataforma é liberado. Enquanto isso, você já pode conhecer o protótipo em /app.",
    ],
    [
      "E se eu me arrepender?",
      "7 dias de garantia. Não gostou, devolvemos 100% do valor.",
    ],
  ] as const satisfies readonly FaqItem[],
  plansIntro: "Escolha o período e comece a vender com o Radar a seu favor",
  final: {
    h2: "Todos os dias, uma nova oportunidade de faturar na sua cozinha.",
    ctaPrimary: {
      label: "Quero descobrir o que vender agora",
      to: "/assinar",
      plano: "semestral",
    } as const satisfies LandingCta,
    ctaSecondary: { label: "Conhecer a plataforma", to: "/app" } as const satisfies LandingCta,
  },
} as const;
