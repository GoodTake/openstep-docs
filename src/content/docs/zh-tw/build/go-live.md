---
title: 讓網站上線
description: Publish 讓每個 App 一起上線。可以回復到較早的版本、讓網站下線，或再把它放回線上。
sidebar:
  order: 12
---

**Publish** 會把你在 Preview 看到的內容變成有自己網址的線上網站。它會讓 Agent 的每個 App 一起上線，而且只有擁有者能執行。在你發布之前，你的網站只存在於 Preview 中。

1. 等 builder 完成。builder 工作時，標題列的 **Publish** 會呈現灰色。
2. 點選標題列的 **Publish**。對話框 **Publish your agent** 會開啟，並顯示 **Every app of this agent goes live together.** 它會列出接下來的步驟 **Check**、**Build** 和 **Go live**，以及像 **Publish 1 app · Data and learner progress stay as they are.** 這樣的一行。每個 App 都會連同狀態一起列出：第一次發布是 **Not live yet**，之後的發布則是 **Code changed** 或 **No changes**。
3. 點選對話框中的 **Publish**。一張包含 **Check your agent**、**Build and test every app** 和 **Switch every app live together** 這幾個步驟的卡片會追蹤進度。執行期間你可以繼續工作。一個 App 大約花了兩分鐘。
4. 完成後，一張卡片會顯示 **Your agent is live**，附上 App 的網址，以及開啟或複製網址的按鈕。

![The Cozy Coffee Table 的 Publish your agent 對話框，顯示三個步驟，App 列為 Not live yet。](/images/build/go-live-2.webp)

接著開啟 **Console** 和 **Production**。它會顯示帶有日期的 **Live since**、每個 App 的網址、複製可直接傳出去的網址的 **Copy invitation**，以及 **Versions**，也就是你發布過的每個版本的清單。目前的版本標示為 **Live**。

![第一次 Publish 之後的 Console → Production：Live since 日期、The Cozy Coffee Table 的網址，以及一個標示為 Live 的版本。](/images/build/go-live-1.webp)

## Publish 做什麼、不做什麼

- 每個 App 一起上線。只要有任何一個 App 失敗，整次 Publish 就失敗，什麼都不會改變，線上網站維持原樣。狀態會說明出了什麼問題，並以 **The live version did not change.** 結尾。
- 如果檢查在某個 App 發現問題，builder 可以自己修好並再次發布。如果它需要你提供某樣東西，例如一個值，狀態會顯示 **Publishing waits for you.**
- Publish 永遠不會清除你的資料。訂位與其他上線的紀錄都會保留。唯一的例外是刻意移除線上網站已有的資料表或欄位的更新。發布前對話框會告訴你是哪個 App，被移除的內容就是真的移除了。
- 發布之後，Preview 繼續作為你的草稿。之後的變更在你再次發布之前，不會到達線上網站。
- 誰可以開啟網站，**Anyone with the link** 或 **Learners only**，是 Agent 的設定。見 [發布與分享](/zh-tw/agent/publish-and-share/)。

## 回復到較早的版本

1. 開啟 **Console** 和 **Production**，在 **Versions** 中找到該版本。
2. 點選它旁邊的 **Roll back**。對話框 **Roll back** 會詢問是否回到該日期發布的版本。資料與學習者的進度維持不變。
3. 點選 **Roll back to this version**。每個 App 會一起切換。

回復會把較早版本的程式碼放回去。它不會復原你對資料所做的變更，也不會改變你在 Preview 中的草稿。如果較新的版本移除了較舊版本會讀取的資料，回復會被拒絕。平台會保留最近五個曾經上線的版本。更早的版本會顯示 **No longer kept**。建造進行期間，回復也會等待，所以請先暫停或停止建造。

## 讓網站下線

1. 開啟 **Console** 和 **Production**，點選 **Live since** 旁邊的 **Unpublish**。
2. 在對話框 **Unpublish** 中，點選 **Take it offline**。

每個 App 都會停止提供服務。最後一個上線的版本、它的資料、它的網域和它的設定都會保留。

## 再把它放回線上

網站下線期間，**Production** 會顯示 **This agent is offline. Its data is kept.** 點選 **Put the last version back**。平台稱這個動作為 Republish。它會把最後一個上線的版本直接放回去，不必重新建造。如果你在那之後修改過網站，請改為點選 **Publish**，讓新的版本上線。

## 注意事項

- 只有擁有者能 **Publish**、**Roll back**、**Unpublish** 和放回版本。編輯者和檢視者可以看到 **Production**。
- 要從空白資料重新開始，請使用 **Console** → **Sessions** 中的 **Start a new session**。Publish 絕不會那樣做。見 [發布與分享](/zh-tw/agent/publish-and-share/)。
- 要讓網站使用你自己的網址，見 [網域](/zh-tw/build/domains/)。

下一步：[網域](/zh-tw/build/domains/)。
