import { Button, TextField, Checkbox, Dialog, createI18n } from 'chadvue'

const button: InstanceType<typeof Button>['$props'] = { variant: 'secondary', size: 'icon', disabled: true }
const dangerButton: InstanceType<typeof Button>['$props'] = { variant: 'danger' }
const field: InstanceType<typeof TextField>['$props'] = { label: 'Nome', modelValue: 'Ana' }
const checkbox: InstanceType<typeof Checkbox>['$props'] = { label: 'Aceitar', modelValue: true }
const dialog: InstanceType<typeof Dialog>['$props'] = { title: 'Detalhes', open: false }
// @ts-expect-error A API pública não aceita variantes arbitrárias.
const invalidButton: InstanceType<typeof Button>['$props'] = { variant: 'unknown' }
// @ts-expect-error Estados de carregamento são compostos pelo consumidor, não são uma prop do Button.
const invalidLoading: InstanceType<typeof Button>['$props'] = { loading: true }
// @ts-expect-error Campos exigem rótulo explícito.
const invalidField: InstanceType<typeof TextField>['$props'] = { modelValue: '' }
createI18n({ locale: 'en-US' }).t('dialog.close')
void [button, dangerButton, field, checkbox, dialog, invalidButton, invalidLoading, invalidField]
