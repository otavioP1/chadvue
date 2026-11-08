# Tokens de cores, acessibilidade e internacionalização

**Estado:** proposta para revisão. Contexto compartilhado Vue para idioma e uso de tokens semânticos por CSS custom properties já aprovados na [arquitetura](architecture.md). Paleta, nomes dos tokens e detalhamentos abaixo ainda não aprovados nem implementados.

## Tokens e tema inicial

Proposta de tema claro com cores opacas. Os nomes descrevem funções; componentes devem consumir tokens, sem conhecer os valores da paleta. O prefixo CSS `--chadvue-` evita colisões e independe da decisão de não usar prefixo nos nomes dos componentes.

| Token CSS proposto | Valor | Uso |
| --- | --- | --- |
| `--chadvue-color-canvas` | `#F8FAFC` | Fundo geral |
| `--chadvue-color-surface` | `#FFFFFF` | Superfícies de conteúdo e controles |
| `--chadvue-color-text` | `#0F172A` | Texto principal |
| `--chadvue-color-text-muted` | `#475569` | Texto secundário |
| `--chadvue-color-border` | `#64748B` | Limites necessários para identificar controles |
| `--chadvue-color-primary` | `#1D4ED8` | Ação principal e links |
| `--chadvue-color-primary-hover` | `#1E40AF` | Ação principal sob ponteiro |
| `--chadvue-color-primary-active` | `#1E3A8A` | Ação principal durante ativação |
| `--chadvue-color-on-primary` | `#FFFFFF` | Texto e ícones sobre ação principal |
| `--chadvue-color-focus` | `#1D4ED8` | Indicador de foco sobre superfícies claras |
| `--chadvue-color-danger` | `#B91C1C` | Erro ou ação destrutiva |
| `--chadvue-color-success` | `#15803D` | Confirmação |
| `--chadvue-color-warning` | `#854D0E` | Aviso |
| `--chadvue-color-info` | `#075985` | Informação |
| `--chadvue-color-disabled-surface` | `#E2E8F0` | Fundo de controle inativo |
| `--chadvue-color-disabled-text` | `#475569` | Conteúdo de controle inativo |

As cores de estado podem ser texto ou ícone sobre `surface` ou `canvas`. Não pressupõem suporte a fundos preenchidos de estado. Não comunicar erro, seleção ou sucesso somente por cor: adicionar texto, forma, ícone com alternativa apropriada ou estado programático.

### Consumo e personalização

Exemplo documental, sem folha de estilos implementada:

```css
:root {
  --chadvue-color-primary: #1D4ED8;
  --chadvue-color-on-primary: #FFFFFF;
}

/* Exemplo de personalização em um contêiner da aplicação */
.custom-theme {
  --chadvue-color-primary: #1E40AF;
}
```

A proposta é distribuir valores padrão separadamente e permitir sobrescrita por cascata em um contêiner ancestral. Importação de CSS, especificidade e aplicação real serão validadas na implementação. Ao alterar uma cor, revisar os estados e todas as combinações afetadas. Tema escuro, alternância automática e API JavaScript de temas não estão definidos nesta proposta.

### Contraste da paleta proposta

Foram calculadas razões de contraste em sRGB, linearizando canais e usando luminância relativa `0,2126 R + 0,7152 G + 0,0722 B` e razão `(Lmaior + 0,05) / (Lmenor + 0,05)`. Valores exibidos com três casas; a comparação com o limiar usa o valor integral.

| Primeiro plano | Sobre `surface` | Sobre `canvas` | Uso verificado |
| --- | --- | --- | --- |
| `text` | 17,853:1 | 17,063:1 | Texto |
| `text-muted` | 7,578:1 | 7,243:1 | Texto |
| `border` | 4,759:1 | 4,548:1 | Identificação visual de controles |
| `primary` / `focus` | 6,702:1 | 6,405:1 | Texto, ícone e foco em fundo claro |
| `primary-hover` | 8,722:1 | 8,337:1 | Cor da ação |
| `primary-active` | 10,358:1 | 9,900:1 | Cor da ação |
| `danger` | 6,470:1 | 6,184:1 | Texto e ícone de estado |
| `success` | 5,016:1 | 4,794:1 | Texto e ícone de estado |
| `warning` | 6,851:1 | 6,548:1 | Texto e ícone de estado |
| `info` | 7,563:1 | 7,228:1 | Texto e ícone de estado |

A verificação é reproduzível com `npm run check:contrast`, que lê esta tabela e avalia 25 pares (incluindo foco e on-primary), sem falhas na execução registrada. As razões com branco também verificam `on-primary` sobre `primary`, `primary-hover` e `primary-active`. Foco sobre fundo colorido exige outro tratamento: propõe-se anel com separação clara, cuja geometria e contraste real deverão ser testados. Transparência, sobreposição, imagens e outros fundos exigem nova medição. A paleta não comprova conformidade de interfaces.

## Diretrizes de acessibilidade

Propõe-se WCAG 2.2 nível AA como referência de avaliação, com padrões WAI-ARIA APG quando aplicáveis. Não há declaração de conformidade da biblioteca ou de aplicações consumidoras.

| Área | Diretriz proposta | Verificação na implementação |
| --- | --- | --- |
| Semântica | Preferir `button`, `a`, `input` e outros elementos nativos adequados | Inspecionar DOM e árvore de acessibilidade |
| Nome acessível | Associar rótulos aos campos; controles apenas com ícone precisam de nome; placeholder não substitui rótulo | Conferir nome anunciado e relações de rótulo |
| Teclado | Usar ordem lógica com Tab/Shift+Tab, sem `tabindex` positivo; respeitar ativação nativa; setas/Escape conforme o padrão do widget | Executar todo o fluxo sem ponteiro e verificar ausência de armadilhas |
| Foco | Manter foco visível e não totalmente encoberto; ao abrir/fechar elementos temporários, planejar entrada e retorno conforme o padrão | Testar navegação, fechamento e retorno ao acionador quando aplicável |
| ARIA | Usar somente papéis, estados e relações necessários; ARIA não implementa comportamento | Conferir estados anunciados e interação prevista pelo APG |
| Contraste | Texto comum mínimo 4,5:1; texto grande mínimo 3:1; informação visual necessária de controles/estados mínimo 3:1 contra cores adjacentes | Medir todos os estados e fundos realmente usados |
| Erros e estados | Descrever erros em texto e associá-los ao campo; anunciar mudanças dinâmicas quando necessário, sem anúncios excessivos | Verificar leitura, associação e atualização com tecnologia assistiva |
| Ampliação e movimento | Evitar perda de conteúdo ao ampliar/refluir; respeitar preferência por movimento reduzido onde houver animação | Avaliar zoom de 200%, reflow a 320 CSS px e preferência de movimento |

Texto grande, para o critério de contraste, corresponde a pelo menos 18 pt (24 CSS px) ou 14 pt em negrito (aproximadamente 18,67 CSS px). Existem exceções normativas, como controles inativos para contraste; isso não autoriza tornar conteúdos informativos ilegíveis. O quadro não substitui a avaliação dos demais critérios aplicáveis da WCAG.

Registrar por componente: cenário, ambiente, resultado e limitações. Combinar testes automatizados com inspeção manual de teclado, foco e leitor de tela; a ferramenta automatizada sozinha não comprova acessibilidade.

## Diretrizes de internacionalização

O contexto compartilhado Vue está aprovado. Propõe-se detalhá-lo usando `provide`/`inject`, com estado reativo por aplicação ou subárvore, sem singleton mutável compartilhado entre aplicações. Os nomes de funções, tipos e eventual componente provedor permanecem em aberto.

| Aspecto | Proposta para revisão |
| --- | --- |
| Idioma inicial | `pt-BR`; usar `en-US` como segundo idioma de demonstração quando houver mensagens reais |
| Contexto | Compartilhar locale e catálogo; mudanças reativas atualizam textos internos sem remontar componentes |
| Contexto ausente | Usar catálogo padrão `pt-BR`, sem depender do idioma do navegador |
| Tradução ausente | Buscar a chave no catálogo padrão; se também ausente, retornar a chave como diagnóstico e avisar no desenvolvimento; testar para que isso não seja o caminho normal de produção |
| Mensagens | Chaves semânticas por domínio, sem concatenação de frases; preservar parâmetros e impedir execução de HTML de tradução |
| Formatos | Usar `Intl.DateTimeFormat` e `Intl.NumberFormat` com locale explícito; moeda e fuso horário dependem da configuração de domínio, sem presumir BRL ou fuso local |
| Conteúdo do consumidor | Rótulos, slots e textos fornecidos pela aplicação continuam sob responsabilidade dela; a biblioteca traduz somente seus textos internos |
| Integração | Não exigir biblioteca externa de i18n; adaptadores e pluralização complexa deverão ser avaliados quando houver necessidade concreta |

A aplicação deve definir o atributo `lang` apropriado no documento ou na subárvore. Não traduzir identificadores da API, nomes de propriedades ou chaves dos tokens. Uma atualização de idioma não deve alterar valores de formulário nem deslocar o foco.

### Verificações previstas

- Trocar `pt-BR` e `en-US` em uma demonstração com texto interno real e observar atualização reativa.
- Exercitar ausência de contexto, tradução ausente e parâmetros de mensagens.
- Conferir formatos de datas e números com locale, moeda e fuso explícitos quando aplicáveis.
- Conferir isolamento entre contextos e preservação de valores e foco na troca de idioma.
- Avaliar textos longos e atributos de idioma; suporte completo a RTL não está definido nesta proposta.

Nenhuma dessas verificações de execução foi realizada: ainda não existe implementação.

## Referências técnicas

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [W3C — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- [W3C — contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- [WAI-ARIA APG — interação por teclado](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).
- [Vue — provide/inject](https://vuejs.org/guide/components/provide-inject.html).
