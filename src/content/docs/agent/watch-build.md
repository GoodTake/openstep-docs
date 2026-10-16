---
title: Watch it build
description: Follow the build task by task from the chat and the Console, and pause, stop or continue it.
sidebar:
  order: 4
---

Once you approve the plan, the agent builds it one task at a time. You can leave it alone, or watch each task as it runs.

1. Look at the bar above the composer. It reads **Building · 0 of 6 done**, with the name of the task under way, and it counts up as tasks finish. On the right, the preview card steps through **Thinking**, **Planning**, **Writing code**, **Preview & test** and **Done**.
2. Click **View build**. The **Console** opens on the right, on its **Build** section, in place of the App view. It shows **Building** with **Pause** and **Stop**, how many tasks are done and how long the build has run, and the product version it builds with.
3. Open the **Tasks** tab. There is one row per task, in the order they run: its number, its name, the App it belongs to, its round and how long it has run. A task that is running reads "Round 1 · running". Tasks run one at a time, so the ones below it wait their turn.
4. Click **✕** at the top right of the Console to close it and see the App view again. You can come back any time with **View build**, or with **Console** in the header and then **Build** in the list.

   ![Console on its Build section: Building, with Pause and Stop, 0 of 6 done, and the Tasks tab listing six tasks with the first one running.](/images/agent/watch-build-1.webp)

The six tasks in this run, in order, were to set up the fitness foundation, build the public training pages, implement the workout and history features, generate the exercise illustrations, implement body progress, and a last check across all Apps.

The **Plan** and **Apps** tabs next to **Tasks** show the plan you approved and the Apps it builds. The other Console sections, such as **Code** and **Files**, are in the list on the left, but you do not need them to follow the build.

## Pause, stop and continue

The controls appear in the Console and next to the composer.

- **Pause** puts the build on hold. The button turns into **Continue**.
- **Continue** carries on the same build.
- **Stop** ends it. It asks first: "Stop this build? Finished tasks are kept. Your next Brainstorm starts a new plan." Click **Stop the build** to confirm, or **Cancel**. After a stop, your next **Brainstorm** message starts a new build with a new plan. If you only want a break, use **Pause**.

While a build is running, the composer shows **Pause** and **Stop** in place of the message box: "Building — Pause or Stop to change direction." To say something new, pause or stop first, then send your message. Sending a message while the build is paused ends that build, as **Stop** does.

## When the build stops by itself

Now and then a task cannot go on without you. The build stops and tells you what it is waiting for:

- A question: answer it in the chat and the build goes on by itself.
- A value only you can give: a dialog asks for it. See [Approve the plan](/agent/approve-plan/).

A build can also pause on a problem on the platform's side. The bar then reads **Platform issue**, and **Build** in the Console says: "The build is paused on a platform problem. It is listed for the platform team and continues once they fix it. Nothing for you to do. To change direction, stop the build." You can wait, and the build carries on by itself once the problem is fixed.

If the chat shows **Reconnecting…** for a long time, reload the page. The build keeps going on the server.

## When the build finishes

When the last task is done and the final review has run, the build is ready to publish:

1. The bar above the composer changes to **Ready to publish**, with the line "0 findings · 0 parked" and **View build**. Both counts were 0 in this run.
2. A green box appears below it: "The build finished. Publish from the top bar puts every app live together." Click **Show the review** in it to read the final review.
3. The **Publish** button in the header turns bright.
4. In the Console, **Build** now says **Ready to publish** and "Publish from the top bar puts every app live together. Data and learner progress stay as they are." Below it, **MECHANICAL CHECKS** lists each check, all marked **Passed**. **REVIEW FINDINGS** shows the final review ("The reviewer reported no findings."), and **PARKED TASK RULINGS** says None.

Any findings from the final review are listed under **REVIEW FINDINGS**. You can try the app in **Preview** now, before you publish.

## Good to know

- A build takes a while. This one took about 75 minutes from approval to **Ready to publish**, including one pause on a platform problem. The agent checks each task before it moves on, and repairs it if a check fails, so some tasks take more than one round.
- Only the owner and editors can **Pause**, **Stop** or **Continue** a build. Viewers can watch.
- You cannot publish while a build is running or paused. **Publish** becomes available once the build has stopped or finished. See [Publish and share](/agent/publish-and-share/).

Next: [Use your app](/agent/use-your-app/).
