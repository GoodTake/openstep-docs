---
title: Apporter votre code existant
description: Déplacez un site que vous avez déjà créé dans l'App d'un agent, puis utilisez la connexion OpenStep, l'e-mail, l'IA, les actions on-chain et les données depuis votre propre code.
sidebar:
  order: 8
---

Si vous avez déjà le code d'un site, vous pouvez le déplacer dans un agent et l'exécuter sur OpenStep. Votre code obtient alors de la plateforme la connexion par wallet, l'e-mail, l'IA, les actions on-chain et une base de données, et passe en ligne avec **Publish** comme n'importe quelle autre App.

Cette page va d'un dossier vide à un site en ligne. Elle suppose que vous avez [installé la CLI et que vous êtes connecté](/fr/cli/install/).

## Un agent contient une ou plusieurs Apps

Un agent n'est pas un seul site. Il contient une ou plusieurs **Apps**, et chaque App est un site distinct, avec son propre code, son propre aperçu, ses propres données, ses propres réglages et sa propre adresse en ligne. **Publish** met toutes les Apps de l'agent en ligne ensemble. Le schéma est dans [Fonctionnement](/fr/start/what-is/#fonctionnement).

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

`agent create` affiche le nouvel agent en JSON ; son `id` est l'ID de l'agent. Sans `--product`, l'agent utilise **Web builder**. `agent checkout` copie les Apps de l'agent dans `apps/<app-key>/` ; un nouvel agent en a une, en général `apps/app/`. Les exemples ci-dessous utilisent `app` comme clé d'App ; utilisez celle que `apps list` affiche.

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
```

Cela ajoute un dossier `functions/` à l'App et le rapatrie dans votre dossier : un `server.js` de départ, les utilitaires serveur de la plateforme `platform.js`, `runtime-config.js` et `viem.cjs`, ainsi que `openapi.json`, `check-openapi.js`, `package.json` et `Dockerfile`. Faites-le avant de copier votre propre code serveur, pour que vos fichiers se placent par-dessus ceux de départ. Passez cette étape si votre site n'a que des pages.

## 3. Déplacer votre code dans l'App

Copiez votre site dans `apps/app/`, en remplaçant les pages de départ. Gardez les fichiers `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json` et `vite.config.ts` de l'App : les fichiers de la plateforme ont besoin des paquets et des réglages qu'ils contiennent, comme `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `@tanstack/react-query`, `@supabase/supabase-js`, et `@babel/core`, qu'utilise l'édition visuelle. Ajoutez les paquets de votre site avec `npm install <package>` dans `apps/app` au lieu de copier votre propre `package.json` par-dessus, et ajoutez vos propres réglages Vite au `vite.config.ts` de l'App.

Si vous remplacez le `index.html` de l'App par le vôtre, gardez cette ligne dans son `<head>`, sinon **Analytics** dans **Console** cesse de compter les visiteurs de votre site :

```html
<script defer referrerpolicy="same-origin" src="/_platform/analytics.js"></script>
```

L'App doit avoir cette forme :

| Élément | Ce dont l'App a besoin |
|---|---|
| Pages | Une configuration npm à la racine de l'App, avec `package.json` et `package-lock.json`. `npm run build` écrit le site terminé dans `dist/`, avec `index.html` à sa racine. |
| Réglages lus par le navigateur | Des noms qui commencent par `VITE_`, par exemple `VITE_SITE_NAME`, définis avec [`openstep env`](/fr/cli/apps-data-contracts/). |
| Serveur | `functions/server.js`, démarré avec `node server.js`. Il écoute sur le port de la variable d'environnement `PORT`, répond à `GET /health` et sert vos routes sous `/api/`. `functions/package.json` ne liste aucune dépendance : regroupez donc les paquets npm que votre serveur utilise dans `functions/vendor.cjs`, et utilisez `require('./vendor.cjs')` dans votre propre code de `server.js` et du reste de `functions/`. Voir [Regrouper les paquets npm de votre serveur](#regrouper-les-paquets-npm-de-votre-serveur). |
| Réglages et clés du serveur | Lisez-les avec `getVariable('NAME')` et `getSecret('NAME')` de `functions/runtime-config.js`, et définissez-les avec `openstep env`. En dehors de `process.env.PORT` et `process.env.NODE_ENV`, votre propre code dans `functions/` ne doit pas lire `process.env` : le serveur en ligne n'y garde aucun réglage, et Publish refuse l'App. |
| Appels à d'autres services | Depuis le serveur, appelez `externalRequest(url)` de `functions/platform.js`, et listez chaque hôte dans la valeur d'App `BACKEND_EGRESS_HOSTS` (voir ci-dessous). |
| Tables de la base de données | Créées avec `openstep data migrate <id> <file> --app app`, par exemple `openstep data migrate 0002_add_bookings ./bookings.sql --app app`. Écrivez les noms sans schéma (`bookings`, pas `public.bookings`), et seulement les instructions de [Ce qu'une migration peut contenir](/fr/cli/apps-data-contracts/#ce-quune-migration-peut-contenir). Gardez `migrations/0001_platform_baseline.sql`, qui contient les tables propres à la plateforme. |

Ces chemins appartiennent à la plateforme, donc n'y mettez pas vos propres pages : `/api/` (envoyé à votre serveur), `/auth/`, `/data/`, `/_platform/`, `/__steps/` et `/_releases/`.

Gardez les fichiers de la plateforme fournis avec l'App. Votre code s'appuie dessus :

- Dans l'App : `src/lib/platform.ts`, `src/lib/useUser.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/runtime.ts`, `src/lib/wagmi.ts`, les providers de wallet dans `src/main.tsx`, et `migrations/0001_platform_baseline.sql`.
- Dans `functions/` : `platform.js`, `runtime-config.js`, `viem.cjs`, `openapi.json` et `check-openapi.js`.

`openstep pull`, et chaque `openstep push`, remettent dans votre dossier la version actuelle de la plateforme pour `src/lib/runtime.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/useUser.ts`, `functions/platform.js`, `functions/runtime-config.js`, `functions/viem.cjs` et `functions/check-openapi.js` : importez-les donc au lieu de les modifier. `src/lib/platform.ts`, `src/lib/wagmi.ts` et `src/main.tsx` sont à vous une fois l'App créée : modifiez-les selon vos besoins, et gardez-y les parties qui viennent de la plateforme.

Laissez ceci hors du dossier :

- Les fichiers dont le nom commence par `.env` (`.env.example` compris), les fichiers `.npmrc` et `.yarnrc`, les fichiers de clés comme `*.pem`, `*.key`, `*.p12` et `*.pfx`, et les dossiers nommés `key`, `keys`, `secret`, `secrets`, `credential` ou `credentials`. Mettez plutôt leurs valeurs dans les valeurs d'environnement. Tant que l'un d'eux est dans le dossier de l'App, `openstep diff`, `pull` et `push` s'arrêtent, même si le `.gitignore` de l'App liste ce fichier ou ce dossier lui-même, avec un message qui indique le chemin et la raison, par exemple `Local source path refused: apps/app/.env.example (a secret-looking file; remove it and put its values in environment values)`. Les fichiers situés dans un dossier que `.gitignore` ignore et qui n'a jamais été poussé ne sont pas examinés du tout.
- `node_modules` et `.git`. Push les ignore de toute façon.
- Les sorties de construction comme `dist/`. Publish construit le site lui-même.

Les chemins qu'ignorent les `.gitignore` du dossier de l'App, comme `dist/`, restent hors de `openstep diff`, `push` et `pull`, et ne comptent pas comme des modifications non poussées quand vous publiez. Un fichier que le code source accepté de l'App contient déjà fait exception : il est quand même envoyé à chaque push, par exemple un `dist/` qu'une ancienne CLI a poussé. Pour le retirer, supprimez-le dans votre dossier, puis poussez. Si le `.gitignore` de votre App liste un fichier dont votre site a besoin (une ancienne App liste `vite.config.js`), supprimez cette ligne avant de pousser.

Pour que votre serveur puisse appeler un autre service, définissez `BACKEND_EGRESS_HOSTS` une fois et donnez-lui les hôtes, séparés par des virgules :

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

`env define` crée la valeur avec son réglage de développement, et `env set` lui donne celui de production.

### Regrouper les paquets npm de votre serveur

Publish exécute `functions/` exactement comme vous l'avez poussé, sans `npm install`. Mettez donc les paquets npm que votre serveur utilise dans un seul fichier regroupé, `functions/vendor.cjs`, et gardez votre propre code dans `server.js` et le reste de `functions/`. Publish vérifie vos propres fichiers, mais pas `vendor.cjs`.

1. Depuis le dossier de l'agent, créez un dossier pour les paquets en dehors de `apps/`, pour que push ne l'envoie jamais, et installez-y les paquets ainsi qu'esbuild :

   ```sh
   mkdir server-packages
   cd server-packages
   npm init -y
   npm install express esbuild
   ```

2. Dans ce dossier, écrivez `index.js`. Il exporte ce que votre serveur utilise :

   ```js
   module.exports = { express: require('express') };
   ```

3. Regroupez-le dans l'App, puis revenez au dossier de l'agent :

   ```sh
   npx esbuild index.js --bundle --platform=node --format=cjs --outfile=../apps/app/functions/vendor.cjs
   cd ..
   ```

4. Dans `functions/server.js`, prenez les paquets dans le fichier regroupé :

   ```js
   const { express } = require('./vendor.cjs');
   ```

Regroupez de nouveau avant de pousser chaque fois que vous ajoutez ou mettez à jour un paquet. Publish accepte jusqu'à 128 Mio pour l'ensemble de `functions/`, `vendor.cjs` compris, mais gardez chaque fichier, `vendor.cjs` aussi, sous 25 Mio : un fichier plus gros fait échouer l'aperçu de l'App sur la page de travail et les tours du builder. Vérifiez que le `.gitignore` de l'App n'ignore pas `functions/vendor.cjs`, par exemple avec une ligne `*.cjs` : push laisse de côté les fichiers qu'il ignore, et le fichier regroupé n'atteindrait donc jamais la plateforme.

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

Ouvrez l'adresse qu'affiche `openstep dev`. Votre site local parle déjà à la plateforme : il lit et écrit les données de développement de l'App, et l'IA et l'e-mail fonctionnent, facturés comme d'habitude. `openstep dev` démarre votre serveur avec `PORT` défini sur le port `backend`, ici 8080. Il traite aussi `/api` selon les règles du site en ligne et vous avertit quand une requête y échouerait. Voir [Ce qui fonctionne différemment sur le site en ligne](#ce-qui-fonctionne-différemment-sur-le-site-en-ligne) et [Exécuter des apps en local](/fr/cli/dev/).

## Ce qui fonctionne différemment sur le site en ligne

Sur le site en ligne, votre App tourne derrière la passerelle de la plateforme. Quelques points y fonctionnent autrement que sur votre propre serveur :

- Les corps de requête sont limités à 10 Mio. Votre serveur peut recevoir du JSON, du texte, des formulaires et des envois de fichiers, jusqu'à 10 Mio par requête ; une requête plus grosse reçoit une erreur 413 et ne l'atteint jamais. Pour des fichiers plus gros, utilisez le stockage de fichiers de l'App : votre serveur demande un lien d'envoi à `files.createUpload()` de `functions/platform.js`, et la page envoie le fichier directement à ce lien, jusqu'à 25 Mio par fichier.
- Seuls certains en-têtes passent. Depuis le navigateur, votre serveur ne reçoit que `Accept`, `Accept-Language`, `Authorization`, `Content-Type`, `If-Match`, `If-None-Match`, `Range`, `Range-Unit` et `User-Agent`, plus les en-têtes `x-steps-` propres à la plateforme. Le navigateur ne reçoit en retour que `Accept-Ranges`, `Cache-Control`, `Content-Language`, `Content-Range`, `Content-Type`, `ETag`, `Last-Modified`, `Preference-Applied` et `Vary`.
- Il n'y a ni cookies, ni redirections, ni noms de téléchargement. Votre serveur ne reçoit aucun cookie, et ses en-têtes `Set-Cookie`, `Location` et `Content-Disposition` n'atteignent jamais le navigateur. Pour savoir qui appelle, utilisez la connexion de `useUser()` et l'en-tête `x-steps-user-address` (voir [Connexion par wallet](#connexion-par-wallet)), ou votre propre jeton dans l'en-tête `Authorization`. Au lieu d'une redirection, répondez avec du JSON et passez à la page suivante dans le navigateur. Pour un téléchargement, récupérez le fichier dans la page et enregistrez-le depuis celle-ci :

  ```ts
  const blob = await (await fetch('/api/export.csv')).blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'export.csv';
  link.click();
  ```

- Certaines URL vers `/api` ont besoin de `releaseRuntimePath()`. Le site en ligne réécrit les URL que votre page passe à `fetch`, `XMLHttpRequest` et `sendBeacon`, ainsi que les URL écrites dans les fichiers HTML et CSS qu'il sert. Une URL définie depuis un script (par exemple une balise `<img>` rendue par React), un `<a href>` ou `window.location` qui pointent vers un chemin `/api` nu ont besoin de `releaseRuntimePath('/api/...')` de `src/lib/runtime` ; sinon le site en ligne public répond par une erreur 404 :

  ```tsx
  import { releaseRuntimePath } from './lib/runtime';

  function Avatar() {
    return <img src={releaseRuntimePath('/api/avatar/1')} alt="" />;
  }
  ```

- Rien n'est diffusé en continu. La réponse de votre serveur n'arrive au navigateur qu'une fois terminée, et elle doit se terminer dans les 60 secondes. Publish refuse l'App si `new EventSource(` ou `new WebSocket(` apparaît dans vos pages ou dans `functions/`.
- Seules vos propres pages atteignent votre serveur. Les autres services ne peuvent pas l'appeler : un webhook ou un callback de connexion qui pointe vers `/api/` ne passe pas. Faites plutôt pointer le callback de connexion vers une page de votre site, puis laissez cette page transmettre à votre serveur, avec `fetch`, ce qu'elle a reçu. Une requête qui modifie quelque chose, comme un `POST`, doit aussi venir d'une page de votre site.
- Utilisez le client de données de la plateforme. Votre propre client de base de données, comme `createClient` de `@supabase/supabase-js` ou une adresse `supabase.co`, fait que Publish refuse l'App, tout comme un élément `<base>` dans `index.html`. Utilisez plutôt `supabase` de `src/lib/supabase` (voir [Données](#données)).

`openstep dev` traite `/api` selon ces règles pour une App avec un serveur : vous en rencontrez donc la plupart d'abord sur votre ordinateur. La première fois qu'elle répond par l'une des erreurs 404 ou 413 ci-dessous, ou qu'elle retire l'un des en-têtes ci-dessous, la CLI affiche un avertissement qui commence par `openstep:` et dit quoi changer :

- Une URL `/api` nue que le navigateur charge autrement qu'avec `fetch`, `XMLHttpRequest` ou `sendBeacon` reçoit une erreur 404. Si le `src/lib/runtime.ts` de votre App date d'avant cette règle, le chargement passe quand même, avec un avertissement. Exécutez `openstep pull` : la commande remet dans votre dossier la version actuelle des fichiers de la plateforme.
- Une URL `/api` écrite dans un fichier HTML ou CSS reçoit aussi une erreur 404. Ici `openstep dev` est plus strict que le site en ligne, qui réécrit de telles URL : définissez plutôt l'URL depuis un script avec `releaseRuntimePath()`.
- Toute requête `/api` qui demande `text/event-stream` reçoit une erreur 404, même un `fetch` auquel le site en ligne répondrait une fois que votre serveur a terminé la réponse. Il en va de même pour une connexion WebSocket vers `/api`.
- Seuls les en-têtes que le site en ligne laisse passer circulent entre le navigateur et votre serveur, ainsi que `Content-Length`, `Transfer-Encoding` et `Content-Encoding`, qui transportent le corps tel qu'il a été envoyé. La CLI avertit quand elle retire `Cookie`, `Set-Cookie`, `Location` ou `Content-Disposition`.
- Un corps de requête de plus de 10 Mio reçoit une erreur 413.
- `curl` et les autres programmes n'envoient pas d'en-tête `Sec-Fetch-Dest` ; leurs requêtes ne sont donc jamais refusées comme des chargements.
- Toute requête venant d'un autre site, dont l'en-tête `Origin` n'est pas l'adresse affichée par `openstep dev`, reçoit une erreur 403 sans avertissement, de même qu'une requête vers cette adresse sous un autre nom, comme `localhost` au lieu de `127.0.0.1`. Cela empêche d'autres pages d'utiliser vos identifiants locaux.

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

Sur le site en ligne, chaque requête `/api/` d'un visiteur qui s'est connecté porte l'adresse de son wallet dans l'en-tête `x-steps-user-address` ; avant sa connexion, elle n'en porte pas. Utilisez cette adresse pour savoir qui appelle. Sous `openstep dev`, la page utilise le wallet que vous connectez, sans signature, et votre serveur voit le wallet avec lequel vous vous êtes connecté à la CLI. Connectez ce même wallet dans le navigateur.

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

   Un ID de modèle commence par une lettre minuscule et utilise des lettres minuscules, des chiffres et `-`. Une valeur est de type `text` (jusqu'à 200 caractères) ou `url`. Une valeur `url` se place dans un lien sous la forme `href="{{link}}"`, et doit être une URL `https` sur l'adresse en ligne de l'App ou sur son domaine personnalisé. Toute autre URL de lien ou d'image du modèle doit en être une aussi, ou être un lien `mailto:`. Une App peut avoir jusqu'à 20 modèles.

2. Enregistrez-les :

   ```sh
   openstep email templates register emails.json --app app
   ```

   Le chemin du fichier est relatif au dossier de l'agent. L'enregistrement remplace tous les modèles de l'App par ceux du fichier.

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

### Faire payer un utilisateur pour une action (partenaires de cours)

Cela ne fonctionne que dans un agent qu'OpenStep a activé pour un partenaire de cours. Dans tout autre agent, l'appel est refusé avec `partner_charge_not_enabled`.

Depuis votre serveur, `chargeUser` de `functions/platform.js` fait payer en SSU l'utilisateur qui a envoyé la requête, pour une action définie par votre cours :

```js
const { chargeUser } = require('./platform');

// Dans votre route /api/
try {
  const { chargeId } = await chargeUser({
    headers: req.headers,          // les en-têtes de la requête portent le wallet de l'utilisateur
    amount: '0.1',                 // SSU, sous forme de chaîne décimale
    action: 'Run sandbox payment', // 64 caractères au plus, affiché sur la page Balance de l'utilisateur
    idempotencyKey: paymentId,     // 8 à 128 caractères, un par paiement
  });
  // Payé : effectuez maintenant l'action payante.
} catch (err) {
  if (err.code === 'insufficient_balance') {
    // Demandez à l'utilisateur de faire un Top up, et n'effectuez pas l'action payante.
  }
}
```

- Le paiement est demandé à la personne qui utilise l'App, y compris le propriétaire de l'agent et ses collaborateurs. Seul le SSU que l'utilisateur a rechargé peut payer ; le SSU offert par OpenStep ne le peut pas.
- L'utilisateur ne confirme pas chaque paiement : affichez le prix sur la page avant qu'il utilise l'action.
- Un nouvel envoi avec le même `idempotencyKey` ne fait rien payer de nouveau et renvoie le même `chargeId`. Réutiliser une clé pour un autre montant, une autre action ou un autre utilisateur échoue avec `idempotency_key_reused`.
- `unknown_wallet` signifie que le wallet n'a pas de compte OpenStep : demandez à l'utilisateur de se connecter à OpenStep et de faire un Top up. `invalid_request` signifie qu'une valeur manque ou est incorrecte, par exemple quand aucun wallet d'utilisateur connecté n'accompagne la requête.
- Le wallet n'arrive à votre serveur que si l'utilisateur est connecté (voir Connexion par wallet plus haut). Dans Preview, il n'est envoyé que si l'accès de l'agent est **Learners only** ou si l'agent a des rôles et des missions. Sous `openstep dev`, le paiement est pris sur votre propre wallet.
- Le paiement apparaît sur la page Balance de l'utilisateur avec le nom de l'agent et l'action. OpenStep partage le revenu avec le partenaire de cours, qui voit chaque paiement sur la page **Partner earnings**.

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

Avant la première publication, définissez, en tant que propriétaire de l'agent, les valeurs de production que lit votre code. Publish construit vos pages avec `npm ci` et `npm run build`, démarre `functions/server.js`, vérifie que `GET /health` répond avec un statut 2xx ou 3xx dans les 30 secondes, puis met l'App en ligne. Voir [Push et publication](/fr/cli/push-publish/).

## À savoir

- Les appels d'IA, les e-mails, les actions on-chain et le temps pendant lequel votre App publiée tourne sont facturés en SSU au propriétaire de l'agent. Voir [Vérifier votre solde](/fr/account/balance/).
- `openstep pull` et chaque push remettent dans votre dossier la version actuelle des fichiers de la plateforme. Modifiez vos propres fichiers et importez depuis ceux de la plateforme.
- Une fois votre site dans l'App, vous pouvez aussi le modifier depuis la discussion de la page de travail ou avec `openstep agent chat`. Le builder travaille sur le même code.

Suite : [Qu'est-ce que le SSU](/fr/account/what-is-ssu/).
