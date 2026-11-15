# ChadVue

O ChadVue é um design system para Vue 3 e TypeScript, com componentes reutilizáveis, tokens semânticos e suporte a idiomas. Inspirado nos conceitos de design e ergonomia do Material UI, oferece APIs próprias para o ecossistema Vue.

## Características

- Componentes modulares e extensíveis com propriedades, eventos e slots tipados.
- Personalização por design tokens semânticos e CSS custom properties, com utilitários Tailwind pré-compilados.
- Acessibilidade orientada por HTML semântico, WCAG e WAI-ARIA, com atenção a teclado e foco.
- Internacionalização de mensagens e textos internos.
- Documentação interativa, exemplos e código no Storybook.
- Testes de tipos, comportamento e acessibilidade.

## Tecnologias

Vue 3, Composition API e TypeScript formam a base. npm e Vite integram Tailwind CSS para compilar utilitários `tw:` no CSS distribuído, e Lucide Vue fornece ícones SVG. Storybook documenta os componentes. O ambiente validado usa Node 24.22.2 e npm 11.19.1; a política de versões foi aprovada. Vitest, Vue Test Utils, Playwright e axe-core verificam comportamentos e cenários de acessibilidade.

## Como começar

Com Node 24.22.2 e npm 11.19.1 disponíveis, execute:

```sh
npm ci
npm run build
npm run storybook
```

Acesse `http://localhost:6006` para Button, TextField, Checkbox, Dialog e o exemplo integrado com tema e idioma. O pacote continua privado e não foi publicado em registro. Consulte o [ambiente de desenvolvimento](docs/development.md) para tipos, build estático, contraste e limitações de validação.

## Documentação e contribuição

A [arquitetura](docs/architecture.md) é a referência técnica permanente. Consulte também as diretrizes de [tokens, acessibilidade e i18n](docs/design-guidelines.md). Consulte os [contratos dos componentes](docs/components.md), [internacionalização](docs/internationalization.md) e [qualidade](docs/quality.md). O processo de contribuição ainda não foi definido.
