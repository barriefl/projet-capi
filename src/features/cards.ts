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

// on compare la liste des votes avec la liste des joueurs pour savoir si tous les joueurs ont voté
export function allPlayersVoted(votes: Vote[], playerIds: number[]): boolean {
  return playerIds.every((playerId) => votes.some((vote) => vote.playerId === playerId))
}

// on récupère la carte du joueur à partir de la liste des votes en fonction de son id
export function getVote(votes: Vote[], playerId: number): Card | undefined {
  const vote = votes.find((vote) => vote.playerId === playerId)
  return vote?.card
}
