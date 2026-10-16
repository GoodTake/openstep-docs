---
title: La page de travail
description: Le chat à gauche, votre site à droite, et Publish et Console dans l'en-tête.
sidebar:
  order: 2
---

Chaque agent a une page de travail, et c'est là que vous passez votre temps : vous parlez au builder à gauche et vous voyez le site à droite. Elle s'ouvre dès que vous démarrez un agent, et vous pouvez y revenir depuis **My agents** ou depuis **RECENT AGENTS** dans le rail gauche.

![La page de travail de The Cozy Coffee Table : la réponse du builder à gauche, et l'aperçu en direct du site à droite.](/images/build/work-page-1.webp)

1. L'en-tête. De gauche à droite : **My agents / The Cozy Coffee Table** (cliquez sur **My agents** pour revenir à la liste), le sélecteur d'App, **Publish** et **Console**. Un agent peut contenir plus d'une App. Le sélecteur d'App choisit l'App que montre la partie droite, et celle sur laquelle agissent **Code**, **Domains** et **Environment** dans la Console. Sur cette page, le rail gauche se réduit à des icônes.
2. Le chat, à gauche. Il contient vos messages et les réponses du builder, une étape par ligne, avec une ligne d'état sous chaque réponse. En bas se trouve la zone où vous écrivez. **+** joint un fichier, et la puce, par exemple **Auto · Build**, choisit le modèle et le mode. La flèche d'envoi devient un bouton d'arrêt rouge pendant que le builder travaille.
3. La vue de l'App, à droite. Les onglets **Preview** et **Data** montrent l'App choisie dans l'en-tête. **Contract** n'apparaît que pour une App qui a un smart contract. La barre d'outils de Preview comprend un bouton de rechargement, un sélecteur de page (**Home**, **Menu**, **Book a table**), un sélecteur d'appareil, un crayon pour **Edit mode**, et **Open** pour voir le site dans son propre onglet.
4. La Console. Cliquez sur **Console** dans l'en-tête pour l'ouvrir par-dessus la vue de l'App, et cliquez sur ✕ pour la fermer. Ses sections sont listées ci-dessous.

## Ce que contient la Console

- **Overview** : le nom de l'agent et son produit, qui peut l'ouvrir, votre rôle, s'il est publié, et ses Apps.
- **Build** : les tâches, le plan et les Apps d'une construction qui suit un plan approuvé. Elle apparaît quand l'agent a une telle construction. Voir [Suivre l'avancement](/fr/build/progress/).
- **Code** : les fichiers de l'App, en lecture seule. Voir [Parcourir le code](/fr/build/code/).
- **Files** : des fichiers PDF, PowerPoint et Word facultatifs que vous donnez au builder comme référence.
- **Memory** : ce que l'agent a enregistré, y compris les décisions que vous avez prises.
- **Sessions** : ce que contiennent les Apps, et l'endroit où le propriétaire peut **Start a new session**.
- **Plugins** : les capacités intégrées du produit de l'agent.
- **Domains** : l'adresse web de l'App et votre propre domaine. Voir [Domaines](/fr/build/domains/).
- **Production** : ce qui est en ligne, ses versions, et **Unpublish**. Voir [Mettre en ligne](/fr/build/go-live/).
- **Scheduled tasks** : les tâches que votre App exécute à heures fixes. Voir [Ce que votre site peut faire](/fr/build/what-your-site-can-do/).
- **Environment** : les valeurs que lit votre App, séparées pour le développement et la mise en ligne. Voir [Valeurs d'environnement](/fr/build/environment-values/).
- **Learners** : les personnes qui ont rejoint, pour les agents qui ont des apprenants ou un cours.
- **Settings** : le nom de l'agent, l'accès, les collaborateurs, la propriété et la suppression. Voir [Gérer vos agents](/fr/agent/manage-agents/).

## À savoir

- **Publish** est grisé pendant que le builder travaille, et tant qu'il n'y a rien à publier.
- Ce que vous pouvez faire dépend de votre rôle. Le propriétaire peut tout faire, y compris **Publish**, les valeurs **Environment** en ligne et **Domains**. Les éditeurs peuvent discuter et construire. Les lecteurs peuvent seulement regarder. Voir [Travailler à plusieurs](/fr/agent/work-with-others/).

Suite : [Build et Brainstorm](/fr/build/modes/).
