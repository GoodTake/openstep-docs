---
title: Bring your existing code
description: Move a site you already built into an agent's App, then use OpenStep sign-in, email, AI, on-chain actions and data from your own code.
sidebar:
  order: 8
---

If you already have the code for a site, you can move it into an agent and run it on OpenStep. Your code then gets wallet sign-in, email, AI, on-chain actions and a database from the platform, and goes live with **Publish** like any other App.

This page goes from an empty folder to a live site. It assumes you have [installed the CLI and signed in](/cli/install/).

## An agent holds one or more Apps

An agent is not a single site. It holds one or more **Apps**, and each App is a separate site with its own code, preview, data, settings and live address. **Publish** puts every App of the agent live together. The picture is in [How the pieces fit](/start/what-is/#how-the-pieces-fit).

In the agent folder, each App has its own folder under `apps/`, named by its App key:

```txt
my-site/
  apps/
    app/      your site
    admin/    a second App, if you add one
  openstep.config.json
```

So first decide how your code splits into Apps:

- One site: one App. All of it goes into `apps/app/`.
- Several sites, for example a public site and a separate admin site: one App each. You add the extra Apps in step 1, and each site goes into its own folder.

Each App keeps its own data, settings and email templates, so commands such as `env`, `data`, `email` and `capabilities` take `--app <app-key>` to say which App you mean. Do steps 2 to 4 for each App. More on the folder: [What is in the folder](/cli/checkout/#what-is-in-the-folder).

## 1. Create an agent for your site

```sh
openstep agent create "My site"
openstep agent checkout <agent-id> ./my-site
cd my-site
openstep apps list
```

`agent create` prints the new agent's ID. Without `--product`, the agent uses **Web builder**. `agent checkout` copies the agent's Apps into `apps/<app-key>/`; a new agent has one, usually `apps/app/`. The examples below use `app` as the App key; use the one `apps list` shows.

The App starts with a small working site and the platform files your code will use. You replace the site with yours in step 3 and keep the platform files.

If your code is several sites, add one App for each extra site. Give it a key, a title, what it is for, who uses it, how it differs from the other Apps, and its capabilities:

```sh
openstep apps add admin --title "Admin" --purpose "Manage bookings" --audience "Shop staff" --boundary "Separate admin site" --capabilities web,server
openstep apps list
```

The new App gets its own folder, here `apps/admin/`, with the same starter site and platform files. More on adding and archiving Apps: [Apps, data and contracts](/cli/apps-data-contracts/#add-or-archive-an-app).

## 2. Add a server, if your site has one

```sh
openstep capabilities enable server --app app
openstep pull
```

This adds a `functions/` folder to the App, with a starter `server.js` and the platform's server helpers. Do it before you copy your own server code in, so your files go on top of the starter. Skip this step if your site only has pages.

## 3. Move your code into the App

Copy your site into `apps/app/`, replacing the starter pages. The App needs this shape:

| Part | What the App needs |
|---|---|
| Pages | An npm package at the App root, with `package.json` and `package-lock.json`. `npm run build` writes the finished site to `dist/`, with `index.html` at its top. |
| Settings the browser reads | Names that start with `VITE_`, for example `VITE_SITE_NAME`, set with [`openstep env`](/cli/apps-data-contracts/). |
| Server | `functions/server.js`, started with `node server.js`. It listens on the port in the `PORT` environment variable, answers `GET /health`, and serves your routes under `/api/`. `functions/package.json` lists no dependencies, so if your server uses npm packages, bundle them into `server.js` before you push. |
| Server settings and keys | Read them with `getVariable('NAME')` and `getSecret('NAME')` from `functions/runtime-config.js`, and set them with `openstep env`. |
| Calls to other services | From the server, call `externalRequest(url)` from `functions/platform.js`, and list each host in the App value `BACKEND_EGRESS_HOSTS` (see below). |
| Database tables | Created with `openstep data migrate`. See [Apps, data and contracts](/cli/apps-data-contracts/). |

These paths belong to the platform, so keep your own pages off them: `/api/` (sent to your server), `/auth/`, `/data/`, `/_platform/`, `/__steps/` and `/_releases/`.

Keep the platform files that came with the App. Your code imports from them:

- In the App: `src/lib/platform.ts`, `src/lib/useUser.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/runtime.ts`, `src/lib/wagmi.ts`, and the wallet providers in `src/main.tsx`.
- In `functions/`: `platform.js`, `runtime-config.js` and `viem.cjs`.

`openstep pull` puts the platform's own version of most of these back, so import them instead of editing them.

Leave these out of the folder:

- `.env` files, `.npmrc`, keys and other credential files. `openstep push` refuses them; put their values in environment values instead.
- `node_modules` and `.git`. Push skips them anyway.
- Build output such as `dist/`. Publish builds the site itself.

To let your server call another service, define `BACKEND_EGRESS_HOSTS` once and give it the hosts, separated by commas:

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app
openstep env set BACKEND_EGRESS_HOSTS --app app --environment development --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

## 4. Run it on your computer

Create `openstep.config.json` in the agent folder, with your own commands and ports:

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

With several Apps, add one entry under `"apps"` for each, each with its own ports. `openstep dev` starts all of them; `openstep dev --app admin` starts one.

Install the App's dependencies, then start it:

```sh
cd apps/app && npm install && cd ../..
openstep dev
```

Open the address `openstep dev` prints. Your local site already talks to the platform: it reads and writes the App's development data, and AI and email work, charged as usual. Wallet sign-in happens on the published site. See [Run apps locally](/cli/dev/).

## 5. Use OpenStep from your code

### Wallet sign-in

In the browser, `useUser()` from `src/lib/useUser` gives you the visitor's wallet:

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

`signIn()` asks the visitor to approve one free signature on Base. The wallet buttons come from the providers in `src/main.tsx`.

On your server, every `/api/` request from a signed-in visitor carries their wallet address in the `x-steps-user-address` header. Use it to tell who is calling.

### Email

1. Write your templates in a JSON file. `{{name}}` marks a value you fill in when you send:

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

   A template ID uses lowercase letters, digits and `-`. A value is `text` (up to 200 characters) or `url`, and a `url` value goes in a link as `href="{{link}}"`. An App can have up to 20 templates.

2. Register them:

   ```sh
   openstep email templates register emails.json --app app
   ```

3. Send from the browser (`src/lib/platform`) or the server (`functions/platform.js`):

   ```ts
   import { sendEmail } from './lib/platform';

   await sendEmail({
     template: 'booking-confirmed',
     to: 'guest@example.com',
     data: { name: 'Alex', time: '19:00', shop: 'The Cozy Coffee Table' },
   });
   ```

   One message goes to at most 5 recipients.

### AI

```ts
import { invokeAI } from './lib/platform';

const text = await invokeAI({ prompt: 'Write a one-line welcome for a coffee shop.' });
const menu = await invokeAI({ prompt: 'Suggest three drinks.', schema: { type: 'object' } });
```

`invokeAI` returns text. Pass a JSON Schema as `schema` to get parsed JSON back. It works from the browser (`src/lib/platform`) and the server (`functions/platform.js`).

### On-chain actions

From your server, `sendTransaction` from `functions/platform.js` sends a transaction on Base:

```js
const { sendTransaction, publicClient } = require('./platform');

await sendTransaction({ to: contractAddress, data: callData, idempotencyKey: `order-${orderId}` });
```

The agent owner's account sends it and pays the gas in SSU. Sending again with the same `idempotencyKey` sends nothing new. Pass `calls: [{ to, data }, …]` instead to run several calls in one transaction. Read the chain with `publicClient` or `rpc()` from the same file; reads are free.

### Charge a user for an action (course partners)

This works only in an agent that OpenStep has enabled for a course partner. In any other agent the call is refused with `partner_charge_not_enabled`.

From your server, `chargeUser` from `functions/platform.js` charges the user who made the request, in SSU, for an action your course defines:

```js
const { chargeUser } = require('./platform');

// Inside your /api/ route
try {
  const { chargeId } = await chargeUser({
    headers: req.headers,          // the request headers carry the user's wallet
    amount: '0.1',                 // SSU, as a decimal string
    action: 'Run sandbox payment', // up to 64 characters, shown on the user's Balance page
    idempotencyKey: paymentId,     // 8 to 128 characters, one per charge
  });
  // Charged: now do the paid action.
} catch (err) {
  if (err.code === 'insufficient_balance') {
    // Ask the user to top up, and don't do the paid action.
  }
}
```

- It charges whoever uses the App, including the agent's owner and collaborators. Only SSU the user topped up can pay; SSU that OpenStep gave them as a gift can't.
- The user isn't asked to confirm each charge, so show the price on the page before they use the action.
- Sending again with the same `idempotencyKey` charges nothing new and returns the same `chargeId`. Using a key again for a different amount, action or user fails with `idempotency_key_reused`.
- `unknown_wallet` means the wallet has no OpenStep account: ask the user to sign in to OpenStep and top up. `invalid_request` means a value is missing or wrong, for example when no signed-in user's wallet came with the request.
- The wallet reaches your server only when the user is signed in (see Wallet sign-in above). In Preview, it is sent only when the agent's access is **Learners only** or the agent has roles and missions. Under `openstep dev`, the charge comes from your own wallet.
- The charge shows on the user's Balance page with the agent's name and the action. OpenStep shares the revenue with the course partner, who sees each charge on the **Partner earnings** page.

### Data

In the browser, `supabase` from `src/lib/supabase` reads and writes the App's tables:

```ts
import { supabase } from './lib/supabase';

const { data } = await supabase.from('bookings').select('*');
```

Create and change tables with `openstep data migrate`. Locally and in Preview you work with development data; the live site has its own.

## 6. Push and publish

```sh
openstep diff
openstep push
openstep publish --note "First release"
openstep status <operation-id>
```

Before the first Publish, set the Production values your code reads, as the agent's owner. Publish builds your pages with `npm ci` and `npm run build`, starts `functions/server.js`, checks `/health`, and then puts the App live. See [Push and publish](/cli/push-publish/).

## Good to know

- AI calls, emails, on-chain actions and the time your published App runs are charged in SSU to the agent's owner. See [Check your balance](/account/balance/).
- `openstep pull` restores the platform files. Edit your own files and import from the platform ones.
- Once your site is in the App, you can also change it from the chat on the work page or with `openstep agent chat`. The builder works on the same code.

Next: [What is SSU](/account/what-is-ssu/).
