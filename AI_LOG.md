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

### 2026-11-05 : Générer l'interface pour l'import du backlog, améliorer la vérification de la structure du fichier et quartiles (US-05).

- **Demande (résumé fidèle)** : Je lui ai demandé de me générer une interface pour l'importation du backlog.<br> Contexte : Il a reçu les fichiers `backlog.ts` et `main.css`.<br> Il a généré `BacklogImport.vue` ainsi que du CSS et du code pour le fichier `App.vue`.
- **Résultat** : Modifié, j'ai demandé un ajout de quartiles pour rendre la couleur de la complexité des fonctionnalités dynamique.
- **Ce que nous avons vérifié** : Lecture ligne à ligne + tests à la main des tests de l'import du backlog grâce à `newBacklog.json`, `backlog.json` et `badBacklog.json` dans le dossier `/exemples`.
- **Ce que nous avons changé ou rejeté, et pourquoi** : J'ai demandé un ajout de quartiles afin de donner une couleur intuitive et dynamique à la complexité des fonctionnalités du backlog.

## Bilan (à compléter en séance 4, 3 lignes)

- Nombre d'entrées et de propositions rejetées ou corrigées :
- Tâches où l'IA a fait gagner du temps :
- Tâches où l'IA a fait perdre du temps :
