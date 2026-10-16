---
title: Discuter depuis le terminal
description: Parlez au builder, répondez à ses questions, approuvez les plans, et mettez en pause ou arrêtez une construction sans quitter le terminal.
sidebar:
  order: 4
---

`openstep agent chat` envoie un message au builder de l'agent, le même builder que celui avec lequel vous parlez sur la page de travail. La CLI affiche le tour au fur et à mesure. Elle s'arrête quand le tour se termine, ou quand le builder a besoin de quelque chose de votre part : une question, un plan à approuver ou une valeur à fournir.

Vous devez être propriétaire ou éditeur de l'agent. Les constructions coûtent du SSU, comme sur la page de travail.

## Envoyer un message

1. Choisissez un mode. Utilisez `brainstorm` pour d'abord discuter de ce que vous voulez. Utilisez `build` pour laisser le builder modifier l'agent tout de suite. Voir [Build et Brainstorm](/fr/build/modes/).

   ```sh
   openstep agent chat "Add a page where guests can book a table" --mode brainstorm
   ```

   Sans `--mode`, le message s'exécute en `build`.

2. Pour indiquer au builder l'App et le fichier que vous regardez, ajoutez `--app` et `--path`. C'est une indication, pas une limite. Le builder peut aussi modifier d'autres Apps.

   ```sh
   openstep agent chat "Make this header sticky" --mode build --app web --path src/App.tsx
   ```

3. La CLI écrit les événements du tour dans le terminal et se termine par l'ID du tour et son statut. Gardez l'ID du tour. Vous en avez besoin pour répondre aux questions et pour reprendre.

## Répondre aux questions

En Brainstorm, le builder pose une série de questions. L'événement de question dans la sortie contient un ID de requête.

```sh
openstep agent question --turn <turn-id> --request <request-id> --answers '[["Option A"],["Yes"]]'
```

`--answers` est une liste JSON avec une liste interne pour chaque question. Pour refuser les questions, utilisez `--reject true` à la place de `--answers`.

## Approuver le plan

Quand le builder présente un plan qui attend votre décision, la sortie inclut le plan et son hash. Approuvez-le, ou demandez des changements.

```sh
openstep agent plan approve --hash <plan-hash>
openstep agent plan request-changes --hash <plan-hash> --comment "Leave out the admin page"
```

`request-changes` exige un `--comment`. Pour `approve`, le commentaire est facultatif. C'est la même étape que [Approuver le plan](/fr/agent/approve-plan/) sur la page de travail.

## Fournir les valeurs demandées

Certains plans déclarent des valeurs que vous seul pouvez donner, comme une clé d'API. Pour voir ce qui est demandé et ce que vous avez déjà fourni, exécutez :

```sh
openstep agent plan values --app <app-key>
```

Pour en fournir une, exécutez la commande suivante et saisissez la valeur quand elle la demande. Elle ne s'affiche pas à l'écran et n'est pas enregistrée dans l'historique du chat. Vous pouvez aussi transmettre la valeur par l'entrée standard.

```sh
openstep agent plan value <name> --app <app-key>
```

Le builder peut aussi s'arrêter et demander une entrée au milieu d'une construction. Répondez avec l'ID de la demande d'entrée figurant dans la sortie :

```sh
openstep agent input <input-request-id> --choice <option>
openstep agent input <input-request-id> --text "your answer"
```

Omettez `--choice` et `--text` pour donner une valeur par saisie masquée, comme ci-dessus.

Si une construction s'arrête sur une tâche et vous pose une question, répondez avec la clé de la tâche figurant dans la sortie :

```sh
openstep agent task-answer <task-key> --text "your answer"
```

## Mettre en pause, continuer ou arrêter une construction

```sh
openstep agent pause
openstep agent continue
openstep agent stop
```

`openstep agent stop --turn <turn-id>` arrête un seul tour. Si la CLI indique que le résultat d'une commande est inconnu, exécutez `openstep status` pour lire l'état de l'agent avant de réessayer.

## Reprendre un tour

Si votre connexion tombe ou si vous fermez le terminal, le tour continue de s'exécuter sur la plateforme. La CLI enregistre l'ID du tour dans `.openstep/chat.json` avant d'envoyer votre message. Pour continuer à le suivre, reprenez le tour.

```sh
openstep agent chat --turn <turn-id>
openstep agent chat
```

La seconde forme utilise le tour que la CLI a enregistré. Ne renvoyez pas le même message pour récupérer : cela démarrerait un second tour. Pour relire le chat précédent, exécutez :

```sh
openstep agent chat --history true
```

## À savoir

- Quand le builder a terminé, exécutez `openstep pull` pour amener ses changements dans votre dossier. Ne poussez vos propres modifications qu'ensuite. Voir [Push et publication](/fr/cli/push-publish/).
- Ajoutez `--json` pour obtenir un seul résultat lisible par une machine au lieu du flux.

Suite : [Exécuter des apps en local](/fr/cli/dev/).
