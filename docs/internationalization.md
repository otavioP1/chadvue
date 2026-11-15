# Internacionalização

O idioma e o catálogo são compartilhados por contexto Vue, sem singleton mutável. São fornecidos `pt-BR` (padrão) e `en-US`. A biblioteca traduz o nome acessível interno do botão Fechar (`dialog.close`) e os nomes do controle de senha do `TextField` (`textfield.showPassword`, `textfield.hidePassword`); rótulos, slots, mensagens de validação, indicadores de carregamento e textos de exemplos pertencem à aplicação consumidora.

## Provedor declarativo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LocaleProvider, Button } from 'chadvue'
const locale = ref('pt-BR')
</script>

<template>
  <LocaleProvider :locale="locale">
    <Button>Salvar</Button>
  </LocaleProvider>
</template>
```

Props: `locale?: string` com padrão `pt-BR`; `messages?: Catalogs` com traduções adicionais iniciais. Slot padrão e nenhum evento. O provedor não renderiza elemento próprio nem altera o `lang` global; a aplicação deve fornecer `lang` no documento ou na subárvore. Alterações de `locale` são reativas. O catálogo é copiado na criação: mudanças posteriores de `messages` exigem recriar o contexto/provedor.

## Contexto programático

Em `setup`, `provideI18n({ locale, messages, onMissing })` cria e fornece um contexto aos descendentes. `locale` pode ser string, ref ou getter. `useI18n()` consome o contexto mais próximo; sem contexto, cria fallback independente em português.

`createI18n(options)` funciona fora de componentes e pode ser fornecido por `app.provide(i18nKey, context)`. O contexto retorna `locale` somente leitura, `t`, `formatNumber` e `formatDate`. O estado de idioma é controlado pelo ref/getter fornecido pelo consumidor; não há alteração global do idioma da aplicação.

```ts
import { ref } from 'vue'
import { createI18n } from 'chadvue'
const locale = ref('pt-BR')
const i18n = createI18n({
  locale,
  messages: { 'pt-BR': { greeting: 'Olá, {name}!' } },
})
i18n.t('greeting', { name: 'Ana' })
locale.value = 'en-US'
i18n.formatNumber(1234.5, { style: 'currency', currency: 'USD' })
i18n.formatDate(new Date('2026-11-15T12:00:00Z'), { dateStyle: 'long', timeZone: 'UTC' })
```

## Mensagens e fallback

Ordem de resolução: catálogo do locale atual → catálogo padrão `pt-BR` → chave original. Traduções adicionais mesclam-se aos catálogos nativos por idioma, sem modificar o catálogo de outros contextos. Idiomas sem catálogo usam mensagens padrão. Propriedades herdadas do JavaScript não são traduções válidas.

`t(key, parameters?)` interpola `{name}` com strings ou números; parâmetros ausentes ficam visíveis como marcadores. O resultado é texto. Componentes usam interpolação Vue, sem `v-html`; não usar o retorno em HTML executável. Uma chave inexistente nos dois catálogos chama `onMissing(key, locale)` quando fornecido; sem callback, avisa no desenvolvimento. Testes cobrem chaves ausentes para evitar esse caminho como comportamento normal de produção.

## Formatos e escopo

`formatNumber(value, options?)` usa `Intl.NumberFormat`; `formatDate(Date | number, options)` usa `Intl.DateTimeFormat`. Sempre usam locale explícito do contexto. Moeda não é presumida: informe-a quando `style: 'currency'`. Para resultados determinísticos, informe `timeZone` ao formatar datas. A biblioteca não substitui validação de valores, locale ou opções inválidas do `Intl`.

Trocar idioma não recria inputs, altera valores ou desloca foco por efeito da biblioteca. A demonstração traduz somente textos internos e formatos; seu conteúdo editorial em português não é um catálogo de tradução da biblioteca. Pluralização avançada, RTL completo e adaptadores para bibliotecas externas não estão incluídos.

## Verificação

Testes unitários cobrem fallback, diagnóstico, isolamento, interpolação e formatos. O navegador verifica mudança reativa para inglês, nome do botão Fechar e preservação de valor/foco. Consulte [qualidade](quality.md).
