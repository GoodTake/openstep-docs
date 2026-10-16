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
         "backend": { "command": ["npm", "run", "dev:server"], "port": 8787 }
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

## Good to know

- **It is real data.** A local run uses the same development data as the App's preview on the work page. SQL you run changes that data. It is not a throwaway copy. See [Site data](/build/data/).
- **It costs SSU.** Platform abilities such as AI, email and chain calls are charged as usual, even when the App runs on your computer. See [Check your balance](/account/balance/).
- **Do not put secrets in source.** The CLI gives each run its own credentials and the environment values for that App. To set a value, see [Apps, data and contracts](/cli/apps-data-contracts/) and [Environment values](/build/environment-values/).
- Every App you start needs an entry in `openstep.config.json`. If you start all Apps and one has no entry, the command stops and names it.
- If any process you configured exits, `openstep dev` stops every App it started and ends the command. A non-zero exit code ends it with the error `App runtime exited with code N`. Read the failing process's own output to see why.
- Paths in the config must stay inside the agent folder.
- `openstep.config.json` is local. `push` does not send it.

Next: [Push and publish](/cli/push-publish/).
