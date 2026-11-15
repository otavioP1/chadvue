import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  addons: ['@storybook/addon-docs'],
  core: { disableTelemetry: true },
  viteFinal: (config) => ({
    ...config,
    plugins: [...(config.plugins ?? []), tailwindcss()],
  }),
}

export default config
