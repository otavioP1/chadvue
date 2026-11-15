import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Showcase from './Showcase.vue'

const meta = { id: 'chadvue-showcase', title: 'Exemplos/Integração', component: Showcase, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Showcase>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
