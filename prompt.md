# Prompt — evidências e orientação do relatório da Sprint 2

Atue no repositório ChadVue. Gere as evidências locais da Sprint 2 e um guia `tickets/sprint-02/como-preencher-relatorio.local.md`, seguindo o formato e o cuidado factual usados em `tickets/sprint-01/como-preencher-relatorio.local.md`.

## Antes de produzir arquivos

1. Leia integralmente:
   - `tickets/sprint-01/como-preencher-relatorio.local.md`;
   - `tickets/sprint-01/REQ-01.md` a `REQ-04.md`, especialmente as seções de evidências;
   - `tickets/sprint-02/README.md` e `REQ-05.md` a `REQ-08.md`;
   - `tickets/sprint-02/gerar-resumo.local.mjs`;
   - a documentação e os relatórios de teste relacionados às afirmações que pretende registrar.
2. Inspecione os arquivos existentes em `tickets/sprint-02/evidencias/`, `test-results/` e demais locais de resultados. Confirme se os artefatos ainda correspondem ao código atual antes de reutilizá-los.
3. Verifique o estado atual do Git, comandos disponíveis no `package.json`, versões instaladas e a configuração do Storybook/Playwright. Não suponha resultados só porque um ticket ou README os declara.

## Entregas locais

Crie, sem alterar Trello, commits, push ou publicação:

- `tickets/sprint-02/evidencias/`: arquivos de evidência reproduzíveis, como logs reais de comandos, relatórios JSON de testes/auditorias, capturas do Storybook e páginas HTML/PNG de planejamento e resultados, conforme os dados disponíveis;
- `tickets/sprint-02/como-preencher-relatorio.local.md`: texto pronto para copiar e adaptar ao relatório, no mesmo arranjo da Sprint 1: planejamento, execução de cada requisito, resultados de cada requisito e retrospectiva;
- dados auxiliares necessários para executar o gerador local já existente. Prefira adaptar `gerar-resumo.local.mjs` se ele estiver defasado ou incompleto, evitando manter números ou arquivos de entrada que não correspondam ao estado real.

Mantenha os documentos e evidências temporários dentro de `tickets/sprint-02/`. Não copie esses conteúdos para `docs/` ou `README.md`. Não altere os tickets para declarar aprovação/conclusão nova apenas para tornar o relatório mais favorável.

## Estrutura do guia do relatório

Use português brasileiro e placeholders `Figura X` para a numeração final. Para cada figura, diga precisamente qual tela ou comando abrir, o que deve estar legível e qual afirmação a imagem comprova. Não peça capturas de estados fictícios nem sugira alterar status no Trello para produzir imagens.

Inclua estas partes:

1. **Planejamento da Sprint 2:** os quatro cartões de origem e sua sequência. Use o registro local e os links de origem nos tickets. Se for necessária uma captura do Trello, instrua a capturar o estado real, sem fazer alterações remotas. Distinga IDs dos cartões remotos dos IDs REQ-05 a REQ-08, que são acompanhamento local.
2. **Execução por requisito:**
   - REQ-05: tokens/tema, personalização por contêiner, paleta e contraste;
   - REQ-06: Button, TextField, Checkbox e Dialog, contratos, estados e teclado/foco;
   - REQ-07: locale pt-BR/en-US, fallback, mensagens/formatos e preservação de valor/foco;
   - REQ-08: stories, cenário integrado, testes, builds, evidências e regressões.
3. **Resultados por requisito:** associar afirmações a artefatos e verificações específicas, com comando, resultado observado, link relativo e captura correspondente quando houver.
4. **Retrospectiva:** registrar aprendizados observáveis, correções realizadas e limitações; não transformar retrospectiva em alegação de conformidade geral.

## Regras de exatidão

- Execute as verificações necessárias para gerar evidências atualizadas. Salve a saída real, códigos de saída e data/ambiente quando disponíveis; não invente logs, capturas, aprovações, links de commits ou resultados. Se uma verificação não puder ser executada, registre por que e deixe a afirmação pendente.
- Para capturas, renderize as telas reais no Storybook/navegador e confira os arquivos gerados. Não afirme inspeção visual sem abrir/inspecionar as capturas. Sempre que possível, produza também os JSONs originais que apoiam os resumos.
- Recalcule e confira números de tokens, pares de contraste, testes e auditorias a partir dos arquivos atuais. Há registros históricos na Sprint 2 com contagens e descrição visual antigas; eles não são fonte suficiente para números finais.
- Incorpore o refinamento visual posterior à implementação inicial: primário em carvão escuro, verde reservado a sucesso e acentos de foco, raios pequenos, Button e TextField compactos de 32 px, variantes `primary`, `secondary`, `outline` e `danger`, estado `disabled`, tamanho `icon`, foco suave no TextField, Checkbox customizado e fechamento de Dialog alinhado. O contrato atual do Button não tem prop `loading`; o exemplo de espera usa composição pelo consumidor com ícone, `disabled` e `aria-busy`, sem texto “Carregando…”. Verifique o código atual antes de descrever cada ponto.
- Não declare tema escuro se não estiver implementado/aprovado. Não declare conformidade WCAG completa, auditoria manual de leitor de tela, validação em outros navegadores ou aprovação geral do mantenedor sem evidência direta.
- Preserve resultados `incomplete` do axe e documente qualquer revisão complementar com método e limites; não os reclassifique silenciosamente como aprovação do axe.
- Diferencie implementação, validação técnica, inspeção visual e aprovação do mantenedor. Resultado de build, isoladamente, não comprova comportamento visual ou acessibilidade.
- Revise links relativos, ortografia e consistência das datas. Registros são locais e ignorados pelo Git conforme as instruções do projeto; não remova nem altere essa política.

## Fechamento da tarefa

Confira se cada figura citada existe, se os links internos abrem, se o resumo foi gerado a partir das entradas reais e se o texto bate com os tickets, código e resultados atuais. Registre no guia as limitações e pendências. Ao concluir, informe os arquivos criados/atualizados, comandos executados, resultados observados e quaisquer verificações ou capturas que permanecerem pendentes. Não marque critérios ou aprovação que não tenham evidência verificável.
