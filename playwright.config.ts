import { defineConfig } from '@playwright/test'
const port = Number(process.env.CHADVUE_TEST_PORT ?? 6016)
export default defineConfig({
  testDir: './tests/browser',
  outputDir: 'test-results',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'test-results/browser-results.json' }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 1280, height: 1000 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.CHADVUE_BROWSER_PATH ? { executablePath: process.env.CHADVUE_BROWSER_PATH } : {},
  },
  webServer: {
    command: 'node scripts/serve-storybook.mjs',
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: false,
    timeout: 120000,
  },
})
