import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createI18n } from '../../src/composables/i18n'

describe('contexto de internacionalização', () => {
  it('troca idioma reativamente e faz fallback para o catálogo padrão', () => {
    const locale = ref('en-US')
    const i18n = createI18n({ locale, messages: { 'pt-BR': { custom: 'Olá' } } })
    expect(i18n.t('dialog.close')).toBe('Close')
    expect(i18n.t('custom')).toBe('Olá')
    locale.value = 'fr-FR'
    expect(i18n.t('dialog.close')).toBe('Fechar')
  })
  it('diagnostica chave ausente e preserva parâmetros como texto', () => {
    const onMissing = vi.fn()
    const i18n = createI18n({ onMissing, messages: { 'pt-BR': { greeting: 'Olá, {name}!' } } })
    expect(i18n.t('missing')).toBe('missing')
    expect(onMissing).toHaveBeenCalledWith('missing', 'pt-BR')
    expect(i18n.t('greeting', { name: '<img onerror=alert(1)>' })).toBe('Olá, <img onerror=alert(1)>!')
    expect(i18n.t('greeting')).toBe('Olá, {name}!')
  })
  it('formata números e datas com locale e opções explícitos', () => {
    const i18n = createI18n({ locale: 'en-US' })
    expect(i18n.formatNumber(1234.5, { style: 'currency', currency: 'USD' })).toBe('$1,234.50')
    expect(i18n.formatDate(new Date('2026-11-15T00:00:00Z'), { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })).toBe('11/15/2026')
  })
  it('não altera catálogos compartilhados ao personalizar uma aplicação', () => {
    const a = createI18n({ messages: { 'pt-BR': { 'dialog.close': 'Encerrar' } } })
    const b = createI18n()
    expect(a.t('dialog.close')).toBe('Encerrar')
    expect(b.t('dialog.close')).toBe('Fechar')
  })
  it('não trata propriedades herdadas como traduções', () => {
    const onMissing = vi.fn()
    const context = createI18n({ locale: 'toString', onMissing })
    expect(context.t('toString')).toBe('toString')
    expect(context.t('__proto__')).toBe('__proto__')
    expect(context.t('dialog.close')).toBe('Fechar')
    expect(onMissing).toHaveBeenCalledTimes(2)
  })
})
