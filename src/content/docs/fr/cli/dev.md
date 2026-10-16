---
title: Exécuter des apps en local
description: Décrivez comment chaque App démarre, puis exécutez son frontend et son back-end sur votre ordinateur avec openstep dev.
sidebar:
  order: 5
---

`openstep dev` démarre vos Apps sur votre ordinateur, connectées aux vraies données de développement de l'agent. Vous lui dites comment chaque App démarre dans un fichier appelé `openstep.config.json`.

## Mise en place

1. Dans le dossier de l'agent, créez `openstep.config.json`. Ajoutez une entrée pour chaque App que vous voulez exécuter, en utilisant la clé de l'App comme nom.

   ```json
   {
     "apps": {
       "web": {
         "cwd": "apps/web",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5173"], "port": 5173 },
         "backend": { "command": ["npm", "run", "dev:server"], "port": 8787 }
       },
       "admin": {
         "cwd": "apps/admin",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5174"], "port": 5174 }
       }
     }
   }
   ```

   - `cwd` est le dossier de l'App, relatif au dossier de l'agent.
   - `frontend` et `backend` prennent chacun un `command` et un `port`. `command` est une liste : le programme d'abord, puis ses arguments. Il s'exécute dans `cwd`.
   - Omettez `backend` pour une App qui n'a qu'un frontend.
   - Donnez à chaque processus son propre port.

   Utilisez les scripts et les ports que votre App a réellement. Consultez son `package.json`. Ceux ci-dessus ne sont qu'un exemple.

2. Installez les dépendances de chaque App, dans le dossier de cette App.

   ```sh
   cd apps/web
   npm install
   cd ../..
   ```

## Exécuter

1. Depuis le dossier de l'agent, démarrez toutes les Apps de la configuration.

   ```sh
   openstep dev
   ```

   Pour démarrer une seule App :

   ```sh
   openstep dev --app web
   ```

2. La CLI affiche une adresse pour chaque App. Ouvrez cette adresse dans votre navigateur. N'ouvrez pas le port propre au frontend. L'adresse affichée par la CLI est celle qui connecte l'App à la plateforme.
3. Modifiez les fichiers de `apps/web` dans votre éditeur. Votre serveur de développement frontend prend en compte les changements comme il le fait d'habitude.
4. Appuyez sur Ctrl-C pour arrêter. La CLI arrête les processus et libère la connexion.

## À savoir

- Ce sont de vraies données. Une exécution locale utilise les mêmes données de développement que l'aperçu de l'App sur la page de travail. Le SQL que vous exécutez modifie ces données. Ce n'est pas une copie jetable. Voir [Données du site](/fr/build/data/).
- Cela coûte du SSU. Les capacités de la plateforme comme l'IA, l'e-mail et les appels on-chain sont facturées comme d'habitude, même quand l'App tourne sur votre ordinateur. Voir [Vérifier votre solde](/fr/account/balance/).
- Ne mettez pas de secrets dans le code source. La CLI donne à chaque exécution ses propres identifiants et les valeurs d'environnement de cette App. Pour définir une valeur, voir [Apps, données et contrats](/fr/cli/apps-data-contracts/) et [Valeurs d'environnement](/fr/build/environment-values/).
- Chaque App que vous démarrez a besoin d'une entrée dans `openstep.config.json`. Si vous démarrez toutes les Apps et que l'une n'a pas d'entrée, la commande s'arrête et la nomme.
- Si un processus que vous avez configuré se termine, `openstep dev` arrête toutes les Apps qu'il a démarrées et met fin à la commande. Un code de sortie non nul la termine avec l'erreur `App runtime exited with code N`. Lisez la sortie propre du processus en échec pour comprendre pourquoi.
- Les chemins de la configuration doivent rester dans le dossier de l'agent.
- `openstep.config.json` est local. `push` ne l'envoie pas.

Suite : [Push et publication](/fr/cli/push-publish/).
