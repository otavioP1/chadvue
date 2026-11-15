<script setup lang="ts">
const components = [
  { name: 'Button', summary: 'Ações claras com níveis de ênfase distintos.', examples: 'Primary · Secondary · Outline · Danger · ícone · disabled' },
  { name: 'TextField', summary: 'Campos de linha única com rótulo, placeholder e erro associado.', examples: 'Text · Email · Password com alternância de visibilidade · disabled' },
  { name: 'Checkbox', summary: 'Seleção booleana com alvo amplo e estado controlado por v-model.', examples: 'Marcado · desmarcado · obrigatório · disabled' },
  { name: 'Dialog', summary: 'Diálogo modal nativo com foco contido e retorno ao acionador.', examples: 'Título · descrição · conteúdo · ações no rodapé' },
]
defineProps<{ title: string }>()
</script>

<template>
  <main class="tw:mx-auto tw:box-border tw:min-h-screen tw:max-w-[64rem] tw:bg-canvas tw:px-4 tw:py-10 tw:font-ui tw:text-base tw:leading-normal tw:text-text md:tw:px-10 md:tw:py-16">
    <header class="tw:mb-10 tw:grid tw:max-w-[48rem] tw:gap-4">
      <p class="tw:m-0 tw:text-sm tw:font-semibold tw:text-focus">DESIGN SYSTEM · VUE 3 · TYPESCRIPT</p>
      <h1 class="tw:m-0 tw:text-[clamp(2.25rem,6vw,4rem)] tw:leading-tight tw:font-semibold tw:tracking-[-0.04em]">{{ title }}</h1>
      <p class="tw:m-0 tw:text-lg tw:leading-normal tw:text-muted">Uma base compacta de componentes acessíveis e personalizáveis para interfaces Vue.</p>
      <p class="tw:m-0 tw:text-sm tw:text-muted">O catálogo atual reúne quatro componentes. Explore as stories individuais e a vitrine de integração para ver seus estados em uso.</p>
    </header>

    <section aria-labelledby="catalog-heading">
      <div class="tw:mb-4 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-3">
        <div>
          <p class="tw:mb-1 tw:mt-0 tw:text-sm tw:font-medium tw:text-text-muted">CATÁLOGO INICIAL</p>
          <h2 id="catalog-heading" class="tw:m-0 tw:text-lg tw:leading-tight tw:font-semibold">Componentes disponíveis</h2>
        </div>
        <span class="tw:rounded-control tw:border tw:border-border tw:bg-surface tw:px-2.5 tw:py-1 tw:text-sm tw:text-text-muted">{{ components.length }} componentes</span>
      </div>

      <ul class="tw:m-0 tw:grid tw:list-none tw:grid-cols-1 tw:gap-3 tw:p-0 md:tw:grid-cols-2">
        <li v-for="component in components" :key="component.name" class="tw:grid tw:content-start tw:gap-3 tw:rounded-dialog tw:border tw:border-border tw:bg-surface tw:p-5">
          <div class="tw:flex tw:items-center tw:justify-between tw:gap-3">
            <h3 class="tw:m-0 tw:text-base tw:font-semibold">{{ component.name }}</h3>
            <span class="tw:size-2 tw:rounded-full tw:bg-primary" aria-hidden="true"></span>
          </div>
          <p class="tw:m-0 tw:text-sm tw:leading-normal tw:text-muted">{{ component.summary }}</p>
          <p class="tw:m-0 tw:border-t tw:border-border tw:pt-3 tw:text-xs tw:leading-normal tw:text-text-muted">{{ component.examples }}</p>
        </li>
      </ul>
    </section>

    <footer class="tw:mt-8 tw:border-t tw:border-border tw:pt-4 tw:text-sm tw:text-muted">
      Todos os componentes podem ser importados individualmente; a aplicação controla seu estado e fornece os textos de interface.
    </footer>
  </main>
</template>
