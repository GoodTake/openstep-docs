---
title: Push et publication
description: Enregistrez vos changements dans l'agent avec push, puis mettez toutes les Apps en ligne ensemble avec publish.
sidebar:
  order: 6
---

Pousser et publier sont deux étapes. Pousser enregistre votre code source dans l'agent. Publier met en ligne le code source enregistré. Pousser ne publie jamais.

Les deux agissent sur l'agent entier : toutes les Apps avancent donc ensemble.

## Enregistrer vos changements

1. Voyez ce qui a changé. Cela compare votre dossier avec le code source accepté de l'agent, pour chaque App. Cela montre aussi si l'agent a changé depuis votre dernière synchronisation, par exemple parce que le builder a terminé un tour.

   ```sh
   openstep diff
   ```

2. Récupérez tout ce qui est nouveau côté agent. Pull fusionne les changements acceptés de l'agent dans votre dossier et n'écrase pas vos propres modifications.

   ```sh
   openstep pull
   ```

3. Si pull signale un conflit, ouvrez le fichier et gardez le texte que vous voulez. Pour un fichier binaire, gardez la version que vous voulez. Dites ensuite à la CLI que le fichier est réglé. Faites-le pour chaque fichier en conflit.

   ```sh
   openstep resolve apps/web/src/App.tsx
   ```

4. Poussez.

   ```sh
   openstep push
   ```

   L'agent détient désormais vos changements comme son code source. La version en ligne ne change pas.

## Publier

Publier est réservé aux propriétaires.

1. Lancez publish. La note est facultative. Elle doit faire de 1 à 500 caractères.

   ```sh
   openstep publish --note "First release"
   ```

   Publish exige que chaque App soit synchronisée, sans conflit et sans modification non poussée. Il ne pousse jamais à votre place. S'il indique que votre code source local contient des modifications non publiées, examinez le diff et poussez d'abord.

2. Vérifiez comment cela s'est passé. Utilisez l'ID d'opération donné par la commande publish. Une publication est terminée quand son statut est `succeeded`.

   ```sh
   openstep status <operation-id>
   ```

   `openstep status` sans ID lit la dernière publication, le dernier stage, rollback, unpublish ou republish que vous avez lancé. S'il n'y en a aucun, il lit l'agent.

Publier conserve vos données. Voir [Publier et partager](/fr/agent/publish-and-share/) pour savoir qui peut ouvrir les Apps en ligne et ce que voit un visiteur.

## Préparer un candidat à relire

Un stage construit un candidat à partir du code source accepté de l'agent, comme le ferait Publish, et s'arrête avant la mise en ligne. La version en ligne ne change pas. Les propriétaires et les éditeurs peuvent lancer un stage.

1. Lancez stage. Comme publish, il exige que chaque App soit synchronisée, sans conflit et sans modification non poussée. La note est facultative.

   ```sh
   openstep stage --note "Candidate for review"
   ```

2. Vérifiez comment cela s'est passé avec l'ID d'opération. Une fois le statut à `succeeded`, la sortie liste `reviewLinks`, un lien pour chaque App.

   ```sh
   openstep status <operation-id>
   ```

3. Le propriétaire de l'agent et les membres de son workspace peuvent ouvrir les liens et essayer le candidat. Il fonctionne sur les données du site en ligne : ce qu'ils y font modifie ces données, et ses nouvelles tables et colonnes peuvent atteindre la base de données en ligne dès le stage. Un propriétaire ou un éditeur le met en ligne depuis **Console**, puis **Production**, avec **Put candidate live**. La CLI n'a pas de commande pour cela.
4. Exécutez `openstep pull`. Un stage, comme une publication, peut ajouter des fichiers de la plateforme comme `.steps/world/*.json` au code source accepté de l'agent.

Pousser du nouveau code rend le candidat périmé : il ne peut plus être mis en ligne. Une publication, un rollback, un unpublish, un republish ou un stage plus récent le supprime.

## Revenir en arrière, dépublier et republier

Ces commandes agissent aussi sur l'agent entier. Elles n'ont pas d'option `--app`. Toutes acceptent un `--note` facultatif.

```sh
openstep rollback <generation-id> --note "Restore prior release"
openstep unpublish --note "Take the agent offline"
openstep republish --note "Bring back the last live version"
```

- rollback restaure une version antérieure que l'agent conserve encore. Une publication réussie indique l'ID de la version qu'elle a créée.
- unpublish met toutes les Apps hors ligne.
- republish ramène la version que vous aviez mise hors ligne avec unpublish.

Pour les mêmes actions dans le navigateur, voir [Mettre en ligne](/fr/build/go-live/).

## Si un résultat est inconnu

Si un push ou une publication est interrompu, par exemple par une coupure réseau, vous ne savez peut-être pas s'il a abouti. N'en lancez pas un nouveau.

- Exécutez de nouveau la même commande depuis le même dossier. La CLI se souvient de la requête qu'elle a envoyée et demande à la plateforme ce qui s'est passé. Elle n'envoie pas le changement deux fois.
- Pour une publication, `openstep status <operation-id>` lit cette même opération.
- Si un push indique que vos changements sont acceptés mais encore en cours de synchronisation, exécutez `openstep pull` avant de publier.
- Tant qu'une commande de mise en ligne est encore en attente, exécuter n'importe quelle commande de mise en ligne ne fait que lire celle qui est en attente. Cela n'en démarre pas une autre.
- Tant qu'un push est encore en attente, publish refuse de démarrer. Terminez d'abord le push.
- Gardez `.openstep/` tel quel. Ne supprimez pas de fichiers qui s'y trouvent pour vous débloquer.

## À savoir

- Pousser, lancer un stage et revenir en arrière sont réservés aux propriétaires et aux éditeurs. Publier, dépublier et republier sont réservés aux propriétaires.
- Pendant que le builder exécute une construction planifiée, l'agent est en lecture seule. Attendez qu'il termine, puis faites `pull`, puis push.
- `diff`, `push` et `pull` laissent de côté les fichiers qu'ignorent les `.gitignore` du dossier d'une App, comme `dist/`, sauf si le code source accepté de l'agent les contient déjà, comme Git le fait pour les fichiers qu'il suit déjà. Ces fichiers ne comptent pas non plus comme des modifications non poussées quand vous publiez. Pour retirer un tel fichier du code source accepté, supprimez-le dans votre dossier, puis poussez.
- Les fichiers dont le nom commence par `.env`, les fichiers `.npmrc`, les fichiers de clés et les fichiers du même genre bloquent `diff`, `pull` et `push`, même quand `.gitignore` liste ces fichiers eux-mêmes. Le message indique le chemin et la raison, et commence par `Local source path refused:`. Les fichiers situés dans un dossier que `.gitignore` ignore et qui n'a jamais été poussé ne sont pas examinés. Voir [Déplacer votre code dans l'App](/fr/cli/bring-your-code/#3-déplacer-votre-code-dans-lapp).

Suite : [Apps, données et contrats](/fr/cli/apps-data-contracts/).
