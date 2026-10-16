---
title: Apps, données et contrats
description: Ajoutez ou archivez des Apps, définissez des valeurs d'environnement, exécutez du SQL sur les données de développement, et déployez un smart contract qu'utilise une App.
sidebar:
  order: 7
---

Ces commandes changent plus que des fichiers source. Chacune agit sur une seule App, donc la plupart prennent `--app <app-key>`. Exécutez-les depuis le dossier de l'agent.

## Ajouter ou archiver une App

1. Voyez les Apps de l'agent.

   ```sh
   openstep apps list
   ```

2. Ajoutez une App. Vous la décrivez d'emblée, pour que l'agent sache pourquoi c'est une App à part.

   ```sh
   openstep apps add admin --title "Admin" --purpose "Manage records" --audience "Owners" --boundary "Separate management UI" --capabilities web,server
   ```

   - `admin` est la clé de l'App. Elle devient le nom de dossier `apps/admin`. Utilisez des lettres minuscules, des chiffres et des tirets.
   - `--title` est le nom de l'App. `--name` fonctionne aussi.
   - `--purpose`, `--audience` et `--boundary` disent à quoi sert l'App, qui l'utilise, et pourquoi elle ne fait pas partie d'une autre App.
   - `--capabilities` est une liste séparée par des virgules de `web`, `server` et `contract`.

   Quand la plateforme accepte la nouvelle App, la CLI rapatrie son dossier dans votre dossier d'agent.

3. Pour retirer une App, archivez-la. L'historique de l'App est conservé, tout comme son dossier sur votre ordinateur.

   ```sh
   openstep apps archive admin
   ```

Les propriétaires et les éditeurs peuvent ajouter et archiver des Apps. Si la CLI ne peut pas terminer la copie locale, exécutez `openstep pull`.

## Valeurs d'environnement

Une valeur d'environnement est un réglage qu'une App lit, comme une adresse ou une clé. Elle a un nom, un type (`variable` ou `secret`), et les endroits qui peuvent la lire : `frontend`, `backend` et `builder`.

```sh
openstep env list --app admin
openstep env define BOOKING_EMAIL --kind variable --targets backend --app admin --value hello@example.com
openstep env define VITE_SITE_NAME --kind variable --targets frontend --app admin --value "Corner Cafe"
openstep env define SERVICE_KEY --kind secret --targets backend --app admin
openstep env set SERVICE_KEY --app admin --environment production
openstep env clear SERVICE_KEY --app admin
openstep env targets VITE_SITE_NAME --targets frontend,backend --app admin
openstep env delete BOOKING_EMAIL --app admin
```

- `env list` montre le nom de chaque valeur, son type et si elle est fournie. Il ne montre pas un secret.
- `env define` crée une valeur. Les noms utilisent des majuscules, des chiffres et des tirets bas.
- `env set` donne une nouvelle valeur à une valeur déjà définie. `env clear` la supprime.
- `env targets` change les endroits où une valeur peut être lue. `env delete` supprime une définition que plus personne n'utilise.
- Les cibles suivent deux règles. Une cible `frontend` exige le type `variable` et un nom qui commence par `VITE_`, et un nom qui commence par `VITE_` doit cibler `frontend`. Un secret ne cible jamais `builder`, et une variable ne peut cibler `builder` que si elle contient une adresse de chaîne, ou s'il s'agit de `BASE_RPC_URL` contenant l'URL RPC de la chaîne.
- `--environment` vaut `development` ou `production`. Sans cette option, la commande utilise `development`.
- Un secret n'est jamais donné sur la ligne de commande. La CLI le demande par saisie masquée, ou le lit depuis l'entrée standard. `--value` est refusé pour un secret.

Les propriétaires définissent les valeurs, changent leurs cibles et les suppriment. Les éditeurs peuvent définir et effacer les valeurs de développement. Les valeurs de production sont réservées aux propriétaires.

`environment` fonctionne à la place de `env`. Voir [Valeurs d'environnement](/fr/build/environment-values/) pour la différence entre valeurs de développement et valeurs en ligne.

## Données

Exécutez du SQL sur les données de développement de l'App :

```sh
openstep data sql --app admin --sql "select 1"
openstep data sql --app admin ./query.sql
```

Vous pouvez fournir le SQL avec `--sql`, sous forme de chemin de fichier, ou sur l'entrée standard. Il peut atteindre 64 Kio. Ce sont les vraies données de développement, les mêmes que celles qu'utilise l'aperçu de l'App.

Le SQL qui change la forme des données, comme créer ou modifier une table, est refusé ici. Utilisez plutôt une migration.

```sh
openstep data migrate 0002_add_bookings ./migration.sql --app admin
```

- L'ID de migration ressemble à `0002_add_bookings` : quatre chiffres ou plus, un tiret bas, puis un nom en minuscules.
- Le fichier doit être du texte UTF-8 et faire au plus 4 Mio.
- La commande commence par un pull : réglez donc les conflits avant de l'exécuter. Elle enregistre ensuite le SQL avec le code source de l'App et l'applique aux données de développement de l'App.

Les éditeurs et les propriétaires peuvent exécuter les deux. Voir [Données du site](/fr/build/data/) pour la façon dont les données de développement et les données en ligne restent séparées.

## Capacités

```sh
openstep capabilities list --app admin
openstep capabilities enable contract --app admin
```

`list` montre ce que l'App a activé et les capacités de la plateforme qu'elle peut utiliser. `enable` ajoute une capacité à l'App : `web`, `server` ou `contract`. Une capacité ne peut pas être désactivée depuis la CLI. Les deux commandes sont réservées aux propriétaires.

## Contrats

Un contrat, ici, est un smart contract qu'utilise l'une de vos Apps. Vous le compilez, vous l'enregistrez, vous vérifiez ce que coûterait le déploiement, puis vous le déployez sur Base. Préparer et demander un devis sont gratuits. Déployer dépense du SSU. Demander un devis et déployer sont réservés au propriétaire.

1. Compilez le contrat dans la configuration Foundry de l'App.

   ```sh
   cd apps/admin/contract
   forge build
   cd ../../..
   ```

2. Enregistrez le contrat compilé. Cela n'envoie aucune transaction et ne coûte rien. Un éditeur peut le faire.

   ```sh
   openstep contracts prepare Token --app admin --artifact contract/out/Token.sol/Token.json --constructor-args contract/args.json --owner-arg-index 3
   ```

   - `Token` est un nom que vous choisissez. Vous l'utilisez dans les commandes suivantes.
   - `--artifact` est le fichier JSON Foundry du contrat. Il doit contenir `abi` et `bytecode.object`.
   - `--constructor-args` est facultatif. C'est un fichier JSON contenant une liste de chaînes, par exemple `["MyToken", "MTK", "1000000000000000000000"]`. Omettez-le seulement si le constructeur ne prend aucun argument.
   - `--owner-arg-index` est facultatif. C'est la position, en comptant à partir de 0, de l'argument du constructeur qui doit recevoir l'adresse du Smart Account du propriétaire. Laissez cet argument hors de votre liste.
   - Les deux chemins de fichier sont relatifs au dossier de l'App. Chaque fichier doit être un fichier ordinaire d'au plus 4 Mio.

3. Demandez un devis. Il montre où le contrat serait déployé et le maximum de SSU que le déploiement peut coûter. Lisez les deux avant de continuer.

   ```sh
   openstep contracts quote Token --app admin
   ```

4. Déployez. Sans `--confirm true`, la commande refuse. Elle refuse aussi si vous n'avez pas exécuté `quote` pour le même nom depuis ce dossier.

   ```sh
   openstep contracts deploy Token --app admin --confirm true
   ```

   Pour fixer une limite, ajoutez `--max-fee <units>`. Le déploiement s'arrête si le devis est plus élevé. Le devis et `--max-fee` comptent le SSU en unités de base : 1 SSU vaut 1000000000000000000 unités.

   Quand le déploiement est confirmé, la CLI rapatrie le code mis à jour dans votre dossier.

5. Consultez l'état à tout moment. Cela ne fait que lire. Rien n'est envoyé.

   ```sh
   openstep contracts status --app admin
   ```

Si un déploiement est interrompu et que vous ne connaissez pas le résultat, exécutez d'abord `openstep contracts status --app admin`. La CLI n'envoie pas un déploiement deux fois d'elle-même.

`contract` fonctionne à la place de `contracts`.

## À savoir

- La CLI ne compile jamais un contrat à votre place. Elle lit le fichier JSON que vous lui donnez.
- Les secrets et les jetons n'ont pas leur place dans les fichiers source. Utilisez des valeurs d'environnement.
- Tout ce qui dépense du SSU apparaît dans votre solde. Voir [Vérifier votre solde](/fr/account/balance/).

Suite : [Apporter votre code existant](/fr/cli/bring-your-code/).
