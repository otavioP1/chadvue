<script setup lang="ts">
import { computed, useId } from 'vue'
import { Check } from '@lucide/vue'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: boolean; id?: string; label: string; disabled?: boolean; required?: boolean }>(), { modelValue: false, disabled: false, required: false })
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const generated = useId()
const inputId = computed(() => props.id ?? `chadvue-checkbox-${generated}`)
</script>

<template>
  <div class="chadvue-checkbox tw:flex tw:min-h-10 tw:items-center tw:gap-2 tw:font-ui tw:text-sm tw:leading-normal" :class="disabled ? 'tw:text-disabled-text' : 'tw:text-text'">
    <span
      class="tw:relative tw:grid tw:box-border tw:size-4 tw:shrink-0 tw:place-items-center tw:rounded-[2px] tw:border tw:transition-colors tw:duration-fast"
      :class="modelValue
        ? disabled ? 'tw:border-disabled-text tw:bg-disabled-text' : 'tw:border-primary tw:bg-primary'
        : disabled ? 'tw:border-border tw:bg-disabled' : 'tw:border-border-strong tw:bg-surface'"
    >
      <input
        v-bind="$attrs"
        :id="inputId"
        type="checkbox"
        class="chadvue-checkbox-input tw:absolute tw:inset-0 tw:z-10 tw:m-0 tw:size-4 tw:cursor-pointer tw:appearance-none tw:rounded-[2px] tw:border-0 tw:bg-transparent tw:p-0 tw:focus-visible:outline-2 tw:focus-visible:outline-focus tw:focus-visible:outline-offset-2 tw:focus-visible:ring-2 tw:focus-visible:ring-focus-ring tw:disabled:cursor-not-allowed forced-colors:tw:appearance-auto forced-colors:tw:accent-[Highlight] tw:motion-reduce:transition-none"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <Check v-if="modelValue" class="tw:pointer-events-none tw:relative tw:z-20 tw:size-3 tw:stroke-[3] tw:text-on-primary forced-colors:tw:hidden" aria-hidden="true" />
    </span>
    <label :class="disabled ? 'tw:cursor-not-allowed' : 'tw:cursor-pointer'" :for="inputId">{{ label }}</label>
  </div>
</template>
