import { describe, expect, test } from 'vitest'

type Regle = 'stricte' | 'majorite_absolue'
type Resultat = | {statut: 'valide' ; complexite: number } | {statut: 'revote'}

function testResultat(votes: number[], regle: Regle, tour: number): Resultat {
  throw new Error('la fonction testResultat n\'est pas encore implémentée')
}

describe('Règle stricte', () => {
  test('test_CA_01_1_strict_premier_tour', () => {
    // Ce cas est important car la règle stricte est la plus simple à implémenter et obligatoire pour la suite des tests.
    // Arrange
    const votes = [5, 5, 5]
    // Act
    const resultat = testResultat(votes, 'stricte', 1)
    // Assert
    expect(resultat).toEqual({statut: 'valide', complexite: 5})
  })

  test('test_CA_01_1_strict_premier_tour_revote', () => {
    // Ce cas est important car il teste le cas les joueurs n'ont pas voté de manière unanime au premier tour, ce qui les oblige à revoter.
    // Arrange
    const votes = [5, 5, 8]
    // Act
    const resultat = testResultat(votes, 'stricte', 1)
    // Assert
    expect(resultat).toEqual({statut: 'revote'})
  })
})

describe('Règle de la majorité absolue', () => {
  test('test_CA_02_1_maj_absolue_premier_tour_revote', () => {
    // Arrange
    const votes = [13, 13, 20, 20]
    // Act
    const resultat = testResultat(votes, 'majorite_absolue', 1)
    // Assert
    expect(resultat).toEqual({statut: 'revote'})
  })

  test('test_CA_02_1_maj_absolue_second_tour', () => {
    // Ce cas est important car il teste le cas où les joueurs ont revoté et qu'il y a une majorité absolue vérifiée au second tour.
    // Arrange
    const votes = [13, 13, 13, 20]
    // Act
    const resultat = testResultat(votes, 'majorite_absolue', 2)
    // Assert
    expect(resultat).toEqual({statut: 'valide', complexite: 13})
  })

  test('test_CA_03_1_maj_absolue_unanimite_premier_tour', () => {
    // Arrange
    const votes = [13, 13, 13, 13]
    // Act
    const resultat = testResultat(votes, 'majorite_absolue', 1)
    // Assert
    expect(resultat).toEqual({statut: 'valide', complexite: 13})
  })

    test('test_CA_03_1_maj_absolue_pas_unanimite_premier_tour_revote', () => {
    // Arrange
    const votes = [13, 13, 13, 20]
    // Act
    const resultat = testResultat(votes, 'majorite_absolue', 1)
    // Assert
    expect(resultat).toEqual({statut: 'revote'})
  })
})