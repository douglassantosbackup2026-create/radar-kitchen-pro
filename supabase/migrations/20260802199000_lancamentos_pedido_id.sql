-- Link lançamentos to pedidos when marking as paid
ALTER TABLE public.lancamentos
  ADD COLUMN IF NOT EXISTS pedido_id uuid REFERENCES public.pedidos(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS lancamentos_pedido_id_unique
  ON public.lancamentos (pedido_id)
  WHERE pedido_id IS NOT NULL;
