---
title: Récupérer un agent
description: Créez un agent ou choisissez-en un que vous avez déjà, puis copiez toutes ses Apps dans un dossier de votre ordinateur.
sidebar:
  order: 3
---

Le checkout copie chaque App active d'un agent dans un nouveau dossier. Vous travaillez ensuite dans ce dossier.

## Créer un agent depuis le terminal

Passez cette partie si vous avez déjà l'agent voulu.

1. Voyez les produits à partir desquels vous pouvez démarrer. Ce sont ceux listés dans le Marketplace.

   ```sh
   openstep catalog
   ```

2. Créez l'agent. Utilisez la clé de produit de la liste.

   ```sh
   openstep agent create "My Agent" --product <product-key>
   ```

   Omettez `--product` pour partir de Web builder. Ajoutez `--workspace <workspace-slug>` pour créer l'agent dans un workspace d'équipe.

Créer un agent n'envoie aucun message au builder. La commande vous donne l'ID de l'agent. L'agent se met au travail quand vous [discutez avec lui](/fr/cli/chat/).

## Récupérer l'agent

1. Listez les agents que vous pouvez ouvrir, et notez l'ID de celui que vous voulez. Ajoutez `--workspace <workspace-slug>` pour ne lister qu'un seul workspace.

   ```sh
   openstep agent list
   ```

2. Récupérez-le dans un dossier. Le dossier doit être nouveau ou vide.

   ```sh
   openstep agent checkout <agent-id> ./my-agent
   ```

   Si l'agent est encore en préparation, la commande attend jusqu'à deux minutes. S'il n'est pas prêt d'ici là, exécutez de nouveau la commande.

3. Entrez dans le dossier et listez ses Apps.

   ```sh
   cd my-agent
   openstep apps list
   ```

## Ce que contient le dossier

```
my-agent/
  apps/
    web/
    admin/
  AGENTS.md
  .openstep/
```

- `apps/<app-key>/` contient le code source d'une App. Il y a un dossier pour chaque App, nommé d'après sa clé d'App. Vos modifications vont ici.
- `AGENTS.md` indique à un agent de code sur votre ordinateur de lire `.openstep/instructions/README.md` pour les règles et les skills OpenStep. La CLI tient à jour son propre bloc dans ce fichier. Vos propres lignes en dehors de ce bloc sont conservées.
- `.openstep/` est la comptabilité privée de la CLI. Il contient l'agent auquel elle est liée, des copies du code source que vous avez synchronisé en dernier, et les reçus des requêtes en cours.

## À savoir

- Exécutez toutes les commandes suivantes depuis ce dossier, pas depuis l'intérieur de `apps/web`.
- Ne modifiez ni ne supprimez rien dans `.openstep/`. Si vous le changez à la main, `diff`, `pull` et `push` ne peuvent plus distinguer ce qui est à vous.
- Le checkout ajoute `.openstep/`, `openstep.config.json` et `/AGENTS.md` au `.gitignore` du dossier, afin qu'ils restent hors de git.
- Le checkout n'écrit jamais dans un dossier qui contient déjà des fichiers. Choisissez un nouveau nom.
- Votre rôle décide de ce que vous pouvez faire ensuite. Les propriétaires publient, les propriétaires et les éditeurs construisent et modifient, et les lecteurs lisent. Voir [Ce que fait la CLI](/fr/cli/what-it-does/).

Suite : [Discuter depuis le terminal](/fr/cli/chat/), ou passez directement à [Exécuter des apps en local](/fr/cli/dev/).
