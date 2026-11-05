# AI_LOG.md : journal d'usage de l'IA

> À placer à la racine du dépôt. À remplir **au fil de l'eau**, pas en fin de projet. Une entrée par tâche (pas par message), en 5 lignes.
> Rappel : l'IA est autorisée pour le **code de production** et la **configuration d'outils** uniquement. Qui a fait la demande, les fichiers touchés et les commits se retrouvent dans l'historique Git : ne les recopiez pas.

## Outils utilisés (à remplir une fois)

| Outil  | Modèle (si connu) | Mode (autocomplétion, chat, agent) |
| ------ | ----------------- | ---------------------------------- |
| Claude | Sonnet            | Autocomplétion & Chat              |
| Gemini | Flash & Pro       | Autocomplétion & Chat              |

Fichier d'instructions pour agent versionné (`CLAUDE.md`, `AGENTS.md`...) : Non.

## Entrées

### AAAA-MM-JJ : <tâche en une ligne> (US-xx)

- **Demande (résumé fidèle)** : <ce que vous avez demandé, avec le contexte fourni : fichiers, tests...>
- **Résultat** : <accepté tel quel / modifié / rejeté>
- **Ce que nous avons vérifié** : <tests lancés, lecture ligne à ligne, essai manuel...>
- **Ce que nous avons changé ou rejeté, et pourquoi** :

### 2026-11-04 : Générer l'interface pour l'ajout de joueurs (US-07)
- **Demande (résumé fidèle)** : J'ai demandé une interface pour visualiser ce que nous avons fait pour l'US 07. Contexte : je lui ai fourni le fichier role.ts et players.ts
- **Résultat** : Modifié
- **Ce que nous avons vérifié** : Lecture ligne à ligne et essai manuel
- **Ce que nous avons changé ou rejeté, et pourquoi** : Ajout d'un nombre de max de joueurs, et suppression de features non demandées que l'IA avait rajoutées (exemple : modification des pseudos après validation)

## Bilan (à compléter en séance 4, 3 lignes)

- Nombre d'entrées et de propositions rejetées ou corrigées :
- Tâches où l'IA a fait gagner du temps :
- Tâches où l'IA a fait perdre du temps :
