---
title: Approve the plan
description: Read the plan the agent drafts, then approve it or ask for changes. Nothing is built until you approve.
sidebar:
  order: 3
---

After your answers the agent drafts a build plan. Nothing is built until you approve it, so this is the moment to check that the plan is what you want.

1. Wait for the plan. While it is drafted, the preview card on the right says **Planning** and "Drafting the build plan". In this example it took about eight minutes. When it is ready, a bar appears above the composer: **Plan ready · 6 tasks**, with a line such as "1 finding · 0 open questions" and a **View build** button. Below it is a box with **Show the plan**, **Approve plan** and **Request changes**.

   ![The chat with the bar Plan ready · 6 tasks and, below it, Show the plan, Approve plan and Request changes. The composer says the plan is waiting for your decision.](/images/agent/approve-plan-1.webp)

2. Click **Show the plan** to read it. Click **Hide the plan** to fold it away again.

   ![The expanded plan: Build plan marked Awaiting your approval, the counters 1 App, 6 Tasks, 0 Missions and 0 Contracts, and the Review & setup section.](/images/agent/approve-plan-2.webp)

3. Decide.
   - Click **Approve plan** to start the build. The bar becomes **Building · 0 of 6 done**, with the name of the current task and a timer, and the composer says "Building — Pause or Stop to change direction." with **Pause** and **Stop**. Go on to [Watch it build](/agent/watch-build/).
   - Click **Request changes** to send the plan back. Write what you want different in the message box and send it. You can also type in the message box without clicking anything first. The agent plans again and shows you the new plan. Nothing is built in the meantime.

**Approve plan** and **Request changes** are repeated at the bottom of the open plan, so you do not need to scroll back up.

## What the plan shows

- **Build plan**, marked **Awaiting your approval**, with counters for **App**, **Tasks**, **Missions** and **Contracts**. This agent builds **1 App** in **6 Tasks**. Missions and Contracts are for agents that run courses or use blockchain contracts, so they are 0 here.
- **REVIEW & SETUP**: an automatic review checks every plan before you see it. When it has comments, they are listed as findings, and the section says "1 needs you". Read them before you approve. In this example the review said **Approved with findings** and none of the findings stopped the plan.
- **WHAT THIS BUILDS**: "Tasks run one at a time, in this order." The tasks are grouped by App, and each one has a one-sentence outcome and the checks it must pass. One task in this plan reads: "Let a signed-in person start a day, save individual sets, finish a workout and inspect their own history." The last group, **Cross-app & integration**, holds a final check that the Apps work together.

## When the agent needs a value from you

Some plans need something only you can give, such as an API key or a payout wallet. The agent never makes these up. Before the build can go on, a dialog asks for the value:

1. The dialog is named after the value and says what it is for. The value is saved to the App's environment values, for development and live.
2. Type the value. A secret is hidden as you type.
3. Click **Provide and continue**. The build goes on by itself.

If you click **Not now**, the build waits. The chat keeps a note, "The builder needs … to continue.", with a **Provide** button that opens the dialog again. Values still waiting for you are also listed under **Requested by the build** in Console → **Environment**.

Sometimes it asks you to choose between a few options instead, and you can write your own answer in the box that says "Or write your own answer".

The Health & fitness agent does not need any values, so it never asks. Agents that call outside services do.

## Good to know

- Only the owner and editors of an agent can approve a plan, request changes or provide a value. Viewers can read the plan. See [Work with others](/agent/work-with-others/).
- While the plan is still being drafted, the composer offers **Pause** and **Stop** instead of a message box. See [Watch it build](/agent/watch-build/).
- The agent's work, planning included, spends SSU.

Next: [Watch it build](/agent/watch-build/).
