---
title: Push et publication
description: Enregistrez vos changements dans l'agent avec push, puis mettez toutes les Apps en ligne ensemble avec publish.
sidebar:
  order: 6
---

Pousser et publier sont deux étapes. **Push** enregistre votre code source dans l'agent. **Publish** met en ligne le code source enregistré. Pousser ne publie jamais.

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

   `openstep status` sans ID lit la dernière publication, le dernier rollback, unpublish ou republish que vous avez lancé. S'il n'y en a aucun, il lit l'agent.

Publier conserve vos données. Voir [Publier et partager](/fr/agent/publish-and-share/) pour savoir qui peut ouvrir les Apps en ligne et ce que voit un visiteur.

## Revenir en arrière, dépublier et republier

Ces commandes agissent aussi sur l'agent entier. Elles n'ont pas d'option `--app`. Toutes acceptent un `--note` facultatif.

```sh
openstep rollback <generation-id> --note "Restore prior release"
openstep unpublish --note "Take the agent offline"
openstep republish --note "Bring back the last live version"
```

- **rollback** restaure une version antérieure que l'agent conserve encore. Une publication réussie indique l'ID de la version qu'elle a créée.
- **unpublish** met toutes les Apps hors ligne.
- **republish** ramène la version que vous aviez mise hors ligne avec unpublish.

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

- Pousser est réservé aux propriétaires et aux éditeurs. Publier, revenir en arrière, dépublier et republier sont réservés aux propriétaires.
- Pendant que le builder exécute une construction planifiée, l'agent est en lecture seule. Attendez qu'il termine, puis faites `pull`, puis push.

Suite : [Apps, données et contrats](/fr/cli/apps-data-contracts/).
