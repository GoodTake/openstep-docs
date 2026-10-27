---
title: Bring your existing code
description: Move a site you already built into an agent's App, then use OpenStep sign-in, email, AI, on-chain actions and data from your own code.
sidebar:
  order: 8
---

If you already have the code for a site, you can move it into an agent and run it on OpenStep. Your code then gets wallet sign-in, email, AI, on-chain actions and a database from the platform, and goes live with **Publish** like any other App.

This page goes from an empty folder to a live site. It assumes you have [installed the CLI and signed in](/cli/install/).

## An agent holds one or more Apps

An agent is not a single site. It holds one or more **Apps**, and each App is a separate site with its own code, preview, data, settings and live address. **Publish** puts every App of the agent live together. The picture is in [How it works](/start/what-is/#how-it-works).

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

`agent create` prints the new agent as JSON; its `id` is the agent ID. Without `--product`, the agent uses **Web builder**. `agent checkout` copies the agent's Apps into `apps/<app-key>/`; a new agent has one, usually `apps/app/`. The examples below use `app` as the App key; use the one `apps list` shows.

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
```

This adds a `functions/` folder to the App and brings it into your folder: a starter `server.js`, the platform's server helpers `platform.js`, `runtime-config.js` and `viem.cjs`, and `openapi.json`, `check-openapi.js`, `package.json` and `Dockerfile`. Do it before you copy your own server code in, so your files go on top of the starter. Skip this step if your site only has pages.

## 3. Move your code into the App

Copy your site into `apps/app/`, replacing the starter pages. Keep the App's own `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json` and `vite.config.ts`: the platform files need the packages and settings in them, such as `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `@tanstack/react-query`, `@supabase/supabase-js`, and `@babel/core`, which visual editing uses. Add your site's packages with `npm install <package>` in `apps/app` instead of copying your own `package.json` over, and add your own Vite settings to the App's `vite.config.ts`.

If you replace the App's `index.html` with your own, keep this line in its `<head>`, or **Analytics** in the **Console** stops counting your site's visitors:

```html
<script defer referrerpolicy="same-origin" src="/_platform/analytics.js"></script>
```

The App needs this shape:

| Part | What the App needs |
|---|---|
| Pages | An npm package at the App root, with `package.json` and `package-lock.json`. `npm run build` writes the finished site to `dist/`, with `index.html` at its top. |
| Settings the browser reads | Names that start with `VITE_`, for example `VITE_SITE_NAME`, set with [`openstep env`](/cli/apps-data-contracts/). |
| Server | `functions/server.js`, started with `node server.js`. It listens on the port in the `PORT` environment variable, answers `GET /health`, and serves your routes under `/api/`. `functions/package.json` lists no dependencies, so bundle the npm packages your server uses into `functions/vendor.cjs`, and `require('./vendor.cjs')` from your own code in `server.js` and the rest of `functions/`. See [Bundle your server's npm packages](#bundle-your-servers-npm-packages). |
| Server settings and keys | Read them with `getVariable('NAME')` and `getSecret('NAME')` from `functions/runtime-config.js`, and set them with `openstep env`. Apart from `process.env.PORT` and `process.env.NODE_ENV`, your own code in `functions/` must not read `process.env`: the live server keeps no settings there, and Publish refuses the App. |
| Calls to other services | From the server, call `externalRequest(url)` from `functions/platform.js`, and list each host in the App value `BACKEND_EGRESS_HOSTS` (see below). |
| Database tables | Created with `openstep data migrate <id> <file> --app app`, for example `openstep data migrate 0002_add_bookings ./bookings.sql --app app`. Write names without a schema (`bookings`, not `public.bookings`), and only the statements in [What a migration can contain](/cli/apps-data-contracts/#what-a-migration-can-contain). Keep `migrations/0001_platform_baseline.sql`, which holds the platform's own tables. |

These paths belong to the platform, so keep your own pages off them: `/api/` (sent to your server), `/auth/`, `/data/`, `/_platform/`, `/__steps/` and `/_releases/`.

Keep the platform files that came with the App. Your code relies on them:

- In the App: `src/lib/platform.ts`, `src/lib/useUser.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/runtime.ts`, `src/lib/wagmi.ts`, the wallet providers in `src/main.tsx`, and `migrations/0001_platform_baseline.sql`.
- In `functions/`: `platform.js`, `runtime-config.js`, `viem.cjs`, `openapi.json` and `check-openapi.js`.

`openstep pull`, and every `openstep push`, put the platform's current version of `src/lib/runtime.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/useUser.ts`, `functions/platform.js`, `functions/runtime-config.js`, `functions/viem.cjs` and `functions/check-openapi.js` back into your folder, so import them instead of editing them. `src/lib/platform.ts`, `src/lib/wagmi.ts` and `src/main.tsx` are yours once the App is created: change them as you need, and keep their platform parts.

Leave these out of the folder:

- Files whose names start with `.env` (`.env.example` included), `.npmrc`, `.yarnrc`, key files such as `*.pem`, `*.key`, `*.p12` and `*.pfx`, and folders named `key`, `keys`, `secret`, `secrets`, `credential` or `credentials`. Put their values in environment values instead. While one of them is in the App's folder, `openstep diff`, `pull` and `push` stop, even when the App's `.gitignore` lists that file or folder itself, with a message that names the path and why, for example `Local source path refused: apps/app/.env.example (a secret-looking file; remove it and put its values in environment values)`. Files inside a folder that `.gitignore` ignores, and that was never pushed, are not looked at at all.
- `node_modules` and `.git`. Push skips them anyway.
- Build output such as `dist/`. Publish builds the site itself.

Paths that the `.gitignore` files in the App's folder ignore, such as `dist/`, stay out of `openstep diff`, `push` and `pull`, and do not count as edits you have not pushed when you publish. A file the App's accepted source already has is the exception: it still goes up with every push, for example a `dist/` an older CLI pushed. To remove it, delete it in your folder and push. If your App's `.gitignore` lists a file your site needs (an older App lists `vite.config.js`), remove that line before you push.

To let your server call another service, define `BACKEND_EGRESS_HOSTS` once and give it the hosts, separated by commas:

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

`env define` creates the value with its development setting, and `env set` gives it the one for production.

### Bundle your server's npm packages

Publish runs `functions/` exactly as you pushed it, without `npm install`. So put the npm packages your server uses into one bundled file, `functions/vendor.cjs`, and keep your own code in `server.js` and the rest of `functions/`. Publish checks your own files, but not `vendor.cjs`.

1. From the agent folder, make a folder for the packages outside `apps/`, so push never sends it, and install them there together with esbuild:

   ```sh
   mkdir server-packages
   cd server-packages
   npm init -y
   npm install express esbuild
   ```

2. In that folder, write `index.js`. It exports what your server uses:

   ```js
   module.exports = { express: require('express') };
   ```

3. Bundle it into the App, then go back to the agent folder:

   ```sh
   npx esbuild index.js --bundle --platform=node --format=cjs --outfile=../apps/app/functions/vendor.cjs
   cd ..
   ```

4. In `functions/server.js`, take the packages from the bundle:

   ```js
   const { express } = require('./vendor.cjs');
   ```

Bundle again before you push whenever you add or update a package. Publish takes up to 128 MiB for all of `functions/`, `vendor.cjs` included, but keep every single file, `vendor.cjs` too, under 25 MiB: a larger file makes the App's preview on the work page and the builder's turns fail. Check that the App's `.gitignore` does not ignore `functions/vendor.cjs`, for example with a `*.cjs` line: push leaves out the files it ignores, so the bundle would never reach the platform.

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

Open the address `openstep dev` prints. Your local site already talks to the platform: it reads and writes the App's development data, and AI and email work, charged as usual. `openstep dev` starts your server with `PORT` set to the `backend` port, here 8080. It also handles `/api` by the live site's rules and warns you when a request would fail there. See [What works differently on the live site](#what-works-differently-on-the-live-site) and [Run apps locally](/cli/dev/).

## What works differently on the live site

On the live site, your App runs behind the platform's gateway. A few things work differently there than on a server of your own:

- Request bodies stop at 10 MiB. Your server can take JSON, text, forms and file uploads, up to 10 MiB a request; a bigger request gets 413 and never reaches it. For bigger files, use the App's file storage: your server asks `files.createUpload()` from `functions/platform.js` for an upload link, and the page sends the file straight to it, up to 25 MiB a file.
- Only some headers pass. From the browser, your server gets only `Accept`, `Accept-Language`, `Authorization`, `Content-Type`, `If-Match`, `If-None-Match`, `Range`, `Range-Unit` and `User-Agent`, plus the platform's own `x-steps-` headers. The browser gets back only `Accept-Ranges`, `Cache-Control`, `Content-Language`, `Content-Range`, `Content-Type`, `ETag`, `Last-Modified`, `Preference-Applied` and `Vary`.
- There are no cookies, redirects or download names. Your server gets no cookies, and its `Set-Cookie`, `Location` and `Content-Disposition` headers never reach the browser. To know who is calling, use `useUser()` sign-in and the `x-steps-user-address` header (see [Wallet sign-in](#wallet-sign-in)), or your own token in the `Authorization` header. Instead of a redirect, answer with JSON and move to the next page in the browser. For a download, fetch the file in the page and save it from there:

  ```ts
  const blob = await (await fetch('/api/export.csv')).blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'export.csv';
  link.click();
  ```

- Some URLs to `/api` need `releaseRuntimePath()`. The live site rewrites the URLs your page passes to `fetch`, `XMLHttpRequest` and `sendBeacon`, and the URLs written in the HTML and CSS files it serves. A URL set from script (for example an `<img>` rendered by React), an `<a href>` or `window.location` that points at a bare `/api` path needs `releaseRuntimePath('/api/...')` from `src/lib/runtime`, or the public live site answers 404:

  ```tsx
  import { releaseRuntimePath } from './lib/runtime';

  function Avatar() {
    return <img src={releaseRuntimePath('/api/avatar/1')} alt="" />;
  }
  ```

- Nothing streams. Your server's response reaches the browser only once it ends, and it must end within 60 seconds. `new EventSource(` and `new WebSocket(` in your pages or in `functions/` make Publish refuse the App.
- Only your own pages reach your server. Other services can't call it: a webhook or a sign-in callback that points at `/api/` does not get through. Point a sign-in callback at a page of your site instead, and have that page send what it got to your server with `fetch`. A request that changes something, such as a `POST`, must come from a page of your site too.
- Use the platform's data client. Your own database client, such as `createClient` from `@supabase/supabase-js` or a `supabase.co` address, makes Publish refuse the App, and so does a `<base>` element in `index.html`. Use `supabase` from `src/lib/supabase` instead (see [Data](#data)).

`openstep dev` handles `/api` by these rules for an App with a server, so you meet most of them on your computer first. The first time it answers with one of the 404s or the 413 below, or drops one of the headers below, the CLI prints a warning that starts with `openstep:` and says what to change:

- A bare `/api` URL that the browser loads any other way than with `fetch`, `XMLHttpRequest` or `sendBeacon` gets 404. If your App's `src/lib/runtime.ts` predates this rule, the load still goes through, with a warning. Run `openstep pull`: it puts the platform's current version of the platform files back into your folder.
- A `/api` URL written in an HTML or CSS file gets 404 too. Here `openstep dev` is stricter than the live site, which rewrites such URLs: set the URL from script with `releaseRuntimePath()` instead.
- Any `/api` request that asks for `text/event-stream` gets 404, even a `fetch` the live site would answer once your server ends the response. So does a WebSocket to `/api`.
- Only the headers the live site passes go between the browser and your server, plus `Content-Length`, `Transfer-Encoding` and `Content-Encoding`, which carry the body as it was sent. The CLI warns when it drops `Cookie`, `Set-Cookie`, `Location` or `Content-Disposition`.
- A request body over 10 MiB gets 413.
- `curl` and other programs send no `Sec-Fetch-Dest` header, so their requests are never refused as loads.
- Any request from another site, one whose `Origin` is not the address `openstep dev` printed, gets 403 with no warning, and so does a request to that address under another name, such as `localhost` instead of `127.0.0.1`. This keeps other pages from using your local credentials.

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

On the live site, every `/api/` request from a visitor who signed in carries their wallet address in the `x-steps-user-address` header; before they sign in, it has none. Use it to tell who is calling. Under `openstep dev`, the page uses the wallet you connect, with no signature, and your server sees the wallet you signed in to the CLI with. Connect that same wallet in the browser.

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

   A template ID starts with a lowercase letter and uses lowercase letters, digits and `-`. A value is `text` (up to 200 characters) or `url`. A `url` value goes in a link as `href="{{link}}"`, and must be an `https` URL on the App's live address or its custom domain. Every other link or image URL in the template must be one too, or a `mailto:` link. An App can have up to 20 templates.

2. Register them:

   ```sh
   openstep email templates register emails.json --app app
   ```

   The file path is relative to the agent folder. Registering replaces all of the App's templates with the ones in the file.

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

Before the first Publish, set the Production values your code reads, as the agent's owner. Publish builds your pages with `npm ci` and `npm run build`, starts `functions/server.js`, checks that `GET /health` answers with a 2xx or 3xx status within 30 seconds, and then puts the App live. See [Push and publish](/cli/push-publish/).

## Good to know

- AI calls, emails, on-chain actions and the time your published App runs are charged in SSU to the agent's owner. See [Check your balance](/account/balance/).
- `openstep pull` and every push put the platform's current version of the platform files back into your folder. Edit your own files and import from the platform ones.
- Once your site is in the App, you can also change it from the chat on the work page or with `openstep agent chat`. The builder works on the same code.

Next: [What is SSU](/account/what-is-ssu/).
