# Qualidade e validação

## Comandos

```sh
npm ci
npm run check
npm run check:package
npm run test:browser
```

`check` executa links da documentação, contraste, testes unitários e build com verificação de tipos. `check:package` executa build, valida as declarações pela entrada pública com TypeScript, renderiza os componentes do bundle ESM com Vue SSR e verifica os utilitários compilados, ícones Lucide e ausência de Preflight global no CSS distribuído. O pacote continua privado; nenhum desses comandos publica artefatos.

## Testes unitários

`npm test` usa Vitest, Vue Test Utils e jsdom. São 14 testes: botão nativo, variantes/tamanho de ícone/disabled e composição de estado ocupado, rótulos e relações de erro, IDs distintos, modelos string/booleano, segurança do nome acessível localizado, atualização reativa, contexto padrão/isolado, traduções ausentes, formatos e ausência de colisões com propriedades herdadas do JavaScript.

O DOM simulado não comprova navegação por teclado nem foco nativo do modal; esses comportamentos são verificados em navegador real. Não há métrica de cobertura configurada; a quantidade de testes não representa cobertura percentual.

## Testes em navegador

`npm run test:browser` constrói o Storybook e executa oito cenários Playwright sobre o build estático, com servidor local na porta 6016. A porta pode ser alterada por `CHADVUE_TEST_PORT`. O servidor de desenvolvimento na porta 6006 não é reutilizado pelos testes. Isso evita conflitos e recargas de desenvolvimento durante capturas e auditorias.

Para o Chromium do Playwright, disponibilize o navegador com `npx playwright install chromium`. Para usar um Chrome instalado, sem baixar navegador adicional, defina no PowerShell:

```powershell
$env:CHADVUE_BROWSER_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm.cmd run test:browser
```

No Git Bash:

```sh
CHADVUE_BROWSER_PATH='C:/Program Files/Google/Chrome/Application/chrome.exe' npm run test:browser
```

| Cenário | Verificações |
| --- | --- |
| Tema | Cores computadas, hover, sobrescrita por contêiner e preservação do valor raiz |
| Formulário | Digitação, Tab, Espaço no checkbox customizado, modelo, desabilitado, erro associado, campo de 32 px e foco suave |
| Modal | Nome, foco inicial, Tab e Shift+Tab, Escape, fechamento pelo botão e retorno ao acionador |
| Idioma | Texto interno em inglês, formatos, nome Fechar, valor e foco preservados |
| Integração | axe, captura completa e ausência de overflow horizontal a 320 px |
| Regressão documental | Índice com os quatro componentes e introdução anterior |
| Button | Variantes `primary`, `secondary`, `outline`, `danger`, `size="icon"` de 32 px e espera composta no slot |
| Exemplos de código | Todos os painéis `Show code` de Button, Checkbox, TextField, Dialog e Introdução conferidos contra os exemplos renderizados |

São feitas três auditorias axe: formulário com erro, modal aberto e integração inicial, usando tags WCAG 2 A/AA, 2.1 AA e 2.2 AA. O resultado da execução validada foi zero violações nessas auditorias. O contraste da descrição do modal foi marcado como incompleto pelo axe devido à sobreposição nativa. Foi revisado por cores computadas (texto sobre branco), cálculo de razão, hit-test de visibilidade e inspeção da captura; o JSON original continua preservado como incompleto. Outros resultados incompletos inesperados fazem o teste falhar. Não há declaração de conformidade WCAG completa, teste manual com leitor de tela ou matriz completa de navegadores.

## Artefatos e reprodução

Resultados e traces ficam em `test-results/`, ignorado pelo Git. A execução usa reporter JSON em `test-results/browser-results.json`. Para guardar capturas e JSON axe em outro diretório local, defina `CHADVUE_EVIDENCE_DIR` antes dos testes. A pasta deve ser externa aos arquivos distribuídos; seu conteúdo não entra no pacote.

`npm test -- --reporter=default --reporter=json --outputFile=test-results/unit-results.json` também produz um relatório unitário estruturado. Imagens são capturas reais, não ilustrações geradas. Elas documentam os cenários executados e não substituem os asserts.

## Contraste e fidelidade de tokens

`npm run check:contrast` confere os tokens de cor CSS contra o [catálogo](design-guidelines.md) e calcula 31 pares de contraste, incluindo estados `danger`, seus fundos de ação e texto disabled sobre superfície disabled. A razão é comparada antes de arredondar para exibição. Alterações em tokens exigem repetir cálculo e verificar estados/fundos reais; transparência e fundos diferentes não são inferidos pela tabela.

## Dependências e limitações

As ferramentas de teste são dependências de desenvolvimento, sem novas dependências de execução além de Vue como peer. A auditoria npm identificou alertas transitivos na cadeia de formatação de Vue Test Utils. As versões estão fixadas e os overrides de `js-beautify` para `glob` 14.0.6 e `editorconfig` 4.0.1 removem essa cadeia vulnerável; os testes incluem formatação de HTML pelo test-utils. Reavaliar esses overrides quando a origem corrigir suas dependências.

`npm audit` da instalação validada reportou zero vulnerabilidades naquele momento; isso não garante ausência futura de avisos. O build do Storybook pode emitir avisos de chunks maiores que 500 kB e tempos de plugins. Esses avisos não são falhas de build.

No Windows, pare servidores que usam `node_modules` antes de `npm ci`: executáveis abertos podem bloquear a reinstalação com `EPERM`. Em ambientes restritos, builds ou navegador podem exigir permissões de processo/diretórios. Não contornar as restrições alterando políticas globais.

Não há lint dedicado configurado. A análise estática atual é TypeScript estrito com `vue-tsc`, aplicada também aos testes e configurações. Firefox, Safari, leitores de tela e múltiplas versões de Vue/Node continuam fora do alcance da execução registrada.
