<script setup lang="ts">
import { ref, computed } from 'vue'
import PlayerSetup from './components/PlayerSetup.vue'
import BacklogImport from './components/BacklogImport.vue'
import type { Player, Backlog } from './features'
import { getComplexityLevel } from './features/backlog'
import { CARDS, selectCard } from './features/cards'
import type { Card, Vote } from './features/cards'

const votes = ref<Vote[]>([])
const players = ref<Player[] | null>(null)
const backlog = ref<Backlog | null>(null)

const allComplexities = computed(() => {
  return backlog.value?.fonctionnalites.map((f) => f.complexite) ?? []
})

function vote(playerId: number, card:Card) {
  votes.value = selectCard(votes.value, playerId, card)
}

function verifVote(playerId: number, card:Card): boolean {
  return votes.value.some((v) => v.playerId === playerId && v.card === card)
}

function getBadgeClass(complexite: number | null): string {
  const level = getComplexityLevel(complexite, allComplexities.value)
  return `badge-${level}`
}
</script>

<template>
  <main class="container">
    <h1>Planning Poker</h1>
    <p class="subtitle">Estimez vos fonctionnalités en équipe.</p>

    <!-- 1. Saisie des joueurs -->
    <PlayerSetup v-if="!players" @validated="players = $event" />

    <template v-else>
      <section class="card">
        <h2>Joueurs ({{ players.length }})</h2>
        <ul class="players">
          <li v-for="p in players" :key="p.id">{{ p.pseudo }}</li>
        </ul>
      </section>

      <!-- 2. Import du backlog. -->
      <BacklogImport v-if="!backlog" @imported="backlog = $event" />

      <section v-else class="card">
        <h2>Projet : {{ backlog.projet }}</h2>
        <ul class="backlog-list">
          <li v-for="item in backlog.fonctionnalites" :key="item.id" class="feature-item">
            <div class="feature-content">
              <span class="feature-id">[{{ item.id }}]</span>
              <span class="feature-title">{{ item.titre }}</span>
            </div>
            <span :class="['badge', getBadgeClass(item.complexite)]">
              {{ item.complexite !== null ? `Complexité : ${item.complexite}` : 'Non estimée' }}
            </span>
          </li>
        </ul>
      </section>

      <!-- 3. Vote -->
      <section v-if="backlog" class="card">
      <h2>Vote</h2>
      <div v-for="p in players" :key="p.id" class="vote-row">
        <strong class="vote-player">{{ p.pseudo }}</strong>
        <button
          v-for="c in CARDS"
          :key="c"
          type="button"
          :class="['poker-card', { selected: verifVote(p.id, c) }]"
          @click="vote(p.id, c)"
        >
          {{ c }}
        </button>
      </div>

      <pre>{{ votes }}</pre>
    </section>

    </template>
  </main>
</template>

<style scoped>
/* Players. */
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

/* Backlog. */
.backlog-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.backlog-list li {
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.backlog-list li:last-child {
  border-bottom: none;
}

.feature-item {
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-id {
  font-weight: 700;
  color: var(--text);
}

.feature-title {
  color: var(--text);
}

.badge {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  white-space: nowrap;
}

.badge-none {
  background: #f3f4f6;
  color: #6b7280;
}

.badge-low {
  background: #e6f4ea;
  color: #137333;
}

.badge-medium {
  background: #fef7e0;
  color: #b06000;
}

.badge-high {
  background: #fce8e6;
  color: #c5221f;
}

.vote-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.vote-player {
  min-width: 6rem;
}

.poker-card {
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.poker-card.selected {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
</style>
