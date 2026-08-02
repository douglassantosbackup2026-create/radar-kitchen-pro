import morangoImg from "@/assets/morango-do-amor.jpg";
import brownieImg from "@/assets/brownie-dubai.jpg";
import copoImg from "@/assets/copo-da-felicidade.jpg";
import brigadeiroImg from "@/assets/brigadeiro-gourmet.jpg";

export type Selo = "Explodindo" | "Viral" | "Crescendo" | "Venda constante";

export type Criterio = { nome: string; nota: number };

export type Oportunidade = {
  slug: string;
  nome: string;
  categoria: string;
  selo: Selo;
  imagem: string;
  indice: number;
  criterios: Criterio[];
  lucroEstimado: number;
  investimento: number;
  precoSugerido: number;
  custoUnitario: number;
  tempoMin: number;
  dificuldade: 1 | 2 | 3;
  demanda: 1 | 2 | 3 | 4 | 5;
  rendimento: string;
  validade: string;
  porQue: string[];
  ingredientes: string[];
  preparo: string[];
  compras: string[];
  comoVender: string[];
  checklist: string[];
};

export const oportunidades: Oportunidade[] = [
  {
    slug: "morango-do-amor",
    nome: "Morango do Amor",
    categoria: "Doces",
    selo: "Explodindo",
    imagem: morangoImg,
    indice: 93,
    criterios: [
      { nome: "Facilidade de preparo", nota: 9 },
      { nome: "Investimento inicial", nota: 10 },
      { nome: "Margem de lucro", nota: 9 },
      { nome: "Velocidade de produção", nota: 8 },
      { nome: "Potencial de venda", nota: 10 },
      { nome: "Concorrência", nota: 7 },
    ],
    lucroEstimado: 420,
    investimento: 85,
    precoSugerido: 8,
    custoUnitario: 2.3,
    tempoMin: 50,
    dificuldade: 2,
    demanda: 5,
    rendimento: "60 unidades",
    validade: "2 dias sob refrigeração",
    porQue: [
      "Procura explodindo nas redes",
      "Investimento baixíssimo",
      "Margem acima de 70%",
      "Visual perfeito para Instagram",
    ],
    ingredientes: [
      "1 kg de morango fresco",
      "500 g de açúcar cristal",
      "200 g de chocolate branco",
      "1 lata de leite condensado",
      "Corante vermelho",
      "Palitos e forminhas",
    ],
    preparo: [
      "Lave e seque muito bem os morangos.",
      "Faça o brigadeiro branco e deixe amornar.",
      "Envolva cada morango no brigadeiro e leve à geladeira.",
      "Prepare a calda de açúcar até o ponto de vidro.",
      "Banhe os morangos na calda e coloque sobre papel manteiga.",
    ],
    compras: ["Morango", "Açúcar cristal", "Chocolate branco", "Leite condensado", "Palitos", "Forminhas"],
    comoVender: [
      "Venda por encomenda com 1 dia de antecedência",
      "Combo de 6 unidades por R$45",
      "Poste vídeo do banho de calda — é o que mais vende",
    ],
    checklist: ["Comprar ingredientes", "Higienizar morangos", "Preparar brigadeiro", "Banhar", "Embalar", "Entregar"],
  },
  {
    slug: "brownie-dubai",
    nome: "Brownie Dubai",
    categoria: "Doces",
    selo: "Viral",
    imagem: brownieImg,
    indice: 91,
    criterios: [
      { nome: "Facilidade de preparo", nota: 8 },
      { nome: "Investimento inicial", nota: 8 },
      { nome: "Margem de lucro", nota: 10 },
      { nome: "Velocidade de produção", nota: 9 },
      { nome: "Potencial de venda", nota: 10 },
      { nome: "Concorrência", nota: 8 },
    ],
    lucroEstimado: 380,
    investimento: 120,
    precoSugerido: 18,
    custoUnitario: 5.4,
    tempoMin: 60,
    dificuldade: 2,
    demanda: 5,
    rendimento: "24 unidades",
    validade: "5 dias",
    porQue: ["Alta procura", "Fácil", "Alta margem", "Excelente para Instagram"],
    ingredientes: [
      "300 g de chocolate meio amargo",
      "200 g de manteiga",
      "4 ovos",
      "300 g de açúcar",
      "180 g de farinha",
      "Creme de pistache",
      "Massa kadaif",
    ],
    preparo: [
      "Derreta o chocolate com a manteiga.",
      "Bata os ovos com o açúcar e incorpore.",
      "Adicione a farinha e leve ao forno por 25 min.",
      "Toste o kadaif e misture ao creme de pistache.",
      "Recheie e finalize com chocolate por cima.",
    ],
    compras: ["Chocolate meio amargo", "Manteiga", "Ovos", "Creme de pistache", "Massa kadaif", "Embalagem"],
    comoVender: ["Fatia individual R$18", "Caixa com 6 por R$95", "Ofereça degustação para lojas do bairro"],
    checklist: ["Comprar ingredientes", "Assar massa", "Preparar recheio", "Montar", "Cortar e embalar", "Entregar"],
  },
  {
    slug: "copo-da-felicidade",
    nome: "Copo da Felicidade",
    categoria: "Doces",
    selo: "Crescendo",
    imagem: copoImg,
    indice: 87,
    criterios: [
      { nome: "Facilidade de preparo", nota: 10 },
      { nome: "Investimento inicial", nota: 9 },
      { nome: "Margem de lucro", nota: 8 },
      { nome: "Velocidade de produção", nota: 9 },
      { nome: "Potencial de venda", nota: 9 },
      { nome: "Concorrência", nota: 6 },
    ],
    lucroEstimado: 310,
    investimento: 95,
    precoSugerido: 15,
    custoUnitario: 4.6,
    tempoMin: 40,
    dificuldade: 1,
    demanda: 4,
    rendimento: "30 copos",
    validade: "3 dias sob refrigeração",
    porQue: ["Montagem rápida", "Ótimo ticket médio", "Vende muito no calor"],
    ingredientes: [
      "1 kg de morango",
      "2 latas de leite condensado",
      "500 ml de creme de leite",
      "Chocolate ao leite",
      "Copos de 300 ml",
    ],
    preparo: [
      "Prepare o creme com leite condensado e creme de leite.",
      "Derreta o chocolate e forre os copos.",
      "Monte camadas alternando creme, morango e chocolate.",
      "Gele por 2 horas antes de vender.",
    ],
    compras: ["Morango", "Leite condensado", "Creme de leite", "Chocolate", "Copos 300 ml"],
    comoVender: ["Venda em pontos de grande circulação", "Leve 3 pague 2 no fim de semana"],
    checklist: ["Comprar ingredientes", "Preparar creme", "Montar copos", "Gelar", "Vender"],
  },
  {
    slug: "brigadeiro-gourmet",
    nome: "Brigadeiro Gourmet",
    categoria: "Doces",
    selo: "Venda constante",
    imagem: brigadeiroImg,
    indice: 84,
    criterios: [
      { nome: "Facilidade de preparo", nota: 10 },
      { nome: "Investimento inicial", nota: 10 },
      { nome: "Margem de lucro", nota: 8 },
      { nome: "Velocidade de produção", nota: 8 },
      { nome: "Potencial de venda", nota: 8 },
      { nome: "Concorrência", nota: 5 },
    ],
    lucroEstimado: 240,
    investimento: 60,
    precoSugerido: 3.5,
    custoUnitario: 1.1,
    tempoMin: 45,
    dificuldade: 1,
    demanda: 4,
    rendimento: "100 unidades",
    validade: "5 dias",
    porQue: ["Vende o ano inteiro", "Base para festas e encomendas", "Custo por unidade muito baixo"],
    ingredientes: ["4 latas de leite condensado", "200 g de chocolate nobre", "100 g de manteiga", "Granulado belga"],
    preparo: [
      "Cozinhe o leite condensado com chocolate e manteiga.",
      "Deixe esfriar completamente.",
      "Enrole e passe no granulado.",
    ],
    compras: ["Leite condensado", "Chocolate nobre", "Manteiga", "Granulado belga", "Forminhas"],
    comoVender: ["Cento por R$280", "Caixa com 12 por R$45", "Ofereça para festas de aniversário do bairro"],
    checklist: ["Comprar ingredientes", "Cozinhar massa", "Esfriar", "Enrolar", "Embalar", "Entregar"],
  },
];

export const oportunidadeDoDia = oportunidades[0]!;
export const receitaDaSemana = oportunidades[1]!;

export const tendencias = [
  { nome: "Brownie Dubai", selo: "Viral", nota: "Procura triplicou em 3 semanas" },
  { nome: "Mandioca na Garrafa", selo: "Explodindo", nota: "Alta procura em feiras e eventos" },
  { nome: "Copo da Felicidade", selo: "Crescendo", nota: "Vende muito no calor" },
  { nome: "Brigadeiro Gourmet", selo: "Venda constante", nota: "Base de qualquer encomenda" },
];

export const maisVendidas = ["Brownie", "Copo da Felicidade", "Mandioca na Garrafa", "Cocada", "Pudim"];

export const calendario = [
  { mes: "Agosto", data: "Dia dos Pais", itens: ["Brownie", "Caixa Premium", "Bolo"] },
  { mes: "Outubro", data: "Dia das Crianças", itens: ["Pirulito", "Brigadeiro", "Maçã do Amor"] },
  { mes: "Novembro", data: "Black Friday", itens: ["Combos", "Caixas fechadas"] },
  { mes: "Dezembro", data: "Natal", itens: ["Panetone", "Rabanada", "Cestas"] },
];

export const categorias = [
  { nome: "Bolos", icone: "🍰", total: 42 },
  { nome: "Pudins", icone: "🍮", total: 18 },
  { nome: "Bebidas", icone: "🥤", total: 24 },
  { nome: "Doces", icone: "🍫", total: 63 },
  { nome: "Salgados", icone: "🥧", total: 37 },
  { nome: "Marmitas", icone: "🍛", total: 29 },
  { nome: "Café", icone: "🍞", total: 21 },
  { nome: "Biscoitos", icone: "🍪", total: 16 },
];

export const producaoHoje = ["Fazer Brownie", "Fazer Pudim", "Comprar Leite", "Embalar", "Entregar"];

export const listaCompras = [
  { item: "Chocolate meio amargo", qtd: "1 kg" },
  { item: "Leite condensado", qtd: "6 latas" },
  { item: "Manteiga", qtd: "500 g" },
  { item: "Morango", qtd: "2 kg" },
  { item: "Embalagem", qtd: "50 un" },
];

export const pedidos = [
  { cliente: "Maria", produto: "Brownie", qtd: 12, status: "Entregue", pago: true },
  { cliente: "Joana", produto: "Copo da Felicidade", qtd: 20, status: "Em produção", pago: true },
  { cliente: "Carla", produto: "Morango do Amor", qtd: 30, status: "Pendente", pago: false },
  { cliente: "Rita", produto: "Brigadeiro Gourmet", qtd: 100, status: "Confirmado", pago: false },
];

export const clientes = [
  { nome: "Maria", ultimoPedido: 60, comprou: "Brownie", favorito: "Pudim", telefone: "(11) 98888-1122", aniversario: "14/09" },
  { nome: "Joana", ultimoPedido: 300, comprou: "Copo da Felicidade", favorito: "Brownie", telefone: "(11) 97777-3344", aniversario: "02/12" },
  { nome: "Carla", ultimoPedido: 240, comprou: "Morango do Amor", favorito: "Morango do Amor", telefone: "(11) 96666-5566", aniversario: "23/08" },
];

export const financeiro = {
  hoje: { entrou: 320, saiu: 85, lucro: 235 },
  mes: { faturamento: 6480, lucro: 3910, campeao: "Brownie Dubai" },
  semanas: [
    { semana: "S1", faturamento: 1280 },
    { semana: "S2", faturamento: 1540 },
    { semana: "S3", faturamento: 1720 },
    { semana: "S4", faturamento: 1940 },
  ],
};

export const desafios = [
  { titulo: "Venda 20 brownies", progresso: 20, meta: 20, medalha: "🥉 Bronze" },
  { titulo: "Venda 100 brigadeiros", progresso: 64, meta: 100, medalha: "🥈 Prata" },
  { titulo: "Fature R$3.000 no mês", progresso: 1940, meta: 3000, medalha: "🥇 Ouro" },
];

export const modulos = [
  { to: "/app", label: "Início", icone: "🏠" },
  { to: "/app/oportunidades", label: "Oportunidades", icone: "🔥" },
  { to: "/app/tendencias", label: "Tendências", icone: "📈" },
  { to: "/app/calendario", label: "Calendário", icone: "📅" },
  { to: "/app/biblioteca", label: "Biblioteca", icone: "📖" },
  { to: "/app/calculadoras", label: "Calculadoras", icone: "💰" },
  { to: "/app/producao", label: "Produção", icone: "📦" },
  { to: "/app/compras", label: "Compras", icone: "🛒" },
  { to: "/app/pedidos", label: "Pedidos", icone: "📝" },
  { to: "/app/clientes", label: "Clientes", icone: "👥" },
  { to: "/app/financeiro", label: "Financeiro", icone: "📈" },
  { to: "/app/favoritos", label: "Favoritos", icone: "⭐" },
  { to: "/app/desafios", label: "Desafios", icone: "🏆" },
] as const;

export const brl = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
