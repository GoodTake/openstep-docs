---
title: Build 與 Brainstorm
description: Build 會直接修改你的網站。Brainstorm 先提問、擬出計畫，等你核准後才建造。
sidebar:
  order: 3
---

你送出的每一則訊息都以兩種模式之一執行。**Build** 直接修改網站。**Brainstorm** 先問你問題並擬出計畫。你可以用 **New agent** 上的 **Build** / **Brainstorm** 切換鈕選擇模式，之後則用輸入框裡的標籤。

1. 點選輸入框底部的標籤。它會顯示模型和模式，例如 **Auto · Build**。
2. 在 **Run mode**（**Choose how the agent works**）底下，選擇 **Build**（**Changes it directly.**）或 **Brainstorm**（**Asks, plans, then builds task by task.**）。
3. 送出你的訊息。輸入框裡的提示會跟著模式變化：**Build** 是 **Tell me what you want to build**，**Brainstorm** 是 **Describe it — I'll ask a few questions first**。

![展開的輸入框標籤：Select model 選了 Auto，接著是 Choose model，再來是 Run mode，選了 Build，下面是 Brainstorm。](/images/build/modes-1.webp)

## Build

builder 會讀你的需求、修改網站、檢查自己的成果，然後告訴你它做了什麼。它不會寫計畫，也不會等待核准，連第一則訊息也一樣。它會檢視 Agent 裡的每個 App，並決定要改哪幾個。變更會出現在 Preview。在你 **Publish** 之前，線上網站維持原樣。

當你清楚自己要什麼，而且改動小或明確時，就用 **Build**：像咖啡店這樣第一個小網站、新增一個頁面、換一個標題、改另一個營業時間。

## Brainstorm

builder 會問你問題，可能是一輪或多輪。接著它擬出計畫，並停下來等你核准。你核准之後，它會一個任務接一個任務地依計畫建造，檢查每個任務，最後做一次完整審查，然後就可以 **Publish**。問題見 [回答它的問題](/zh-tw/agent/answer-questions/)，計畫見 [核准計畫](/zh-tw/agent/approve-plan/)。

當想法還沒定，或網站大到值得先有計畫時，就用 **Brainstorm**，例如一家同時接受訂單並寄送確認信的咖啡店。

只修改既有的文字、名稱、數字、顏色或圖片的小修改，不需要計畫。即使在 **Brainstorm** 下，builder 也會立刻完成。

## 注意事項

- 你可以在訊息之間切換模式，但 builder 工作期間不行。標籤會呈現灰色，直到這一輪結束。
- **Brainstorm** 建造有它自己的控制項 **Pause** 和 **Stop**，以及自己的進度。見 [追蹤進度](/zh-tw/build/progress/)。
- 你可以先用 **Build** 開始，之後發現改動比預期大時，再切換到 **Brainstorm**。

下一步：[描述你想要的東西](/zh-tw/build/describe/)。
