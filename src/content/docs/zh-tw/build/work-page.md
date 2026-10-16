---
title: 工作頁
description: 左邊是對話，右邊是你的網站，標題列有 Publish 和 Console。
sidebar:
  order: 2
---

每個 Agent 都有一個工作頁，你大部分的時間都花在這裡：在左邊跟 builder 對話，在右邊看網站。你一建立 Agent 它就會開啟，之後可以從 **My agents** 或左側欄的 **RECENT AGENTS** 回到這裡。

![The Cozy Coffee Table 的工作頁：左邊是 builder 的回覆，右邊是網站的即時預覽。](/images/build/work-page-1.webp)

1. 標題列。由左到右：**My agents / The Cozy Coffee Table**（點選 **My agents** 可回到清單）、App 切換器、**Publish** 和 **Console**。一個 Agent 可以有不只一個 App。App 切換器決定右側顯示哪個 App，也決定 Console 裡的 **Code**、**Domains** 和 **Environment** 作用在哪個 App 上。在這個頁面，左側欄會縮成圖示。
2. 左邊的對話。裡面有你的訊息和 builder 的回覆，每一步一行，每則回覆下方有一行狀態。底部是你輸入的輸入框。**+** 可以附加檔案，標籤（例如 **Auto · Build**）用來選擇模型和模式。builder 工作時，送出箭頭會變成紅色的停止按鈕。
3. 右邊的 App 檢視區。**Preview** 和 **Data** 分頁顯示你在標題列選的 App。只有帶有智慧合約的 App 才會出現 **Contract**。Preview 工具列有重新載入按鈕、頁面選擇器（**Home**、**Menu**、**Book a table**）、裝置選擇器、用於 **Edit mode** 的鉛筆，以及在獨立分頁檢視網站的 **Open**。
4. Console。點選標題列的 **Console**，它會蓋在 App 檢視區上方開啟，點選 ✕ 即可關閉。它的各個區段列在下面。

## Console 裡有什麼

- **Overview**：Agent 的名稱與產品、誰可以開啟它、你的角色、是否已發布，以及它的 App。
- **Build**：依照已核准計畫進行的建造所包含的任務、計畫與 App。Agent 有這類建造時才會出現。見 [追蹤進度](/zh-tw/build/progress/)。
- **Code**：App 的檔案，唯讀。見 [瀏覽程式碼](/zh-tw/build/code/)。
- **Files**：你提供給 builder 當參考資料的 PDF、PowerPoint 和 Word 檔案，皆為選用。
- **Memory**：Agent 記錄下來的內容，包括你做過的決定。
- **Sessions**：App 裡有什麼內容，以及擁有者可以在這裡 **Start a new session**。
- **Plugins**：Agent 產品的內建功能。
- **Domains**：App 的網址與你自己的網域。見 [網域](/zh-tw/build/domains/)。
- **Production**：目前上線的內容、它的版本，以及 **Unpublish**。見 [讓網站上線](/zh-tw/build/go-live/)。
- **Scheduled tasks**：你的 App 在固定時間執行的工作。見 [你的網站能做什麼](/zh-tw/build/what-your-site-can-do/)。
- **Environment**：你的 App 會讀取的值，開發與上線各自分開存放。見 [環境值](/zh-tw/build/environment-values/)。
- **Learners**：加入的人，適用於有學習者或課程的 Agent。
- **Settings**：Agent 的名稱、存取權限、協作者、所有權與刪除。見 [管理你的 Agent](/zh-tw/agent/manage-agents/)。

## 注意事項

- builder 工作期間，以及還沒有東西可以發布時，**Publish** 會呈現灰色。
- 你能做的事取決於你的角色。擁有者什麼都能做，包括 **Publish**、上線的 **Environment** 值和 **Domains**。編輯者可以對話與建造。檢視者只能看。見 [與他人協作](/zh-tw/agent/work-with-others/)。

下一步：[Build 與 Brainstorm](/zh-tw/build/modes/)。
