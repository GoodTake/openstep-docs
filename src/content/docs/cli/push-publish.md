---
title: Push and publish
description: Save your changes to the agent with push, then put every App live together with publish.
sidebar:
  order: 6
---

Pushing and publishing are two steps. Push saves your source to the agent. Publish puts the saved source live. Pushing never publishes.

Both act on the whole agent, so every App moves together.

## Save your changes

1. See what changed. This compares your folder with the agent's accepted source, for each App. It also shows whether the agent changed since you last synchronized, for example because the builder finished a turn.

   ```sh
   openstep diff
   ```

2. Bring in anything new from the agent. Pull merges the agent's accepted changes into your folder and does not overwrite your own edits.

   ```sh
   openstep pull
   ```

3. If pull reports a conflict, open the file and keep the text you want. For a binary file, keep the version you want. Then tell the CLI the file is settled. Do this for every conflicting file.

   ```sh
   openstep resolve apps/web/src/App.tsx
   ```

4. Push.

   ```sh
   openstep push
   ```

   The agent now holds your changes as its source. The live version does not change.

## Publish

Publishing is for owners.

1. Run publish. The note is optional. It must be 1 to 500 characters.

   ```sh
   openstep publish --note "First release"
   ```

   Publish needs every App synchronized, with no conflicts and no edits you have not pushed. It never pushes for you. If it says your local source has unpublished edits, review the diff and push first.

2. Check how it went. Use the operation ID from the publish command. A publish is done when its status is `succeeded`.

   ```sh
   openstep status <operation-id>
   ```

   `openstep status` with no ID reads the last publish, stage, rollback, unpublish or republish you started. If there is none, it reads the agent.

Publishing keeps your data. See [Publish and share](/agent/publish-and-share/) for who can open the live Apps and what a visitor sees.

## Stage a candidate for review

A stage builds a candidate from the agent's accepted source, as Publish would, and stops before it goes live. The live version does not change. Owners and editors can stage.

1. Stage. Like publish, it needs every App synchronized, with no conflicts and no edits you have not pushed. The note is optional.

   ```sh
   openstep stage --note "Candidate for review"
   ```

2. Check how it went with the operation ID. Once the status is `succeeded`, the output lists `reviewLinks`, one link for each App.

   ```sh
   openstep status <operation-id>
   ```

3. The agent's owner and the members of its workspace can open the links and try the candidate. It runs on the live site's data: what they do in it changes that data, and its new tables and columns can reach the live database when you stage. An owner or editor puts it live in the **Console**, in **Production**, with **Put candidate live**. The CLI has no command for that.
4. Run `openstep pull`. A stage, like a publish, can add platform files such as `.steps/world/*.json` to the agent's accepted source.

Pushing new code makes the candidate stale, so it can no longer go live. A publish, rollback, unpublish, republish or newer stage discards it.

## Roll back, unpublish and republish

These also act on the whole agent. They have no `--app` option. All of them take an optional `--note`.

```sh
openstep rollback <generation-id> --note "Restore prior release"
openstep unpublish --note "Take the agent offline"
openstep republish --note "Bring back the last live version"
```

- rollback restores an earlier release the agent still keeps. A successful publish reports the ID of the release it made.
- unpublish takes every App offline.
- republish brings back the version you took offline with unpublish.

For the same actions in the browser, see [Go live](/build/go-live/).

## If a result is unknown

If a push or publish is cut off, for example by a network drop, you may not know whether it went through. Do not start a new one.

- Run the same command again from the same folder. The CLI remembers the request it sent and asks the platform what happened. It does not send the change twice.
- For a publish, `openstep status <operation-id>` reads that same operation.
- If a push says your changes are accepted but still synchronizing, run `openstep pull` before you publish.
- While a live command is still pending, running any live command only reads the pending one. It does not start another.
- While a push is still pending, publish refuses to start. Finish the push first.
- Keep `.openstep/` as it is. Do not delete files there to get unstuck.

## Good to know

- Pushing, staging and rolling back are for owners and editors. Publishing, unpublishing and republishing are for owners.
- While the builder is running a planned build, the agent is read-only. Wait for it to finish, then `pull`, then push.
- `diff`, `push` and `pull` leave out files that the `.gitignore` files in an App's folder ignore, such as `dist/`, unless the agent's accepted source already has them, as Git does with files it already tracks. They don't count as edits you have not pushed when you publish, either. To remove such a file from the accepted source, delete it in your folder and push.
- Files whose names start with `.env`, `.npmrc`, key files and the like stop `diff`, `pull` and `push`, even when `.gitignore` lists the files themselves. The message names the path and why, starting with `Local source path refused:`. Files inside a folder that `.gitignore` ignores, and that was never pushed, are not looked at. See [Move your code into the App](/cli/bring-your-code/#3-move-your-code-into-the-app).

Next: [Apps, data and contracts](/cli/apps-data-contracts/).
