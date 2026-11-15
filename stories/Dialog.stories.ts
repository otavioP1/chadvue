import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button, Dialog } from '../src'
const meta = {
  title: 'Componentes/Dialog', component: Dialog, tags: ['autodocs'], args: { title: 'Confirmar ação', description: 'Revise as informações antes de continuar.' },
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog } from 'chadvue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">Abrir diálogo</Button>
  <Dialog v-model:open="open" title="Confirmar ação" description="Revise as informações antes de continuar.">
    <p>Conteúdo do diálogo.</p>
    <template #footer>
      <Button @click="open = false">Confirmar</Button>
    </template>
  </Dialog>
</template>`,
      },
    },
  },
  render: (args) => ({ components: { Button, Dialog }, setup: () => ({ args, open: ref(false) }), template: '<Button @click="open = true">Abrir diálogo</Button><Dialog v-bind="args" v-model:open="open"><p>Conteúdo do diálogo.</p><template #footer><Button @click="open = false">Confirmar</Button></template></Dialog>' }),
} satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
