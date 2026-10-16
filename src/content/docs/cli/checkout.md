---
title: Check out an agent
description: Create an agent or pick one you already have, then copy all its Apps into a folder on your computer.
sidebar:
  order: 3
---

Checking out copies every active App of an agent into a new folder. You work in that folder from then on.

## Create an agent from the terminal

Skip this part if you already have the agent you want.

1. See the products you can start from. These are the ones listed in the Marketplace.

   ```sh
   openstep catalog
   ```

2. Create the agent. Use the product key from the list.

   ```sh
   openstep agent create "My Agent" --product <product-key>
   ```

   Leave out `--product` to start from Web builder. Add `--workspace <workspace-slug>` to create the agent in a team workspace.

Creating an agent does not send a message to the builder. The command gives you the agent's ID. The agent starts to work when you [chat with it](/cli/chat/).

## Check out the agent

1. List the agents you can open, and note the ID of the one you want. Add `--workspace <workspace-slug>` to list one workspace only.

   ```sh
   openstep agent list
   ```

2. Check it out into a folder. The folder must be new or empty.

   ```sh
   openstep agent checkout <agent-id> ./my-agent
   ```

   If the agent is still being prepared, the command waits for up to two minutes. If it is not ready by then, run the command again.

3. Go into the folder and list its Apps.

   ```sh
   cd my-agent
   openstep apps list
   ```

## What is in the folder

```
my-agent/
  apps/
    web/
    admin/
  AGENTS.md
  .openstep/
```

- `apps/<app-key>/` holds one App's source. There is one folder for each App, named by its App key. Your edits go here.
- `AGENTS.md` tells a coding agent on your computer to read `.openstep/instructions/README.md` for the OpenStep rules and skills. The CLI keeps its own block in this file up to date. Your own lines outside that block are kept.
- `.openstep/` is the CLI's private bookkeeping. It holds the agent it is bound to, copies of the source you last synchronized, and receipts for requests in flight.

## Good to know

- Run every later command from this folder, not from inside `apps/web`.
- Do not edit or delete anything in `.openstep/`. If you change it by hand, `diff`, `pull` and `push` can no longer tell what is yours.
- Checkout adds `.openstep/`, `openstep.config.json` and `/AGENTS.md` to the folder's `.gitignore`, so they stay out of git.
- Checkout never writes into a folder that already has files in it. Pick a new name.
- Your role decides what you can do next. Owners publish, owners and editors build and edit, and viewers read. See [What the CLI does](/cli/what-it-does/).

Next: [Chat from the terminal](/cli/chat/), or go straight to [Run apps locally](/cli/dev/).
