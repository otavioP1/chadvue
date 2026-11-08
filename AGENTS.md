# Instruções para agentes — ChadVue

## Contexto e fontes de verdade

ChadVue é uma biblioteca de componentes reutilizáveis para Vue 3 e TypeScript, inspirada em princípios de ergonomia e design do Material UI, sem copiar automaticamente suas APIs.

- `docs/` é a fonte de verdade da documentação técnica e funcional permanente. Consulte a [arquitetura](docs/architecture.md).
- `tickets/` contém planejamento e acompanhamento temporário local, fora do versionamento. Consulte `tickets/README.md` quando disponível; clones públicos não incluem essa pasta.
- `README.md` apresenta o produto e direciona para a documentação técnica.

Antes de implementar, consulte o ticket correspondente quando disponível e a documentação técnica relevante. Em caso de conflito, explique-o e solicite confirmação, sem inventar decisões. Se não houver ticket local, use a solicitação como referência de escopo e explicite qualquer proposta de ampliação antes de criar ou alterar o acompanhamento.

## Princípios técnicos

Ao se referir ao projeto como design system, use o masculino: **o ChadVue**, **do ChadVue**, **no ChadVue**. O feminino continua correto quando se refere explicitamente à biblioteca ou à arquitetura.

Preserve as diretrizes de modularidade, TypeScript, Composition API, contratos públicos claros, tokens semânticos, acessibilidade, internacionalização, Storybook e testabilidade descritas na arquitetura. Propostas pendentes não são decisões confirmadas nem funcionalidades implementadas.

## Regras para alterações

1. Antes de editar, apresente brevemente o plano e os arquivos afetados.
2. Prefira mudanças pequenas e relacionadas à tarefa solicitada; não antecipe outras tarefas.
3. Preserve APIs públicas e padrões existentes. Apresente opções antes de consolidar decisões pendentes.
4. Evite novas dependências sem justificativa. Use npm, conforme decisão aprovada; verifique as versões adotadas e não introduza outro gerenciador ou arquivo de lock sem confirmação.
5. Não declare testes, builds, acessibilidade ou funcionalidades validados sem executar as verificações correspondentes.
6. Reflita mudanças arquiteturais em `docs/architecture.md` e mudanças de comportamento público na documentação técnica pertinente.
7. Evite duplicar informações: tickets devem apontar para a documentação técnica, sem reproduzi-la integralmente.
8. Não introduza referências acadêmicas, Trello, identificadores de tarefas ou gerenciamento de sprints em `docs/` e no `README.md`. Planejamento e evidências pertencem a `tickets/`.
9. Atualize links relativos afetados e mantenha português brasileiro e terminologia consistente.

## Conclusão e evidências

Ao concluir uma tarefa, atualize seu ticket com arquivos entregues, comandos executados, resultados reais, limitações e pendências. Registre commit e referência externa quando disponíveis; não invente evidências. Capturas e demonstrações podem complementar as verificações.

Não marque critérios nem declare conclusão de tarefas sem evidências verificáveis. Diferencie entrega documental, aprovação de decisões e validação de implementação. No relato final, informe arquivos alterados, verificações e pendências.

Tarefas de definição arquitetural não autorizam criar componentes ou configurar ferramentas sem solicitação explícita.
