-- compras_detalhe on oportunidades
ALTER TABLE public.oportunidades
  ADD COLUMN IF NOT EXISTS compras_detalhe jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Backfill: split total cost evenly across compras items
UPDATE public.oportunidades o
SET compras_detalhe = sub.detalhe
FROM (
  SELECT
    id,
    CASE
      WHEN compras IS NULL OR cardinality(compras) = 0 THEN '[]'::jsonb
      ELSE (
        SELECT jsonb_agg(
          jsonb_build_object(
            'nome', item,
            'custo', round((
              (custo_unitario * COALESCE(NULLIF(regexp_replace(rendimento, '\D', '', 'g'), '')::numeric, 24))
              / cardinality(compras)
            )::numeric, 2)
          )
          ORDER BY ord
        )
        FROM unnest(compras) WITH ORDINALITY AS u(item, ord)
      )
    END AS detalhe
  FROM public.oportunidades
) sub
WHERE o.id = sub.id
  AND (o.compras_detalhe = '[]'::jsonb OR o.compras_detalhe IS NULL);

-- Fix last-item rounding drift: leave as even split (good enough for prototype)

-- favoritos table
CREATE TABLE IF NOT EXISTS public.favoritos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  oportunidade_slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.favoritos TO anon, authenticated;
GRANT ALL ON public.favoritos TO service_role;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Protótipo: favoritos abertos" ON public.favoritos;
CREATE POLICY "Protótipo: favoritos abertos" ON public.favoritos
  FOR ALL USING (true) WITH CHECK (true);

-- Seed 2 favoritos
INSERT INTO public.favoritos (oportunidade_slug)
VALUES ('morango-do-amor'), ('brownie-dubai')
ON CONFLICT (oportunidade_slug) DO NOTHING;;
