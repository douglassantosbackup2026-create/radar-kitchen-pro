# Landing `/` remodelada no formato TSL (referência Caseirinhos Saudáveis)

Reescrever a página de vendas seguindo a estrutura de copy da LP concorrente, mas com a oferta e a identidade do Faça & Venda PRO (preto/dourado/off-white, Sora + Manrope). O app `/` continua sendo a única rota alterada — nada muda no `/app` nem no backend.

## Nova estrutura da página, na ordem

1. **Hero com promessa direta** — "Qualquer pessoa pode descobrir hoje o que vender amanhã e faturar na cozinha ainda essa semana." + subheadline com a prova ("mulheres que nunca venderam nada estão faturando com as receitas que estão em alta hoje").
2. **Bloco "assista e aprenda 4 coisas"** — lista numerada 1–4 com as quatro promessas de conteúdo (por que o Google só devolve receita velha; como saber o que vende hoje; por que preço no achismo mata o lucro; por que copiar viral atrasado é furada). Área de vídeo/aula introdutória com placeholder.
3. **Barra de confiança** — Garantia 7 dias · Acesso imediato · Compra 100% segura · +X alunas.
4. **"Pouco esforço para vender"** — argumento de degustação/prova, com grade de fotos das receitas.
5. **Faixa deslizante (marquee)** — "Receitas que estão vendendo hoje •" repetida.
6. **Histórias de alunas** — 4 a 5 blocos alternando foto/vídeo-placeholder e texto no mesmo tom narrativo da referência (nomes e cidades fictícios, claramente ilustrativos).
7. **Autoridade** — bloco de credibilidade do Radar Faça & Venda™ (o mecanismo) no lugar do prêmio de TV.
8. **Variedade de conteúdo** — grade de receitas com foto + três colunas de listas: Clássicos / Premium / Atualizações mensais.
9. **Coberturas/extras** — grade de recursos exclusivos (Índice de Oportunidade, Calendário Lucrativo, Tendências).
10. **"Por que funciona"** — os dois pilares do método (curadoria diária de demanda real + precificação com margem real).
11. **Plano em 4 passos** — Receita → Precificação → Cardápio pronto → Canal de venda, cada um numerado como na referência.
12. **Bônus** — 2 blocos de bônus com preço riscado ("De R$X · Por R$0").
13. **"O que você recebe"** — tabela de itens com valores individuais, total somado, ancoragem e o preço final (12x / à vista) + CTA.
14. **Comunidade** — bloco da comunidade de alunas.
15. **Garantia 7 dias** — selo destacado.
16. **FAQ** — 11 perguntas adaptadas ao produto (habilidade na cozinha, intolerâncias → substituídas por dúvidas relevantes: preciso saber cozinhar, funciona na minha cidade, tenho pouco dinheiro para investir, tempo de acesso, suporte, reembolso etc.).
17. **CTA final + rodapé.**

CTAs verdes repetidos ao longo da página com textos variados ("Quero saber o que vender hoje", "Quero começar a vender agora"), todos apontando para `/assinar`.

## Detalhes técnicos

- Reescrita de `src/routes/index.tsx`, quebrando as seções em componentes menores dentro de `src/components/landing/` (Hero, ProvaSocial, Historias, Oferta, FAQ, Marquee etc.) para o arquivo não virar um monolito.
- Sem novas dependências. Marquee via animação CSS em `src/styles.css`; FAQ com o accordion shadcn já disponível.
- Reaproveita as imagens de receita já geradas em `src/assets`; gerar 3–4 imagens novas para a grade de variedade e os retratos ilustrativos das histórias.
- `head()` da rota atualizado com título/descrição alinhados à nova promessa.
- Preços e depoimentos entram como conteúdo de exemplo, prontos para você substituir pelos números reais.

## Fora de escopo

Vídeos reais, checkout, e qualquer alteração no app `/app` ou no Supabase.
