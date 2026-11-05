<script setup lang="ts">
import { ref } from 'vue'
import { createPlayer, MIN_PLAYERS, MAX_PLAYERS } from '../features/players'
import type { Player } from '../features/role'

// On définit les props et les événements émis par le composant
// ce qui veut dire que le composant peut recevoir une liste initiale de joueurs 
// et émettre un événement "validated" avec la liste des joueurs validés
const emit = defineEmits<{ validated: [players: Player[]] }>()

const pseudos = ref<string[]>(Array.from({ length: MIN_PLAYERS }, () => ''))
const error = ref('')

// Ajouter un joueur si le nombre maximum n'est pas atteint
function addPlayer() {
  if (pseudos.value.length < MAX_PLAYERS) pseudos.value.push('')
}

// Supprimer un joueur si le nombre minimum n'est pas atteint
function removePlayer() {
  if (pseudos.value.length > MIN_PLAYERS) pseudos.value.pop()
}

function submit() {
  error.value = ''
  try {
    emit('validated', createPlayer(pseudos.value))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur inconnue'
  }
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <h2>Les joueurs</h2>

    <div class="count">
      <span>Nombre de joueurs</span>
      <div class="stepper">
        <button type="button" class="btn btn-secondary" :disabled="pseudos.length <= MIN_PLAYERS" @click="removePlayer">
          −
        </button>
        <strong>{{ pseudos.length }}</strong>
        <button type="button" class="btn btn-secondary" :disabled="pseudos.length >= MAX_PLAYERS" @click="addPlayer">
          +
        </button>
      </div>
    </div>

    <div v-for="(_, i) in pseudos" :key="i" class="field">
      <label :for="`pseudo-${i}`">Joueur {{ i + 1 }}</label>
      <input :id="`pseudo-${i}`" v-model="pseudos[i]" type="text" placeholder="Pseudo" />
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <button type="submit" class="btn">Valider les joueurs</button>
  </form>
</template>

<style scoped>
.count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stepper .btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.field {
  margin-bottom: 0.75rem;
}

.field label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: var(--muted);
}
</style>