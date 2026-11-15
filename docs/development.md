# Ambiente de desenvolvimento

## Estado e versões

O ChadVue possui tema claro, quatro componentes (`Button`, `TextField`, `Checkbox`, `Dialog`), contexto de idioma e Storybook com exemplos individuais e integrados. O pacote é privado (`private: true`), com consumo local por ESM; não foi publicado em registro.

Ambiente executado: Windows x64, Node.js 24.22.2 e npm 11.19.1. `.nvmrc`, `packageManager` e `engines` registram a base aprovada. O intervalo aceito não significa que todas as suas versões foram testadas.

| Ferramenta | Versão fixada | Finalidade |
| --- | --- | --- |
| Vue | 3.5.45 | Framework e peer dependency |
| TypeScript | 6.0.3 | Tipagem estrita |
| vue-tsc / vue-component-meta | 3.3.14 | Verificação, declarações e documentação Vue |
| Vite | 8.3.6 | Build ESM e CSS |
| @vitejs/plugin-vue | 6.0.10 | Processamento de arquivos Vue |
| Tailwind CSS / @tailwindcss/vite | 4.3.5 | Utilitários `tw:` compilados no CSS distribuído |
| @lucide/vue | 1.73.0 | Ícones SVG Vue tree-shakable (dependência de execução) |
| Storybook / addon-docs / vue3-vite | 10.6.6 | Documentação interativa |
| Vitest | 5.1.0 | Testes unitários |
| Vue Test Utils | 2.4.11 | Montagem e interação com componentes |
| jsdom | 31.0.1 | DOM simulado para testes |
| Playwright Test | 1.65.1 | Navegador, teclado e capturas |
| axe-core | 4.14.0 | Regras automatizadas de acessibilidade |

Vue é peer dependency fornecida pela aplicação. `@lucide/vue` é dependência de execução e permanece externalizada no ESM. Tailwind CSS e seu plugin Vite são dependências de desenvolvimento; os utilitários `tw:` são compilados em `chadvue/style.css`, sem exigir Tailwind na aplicação consumidora. O pacote importa tema e utilities sem Preflight global. Ferramentas e testes restantes são dependências de desenvolvimento. Overrides de dependências transitivas e limites de validação estão em [qualidade](quality.md).

## Instalação e comandos

```sh
npm ci
npm run check
npm run check:package
npm run storybook
```

No PowerShell, se a política bloquear `npm.ps1`, use `npm.cmd` sem mudar a política global. Git no PATH permite ao Storybook detectar alterações do repositório. Pare servidores que estejam usando as dependências antes de executar `npm ci`, para evitar bloqueios de executáveis no Windows.

`check` reúne links da documentação, contraste, testes unitários e build com tipos. `build` gera `dist/chadvue.js`, `dist/chadvue.css`, `dist/index.d.ts` e declarações auxiliares. `check:package` valida as declarações pela entrada principal e renderiza o bundle com Vue SSR. A publicação e outros formatos de distribuição não estão configurados.

## Uso local

Após construir o pacote, a entrada principal exporta componentes, provedor e utilitários; estilos precisam ser importados explicitamente:

```ts
import { Button, TextField, Checkbox, Dialog, LocaleProvider } from 'chadvue'
import 'chadvue/style.css'
```

Esse exemplo descreve consumo local do pacote, não instalação de versão publicada. Contratos e exemplos em [componentes](components.md) e [internacionalização](internationalization.md).

## Storybook

`npm run storybook` inicia na porta 6006, sem abrir navegador. Acesse `http://localhost:6006`. A introdução anterior foi preservada; use **Componentes** para exemplos individuais e **Exemplos / Integração** para tema, formulário, modal e troca de idioma. A página de integração tem rota estável `/?path=/story/chadvue-showcase--playground`.

`npm run build-storybook` gera `storybook-static/`. A configuração usa `@storybook/vue3-vite`, docs e extração por `vue-component-meta`. O preview define português como idioma inicial e o cenário integrado marca com o idioma selecionado os formatos e textos internos traduzidos, preservando português para o conteúdo editorial. Textos editoriais do exemplo pertencem à aplicação de demonstração.

## Testes de navegador

`npm run test:browser` gera o Storybook e testa sua versão estática na porta 6016. Use o Chromium instalado pelo Playwright ou a variável `CHADVUE_BROWSER_PATH` para um Chrome existente. Veja [qualidade](quality.md) para comandos, cenários e artefatos. Os servidores de teste não publicam o site na internet.

## Estrutura real

```text
src/
├── components/       # controles e provedor LocaleProvider
├── composables/      # contexto e formatação de idioma
├── locales/          # catálogos português e inglês
├── styles/           # estilos e tokens semânticos
└── index.ts          # exportações nomeadas e entrada CSS
stories/              # stories individuais e cenário integrado
.storybook/           # configuração e preview
tests/
├── unit/             # contratos, estados e i18n
├── browser/          # teclado, foco, axe e capturas
└── consumer/         # consumo das declarações emitidas
scripts/              # contraste, consumo ESM/SSR e servidor estático local
```

`node_modules/`, `.npm-cache/`, `dist/`, `storybook-static/`, `test-results/` e `playwright-report/` são locais e ignorados. Fontes, manifesto, lockfile e configurações são versionáveis.

## Referências

- [Vite — modo biblioteca](https://vite.dev/guide/build.html#library-mode).
- [Storybook para Vue e Vite](https://storybook.js.org/docs/get-started/frameworks/vue3-vite).
- [Vue — provide/inject](https://vuejs.org/guide/components/provide-inject.html).
- [Vitest](https://vitest.dev/guide/).
- [Playwright — servidor de testes](https://playwright.dev/docs/test-webserver).
