---
title: 取出 Agent
description: 建立 Agent 或挑選你已有的一個，然後把它所有的 App 複製到你電腦上的資料夾。
sidebar:
  order: 3
---

取出（checkout）會把 Agent 每個啟用中的 App 複製到一個新的資料夾。從這時起，你就在那個資料夾裡工作。

## 從終端機建立 Agent

如果你已經有想用的 Agent，請略過這一部分。

1. 查看你可以用來起步的產品。這些就是 Marketplace 中列出的產品。

   ```sh
   openstep catalog
   ```

2. 建立 Agent。請使用清單中的產品 key。

   ```sh
   openstep agent create "My Agent" --product <product-key>
   ```

   省略 `--product` 就會從 Web builder 開始。加上 `--workspace <workspace-slug>` 可在團隊工作區中建立 Agent。

建立 Agent 並不會向 builder 送出訊息。指令會給你 Agent 的 ID。當你[與它對話](/zh-tw/cli/chat/)時，Agent 才會開始工作。

## 取出 Agent

1. 列出你可以開啟的 Agent，並記下你要的那一個的 ID。加上 `--workspace <workspace-slug>` 可以只列出某一個工作區。

   ```sh
   openstep agent list
   ```

2. 把它取出到一個資料夾。這個資料夾必須是新的或是空的。

   ```sh
   openstep agent checkout <agent-id> ./my-agent
   ```

   如果 Agent 還在準備中，指令最多會等兩分鐘。到時還沒準備好的話，請再執行一次指令。

3. 進入資料夾並列出它的 App。

   ```sh
   cd my-agent
   openstep apps list
   ```

## 資料夾裡有什麼

```
my-agent/
  apps/
    web/
    admin/
  AGENTS.md
  .openstep/
```

- `apps/<app-key>/` 存放一個 App 的原始碼。每個 App 一個資料夾，以它的 App key 命名。你的編輯就在這裡進行。
- `AGENTS.md` 告訴你電腦上的 coding agent 去讀 `.openstep/instructions/README.md`，取得 OpenStep 的規則與 skills。CLI 會讓這個檔案中屬於它的區塊保持最新。你在該區塊之外自己寫的行會保留。
- `.openstep/` 是 CLI 私有的記帳資料。裡面有它所綁定的 Agent、你上次同步的原始碼副本，以及進行中請求的收據。

## 注意事項

- 之後所有指令都要從這個資料夾執行，而不是在 `apps/web` 裡面。
- 不要編輯或刪除 `.openstep/` 裡的任何東西。如果你手動更動它，`diff`、`pull` 和 `push` 就無法分辨哪些是你的。
- 取出時會把 `.openstep/`、`openstep.config.json` 和 `/AGENTS.md` 加入資料夾的 `.gitignore`，所以它們不會進入 git。
- 取出絕不會寫入已經有檔案的資料夾。請另選一個新名稱。
- 你的角色決定你接下來能做什麼。擁有者可以發布，擁有者和編輯者可以建造與編輯，檢視者只能閱讀。見 [CLI 能做什麼](/zh-tw/cli/what-it-does/)。

下一步：[在終端機裡對話](/zh-tw/cli/chat/)，或直接前往[在本機執行 App](/zh-tw/cli/dev/)。
