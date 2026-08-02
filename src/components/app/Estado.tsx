export function Carregando({ texto = "Carregando..." }: { texto?: string }) {
  return <p className="py-10 text-center text-sm text-muted-foreground">{texto}</p>;
}

export function Erro({ texto = "Não conseguimos carregar os dados agora." }: { texto?: string }) {
  return <p className="py-10 text-center text-sm text-destructive">{texto}</p>;
}

export function Vazio({ texto = "Nada por aqui ainda." }: { texto?: string }) {
  return <p className="py-6 text-center text-sm text-muted-foreground">{texto}</p>;
}
