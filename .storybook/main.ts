import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  addons: ['@storybook/addon-docs'],
  core: { disableTelemetry: true },
}

export default config
