import type { Resultat } from './backlog'

export type Regle = 'stricte' | 'majorite_absolue'


/**
 * Cette fonction détermine le résultat d'un vote en fonction de la règle spécifiée et du tour actuel.
 * Pour le tour 1, la règle appliquée est toujours la règle stricte.
 *
 * @param votes Un tableau de nombres représentant les votes.
 * @param regle La règle utilisée pour déterminer le résultat du vote.
 * @param tour Le numéro du tour actuel.
 * 
 * @returns Un objet de type `Resultat` au format `{ statut: 'valide', complexite: number }` ou `{ statut: 'revote' }` indiquant si le résultat est valide ou s'il faut revoter.
 *
 * @throws 
 * - Error si la liste des votes est vide ou invalide.
 * - Error si le numéro du tour n'est pas un entier positif.
 * - Error si la règle est inconnue.
 * 
 * @remarks
 * Décisions de la table :
 * - Règle stricte : Les joueurs ont votés à l'unanimité pour la même valeur : validé, voir ligne 1.
 * - Règle stricte : Les joueurs ne se sont pas accordés sur la même valeur : revote, voir ligne 2.
 * - Règle majorité absolue au tour 1 : Il y a une égalité entre deux valeurs : revote, voir ligne 3.
 * - Règle majorité absolue au tour 2 : Les joueurs ont votés à la majorité pour une valeur : validé, voir ligne 4.
 * - Règle majorité absolue au tour 1 : Les joueurs ont votés à l'unanimité pour la même valeur : validé, voir ligne 5.
 * - Règle majorité absolue au tour 1 : Les joueurs ont votés à la majorité absolue pour une valeur, mais au premier tour c'est la règle stricte qui s'applique : revote, voir ligne 6.
 *
 */
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

/**
 * Cette fonction applique la règle stricte pour déterminer le résultat d'un vote.
 * Pour que le résultat soit validé, tous les votes doivent être identiques, et ce peu importe le numéro du tour.
 *
 * @param votes Un tableau de nombres représentant les votes.
 * @returns Si tous les votes sont identiques on renvoie un objet de type `Resultat` avec le format `{ statut: 'valide', complexite: number }` où complexité est la valeur retenue. 
 *          Sinon on renvoie `{ statut: 'revote' }`.
 *
 * @throws Error si la liste des votes est vide ou invalide.
 * 
 * @remarks
 * Décisions de la table :
 * - Règle stricte : Les joueurs ont votés à l'unanimité pour la même valeur : validé, voir ligne 1.
 * - Règle stricte : Les joueurs ne se sont pas accordés sur la même valeur : revote, voir ligne 2.
 *
 */
export function regleStricte(votes: number[]): Resultat {
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


/**
 * Cette fonction applique la règle de majorité absolue pour déterminer le résultat d'un vote.
 * Pour que le résultat soit validé, il faut que le nombre de votes soit de 50% + 1 vote pour une valeur donnée.
 *
 * @param votes Un tableau de nombres représentant les votes.
 * 
 * @returns Si un vote atteint le seuil de majorité absolue, on renvoie un objet de type `Resultat` avec le format `{ statut: 'valide', complexite: number }` où complexité est la valeur retenue. 
 *          Sinon on renvoie `{ statut: 'revote' }`.
 *
 * @throws Error si la liste des votes est vide ou invalide.
 * 
 * @remarks
 * Décisions de la table :
 * - Règle majorité absolue : Il y a une égalité entre deux valeurs et donc pas de majorité absolue : revote, voir ligne 3.
 * - Règle majorité absolue : Les joueurs ont votés à la majorité pour une valeur : validé, voir ligne 4.
 *
 */
export function regleMajoriteAbsolue(votes: number[]): Resultat {
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
