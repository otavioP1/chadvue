# Componentes e API pública

O catálogo inicial do ChadVue contém `Button`, `TextField`, `Checkbox` e `Dialog`. Os componentes usam Composition API e TypeScript, sem registro global obrigatório. `LocaleProvider` é um provedor de contexto, não um controle visual.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, TextField, Checkbox, Dialog, LocaleProvider } from 'chadvue'
import 'chadvue/style.css'
const name = ref('')
const accepted = ref(false)
const open = ref(false)
</script>

<template>
  <LocaleProvider locale="pt-BR">
    <TextField v-model="name" label="Nome" autocomplete="name" />
    <Checkbox v-model="accepted" label="Aceito os termos" />
    <Button @click="open = true">Revisar</Button>
    <Dialog v-model:open="open" title="Revisar informações">
      <p>{{ name }}</p>
      <template #footer><Button @click="open = false">Confirmar</Button></template>
    </Dialog>
  </LocaleProvider>
</template>
```

Os imports descrevem o pacote construído localmente; não indicam disponibilidade em um registro público. Consulte [desenvolvimento](development.md).

## Button

Elemento nativo `button` para ações, sem simular link ou navegação.

| Prop | Tipo | Padrão / obrigação |
| --- | --- | --- |
| `type` | `button`, `submit`, `reset` | `button`, evitando submissão involuntária |
| `variant` | `primary`, `secondary`, `outline`, `danger` | `primary` |
| `size` | `default`, `icon` | `default` |
| `disabled` | boolean | `false` |

Slot padrão: conteúdo do botão. Atributos e listeners nativos, inclusive `click` e `aria-busy`, são encaminhados ao botão. `size="icon"` cria uma caixa quadrada de 32 px; forneça também nome acessível. O ChadVue não controla o estado de carregamento: componha um indicador no slot e use `disabled`/`aria-busy` conforme o fluxo da aplicação. `disabled` permanece um estado aplicável a todas as variantes, não uma variante visual independente. O comportamento de teclado e bloqueio é nativo: Enter/Espaço ativam; controles inativos não entram na sequência Tab.

A demonstração usa `LoaderCircle` do Lucide e as classes compiladas `tw:size-3.5`, `tw:animate-spin` e `motion-reduce:tw:animate-none`; a aplicação não precisa instalar Tailwind para usar essas classes após importar `chadvue/style.css`. Se o produto já usa Tailwind, as mesmas classes seguem o prefixo isolado `tw:` do ChadVue.

Fornecer texto perceptível ou nome acessível quando houver apenas ícone. Não há navegação via prop `href`, nem evento de negócio próprio. Tokens: família `primary`, `on-primary`, `surface`, `canvas`, `text`, `border`, `focus` e `disabled-*`. A apresentação usa altura mínima de 32 px, peso 600, raio de 3 px e transições curtas. Testes verificam clique, tipo padrão, variantes, estado disabled e foco visível.

## TextField

Campo nativo de linha única, com rótulo obrigatório e valor string.

| Prop | Tipo | Padrão / obrigação |
| --- | --- | --- |
| `label` | string | Obrigatória, não vazia |
| `modelValue` | string | `''`; usar `v-model` |
| `id` | string | Gerado com `useId` quando omitido |
| `type` | `text`, `email`, `password`, `search`, `tel`, `url` | `text` |
| `placeholder` | string | Ausente |
| `error` | string | Ausente; texto não vazio ativa estado inválido |
| `disabled`, `required` | boolean | `false` |

Evento `update:modelValue(value: string)` ao receber `input`. Sem slots. A prop `placeholder` é aplicada ao atributo nativo do input. Atributos como `name`, `autocomplete`, `maxlength`, `readonly` e listeners são encaminhados ao input, não ao contêiner. Não há prop `description` nem texto de ajuda separado. `aria-describedby` externo é combinado com a mensagem de erro, quando presente. A aplicação define regras de validação; o componente não deduz erros nem traduz textos fornecidos pelo consumidor.

O rótulo é associado por `for`; erro ativa `aria-invalid` e é associado por ID. Para `type="password"`, o campo inclui um controle acessível para mostrar/ocultar o valor; o nome do controle acompanha o idioma do ChadVue (`pt-BR`/`en-US`), e o tipo/nome alternam sem recriar o input nem apagar o valor. Não anuncia automaticamente cada alteração como alerta: a aplicação define a estratégia de anúncios conforme seu fluxo. Tokens: `surface`, `text`, `border`, `text-muted`, `danger`, `focus`, `disabled-*`. Campo e botão compartilham altura mínima de 32 px e raio de 3 px; o campo usa contorno discreto em repouso e foco com borda verde e halo suave, mantendo erro com borda e mensagem. Testes existentes verificam IDs distintos, associação, atualização do modelo, remoção de erro e teclado.

## Checkbox

Input nativo de seleção booleana; não implementa grupo nem estado indeterminado.

| Prop | Tipo | Padrão / obrigação |
| --- | --- | --- |
| `label` | string | Obrigatória, não vazia |
| `modelValue` | boolean | `false`; usar `v-model` |
| `id` | string | Gerado com `useId` |
| `disabled`, `required` | boolean | `false` |

Evento `update:modelValue(value: boolean)` em `change`. Sem slots; demais atributos/listeners são encaminhados ao input. Espaço alterna a seleção e o rótulo é clicável; `checked`, `disabled` e `required` usam semântica nativa sem ARIA redundante. A caixa visual de 16 px tem borda, preenchimento e marca próprios; o alvo de interação continua com 40 px de altura. Em forced colors, o estilo nativo do sistema é restaurado. Verificações cobrem associação, estado, booleano emitido e operação por teclado.

## Dialog

Modal controlado por `v-model:open`, com elemento nativo `dialog` aberto por `showModal()`. Requer navegador com suporte a essa API; não há polyfill nem modal não bloqueante.

| Prop | Tipo | Padrão / obrigação |
| --- | --- | --- |
| `open` | boolean | `false` |
| `title` | string | Obrigatória, não vazia |
| `description` | string | Ausente |

Eventos: `update:open(false)` solicita fechar por Escape ou botão; `close()` informa fechamento nativo efetivo. A aplicação deve sincronizar `open`, preferencialmente com `v-model:open`. Slots: padrão para conteúdo e `footer` para ações. O título dá nome acessível; a descrição opcional é associada por ID. Fechar tem texto acessível traduzível.

Ao abrir, o foco inicia no botão Fechar, que usa o tamanho quadrado de ícone de 32 px do Button. Tab/Shift+Tab circulam pelos controles habilitados visíveis; o plano de fundo fica inerte pelo modal nativo. Ao fechar, restaura-se o foco ao acionador ainda conectado. Fechamento por clique no backdrop não é implementado. Não alterar `tabindex` dos controles para valores positivos; modais aninhados, portais internos e widgets com foco gerenciado exigem avaliação adicional e não fazem parte do contrato inicial.

Tokens: `surface`, `text`, `border`, `focus`, `backdrop`, `radius-lg` e `shadow-dialog`. O backdrop escurece o conteúdo sem alterar suas mensagens; a superfície usa elevação sutil e largura limitada. O cabeçalho tem hierarquia tipográfica própria, botão fechar discreto e ações alinhadas ao fim. Testes em Chrome verificam nome, foco inicial, ciclo nos dois sentidos, Escape, botão Fechar e retorno ao acionador; axe verifica o modal aberto.

## Idioma e personalização

`LocaleProvider`, `createI18n`, `provideI18n`, `useI18n`, `i18nKey`, `ptBR`, `enUS` e tipos relacionados são exportados na entrada principal. Detalhes em [internacionalização](internationalization.md). CSS é uma entrada explícita `chadvue/style.css`; personalizar valores em contêineres conforme [tokens e diretrizes](design-guidelines.md). Nomes públicos dos componentes não usam prefixo `Cv`.

IDs explícitos precisam ser únicos. Ao montar múltiplas aplicações Vue no mesmo documento, configure `app.config.idPrefix` diferente em cada uma ou forneça IDs exclusivos aos campos.

## Limites da validação

Testes automatizados de DOM, navegação real em Chrome, axe e inspeção das capturas cobrem os cenários documentados. Isso não constitui auditoria completa de conformidade WCAG, teste manual com leitor de tela ou garantia em todos os navegadores. Use [qualidade](quality.md) para reproduzir as verificações.
