# Projetos que viram ativo · 75LAB × FTW

Proposta comercial em HTML (arquivo único) da 75LAB para a **FTW**, agora no **modelo de
projetos** e não mais em fee mensal. Sete projetos, três ondas, sete meses.

## Por que mudou de fee para projeto

Fee mensal funciona bem enquanto existe demanda represada. Quando o represado acaba, o
cliente passa a pagar capacidade ociosa e cancela, sem ter ficado com nenhuma ferramenta.
Projeto tem escopo, prazo e preço fechados, e termina entregando um ativo que fica com o
time do cliente. A tela 03 do deck explica isso em três momentos: mês 1, mês 3 e mês 6.

## As 11 telas

| # | Tela | Molde visual | Bloco |
|---|------|--------------|-------|
| 01 | Projetos que viram ativo | capa com totem FTW e barra vermelha | Abertura |
| 02 | A FTW já cria, falta sistema | quadro clicável dos 4 canais | Contexto |
| 03 | Por que projeto e não fee | comparador com 2 gráficos e 3 momentos | Contexto |
| 04 | Três ondas | escada de blocos, tela escura | Caminho |
| 05 | Onda 1 · Destravar | fichas de projeto em etiqueta horizontal | Caminho |
| 06 | Onda 2 · Padronizar | dois blocos com entregáveis numerados | Caminho |
| 07 | Onda 3 · Escalar | trilha de dois projetos com chips | Caminho |
| 08 | O que fica com a FTW | gôndola de ativos em duas prateleiras | Caminho |
| 09 | Cronograma | gantt de out 2026 a abr 2027 | Cronograma |
| 10 | Cenários de investimento | três etiquetas de preço, resumo dinâmico | Investimento |
| 11 | Para avançar | fecho tipográfico, tela escura | Decisão |

## Os sete projetos

**Onda 1 · Destravar** (out a dez 2026, R$ 42.300)
Natal FTW R$ 18.900 · Loja modelo e collabs R$ 14.500 · Resgate dos incentivos R$ 8.900

**Onda 2 · Padronizar** (nov 2026 a fev 2027, R$ 56.400)
Sistema de PDV FTW R$ 32.800 · Motor de JBP R$ 23.600

**Onda 3 · Escalar** (fev a abr 2027, R$ 39.700)
Programa de incentivo R$ 22.400 · Academia FTW de canal R$ 17.300

## Cenários

| Cenário | Escopo | Valor | Parcelas |
|---------|--------|-------|----------|
| Destravar | Onda 1 | R$ 42.300 | 3 × R$ 14.100 |
| Construir (recomendado) | Ondas 1 e 2 | R$ 89.500 | 5 × R$ 17.900 |
| Sistema completo | Ondas 1, 2 e 3 | R$ 125.300 | 7 × R$ 17.900 |

O desembolso mensal de qualquer cenário fica abaixo do fee de R$ 24.900/mês, e tem data
para acabar. O pacote completo custa menos que seis meses de fee.

## Como usar

Abra `index.html`. Navegação por setas, espaço, Home e End, swipe no mobile. **M** abre o
índice, **Esc** fecha. `index.html#3` abre direto na tela 3. O botão Baixar PDF usa a
impressão do navegador, 11 páginas em 1600×900 paisagem.

Interações: canais clicáveis na tela 02, momentos do comparador na tela 03, seleção de
cenário na tela 10 com resumo que recalcula.

## Build

Fonte em `src/`, montagem por `python3 build.py`, que gera `index.html` na raiz.
O build trava se: sobrar token não substituído, a tag `<style>` ficar desbalanceada,
o CSS de componentes não entrar, o número de telas mudar ou aparecer **qualquer travessão**.

```
src/head.html      meta, fontes e CSS base
src/comp.css       um bloco de CSS por molde de tela
src/slides/NN.html uma tela por arquivo
src/app.js         navegação, cursor, palco e interações
src/assets/*.txt   imagens em base64
```

## Identidade

Guia da 75 LAB (75lab.com.br) aplicado à marca FTW: **Big Shoulders Display** nos títulos e
números, **Space Grotesk** no texto, **Space Mono** em rótulos e botões. Cantos retos,
bordas de 2px, grão por feTurbulence, sem degradê e sem brilho.
Cores: ink `#050505`, paper `#F2F1E9`, vermelho FTW `#E1091E` amostrado das embalagens.
Cursor em dois tons, anel escuro com contorno claro e ponto vermelho com halo, legível
sobre papel, preto e vermelho.

Palco fixo de 1600×900 escalado por transform, com `overflow:clip`, para o layout ficar
idêntico em qualquer resolução.
