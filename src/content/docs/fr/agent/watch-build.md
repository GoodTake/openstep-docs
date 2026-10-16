---
title: Regarder la construction
description: "Suivez la construction tâche par tâche depuis le chat et la Console, et mettez-la en pause, arrêtez-la ou reprenez-la."
sidebar:
  order: 4
---

Une fois le plan approuvé, l'agent le construit une tâche à la fois. Vous pouvez le laisser faire, ou regarder chaque tâche pendant qu'elle s'exécute.

1. Regardez la barre au-dessus de la zone de chat. Elle indique **Building · 0 of 6 done**, avec le nom de la tâche en cours, et le compte monte à mesure que les tâches se terminent. À droite, la carte de Preview passe par **Thinking**, **Planning**, **Writing code**, **Preview & test** et **Done**.
2. Cliquez sur **View build**. La **Console** s'ouvre à droite, sur sa section **Build**, à la place de la vue de l'App. Elle montre **Building** avec **Pause** et **Stop**, le nombre de tâches terminées et depuis combien de temps la construction tourne, ainsi que la version du produit avec laquelle elle construit.
3. Ouvrez l'onglet **Tasks**. Il y a une ligne par tâche, dans l'ordre d'exécution : son numéro, son nom, l'App à laquelle elle appartient, son passage et depuis combien de temps elle tourne. Une tâche en cours indique « Round 1 · running ». Les tâches s'exécutent l'une après l'autre : celles qui sont en dessous attendent.
4. Cliquez sur **✕** en haut à droite de la Console pour la fermer et revoir la vue de l'App. Vous pouvez y revenir à tout moment avec **View build**, ou avec **Console** dans l'en-tête puis **Build** dans la liste.

   ![La Console sur sa section Build : Building, avec Pause et Stop, 0 of 6 done, et l'onglet Tasks qui liste six tâches dont la première est en cours.](/images/agent/watch-build-1.webp)

Les six tâches de cette exécution, dans l'ordre, étaient : mettre en place la base de l'app de fitness, construire les pages publiques d'entraînement, implémenter les fonctions de séance et d'historique, générer les illustrations des exercices, implémenter le suivi corporel, et une dernière vérification sur toutes les Apps.

Les onglets **Plan** et **Apps** à côté de **Tasks** montrent le plan que vous avez approuvé et les Apps qu'il construit. Les autres sections de la Console, comme **Code** et **Files**, sont dans la liste à gauche, mais vous n'en avez pas besoin pour suivre la construction.

## Mettre en pause, arrêter et reprendre

Les commandes apparaissent dans la Console et à côté de la zone de chat.

- **Pause** met la construction en attente. Le bouton devient **Continue**.
- **Continue** reprend la même construction.
- **Stop** y met fin. Il demande d'abord : « Stop this build? Finished tasks are kept. Your next Brainstorm starts a new plan. » Cliquez sur **Stop the build** pour confirmer, ou sur **Cancel**. Après un arrêt, votre prochain message en **Brainstorm** lance une nouvelle construction avec un nouveau plan. Si vous voulez seulement faire une pause, utilisez **Pause**.

Pendant qu'une construction tourne, la zone de chat montre **Pause** et **Stop** à la place de la zone de message : « Building — Pause or Stop to change direction. » Pour dire autre chose, mettez d'abord en pause ou arrêtez, puis envoyez votre message. Envoyer un message pendant que la construction est en pause met fin à cette construction, comme **Stop**.

## Quand la construction s'arrête d'elle-même

Il arrive qu'une tâche ne puisse pas continuer sans vous. La construction s'arrête et vous dit ce qu'elle attend :

- Une question : répondez dans le chat et la construction continue toute seule.
- Une valeur que vous seul pouvez donner : une boîte de dialogue la demande. Voir [Approuver le plan](/fr/agent/approve-plan/).

Une construction peut aussi se mettre en pause sur un problème du côté de la plateforme. La barre indique alors **Platform issue**, et **Build** dans la Console dit : « The build is paused on a platform problem. It is listed for the platform team and continues once they fix it. Nothing for you to do. To change direction, stop the build. » Vous pouvez attendre : la construction reprend d'elle-même une fois le problème corrigé.

Si le chat affiche **Reconnecting…** pendant longtemps, rechargez la page. La construction continue sur le serveur.

## Quand la construction se termine

Quand la dernière tâche est terminée et que la revue finale a eu lieu, la construction est prête à être publiée :

1. La barre au-dessus de la zone de chat devient **Ready to publish**, avec la ligne « 0 findings · 0 parked » et **View build**. Les deux compteurs étaient à 0 dans cette exécution.
2. Une boîte verte apparaît en dessous : « The build finished. Publish from the top bar puts every app live together. » Cliquez sur **Show the review** dedans pour lire la revue finale.
3. Le bouton **Publish** de l'en-tête s'illumine.
4. Dans la Console, **Build** indique maintenant **Ready to publish** et « Publish from the top bar puts every app live together. Data and learner progress stay as they are. » En dessous, **MECHANICAL CHECKS** liste chaque vérification, toutes marquées **Passed**. **REVIEW FINDINGS** montre la revue finale (« The reviewer reported no findings. »), et **PARKED TASK RULINGS** indique None.

Les éventuels constats de la revue finale sont listés sous **REVIEW FINDINGS**. Vous pouvez essayer l'app dans **Preview** dès maintenant, avant de publier.

## À savoir

- Une construction prend du temps. Celle-ci a pris environ 75 minutes entre l'approbation et **Ready to publish**, y compris une pause sur un problème de plateforme. L'agent vérifie chaque tâche avant de passer à la suivante, et la répare si une vérification échoue : certaines tâches demandent donc plus d'un passage.
- Seuls le propriétaire et les éditeurs peuvent utiliser **Pause**, **Stop** ou **Continue** sur une construction. Les lecteurs peuvent regarder.
- Vous ne pouvez pas publier pendant qu'une construction est en cours ou en pause. **Publish** devient disponible une fois la construction arrêtée ou terminée. Voir [Publier et partager](/fr/agent/publish-and-share/).

Suite : [Utiliser votre app](/fr/agent/use-your-app/).
