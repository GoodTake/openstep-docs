---
title: What the CLI does
description: Work on an agent from your own computer and editor, then push your changes and publish.
sidebar:
  order: 1
---

The OpenStep CLI lets you work on an agent from your own computer. You copy the agent's Apps into one folder, edit them in your own editor, run them locally, and send the changes back.

The work page can do the same jobs in the browser. Use the CLI when you want your own editor, a coding agent on your machine, or an App running locally.

## What you can do

- Check out an agent. Copy every App of an agent into a folder. See [Check out an agent](/cli/checkout/).
- Chat from the terminal. Talk to the builder, answer its questions, approve its plan, and pause or stop it. See [Chat from the terminal](/cli/chat/).
- Run Apps locally. Start an App's frontend and backend on your machine. See [Run apps locally](/cli/dev/).
- Push and publish. Save your changes to the agent, then put every App live together. See [Push and publish](/cli/push-publish/).
- Manage Apps, data and contracts. Add an App, set environment values, run SQL on development data, and deploy a smart contract an App uses. See [Apps, data and contracts](/cli/apps-data-contracts/).

## One session, start to finish

These are the commands you will use, in order. Each page in this section explains one step.

```sh
openstep login https://builder.openstep.academy
openstep agent checkout <agent-id> ./my-agent
cd my-agent
openstep agent chat "Describe what you want" --mode build
openstep pull
openstep dev
openstep diff
openstep push
openstep publish --note "First release"
```

## Who can do what

The CLI follows the same roles as the work page.

- **Owner**: everything an editor can do, plus Publish, Rollback, Unpublish and Republish, production environment values, and deploying contracts.
- **Editor**: chat with the builder, edit and push source, add or archive Apps, and set development environment values.
- **Viewer**: read only.

See [Work with others](/agent/work-with-others/) for how people get these roles.

## Good to know

- Run every command from the agent folder that `agent checkout` created. Do not run commands from inside an App folder.
- `openstep --help` lists every command. `openstep <command> --help` shows one command and its options, for example `openstep agent chat --help`.
- Add `--json` to a command for machine-readable output.
- Running an App locally uses your real development data, and platform abilities such as AI and email cost SSU as usual. See [Run apps locally](/cli/dev/) and [Check your balance](/account/balance/).

Next: [Install and sign in](/cli/install/).
