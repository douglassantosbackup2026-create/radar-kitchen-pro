export function Pagina({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{titulo}</h1>
        {descricao && <p className="mt-2 text-muted-foreground">{descricao}</p>}
      </header>
      {children}
    </>
  );
}

export function Painel({
  titulo,
  children,
  className = "",
}: {
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      {titulo && (
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">{titulo}</h2>
      )}
      {children}
    </section>
  );
}
