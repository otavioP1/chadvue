<script setup lang="ts">
import { useI18n } from '../src'
const { formatNumber, formatDate, locale } = useI18n()
</script>
<template>
  <p data-testid="format-example" :lang="locale">{{ formatNumber(1234.5, { style: 'currency', currency: 'BRL' }) }} · {{ formatDate(new Date('2026-11-15T12:00:00Z'), { dateStyle: 'long', timeZone: 'UTC' }) }}</p>
</template>
