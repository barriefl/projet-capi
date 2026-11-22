<script setup lang="ts">
import type { Backlog } from '../features/backlog'
import { serializeBacklog } from '../features/backlog'

const props = defineProps<{
  backlog: Backlog
}>()

function exportJson() {
  const json = serializeBacklog(props.backlog)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const slug = props.backlog.projet
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const a = document.createElement('a')
  a.href = url
  a.download = `${slug || 'backlog'}-estime.json`
  a.click()

  URL.revokeObjectURL(url)
}
</script>

<template>
  <button type="button" class="btn" @click="exportJson">Exporter le backlog (JSON)</button>
</template>
