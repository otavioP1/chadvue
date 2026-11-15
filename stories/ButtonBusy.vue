<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue'
import { Button } from '../src'
</script>

<template>
  <Button disabled aria-busy="true">
    <LoaderCircle class="tw:size-3.5 tw:animate-spin motion-reduce:tw:animate-none" aria-hidden="true" />
    Salvar
  </Button>
</template>
