# REQ-01 — Definir requisitos e arquitetura da ChadVue

## Objetivo

Documentar objetivos, limites, responsabilidades e decisões técnicas da biblioteca.

## Descrição

Manter a definição técnica na [arquitetura](../../docs/architecture.md), separada do acompanhamento. Preservar a rastreabilidade da definição inicial, sem implementar componentes ou infraestrutura de Storybook.

Cartão registrado anteriormente: https://trello.com/c/ag6RaAlo.

## Critérios de aceitação

- [x] Objetivo e limites do MVP definidos e revisados.
- [x] Necessidades funcionais e não funcionais documentadas e revisadas.
- [x] Arquitetura e responsabilidades dos módulos descritas e revisadas.
- [x] Estrutura inicial de diretórios proposta e revisada.
- [x] Convenções de componentes e contratos públicos estabelecidos, distinguindo pendências.
- [x] Decisões pendentes identificadas para validação nas próximas tarefas.
- [ ] Documento revisado, versionado no Git e referenciado no cartão de origem.

## Entregáveis esperados

Documento arquitetural permanente e registro de revisão das propostas e decisões.

## Evidências de implementação e validação

- Em 2026-11-08, o documento inicial foi reorganizado em `docs/architecture.md`, preservando objetivos, escopo, responsabilidades, contratos, verificações técnicas previstas e pendências.
- `README.md` e `AGENTS.md` foram ajustados e os tickets foram criados para separar documentação de acompanhamento.
- A entrega é documental; não comprova execução de Vue, Storybook, testes ou componentes.
- Verificação documental em 2026-11-08: script PowerShell com `Get-ChildItem`, expressão regular de links Markdown e `Test-Path` verificou 14 links locais, sem destinos ausentes. Buscas com `rg -n -i` em `docs/` e `README.md` não encontraram referências de gestão ou acadêmicas; `rg -n` em todos os Markdown não encontrou o caminho antigo. Esses resultados validam a reorganização documental, sem aprovar decisões técnicas ou concluir o ticket.
- A reorganização documental está versionada no commit [`1a1a721`](https://github.com/otavioP1/chadvue/commit/1a1a721), enviado para `origin/main`. O Git foi localizado em `C:/Program Files/Git/cmd/git.exe`; a limitação anterior era de `PATH`.
- Evidência complementar sugerida: captura da arquitetura e do índice de tickets após revisão.

## Status

Entrega arquitetural concluída e aprovada pelo mantenedor em 2026-11-08. Encerramento administrativo pendente da referência à revisão no cartão de origem; o último critério permanece desmarcado até essa evidência existir. A implementação e a validação técnica pertencem às tarefas seguintes.

## Revisão do REQ-01

Em 2026-11-08, a revisão local identificou que o documento cobre objetivo, limites, capacidades funcionais, qualidades técnicas, estrutura proposta e responsabilidades. Foram acrescentadas opções para decisões pendentes, contrato mínimo de documentação de componentes e limites de dependência entre módulos. As adições foram posteriormente revisadas e aprovadas pelo mantenedor, sem implementar componentes ou configurar ferramentas.

| Critério | Evidência na arquitetura | Pendência |
| --- | --- | --- |
| Objetivo e limites | Objetivos e princípios; Escopo inicial previsto | Aprovado; seleção do catálogo permanece decisão futura explícita |
| Necessidades funcionais e não funcionais | Capacidades funcionais previstas; Qualidades técnicas esperadas | Aprovados como requisitos; validação de execução futura |
| Arquitetura e responsabilidades | Organização e responsabilidades dos módulos; Limites e dependências entre módulos | Limites aprovados pelo mantenedor; aplicação futura a validar |
| Estrutura inicial | Estrutura do projeto | Estrutura referencial aprovada; validar ferramentas no REQ-03 |
| Convenções e contratos | Padrões de desenvolvimento de componentes; Contrato mínimo para cada componente | Padrão aprovado e nomes sem prefixo; importação pela entrada principal aprovada |
| Decisões pendentes | Tecnologias e ferramentas; Decisões ainda não validadas; Decisões aprovadas | Escolhas antes das implementações correspondentes |
| Versionamento e cartão | Commit da reorganização acima e cartão na descrição | Versionar esta revisão e confirmar referência no cartão |

### Verificações executadas nesta revisão

- Script PowerShell com `Get-ChildItem`, expressão regular de links Markdown e `Test-Path`: 17 links locais verificados, nenhum destino ausente.
- `git diff --check`: sem erros de espaços ou linhas em branco; apenas avisos de conversão futura de LF para CRLF.
- `rg -n -i 'trello|REQ-\d|sprint|acad[eê]mic|pós-graduação|projeto aplicado' docs README.md`: nenhuma ocorrência.
- Builds e testes de código não se aplicam à entrega documental e não foram executados.

### Escopo das próximas tarefas

O detalhamento de tokens, acessibilidade e i18n pertence ao [REQ-02](REQ-02.md); ambiente e compatibilidade ao [REQ-03](REQ-03.md); configuração do Storybook ao [REQ-04](REQ-04.md). Aprovar a documentação arquitetural não comprova execução dessas tarefas. Nenhuma alteração foi enviada ao Trello nesta revisão.

### Decisões confirmadas pelo mantenedor

Em 2026-11-08, o mantenedor aprovou os limites entre módulos e o contrato mínimo dos componentes, escolheu npm, Vite, nomes sem prefixo `Cv` e idioma em contexto compartilhado Vue. A arquitetura foi atualizada; README e instruções dos agentes foram alinhados. Essas decisões não comprovam configuração ou execução das ferramentas.

O mantenedor aprovou exportações nomeadas pela entrada principal. A arquitetura foi atualizada, sem incluir subcaminhos por componente no contrato inicial. Os exemplos não definem o catálogo de componentes. A implementação e a validação de tipos, estilos e empacotamento permanecem futuras.

### Aprovação final da definição arquitetural

Em 2026-11-08, o mantenedor aprovou o documento como arquitetura inicial, incluindo objetivos, limites, capacidades, qualidades técnicas e estrutura referencial, mantendo as decisões futuras explicitamente registradas. Autorizou commit e push na `main`. Os seis critérios documentais foram marcados com base no documento revisado e nessa aprovação.

O commit de fechamento deve ser identificado no histórico pela mensagem `docs: aprova arquitetura inicial e registra entrega do REQ-01`. Após o push, seu link poderá ser usado no cartão e no relatório. A atualização do Trello não foi executada nem presumida.
