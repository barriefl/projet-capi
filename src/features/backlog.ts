export interface Feature {
  id: string
  titre: string
  complexite: number | null
}

export interface Backlog {
  projet: string
  fonctionnalites: Feature[]
}

export function parseBacklog(json: string): Backlog {
  let parsed: unknown

  // Vérification de la validité du JSON.
  try {
    parsed = JSON.parse(json)
  } catch (error) {
    throw new Error("Le fichier fourni n'est pas un JSON valide.")
  }

  // Vérification de la structure du JSON.
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('La structure du fichier est invalide.')
  }

  // Vérification des champs requis du backlog.
  const backlog = parsed as Record<string, unknown>

  if (typeof backlog.projet !== 'string' || backlog.projet.trim() === '') {
    throw new Error("Le champ 'projet' est manquant ou invalide.")
  }

  if (!Array.isArray(backlog.fonctionnalites) || backlog.fonctionnalites.length === 0) {
    throw new Error("Le champ 'fonctionnalites' est manquant ou vide.")
  }

  // Vérification des fonctionnalités.
  const seenIds = new Set<string>()

  const fonctionnalites: Feature[] = backlog.fonctionnalites.map((fonctionnalite, index) => {
    if (typeof fonctionnalite !== 'object' || fonctionnalite === null) {
      throw new Error("La fonctionnalité #${index + 1} n'est pas valide.")
    }

    const item = fonctionnalite as Record<string, unknown>

    if (typeof item.id !== 'string' || item.id.trim() === '') {
      throw new Error(
        `La fonctionnalité #${index + 1} doit avoir un 'id' valide (chaîne de caractères).`,
      )
    }

    if (seenIds.has(item.id)) {
      throw new Error(`La fonctionnalité #${index + 1} est présente plusieurs fois.`)
    }
    seenIds.add(item.id)

    if (typeof item.titre !== 'string' || item.titre.trim() === '') {
      throw new Error(
        `La fonctionnalité #${index + 1} doit avoir un 'titre' valide (chaîne de caractères).`,
      )
    }
    if (item.complexite !== null && typeof item.complexite !== 'number') {
      throw new Error(
        `La complexité de la fonctionnalité #${index + 1} doit être un nombre ou null.`,
      )
    }

    return {
      id: item.id,
      titre: item.titre,
      complexite: item.complexite as number | null,
    }
  })

  return {
    projet: backlog.projet,
    fonctionnalites,
  }
}

export type ComplexityLevel = 'none' | 'low' | 'medium' | 'high'

export function getComplexityLevel(
  value: number | null,
  allValues: (number | null)[],
): ComplexityLevel {
  if (value === null) {
    return 'none'
  }

  const numbers = allValues.filter((v): v is number => v !== null).sort((a, b) => a - b)

  if (numbers.length === 0) return 'medium'

  const min = numbers[0]!
  const max = numbers[numbers.length - 1]!

  if (min === max) return 'medium'

  const q1 = min + (max - min) / 3
  const q2 = min + (2 * (max - min)) / 3

  if (value <= q1) return 'low'
  if (value <= q2) return 'medium'
  return 'high'
}
