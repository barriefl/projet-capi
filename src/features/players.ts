import type { Player } from './role';

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 10;

export function createPlayer(pseudos: string []): Player[] {
    if (pseudos.length < MIN_PLAYERS) {
        throw new Error(`Le nombre de joueurs doit être supérieur ou égal à ${MIN_PLAYERS}`);
    }

    // On crée la liste des joueurs à partir des pseudos fournis, id basé sur l'index du array + 1
    const listPlayers: Player[] = pseudos.map((pseudo, index) => ({
        id: index + 1,
        pseudo: pseudo.trim(),
    }));

    if (listPlayers.some((p) => p.pseudo === "" || p.pseudo === null || p.pseudo === undefined)) {
        throw new Error("Un ou plusieurs pseudos sont vides");
    }

    // On vérifie que les pseudos sont uniques en stockant les pseudos dans un set et on compare la taille 
    // du set avec la taille de la liste des joueurs. Si la taille est différente, il y'a donc des doublons.
    const uniquePseudos = new Set(listPlayers.map((p) => p.pseudo));
    if (uniquePseudos.size !== listPlayers.length) {
        throw new Error("Les pseudos doivent être uniques");
    }

    return listPlayers;
}