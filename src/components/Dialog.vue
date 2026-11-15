<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { X } from '@lucide/vue'
import { useI18n } from '../composables/i18n'
const props = withDefaults(defineProps<{ open?: boolean; title: string; description?: string }>(), { open: false })
const emit = defineEmits<{ 'update:open': [value: boolean]; close: [] }>()
const dialog = ref<HTMLDialogElement>()
const id = useId()
const titleId = computed(() => `chadvue-dialog-${id}-title`)
const { t, locale } = useI18n()
let previousFocus: HTMLElement | null = null

function sync() {
  if (!dialog.value) return
  if (props.open && !dialog.value.open) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.value.showModal()
  } else if (!props.open && dialog.value.open) dialog.value.close()
}
function requestClose() { emit('update:open', false) }
function keepFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !dialog.value) return
  const controls = Array.from(dialog.value.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]'))
    .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && element.getClientRects().length > 0)
  const first = controls[0]
  const last = controls.at(-1)
  const active = document.activeElement
  if (event.shiftKey && active === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus() }
}
function closed() {
  if (props.open) emit('update:open', false)
  emit('close')
  if (previousFocus?.isConnected) previousFocus.focus()
  previousFocus = null
}
onMounted(sync)
watch(() => props.open, sync, { flush: 'post' })
onBeforeUnmount(() => { if (dialog.value?.open) { dialog.value.close(); previousFocus?.focus() } })
</script>

<template>
  <dialog
    ref="dialog"
    class="chadvue-dialog tw:box-border tw:max-h-[calc(100%_-_2rem)] tw:w-[32rem] tw:max-w-[calc(100%_-_2rem)] tw:overflow-auto tw:rounded-dialog tw:border tw:border-border tw:bg-surface tw:p-6 tw:font-ui tw:text-base tw:leading-normal tw:text-text tw:shadow-dialog [&::backdrop]:tw:bg-backdrop [&::backdrop]:tw:animate-dialog-fade motion-reduce:[&::backdrop]:tw:animate-none"
    :aria-labelledby="titleId"
    :aria-describedby="description ? `${titleId}-description` : undefined"
    @cancel.prevent="requestClose"
    @close="closed"
    @keydown="keepFocus"
  >
    <div class="chadvue-dialog-header tw:mb-4 tw:flex tw:items-start tw:justify-between tw:gap-4">
      <h2 :id="titleId" class="tw:m-0 tw:[overflow-wrap:anywhere] tw:text-lg tw:leading-tight tw:font-semibold tw:tracking-[-0.015em]">{{ title }}</h2>
      <button
        type="button"
        class="chadvue-dialog-close tw:-mt-1 tw:-mr-1 tw:inline-grid tw:size-control tw:shrink-0 tw:place-items-center tw:rounded-control tw:border tw:border-transparent tw:bg-transparent tw:text-muted tw:transition-colors tw:duration-fast tw:enabled:hover:bg-canvas tw:enabled:hover:text-text tw:enabled:active:bg-secondary-active tw:focus-visible:outline-2 tw:focus-visible:outline-focus tw:focus-visible:outline-offset-2 tw:focus-visible:ring-4 tw:focus-visible:ring-surface tw:motion-reduce:transition-none"
        :lang="locale"
        :aria-label="t('dialog.close')"
        autofocus
        @click="requestClose"
      >
        <X :size="16" :stroke-width="1.75" aria-hidden="true" />
      </button>
    </div>
    <p v-if="description" :id="`${titleId}-description`" class="tw:mt-0 tw:mb-4 tw:text-muted">{{ description }}</p>
    <slot />
    <div v-if="$slots.footer" class="chadvue-dialog-footer tw:mt-6 tw:flex tw:flex-wrap tw:justify-end tw:gap-2"><slot name="footer" /></div>
  </dialog>
</template>
