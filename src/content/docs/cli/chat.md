---
title: Chat from the terminal
description: Talk to the builder, answer its questions, approve plans, and pause or stop a build without leaving the terminal.
sidebar:
  order: 4
---

`openstep agent chat` sends one message to the agent's builder, the same builder you talk to on the work page. The CLI shows the turn as it happens. It stops when the turn finishes, or when the builder needs something from you: a question, a plan to approve, or a value to provide.

You need to be an owner or an editor of the agent. Builds cost SSU, the same as on the work page.

## Send a message

1. Choose a mode. Use `brainstorm` to talk through what you want first. Use `build` to let the builder change the agent right away. See [Build and Brainstorm](/build/modes/).

   ```sh
   openstep agent chat "Add a page where guests can book a table" --mode brainstorm
   ```

   Without `--mode`, the message runs in `build`.

2. To tell the builder which App and file you are looking at, add `--app` and `--path`. This is a hint, not a limit. The builder may change other Apps too.

   ```sh
   openstep agent chat "Make this header sticky" --mode build --app web --path src/App.tsx
   ```

3. The CLI writes the events of the turn to the terminal and ends with the turn ID and its status. Keep the turn ID. You need it to answer questions and to resume.

## Answer questions

In Brainstorm, the builder asks a round of questions. The question event in the output carries a request ID.

```sh
openstep agent question --turn <turn-id> --request <request-id> --answers '[["Option A"],["Yes"]]'
```

`--answers` is a JSON list with one inner list for each question. To decline the questions, use `--reject true` instead of `--answers`.

## Approve the plan

When the builder shows a plan that waits for you, the output includes the plan and its hash. Approve it, or ask for changes.

```sh
openstep agent plan approve --hash <plan-hash>
openstep agent plan request-changes --hash <plan-hash> --comment "Leave out the admin page"
```

`request-changes` needs a `--comment`. On `approve` the comment is optional. This is the same step as [Approve the plan](/agent/approve-plan/) on the work page.

## Provide values it asks for

Some plans declare values that only you can give, such as an API key. To see what is asked and what you have already provided, run:

```sh
openstep agent plan values --app <app-key>
```

To provide one, run the next command and type the value when it asks. It does not echo, and it is not saved in the chat record. You can also pipe the value in on standard input.

```sh
openstep agent plan value <name> --app <app-key>
```

The builder can also stop and ask for an input in the middle of a build. Answer it with the input request ID from the output:

```sh
openstep agent input <input-request-id> --choice <option>
openstep agent input <input-request-id> --text "your answer"
```

Leave out `--choice` and `--text` to give a value by hidden entry, the same way as above.

If a build stops on one task and asks you a question, answer it with the task key from the output:

```sh
openstep agent task-answer <task-key> --text "your answer"
```

## Pause, continue or stop a build

```sh
openstep agent pause
openstep agent continue
openstep agent stop
```

`openstep agent stop --turn <turn-id>` stops one turn. If the CLI says the result of a control is unknown, run `openstep status` to read the agent's state before you try again.

## Pick up a turn again

If your connection drops or you close the terminal, the turn keeps running on the platform. The CLI saves the turn ID in `.openstep/chat.json` before it sends your message. To keep watching, resume the turn.

```sh
openstep agent chat --turn <turn-id>
openstep agent chat
```

The second form uses the turn the CLI saved. Do not send the same message again to recover. That would start a second turn. To read earlier chat, run:

```sh
openstep agent chat --history true
```

## Good to know

- When the builder finishes, run `openstep pull` to bring its changes into your folder. Push your own edits only after that. See [Push and publish](/cli/push-publish/).
- Add `--json` to get one machine-readable result instead of the stream.

Next: [Run apps locally](/cli/dev/).
