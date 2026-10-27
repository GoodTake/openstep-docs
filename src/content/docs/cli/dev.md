---
title: Run apps locally
description: Describe how each App starts, then run its frontend and backend on your computer with openstep dev.
sidebar:
  order: 5
---

`openstep dev` starts your Apps on your computer, connected to the agent's real development data. You tell it how each App starts in a file called `openstep.config.json`.

## Set up

1. In the agent folder, create `openstep.config.json`. Add one entry for each App you want to run, using the App key as the name.

   ```json
   {
     "apps": {
       "web": {
         "cwd": "apps/web",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5173"], "port": 5173 },
         "backend": { "command": ["node", "functions/server.js"], "port": 8787 }
       },
       "admin": {
         "cwd": "apps/admin",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5174"], "port": 5174 }
       }
     }
   }
   ```

   - `cwd` is the App's folder, relative to the agent folder.
   - `frontend` and `backend` each take a `command` and a `port`. `command` is a list: the program first, then its arguments. It runs inside `cwd`.
   - The backend runs with the `PORT` environment variable set to its `port`, even if your shell sets `PORT`. A server that listens on `PORT` needs nothing more.
   - Leave out `backend` for an App that has only a frontend.
   - Give every process its own port.

   Use the scripts and ports your App really has. Check its `package.json`. The ones above are only an example.

2. Install each App's dependencies, in that App's folder.

   ```sh
   cd apps/web
   npm install
   cd ../..
   ```

## Run

1. From the agent folder, start all the Apps in the config.

   ```sh
   openstep dev
   ```

   To start one App only:

   ```sh
   openstep dev --app web
   ```

2. The CLI prints an address for each App. Open that address in your browser. Do not open the frontend's own port. The address the CLI prints is the one that connects the App to the platform.
3. Edit the files in `apps/web` in your editor. Your frontend dev server picks up the changes the way it normally does.
4. Press Ctrl-C to stop. The CLI stops the processes and releases the connection.

## Live site rules

For an App with a backend, `openstep dev` handles `/api` by the live site's rules, so most requests that would fail there fail on your computer too. The first time each kind of request fails, the CLI prints a warning that starts with `openstep:` and says what to change. [What works differently on the live site](/cli/bring-your-code/#what-works-differently-on-the-live-site) explains each rule.

- The page's calls with `fetch`, `XMLHttpRequest` and `sendBeacon` reach your server as usual.
- Any other load of a bare `/api` URL gets 404, as on the public live site: for example an `<img>` a component renders, a link, a form or `window.location`. Build such a URL with `releaseRuntimePath('/api/...')` from `src/lib/runtime`. Under `openstep dev` it returns the path under `/_releases/openstep-dev/_generations/1`, and the CLI sends it to your server as the bare path.
- A `/api` URL written in an HTML or CSS file gets 404 too. Here `openstep dev` is stricter than the live site, which rewrites such URLs: set the URL from script with `releaseRuntimePath()` instead.
- If your App's `src/lib/runtime.ts` predates this check, those loads still reach your server, with a warning. Run `openstep pull`: it puts the platform's current version of the platform files back into your folder, and so does every push.
- Any `/api` request that asks for `text/event-stream` gets 404, even a `fetch` the live site would answer once your server ends the response. A WebSocket to `/api` gets 404 too.
- Only the headers the live site passes go between the browser and your server, plus `Content-Length`, `Transfer-Encoding` and `Content-Encoding`, which carry the body as it was sent. The CLI warns when it drops `Cookie`, `Set-Cookie`, `Location` or `Content-Disposition`.
- A request body over 10 MiB gets 413.
- `curl` and other programs send no `Sec-Fetch-Dest` header, so the 404 for loads does not apply to them.

The rest of the App, such as its pages and files, is served as it is. An App without a backend has none of these rules: its `/api` goes to the frontend, as on the live site.

## Good to know

- It is real data. A local run uses the same development data as the App's preview on the work page. SQL you run changes that data. It is not a throwaway copy. See [Site data](/build/data/).
- It costs SSU. Platform abilities such as AI, email and chain calls are charged as usual, even when the App runs on your computer. See [Check your balance](/account/balance/).
- Your server sees you as the visitor. Each `/api` request carries the wallet you signed in to the CLI with, in the `x-steps-user-address` header. Connect the same wallet in the browser.
- Do not put secrets in source. The CLI gives each run its own credentials and the environment values for that App. To set a value, see [Apps, data and contracts](/cli/apps-data-contracts/) and [Environment values](/build/environment-values/).
- Every App you start needs an entry in `openstep.config.json`. If you start all Apps and one has no entry, the command stops and names it.
- If any process you configured exits, `openstep dev` stops every App it started and ends the command. A non-zero exit code ends it with the error `App runtime exited with code N`. Read the failing process's own output to see why.
- Paths in the config must stay inside the agent folder.
- `openstep.config.json` is local. `push` does not send it.

Next: [Push and publish](/cli/push-publish/).
