import fs from "node:fs";

const virais = [
  "Morango do Amor",
  "X-Bolo",
  "Mandioca na Garrafa",
  "Tapioca Gourmet",
  "Ninho Queimado",
  "Coco com Nutella",
  "Chocolate na Garrafa",
  "Mousse de Milho",
  "Cuscuz Bolonhesa",
  "Arroz na Garrafa",
  "Horchata",
  "Banana + Tang",
  "Abacate + Tang",
  "Geladão de Oreo",
  "Prestígio Gelado",
  "Pavê de Limão",
  "Nuvem de Ninho",
  "Ratatouille na Bandeja",
  "Maria Mole Gourmet",
  "Cuscuz Doce",
];
const classicos = [
  "Trufa",
  "Cone Trufado",
  "Brigadeiro Gourmet",
  "Brigadeiro de Paçoca",
  "Brigadeiro de Pistache",
  "Brownie",
  "Brownie Dubai",
  "Palha Italiana",
  "Bombom",
  "Alfajor",
  "Pão de Mel",
  "Suspiro",
  "Pirulito de Cristal",
  "Copo da Felicidade",
  "Banoffee",
  "Churros no Copo",
  "Mini Donuts",
  "Donuts",
  "Gelatina Trufada",
  "Geladinho Gourmet",
  "Geladinho com Casquinha",
];
const bolos = [
  "Bolo no Pote",
  "Bolo Vulcão",
  "Bolo Tsunami",
  "X-Bolo",
  "Box Cake",
  "Bolo em Fatia",
  "Bolo Gelado",
  "Bolo de Cenoura",
  "Bolo de Chocolate",
  "Bolo de Milho",
  "Bolo de Mandioca",
  "Bolo de Coco",
  "Bolo de Laranja",
  "Bolo de Fubá",
  "Bolo de Banana",
];
const sobremesas = [
  "Torta Holandesa",
  "Torta de Limão",
  "Torta de Chocolate",
  "Cheesecake",
  "Pudim",
  "Pudim na Garrafa",
  "Pudim de Mandioca",
  "Pavê",
  "Pavê de Limão",
  "Pavê de Mandioca",
  "Mousse Gourmet",
  "Mousse de Milho",
  "Mousse de Maracujá",
  "Prestígio Gelado",
  "Cocada Gelada",
];
const salgados = [
  "Coxinha",
  "Mini Coxinha",
  "Esfiha",
  "Pastel",
  "Empada",
  "Mini Pizza",
  "Panqueca",
  "Cuscuz Bolonhesa",
  "Marmita",
  "Marmita Fitness",
  "Rap10 Recheado",
  "Espetinho Rap10",
  "Pão Caseiro",
  "Pão de Queijo",
  "Calzone",
];
const bebidas = [
  "Mandioca na Garrafa",
  "Açaí na Garrafa",
  "Chocolate Gelado",
  "Horchata",
  "Suco de Milho",
  "Vitamina de Milho",
  "Café Gelado",
  "Cappuccino",
  "Smoothie",
  "Milk Shake",
];
const junina = [
  "Cocada",
  "Cocada de Cuscuz",
  "Curau",
  "Canjica",
  "Pamonha",
  "Milho Temperado",
  "Milho Gourmet",
  "Espetinho de Milho",
  "Brigadeiro de Paçoca",
  "Pé de Moleque Gourmet",
];
const sazonais = [
  "Ovo de Colher",
  "Ovo no Copo",
  "Ovo na Casquinha",
  "Churrasquinho de Chocolate",
  "Trufa Especial",
  "Bombons",
  "Panetone",
  "Chocotone",
  "Rabanada Gourmet",
  "Biscoitos Decorados",
  "Cestas",
  "Buquê de Morango",
  "Caixa de Doces",
  "Coração Recheado",
];

function slugify(n) {
  return n
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const map = new Map();
function add(list, cat, selo) {
  for (const nome of list) {
    if (map.has(nome)) continue;
    map.set(nome, { nome, slug: slugify(nome), categoria: cat, selo });
  }
}
add(virais, "Oportunidades Virais", "Viral");
add(classicos, "Doces Clássicos", "Venda constante");
add(bolos, "Bolos", "Crescendo");
add(sobremesas, "Sobremesas", "Crescendo");
add(salgados, "Salgados", "Crescendo");
add(bebidas, "Bebidas", "Crescendo");
add(junina, "Festa Junina", "Crescendo");
add(sazonais, "Sazonais", "Crescendo");

const existing = new Set([
  "morango-do-amor",
  "brownie-dubai",
  "copo-da-felicidade",
  "brigadeiro-gourmet",
]);

const catDefaults = {
  "Oportunidades Virais": [90, 380, 70, 10, 2.5, 45, 2, 5, "40-60 unidades", "2 dias sob refrigeracao"],
  "Doces Clássicos": [82, 320, 60, 8, 2.2, 50, 2, 4, "50 unidades", "3-5 dias"],
  Bolos: [80, 280, 90, 45, 18, 90, 2, 4, "1 unidade / 12 fatias", "3 dias sob refrigeracao"],
  Sobremesas: [78, 260, 55, 15, 5, 60, 2, 4, "8-12 porcoes", "3 dias sob refrigeracao"],
  Salgados: [76, 300, 80, 8, 2.8, 70, 2, 4, "30-50 unidades", "Consumir no dia"],
  Bebidas: [74, 220, 40, 12, 3.5, 20, 1, 4, "8-10 garrafas/copos", "1-2 dias sob refrigeracao"],
  "Festa Junina": [85, 350, 65, 8, 2.4, 55, 2, 5, "30-40 unidades", "2-4 dias"],
  Sazonais: [88, 400, 100, 25, 8, 80, 2, 5, "conforme encomenda", "conforme o produto"],
};

function esc(s) {
  return s.replace(/'/g, "''");
}

const rows = [...map.values()].filter((i) => !existing.has(i.slug));
let ordem = 10;
const values = rows.map((i) => {
  const d = catDefaults[i.categoria];
  const line = `('${i.slug}','${esc(i.nome)}','${esc(i.categoria)}','${esc(i.selo)}',${d[0]},${d[1]},${d[2]},${d[3]},${d[4]},${d[5]},${d[6]},${d[7]},'${esc(d[8])}','${esc(d[9])}',${ordem})`;
  ordem += 1;
  return line;
});

const sql = `INSERT INTO public.oportunidades (
  slug, nome, categoria, selo, indice,
  lucro_estimado, investimento, preco_sugerido, custo_unitario,
  tempo_min, dificuldade, demanda, rendimento, validade, ordem,
  criterios, por_que, ingredientes, preparo, compras, como_vender, checklist
)
SELECT
  v.slug, v.nome, v.categoria, v.selo, v.indice,
  v.lucro, v.inv, v.preco, v.custo,
  v.tempo, v.dif, v.dem, v.rendimento, v.validade, v.ordem,
  '[{"nome":"Facilidade de preparo","nota":8},{"nome":"Investimento inicial","nota":8},{"nome":"Margem de lucro","nota":8},{"nome":"Velocidade de producao","nota":7},{"nome":"Potencial de venda","nota":8},{"nome":"Concorrencia","nota":7}]'::jsonb,
  ARRAY['Demanda validada no mercado de renda extra com comida','Ficha de catalogo — precificacao e checklist prontos para planejar','Encaixa no mix de vendas da semana']::text[],
  ARRAY['Lista completa em atualizacao editorial','Ingredientes basicos de mercado','Embalagem adequada ao produto']::text[],
  ARRAY['Separe os ingredientes e higienize a bancada.','Siga o fluxo de producao da ficha completa (em atualizacao).','Embane, resfrie se necessario e embale para venda.']::text[],
  ARRAY['Ingredientes principais','Embalagens','Etiquetas']::text[],
  ARRAY['Anuncie no WhatsApp e Instagram Stories','Ofereca combo ou kit para aumentar ticket','Use foto/video do preparo para gerar desejo']::text[],
  ARRAY['Comprar ingredientes','Produzir','Embalar','Anunciar','Entregar']::text[]
FROM (VALUES
${values.join(",\n")}
) AS v(slug, nome, categoria, selo, indice, lucro, inv, preco, custo, tempo, dif, dem, rendimento, validade, ordem)
ON CONFLICT (slug) DO NOTHING;

UPDATE public.categorias c
SET total = COALESCE(s.cnt, 0), updated_at = now()
FROM (
  SELECT categoria AS nome, COUNT(*)::int AS cnt
  FROM public.oportunidades
  GROUP BY categoria
) s
WHERE c.nome = s.nome;

UPDATE public.categorias
SET total = 0, updated_at = now()
WHERE nome NOT IN (SELECT DISTINCT categoria FROM public.oportunidades);
`;

fs.writeFileSync("scripts/_seed-compact.sql", sql, "utf8");
console.log(JSON.stringify({ bytes: Buffer.byteLength(sql), rows: rows.length }));
