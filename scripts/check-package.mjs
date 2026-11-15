import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Button, TextField, Checkbox, Dialog, LocaleProvider } from 'chadvue'

const html = await renderToString(createSSRApp({
  render: () => h(LocaleProvider, { locale: 'en-US' }, () => [
    h(Button, { variant: 'danger', size: 'icon', disabled: true, 'aria-busy': 'true' }, () => [h('span', { 'aria-hidden': 'true' }, '↻'), 'Save']),
    h(TextField, { label: 'Name' }),
    h(Checkbox, { label: 'Accept' }),
    h(Dialog, { title: 'Details' }),
  ]),
}))
assert.match(html, /chadvue-button--danger/)
assert.match(html, /chadvue-button--icon/)
assert.match(html, /aria-busy="true"/)
assert.doesNotMatch(html, /loading="true"|Loading|Carregando/)
assert.match(html, /aria-labelledby/)
assert.match(html, /type="checkbox"/)
assert.match(html, /<svg[^>]*aria-hidden="true"/)
const css = readFileSync(new URL('../dist/chadvue.css', import.meta.url), 'utf8')
assert.match(css, /--chadvue-color-primary/)
assert.match(css, /\.tw\\:inline-flex/)
assert.match(css, /\.tw\\:animate-spin/)
assert.doesNotMatch(css, /(?:^|})\s*\*\s*\{\s*box-sizing:/)
console.log('Consumo ESM, renderização Vue SSR e CSS distribuído: OK.')
