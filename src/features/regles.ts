import type { Resultat } from './backlog'

export type Regle = 'stricte' | 'majorite_absolue'

export function testResultat(votes: number[], regle: Regle, tour: number): Resultat {
  // Vérification des entrées.
  if (!Array.isArray(votes) || votes.length === 0) {
    throw new Error('La liste des votes est vide ou invalide.')
  }
  if (typeof tour !== 'number' || tour < 1) {
    throw new Error('Le numéro du tour doit être un entier positif.')
  }
  if (regle !== 'stricte' && regle !== 'majorite_absolue') {
    throw new Error(`Règle inconnue: ${regle}`)
  }
  if (votes[0] === undefined) {
    throw new Error("Aucun vote n'a été fourni.")
  }

  // Application des règles en fonction du tour et de la règle spécifiée.
  if (regle === 'stricte') {
    return regleStricte(votes)
  } else if (tour == 1) {
    // Tour 1 : Règle stricte.
    return regleStricte(votes)
  } else if (tour > 1) {
    // Tours suivants : Règle majorité absolue.
    if (regle === 'majorite_absolue') {
      return regleMajoriteAbsolue(votes)
    } else {
      throw new Error(`Règle inconnue: ${regle}`)
    }
  } else {
    throw new Error(`Règle inconnue: ${regle}`)
  }
}

function regleStricte(votes: number[]): Resultat {
  // Vérification des entrées.
  if (!Array.isArray(votes) || votes.length === 0) {
    throw new Error('La liste des votes est vide ou invalide.')
  }
  if (votes[0] === undefined) {
    throw new Error("Aucun vote n'a été fourni.")
  }

  // Règle stricte : tous les votes doivent être identiques pour que le résultat soit valide.
  const firstVote = votes[0]
  const allSame = votes.every((vote) => vote === firstVote)
  if (allSame) {
    return { statut: 'valide', complexite: firstVote }
  } else {
    return { statut: 'revote' }
  }
}

function regleMajoriteAbsolue(votes: number[]): Resultat {
  // Vérification des entrées.
  if (!Array.isArray(votes) || votes.length === 0) {
    throw new Error('La liste des votes est vide ou invalide.')
  }
  if (votes[0] === undefined) {
    throw new Error("Aucun vote n'a été fourni.")
  }

  // Règle majorité absolue : un vote est valide si plus de la moitié des votes sont identiques.
  const voteCounts = new Map<number, number>()
  for (const vote of votes) {
    voteCounts.set(vote, (voteCounts.get(vote) || 0) + 1)
  }
  const majorityThreshold = Math.floor(votes.length / 2) + 1
  for (const [vote, count] of voteCounts.entries()) {
    if (count >= majorityThreshold) {
      return { statut: 'valide', complexite: vote }
    }
  }

  return { statut: 'revote' }
}
