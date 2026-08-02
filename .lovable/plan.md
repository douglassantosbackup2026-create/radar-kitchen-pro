# Faça & Venda PRO — Landing (TSL) + Protótipo do app

Duas entregas nesta fase, sem backend: a página de vendas em `/` e um protótipo navegável do produto em `/app`. Login, banco e assinatura ficam para quando o Lovable Cloud for liberado.

## Identidade visual

Clube premium de oportunidades — não "ebook de receitas". Referências de sobriedade: Linear, Stripe, TradingView.

- Fundo `#111111`, cards `#1B1B1B`, branco `#F8F8F8`, cinza `#C7C7C7`
- Dourado `#D4AF37` (hover `#C99A1A`) reservado a oportunidades, lucro e selos — nunca em botão principal
- Verde `#22C55E` como cor de ação (todos os CTAs)
- Tipografia display forte + sans neutra no corpo, muito espaço em branco, cantos suaves, movimento contido

## Página de vendas (`/`)

Estrutura de TSL, na ordem:

1. Hero — "Descubra hoje o que vender amanhã." + subheadline + CTA verde + prova social; visual do Hero é o card **Oportunidade do Dia** (Morango do Amor, demanda, lucro R$380, investimento R$72), não um dashboard
2. A dor — o carrossel infinito de vídeos do YouTube
3. A verdade — o problema não é receita, é saber o que vale a pena hoje
4. A nova oportunidade — apresentação do Faça & Venda PRO
5. O mecanismo — **Radar Faça & Venda™** em destaque, com nome e explicação
6. O que você encontra todos os dias — cards (Oportunidade do Dia, Tendências, Calendário, Mais Vendidas, Novidades)
7. Mockup "Bom dia" no celular — recomendação do dia
8. Cada receita já vem pronta para vender — mockup da página de receita
9. Precificação — calculadora interativa de verdade (muda ingrediente, muda preço e lucro na hora)
10. Sua cozinha como um negócio — mockups de agenda, pedidos, clientes, financeiro
11. Novas oportunidades toda semana — linha do tempo (semana passada / essa / próxima)
12. Índice de Oportunidade — pontuação 0–100 com critérios, em destaque dourado
13. Tudo que está incluso — grid estilo Netflix, sem lista
14. Planos — Mensal R$47 / Anual R$297
15. Garantia de 7 dias + FAQ (8 perguntas) + CTA final

## Protótipo do app (`/app`)

Navegação lateral com os módulos, dados de exemplo:

- Início — saudação, Oportunidade do Dia, Receita da Semana, atalhos
- Oportunidades — grid de cards com selos (Explodindo, Viral, Crescendo) e Índice de Oportunidade
- Detalhe da receita — foto, ingredientes, modo de preparo, custo, preço sugerido, lucro, margem, tempo, rendimento, checklist, "Adicionar ao plano da semana"
- Tendências, Calendário Comercial (Agosto→Dezembro), Biblioteca por categoria
- Calculadoras — precificação, simulador de meta ("quero ganhar R$5.000"), simulador de investimento; todas funcionais no cliente
- Produção, Compras, Pedidos, Clientes, Financeiro, Favoritos, Desafios — telas simples com dados de exemplo

Botões de assinatura levam a uma tela de "em breve" enquanto não há pagamento.

## Detalhes técnicos

- Tokens da paleta em `src/styles.css` (oklch) com semânticos `--gold`, `--success`; tema escuro como padrão
- Fontes carregadas via `<link>` em `src/routes/__root.tsx`
- Rotas TanStack: `/` (landing), `/app` (layout com sidebar) e rotas filhas por módulo; `head()` próprio em cada rota
- Dados de exemplo em `src/data/*.ts` — mesma forma que as tabelas terão depois, para a migração ao Cloud ser direta
- Calculadoras e checklists com estado local (`useState`); nada persiste ainda
- Imagens das receitas geradas para o projeto

## Depois (quando o Cloud for liberado)

Autenticação, perfis, dados reais por usuária, assinatura e o Radar alimentado por curadoria no banco.
