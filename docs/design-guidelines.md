# Tokens de cores, acessibilidade e internacionalização

**Estado:** diretrizes aprovadas como referência de desenvolvimento. Paleta, tokens, personalização, WCAG 2.2 AA e estratégia de idioma foram revisados pelo mantenedor. Tema claro e internacionalização inicial implementados conforme [componentes](components.md) e [internacionalização](internationalization.md); os testes não constituem conformidade comprovada de todos os componentes e cenários. Consulte a [arquitetura](architecture.md).

## Tokens e tema inicial

### Linguagem visual dos componentes

No `TextField`, o rótulo mantém o cursor padrão, o input usa o I-beam nativo e o caret de inserção é preto para permanecer visível sobre a superfície clara.

Os controles compartilham uma linguagem visual compacta para aplicações SaaS: tipografia de sistema com fallback, tinta carvão, superfícies neutras com nuance verde, limites discretos e cantos quase retos. O `primary` usa carvão escuro para comunicar ação principal sem se confundir com sucesso; verde fica reservado a sucesso e acentos de foco. A ação secundária usa uma superfície neutra com leve nuance verde. Campos indicam foco com borda verde e halo leve; botões e checkbox mantêm indicador externo visível. Erro usa borda e mensagem textual, e desabilitado reduz a ênfase sem apagar o conteúdo. Movimento limita-se a feedback curto de hover/press e carregamento, respeitando `prefers-reduced-motion`.

Escalas CSS disponíveis em `src/styles/tokens/colors.css`: `--chadvue-font-*`, `--chadvue-line-height-*`, `--chadvue-space-*`, `--chadvue-radius-*`, `--chadvue-shadow-*` e `--chadvue-transition-*`. Raios são contidos: 3 px nos controles, 4 px no nível médio e 6 px em diálogos e cartões. Tokens semânticos adicionais cobrem borda forte, superfícies sutis de ação/erro e backdrop. Os tokens alimentam utilitários Tailwind prefixados `tw:`; use as classes para composição e estados, mantendo regras CSS próprias apenas para tokens e casos sem utilitário adequado. O CSS distribuído contém apenas utilitários usados e não injeta Preflight global. A personalização continua possível por cascata no contêiner; temas escuros não fazem parte da decisão aprovada atual.

Critérios observáveis: Button e TextField têm altura de 32 px e raio de 3 px; o botão fechar usa área quadrada de ícone de 32 px; checkbox preserva alvo interativo de 40 px e caixa visual compacta; foco permanece visível, com halo suave no campo; erro inclui texto; disabled é distinguível; modal tem limite de largura, elevação sutil e ações alinhadas ao fim. Placeholders mantêm a cor integral do token de texto secundário para preservar o contraste medido. `prefers-reduced-motion` afeta somente elementos do ChadVue. Stories expõem as quatro variantes do botão e demonstram carregamento composto pelo consumidor.

### Revisão visual do catálogo inicial

A revisão de `Button`, `TextField`, `Checkbox` e `Dialog` comparou hierarquia, geometria, contraste, variantes e estados documentados com as referências oficiais. Foram consultados [Button](https://mui.com/material-ui/react-button/), [Text Field](https://mui.com/material-ui/react-text-field/) e [Dialog](https://mui.com/material-ui/react-dialog/) do MUI; [Button](https://ui.shadcn.com/docs/components/base/button), [Input](https://ui.shadcn.com/docs/components/base/input) e [Dialog](https://ui.shadcn.com/docs/components/base/dialog) do shadcn/ui; [Button](https://www.radix-ui.com/themes/docs/components/button) do Radix Themes; [Button](https://ant.design/components/button/) e [Modal](https://ant.design/components/modal/) do Ant Design; e [Button](https://carbondesignsystem.com/components/button/usage/), [Text input](https://carbondesignsystem.com/components/text-input/guidelines) e [Modal](https://carbondesignsystem.com/components/modal/usage/) do Carbon. Essas referências orientaram variantes previsíveis, hierarquia de ações, superfícies neutras, associação de rótulo/ajuda, estrutura do diálogo e foco; não foram reproduzidas APIs ou estilos proprietários.

### Presets da vitrine Storybook

A story `Exemplos/Integração` oferece as paletas ChadVue, Oceano, Ameixa e Terracota para demonstrar a sobrescrita conjunta dos tokens semânticos de cor. Os presets ficam escopados ao conteúdo da vitrine em `stories/theme-presets.css`; são exemplos de personalização por CSS e não APIs de tema exportadas pela biblioteca. O tema padrão do pacote permanece ChadVue claro.

| Componente | Critérios revisados | Ajuste desta revisão |
| --- | --- | --- |
| `Button` | Altura de 32 px, variantes primária/secundária/outline/danger, hover, active, foco, disabled e tamanho de ícone | Variante `outline` e `danger` adicionadas; prop `size="icon"` cria caixa quadrada de 32 px. `disabled` continua estado independente. |
| `TextField` | Rótulo associado, altura de 32 px, hierarquia de dica/erro, foco discreto, disabled e contraste do placeholder | Mantida a cor integral do placeholder; foco agora usa borda colorida e halo suave, sem outline rígido. |
| `Checkbox` | Alvo de 40 px, caixa visual de 16 px, alinhamento do rótulo, seleção, foco e disabled | Aparência própria em CSS, com input nativo, estados de teclado e restauração em forced colors. |
| `Dialog` | Largura limitada, superfície elevada, cabeçalho, ações, foco, backdrop e uso em tela estreita | Botão de fechar passou a reutilizar o tamanho de ícone de 32 px do Button para alinhar a área e o glifo. |

O movimento reduzido foi limitado aos elementos animados do ChadVue; antes, o seletor global também alterava animações e transições da aplicação consumidora. O tema claro e a customização por contêiner foram mantidos. Após uma primeira versão com primário verde floresta, a cor da ação principal foi revista para carvão escuro, deixando o verde para sucesso e foco. Os raios foram reduzidos para 3, 4 e 6 px. Não há implementação de tema escuro aprovada para esta versão. A build do Storybook foi concluída e os sete testes Playwright passaram no Chrome local. Foram inspecionadas capturas do cenário integrado no desktop, do reflow em 320 px, do foco suave no campo, das variantes e do tamanho de ícone do Button, do botão ocupado composto e do diálogo aberto; a suíte também verificou estados de formulário, foco/teclado, axe e troca de idioma. Os artefatos gerados ficam em `test-results/visual-audit-green/` no checkout local e não são documentação permanente versionada. Essa validação cobre os cenários automatizados disponíveis, não todos os navegadores, tecnologias assistivas ou combinações de temas personalizados.

Tema claro definido com cores opacas. Os nomes descrevem funções; componentes devem consumir tokens, sem conhecer os valores da paleta. O prefixo CSS `--chadvue-` evita colisões e independe da decisão de não usar prefixo nos nomes dos componentes.

| Token CSS | Valor | Uso |
| --- | --- | --- |
| `--chadvue-color-canvas` | `#F4F7F4` | Fundo geral neutro com nuance verde |
| `--chadvue-color-surface` | `#FFFFFF` | Superfícies de conteúdo e controles |
| `--chadvue-color-text` | `#18251E` | Tinta verde-escura para texto principal |
| `--chadvue-color-text-muted` | `#526259` | Texto secundário |
| `--chadvue-color-border` | `#D7E0D8` | Divisórias e limites discretos de superfícies |
| `--chadvue-color-border-strong` | `#718078` | Limite visível em controles de formulário |
| `--chadvue-color-primary` | `#292D32` | Ação principal em carvão escuro |
| `--chadvue-color-primary-hover` | `#1F2328` | Ação principal sob ponteiro |
| `--chadvue-color-primary-active` | `#16191D` | Ação principal durante ativação |
| `--chadvue-color-on-primary` | `#FFFFFF` | Texto e ícones sobre ação principal |
| `--chadvue-color-focus` | `#167A55` | Indicador de foco sobre superfícies claras |
| `--chadvue-color-danger` | `#B91C1C` | Erro ou ação destrutiva |
| `--chadvue-color-danger-hover` | `#A61B1B` | Ação destrutiva sob ponteiro |
| `--chadvue-color-danger-active` | `#8F1818` | Ação destrutiva durante ativação |
| `--chadvue-color-success` | `#16754A` | Confirmação |
| `--chadvue-color-warning` | `#854D0E` | Aviso |
| `--chadvue-color-info` | `#0A627A` | Informação |
| `--chadvue-color-disabled-surface` | `#E5E7EB` | Fundo cinza neutro de controle inativo |
| `--chadvue-color-disabled-text` | `#59616B` | Conteúdo de controle inativo |
| `--chadvue-color-secondary-surface` | `#E8EDE9` | Fundo da ação secundária |
| `--chadvue-color-secondary-hover` | `#DCE4DE` | Ação secundária sob ponteiro |
| `--chadvue-color-secondary-active` | `#CBD6CF` | Ação secundária durante ativação |
| `--chadvue-color-primary-subtle` | `#F0F1F2` | Superfície sutil de ação/seleção |
| `--chadvue-color-focus-ring` | `rgb(22 122 85 / 16%)` | Halo discreto ao redor do foco |
| `--chadvue-color-danger-subtle` | `#FEF2F2` | Superfície sutil de erro |
| `--chadvue-color-backdrop` | `rgb(18 31 24 / 56%)` | Fundo atrás de conteúdo modal |

As cores de estado podem ser texto ou ícone sobre `surface` ou `canvas`. Não pressupõem suporte a fundos preenchidos de estado. Não comunicar erro, seleção ou sucesso somente por cor: adicionar texto, forma, ícone com alternativa apropriada ou estado programático.

### Consumo e personalização

Valores padrão implementados em src/styles/tokens/colors.css, distribuídos com chadvue/style.css. Exemplo de sobrescrita:

```css
:root {
  --chadvue-color-primary: #292D32;
  --chadvue-color-on-primary: #FFFFFF;
}

/* Exemplo de personalização em um contêiner da aplicação */
.custom-theme {
  --chadvue-color-primary: #3B4148;
}
```

A estratégia definida é distribuir valores padrão separadamente e permitir sobrescrita por cascata em um contêiner ancestral. O build gera CSS separado e a sobrescrita por contêiner foi verificada no navegador. Ao alterar uma cor, revisar os estados e todas as combinações afetadas. Tema escuro, alternância automática e API JavaScript de temas não estão definidos neste escopo.

### Contraste da paleta definida

Foram calculadas razões de contraste em sRGB, linearizando canais e usando luminância relativa `0,2126 R + 0,7152 G + 0,0722 B` e razão `(Lmaior + 0,05) / (Lmenor + 0,05)`. Valores exibidos com três casas; a comparação com o limiar usa o valor integral.

| Primeiro plano | Sobre `surface` | Sobre `canvas` | Uso verificado |
| --- | --- | --- | --- |
| `text` | 15,882:1 | 14,716:1 | Texto |
| `text-muted` | 6,461:1 | 5,987:1 | Texto |
| `border-strong` | 4,149:1 | 3,845:1 | Identificação visual de controles |
| `primary` | 13,855:1 | 12,837:1 | Texto e ícone em ação principal |
| `primary-hover` | 15,798:1 | 14,637:1 | Texto e ícone na ação sob ponteiro |
| `primary-active` | 17,634:1 | 16,338:1 | Texto e ícone na ação ativa |
| `focus` | 5,318:1 | 4,927:1 | Indicador de foco em fundo claro |
| `danger` | 6,470:1 | 5,995:1 | Texto e ícone de estado |
| `danger-hover` | 7,516:1 | 6,964:1 | Ação destrutiva sob ponteiro |
| `danger-active` | 9,084:1 | 8,417:1 | Ação destrutiva durante ativação |
| `success` | 5,710:1 | 5,291:1 | Texto e ícone de estado |
| `warning` | 6,851:1 | 6,548:1 | Texto e ícone de estado |
| `info` | 6,906:1 | 6,398:1 | Texto e ícone de estado |

A verificação é reproduzível com `npm run check:contrast`, que lê esta tabela e avalia pares de texto/estado e foco (incluindo on-primary). Também verifica o texto disabled sobre a superfície cinza disabled (5,068:1). As razões com branco verificam `on-primary` sobre os estados `primary` e `danger`, inclusive hover/active. Foco sobre fundo colorido exige outro tratamento: usa anel com separação clara, cuja geometria e contraste real devem ser revisados em cada componente. Transparência, sobreposição, imagens e outros fundos exigem nova medição. A paleta não comprova conformidade de interfaces.

## Diretrizes de acessibilidade

Adota-se WCAG 2.2 nível AA como referência de avaliação, com padrões WAI-ARIA APG quando aplicáveis. Não há declaração de conformidade da biblioteca ou de aplicações consumidoras.

| Área | Diretriz | Verificação na implementação |
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

O contexto compartilhado Vue usará `provide`/`inject`, com estado reativo por aplicação ou subárvore, sem singleton mutável compartilhado entre aplicações. LocaleProvider, createI18n, provideI18n e useI18n concretizam esse contrato; veja a documentação de internacionalização.

| Aspecto | Diretriz aprovada |
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
- Avaliar textos longos e atributos de idioma; suporte completo a RTL não está definido neste escopo.

A implementação e o alcance dos testes dessas diretrizes estão descritos em [internacionalização](internationalization.md) e [qualidade](quality.md). Troca de idioma, formatos e preservação de foco/valor foram executados; idiomas extensos e RTL exigem avaliação adicional.

## Referências técnicas

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [W3C — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- [W3C — contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- [WAI-ARIA APG — interação por teclado](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).
- [Vue — provide/inject](https://vuejs.org/guide/components/provide-inject.html).
