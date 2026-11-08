# Arquitetura do ChadVue

> **Estado:** arquitetura inicial aprovada como referência de desenvolvimento. Base Vue/TypeScript, build e Storybook configurados e verificados conforme o [ambiente de desenvolvimento](development.md). Componentes de produto, temas e i18n ainda não implementados.

## Visão geral da arquitetura

O **ChadVue** é uma proposta de biblioteca de componentes de interface para aplicações **Vue.js**, inspirada em princípios de design e ergonomia de bibliotecas como Material UI, sem depender de React. Seu propósito é facilitar a construção de interfaces consistentes, reutilizáveis, acessíveis e adaptáveis a diferentes identidades visuais e idiomas.

## Objetivos e princípios

Aplicações Vue podem demandar implementação repetida de componentes, estilos, estados de interação, comportamentos acessíveis e documentação de uso. O ChadVue pretende fornecer uma base compartilhada para reduzir duplicação e favorecer consistência entre aplicações.

### Objetivo geral

Definir e implementar uma biblioteca modular de componentes Vue com personalização por design tokens, práticas de acessibilidade, suporte à internacionalização e documentação interativa no Storybook.

### Objetivos específicos

- Definir contratos de componentes claros e reutilizáveis.
- Permitir personalização visual por tokens sem alterar o código dos componentes.
- Incorporar acessibilidade desde a definição das APIs e dos comportamentos.
- Prever mensagens e formatos localizáveis, evitando textos fixos na biblioteca.
- Documentar exemplos de uso e código no Storybook.
- Viabilizar testes e distribuição da biblioteca como pacote reutilizável.

## Escopo inicial previsto

### Incluído no MVP

- Estrutura de projeto em Vue 3 e TypeScript.
- Componentes iniciais de interface, ainda a selecionar.
- Contratos para propriedades, eventos, slots e estados dos componentes.
- Sistema de tokens e temas, ainda a detalhar e implementar.
- Diretrizes de acessibilidade e internacionalização, ainda a detalhar.
- Storybook para documentação e demonstração isolada.
- Testes de comportamento e acessibilidade, ainda a validar.

### Fora do escopo inicial

- Reprodução integral da API ou catálogo do Material UI.
- Compatibilidade com frameworks diferentes de Vue.
- Biblioteca completa de ícones ou ilustrações próprias.
- Garantia de conformidade de acessibilidade sem testes e auditoria.
- Publicação pública obrigatória antes da validação do MVP.

## Capacidades funcionais previstas

| Característica | Validação esperada |
| --- | --- |
| Disponibilizar componentes Vue reutilizáveis | Componente importado e renderizado em aplicação de exemplo |
| Permitir customização por tokens e temas | Alteração de token refletida visualmente nos componentes |
| Oferecer propriedades, eventos e slots documentados | Exemplos funcionais no Storybook |
| Incorporar semântica e interações acessíveis | Inspeção semântica e testes de teclado, foco e tecnologias assistivas quando aplicável |
| Suportar textos e mensagens localizáveis | Demonstração de troca de idioma em componentes com texto interno |
| Disponibilizar documentação e exemplos de código | Stories acessíveis e documentação de API |

## Qualidades técnicas esperadas

| Característica | Diretriz de aceitação |
| --- | --- |
| Tipagem estática | TypeScript com verificação de tipos sem erros no código entregue |
| Modularidade | Componentes com responsabilidades delimitadas e imports públicos previsíveis |
| Manutenibilidade | Padrões de nomenclatura, lint e formatação automatizados |
| Acessibilidade | Preferir elementos HTML nativos; aplicar WAI-ARIA quando necessário, sem atributos redundantes |
| Testabilidade | Testes automatizados para comportamentos e estados relevantes |
| Independência visual | Evitar cores fixas nos componentes; consumir tokens semânticos |
| Internacionalização | Não fixar mensagens de interface em um único idioma quando exigirem tradução |
| Compatibilidade | Definir versões mínimas de Vue, Node.js e ferramentas após inicialização e testes |

## Tecnologias e ferramentas

| Área | Diretriz ou escolha | Situação |
| --- | --- | --- |
| Framework | Vue 3, com Composition API | Vue 3.5.45 usado no exemplo documental e no build |
| Linguagem | TypeScript | 6.0.3, com checagem por vue-tsc executada |
| Build | Vite | Modo biblioteca ESM, externalização Vue e declarações verificados; publicação futura |
| Gerenciador de pacotes | npm | Lockfile e npm ci verificados com 11.19.1; política de versões aprovada |
| Documentação visual | Storybook para Vue/Vite | 10.6.6: servidor, índice e build estático verificados |
| Estilização | CSS custom properties com tokens semânticos | Diretrizes aprovadas; implementação futura |
| Testes | Vitest e ferramentas de teste de componentes e acessibilidade | A validar após seleção das ferramentas |
| Distribuição | Pacote com entradas públicas explícitas | A definir antes da publicação |

**Princípio central:** os componentes não devem conhecer a identidade visual de uma aplicação consumidora. A apresentação deve ser controlada por tokens e temas, enquanto a API do componente expressa semântica, comportamento e composição.

## Estrutura do projeto

A documentação permanente fica em `docs/`. A estrutura real e os comandos estão em [ambiente de desenvolvimento](development.md). A árvore abaixo é a estrutura-alvo: `src/index.ts`, `.storybook/` e `package.json` já existem; os demais módulos ainda são referenciais:

```text
src/
├── components/       # componentes por domínio/nome
├── composables/      # lógica reutilizável Vue
├── styles/
│   └── tokens/       # tokens e temas
├── locales/          # mensagens localizáveis
└── index.ts          # API pública
.storybook/           # documentação interativa
package.json          # configuração do pacote
```

## Padrões de desenvolvimento de componentes

- **Nomenclatura:** componentes em PascalCase, sem prefixo `Cv` (por exemplo, `Button`, apenas ilustrativo; não define o catálogo).
- **Propriedades:** nomes consistentes, valores tipados e defaults explícitos.
- **Eventos:** emissão documentada, com suporte às convenções do Vue (`v-model` quando aplicável).
- **Slots:** composição preferencial em vez de APIs excessivamente rígidas.
- **Estados:** tratamento consistente de `disabled`, carregamento, erro, foco e seleção conforme a natureza de cada componente.
- **Acessibilidade:** HTML semântico primeiro; WAI-ARIA para estados, relações e widgets que realmente necessitem; interação por teclado e gerenciamento de foco nos componentes interativos.
- **Temas:** uso de tokens semânticos e variáveis CSS em vez de valores visuais espalhados.
- **i18n:** textos internos configuráveis e idioma em contexto compartilhado Vue; contrato e mecanismo ainda a detalhar.

## Organização e responsabilidades dos módulos

- **Componentes:** renderização, interação e contratos públicos.
- **Composables:** comportamentos compartilhados e gerenciamento de estado local.
- **Tokens/temas:** valores visuais e mapeamento semântico.
- **Locales:** mensagens e configurações de idioma relevantes para a biblioteca.
- **Storybook:** exemplos de uso, documentação e apoio à validação; não deve ser dependência de execução da biblioteca.
- **Testes:** verificação independente dos comportamentos prometidos.

## Decisões ainda não validadas

1. Ampliar a validação de compatibilidade além das versões executadas: Node 24.22.2, npm 11.19.1 e Vue 3.5.45. A política inicial de versões foi aprovada.
2. Validar o consumo real de componentes pela entrada principal quando o catálogo existir; a entrada ESM vazia já foi carregada em Node.
3. Priorizar quais componentes integram o MVP.
4. Definir formato e mecanismo de distribuição da biblioteca.
5. Implementar e validar a aplicação das diretrizes aprovadas de [tokens, acessibilidade e internacionalização](design-guidelines.md).

### Decisões aprovadas

As escolhas abaixo foram aprovadas pelo mantenedor. Aprovação arquitetural não significa implementação ou validação técnica concluída.

| Decisão | Escolha aprovada | Validação ou detalhamento pendente |
| --- | --- | --- |
| Gerenciador | npm | Versão, instalação reproduzível e arquivo de lock |
| Build | Vite | Configuração em modo biblioteca, tipos e artefatos consumíveis |
| Nomes públicos | PascalCase sem prefixo `Cv` | Aplicar aos componentes e documentar eventuais aliases no consumo |
| Configuração de idioma | Contexto compartilhado Vue | API de configuração, mecanismo, escopo, reatividade e comportamento de ausência de tradução |

A importação será feita por **exportações nomeadas pela entrada principal**. Exemplo ilustrativo, sem pacote ou componentes disponíveis:

```ts
// Exportações nomeadas pela entrada principal
import { Button, Input } from 'chadvue'

```

A escolha concentra os imports em um caminho público. Subcaminhos por componente não fazem parte do contrato inicial aprovado. Resolução de tipos, estilos e comportamento do empacotamento precisam ser testados; a sintaxe isoladamente não garante redução do código final.

O catálogo inicial de componentes, as versões mínimas e o formato de distribuição continuam em aberto.

## API pública e extensibilidade

Propriedades, eventos e slots devem expressar semântica, comportamento e composição. Imports públicos devem ser previsíveis, com entradas explícitas. Os nomes seguem PascalCase sem prefixo e os componentes serão expostos por exportações nomeadas pela entrada principal. O catálogo de exportações e o formato de distribuição ainda precisam ser definidos. A entrada pública está configurada, mas ainda não exporta componentes de produto.

### Contrato mínimo para cada componente

Antes da implementação de um componente, sua especificação deve registrar:

- Propósito, limites e elemento HTML ou padrão de interação utilizado.
- Propriedades com tipos, valores padrão e combinações permitidas.
- Eventos com payloads e condições de emissão; convenção de `v-model` quando aplicável.
- Slots com finalidade e dados expostos, quando houver.
- Estados suportados e seus efeitos visuais e comportamentais.
- Operação por teclado, foco e requisitos de nome acessível, quando aplicáveis.
- Tokens consumidos e textos internos que precisem de tradução.
- Exemplos de uso e verificações observáveis do comportamento público.

Esse padrão de documentação foi aprovado; propriedades e eventos concretos serão definidos por componente.

### Limites e dependências entre módulos

- Componentes podem consumir composables, tokens e recursos de idioma da biblioteca, sem depender de regras de negócio da aplicação consumidora.
- Composables compartilhados não devem depender de componentes concretos, evitando dependências circulares.
- Tokens definem valores e significados visuais, sem controlar regras de interação ou conteúdo traduzível.
- Recursos de idioma não devem depender de renderização de componentes.
- A entrada pública expõe apenas contratos destinados ao consumidor; caminhos internos não constituem API pública garantida.
- Storybook e testes podem consumir a biblioteca; a biblioteca não deve importar stories, testes ou configuração dessas ferramentas.

Esses limites foram aprovados e sua aplicação será verificada junto da estrutura real do código. Idioma usará contexto compartilhado Vue; o mecanismo concreto, registro global e adaptadores não estão definidos.

## Estratégia de temas e design tokens

O catálogo de cores, os pares de contraste calculados e a proposta de personalização estão em [diretrizes de design](design-guidelines.md). O detalhamento foi aprovado, mantendo a implementação como etapa futura.

Componentes devem consumir tokens semânticos por CSS custom properties, evitando cores fixas e valores visuais espalhados. A apresentação deve ser adaptável sem modificar os componentes. O catálogo, os valores, o mapeamento e a proposta de sobrescrita por cascata estão documentados e aprovados; não foram implementados como tema.

## Acessibilidade

As [diretrizes de design](design-guidelines.md) adotam WCAG 2.2 nível AA e descrevem critérios aprovados de avaliação por componente.

Priorizar HTML nativo e semântico, operação por teclado e gerenciamento de foco. Usar WAI-ARIA apenas quando necessário para estados, relações e widgets, sem atributos redundantes ou incorretos. WCAG e WAI-ARIA orientam o projeto; a referência aprovada é WCAG 2.2 AA, com procedimentos descritos nas diretrizes de design.

Validar com inspeção semântica, teclado, foco, ferramentas automatizadas e tecnologias assistivas quando aplicável. Não há conformidade comprovada.

## Internacionalização

As [diretrizes de design](design-guidelines.md) detalham as escolhas aprovadas de contexto reativo, idioma inicial, fallback e formatos.

Textos internos e mensagens que exigirem tradução devem ser configuráveis, sem fixar um único idioma. Prever mensagens e formatos localizáveis e separar recursos de idioma dos componentes. O idioma será configurado em contexto compartilhado Vue, evitando repetir a configuração em cada componente. Foram aprovados pt-BR como padrão, en-US para demonstração e provide/inject reativo com fallback; nomes da API e implementação concreta ainda serão definidos. A validação deve demonstrar troca de idioma em componentes com texto interno.

## Documentação e testes

O Storybook deve apresentar API, exemplos funcionais e código, sem ser dependência de execução da biblioteca. Validar importação e renderização em aplicação de exemplo, alteração visual de tokens, propriedades, eventos, slots, troca de idioma e comportamentos acessíveis conforme as tabelas acima.

Prever verificação TypeScript, testes automatizados de estados e comportamentos relevantes, lint e formatação. Vitest é uma proposta; as ferramentas complementares ainda serão selecionadas. A política inicial de versões está aprovada e documentada no ambiente de desenvolvimento; outras combinações exigem testes. Scripts de tipos, build, Storybook e contraste estão configurados e foram executados conforme o [ambiente de desenvolvimento](development.md). Testes de componentes e ferramentas de lint/formatação ainda não estão configurados. Diretrizes do projeto não equivalem a funcionalidades implementadas ou tecnicamente validadas.
