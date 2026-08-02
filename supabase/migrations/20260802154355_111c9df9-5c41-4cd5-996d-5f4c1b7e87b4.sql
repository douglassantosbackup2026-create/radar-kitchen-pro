-- =========================
-- CATÁLOGO (leitura pública)
-- =========================
CREATE TABLE public.oportunidades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  nome text NOT NULL,
  categoria text NOT NULL DEFAULT 'Doces',
  selo text NOT NULL DEFAULT 'Crescendo',
  indice integer NOT NULL DEFAULT 0,
  criterios jsonb NOT NULL DEFAULT '[]'::jsonb,
  lucro_estimado numeric NOT NULL DEFAULT 0,
  investimento numeric NOT NULL DEFAULT 0,
  preco_sugerido numeric NOT NULL DEFAULT 0,
  custo_unitario numeric NOT NULL DEFAULT 0,
  tempo_min integer NOT NULL DEFAULT 0,
  dificuldade integer NOT NULL DEFAULT 1,
  demanda integer NOT NULL DEFAULT 3,
  rendimento text NOT NULL DEFAULT '',
  validade text NOT NULL DEFAULT '',
  por_que text[] NOT NULL DEFAULT '{}',
  ingredientes text[] NOT NULL DEFAULT '{}',
  preparo text[] NOT NULL DEFAULT '{}',
  compras text[] NOT NULL DEFAULT '{}',
  como_vender text[] NOT NULL DEFAULT '{}',
  checklist text[] NOT NULL DEFAULT '{}',
  destaque_do_dia boolean NOT NULL DEFAULT false,
  receita_da_semana boolean NOT NULL DEFAULT false,
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.oportunidades TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.oportunidades TO authenticated;
GRANT ALL ON public.oportunidades TO service_role;
ALTER TABLE public.oportunidades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Catálogo é público" ON public.oportunidades FOR SELECT USING (true);

CREATE TABLE public.tendencias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  selo text NOT NULL DEFAULT 'Crescendo',
  nota text NOT NULL DEFAULT '',
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tendencias TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tendencias TO authenticated;
GRANT ALL ON public.tendencias TO service_role;
ALTER TABLE public.tendencias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tendências são públicas" ON public.tendencias FOR SELECT USING (true);

CREATE TABLE public.datas_comemorativas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mes text NOT NULL,
  data text NOT NULL,
  itens text[] NOT NULL DEFAULT '{}',
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.datas_comemorativas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.datas_comemorativas TO authenticated;
GRANT ALL ON public.datas_comemorativas TO service_role;
ALTER TABLE public.datas_comemorativas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Calendário é público" ON public.datas_comemorativas FOR SELECT USING (true);

CREATE TABLE public.categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL UNIQUE,
  icone text NOT NULL DEFAULT '🍽️',
  total integer NOT NULL DEFAULT 0,
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categorias TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categorias TO authenticated;
GRANT ALL ON public.categorias TO service_role;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categorias são públicas" ON public.categorias FOR SELECT USING (true);

-- =========================
-- GESTÃO (protótipo aberto até o login existir)
-- =========================
CREATE TABLE public.clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  telefone text NOT NULL DEFAULT '',
  favorito text NOT NULL DEFAULT '',
  comprou text NOT NULL DEFAULT '',
  ultimo_pedido numeric NOT NULL DEFAULT 0,
  aniversario text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clientes TO anon, authenticated;
GRANT ALL ON public.clientes TO service_role;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Protótipo: clientes abertos" ON public.clientes FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.pedidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente text NOT NULL,
  produto text NOT NULL,
  qtd integer NOT NULL DEFAULT 1,
  valor numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Pendente',
  pago boolean NOT NULL DEFAULT false,
  entrega date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pedidos TO anon, authenticated;
GRANT ALL ON public.pedidos TO service_role;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Protótipo: pedidos abertos" ON public.pedidos FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.tarefas_producao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  feito boolean NOT NULL DEFAULT false,
  dia date NOT NULL DEFAULT current_date,
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tarefas_producao TO anon, authenticated;
GRANT ALL ON public.tarefas_producao TO service_role;
ALTER TABLE public.tarefas_producao ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Protótipo: produção aberta" ON public.tarefas_producao FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.itens_compra (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item text NOT NULL,
  qtd text NOT NULL DEFAULT '',
  comprado boolean NOT NULL DEFAULT false,
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.itens_compra TO anon, authenticated;
GRANT ALL ON public.itens_compra TO service_role;
ALTER TABLE public.itens_compra ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Protótipo: compras abertas" ON public.itens_compra FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.lancamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo text NOT NULL DEFAULT 'entrada',
  descricao text NOT NULL DEFAULT '',
  valor numeric NOT NULL DEFAULT 0,
  produto text NOT NULL DEFAULT '',
  dia date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lancamentos TO anon, authenticated;
GRANT ALL ON public.lancamentos TO service_role;
ALTER TABLE public.lancamentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Protótipo: financeiro aberto" ON public.lancamentos FOR ALL USING (true) WITH CHECK (true);

-- =========================
-- updated_at
-- =========================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_oportunidades_updated BEFORE UPDATE ON public.oportunidades FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_tendencias_updated BEFORE UPDATE ON public.tendencias FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_datas_updated BEFORE UPDATE ON public.datas_comemorativas FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_categorias_updated BEFORE UPDATE ON public.categorias FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_clientes_updated BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_pedidos_updated BEFORE UPDATE ON public.pedidos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_tarefas_updated BEFORE UPDATE ON public.tarefas_producao FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_itens_updated BEFORE UPDATE ON public.itens_compra FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_lancamentos_updated BEFORE UPDATE ON public.lancamentos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- DADOS INICIAIS
-- =========================
INSERT INTO public.oportunidades (slug, nome, categoria, selo, indice, criterios, lucro_estimado, investimento, preco_sugerido, custo_unitario, tempo_min, dificuldade, demanda, rendimento, validade, por_que, ingredientes, preparo, compras, como_vender, checklist, destaque_do_dia, receita_da_semana, ordem) VALUES
('morango-do-amor','Morango do Amor','Doces','Explodindo',93,
 '[{"nome":"Facilidade de preparo","nota":9},{"nome":"Investimento inicial","nota":10},{"nome":"Margem de lucro","nota":9},{"nome":"Velocidade de produção","nota":8},{"nome":"Potencial de venda","nota":10},{"nome":"Concorrência","nota":7}]'::jsonb,
 420,85,8,2.3,50,2,5,'60 unidades','2 dias sob refrigeração',
 ARRAY['Procura explodindo nas redes','Investimento baixíssimo','Margem acima de 70%','Visual perfeito para Instagram'],
 ARRAY['1 kg de morango fresco','500 g de açúcar cristal','200 g de chocolate branco','1 lata de leite condensado','Corante vermelho','Palitos e forminhas'],
 ARRAY['Lave e seque muito bem os morangos.','Faça o brigadeiro branco e deixe amornar.','Envolva cada morango no brigadeiro e leve à geladeira.','Prepare a calda de açúcar até o ponto de vidro.','Banhe os morangos na calda e coloque sobre papel manteiga.'],
 ARRAY['Morango','Açúcar cristal','Chocolate branco','Leite condensado','Palitos','Forminhas'],
 ARRAY['Venda por encomenda com 1 dia de antecedência','Combo de 6 unidades por R$45','Poste vídeo do banho de calda — é o que mais vende'],
 ARRAY['Comprar ingredientes','Higienizar morangos','Preparar brigadeiro','Banhar','Embalar','Entregar'],
 true,false,1),
('brownie-dubai','Brownie Dubai','Doces','Viral',91,
 '[{"nome":"Facilidade de preparo","nota":8},{"nome":"Investimento inicial","nota":8},{"nome":"Margem de lucro","nota":10},{"nome":"Velocidade de produção","nota":9},{"nome":"Potencial de venda","nota":10},{"nome":"Concorrência","nota":8}]'::jsonb,
 380,120,18,5.4,60,2,5,'24 unidades','5 dias',
 ARRAY['Alta procura','Fácil','Alta margem','Excelente para Instagram'],
 ARRAY['300 g de chocolate meio amargo','200 g de manteiga','4 ovos','300 g de açúcar','180 g de farinha','Creme de pistache','Massa kadaif'],
 ARRAY['Derreta o chocolate com a manteiga.','Bata os ovos com o açúcar e incorpore.','Adicione a farinha e leve ao forno por 25 min.','Toste o kadaif e misture ao creme de pistache.','Recheie e finalize com chocolate por cima.'],
 ARRAY['Chocolate meio amargo','Manteiga','Ovos','Creme de pistache','Massa kadaif','Embalagem'],
 ARRAY['Fatia individual R$18','Caixa com 6 por R$95','Ofereça degustação para lojas do bairro'],
 ARRAY['Comprar ingredientes','Assar massa','Preparar recheio','Montar','Cortar e embalar','Entregar'],
 false,true,2),
('copo-da-felicidade','Copo da Felicidade','Doces','Crescendo',87,
 '[{"nome":"Facilidade de preparo","nota":10},{"nome":"Investimento inicial","nota":9},{"nome":"Margem de lucro","nota":8},{"nome":"Velocidade de produção","nota":9},{"nome":"Potencial de venda","nota":9},{"nome":"Concorrência","nota":6}]'::jsonb,
 310,95,15,4.6,40,1,4,'30 copos','3 dias sob refrigeração',
 ARRAY['Montagem rápida','Ótimo ticket médio','Vende muito no calor'],
 ARRAY['1 kg de morango','2 latas de leite condensado','500 ml de creme de leite','Chocolate ao leite','Copos de 300 ml'],
 ARRAY['Prepare o creme com leite condensado e creme de leite.','Derreta o chocolate e forre os copos.','Monte camadas alternando creme, morango e chocolate.','Gele por 2 horas antes de vender.'],
 ARRAY['Morango','Leite condensado','Creme de leite','Chocolate','Copos 300 ml'],
 ARRAY['Venda em pontos de grande circulação','Leve 3 pague 2 no fim de semana'],
 ARRAY['Comprar ingredientes','Preparar creme','Montar copos','Gelar','Vender'],
 false,false,3),
('brigadeiro-gourmet','Brigadeiro Gourmet','Doces','Venda constante',84,
 '[{"nome":"Facilidade de preparo","nota":10},{"nome":"Investimento inicial","nota":10},{"nome":"Margem de lucro","nota":8},{"nome":"Velocidade de produção","nota":8},{"nome":"Potencial de venda","nota":8},{"nome":"Concorrência","nota":5}]'::jsonb,
 240,60,3.5,1.1,45,1,4,'100 unidades','5 dias',
 ARRAY['Vende o ano inteiro','Base para festas e encomendas','Custo por unidade muito baixo'],
 ARRAY['4 latas de leite condensado','200 g de chocolate nobre','100 g de manteiga','Granulado belga'],
 ARRAY['Cozinhe o leite condensado com chocolate e manteiga.','Deixe esfriar completamente.','Enrole e passe no granulado.'],
 ARRAY['Leite condensado','Chocolate nobre','Manteiga','Granulado belga','Forminhas'],
 ARRAY['Cento por R$280','Caixa com 12 por R$45','Ofereça para festas de aniversário do bairro'],
 ARRAY['Comprar ingredientes','Cozinhar massa','Esfriar','Enrolar','Embalar','Entregar'],
 false,false,4);

INSERT INTO public.tendencias (nome, selo, nota, ordem) VALUES
('Brownie Dubai','Viral','Procura triplicou em 3 semanas',1),
('Mandioca na Garrafa','Explodindo','Alta procura em feiras e eventos',2),
('Copo da Felicidade','Crescendo','Vende muito no calor',3),
('Brigadeiro Gourmet','Venda constante','Base de qualquer encomenda',4);

INSERT INTO public.datas_comemorativas (mes, data, itens, ordem) VALUES
('Agosto','Dia dos Pais',ARRAY['Brownie','Caixa Premium','Bolo'],1),
('Outubro','Dia das Crianças',ARRAY['Pirulito','Brigadeiro','Maçã do Amor'],2),
('Novembro','Black Friday',ARRAY['Combos','Caixas fechadas'],3),
('Dezembro','Natal',ARRAY['Panetone','Rabanada','Cestas'],4);

INSERT INTO public.categorias (nome, icone, total, ordem) VALUES
('Bolos','🍰',42,1),('Pudins','🍮',18,2),('Bebidas','🥤',24,3),('Doces','🍫',63,4),
('Salgados','🥧',37,5),('Marmitas','🍛',29,6),('Café','🍞',21,7),('Biscoitos','🍪',16,8);

INSERT INTO public.clientes (nome, telefone, favorito, comprou, ultimo_pedido, aniversario) VALUES
('Maria','(11) 98888-1122','Pudim','Brownie',60,'14/09'),
('Joana','(11) 97777-3344','Brownie','Copo da Felicidade',300,'02/12'),
('Carla','(11) 96666-5566','Morango do Amor','Morango do Amor',240,'23/08');

INSERT INTO public.pedidos (cliente, produto, qtd, valor, status, pago) VALUES
('Maria','Brownie',12,216,'Entregue',true),
('Joana','Copo da Felicidade',20,300,'Em produção',true),
('Carla','Morango do Amor',30,240,'Pendente',false),
('Rita','Brigadeiro Gourmet',100,350,'Confirmado',false);

INSERT INTO public.tarefas_producao (titulo, ordem) VALUES
('Fazer Brownie',1),('Fazer Pudim',2),('Comprar Leite',3),('Embalar',4),('Entregar',5);

INSERT INTO public.itens_compra (item, qtd, ordem) VALUES
('Chocolate meio amargo','1 kg',1),
('Leite condensado','6 latas',2),
('Manteiga','500 g',3),
('Morango','2 kg',4),
('Embalagem','50 un',5);

INSERT INTO public.lancamentos (tipo, descricao, valor, produto) VALUES
('entrada','Venda de brownies',320,'Brownie Dubai'),
('saida','Compra de ingredientes',85,'');