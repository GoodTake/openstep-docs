---
title: 核准計畫
description: 閱讀 Agent 擬好的計畫，然後核准它或要求修改。核准之前不會建造任何東西。
sidebar:
  order: 3
---

你回答完問題後，Agent 會擬出一份建造計畫。核准之前不會建造任何東西，所以這是檢查計畫是否符合你想要的時機。

1. 等計畫出來。擬定期間，右側的預覽卡片會顯示 **Planning** 和「Drafting the build plan」。這個範例花了大約八分鐘。完成後，輸入框上方會出現一條狀態列：**Plan ready · 6 tasks**，附有像「1 finding · 0 open questions」這樣的一行，以及 **View build** 按鈕。它下方是一個方塊，裡面有 **Show the plan**、**Approve plan** 和 **Request changes**。

   ![對話中的 Plan ready · 6 tasks 狀態列，下方是 Show the plan、Approve plan 和 Request changes。輸入框說明計畫正等你決定。](/images/agent/approve-plan-1.webp)

2. 點選 **Show the plan** 來閱讀計畫。點選 **Hide the plan** 可以再把它收起來。

   ![展開的計畫：標示為 Awaiting your approval 的 Build plan，1 App、6 Tasks、0 Missions 和 0 Contracts 的計數，以及 Review & setup 區段。](/images/agent/approve-plan-2.webp)

3. 做出決定。
   - 點選 **Approve plan** 開始建造。狀態列會變成 **Building · 0 of 6 done**，附上目前任務的名稱和計時，輸入框則顯示「Building — Pause or Stop to change direction.」，並有 **Pause** 和 **Stop**。接著請看 [看它建造](/zh-tw/agent/watch-build/)。
   - 點選 **Request changes** 把計畫退回。在訊息框寫下你希望哪裡不同，然後送出。你也可以不先點選任何東西，直接在訊息框輸入。Agent 會重新規劃，並給你看新的計畫。這段期間不會建造任何東西。

**Approve plan** 和 **Request changes** 在展開的計畫底部也有，所以你不必捲回上面。

## 計畫顯示什麼

- **Build plan**，標示為 **Awaiting your approval**，附有 **App**、**Tasks**、**Missions** 和 **Contracts** 的計數。這個 Agent 用 **6 Tasks** 建造 **1 App**。Missions 和 Contracts 是給開設課程或使用區塊鏈合約的 Agent 用的，所以這裡都是 0。
- **REVIEW & SETUP**：每份計畫在你看到之前，都會先經過自動審查。審查有意見時，會把它們列為審查意見，這個區段會顯示「1 needs you」。核准前請先閱讀。在這個範例中，審查結果是 **Approved with findings**，沒有任何一項意見擋下計畫。
- **WHAT THIS BUILDS**：「Tasks run one at a time, in this order.」任務依 App 分組，每個任務有一句話說明成果，以及它必須通過的檢查。這份計畫中有一個任務寫著：「Let a signed-in person start a day, save individual sets, finish a workout and inspect their own history.」最後一組 **Cross-app & integration** 有一項最終檢查，確認各個 App 能一起運作。

## 當 Agent 需要你提供某個值

有些計畫需要只有你能提供的東西，例如 API 金鑰或收款錢包。Agent 絕不會自己編造這些。在建造繼續之前，會有一個對話框向你索取該值：

1. 對話框以該值的名稱命名，並說明它的用途。這個值會存進 App 的環境值，同時用於開發與上線。
2. 輸入該值。機密值在你輸入時會被隱藏。
3. 點選 **Provide and continue**。建造會自動繼續。

如果你點選 **Not now**，建造會等待。對話中會留下一則說明「The builder needs … to continue.」，並附上 **Provide** 按鈕，可以再次開啟對話框。仍在等你提供的值，也會列在 Console → **Environment** 中 **Requested by the build** 底下。

有時它會改成請你在幾個選項中選一個，而你可以在寫著「Or write your own answer」的框裡寫下自己的答案。

Health & fitness Agent 不需要任何值，所以它從不索取。會呼叫外部服務的 Agent 就會。

## 注意事項

- 只有 Agent 的擁有者和編輯者能核准計畫、要求修改或提供值。檢視者可以閱讀計畫。見 [與他人協作](/zh-tw/agent/work-with-others/)。
- 計畫還在擬定時，輸入框提供的是 **Pause** 和 **Stop**，而不是訊息框。見 [看它建造](/zh-tw/agent/watch-build/)。
- Agent 的工作，包括規劃，都會花費 SSU。

下一步：[看它建造](/zh-tw/agent/watch-build/)。
