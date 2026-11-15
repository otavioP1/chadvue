import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TextField } from '../src'
const meta = { title: 'Componentes/TextField', component: TextField, tags: ['autodocs'], args: { label: 'E-mail', type: 'email', placeholder: 'nome@exemplo.com' } } satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Error: Story = { args: { error: 'O endereço informado é inválido.' } }
export const Disabled: Story = { args: { disabled: true, modelValue: 'exemplo@dominio.com' } }
export const Required: Story = { args: { required: true } }
export const Password: Story = { args: { label: 'Senha', type: 'password', placeholder: 'Digite sua senha', modelValue: 'exemplo-seguro' } }
