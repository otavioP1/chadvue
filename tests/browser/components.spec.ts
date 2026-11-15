import { expect, test } from '@playwright/test'
import type { Page, TestInfo } from '@playwright/test'
import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { AxeResults } from 'axe-core'

const require = createRequire(import.meta.url)
const route = '/iframe.html?id=chadvue-showcase--playground&viewMode=story'
const evidence = process.env.CHADVUE_EVIDENCE_DIR
function artifact(name: string, contents: string) {
  if (!evidence) return
  mkdirSync(evidence, { recursive: true })
  writeFileSync(join(evidence, name), contents, 'utf8')
}
async function capture(page: Page, info: TestInfo, name: string) {
  const path = info.outputPath(name)
  await page.screenshot({ path, fullPage: true })
  await info.attach(name, { path, contentType: 'image/png' })
  if (evidence) { mkdirSync(evidence, { recursive: true }); await page.screenshot({ path: join(evidence, name), fullPage: true }) }
}
async function audit(page: Page, name: string) {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
  const results = await page.evaluate(async () => {
    const win = window as unknown as { axe: { run: (context: Document, options: object) => Promise<AxeResults> } }
    return win.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })
  })
  artifact(name, JSON.stringify(results, null, 2))
  expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([])
  // axe não resolve sempre a sobreposição do top-layer nativo. Não converter
  // resultados incompletos em aprovação: conferir o par real e a visibilidade.
  for (const incomplete of results.incomplete) {
    expect(incomplete.id).toBe('color-contrast')
    for (const node of incomplete.nodes) {
      const selector = node.target[0]
      expect(typeof selector).toBe('string')
      const details = await page.locator(selector as string).evaluate((element) => {
        const modal = element.closest('dialog')
        if (!modal) throw new Error('Revisão de contraste só prevista no modal')
        const rect = element.getBoundingClientRect()
        const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
        return { foreground: getComputedStyle(element).color, background: getComputedStyle(modal).backgroundColor, unobscured: !!hit && (hit === element || element.contains(hit)), target: element.id }
      })
      const luminance = (color: string) => {
        const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => { const v = value / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 })
        return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722
      }
      const values = [luminance(details.foreground), luminance(details.background)].sort((a, b) => b - a)
      const ratio = (values[0]! + 0.05) / (values[1]! + 0.05)
      artifact('REQ-06-revisao-contraste-dialog.json', JSON.stringify({ ...details, ratio, minimum: 4.5, method: 'CSS computado do texto e fundo opaco do modal, hit-test central e captura visual; não altera o resultado incomplete do axe.' }, null, 2))
      expect(details.unobscured).toBe(true)
      expect(details.background).toBe('rgb(255, 255, 255)')
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    }
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto(route)
  await expect(page.getByRole('heading', { name: 'Uma base para interfaces consistentes' })).toBeVisible()
})

test('tema por cascata, hover, foco e isolamento do padrão', async ({ page }, info) => {
  const button = page.getByRole('button', { name: 'Abrir detalhes' })
  await expect(button).toHaveCSS('background-color', 'rgb(41, 45, 50)')
  await button.hover()
  await expect(button).toHaveCSS('background-color', 'rgb(31, 35, 40)')
  await page.getByLabel('Tema de cores').selectOption('terracotta')
  await page.mouse.move(0, 0)
  await expect(button).toHaveCSS('background-color', 'rgb(154, 52, 18)')
  await expect(page.locator('main')).toHaveCSS('background-color', 'rgb(250, 244, 240)')
  const rootToken = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--chadvue-color-primary').trim())
  expect(rootToken.toUpperCase()).toBe('#292D32')
  await capture(page, info, 'REQ-05-tema-personalizado.png')
})

test('formulário por teclado, estados e erro associado', async ({ page }, info) => {
  const input = page.getByRole('textbox', { name: 'Nome' })
  await input.focus()
  await expect(input).toHaveCSS('min-height', '32px')
  await expect(input).toHaveCSS('outline-style', 'none')
  await expect(input).toHaveCSS('box-shadow', /0px 0px 0px 2px/)
  await capture(page, info, 'text-field-focus.png')
  await page.keyboard.type('Ana')
  await page.keyboard.press('Tab')
  const email = page.getByRole('textbox', { name: 'E-mail' })
  await expect(email).toBeFocused()
  await page.keyboard.press('Tab')
  const password = page.getByRole('textbox', { name: 'Senha' })
  await expect(password).toBeFocused()
  await page.keyboard.press('Tab')
  const revealPassword = page.getByRole('button', { name: 'Mostrar senha' })
  await expect(revealPassword).toBeFocused()
  await page.keyboard.press('Tab')
  const checkbox = page.getByRole('checkbox', { name: 'Aceito os termos de demonstração' })
  await expect(checkbox).toBeFocused()
  await page.keyboard.press('Space')
  await expect(checkbox).toBeChecked()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Abrir detalhes' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Abrir detalhes' })).toHaveCSS('outline-width', '2px')
  await expect(page.getByRole('button', { name: 'Abrir detalhes' })).toHaveCSS('outline-style', 'solid')
  await expect(page.getByRole('button', { name: 'Abrir detalhes' })).toHaveCSS('min-height', '32px')
  await expect(page.getByRole('button', { name: 'Disabled', exact: true })).toBeDisabled()
  await page.getByLabel('Mostrar erro do campo').check()
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  const relation = await input.getAttribute('aria-describedby')
  expect(relation).toContain('-error')
  await expect(page.getByTestId('form-state')).toContainText('Nome: Ana · Aceite: true')
  await capture(page, info, 'REQ-06-formulario-erro.png')
  await audit(page, 'REQ-06-axe-formulario.json')
})

test('modal nativo: nome, foco inicial, contenção, Escape e retorno', async ({ page }, info) => {
  const trigger = page.getByRole('button', { name: 'Abrir detalhes' })
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Detalhes do exemplo' })
  await expect(dialog).toBeVisible()
  const close = dialog.getByRole('button', { name: 'Fechar', exact: true })
  await expect(close).toBeFocused()
  await close.hover()
  await expect(close).toHaveCSS('background-color', 'rgb(244, 247, 244)')
  await expect(close).toHaveCSS('color', 'rgb(24, 37, 30)')
  await close.focus()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Concluir' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await audit(page, 'REQ-06-axe-dialog.json')
  await capture(page, info, 'REQ-06-dialog-foco.png')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await close.click()
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('idioma reativo, texto interno, formatos e preservação de valor e foco', async ({ page }, info) => {
  const input = page.getByRole('textbox', { name: 'Nome' })
  await input.fill('Marina')
  await page.getByLabel('Simular ação em andamento').check()
  const busyButton = page.getByRole('button', { name: 'Abrir detalhes' })
  await expect(busyButton).toBeDisabled()
  await expect(busyButton).toHaveAttribute('aria-busy', 'true')
  await expect(page.locator('.demo-spinner')).toBeVisible()
  await input.focus()
  // Alteração reativa programática preserva o foco; interação manual no select naturalmente o desloca.
  await page.locator('#demo-language').evaluate((element: HTMLSelectElement) => { element.value = 'en-US'; element.dispatchEvent(new Event('change', { bubbles: true })) })
  await expect(input).toBeFocused()
  await expect(input).toHaveValue('Marina')
  await expect(busyButton).toBeDisabled()
  await expect(busyButton).toHaveAttribute('aria-busy', 'true')
  await expect(page.getByTestId('format-example')).toContainText('November 15, 2026')
  await expect(page.locator('main')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByTestId('format-example')).toHaveAttribute('lang', 'en-US')
  await expect(page.locator('.chadvue-loading')).toHaveCount(0)
  await capture(page, info, 'REQ-07-idioma-ingles.png')
  await page.getByLabel('Simular ação em andamento').uncheck()
  await page.getByRole('button', { name: 'Abrir detalhes' }).click()
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
})

test('cenário integrado sem violações axe e sem overflow a 320px', async ({ page }, info) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await audit(page, 'REQ-08-axe-integracao.json')
  await capture(page, info, 'REQ-08-integracao.png')
  await page.setViewportSize({ width: 320, height: 900 })
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  await capture(page, info, 'REQ-08-mobile-320.png')
  expect(errors).toEqual([])
})

test('stories individuais e introdução anterior preservadas', async ({ request, page }) => {
  const response = await request.get('/index.json')
  expect(response.ok()).toBe(true)
  const index = await response.json()
  const titles = Object.values(index.entries).map((entry: any) => entry.title)
  for (const component of ['Button', 'TextField', 'Checkbox', 'Dialog']) expect(titles).toContain(`Componentes/${component}`)
  expect(titles.some(title => title.includes('Introdução'))).toBe(true)
  const introduction = Object.values(index.entries).find((entry: any) => entry.type === 'story' && entry.title.includes('Introdução')) as { id: string }
  expect(introduction).toBeTruthy()
  await page.goto(`/iframe.html?id=${encodeURIComponent(introduction.id)}&viewMode=story`)
  await expect(page.getByRole('heading', { name: 'ChadVue', exact: true })).toBeVisible()
})

test('Button: variantes profissionais, tamanho compacto e espera composta', async ({ request, page }, info) => {
  const response = await request.get('/index.json')
  const index = await response.json()
  const stories = Object.values(index.entries) as { id: string; name: string; title: string; type: string }[]
  const cases = [
    { name: 'Primary', label: 'Salvar', height: '32px' },
    { name: 'Secondary', label: 'Salvar', height: '32px' },
    { name: 'Outline', label: 'Salvar', height: '32px' },
    { name: 'Danger', label: 'Salvar', height: '32px' },
    { name: 'IconOnly', label: 'Adicionar', height: '32px', width: '32px' },
    { name: 'BusyComposition', label: 'Salvar', height: '32px', busy: true },
  ]
  for (const item of cases) {
    const story = stories.find(entry => entry.title === 'Componentes/Button' && entry.name.replace(/\s+/g, '') === item.name && entry.type === 'story')
    expect(story, `Story Button/${item.name} ausente`).toBeTruthy()
    await page.goto(`/iframe.html?id=${story!.id}&viewMode=story`)
    const button = page.getByRole('button', { name: item.label })
    await expect(button).toBeVisible()
    await expect(button).toHaveCSS('border-radius', '3px')
    if (item.width) {
      await expect(button).toHaveCSS('width', item.width)
      await expect(button).toHaveCSS('height', item.height)
    }
    else {
      await expect(button).toHaveCSS('min-height', item.height)
    }
    if (item.busy) {
      await expect(button).toBeDisabled()
      await expect(button).toHaveAttribute('aria-busy', 'true')
      await expect(button.locator('svg')).toHaveAttribute('aria-hidden', 'true')
    }
    await capture(page, info, `button-${item.name.toLowerCase()}.png`)
  }
})

test('Storybook: todos os painéis Show code correspondem aos exemplos renderizados', async ({ page }) => {
  const sourcePages = [
    {
      id: 'componentes-button--docs',
      snippets: [
        '<Button>Salvar</Button>',
        '<Button>Salvar</Button>',
        '<Button variant="secondary">Salvar</Button>',
        '<Button variant="outline">Salvar</Button>',
        '<Button variant="danger">Salvar</Button>',
        '<Button disabled>Salvar</Button>',
        '<Button variant="secondary" disabled>Salvar</Button>',
        '<Button size="icon" aria-label="Adicionar">+</Button>',
        ['<Button disabled aria-busy="true">', 'import { LoaderCircle } from \'@lucide/vue\'', 'tw:animate-spin', 'aria-hidden="true"', 'Salvar'],
      ],
    },
    {
      id: 'componentes-checkbox--docs',
      snippets: [
        'const modelValue = ref(false);',
        'const modelValue = ref(false);',
        'const modelValue = ref(true);',
        'Checkbox disabled label="Receber novidades" v-model="modelValue"',
        'const modelValue = ref(true);',
      ],
    },
    {
      id: 'componentes-textfield--docs',
      snippets: [
        'placeholder="nome@exemplo.com"',
        'placeholder="nome@exemplo.com"',
        'error="O endereço informado é inválido."',
        'disabled label="E-mail" v-model="modelValue"',
        'required',
        'type="password"',
      ],
    },
    {
      id: 'componentes-dialog--docs',
      snippets: [[
        'import { Button, Dialog } from \'chadvue\'',
        'const open = ref(false)',
        '<Button @click="open = true">Abrir diálogo</Button>',
        '<Dialog v-model:open="open" title="Confirmar ação" description="Revise as informações antes de continuar.">',
        '<p>Conteúdo do diálogo.</p>',
        '<template #footer>',
        '<Button @click="open = false">Confirmar</Button>',
      ]],
    },
    {
      id: 'documentação-introdução--docs',
      snippets: ['<Introduction title="ChadVue" />'],
    },
  ]

  for (const { id, snippets } of sourcePages) {
    await page.goto(`/?path=/docs/${id}`)
    const docs = page.frameLocator('#storybook-preview-iframe')
    const toggles = docs.locator('.docblock-code-toggle')
    await expect(toggles).toHaveCount(snippets.length)

    for (let index = 0; index < snippets.length; index++) {
      await toggles.nth(index).click()
      const expected = snippets[index]!
      for (const fragment of Array.isArray(expected) ? expected : [expected]) {
        await expect(docs.locator('pre').last()).toContainText(fragment)
      }
    }
  }
})
