<script setup lang="ts">
import { ref } from 'vue'
import { LoaderCircle, Plus } from '@lucide/vue'
import { Button, Checkbox, Dialog, LocaleProvider, TextField } from '../src'
import FormatExample from './FormatExample.vue'

const locale = ref('pt-BR')
const theme = ref('chadvue')
const name = ref('')
const email = ref('')
const password = ref('chadvue-demo')
const note = ref('')
const accepted = ref(false)
const open = ref(false)
const busy = ref(false)
const invalid = ref(false)

const themes = [
  { value: 'chadvue', label: 'ChadVue · carvão e jade' },
  { value: 'ocean', label: 'Oceano · azul e ciano' },
  { value: 'plum', label: 'Ameixa · violeta e lavanda' },
  { value: 'terracotta', label: 'Terracota · cobre e areia' },
]
</script>

<template>
  <main
    class="showcase tw:mx-auto tw:box-border tw:min-h-screen tw:max-w-[68rem] tw:bg-canvas tw:px-4 tw:py-6 tw:font-ui tw:text-base tw:leading-normal tw:text-text md:tw:px-10 md:tw:py-10"
    :data-theme="theme"
    lang="pt-BR"
  >
    <header class="tw:mb-6 tw:grid tw:gap-3 md:tw:mb-8">
      <p class="tw:m-0 tw:text-sm tw:font-semibold tw:text-primary">CHADVUE · VITRINE DE COMPONENTES</p>
      <h1 class="tw:m-0 tw:max-w-[48rem] tw:text-[clamp(1.875rem,4vw,2.75rem)] tw:leading-[1.08] tw:tracking-[-0.04em]">Uma base para interfaces consistentes</h1>
      <p class="tw:m-0 tw:max-w-[44rem] tw:text-muted">Exemplos funcionais de ações, campos, seleção e diálogo — com quatro paletas completas aplicadas por tokens.</p>
    </header>

    <section class="demo-card tw:my-4 tw:grid tw:gap-4 tw:rounded-dialog tw:border tw:border-border tw:bg-surface tw:p-4 tw:shadow-[0_1px_2px_rgb(15_23_42_/_4%)] md:tw:grid-cols-2 md:tw:p-6" aria-labelledby="settings-heading">
      <div class="tw:grid tw:content-start tw:gap-3">
        <div>
          <p class="tw:mb-1 tw:mt-0 tw:text-sm tw:font-medium tw:text-text-muted">PERSONALIZAÇÃO</p>
          <h2 id="settings-heading" class="tw:m-0 tw:text-lg tw:leading-tight tw:font-semibold">Tema e idioma</h2>
        </div>
        <label class="tw:font-medium" for="demo-theme">Tema de cores</label>
        <select id="demo-theme" class="tw:min-h-10 tw:rounded-control tw:border tw:border-border-strong tw:bg-surface tw:px-3 tw:py-2 tw:text-text tw:focus-visible:outline-2 tw:focus-visible:outline-focus tw:focus-visible:outline-offset-2 tw:focus-visible:ring-4 tw:focus-visible:ring-surface" v-model="theme">
          <option v-for="item in themes" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
        <label class="tw:font-medium" for="demo-language">Idioma / Language</label>
        <select id="demo-language" class="tw:min-h-10 tw:rounded-control tw:border tw:border-border-strong tw:bg-surface tw:px-3 tw:py-2 tw:text-text tw:focus-visible:outline-2 tw:focus-visible:outline-focus tw:focus-visible:outline-offset-2 tw:focus-visible:ring-4 tw:focus-visible:ring-surface" v-model="locale"><option value="pt-BR">Português (Brasil)</option><option value="en-US">English (US)</option></select>
      </div>

      <div class="tw:grid tw:content-start tw:gap-3">
        <h3 class="tw:m-0 tw:text-sm tw:font-semibold">Paleta ativa</h3>
        <div class="tw:flex tw:flex-wrap tw:gap-2" role="group" aria-label="Amostras da paleta atual">
          <span class="tw:rounded-control tw:bg-primary tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-on-primary">Primary</span>
          <span class="tw:rounded-control tw:bg-success tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-on-primary">Success</span>
          <span class="tw:rounded-control tw:bg-warning tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-on-primary">Warning</span>
          <span class="tw:rounded-control tw:bg-danger tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-on-primary">Danger</span>
          <span class="tw:rounded-control tw:bg-info tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-on-primary">Info</span>
        </div>
        <p class="tw:m-0 tw:text-sm tw:text-muted">A seleção troca superfícies, texto, bordas, foco, ações e cores semânticas dentro desta vitrine.</p>
        <Checkbox v-model="busy" label="Simular ação em andamento" />
        <Checkbox v-model="invalid" label="Mostrar erro do campo" />
      </div>
    </section>

    <div class="tw:grid tw:gap-4 lg:tw:grid-cols-2">
      <section class="demo-card tw:grid tw:content-start tw:gap-4 tw:rounded-dialog tw:border tw:border-border tw:bg-surface tw:p-4 tw:shadow-[0_1px_2px_rgb(15_23_42_/_4%)] md:tw:p-6" aria-labelledby="actions-heading">
        <div>
          <p class="tw:mb-1 tw:mt-0 tw:text-sm tw:font-medium tw:text-text-muted">BUTTON</p>
          <h2 id="actions-heading" class="tw:m-0 tw:text-lg tw:leading-tight tw:font-semibold">Ações e variantes</h2>
        </div>
        <div class="demo-actions tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button size="icon" aria-label="Adicionar item"><Plus :size="16" aria-hidden="true" /></Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </section>

      <LocaleProvider :locale="locale">
        <section class="demo-card tw:grid tw:content-start tw:gap-4 tw:rounded-dialog tw:border tw:border-border tw:bg-surface tw:p-4 tw:shadow-[0_1px_2px_rgb(15_23_42_/_4%)] md:tw:p-6" aria-labelledby="form-heading">
          <div>
            <p class="tw:mb-1 tw:mt-0 tw:text-sm tw:font-medium tw:text-text-muted">TEXTFIELD · CHECKBOX</p>
            <h2 id="form-heading" class="tw:m-0 tw:text-lg tw:leading-tight tw:font-semibold">Formulário de exemplo</h2>
          </div>
          <TextField v-model="name" label="Nome" name="name" autocomplete="name" placeholder="Como você prefere ser chamado" :error="invalid ? 'Informe um nome válido.' : undefined" />
          <TextField v-model="email" label="E-mail" type="email" autocomplete="email" placeholder="nome@exemplo.com" />
          <TextField v-model="password" label="Senha" type="password" placeholder="Digite sua senha" />
          <TextField label="Campo desabilitado" model-value="Valor indisponível" disabled />
          <Checkbox v-model="accepted" label="Aceito os termos de demonstração" />
          <p class="tw:m-0 tw:text-sm tw:text-muted" data-testid="form-state">Nome: {{ name }} · Aceite: {{ accepted }}</p>
          <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <Button :disabled="busy" :aria-busy="busy || undefined" @click="open = true">
              <LoaderCircle v-if="busy" class="demo-spinner tw:size-3.5 tw:animate-spin motion-reduce:tw:animate-none" aria-hidden="true" />
              Abrir detalhes
            </Button>
            <Button variant="outline" @click="name = ''; email = ''; password = ''; accepted = false">Limpar formulário</Button>
          </div>
          <FormatExample />
        </section>
      </LocaleProvider>
    </div>

    <LocaleProvider :locale="locale">
      <Dialog v-model:open="open" title="Detalhes do exemplo" description="Este diálogo nativo herda a paleta selecionada e mantém o foco no contexto modal.">
        <div class="tw:grid tw:gap-4">
          <p class="tw:my-0 tw:text-muted">Nome informado: {{ name || '—' }} · E-mail: {{ email || '—' }}</p>
          <TextField v-model="note" label="Observação" placeholder="Adicione uma observação" />
        </div>
        <template #footer>
          <Button variant="outline" @click="open = false">Cancelar</Button>
          <Button variant="secondary" @click="open = false">Concluir</Button>
        </template>
      </Dialog>
    </LocaleProvider>
  </main>
</template>
