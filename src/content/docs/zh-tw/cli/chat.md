---
title: 在終端機裡對話
description: 不離開終端機，就能與 builder 交談、回答它的問題、核准計畫，以及暫停或停止建造。
sidebar:
  order: 4
---

`openstep agent chat` 會向 Agent 的 builder 送出一則訊息，也就是你在工作頁上對話的同一個 builder。CLI 會即時顯示這一輪的過程。這一輪結束時，或 builder 需要你提供某樣東西時（一個問題、一份待核准的計畫，或一個要提供的值），它就會停下來。

你必須是這個 Agent 的擁有者或編輯者。建造會花費 SSU，和在工作頁上一樣。

## 送出訊息

1. 選擇模式。用 `brainstorm` 先把你想要的東西談清楚。用 `build` 讓 builder 立刻修改 Agent。見 [Build 與 Brainstorm](/zh-tw/build/modes/)。

   ```sh
   openstep agent chat "Add a page where guests can book a table" --mode brainstorm
   ```

   沒有 `--mode` 時，訊息會以 `build` 執行。

2. 要告訴 builder 你正在看哪個 App 和哪個檔案，請加上 `--app` 和 `--path`。這是提示，不是限制。builder 也可能修改其他 App。

   ```sh
   openstep agent chat "Make this header sticky" --mode build --app web --path src/App.tsx
   ```

3. CLI 會把這一輪的事件寫到終端機，並以這一輪的 ID 和狀態結尾。請記下這個 turn ID。回答問題和繼續時都需要它。

## 回答問題

在 Brainstorm 中，builder 會問一輪問題。輸出中的問題事件帶有一個 request ID。

```sh
openstep agent question --turn <turn-id> --request <request-id> --answers '[["Option A"],["Yes"]]'
```

`--answers` 是一份 JSON 清單，每個問題對應一個內層清單。要拒絕回答這些問題，請用 `--reject true` 取代 `--answers`。

## 核准計畫

當 builder 顯示一份等待你處理的計畫時，輸出會包含該計畫與它的 hash。你可以核准，或要求修改。

```sh
openstep agent plan approve --hash <plan-hash>
openstep agent plan request-changes --hash <plan-hash> --comment "Leave out the admin page"
```

`request-changes` 需要 `--comment`。`approve` 的備註則是選填。這與工作頁上的 [核准計畫](/zh-tw/agent/approve-plan/) 是同一個步驟。

## 提供它要求的值

有些計畫會宣告只有你能提供的值，例如 API key。要查看被要求的內容，以及你已經提供過的內容，請執行：

```sh
openstep agent plan values --app <app-key>
```

要提供其中一個，請執行下一個指令，並在它詢問時輸入值。輸入時不會回顯，也不會存進對話紀錄。你也可以用標準輸入把值傳進去。

```sh
openstep agent plan value <name> --app <app-key>
```

builder 也可能在建造進行到一半時停下來，要求一個輸入。請用輸出中的 input request ID 來回答：

```sh
openstep agent input <input-request-id> --choice <option>
openstep agent input <input-request-id> --text "your answer"
```

省略 `--choice` 和 `--text`，就能以隱藏輸入的方式提供值，和上面相同。

如果建造停在某個任務上並問你一個問題，請用輸出中的 task key 來回答：

```sh
openstep agent task-answer <task-key> --text "your answer"
```

## 暫停、繼續或停止建造

```sh
openstep agent pause
openstep agent continue
openstep agent stop
```

`openstep agent stop --turn <turn-id>` 會停止單一輪。如果 CLI 說某個控制動作的結果未知，請先執行 `openstep status` 讀取 Agent 的狀態，再重試。

## 重新接上一輪

如果你的連線中斷，或你關閉了終端機，這一輪仍會在平台上繼續執行。CLI 會在送出你的訊息之前，把 turn ID 存進 `.openstep/chat.json`。要繼續觀看，請接續該輪。

```sh
openstep agent chat --turn <turn-id>
openstep agent chat
```

第二種形式會使用 CLI 存下的那一輪。不要為了恢復而再次送出相同的訊息，那會啟動第二輪。要閱讀先前的對話，請執行：

```sh
openstep agent chat --history true
```

## 注意事項

- builder 完成後，請執行 `openstep pull`，把它的變更帶進你的資料夾。之後才推送你自己的編輯。見 [推送與發布](/zh-tw/cli/push-publish/)。
- 加上 `--json` 可取得單一的機器可讀結果，而不是串流。

下一步：[在本機執行 App](/zh-tw/cli/dev/)。
