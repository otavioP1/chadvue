import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const files = ['README.md', 'AGENTS.md', ...readdirSync('docs').filter(name => name.endsWith('.md')).map(name => `docs/${name}`)]
let checked = 0
const failures = []
for (const file of files) {
  const content = readFileSync(file, 'utf8')
  for (const [, target] of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue
    checked++
    if (!existsSync(resolve(dirname(file), target.split('#')[0]))) failures.push(`${file}: ${target}`)
  }
}
console.log(`${checked} links locais da documentação pública; ${failures.length} destinos ausentes.`)
for (const failure of failures) console.error(failure)
if (failures.length) process.exitCode = 1
