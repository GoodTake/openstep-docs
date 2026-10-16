---
title: Publish and share
description: Publish your agent to get a live link, choose who can open it, and start a new session when you want a clean slate.
sidebar:
  order: 6
---

Publishing puts every App of your agent live together, at an address you can send to other people. Only the owner of an agent can publish it.

## Publish for the first time

1. Click **Publish** in the header. The button turns bright when the build has finished. If it is greyed out, the line next to it says why, for example "Publishing opens once the build stops." because the agent is still building.
2. Read the dialog. It is called **Publish your agent** and says "Every app of this agent goes live together." Under **What happens next** it shows **Check** › **Build** › **Go live**, and "You can keep working while it runs." Below that, "Publish 1 app · Data and learner progress stay as they are." lists each App with its state, which is **Not live yet** the first time. Above the buttons, **Show the review** folds out the final review of the build.

   ![The Publish your agent dialog for Three Day Strength: What happens next with Check, Build and Go live, the row Three Day Strength marked Not live yet, Show the review, and the Cancel and Publish buttons.](/images/agent/publish-and-share-1.webp)

3. Click **Publish**. The dialog closes and a card appears at the bottom right with **Publishing…** and three steps: **Check your agent**, **Build and test every app** and **Switch every app live together**. The **Publish** button in the header is greyed out while it runs. You can carry on in the chat. Publishing this one App took about a minute and a half.
4. When the card changes to **Your agent is live**, it shows each App's name and its address, with a button to open it and a button to copy its link. The address looks like `https://app-….openstep.academy`.

## Share the link

Send the address from the card to anyone you want to try the app. You can find it again in the Console, in **Production**. It shows **Live since** with the date and time, with **Unpublish** beside it, then each App's live address and **Copy invitation**, which copies a short message with the App's link for you to paste. Under **Versions**, the version that is live is marked **Live**.

![Console, Production, after Publish: Live since 16 Oct 2026, 8:13 pm with Unpublish, the live address of Three Day Strength, Copy invitation, and Versions with the live version marked Live.](/images/agent/publish-and-share-2.webp)

Anyone who opens the link sees the App. To keep logs of workouts, weight and measurements, each visitor signs in with their own wallet, and only they see their own logs.

## Choose who can open it

Open **Console**, then **Settings**. **Access** is below **Collaborators**. Only the owner can change it. Changes apply at once and never touch data.

- **Anyone with the link** lets anyone with the address open the app. It is the one selected for **Health & fitness**.
- **Learners only** lets only the learners who joined with the join link, and the agent's collaborators, open it. Custom domains are not served in this mode. With it chosen, **Copy invitation** also includes the join link that learners use first.

![Console, Settings: the Collaborators card with Manage collaborators, and Access with Anyone with the link selected and Learners only below it.](/images/agent/publish-and-share-3.webp)

## Publish changes later

When you change the app and publish again, the dialog is called **Publish your changes**. In **Production**, each App says what changed: **No changes**, **Code changed** or **Live values changed**. Publishing keeps your data and learner progress, and never starts a new session. If an update would remove data, for example a table or field the new version no longer has, the Publish dialog says "This version may remove data from …" before you click **Publish**, and data removed that way cannot be brought back. To go back to an earlier version, take the app offline, or put it back, see [Go live](/build/go-live/). To add your own address, see [Domains](/build/domains/).

## Start a new session

**Start a new session** is a clean slate, for example for a new group of people. Only the owner can do it. Open **Console**, then **Sessions**, and click **Start a new session**. The dialog asks "Start a new session?" and explains that it clears the data in every App and every learner's progress. Members, roles and names stay. Click **Clear and start again** to go ahead, or **Cancel**.

Publishing never does this. If the button is greyed out, the page says "There is no session to clear yet." If the agent is still building, stop the build or wait for it to finish first.

## Good to know

- Running an app live is charged to your SSU balance, like building. Each charge appears under **Activity** on the [Balance](/account/balance/) page.
- Other people can only change the agent if you add them. See [Work with others](/agent/work-with-others/).

Next: [Work with others](/agent/work-with-others/).
