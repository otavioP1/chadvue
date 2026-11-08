# Arquitetura do ChadVue

> **Estado:** proposta arquitetural, pendente de validação. O repositório contém apenas documentação, sem componentes ou ferramentas configuradas.

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

| Área | Proposta | Situação |
| --- | --- | --- |
| Framework | Vue 3, com Composition API | A validar na inicialização |
| Linguagem | TypeScript | A validar na inicialização |
| Build | Vite e modo biblioteca, se adequado | A avaliar na configuração do ambiente |
| Gerenciador de pacotes | pnpm, sujeito à confirmação | Pendente |
| Documentação visual | Storybook para Vue/Vite | A validar na configuração |
| Estilização | CSS custom properties com tokens semânticos | Detalhamento pendente |
| Testes | Vitest e ferramentas de teste de componentes e acessibilidade | A validar após seleção das ferramentas |
| Distribuição | Pacote com entradas públicas explícitas | A definir antes da publicação |

**Princípio central:** os componentes não devem conhecer a identidade visual de uma aplicação consumidora. A apresentação deve ser controlada por tokens e temas, enquanto a API do componente expressa semântica, comportamento e composição.

## Estrutura do projeto

A documentação permanente fica em `docs/`. A estrutura de implementação abaixo é **referencial**, não descreve arquivos existentes e poderá ser refinada após validação das ferramentas:

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

- **Nomenclatura:** componentes em PascalCase, com prefixo opcional `Cv` a validar (ex.: `CvButton`).
- **Propriedades:** nomes consistentes, valores tipados e defaults explícitos.
- **Eventos:** emissão documentada, com suporte às convenções do Vue (`v-model` quando aplicável).
- **Slots:** composição preferencial em vez de APIs excessivamente rígidas.
- **Estados:** tratamento consistente de `disabled`, carregamento, erro, foco e seleção conforme a natureza de cada componente.
- **Acessibilidade:** HTML semântico primeiro; WAI-ARIA para estados, relações e widgets que realmente necessitem; interação por teclado e gerenciamento de foco nos componentes interativos.
- **Temas:** uso de tokens semânticos e variáveis CSS em vez de valores visuais espalhados.
- **i18n:** textos internos configuráveis e estratégia de locale ainda a definir.

## Organização e responsabilidades dos módulos

- **Componentes:** renderização, interação e contratos públicos.
- **Composables:** comportamentos compartilhados e gerenciamento de estado local.
- **Tokens/temas:** valores visuais e mapeamento semântico.
- **Locales:** mensagens e configurações de idioma relevantes para a biblioteca.
- **Storybook:** exemplos de uso, documentação e apoio à validação; não deve ser dependência de execução da biblioteca.
- **Testes:** verificação independente dos comportamentos prometidos.

## Decisões ainda não validadas

1. Confirmar o gerenciador de pacotes e as versões mínimas suportadas.
2. Escolher convenção final de nomes e entradas públicas.
3. Priorizar quais componentes integram o MVP.
4. Definir formato e mecanismo de distribuição da biblioteca.
5. Detalhar tokens, acessibilidade e internacionalização em documentação técnica específica.

## API pública e extensibilidade

Propriedades, eventos e slots devem expressar semântica, comportamento e composição. Imports públicos devem ser previsíveis, com entradas explícitas. A convenção final de nomes, exportações e formato de distribuição ainda não foi definida; não há API implementada.

## Estratégia de temas e design tokens

Componentes devem consumir tokens semânticos por CSS custom properties, evitando cores fixas e valores visuais espalhados. A apresentação deve ser adaptável sem modificar os componentes. O catálogo, os valores e o mapeamento dos tokens e o mecanismo de configuração e troca de temas ainda precisam ser definidos.

## Acessibilidade

Priorizar HTML nativo e semântico, operação por teclado e gerenciamento de foco. Usar WAI-ARIA apenas quando necessário para estados, relações e widgets, sem atributos redundantes ou incorretos. WCAG e WAI-ARIA orientam o projeto; a versão e o nível de referência da WCAG e os procedimentos detalhados de avaliação ainda precisam ser definidos.

Validar com inspeção semântica, teclado, foco, ferramentas automatizadas e tecnologias assistivas quando aplicável. Não há conformidade comprovada.

## Internacionalização

Textos internos e mensagens que exigirem tradução devem ser configuráveis, sem fixar um único idioma. Prever mensagens e formatos localizáveis e separar recursos de idioma dos componentes. Estratégia de locale, idiomas iniciais e mecanismo de configuração permanecem pendentes. A validação deve demonstrar troca de idioma em componentes com texto interno.

## Documentação e testes

O Storybook deve apresentar API, exemplos funcionais e código, sem ser dependência de execução da biblioteca. Validar importação e renderização em aplicação de exemplo, alteração visual de tokens, propriedades, eventos, slots, troca de idioma e comportamentos acessíveis conforme as tabelas acima.

Prever verificação TypeScript, testes automatizados de estados e comportamentos relevantes, lint e formatação. Vitest é uma proposta; as ferramentas complementares ainda serão selecionadas. Versões mínimas de Vue, Node.js e ferramentas dependem de inicialização e testes. Não há scripts, builds ou testes executáveis configurados. Diretrizes do projeto não equivalem a funcionalidades implementadas ou tecnicamente validadas.
