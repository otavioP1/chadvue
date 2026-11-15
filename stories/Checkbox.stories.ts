import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Checkbox } from '../src'
const meta = { title: 'Componentes/Checkbox', component: Checkbox, tags: ['autodocs'], args: { label: 'Receber novidades', modelValue: false } } satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>
const interactiveRender: NonNullable<Story['render']> = (args) => ({
  components: { Checkbox },
  setup() {
    const modelValue = ref(args.modelValue ?? false)
    return { args, modelValue }
  },
  template: '<Checkbox v-bind="args" v-model="modelValue" />',
})
export const Default: Story = { render: interactiveRender }
export const Checked: Story = { args: { modelValue: true }, render: interactiveRender }
export const Disabled: Story = { args: { disabled: true } }
export const CheckedDisabled: Story = { args: { modelValue: true, disabled: true } }
