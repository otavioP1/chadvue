# ChadVue

ChadVue é uma biblioteca de componentes reutilizáveis para Vue 3 e TypeScript, com arquitetura inicial aprovada e ambiente de desenvolvimento configurado. Inspirada nos conceitos de design e ergonomia do Material UI, busca oferecer interfaces consistentes e adaptáveis com APIs próprias para o ecossistema Vue.

## Objetivos e características planejadas

- Componentes modulares e extensíveis com propriedades, eventos e slots tipados.
- Personalização por design tokens semânticos e CSS custom properties.
- Acessibilidade orientada por HTML semântico, WCAG e WAI-ARIA, com atenção a teclado e foco.
- Internacionalização de mensagens e textos internos.
- Documentação interativa, exemplos e código no Storybook.
- Testes de tipos, comportamento e acessibilidade.

## Tecnologias

Vue 3, Composition API e TypeScript formam a base. npm e Vite estão configurados, assim como Storybook para Vue/Vite. O ambiente validado usa Node 24.22.2 e npm 11.19.1; a política de versões está em revisão. Vitest permanece em avaliação.

## Como começar

Com Node 24.22.2 e npm 11.19.1 disponíveis, execute:

```sh
npm ci
npm run build
npm run storybook
```

Acesse `http://localhost:6006` para o exemplo de introdução. O catálogo de componentes ainda não foi implementado. Consulte o [ambiente de desenvolvimento](docs/development.md) para tipos, build estático, contraste e limitações de validação.

## Documentação e contribuição

A [arquitetura](docs/architecture.md) é a referência técnica permanente. Consulte também a proposta de [tokens, acessibilidade e i18n](docs/design-guidelines.md). O processo de contribuição ainda não foi definido; as convenções técnicas propostas estão descritas nesse documento.
