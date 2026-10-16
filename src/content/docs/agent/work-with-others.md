---
title: Work with others
description: Invite collaborators to an agent from a team workspace, and what an owner, an editor and a viewer can each do.
sidebar:
  order: 7
---

Every agent belongs to a workspace. Your personal workspace has no other members, so to work on an agent with other people you need a team workspace. People you add become collaborators, and each one has a role on the agent.

## Who can do what

| Role | What they can do |
| --- | --- |
| owner | Everything an editor can do, plus **Publish**, **Roll back**, **Put the last version back** and **Unpublish**; change who can open the agent; **Start a new session**; live environment values and domains; add collaborators and send invitations; transfer ownership, move, duplicate or delete the agent. |
| editor | **Build** and **Brainstorm**; **Approve plan** and **Request changes**; answer the agent's questions and provide values it asks for; **Pause**, **Stop** and **Continue** a build; rename the agent; development environment values. |
| viewer | Read only. They can open the agent and look at everything, and change nothing. |

An agent has one owner. Everyone else in the workspace can view it, and the owner chooses who can edit.

## Set up a team workspace

1. Click the workspace name at the top of the left rail. It says **Personal** to start with. A menu called **WORKSPACES** opens, listing your workspaces with a check mark on the current one.
2. Click **+ New workspace**. In the **Create workspace** dialog, type a **Name** and click **Create**.
3. Click **Members** in the left rail, under **WORKSPACE**, then **Invite member**. In the **Add workspace member** dialog, type the person's **Wallet address** and click **Add member**. Added wallets can view every agent in this workspace.
4. Put your agent in that workspace. Either start a new agent with that workspace selected in the switcher, or move an existing one: open the agent, click **Console**, then **Settings**, find **Move to another workspace**, open the menu that says **Choose a workspace**, pick the workspace, click **Move**, and confirm with **Move agent**.

To take someone out of the workspace, open the **⋯** menu on their row in **Members** and choose **Remove**. Only the workspace owner can add and remove members.

## Invite collaborators to an agent

1. Open the agent, click **Console**, then **Settings**. Under **Collaborators**, click **Manage collaborators**. The dialog **Agent collaborators** opens. It lists everyone under **PEOPLE** with their role.
2. To make someone an editor, use **Add a workspace member**: type their wallet address in the box that says "0x… wallet address", pick **Editor** or **Viewer** in the drop-down beside it, and click **Add**. They must already be a member of the workspace.
3. To invite someone who is not in the workspace yet, use **Invite link** instead. Pick **Editor** or **Viewer** in the drop-down beside **Create invite link**, click **Create invite link**, and copy the link with **Copy**. Anyone who opens the link and signs in joins this team workspace with the role you picked, and can see every agent in it. The link works once and says when it expires.
4. Click **Done**.

   ![The Agent collaborators dialog for an agent in a personal workspace: a note that a personal workspace has no other members, and the owner under People.](/images/agent/work-with-others-1.webp)

In a personal workspace the dialog shows the note in the picture instead of the invite options: "A personal workspace has no other members. Move this agent to a team workspace to invite collaborators."

To take editing away from someone, click **Make viewer** next to their name and confirm. They stay in the workspace and can still view the agent.

## Good to know

- Only the owner changes who manages an agent. Editors and viewers see "Only the owner adds or removes collaborators."
- Collaborators manage the agent. Learners, the people who take part in a course, join in another way and appear under **Learners** in the Console.
- Moving an agent to another workspace removes its collaborators' roles, and any invite links not yet used stop working. See [Manage your agents](/agent/manage-agents/).
- A workspace member who is not the owner can leave from **Settings** with **Leave workspace**.

Next: [Manage your agents](/agent/manage-agents/).
