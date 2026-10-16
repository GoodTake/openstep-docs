---
title: Utiliser votre app
description: "Essayez l'app terminée dans Preview, voyez ce qu'elle a enregistré dans l'onglet Data, et demandez des changements à l'agent."
sidebar:
  order: 5
---

Quand la construction est terminée, l'app est prête à être essayée dans **Preview** sur la page de travail. C'est votre copie de développement. Vous pouvez l'utiliser et la tester autant que vous voulez avant que quiconque d'autre la voie.

1. Regardez le côté droit de la page de travail. La carte de construction a été remplacée par l'App. Si la Console est encore ouverte, fermez-la avec **✕**. Au-dessus de l'App, vous trouvez les onglets **Preview** et **Data**, un menu de pages qui démarre sur **Home**, un menu pour passer de la taille ordinateur à la taille téléphone, et **Open ↗**, qui ouvre l'aperçu dans un nouvel onglet.
2. Regardez l'App elle-même. Three Day Strength a son propre menu en haut : **Plan**, **Workout**, **History** et **Progress**. Sa page d'accueil dit « Get stronger, one focused session at a time. » avec les boutons **Start logging →** et **Connect Wallet**, et une carte, « Three days. Four movements. Steady progress. », qui résume le plan : 45 minutes, 3 jours par semaine, 4 exercices.
3. Ouvrez **Plan**. C'est **THE PLAN**, « Repeat weekly · rest between sessions », réparti en jours. **Day A** est « Session 1 · 4 movements », et chaque exercice a une illustration, ses séries et répétitions, et les muscles sollicités. Les deux premiers sont le squat arrière, 3 séries × 5–8 répétitions, et le développé couché à la barre, 3 séries × 5–8 répétitions. D'autres jours suivent en dessous. Vous pouvez lire le plan sans vous connecter.

   ![La page de travail de Three Day Strength après la construction : la barre Ready to publish dans le chat, et la page Plan de l'App dans Preview, avec Day A et ses exercices illustrés, Back squat et Barbell bench press.](/images/agent/use-your-app-1.webp)

4. Enregistrez votre entraînement. Vos enregistrements sont privés : l'App vous demande donc d'abord de vous connecter avec votre wallet. Tant que vous ne l'avez pas fait, **Workout** dit « Sign in with your wallet to log your private workouts. » avec un bouton **Connect Wallet**. Ensuite, vous enregistrez votre travail une série à la fois pendant que vous vous entraînez (« One set at a time. Save your work as you go. »).
5. Consultez votre historique et vos progrès. **History** et **Progress** sont privés de la même façon : chaque personne se connecte avec son propre wallet et ne voit que ses propres enregistrements. L'agent a prévu l'enregistrement série par série et le suivi privé du poids et des mensurations en kg et cm, les unités que vous avez choisies. Votre poids et vos mensurations vont sous **Progress**.
6. Ouvrez l'onglet **Data** pour voir ce que l'App stocke. Il affiche « View and manage the data stored in your app. » avec une carte par table et son nombre de lignes. Pour Three Day Strength, les tables sont `measurements`, `orders`, `settings`, `users`, `weight_entries`, `workout_sets` et `workouts`. Ouvrez une table pour voir ses lignes. Dans cette exécution, toutes les tables étaient vides, car personne n'avait encore rien enregistré.
7. Demandez des changements. Saisissez dans la zone de message à gauche. Par exemple, demandez un quatrième jour d'entraînement, une autre formulation ou un autre aspect.

Chaque page de l'App se termine par une note précisant qu'elle ne constitue pas un avis médical, et qu'il faut parler à un médecin ou à un coach qualifié avant de commencer un nouveau programme d'entraînement ou de perte de poids.

## À savoir

- Ce que vous faites dans **Preview** correspond à des données de développement. Elles sont séparées des données de l'app en ligne après la publication : vous pouvez donc tester librement. Voir [Données du site](/fr/build/data/).
- **Open ↗** est pratique pour vérifier l'app à sa taille réelle, ou sur votre téléphone.
- Un petit changement, comme une nouvelle formulation, un nombre, une couleur ou une image, est fait aussitôt. Un changement plus important en **Brainstorm** repasse par les questions et le plan, et vous approuvez le plan avant que quoi que ce soit soit construit. Voir [Build et Brainstorm](/fr/build/modes/).
- Vous pouvez lire le code de l'App dans la Console sous **Code**, mais vous changez l'app en le demandant dans le chat. Voir [Parcourir le code](/fr/build/code/).
- Rien n'est encore public. L'app passe en ligne quand vous la publiez.

Suite : [Publier et partager](/fr/agent/publish-and-share/).
