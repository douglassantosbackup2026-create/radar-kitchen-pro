ALTER TABLE public.oportunidades
  ADD COLUMN IF NOT EXISTS imagem_url text;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('receitas', 'receitas', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Receitas public read" ON storage.objects;
CREATE POLICY "Receitas public read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'receitas');

DROP POLICY IF EXISTS "Receitas proto upload" ON storage.objects;
CREATE POLICY "Receitas proto upload" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'receitas');

DROP POLICY IF EXISTS "Receitas proto update" ON storage.objects;
CREATE POLICY "Receitas proto update" ON storage.objects
  FOR UPDATE TO anon, authenticated
  USING (bucket_id = 'receitas')
  WITH CHECK (bucket_id = 'receitas');

DROP POLICY IF EXISTS "Receitas proto delete" ON storage.objects;
CREATE POLICY "Receitas proto delete" ON storage.objects
  FOR DELETE TO anon, authenticated
  USING (bucket_id = 'receitas');;
