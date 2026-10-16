---
title: 與他人協作
description: 在團隊工作區邀請協作者加入 Agent，以及擁有者、編輯者和檢視者各自能做什麼。
sidebar:
  order: 7
---

每個 Agent 都屬於某個工作區。你的個人工作區沒有其他成員，所以要和別人一起處理 Agent，你需要一個團隊工作區。你加入的人會成為協作者，每個人在這個 Agent 上都有一個角色。

## 誰能做什麼

| 角色 | 能做什麼 |
| --- | --- |
| 擁有者 | 編輯者能做的一切，再加上 **Publish**、**Roll back**、**Put the last version back** 和 **Unpublish**；變更誰可以開啟這個 Agent；**Start a new session**；上線的環境值與網域；加入協作者並發出邀請；轉移所有權、移動、複製或刪除這個 Agent。 |
| 編輯者 | **Build** 和 **Brainstorm**；**Approve plan** 和 **Request changes**；回答 Agent 的問題，並提供它索取的值；**Pause**、**Stop** 和 **Continue** 一次建造；重新命名 Agent；開發環境值。 |
| 檢視者 | 唯讀。他們可以開啟 Agent 並查看所有內容，但不能變更任何東西。 |

一個 Agent 只有一位擁有者。工作區裡的其他人都可以查看它，而由擁有者決定誰可以編輯。

## 設定團隊工作區

1. 點選左側欄頂部的工作區名稱。一開始它顯示 **Personal**。會開啟一個叫做 **WORKSPACES** 的選單，列出你的工作區，目前所在的那一個有勾號。
2. 點選 **+ New workspace**。在 **Create workspace** 對話框中輸入 **Name**，然後點選 **Create**。
3. 點選左側欄 **WORKSPACE** 底下的 **Members**，再點選 **Invite member**。在 **Add workspace member** 對話框中輸入對方的 **Wallet address**，然後點選 **Add member**。加入的錢包可以查看這個工作區中的每個 Agent。
4. 把你的 Agent 放進該工作區。可以在切換器中選好該工作區，再開始一個新的 Agent；也可以移動既有的 Agent：開啟 Agent，點選 **Console**，再點選 **Settings**，找到 **Move to another workspace**，開啟寫著 **Choose a workspace** 的選單，挑選該工作區，點選 **Move**，再用 **Move agent** 確認。

要把某人移出工作區，請開啟 **Members** 中該人那一列的 **⋯** 選單，選擇 **Remove**。只有工作區擁有者能加入和移除成員。

## 邀請協作者加入 Agent

1. 開啟 Agent，點選 **Console**，再點選 **Settings**。在 **Collaborators** 底下，點選 **Manage collaborators**。**Agent collaborators** 對話框會開啟。它在 **PEOPLE** 底下列出所有人與他們的角色。
2. 要讓某人成為編輯者，請使用 **Add a workspace member**：在寫著「0x… wallet address」的框裡輸入他的錢包位址，在旁邊的下拉選單選 **Editor** 或 **Viewer**，然後點選 **Add**。他們必須已經是工作區的成員。
3. 要邀請還不在工作區的人，請改用 **Invite link**。在 **Create invite link** 旁邊的下拉選單選 **Editor** 或 **Viewer**，點選 **Create invite link**，再用 **Copy** 複製連結。任何開啟連結並登入的人，都會以你選的角色加入這個團隊工作區，並能看到其中的每個 Agent。連結只能使用一次，並會註明何時到期。
4. 點選 **Done**。

   ![個人工作區中 Agent 的 Agent collaborators 對話框：說明個人工作區沒有其他成員的備註，以及 People 底下的擁有者。](/images/agent/work-with-others-1.webp)

在個人工作區，對話框會顯示圖中的備註，而不是邀請選項：「A personal workspace has no other members. Move this agent to a team workspace to invite collaborators.」

要收回某人的編輯權，請點選他名字旁邊的 **Make viewer** 並確認。他們仍留在工作區，也仍可查看這個 Agent。

## 注意事項

- 只有擁有者能變更誰來管理 Agent。編輯者和檢視者會看到「Only the owner adds or removes collaborators.」
- 協作者管理 Agent。學習者，也就是參加課程的人，以另一種方式加入，並出現在 Console 的 **Learners** 底下。
- 把 Agent 移到另一個工作區，會移除其協作者的角色，尚未使用的邀請連結也會失效。見 [管理你的 Agent](/zh-tw/agent/manage-agents/)。
- 不是擁有者的工作區成員，可以從 **Settings** 用 **Leave workspace** 離開。

下一步：[管理你的 Agent](/zh-tw/agent/manage-agents/)。
