DROP POLICY IF EXISTS "Protótipo: oportunidades update" ON public.oportunidades;
CREATE POLICY "Protótipo: oportunidades update" ON public.oportunidades
  FOR UPDATE TO anon, authenticated
  USING (true) WITH CHECK (true);;
