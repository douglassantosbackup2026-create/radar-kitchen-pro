-- Add qtd/unidade to each compras_detalhe item; then set coherent units for known products
UPDATE public.oportunidades
SET compras_detalhe = (
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'nome', elem->>'nome',
      'qtd', COALESCE((elem->>'qtd')::numeric, 1),
      'unidade', COALESCE(elem->>'unidade', 'un'),
      'custo', COALESCE((elem->>'custo')::numeric, 0)
    )
  ), '[]'::jsonb)
  FROM jsonb_array_elements(compras_detalhe) AS elem
);

UPDATE public.oportunidades SET compras_detalhe = '[{"nome":"Morango","qtd":1,"unidade":"kg","custo":23},{"nome":"Açúcar cristal","qtd":500,"unidade":"g","custo":23},{"nome":"Chocolate branco","qtd":200,"unidade":"g","custo":23},{"nome":"Leite condensado","qtd":1,"unidade":"lata","custo":23},{"nome":"Palitos","qtd":60,"unidade":"un","custo":23},{"nome":"Forminhas","qtd":60,"unidade":"un","custo":23}]'::jsonb WHERE slug = 'morango-do-amor';

UPDATE public.oportunidades SET compras_detalhe = '[{"nome":"Chocolate meio amargo","qtd":300,"unidade":"g","custo":21.6},{"nome":"Manteiga","qtd":200,"unidade":"g","custo":21.6},{"nome":"Ovos","qtd":4,"unidade":"un","custo":21.6},{"nome":"Creme de pistache","qtd":150,"unidade":"g","custo":21.6},{"nome":"Massa kadaif","qtd":100,"unidade":"g","custo":21.6},{"nome":"Embalagem","qtd":24,"unidade":"un","custo":21.6}]'::jsonb WHERE slug = 'brownie-dubai';

UPDATE public.oportunidades SET compras_detalhe = '[{"nome":"Morango","qtd":500,"unidade":"g","custo":27.6},{"nome":"Leite condensado","qtd":1,"unidade":"lata","custo":27.6},{"nome":"Creme de leite","qtd":2,"unidade":"cx","custo":27.6},{"nome":"Chocolate","qtd":200,"unidade":"g","custo":27.6},{"nome":"Copos 300 ml","qtd":20,"unidade":"un","custo":27.6}]'::jsonb WHERE slug = 'copo-da-felicidade';

UPDATE public.oportunidades SET compras_detalhe = '[{"nome":"Leite condensado","qtd":2,"unidade":"lata","custo":22},{"nome":"Chocolate nobre","qtd":400,"unidade":"g","custo":22},{"nome":"Manteiga","qtd":50,"unidade":"g","custo":22},{"nome":"Granulado belga","qtd":150,"unidade":"g","custo":22},{"nome":"Forminhas","qtd":100,"unidade":"un","custo":22}]'::jsonb WHERE slug = 'brigadeiro-gourmet';;
