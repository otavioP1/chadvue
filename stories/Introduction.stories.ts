import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Introduction from './Introduction.vue'

const meta = {
  title: 'Documentação/Introdução',
  component: Introduction,
  tags: ['autodocs'],
  args: { title: 'ChadVue' },
  parameters: { docs: { description: { component: 'Apresentação do ChadVue e do catálogo atual de componentes. É conteúdo do Storybook, não faz parte da API pública da biblioteca.' } } },
} satisfies Meta<typeof Introduction>

export default meta
type Story = StoryObj<typeof meta>
export const Overview: Story = {}
