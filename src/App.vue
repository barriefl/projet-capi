<script setup lang="ts">
import { ref } from 'vue'
import PlayerSetup from './components/PlayerSetup.vue'
import type { Player } from './features/role'

const players = ref<Player[] | null>(null)
</script>

<template>
  <main class="container">
    <h1>Planning Poker</h1>
    <p class="subtitle">Estimez vos fonctionnalités en équipe.</p>

    <PlayerSetup v-if="!players" @validated="players = $event" />

    <section v-else class="card">
      <h2>Joueurs ({{ players.length }})</h2>
      <ul class="players">
        <li v-for="p in players" :key="p.id">{{ p.pseudo }}</li>
      </ul>

    </section>
  </main>
</template>

<style scoped>
.players {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
}

.players li {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: rgba(91, 75, 219, 0.12);
  color: var(--primary);
  font-weight: 500;
}
</style>