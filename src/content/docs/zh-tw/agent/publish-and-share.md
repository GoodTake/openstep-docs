---
title: 發布與分享
description: 發布你的 Agent 取得上線連結，選擇誰可以開啟它，並在想從頭開始時開啟新的 session。
sidebar:
  order: 6
---

發布會讓你 Agent 的每個 App 一起上線，網址可以寄給別人。只有 Agent 的擁有者能發布它。

## 第一次發布

1. 點選標題列的 **Publish**。建造完成時，按鈕會變亮。如果它呈現灰色，旁邊那一行會說明原因，例如 Agent 還在建造時會顯示「Publishing opens once the build stops.」。
2. 閱讀對話框。它叫做 **Publish your agent**，內容是「Every app of this agent goes live together.」在 **What happens next** 底下，它顯示 **Check** › **Build** › **Go live**，以及「You can keep working while it runs.」再往下，「Publish 1 app · Data and learner progress stay as they are.」列出每個 App 與它的狀態，第一次是 **Not live yet**。按鈕上方的 **Show the review** 會展開這次建造的最終審查。

   ![Three Day Strength 的 Publish your agent 對話框：What happens next 顯示 Check、Build 和 Go live，Three Day Strength 那一列標示為 Not live yet，還有 Show the review，以及 Cancel 和 Publish 按鈕。](/images/agent/publish-and-share-1.webp)

3. 點選 **Publish**。對話框會關閉，右下角出現一張卡片，顯示 **Publishing…** 和三個步驟：**Check your agent**、**Build and test every app** 和 **Switch every app live together**。執行期間，標題列的 **Publish** 按鈕會呈現灰色。你可以繼續在對話中工作。發布這一個 App 花了大約一分半鐘。
4. 當卡片變成 **Your agent is live**，它會顯示每個 App 的名稱和網址，以及開啟網址的按鈕和複製連結的按鈕。網址看起來像 `https://app-….openstep.academy`。

## 分享連結

把卡片上的網址寄給任何你希望試用這個 App 的人。你之後可以在 Console 的 **Production** 再找到它。它會顯示帶有日期與時間的 **Live since**，旁邊是 **Unpublish**，接著是每個 App 的上線網址和 **Copy invitation**，它會複製一則附有 App 連結的簡短訊息，供你貼上。在 **Versions** 底下，目前上線的版本標示為 **Live**。

![發布後 Console 的 Production：Live since 16 Oct 2026, 8:13 pm，旁邊是 Unpublish，Three Day Strength 的上線網址、Copy invitation，以及 Versions，其中上線的版本標示為 Live。](/images/agent/publish-and-share-2.webp)

任何開啟連結的人都能看到這個 App。要保存訓練、體重和身體測量的紀錄，每位訪客會用自己的錢包登入，而且只有他們自己看得到自己的紀錄。

## 選擇誰可以開啟

開啟 **Console**，再開啟 **Settings**。**Access** 在 **Collaborators** 底下。只有擁有者能變更它。變更會立即生效，而且絕不會動到資料。

- **Anyone with the link** 讓任何有網址的人都能開啟 App。**Health & fitness** 選的就是這一個。
- **Learners only** 只讓透過加入連結加入的學習者，以及 Agent 的協作者開啟。這個模式下不提供自訂網域。選了它之後，**Copy invitation** 也會包含學習者最先使用的加入連結。

![Console 的 Settings：Collaborators 卡片與 Manage collaborators，以及 Access，其中選了 Anyone with the link，Learners only 在它下方。](/images/agent/publish-and-share-3.webp)

## 之後再發布變更

當你修改 App 後再次發布，對話框會叫做 **Publish your changes**。在 **Production**，每個 App 會說明改了什麼：**No changes**、**Code changed** 或 **Live values changed**。發布會保留你的資料與學習者的進度，而且絕不會開啟新的 session。如果更新會移除資料，例如新版本不再有的資料表或欄位，Publish 對話框會在你點選 **Publish** 之前顯示「This version may remove data from …」，以這種方式移除的資料無法復原。要回到較早的版本、讓 App 下線或把它放回去，見 [讓網站上線](/zh-tw/build/go-live/)。要加上你自己的網址，見 [網域](/zh-tw/build/domains/)。

## 開啟新的 session

**Start a new session** 是從頭開始的一張白紙，例如給新的一群人使用。只有擁有者能執行。開啟 **Console**，再開啟 **Sessions**，然後點選 **Start a new session**。對話框會詢問「Start a new session?」，並說明這會清除每個 App 的資料和每位學習者的進度。成員、角色與名稱會保留。點選 **Clear and start again** 繼續，或點選 **Cancel**。

發布絕不會這樣做。如果按鈕呈現灰色，頁面會說「There is no session to clear yet.」如果 Agent 還在建造，請先停止建造，或等它完成。

## 注意事項

- 讓 App 上線運行，和建造一樣，會從你的 SSU 餘額扣款。每筆費用都會出現在 [查看餘額](/zh-tw/account/balance/) 頁面的 **Activity** 底下。
- 除非你把其他人加進來，否則他們無法變更這個 Agent。見 [與他人協作](/zh-tw/agent/work-with-others/)。

下一步：[與他人協作](/zh-tw/agent/work-with-others/)。
