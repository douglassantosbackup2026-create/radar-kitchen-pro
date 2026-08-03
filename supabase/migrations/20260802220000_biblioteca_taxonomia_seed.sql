-- Biblioteca: nova taxonomia + seed de catálogo
-- Fichas novas usam template curto; as 4 ricas existentes só mudam de categoria.

-- 1) Categorias
DELETE FROM public.categorias;

INSERT INTO public.categorias (nome, icone, total, ordem) VALUES
  ('Oportunidades Virais', '🔥', 0, 1),
  ('Doces Clássicos', '🍫', 0, 2),
  ('Bolos', '🎂', 0, 3),
  ('Sobremesas', '🍮', 0, 4),
  ('Salgados', '🥟', 0, 5),
  ('Bebidas', '🥤', 0, 6),
  ('Festa Junina', '🌽', 0, 7),
  ('Sazonais', '🥚', 0, 8);

-- 2) Remapear as 4 fichas existentes
UPDATE public.oportunidades SET categoria = 'Oportunidades Virais', updated_at = now()
WHERE slug = 'morango-do-amor';
UPDATE public.oportunidades SET categoria = 'Doces Clássicos', selo = 'Viral', updated_at = now()
WHERE slug = 'brownie-dubai';
UPDATE public.oportunidades SET categoria = 'Doces Clássicos', updated_at = now()
WHERE slug = 'copo-da-felicidade';
UPDATE public.oportunidades SET categoria = 'Doces Clássicos', updated_at = now()
WHERE slug = 'brigadeiro-gourmet';


-- 3+4) Seed compacto + totais
INSERT INTO public.oportunidades (
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
('x-bolo','X-Bolo','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',10),
('mandioca-na-garrafa','Mandioca na Garrafa','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',11),
('tapioca-gourmet','Tapioca Gourmet','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',12),
('ninho-queimado','Ninho Queimado','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',13),
('coco-com-nutella','Coco com Nutella','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',14),
('chocolate-na-garrafa','Chocolate na Garrafa','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',15),
('mousse-de-milho','Mousse de Milho','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',16),
('cuscuz-bolonhesa','Cuscuz Bolonhesa','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',17),
('arroz-na-garrafa','Arroz na Garrafa','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',18),
('horchata','Horchata','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',19),
('banana-tang','Banana + Tang','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',20),
('abacate-tang','Abacate + Tang','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',21),
('geladao-de-oreo','Geladão de Oreo','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',22),
('prestigio-gelado','Prestígio Gelado','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',23),
('pave-de-limao','Pavê de Limão','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',24),
('nuvem-de-ninho','Nuvem de Ninho','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',25),
('ratatouille-na-bandeja','Ratatouille na Bandeja','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',26),
('maria-mole-gourmet','Maria Mole Gourmet','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',27),
('cuscuz-doce','Cuscuz Doce','Oportunidades Virais','Viral',90,380,70,10,2.5,45,2,5,'40-60 unidades','2 dias sob refrigeracao',28),
('trufa','Trufa','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',29),
('cone-trufado','Cone Trufado','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',30),
('brigadeiro-de-pacoca','Brigadeiro de Paçoca','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',31),
('brigadeiro-de-pistache','Brigadeiro de Pistache','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',32),
('brownie','Brownie','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',33),
('palha-italiana','Palha Italiana','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',34),
('bombom','Bombom','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',35),
('alfajor','Alfajor','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',36),
('pao-de-mel','Pão de Mel','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',37),
('suspiro','Suspiro','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',38),
('pirulito-de-cristal','Pirulito de Cristal','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',39),
('banoffee','Banoffee','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',40),
('churros-no-copo','Churros no Copo','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',41),
('mini-donuts','Mini Donuts','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',42),
('donuts','Donuts','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',43),
('gelatina-trufada','Gelatina Trufada','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',44),
('geladinho-gourmet','Geladinho Gourmet','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',45),
('geladinho-com-casquinha','Geladinho com Casquinha','Doces Clássicos','Venda constante',82,320,60,8,2.2,50,2,4,'50 unidades','3-5 dias',46),
('bolo-no-pote','Bolo no Pote','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',47),
('bolo-vulcao','Bolo Vulcão','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',48),
('bolo-tsunami','Bolo Tsunami','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',49),
('box-cake','Box Cake','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',50),
('bolo-em-fatia','Bolo em Fatia','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',51),
('bolo-gelado','Bolo Gelado','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',52),
('bolo-de-cenoura','Bolo de Cenoura','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',53),
('bolo-de-chocolate','Bolo de Chocolate','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',54),
('bolo-de-milho','Bolo de Milho','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',55),
('bolo-de-mandioca','Bolo de Mandioca','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',56),
('bolo-de-coco','Bolo de Coco','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',57),
('bolo-de-laranja','Bolo de Laranja','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',58),
('bolo-de-fuba','Bolo de Fubá','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',59),
('bolo-de-banana','Bolo de Banana','Bolos','Crescendo',80,280,90,45,18,90,2,4,'1 unidade / 12 fatias','3 dias sob refrigeracao',60),
('torta-holandesa','Torta Holandesa','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',61),
('torta-de-limao','Torta de Limão','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',62),
('torta-de-chocolate','Torta de Chocolate','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',63),
('cheesecake','Cheesecake','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',64),
('pudim','Pudim','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',65),
('pudim-na-garrafa','Pudim na Garrafa','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',66),
('pudim-de-mandioca','Pudim de Mandioca','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',67),
('pave','Pavê','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',68),
('pave-de-mandioca','Pavê de Mandioca','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',69),
('mousse-gourmet','Mousse Gourmet','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',70),
('mousse-de-maracuja','Mousse de Maracujá','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',71),
('cocada-gelada','Cocada Gelada','Sobremesas','Crescendo',78,260,55,15,5,60,2,4,'8-12 porcoes','3 dias sob refrigeracao',72),
('coxinha','Coxinha','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',73),
('mini-coxinha','Mini Coxinha','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',74),
('esfiha','Esfiha','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',75),
('pastel','Pastel','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',76),
('empada','Empada','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',77),
('mini-pizza','Mini Pizza','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',78),
('panqueca','Panqueca','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',79),
('marmita','Marmita','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',80),
('marmita-fitness','Marmita Fitness','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',81),
('rap10-recheado','Rap10 Recheado','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',82),
('espetinho-rap10','Espetinho Rap10','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',83),
('pao-caseiro','Pão Caseiro','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',84),
('pao-de-queijo','Pão de Queijo','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',85),
('calzone','Calzone','Salgados','Crescendo',76,300,80,8,2.8,70,2,4,'30-50 unidades','Consumir no dia',86),
('acai-na-garrafa','Açaí na Garrafa','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',87),
('chocolate-gelado','Chocolate Gelado','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',88),
('suco-de-milho','Suco de Milho','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',89),
('vitamina-de-milho','Vitamina de Milho','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',90),
('cafe-gelado','Café Gelado','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',91),
('cappuccino','Cappuccino','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',92),
('smoothie','Smoothie','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',93),
('milk-shake','Milk Shake','Bebidas','Crescendo',74,220,40,12,3.5,20,1,4,'8-10 garrafas/copos','1-2 dias sob refrigeracao',94),
('cocada','Cocada','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',95),
('cocada-de-cuscuz','Cocada de Cuscuz','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',96),
('curau','Curau','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',97),
('canjica','Canjica','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',98),
('pamonha','Pamonha','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',99),
('milho-temperado','Milho Temperado','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',100),
('milho-gourmet','Milho Gourmet','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',101),
('espetinho-de-milho','Espetinho de Milho','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',102),
('pe-de-moleque-gourmet','Pé de Moleque Gourmet','Festa Junina','Crescendo',85,350,65,8,2.4,55,2,5,'30-40 unidades','2-4 dias',103),
('ovo-de-colher','Ovo de Colher','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',104),
('ovo-no-copo','Ovo no Copo','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',105),
('ovo-na-casquinha','Ovo na Casquinha','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',106),
('churrasquinho-de-chocolate','Churrasquinho de Chocolate','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',107),
('trufa-especial','Trufa Especial','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',108),
('bombons','Bombons','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',109),
('panetone','Panetone','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',110),
('chocotone','Chocotone','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',111),
('rabanada-gourmet','Rabanada Gourmet','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',112),
('biscoitos-decorados','Biscoitos Decorados','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',113),
('cestas','Cestas','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',114),
('buque-de-morango','Buquê de Morango','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',115),
('caixa-de-doces','Caixa de Doces','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',116),
('coracao-recheado','Coração Recheado','Sazonais','Crescendo',88,400,100,25,8,80,2,5,'conforme encomenda','conforme o produto',117)
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
