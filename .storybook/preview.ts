import type { Preview } from '@storybook/vue3-vite'
import '../src/styles/components.css'
import '../stories/utilities.css'

const preview: Preview = {
  parameters: { layout: 'padded' },
}

export default preview
