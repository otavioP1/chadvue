export const ptBR = {
  'dialog.close': 'Fechar',
  'textfield.showPassword': 'Mostrar senha',
  'textfield.hidePassword': 'Ocultar senha',
}

export const enUS: typeof ptBR = {
  'dialog.close': 'Close',
  'textfield.showPassword': 'Show password',
  'textfield.hidePassword': 'Hide password',
}

export type MessageKey = keyof typeof ptBR
export type Messages = Record<string, string>
export type Catalogs = Record<string, Messages>
