import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '../src'
import ButtonBusy from './ButtonBusy.vue'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  args: { variant: 'primary', size: 'default', disabled: false },
  parameters: { docs: { source: { code: '<Button>Salvar</Button>' } } },
  render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args">Salvar</Button>' }),
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
export const Secondary: Story = {
  args: { variant: 'secondary' },
  parameters: { docs: { source: { code: '<Button variant="secondary">Salvar</Button>' } } },
}
export const Outline: Story = {
  args: { variant: 'outline' },
  parameters: { docs: { source: { code: '<Button variant="outline">Salvar</Button>' } } },
}
export const Danger: Story = {
  args: { variant: 'danger' },
  parameters: { docs: { source: { code: '<Button variant="danger">Salvar</Button>' } } },
}
export const Disabled: Story = {
  args: { disabled: true },
  parameters: { docs: { source: { code: '<Button disabled>Salvar</Button>' } } },
}
export const SecondaryDisabled: Story = {
  args: { variant: 'secondary', disabled: true },
  parameters: { docs: { source: { code: '<Button variant="secondary" disabled>Salvar</Button>' } } },
}
export const IconOnly: Story = {
  args: { size: 'icon' },
  parameters: { docs: { source: { code: '<Button size="icon" aria-label="Adicionar">+</Button>' } } },
  render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args" aria-label="Adicionar">+</Button>' }),
}
export const BusyComposition: Story = {
  parameters: {
    docs: {
      source: {
        code: `<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue'
import { Button } from 'chadvue'
</script>

<template>
  <Button disabled aria-busy="true">
    <LoaderCircle class="tw:size-3.5 tw:animate-spin motion-reduce:tw:animate-none" aria-hidden="true" />
    Salvar
  </Button>
</template>`,
      },
    },
  },
  render: () => ({ components: { ButtonBusy }, template: '<ButtonBusy />' }),
}
