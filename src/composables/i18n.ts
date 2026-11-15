import { computed, inject, provide, readonly, toValue } from 'vue'
import type { InjectionKey, MaybeRefOrGetter } from 'vue'
import { enUS, ptBR } from '../locales/messages'
import type { Catalogs } from '../locales/messages'

export interface I18nOptions {
  locale?: MaybeRefOrGetter<string>
  messages?: Catalogs
  /** Diagnóstico opcional; recebe chaves ausentes inclusive no catálogo padrão. */
  onMissing?: (key: string, locale: string) => void
}

export function createI18n(options: I18nOptions = {}) {
  const locale = computed(() => toValue(options.locale) ?? 'pt-BR')
  const catalogs: Catalogs = { 'pt-BR': { ...ptBR }, 'en-US': { ...enUS } }
  for (const [name, messages] of Object.entries(options.messages ?? {})) {
    catalogs[name] = { ...catalogs[name], ...messages }
  }
  function t(key: string, parameters: Record<string, string | number> = {}) {
    const selected = Object.hasOwn(catalogs, locale.value) ? catalogs[locale.value] : undefined
    const fallback = catalogs['pt-BR']!
    const message = selected && Object.hasOwn(selected, key) ? selected[key] : Object.hasOwn(fallback, key) ? fallback[key] : undefined
    if (message === undefined) {
      if (options.onMissing) options.onMissing(key, locale.value)
      else if (import.meta.env.DEV) console.warn(`[ChadVue] Tradução ausente: ${key} (${locale.value})`)
      return key
    }
    return message.replace(/\{(\w+)\}/g, (match, name: string) => Object.hasOwn(parameters, name) ? String(parameters[name]) : match)
  }
  return {
    locale: readonly(locale),
    t,
    formatNumber: (value: number, format: Intl.NumberFormatOptions = {}) => new Intl.NumberFormat(locale.value, format).format(value),
    formatDate: (value: Date | number, format: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale.value, format).format(value),
  }
}

export type I18nContext = ReturnType<typeof createI18n>
export const i18nKey: InjectionKey<I18nContext> = Symbol('ChadVue.i18n')

export function provideI18n(options: I18nOptions = {}) {
  const context = createI18n(options)
  provide(i18nKey, context)
  return context
}

export function useI18n(): I18nContext {
  // O fallback é criado por consumidor, sem singleton mutável entre aplicações.
  return inject(i18nKey, undefined) ?? createI18n()
}
