---
title: Go live
description: Publish puts every App online together. Roll back to an earlier version, take the site offline, or put it back.
sidebar:
  order: 12
---

**Publish** turns what you see in Preview into a live site with its own address. It puts every App of the agent live together, and only the owner can do it. Until you publish, your site exists only in Preview.

1. Wait until the builder has finished. **Publish** in the header is greyed out while it works.
2. Click **Publish** in the header. The dialog **Publish your agent** opens and says **Every app of this agent goes live together.** It shows what happens next, **Check**, **Build** and **Go live**, and a line such as **Publish 1 app · Data and learner progress stay as they are.** Each App is listed with its state: **Not live yet** for a first publish, and for a later one **Code changed** or **No changes**.
3. Click **Publish** in the dialog. A card with the steps **Check your agent**, **Build and test every app** and **Switch every app live together** follows the progress. You can keep working while it runs. One App took about two minutes.
4. When it finishes, a card says **Your agent is live** with the App's address, and buttons to open it or copy it.

![The Publish your agent dialog for The Cozy Coffee Table, with its three steps and the App listed as Not live yet.](/images/build/go-live-2.webp)

Then open **Console** and **Production**. It shows **Live since** with the date, the address of each App, **Copy invitation**, which copies the address ready to send, and **Versions**, a list of every version you have published. The current one is marked **Live**.

![Console → Production after the first Publish: Live since the date, the address of The Cozy Coffee Table, and one version marked Live.](/images/build/go-live-1.webp)

## What Publish does and does not do

- Every App goes live together. If any App fails, the whole Publish fails, nothing changes, and the live site stays as it was. The status says what went wrong and ends with **The live version did not change.**
- If the check finds a problem in an App, the builder can fix it and publish again by itself. If it needs something from you, such as a value, the status says **Publishing waits for you.**
- Publish never clears your data. Bookings and other live records stay. The one exception is an update that deliberately removes a table or a field the live site already has. The dialog tells you which App before you publish, and what it removes stays removed.
- After you publish, Preview carries on as your draft. Later changes do not reach the live site until you publish again.
- Who may open the site, **Anyone with the link** or **Learners only**, is a setting of the agent. See [Publish and share](/agent/publish-and-share/).

## Roll back to an earlier version

1. Open **Console** and **Production**, and find the version in **Versions**.
2. Click **Roll back** next to it. The dialog **Roll back** asks whether to go back to the version published on that date. Data and learner progress stay as they are.
3. Click **Roll back to this version**. Every App switches together.

Rollback puts the earlier version's code back. It does not undo changes to your data, and it does not change your draft in Preview. It is refused when a newer version removed data that the older version reads. The platform keeps the five most recent versions that were live. An older one shows **No longer kept**. Rollback also waits while a build is running, so pause or stop the build first.

## Take the site offline

1. Open **Console** and **Production**, and click **Unpublish** next to **Live since**.
2. In the dialog **Unpublish**, click **Take it offline**.

Every App stops serving. The last live version, its data, its domains and its settings are all kept.

## Put it back online

While the site is offline, **Production** says **This agent is offline. Its data is kept.** Click **Put the last version back**. The platform calls this Republish. It brings back the last live version without building it again. If you have changed the site since, click **Publish** instead to put the new version live.

## Good to know

- Only the owner can **Publish**, **Roll back**, **Unpublish** and put a version back. Editors and viewers can see **Production**.
- To start over with empty data, use **Start a new session** in **Console** → **Sessions**. Publish never does that. See [Publish and share](/agent/publish-and-share/).
- To give the site your own address, see [Domains](/build/domains/).

Next: [Domains](/build/domains/).
