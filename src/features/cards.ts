export const CARDS = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100] as const
// Carte café à ajouter quand on fera l'US-06

export type Card = (typeof CARDS)[number]

export interface Vote {
  playerId: number
  card: Card
}

// On sélectionne la carte du joueur et on retourne la liste des votes mise à jour
// si le joueur avait déjà voté, on remplace son vote par le nouveau

export function selectCard(votes: Vote[], playerId: number, card: Card): Vote[] {
  
  const otherVotes = votes.filter((vote) => vote.playerId !== playerId)
  const newVote: Vote = { playerId, card }

  return [...otherVotes, newVote]

}
