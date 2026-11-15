<script setup lang="ts">
import { toRef } from 'vue'
import { provideI18n } from '../composables/i18n'
import type { Catalogs } from '../locales/messages'

const props = withDefaults(defineProps<{ locale?: string; messages?: Catalogs }>(), { locale: 'pt-BR' })
provideI18n({ locale: toRef(props, 'locale'), messages: props.messages })
</script>

<template><slot /></template>
