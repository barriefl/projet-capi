<script setup lang="ts">
import { ref } from 'vue'
import { parseBacklog, type Backlog } from '../features/backlog'

const emit = defineEmits<{ imported: [backlog: Backlog] }>()

const error = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function processFile(file: File | undefined) {
  error.value = ''
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      const backlog = parseBacklog(content)
      emit('imported', backlog)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la lecture du fichier.'
      if (fileInput.value) fileInput.value.value = ''
    }
  }

  reader.readAsText(file)
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  processFile(target.files?.[0])
}

function handleDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0]
  processFile(file)
}
</script>

<template>
  <div class="card">
    <h2>Importer un Backlog</h2>
    <p class="description">Sélectionnez un fichier JSON contenant les fonctionnalités à estimer.</p>

    <div class="dropzone" @dragover.prevent @drop.prevent="handleDrop">
      <input
        id="file-upload"
        ref="fileInput"
        type="file"
        accept=".json,application/json"
        class="hidden-input"
        @change="handleFileUpload"
      />

      <label for="file-upload" class="btn"> Choisir un fichier JSON </label>
      <span class="drop-hint">ou glisser-déposer le fichier ici</span>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.description {
  margin-bottom: 1rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  background: rgba(91, 75, 219, 0.02);
  transition: border-color 0.2s ease;
}

.dropzone:hover {
  border-color: var(--primary);
}

.hidden-input {
  display: none;
}

.drop-hint {
  font-size: 0.85rem;
  color: var(--muted);
}
</style>
