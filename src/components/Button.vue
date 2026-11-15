<script setup lang="ts">
const variantClasses = {
  primary: 'tw:bg-primary tw:text-on-primary tw:enabled:hover:bg-primary-hover tw:enabled:active:bg-primary-active',
  secondary: 'tw:bg-secondary tw:text-text tw:enabled:hover:bg-secondary-hover tw:enabled:active:bg-secondary-active',
  outline: 'tw:border-border-strong tw:bg-surface tw:text-text tw:enabled:hover:border-text-muted tw:enabled:hover:bg-canvas tw:enabled:active:border-text tw:enabled:active:bg-disabled',
  danger: 'tw:bg-danger tw:text-on-primary tw:enabled:hover:bg-danger-hover tw:enabled:active:bg-danger-active',
} as const
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'default' | 'icon'
  disabled?: boolean
}>(), { type: 'button', variant: 'primary', size: 'default', disabled: false })
</script>

<template>
  <button
    class="chadvue-button tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:cursor-pointer tw:rounded-control tw:border tw:border-transparent tw:px-3 tw:py-1 tw:font-ui tw:text-sm tw:leading-normal tw:font-semibold tw:transition-colors tw:duration-fast tw:enabled:active:translate-y-px tw:focus-visible:outline-2 tw:focus-visible:outline-focus tw:focus-visible:outline-offset-2 tw:focus-visible:ring-4 tw:focus-visible:ring-surface tw:disabled:cursor-not-allowed tw:disabled:border-border tw:disabled:bg-disabled tw:disabled:text-disabled-text tw:motion-reduce:transition-none"
    :class="[`chadvue-button--${variant}`, variantClasses[variant], size === 'icon' ? 'chadvue-button--icon tw:size-control tw:p-0' : 'tw:min-h-control']"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
