import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Introduction from './Introduction.vue'

const meta = {
  title: 'Documentação/Introdução',
  component: Introduction,
  tags: ['autodocs'],
  args: { title: 'ChadVue' },
  parameters: { docs: { description: { component: 'Página de apresentação usada para verificar a integração Vue, TypeScript e Storybook. Não faz parte da API pública da biblioteca.' } } },
} satisfies Meta<typeof Introduction>

export default meta
type Story = StoryObj<typeof meta>
export const Overview: Story = {}
