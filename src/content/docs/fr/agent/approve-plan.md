---
title: Approuver le plan
description: "Lisez le plan que rédige l'agent, puis approuvez-le ou demandez des changements. Rien n'est construit tant que vous n'avez pas approuvé."
sidebar:
  order: 3
---

Après vos réponses, l'agent rédige un plan de construction. Rien n'est construit tant que vous ne l'avez pas approuvé : c'est donc le moment de vérifier que le plan correspond à ce que vous voulez.

1. Attendez le plan. Pendant sa rédaction, la carte de Preview à droite indique **Planning** et « Drafting the build plan ». Dans cet exemple, cela a pris environ huit minutes. Quand il est prêt, une barre apparaît au-dessus de la zone de chat : **Plan ready · 6 tasks**, avec une ligne comme « 1 finding · 0 open questions » et un bouton **View build**. En dessous se trouve une zone avec **Show the plan**, **Approve plan** et **Request changes**.

   ![Le chat avec la barre Plan ready · 6 tasks et, en dessous, Show the plan, Approve plan et Request changes. La zone de chat indique que le plan attend votre décision.](/images/agent/approve-plan-1.webp)

2. Cliquez sur **Show the plan** pour le lire. Cliquez sur **Hide the plan** pour le replier.

   ![Le plan déplié : Build plan marqué Awaiting your approval, les compteurs 1 App, 6 Tasks, 0 Missions et 0 Contracts, et la section Review & setup.](/images/agent/approve-plan-2.webp)

3. Décidez.
   - Cliquez sur **Approve plan** pour lancer la construction. La barre devient **Building · 0 of 6 done**, avec le nom de la tâche en cours et un chronomètre, et la zone de chat indique « Building — Pause or Stop to change direction. » avec **Pause** et **Stop**. Passez à [Regarder la construction](/fr/agent/watch-build/).
   - Cliquez sur **Request changes** pour renvoyer le plan. Écrivez ce que vous voulez différent dans la zone de message et envoyez-le. Vous pouvez aussi saisir dans la zone de message sans rien cliquer d'abord. L'agent établit un nouveau plan et vous le montre. Rien n'est construit entre-temps.

**Approve plan** et **Request changes** sont répétés en bas du plan ouvert : vous n'avez donc pas besoin de remonter.

## Ce que montre le plan

- **Build plan**, marqué **Awaiting your approval**, avec des compteurs pour **App**, **Tasks**, **Missions** et **Contracts**. Cet agent construit **1 App** en **6 Tasks**. Les Missions et les Contracts concernent les agents qui animent des cours ou utilisent des contrats blockchain : ils sont donc à 0 ici.
- **REVIEW & SETUP** : une revue automatique vérifie chaque plan avant que vous le voyiez. Quand elle a des remarques, elles sont listées comme constats (findings), et la section dit « 1 needs you ». Lisez-les avant d'approuver. Dans cet exemple, la revue a indiqué **Approved with findings**, et aucun des constats n'a bloqué le plan.
- **WHAT THIS BUILDS** : « Tasks run one at a time, in this order. » Les tâches sont groupées par App, et chacune a un résultat en une phrase et les vérifications qu'elle doit passer. Une tâche de ce plan dit : « Let a signed-in person start a day, save individual sets, finish a workout and inspect their own history. » Le dernier groupe, **Cross-app & integration**, contient une vérification finale que les Apps fonctionnent ensemble.

## Quand l'agent a besoin d'une valeur de votre part

Certains plans ont besoin de quelque chose que vous seul pouvez donner, comme une clé d'API ou un wallet de paiement. L'agent ne l'invente jamais. Avant que la construction puisse continuer, une boîte de dialogue demande la valeur :

1. La boîte de dialogue porte le nom de la valeur et dit à quoi elle sert. La valeur est enregistrée dans les valeurs d'environnement de l'App, pour le développement et pour la mise en ligne.
2. Saisissez la valeur. Un secret est masqué pendant la saisie.
3. Cliquez sur **Provide and continue**. La construction continue toute seule.

Si vous cliquez sur **Not now**, la construction attend. Le chat garde une note, « The builder needs … to continue. », avec un bouton **Provide** qui rouvre la boîte de dialogue. Les valeurs qui vous attendent encore sont aussi listées sous **Requested by the build** dans Console → **Environment**.

Parfois, il vous demande plutôt de choisir entre quelques options, et vous pouvez écrire votre propre réponse dans la zone qui indique « Or write your own answer ».

L'agent Health & fitness n'a besoin d'aucune valeur, il n'en demande donc jamais. Les agents qui appellent des services extérieurs, si.

## À savoir

- Seuls le propriétaire et les éditeurs d'un agent peuvent approuver un plan, demander des changements ou fournir une valeur. Les lecteurs peuvent lire le plan. Voir [Travailler à plusieurs](/fr/agent/work-with-others/).
- Tant que le plan est en cours de rédaction, la zone de chat propose **Pause** et **Stop** à la place de la zone de message. Voir [Regarder la construction](/fr/agent/watch-build/).
- Le travail de l'agent, planification comprise, dépense du SSU.

Suite : [Regarder la construction](/fr/agent/watch-build/).
