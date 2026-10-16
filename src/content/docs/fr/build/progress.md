---
title: Suivre l'avancement
description: Ce que montrent le chat et la carte de Preview pendant que le builder travaille, et comment arrêter un tour.
sidebar:
  order: 6
---

Un message que vous envoyez démarre un tour, et le builder y travaille jusqu'à ce qu'il soit terminé. Vous pouvez le suivre à deux endroits : le chat à gauche et la carte de Preview à droite.

1. Lisez les étapes dans le chat. Le builder montre chaque chose qu'il fait sous forme de ligne, comme **Run a command**, **Read**, **Edit** ou **Update the plan**, avec une courte note entre elles quand il a quelque chose à dire.
2. Lisez la ligne d'état sous la réponse du builder. Elle commence par **Preparing** pendant que le builder se prépare. Elle peut afficher **Waiting for a free build slot** si toutes les places sont occupées, puis **Thinking**, **Planning** et **Building**, avec un chronomètre, par exemple **Building · 2:39**. Si rien de nouveau n'est arrivé depuis une minute, elle ajoute **Still working — this step can take a few minutes**.
3. Regardez la carte de Preview à droite. Elle affiche **Thinking**, **Planning**, **Writing code**, **Preview & test** et **Done**, en les cochant au fur et à mesure. Quand le site est prêt, il prend la place de la carte.
4. Quand la ligne d'état indique **Done**, suivi du temps écoulé depuis la fin, le tour est terminé. Le dernier message du builder dit ce qui a changé.

![Un tour Build en cours : les étapes du builder et la ligne d'état Building à gauche, et la carte de Preview à droite avec Writing code en cours.](/images/build/progress-1.webp)

## Arrêter un tour

Vous ne pouvez pas envoyer un autre message pendant que le builder travaille. Pour l'arrêter, cliquez sur le bouton d'arrêt rouge à la place de la flèche d'envoi. La ligne d'état indique alors **Cancelled**. Le travail s'exécute sur le serveur : si la ligne d'état affiche **Reconnecting…** pendant longtemps, rechargez la page et il continue.

## Quand un tour échoue

La ligne d'état devient rouge et dit en termes simples ce qui s'est passé. Quand renvoyer le même message peut aider, elle affiche **Retry**. Si votre SSU est épuisé, elle l'indique et propose **Top up balance**. Voir [Obtenir du SSU](/fr/start/get-ssu/).

## À savoir

- Une construction **Brainstorm**, qui démarre une fois que vous avez approuvé un plan, affiche sa propre barre de progression au-dessus de la zone de chat : **Building · 0 of 6 done**, avec **Pause**, **Stop** et **View build**. Voir [Regarder la construction](/fr/agent/watch-build/).
- Vos changements apparaissent dans Preview, pas sur le site en ligne. Voir [Prévisualiser votre site](/fr/build/preview/).

Suite : [Prévisualiser votre site](/fr/build/preview/).
