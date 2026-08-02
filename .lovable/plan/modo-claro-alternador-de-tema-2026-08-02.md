# Modo claro + alternador de tema

Hoje o app é 100% escuro: as cores em `:root` já são a versão dark e não existe paleta clara nem botão de troca. O plano é criar um tema claro premium (off white + preto + dourado) e um botão para alternar, mantendo o escuro como padrão.

## O que será feito

1. **Paleta clara**: criar um conjunto de cores claro (fundo off white, texto quase preto, cartões brancos, dourado como destaque, verde de sucesso ajustado para bom contraste em fundo claro), preservando a identidade da marca.
2. **Inversão da lógica de tema**: as cores atuais (escuras) passam a valer quando a classe `dark` está no `<html>`; o claro vira o conjunto base. O padrão continua escuro.
3. **Botão de alternância**: ícone sol/lua no topo da barra lateral do `/app` e no cabeçalho da landing page, com rótulo acessível.
4. **Persistência**: a escolha fica salva no navegador e é reaplicada nas próximas visitas, sem piscar tema errado ao carregar.
5. **Revisão visual**: conferir landing, dashboard, oportunidades, calculadoras, financeiro (gráfico) e tabelas no tema claro, ajustando pontos onde o contraste ficar fraco.

## Detalhes técnicos

- `src/styles.css`: mover os valores atuais de `:root` para um bloco `.dark`; definir os novos valores claros em `:root`. O `@custom-variant dark` já existe e continua válido.
- Novo `src/components/ThemeToggle.tsx` + um pequeno provider/hook (`src/lib/theme.ts`) usando `localStorage` (`chave: fv-theme`) e `document.documentElement.classList`.
- Script inline no `<head>` de `src/routes/__root.tsx` aplicando a classe antes da hidratação, evitando flash; leitura do storage só no cliente para não quebrar o SSR.
- Componentes que usam cor fixa (ex.: gráfico do financeiro, `gold-grid`) passam a usar tokens semânticos onde necessário.
