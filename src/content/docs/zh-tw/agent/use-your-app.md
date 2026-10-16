---
title: 使用你的 App
description: 在 Preview 試用完成的 App，在 Data 分頁看它存了什麼，並請 Agent 做修改。
sidebar:
  order: 5
---

建造完成後，App 就可以在工作頁的 **Preview** 試用了。這是你的開發版本。在別人看到之前，你可以盡情使用和測試。

1. 看工作頁的右側。建造中的卡片已經被 App 取代。如果 Console 還開著，請用 **✕** 把它關閉。App 上方有 **Preview** 和 **Data** 分頁、一個從 **Home** 開始的頁面選單、一個切換桌面與手機尺寸的選單，以及 **Open ↗**，它會在新分頁開啟預覽。
2. 看 App 本身。Three Day Strength 在頂部有自己的選單：**Plan**、**Workout**、**History** 和 **Progress**。它的首頁寫著「Get stronger, one focused session at a time.」，有 **Start logging →** 和 **Connect Wallet** 按鈕，還有一張卡片「Three days. Four movements. Steady progress.」，總結了這份計畫：45 分鐘、每週 3 天、4 個動作。
3. 開啟 **Plan**。它是 **THE PLAN**，「Repeat weekly · rest between sessions」，並分成幾天。**Day A** 是「Session 1 · 4 movements」，每個動作都有插圖、組數與次數，以及訓練到的肌群。前兩個是背蹲舉，3 組 × 5–8 次，和槓鈴臥推，3 組 × 5–8 次。下面還有更多天。不必登入就能閱讀這份計畫。

   ![建造完成後 Three Day Strength 的工作頁：對話中的 Ready to publish 狀態列，以及 Preview 中 App 的 Plan 頁面，顯示 Day A 與附插圖的動作 Back squat 和 Barbell bench press。](/images/agent/use-your-app-1.webp)

4. 記錄你的訓練。你的紀錄是私人的，所以 App 會先要求你用錢包登入。在你登入之前，**Workout** 會顯示「Sign in with your wallet to log your private workouts.」和一個 **Connect Wallet** 按鈕。登入之後，你訓練時一次儲存一組（「One set at a time. Save your work as you go.」）。
5. 查看你的歷史與進度。**History** 和 **Progress** 同樣是私人的：每個人用自己的錢包登入，只看得到自己的紀錄。Agent 規劃了逐組記錄，以及以你選的單位 kg 和 cm 進行的私人體重與身體測量追蹤。你的體重和身體測量值放在 **Progress** 底下。
6. 開啟 **Data** 分頁，看 App 儲存了什麼。它顯示「View and manage the data stored in your app.」，每個資料表一張卡片，並附上資料列的數量。Three Day Strength 的資料表是 `measurements`、`orders`、`settings`、`users`、`weight_entries`、`workout_sets` 和 `workouts`。開啟資料表就能看它的資料列。這次執行中每個資料表都是空的，因為還沒有人記錄任何東西。
7. 要求修改。在左側的訊息框輸入。例如，要求增加第四個訓練日、換個用字，或換個外觀。

App 的每一頁結尾都有一則說明：這不是醫療建議，開始新的訓練或減重計畫之前，應先諮詢醫師或合格的教練。

## 注意事項

- 你在 **Preview** 做的事屬於開發資料。它與你發布後線上 App 的資料是分開的，所以你可以放心測試。見 [網站資料](/zh-tw/build/data/)。
- **Open ↗** 方便你用實際尺寸，或在手機上檢查 App。
- 小改動，例如新的用字、數字、顏色或圖片，會立刻完成。**Brainstorm** 中較大的改動，則會再走一遍問題和計畫，並且在建造任何東西之前，由你核准計畫。見 [Build 與 Brainstorm](/zh-tw/build/modes/)。
- 你可以在 Console 的 **Code** 底下閱讀 App 的程式碼，但要修改 App，是在對話裡提出要求。見 [瀏覽程式碼](/zh-tw/build/code/)。
- 目前還沒有任何東西公開。App 要等你發布才會上線。

下一步：[發布與分享](/zh-tw/agent/publish-and-share/)。
