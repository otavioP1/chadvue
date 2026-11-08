# Ambiente de desenvolvimento

## Estado e versões

A base Vue/TypeScript e o Storybook estão configurados. A entrada pública ainda não exporta componentes de produto. O pacote é privado (`private: true`) e não está preparado para publicação pública.

Ambiente executado: Windows x64, Node.js 24.22.2 e npm 11.19.1. `.nvmrc`, `packageManager` e `engines` registram essa base. A política proposta restringe o desenvolvimento a Node 24 e npm 11 a partir dessas versões; depende de revisão do mantenedor e não representa teste de todas as versões aceitas pelo intervalo.

| Ferramenta | Versão fixada | Finalidade |
| --- | --- | --- |
| Vue | 3.5.45 | Framework de desenvolvimento e dependência peer da biblioteca |
| TypeScript | 6.0.3 | Tipagem estática |
| vue-tsc | 3.3.14 | Verificação de Vue/TypeScript e declarações de tipos |
| Vite | 8.3.6 | Build em modo biblioteca |
| @vitejs/plugin-vue | 6.0.10 | Processamento de arquivos Vue |
| @types/node | 24.19.2 | Tipos do ambiente de ferramentas |
| Storybook e integração Vue/Vite | 10.6.6 | Desenvolvimento isolado e build da documentação |
| @storybook/addon-docs | 10.6.6 | Documentação automática e exemplos |

`vue-component-meta` é dependência de desenvolvimento direta para extrair documentação de componentes Vue; sua versão exata está no manifesto e no lockfile. Nenhuma ferramenta do Storybook é dependência de execução da biblioteca. Vue é externalizado no build e fornecido pela aplicação consumidora. Apenas Vue 3.5.45 foi executado; compatibilidade com outras versões não foi demonstrada.

## Instalação e comandos

Com Node e npm no `PATH`, na raiz do repositório:

```sh
npm ci
npm run typecheck
npm run build
npm run check:contrast
npm run storybook
```

No PowerShell, se a política de execução bloquear `npm.ps1`, utilize `npm.cmd` com os mesmos argumentos. Não é necessário alterar a política de execução. Git no `PATH` permite ao Storybook detectar alterações do repositório.

`npm ci` instala exatamente o lockfile. `npm run build` verifica tipos, gera o módulo ESM e emite declarações TypeScript. Os artefatos são `dist/chadvue.js` e `dist/index.d.ts`; no estado atual, a entrada é vazia intencionalmente.

`npm run check:contrast` lê os valores diretamente da tabela de [tokens](design-guidelines.md), calcula os 20 pares de texto/borda, dois pares de foco e três de conteúdo sobre a ação principal, e retorna erro se algum falhar. Não é auditoria de componentes.

## Storybook

`npm run storybook` inicia o servidor na porta 6006, sem abrir navegador automaticamente. Acesse `http://localhost:6006` e selecione **Documentação / Introdução**. O exemplo usa um arquivo Vue com prop tipada e documentação automática, sem integrar o catálogo público.

```sh
npm run build-storybook
```

O comando gera `storybook-static/`. A configuração usa `@storybook/vue3-vite` e extração por `vue-component-meta`, sem recorrer à opção depreciada de docgen. O preview define `lang="pt-BR"`; seu texto é conteúdo documental, sem implementar o sistema de internacionalização da biblioteca.

## Estrutura real

```text
.storybook/           # configuração, preview e idioma do documento
src/index.ts          # entrada pública reservada, sem componentes
stories/              # exemplo documental Vue e story
scripts/              # verificação de contraste da proposta de tokens
vite.config.ts        # build ESM e externalização do Vue
tsconfig.json         # verificação de fontes, stories e configurações
tsconfig.build.json   # emissão de declarações apenas de src/
package.json          # scripts, versões e contrato local do pacote
package-lock.json     # instalação reproduzível
```

`node_modules/`, `.npm-cache/`, `dist/` e `storybook-static/` são locais e ignorados pelo Git. Os módulos de componentes, composables, tokens e locales descritos na [arquitetura](architecture.md) continuam referenciais até serem implementados.

## Alcance da validação

Foram executados instalação limpa pelo lockfile, checagem de tipos, build ESM com declarações, importação da entrada em Node, inspeção do pacote com `npm pack --dry-run`, build estático e inicialização do Storybook. O servidor respondeu HTTP 200 em `/`, `/iframe.html` e `/index.json`; o índice contém a story e a página de documentação.

Esses testes não comprovam renderização visual, acessibilidade, navegação por teclado ou i18n de componentes. Não foram adicionados testes de funcionalidades inexistentes.

O build estático apresenta aviso de bundles acima de 500 kB, referente ao ambiente de documentação. npm informa um script de instalação do esbuild não autorizado em sua política de scripts; as ferramentas funcionaram no ambiente validado com os binários opcionais instalados, sem aprovar execução adicional desse script. Outras plataformas ainda precisam ser verificadas.

## Referências

- [Vite — início](https://vite.dev/guide/).
- [Vite — modo biblioteca](https://vite.dev/guide/build.html#library-mode).
- [Storybook para Vue e Vite](https://storybook.js.org/docs/get-started/frameworks/vue3-vite).
- [Node.js — downloads oficiais](https://nodejs.org/en/download).
