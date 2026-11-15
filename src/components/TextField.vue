<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import { Eye, EyeOff } from '@lucide/vue'
import { useI18n } from '../composables/i18n'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{
  modelValue?: string
  id?: string
  label: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
}>(), { modelValue: '', type: 'text', disabled: false, required: false })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const generated = useId()
const attrs = useAttrs()
const inputId = computed(() => props.id ?? `chadvue-field-${generated}`)
const showPassword = ref(false)
const i18n = useI18n()
const inputType = computed(() => props.type === 'password' && showPassword.value ? 'text' : props.type)
const passwordToggleLabel = computed(() => i18n.t(showPassword.value ? 'textfield.hidePassword' : 'textfield.showPassword'))
function inputAttrs() {
  // `description` was never a native input attribute; do not forward the removed prop.
  const forwarded = { ...attrs }
  delete forwarded.description
  return forwarded
}
function describedBy() {
  return [attrs['aria-describedby'], props.error && `${inputId.value}-error`].filter(Boolean).join(' ') || undefined
}
</script>

<template>
  <div class="chadvue-field tw:grid tw:gap-2 tw:font-ui tw:text-sm tw:leading-normal tw:font-medium tw:text-text">
    <label :for="inputId">{{ label }}</label>
    <div class="tw:relative">
      <input
        v-bind="inputAttrs()"
        :id="inputId"
        class="chadvue-input tw:box-border tw:min-h-control tw:w-full tw:cursor-text tw:rounded-control tw:border tw:bg-surface tw:px-2.5 tw:py-1 tw:font-ui tw:text-sm tw:leading-normal tw:font-normal tw:text-text tw:caret-black tw:transition-colors tw:duration-fast tw:placeholder:text-text-muted tw:focus-visible:border-focus tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-focus-ring tw:disabled:cursor-not-allowed tw:disabled:border-border tw:disabled:bg-disabled tw:disabled:text-disabled-text tw:motion-reduce:transition-none"
        :class="[error ? 'tw:border-danger' : 'tw:border-border-strong tw:enabled:hover:border-text-muted', type === 'password' ? 'tw:pr-10' : '']"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="describedBy()"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="type === 'password'"
        class="tw:absolute tw:top-1/2 tw:right-1 tw:grid tw:size-7 tw:-translate-y-1/2 tw:cursor-pointer tw:place-items-center tw:rounded-control tw:border-0 tw:bg-transparent tw:p-0 tw:text-text-muted tw:transition-colors tw:enabled:hover:bg-canvas tw:enabled:hover:text-text tw:focus-visible:outline-2 tw:focus-visible:outline-focus tw:focus-visible:outline-offset-1 tw:disabled:cursor-not-allowed tw:motion-reduce:transition-none"
        type="button"
        :aria-label="passwordToggleLabel"
        :aria-pressed="showPassword"
        :disabled="disabled"
        @click="showPassword = !showPassword"
      >
        <EyeOff v-if="showPassword" class="tw:size-4" aria-hidden="true" />
        <Eye v-else class="tw:size-4" aria-hidden="true" />
      </button>
    </div>
    <p v-if="error" :id="`${inputId}-error`" class="chadvue-error tw:m-0 tw:text-sm tw:leading-normal tw:font-normal tw:text-danger">{{ error }}</p>
  </div>
</template>
