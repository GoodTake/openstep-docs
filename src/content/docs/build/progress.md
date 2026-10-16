---
title: Follow progress
description: What the chat and the preview card show while the builder works, and how to stop a turn.
sidebar:
  order: 6
---

A message you send starts a turn, and the builder works on it until it is done. You can watch it in two places: the chat on the left and the preview card on the right.

1. Read the steps in the chat. The builder shows each thing it does as a line, such as **Run a command**, **Read**, **Edit** or **Update the plan**, with a short note between them when it has something to say.
2. Read the status line under the builder's reply. It starts at **Preparing** while the builder gets ready. It may say **Waiting for a free build slot** if every slot is busy, then **Thinking**, **Planning** and **Building**, with a timer, for example **Building · 2:39**. If nothing new has arrived for a minute it adds **Still working — this step can take a few minutes**.
3. Watch the preview card on the right. It shows **Thinking**, **Planning**, **Writing code**, **Preview & test** and **Done**, ticking them off as they finish. When the site is ready, the site takes the card's place.
4. When the status line reads **Done**, followed by how long ago it finished, the turn is over. The builder's last message says what changed.

![A Build turn in progress: the builder's steps and the Building status line on the left, and the preview card on the right with Writing code under way.](/images/build/progress-1.webp)

## Stop a turn

You cannot send another message while the builder is working. To stop it, click the red stop button where the send arrow was. The status line then reads **Cancelled**. The work runs on the server, so if the status line says **Reconnecting…** for a long while, reload the page and it carries on.

## When a turn fails

The status line turns red and says in plain words what happened. When sending the same message again would help, it shows **Retry**. If your SSU runs out, it says so and offers **Top up balance**. See [Get SSU](/start/get-ssu/).

## Good to know

- A **Brainstorm** build, which starts once you approve a plan, shows its own progress bar above the chat box: **Building · 0 of 6 done**, with **Pause**, **Stop** and **View build**. See [Watch it build](/agent/watch-build/).
- Your changes show in Preview, not on the live site. See [Preview your site](/build/preview/).

Next: [Preview your site](/build/preview/).
