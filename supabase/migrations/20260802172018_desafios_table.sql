CREATE TABLE IF NOT EXISTS public.desafios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  meta numeric NOT NULL DEFAULT 0,
  medalha text NOT NULL DEFAULT '',
  tipo text NOT NULL DEFAULT 'qtd_produto',
  produto_match text NOT NULL DEFAULT '',
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.desafios TO anon, authenticated;
GRANT ALL ON public.desafios TO service_role;
ALTER TABLE public.desafios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Protótipo: desafios abertos" ON public.desafios;
CREATE POLICY "Protótipo: desafios abertos" ON public.desafios
  FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.desafios (titulo, meta, medalha, tipo, produto_match, ordem)
SELECT * FROM (VALUES
  ('Venda 20 brownies', 20::numeric, '🥉 Bronze', 'qtd_produto', 'Brownie', 1),
  ('Venda 100 brigadeiros', 100::numeric, '🥈 Prata', 'qtd_produto', 'Brigadeiro', 2),
  ('Fature R$3.000 no mês', 3000::numeric, '🥇 Ouro', 'faturamento', '', 3)
) AS v(titulo, meta, medalha, tipo, produto_match, ordem)
WHERE NOT EXISTS (SELECT 1 FROM public.desafios LIMIT 1);;
