---
title: 看它建造
description: 從對話與 Console 一個任務一個任務地追蹤建造，並可暫停、停止或繼續。
sidebar:
  order: 4
---

你核准計畫之後，Agent 會一次一個任務地建造。你可以放著不管，也可以在每個任務執行時看著它。

1. 看輸入框上方的狀態列。它顯示 **Building · 0 of 6 done**，以及進行中任務的名稱，並隨著任務完成而往上數。右側的預覽卡片會依序經過 **Thinking**、**Planning**、**Writing code**、**Preview & test** 和 **Done**。
2. 點選 **View build**。**Console** 會在右側開啟，停在它的 **Build** 區段，取代原本的 App 檢視區。它顯示 **Building**，附有 **Pause** 和 **Stop**、已完成幾個任務、建造已經執行多久，以及建造所用的產品版本。
3. 開啟 **Tasks** 分頁。每個任務一列，依執行順序排列：編號、名稱、所屬的 App、目前的回合，以及已經執行多久。正在執行的任務會顯示「Round 1 · running」。任務一次執行一個，所以它下面的任務要排隊等候。
4. 點選 Console 右上角的 **✕** 把它關閉，回到 App 檢視區。你隨時可以用 **View build** 回來，或是點選標題列的 **Console**，再點選清單中的 **Build**。

   ![Console 的 Build 區段：Building，附有 Pause 和 Stop、0 of 6 done，以及 Tasks 分頁列出六個任務，第一個正在執行。](/images/agent/watch-build-1.webp)

這次執行的六個任務依序是：建立健身的基礎、建造公開的訓練頁面、實作訓練與歷史紀錄功能、產生動作插圖、實作身體進度，以及跨所有 App 的最後檢查。

**Tasks** 旁邊的 **Plan** 和 **Apps** 分頁，會顯示你核准的計畫和它所建造的 App。Console 的其他區段，例如 **Code** 和 **Files**，列在左邊的清單中，但追蹤建造並不需要用到它們。

## 暫停、停止與繼續

這些控制項會出現在 Console 和輸入框旁邊。

- **Pause** 讓建造暫停。按鈕會變成 **Continue**。
- **Continue** 繼續同一個建造。
- **Stop** 結束建造。它會先詢問：「Stop this build? Finished tasks are kept. Your next Brainstorm starts a new plan.」點選 **Stop the build** 確認，或點選 **Cancel**。停止之後，你下一則 **Brainstorm** 訊息會用新的計畫開始新的建造。如果你只是想休息一下，請用 **Pause**。

建造進行期間，輸入框會以 **Pause** 和 **Stop** 取代訊息框：「Building — Pause or Stop to change direction.」要說新的事情，請先暫停或停止，再送出你的訊息。在建造暫停時送出訊息，會結束該建造，與 **Stop** 一樣。

## 當建造自己停下來

偶爾某個任務沒有你就無法繼續。建造會停下來，並告訴你它在等什麼：

- 一個問題：在對話中回答，建造就會自己繼續。
- 只有你能提供的值：會有對話框向你索取。見 [核准計畫](/zh-tw/agent/approve-plan/)。

建造也可能因為平台端的問題而暫停。這時狀態列會顯示 **Platform issue**，Console 中的 **Build** 則會說：「The build is paused on a platform problem. It is listed for the platform team and continues once they fix it. Nothing for you to do. To change direction, stop the build.」你可以等，問題修好後建造會自己繼續。

如果對話長時間顯示 **Reconnecting…**，請重新載入頁面。建造會在伺服器上繼續進行。

## 當建造完成

最後一個任務完成、最終審查也跑完之後，這次建造就可以發布了：

1. 輸入框上方的狀態列會變成 **Ready to publish**，附有「0 findings · 0 parked」這一行和 **View build**。這次執行中兩個數字都是 0。
2. 它下方會出現一個綠色方塊：「The build finished. Publish from the top bar puts every app live together.」點選其中的 **Show the review** 閱讀最終審查。
3. 標題列的 **Publish** 按鈕會變亮。
4. 在 Console 中，**Build** 現在顯示 **Ready to publish** 和「Publish from the top bar puts every app live together. Data and learner progress stay as they are.」它下方，**MECHANICAL CHECKS** 列出每一項檢查，全部標示為 **Passed**。**REVIEW FINDINGS** 顯示最終審查（「The reviewer reported no findings.」），**PARKED TASK RULINGS** 則寫著 None。

最終審查的任何意見都會列在 **REVIEW FINDINGS** 底下。你現在就可以在發布之前，到 **Preview** 試用這個 App。

## 注意事項

- 建造需要一段時間。這次從核准到 **Ready to publish** 花了大約 75 分鐘，其中包括一次因平台問題造成的暫停。Agent 會在進入下一步之前檢查每個任務，檢查失敗就修復它，所以有些任務不只跑一個回合。
- 只有擁有者和編輯者能 **Pause**、**Stop** 或 **Continue** 建造。檢視者可以觀看。
- 建造進行或暫停期間不能發布。建造停止或完成後，**Publish** 才會可用。見 [發布與分享](/zh-tw/agent/publish-and-share/)。

下一步：[使用你的 App](/zh-tw/agent/use-your-app/)。
