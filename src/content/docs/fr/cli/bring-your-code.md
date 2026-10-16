---
title: Apporter votre code existant
description: Déplacez un site que vous avez déjà créé dans l'App d'un agent, puis utilisez la connexion OpenStep, l'e-mail, l'IA, les actions on-chain et les données depuis votre propre code.
sidebar:
  order: 8
---

Si vous avez déjà le code d'un site, vous pouvez le déplacer dans un agent et l'exécuter sur OpenStep. Votre code obtient alors de la plateforme la connexion par wallet, l'e-mail, l'IA, les actions on-chain et une base de données, et passe en ligne avec **Publish** comme n'importe quelle autre App.

Cette page va d'un dossier vide à un site en ligne. Elle suppose que vous avez [installé la CLI et que vous êtes connecté](/fr/cli/install/).

## Un agent contient une ou plusieurs Apps

Un agent n'est pas un seul site. Il contient une ou plusieurs **Apps**, et chaque App est un site distinct, avec son propre code, son propre aperçu, ses propres données, ses propres réglages et sa propre adresse en ligne. **Publish** met toutes les Apps de l'agent en ligne ensemble. Le schéma est dans [Comment les éléments s'articulent](/fr/start/what-is/#comment-les-éléments-sarticulent).

Dans le dossier de l'agent, chaque App a son propre dossier sous `apps/`, nommé d'après sa clé d'App :

```txt
my-site/
  apps/
    app/      votre site
    admin/    une deuxième App, si vous en ajoutez une
  openstep.config.json
```

Commencez donc par décider comment votre code se répartit en Apps :

- Un seul site : une seule App. Tout va dans `apps/app/`.
- Plusieurs sites, par exemple un site public et un site d'administration distinct : une App chacun. Vous ajoutez les Apps supplémentaires à l'étape 1, et chaque site va dans son propre dossier.

Chaque App garde ses propres données, réglages et modèles d'e-mail ; des commandes comme `env`, `data`, `email` et `capabilities` prennent donc `--app <app-key>` pour dire de quelle App vous parlez. Faites les étapes 2 à 4 pour chaque App. Plus de détails sur le dossier : [Ce que contient le dossier](/fr/cli/checkout/#ce-que-contient-le-dossier).

## 1. Créer un agent pour votre site

```sh
openstep agent create "My site"
openstep agent checkout <agent-id> ./my-site
cd my-site
openstep apps list
```

`agent create` affiche l'ID du nouvel agent. Sans `--product`, l'agent utilise **Web builder**. `agent checkout` copie les Apps de l'agent dans `apps/<app-key>/` ; un nouvel agent en a une, en général `apps/app/`. Les exemples ci-dessous utilisent `app` comme clé d'App ; utilisez celle que `apps list` affiche.

L'App démarre avec un petit site qui fonctionne et les fichiers de la plateforme que votre code utilisera. Vous remplacez le site par le vôtre à l'étape 3 et vous gardez les fichiers de la plateforme.

Si votre code est composé de plusieurs sites, ajoutez une App pour chaque site supplémentaire. Donnez-lui une clé, un titre, son utilité, qui l'utilise, en quoi elle se distingue des autres Apps, et ses capacités :

```sh
openstep apps add admin --title "Admin" --purpose "Manage bookings" --audience "Shop staff" --boundary "Separate admin site" --capabilities web,server
openstep apps list
```

La nouvelle App reçoit son propre dossier, ici `apps/admin/`, avec le même site de départ et les mêmes fichiers de la plateforme. Plus de détails sur l'ajout et l'archivage d'Apps : [Apps, données et contrats](/fr/cli/apps-data-contracts/#ajouter-ou-archiver-une-app).

## 2. Ajouter un serveur, si votre site en a un

```sh
openstep capabilities enable server --app app
openstep pull
```

Cela ajoute un dossier `functions/` à l'App, avec un `server.js` de départ et les utilitaires serveur de la plateforme. Faites-le avant de copier votre propre code serveur, pour que vos fichiers se placent par-dessus ceux de départ. Passez cette étape si votre site n'a que des pages.

## 3. Déplacer votre code dans l'App

Copiez votre site dans `apps/app/`, en remplaçant les pages de départ. L'App doit avoir cette forme :

| Élément | Ce dont l'App a besoin |
|---|---|
| Pages | Une configuration npm à la racine de l'App, avec `package.json` et `package-lock.json`. `npm run build` écrit le site terminé dans `dist/`, avec `index.html` à sa racine. |
| Réglages lus par le navigateur | Des noms qui commencent par `VITE_`, par exemple `VITE_SITE_NAME`, définis avec [`openstep env`](/fr/cli/apps-data-contracts/). |
| Serveur | `functions/server.js`, démarré avec `node server.js`. Il écoute sur le port de la variable d'environnement `PORT`, répond à `GET /health` et sert vos routes sous `/api/`. `functions/package.json` ne liste aucune dépendance : si votre serveur utilise des paquets npm, regroupez-les dans `server.js` avant de pousser. |
| Réglages et clés du serveur | Lisez-les avec `getVariable('NAME')` et `getSecret('NAME')` de `functions/runtime-config.js`, et définissez-les avec `openstep env`. |
| Appels à d'autres services | Depuis le serveur, appelez `externalRequest(url)` de `functions/platform.js`, et listez chaque hôte dans la valeur d'App `BACKEND_EGRESS_HOSTS` (voir ci-dessous). |
| Tables de la base de données | Créées avec `openstep data migrate`. Voir [Apps, données et contrats](/fr/cli/apps-data-contracts/). |

Ces chemins appartiennent à la plateforme, donc n'y mettez pas vos propres pages : `/api/` (envoyé à votre serveur), `/auth/`, `/data/`, `/_platform/`, `/__steps/` et `/_releases/`.

Gardez les fichiers de la plateforme fournis avec l'App. Votre code les importe :

- Dans l'App : `src/lib/platform.ts`, `src/lib/useUser.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/runtime.ts`, `src/lib/wagmi.ts`, et les providers de wallet dans `src/main.tsx`.
- Dans `functions/` : `platform.js`, `runtime-config.js` et `viem.cjs`.

`openstep pull` remet la version de la plateforme pour la plupart de ces fichiers : importez-les donc au lieu de les modifier.

Laissez ceci hors du dossier :

- Les fichiers `.env`, `.npmrc`, les clés et les autres fichiers d'identifiants. `openstep push` les refuse ; mettez plutôt leurs valeurs dans les valeurs d'environnement.
- `node_modules` et `.git`. Push les ignore de toute façon.
- Les sorties de construction comme `dist/`. Publish construit le site lui-même.

Pour que votre serveur puisse appeler un autre service, définissez `BACKEND_EGRESS_HOSTS` une fois et donnez-lui les hôtes, séparés par des virgules :

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app
openstep env set BACKEND_EGRESS_HOSTS --app app --environment development --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

## 4. L'exécuter sur votre ordinateur

Dans le dossier de l'agent, créez `openstep.config.json`, avec vos propres commandes et ports :

```json
{
  "apps": {
    "app": {
      "cwd": "apps/app",
      "frontend": { "command": ["npm", "run", "dev"], "port": 5173 },
      "backend": { "command": ["node", "functions/server.js"], "port": 8080 }
    }
  }
}
```

Avec plusieurs Apps, ajoutez une entrée sous `"apps"` pour chacune, avec ses propres ports. `openstep dev` les démarre toutes ; `openstep dev --app admin` n'en démarre qu'une.

Installez les dépendances de l'App, puis démarrez-la :

```sh
cd apps/app && npm install && cd ../..
openstep dev
```

Ouvrez l'adresse qu'affiche `openstep dev`. Votre site local parle déjà à la plateforme : il lit et écrit les données de développement de l'App, et l'IA et l'e-mail fonctionnent, facturés comme d'habitude. La connexion par wallet se fait sur le site publié. Voir [Exécuter des apps en local](/fr/cli/dev/).

## 5. Utiliser OpenStep depuis votre code

### Connexion par wallet

Dans le navigateur, `useUser()` de `src/lib/useUser` vous donne le wallet du visiteur :

```tsx
import { useUser } from './lib/useUser';

function Account() {
  const { wallet, needsSignIn, signIn, loading } = useUser();
  if (loading) return null;
  if (!wallet) return <p>Connect a wallet to continue.</p>;
  if (needsSignIn) return <button onClick={signIn}>Sign in</button>;
  return <p>Signed in as {wallet}</p>;
}
```

`signIn()` demande au visiteur d'approuver une signature gratuite sur Base. Les boutons de wallet viennent des providers de `src/main.tsx`.

Sur votre serveur, chaque requête `/api/` d'un visiteur connecté porte l'adresse de son wallet dans l'en-tête `x-steps-user-address`. Utilisez-la pour savoir qui appelle.

### E-mail

1. Écrivez vos modèles dans un fichier JSON. `{{name}}` repère une valeur que vous remplissez à l'envoi :

   ```json
   {
     "templates": [
       {
         "templateId": "booking-confirmed",
         "html": "<p>Hi {{name}}, your table is booked for {{time}}.</p>",
         "manifest": {
           "subject": "Your booking at {{shop}}",
           "slots": {
             "name": { "type": "text" },
             "time": { "type": "text" },
             "shop": { "type": "text" }
           }
         }
       }
     ]
   }
   ```

   Un ID de modèle utilise des lettres minuscules, des chiffres et `-`. Une valeur est de type `text` (jusqu'à 200 caractères) ou `url`, et une valeur `url` se place dans un lien sous la forme `href="{{link}}"`. Une App peut avoir jusqu'à 20 modèles.

2. Enregistrez-les :

   ```sh
   openstep email templates register emails.json --app app
   ```

3. Envoyez depuis le navigateur (`src/lib/platform`) ou le serveur (`functions/platform.js`) :

   ```ts
   import { sendEmail } from './lib/platform';

   await sendEmail({
     template: 'booking-confirmed',
     to: 'guest@example.com',
     data: { name: 'Alex', time: '19:00', shop: 'The Cozy Coffee Table' },
   });
   ```

   Un message peut avoir 5 destinataires au maximum.

### IA

```ts
import { invokeAI } from './lib/platform';

const text = await invokeAI({ prompt: 'Write a one-line welcome for a coffee shop.' });
const menu = await invokeAI({ prompt: 'Suggest three drinks.', schema: { type: 'object' } });
```

`invokeAI` renvoie du texte. Passez un JSON Schema comme `schema` pour récupérer du JSON déjà analysé. Cela fonctionne depuis le navigateur (`src/lib/platform`) et depuis le serveur (`functions/platform.js`).

### Actions on-chain

Depuis votre serveur, `sendTransaction` de `functions/platform.js` envoie une transaction sur Base :

```js
const { sendTransaction, publicClient } = require('./platform');

await sendTransaction({ to: contractAddress, data: callData, idempotencyKey: `order-${orderId}` });
```

Le compte du propriétaire de l'agent l'envoie et paie le gas en SSU. Un nouvel envoi avec le même `idempotencyKey` n'envoie rien de nouveau. Passez plutôt `calls: [{ to, data }, …]` pour exécuter plusieurs appels dans une seule transaction. Lisez la chaîne avec `publicClient` ou `rpc()` du même fichier ; les lectures sont gratuites.

### Données

Dans le navigateur, `supabase` de `src/lib/supabase` lit et écrit les tables de l'App :

```ts
import { supabase } from './lib/supabase';

const { data } = await supabase.from('bookings').select('*');
```

Créez et modifiez les tables avec `openstep data migrate`. En local et dans Preview, vous travaillez avec les données de développement ; le site en ligne a les siennes.

## 6. Pousser et publier

```sh
openstep diff
openstep push
openstep publish --note "First release"
openstep status <operation-id>
```

Avant la première publication, définissez, en tant que propriétaire de l'agent, les valeurs de production que lit votre code. Publish construit vos pages avec `npm ci` et `npm run build`, démarre `functions/server.js`, vérifie `/health`, puis met l'App en ligne. Voir [Push et publication](/fr/cli/push-publish/).

## À savoir

- Les appels d'IA, les e-mails, les actions on-chain et le temps pendant lequel votre App publiée tourne sont facturés en SSU au propriétaire de l'agent. Voir [Vérifier votre solde](/fr/account/balance/).
- `openstep pull` restaure les fichiers de la plateforme. Modifiez vos propres fichiers et importez depuis ceux de la plateforme.
- Une fois votre site dans l'App, vous pouvez aussi le modifier depuis la discussion de la page de travail ou avec `openstep agent chat`. Le builder travaille sur le même code.

Suite : [Qu'est-ce que le SSU](/fr/account/what-is-ssu/).
