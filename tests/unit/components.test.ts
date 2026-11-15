import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { Button, Checkbox, Dialog, TextField, LocaleProvider } from '../../src'
import { useI18n } from '../../src/composables/i18n'

afterEach(() => { document.body.innerHTML = '' })

describe('Button', () => {
  it('preserva slot, clique nativo e type seguro em formulário', async () => {
    const wrapper = mount(Button, { slots: { default: 'Salvar' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.text()).toBe('Salvar')
  })
  it('suporta variantes, tamanho de ícone e composição externa de espera', () => {
    const wrapper = mount(Button, {
      props: { variant: 'outline', size: 'icon', disabled: true },
      attrs: { 'aria-label': 'Adicionar', 'aria-busy': 'true' },
      slots: { default: () => h('svg', { 'aria-hidden': 'true' }) },
    })
    expect(wrapper.classes()).toContain('chadvue-button--outline')
    expect(wrapper.classes()).toContain('chadvue-button--icon')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
  })
})

describe('TextField', () => {
  it('associa rótulo, placeholder, erro e descrição externa ao input', () => {
    const wrapper = mount(TextField, { props: { label: 'Nome', placeholder: 'Seu nome', error: 'Erro', required: true }, attrs: { 'aria-describedby': 'external', name: 'name', autocomplete: 'name' } })
    const input = wrapper.get('input')
    const id = input.attributes('id')
    expect(wrapper.get('label').attributes('for')).toBe(id)
    expect(input.attributes('aria-describedby')).toBe(`external ${id}-error`)
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('name')).toBe('name')
    expect(input.attributes('placeholder')).toBe('Seu nome')
    expect(input.attributes('description')).toBeUndefined()
    expect(wrapper.attributes('aria-describedby')).toBeUndefined()
  })
  it('emite novo valor e remove relação de erro quando corrigido', async () => {
    const wrapper = mount(TextField, { props: { label: 'Nome', error: 'Erro' } })
    await wrapper.get('input').setValue('Ana')
    expect(wrapper.emitted('update:modelValue')).toEqual([['Ana']])
    await wrapper.setProps({ error: undefined, modelValue: 'Ana' })
    expect(wrapper.get('input').attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.get('input').attributes('aria-describedby')).toBeUndefined()
    expect(wrapper.get('input').element.value).toBe('Ana')
  })
  it('gera identificadores distintos para instâncias irmãs', () => {
    const wrapper = mount(defineComponent({ components: { TextField }, template: '<TextField label="A"/><TextField label="B"/>' }))
    const ids = wrapper.findAll('input').map(input => input.attributes('id'))
    expect(new Set(ids).size).toBe(2)
  })
})

describe('Checkbox', () => {
  it('usa semântica nativa, associa rótulo e emite booleano', async () => {
    const wrapper = mount(Checkbox, { props: { label: 'Aceitar', required: true }, attrs: { name: 'consent' } })
    expect(wrapper.get('input').attributes('type')).toBe('checkbox')
    expect(wrapper.get('label').attributes('for')).toBe(wrapper.get('input').attributes('id'))
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    await wrapper.setProps({ modelValue: true, disabled: true })
    expect(wrapper.get('input').element.checked).toBe(true)
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
  })
})

describe('integração de locale', () => {
  it('renderiza o nome localizado do botão Fechar como atributo textual', () => {
    const wrapper = mount(defineComponent({ components: { LocaleProvider, Dialog }, setup: () => ({ messages: { 'pt-BR': { 'dialog.close': '<img src=x onerror=alert(1)>' } } }), template: '<LocaleProvider :messages="messages"><Dialog title="Detalhes" /></LocaleProvider>' }))
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.get('button').attributes('aria-label')).toBe('<img src=x onerror=alert(1)>')
  })
  it('atualiza textos internos sem recriar input ou apagar valor', async () => {
    const locale = ref('pt-BR')
    const wrapper = mount(defineComponent({
      components: { LocaleProvider, Button, TextField }, setup: () => ({ locale }),
      template: '<LocaleProvider :locale="locale"><Button aria-busy="true" disabled>Enviar</Button><TextField label="Nome" model-value="Ana" /></LocaleProvider>',
    }))
    const input = wrapper.get('input').element
    locale.value = 'en-US'
    await nextTick()
    expect(wrapper.get('input').element).toBe(input)
    expect(input.value).toBe('Ana')
  })
  it('isola provedores irmãos e usa fallback sem provedor', () => {
    const Consumer = defineComponent({ setup: () => ({ i18n: useI18n() }), template: '<span>{{ i18n.t("dialog.close") }}</span>' })
    const wrapper = mount(defineComponent({ components: { Consumer, LocaleProvider }, template: '<LocaleProvider locale="en-US"><Consumer/></LocaleProvider><LocaleProvider locale="pt-BR"><Consumer/></LocaleProvider><Consumer/>' }))
    expect(wrapper.findAll('span').map(x => x.text())).toEqual(['Close', 'Fechar', 'Fechar'])
  })
})
