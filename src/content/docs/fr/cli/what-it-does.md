---
title: Ce que fait la CLI
description: Travaillez sur un agent depuis votre propre ordinateur et votre propre éditeur, puis envoyez vos changements et publiez.
sidebar:
  order: 1
---

La CLI OpenStep vous permet de travailler sur un agent depuis votre propre ordinateur. Vous copiez les Apps de l'agent dans un seul dossier, vous les modifiez dans votre propre éditeur, vous les exécutez en local et vous renvoyez les changements.

La page de travail peut accomplir les mêmes tâches dans le navigateur. Utilisez la CLI quand vous voulez votre propre éditeur, un agent de code sur votre machine, ou une App qui tourne en local.

## Ce que vous pouvez faire

- Récupérer un agent. Copiez toutes les Apps d'un agent dans un dossier. Voir [Récupérer un agent](/fr/cli/checkout/).
- Discuter depuis le terminal. Parlez au builder, répondez à ses questions, approuvez son plan, et mettez-le en pause ou arrêtez-le. Voir [Discuter depuis le terminal](/fr/cli/chat/).
- Exécuter des Apps en local. Démarrez le frontend et le back-end d'une App sur votre machine. Voir [Exécuter des apps en local](/fr/cli/dev/).
- Push et publication. Enregistrez vos changements dans l'agent, puis mettez toutes les Apps en ligne ensemble. Voir [Push et publication](/fr/cli/push-publish/).
- Gérer les Apps, les données et les contrats. Ajoutez une App, définissez des valeurs d'environnement, exécutez du SQL sur les données de développement, et déployez un smart contract qu'utilise une App. Voir [Apps, données et contrats](/fr/cli/apps-data-contracts/).
- Apporter votre code existant. Déplacez un site que vous avez déjà créé dans une App et utilisez, depuis cette App, la connexion OpenStep, l'e-mail, l'IA et les actions on-chain. Voir [Apporter votre code existant](/fr/cli/bring-your-code/).

## Une session, du début à la fin

Voici les commandes que vous utiliserez, dans l'ordre. Chaque page de cette section explique une étape.

```sh
openstep login https://builder.openstep.academy
openstep agent checkout <agent-id> ./my-agent
cd my-agent
openstep agent chat "Describe what you want" --mode build
openstep pull
openstep dev
openstep diff
openstep push
openstep publish --note "First release"
```

## Qui peut faire quoi

La CLI suit les mêmes rôles que la page de travail.

- **Owner** : tout ce qu'un éditeur peut faire, plus Publish, Unpublish et Republish, les valeurs d'environnement de production, et le déploiement des contrats.
- **Editor** : discuter avec le builder, modifier et pousser le code source, ajouter ou archiver des Apps, lancer le stage d'un candidat et revenir en arrière, et définir les valeurs d'environnement de développement.
- **Viewer** : lecture seule.

Voir [Travailler à plusieurs](/fr/agent/work-with-others/) pour savoir comment les personnes obtiennent ces rôles.

## À savoir

- Exécutez chaque commande depuis le dossier d'agent que `agent checkout` a créé. N'exécutez pas de commandes depuis l'intérieur d'un dossier d'App.
- `openstep --help` liste toutes les commandes. `openstep <command> --help` montre une commande et ses options, par exemple `openstep agent chat --help`.
- Ajoutez `--json` à une commande pour obtenir une sortie lisible par une machine.
- Exécuter une App en local utilise vos vraies données de développement, et les capacités de la plateforme comme l'IA et l'e-mail coûtent du SSU comme d'habitude. Voir [Exécuter des apps en local](/fr/cli/dev/) et [Vérifier votre solde](/fr/account/balance/).

Suite : [Installer et se connecter](/fr/cli/install/).
