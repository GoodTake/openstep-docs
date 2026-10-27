---
title: Travailler à plusieurs
description: "Invitez des collaborateurs sur un agent depuis un workspace d'équipe, et ce que peuvent faire un propriétaire, un éditeur et un lecteur."
sidebar:
  order: 7
---

Chaque agent appartient à un workspace. Votre workspace personnel n'a pas d'autres membres : pour travailler sur un agent avec d'autres personnes, il vous faut donc un workspace d'équipe. Les personnes que vous ajoutez deviennent des collaborateurs, et chacune a un rôle sur l'agent.

## Qui peut faire quoi

| Rôle | Ce qu'il peut faire |
| --- | --- |
| propriétaire | Tout ce qu'un éditeur peut faire, plus **Publish**, **Put the last version back** et **Unpublish** ; changer qui peut ouvrir l'agent ; **Start a new session** ; les valeurs d'environnement en ligne et les domaines ; ajouter des collaborateurs et envoyer des invitations ; transférer la propriété, déplacer, dupliquer ou supprimer l'agent. |
| éditeur | **Build** et **Brainstorm** ; **Approve plan** et **Request changes** ; répondre aux questions de l'agent et fournir les valeurs qu'il demande ; **Pause**, **Stop** et **Continue** sur une construction ; **Roll back** et **Put candidate live** ; renommer l'agent ; les valeurs d'environnement de développement. |
| lecteur | Lecture seule. Il peut ouvrir l'agent et tout regarder, sans rien changer. |

Un agent a un seul propriétaire. Toutes les autres personnes du workspace peuvent le voir, et le propriétaire choisit qui peut le modifier.

## Mettre en place un workspace d'équipe

1. Cliquez sur le nom du workspace en haut du rail gauche. Il indique d'abord **Personal**. Un menu appelé **WORKSPACES** s'ouvre, qui liste vos workspaces avec une coche sur le workspace actuel.
2. Cliquez sur **+ New workspace**. Dans la boîte de dialogue **Create workspace**, saisissez un **Name** et cliquez sur **Create**.
3. Cliquez sur **Members** dans le rail gauche, sous **WORKSPACE**, puis sur **Invite member**. Dans la boîte de dialogue **Add workspace member**, saisissez la **Wallet address** de la personne et cliquez sur **Add member**. Les wallets ajoutés peuvent voir tous les agents de ce workspace.
4. Placez votre agent dans ce workspace. Soit vous démarrez un nouvel agent avec ce workspace sélectionné dans le sélecteur, soit vous déplacez un agent existant : ouvrez l'agent, cliquez sur **Console**, puis sur **Settings**, trouvez **Move to another workspace**, ouvrez le menu qui indique **Choose a workspace**, choisissez le workspace, cliquez sur **Move**, puis confirmez avec **Move agent**.

Pour retirer quelqu'un du workspace, ouvrez le menu **⋯** sur sa ligne dans **Members** et choisissez **Remove**. Seul le propriétaire du workspace peut ajouter et retirer des membres.

## Inviter des collaborateurs sur un agent

1. Ouvrez l'agent, cliquez sur **Console**, puis sur **Settings**. Sous **Collaborators**, cliquez sur **Manage collaborators**. La boîte de dialogue **Agent collaborators** s'ouvre. Elle liste tout le monde sous **PEOPLE** avec son rôle.
2. Pour faire de quelqu'un un éditeur, utilisez **Add a workspace member** : saisissez son adresse de wallet dans la zone qui indique « 0x… wallet address », choisissez **Editor** ou **Viewer** dans la liste déroulante à côté, et cliquez sur **Add**. La personne doit déjà être membre du workspace.
3. Pour inviter quelqu'un qui n'est pas encore dans le workspace, utilisez plutôt **Invite link**. Choisissez **Editor** ou **Viewer** dans la liste déroulante à côté de **Create invite link**, cliquez sur **Create invite link**, et copiez le lien avec **Copy**. Toute personne qui ouvre le lien et se connecte rejoint ce workspace d'équipe avec le rôle que vous avez choisi, et peut voir tous les agents qu'il contient. Le lien ne fonctionne qu'une fois et indique quand il expire.
4. Cliquez sur **Done**.

   ![La boîte de dialogue Agent collaborators pour un agent d'un workspace personnel : une note disant qu'un workspace personnel n'a pas d'autres membres, et le propriétaire sous People.](/images/agent/work-with-others-1.webp)

Dans un workspace personnel, la boîte de dialogue montre la note de l'image à la place des options d'invitation : « A personal workspace has no other members. Move this agent to a team workspace to invite collaborators. »

Pour retirer le droit de modifier à quelqu'un, cliquez sur **Make viewer** à côté de son nom et confirmez. La personne reste dans le workspace et peut toujours voir l'agent.

## À savoir

- Seul le propriétaire change qui gère un agent. Les éditeurs et les lecteurs voient « Only the owner adds or removes collaborators. »
- Les collaborateurs gèrent l'agent. Les apprenants, c'est-à-dire les personnes qui suivent un cours, rejoignent d'une autre façon et apparaissent sous **Learners** dans la Console.
- Déplacer un agent vers un autre workspace retire les rôles de ses collaborateurs, et les liens d'invitation non encore utilisés cessent de fonctionner. Voir [Gérer vos agents](/fr/agent/manage-agents/).
- Un membre du workspace qui n'est pas le propriétaire peut le quitter depuis **Settings** avec **Leave workspace**.

Suite : [Gérer vos agents](/fr/agent/manage-agents/).
