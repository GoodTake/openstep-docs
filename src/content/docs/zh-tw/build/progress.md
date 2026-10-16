---
title: 追蹤進度
description: builder 工作時，對話與預覽卡片會顯示什麼，以及如何停止一輪。
sidebar:
  order: 6
---

你送出的訊息會啟動一輪，builder 會處理它直到完成。你可以在兩個地方看它的進度：左邊的對話，與右邊的預覽卡片。

1. 閱讀對話中的步驟。builder 會把它做的每件事顯示成一行，例如 **Run a command**、**Read**、**Edit** 或 **Update the plan**，有話要說時，會在這些行之間附上簡短的說明。
2. 閱讀 builder 回覆下方的狀態列。builder 準備期間，它從 **Preparing** 開始。如果所有名額都被占用，可能會顯示 **Waiting for a free build slot**，接著是 **Thinking**、**Planning** 和 **Building**，並附上計時，例如 **Building · 2:39**。如果一分鐘內都沒有新的內容，它會加上 **Still working — this step can take a few minutes**。
3. 看右邊的預覽卡片。它會顯示 **Thinking**、**Planning**、**Writing code**、**Preview & test** 和 **Done**，每完成一項就勾掉一項。網站準備好之後，網站會取代這張卡片。
4. 當狀態列顯示 **Done**，後面接著距離完成已過多久時，這一輪就結束了。builder 的最後一則訊息會說明改了什麼。

![進行中的 Build 輪次：左邊是 builder 的步驟與 Building 狀態列，右邊是預覽卡片，Writing code 正在進行。](/images/build/progress-1.webp)

## 停止一輪

builder 工作期間你不能再送出另一則訊息。要停止它，請點選原本是送出箭頭位置的紅色停止按鈕。狀態列接著會顯示 **Cancelled**。工作是在伺服器上執行的，所以如果狀態列長時間顯示 **Reconnecting…**，請重新載入頁面，它會繼續進行。

## 一輪失敗時

狀態列會變紅，並用白話說明發生了什麼事。當再送一次相同的訊息會有幫助時，它會顯示 **Retry**。如果你的 SSU 用完了，它會這麼說，並提供 **Top up balance**。見 [取得 SSU](/zh-tw/start/get-ssu/)。

## 注意事項

- **Brainstorm** 建造會在你核准計畫後開始，並在輸入框上方顯示它自己的進度列：**Building · 0 of 6 done**，旁邊有 **Pause**、**Stop** 和 **View build**。見 [看它建造](/zh-tw/agent/watch-build/)。
- 你的變更顯示在 Preview，不在線上網站。見 [預覽你的網站](/zh-tw/build/preview/)。

下一步：[預覽你的網站](/zh-tw/build/preview/)。
