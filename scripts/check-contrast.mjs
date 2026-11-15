import { readFileSync } from 'node:fs'

const document = readFileSync(new URL('../docs/design-guidelines.md', import.meta.url), 'utf8')
const tokens = Object.fromEntries(
  [...document.matchAll(/\| `--chadvue-color-([^`]+)` \| `(#[\da-fA-F]{6})`/g)]
    .map(([, name, value]) => [name, value]),
)
const css = readFileSync(new URL('../src/styles/tokens/colors.css', import.meta.url), 'utf8')
const implemented = Object.fromEntries([...css.matchAll(/--chadvue-color-([\w-]+):\s*(#[\da-fA-F]{6})/g)].map(([, name, value]) => [name, value]))
for (const [name, value] of Object.entries(tokens)) {
  if (implemented[name]?.toUpperCase() !== value.toUpperCase()) throw new Error(`Token CSS divergente: ${name}`)
}
console.log(`${Object.keys(tokens).length} tokens CSS conferem com o catálogo documentado.`)

function luminance(hex) {
  if (!hex) throw new Error('Token de cor ausente no documento')
  const channels = hex.slice(1).match(/../g).map((value) => {
    const channel = parseInt(value, 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

const foregrounds = ['text', 'text-muted', 'primary', 'primary-hover', 'primary-active', 'danger', 'danger-hover', 'danger-active', 'success', 'warning', 'info']
let checked = 0
let failed = 0
function check(foreground, background, minimum) {
  const values = [luminance(tokens[foreground]), luminance(tokens[background])].sort((a, b) => b - a)
  const ratio = (values[0] + 0.05) / (values[1] + 0.05)
  const pass = ratio >= minimum
  console.log(`${pass ? 'OK' : 'FALHA'} ${foreground}/${background}: ${ratio.toFixed(3)}:1 (mínimo ${minimum}:1)`)
  checked++
  if (!pass) failed++
}

for (const foreground of foregrounds) {
  for (const background of ['surface', 'canvas']) check(foreground, background, 4.5)
}
for (const background of ['surface', 'canvas']) check('focus', background, 3)
for (const background of ['primary', 'primary-hover', 'primary-active', 'danger', 'danger-hover', 'danger-active']) check('on-primary', background, 4.5)
check('disabled-text', 'disabled-surface', 4.5)
console.log(`${checked} pares verificados; ${failed} falhas. Não representa auditoria de componentes.`)
if (failed) process.exitCode = 1
