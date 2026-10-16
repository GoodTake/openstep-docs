---
title: App、資料與合約
description: 新增或封存 App、設定環境值、對開發資料執行 SQL，以及部署 App 使用的智慧合約。
sidebar:
  order: 7
---

這些指令改變的不只是原始碼檔案。每個指令都作用於一個 App，所以大多數都需要 `--app <app-key>`。請在 Agent 資料夾中執行。

## 新增或封存 App

1. 查看 Agent 有哪些 App。

   ```sh
   openstep apps list
   ```

2. 新增 App。你要事先描述它，讓 Agent 知道它為什麼是獨立的 App。

   ```sh
   openstep apps add admin --title "Admin" --purpose "Manage records" --audience "Owners" --boundary "Separate management UI" --capabilities web,server
   ```

   - `admin` 是 App key。它會成為資料夾名稱 `apps/admin`。請使用小寫字母、數字和連字號。
   - `--title` 是 App 的名稱。`--name` 也可以。
   - `--purpose`、`--audience` 和 `--boundary` 說明這個 App 的用途、誰使用它，以及它為什麼不是另一個 App 的一部分。
   - `--capabilities` 是以逗號分隔的 `web`、`server` 和 `contract` 清單。

   平台接受新的 App 後，CLI 會把它的資料夾拉進你的 Agent 資料夾。

3. 要讓 App 退役，請封存它。App 的歷史會保留，它在你電腦上的資料夾也會保留。

   ```sh
   openstep apps archive admin
   ```

擁有者和編輯者可以新增和封存 App。如果 CLI 無法完成本機的複製，請執行 `openstep pull`。

## 環境值

環境值是 App 會讀取的設定，例如位址或金鑰。它有名稱、類型（`variable` 或 `secret`），以及可以讀取它的位置：`frontend`、`backend` 和 `builder`。

```sh
openstep env list --app admin
openstep env define BOOKING_EMAIL --kind variable --targets backend --app admin --value hello@example.com
openstep env define VITE_SITE_NAME --kind variable --targets frontend --app admin --value "Corner Cafe"
openstep env define SERVICE_KEY --kind secret --targets backend --app admin
openstep env set SERVICE_KEY --app admin --environment production
openstep env clear SERVICE_KEY --app admin
openstep env targets VITE_SITE_NAME --targets frontend,backend --app admin
openstep env delete BOOKING_EMAIL --app admin
```

- `env list` 會顯示每個值的名稱、類型，以及是否已提供。它不會顯示機密值。
- `env define` 會建立一個值。名稱使用大寫字母、數字和底線。
- `env set` 會為已定義的值設定新值。`env clear` 會移除它。
- `env targets` 會變更值可以被讀取的位置。`env delete` 會移除沒有人再使用的定義。
- 目標（targets）遵循兩條規則。`frontend` 目標需要 `variable` 類型，以及以 `VITE_` 開頭的名稱，而以 `VITE_` 開頭的名稱必須以 `frontend` 為目標。機密值絕不以 `builder` 為目標，而變數只有在它存放的是鏈上位址，或它是存放鏈的 RPC URL 的 `BASE_RPC_URL` 時，才可以以 `builder` 為目標。
- `--environment` 是 `development` 或 `production`。沒有指定時，指令使用 `development`。
- 機密值絕不在指令列上提供。CLI 會以隱藏輸入的方式向你要求，或從標準輸入讀取。對機密值使用 `--value` 會被拒絕。

擁有者定義值、變更它們的目標並刪除它們。編輯者可以設定和清除開發值。上線值屬於擁有者。

`environment` 可以代替 `env` 使用。開發值與上線值有何不同，見 [環境值](/zh-tw/build/environment-values/)。

## 資料

對 App 的開發資料執行 SQL：

```sh
openstep data sql --app admin --sql "select 1"
openstep data sql --app admin ./query.sql
```

你可以用 `--sql`、檔案路徑或標準輸入來提供 SQL。大小最多 64 KiB。這是真實的開發資料，也就是 App 的預覽所使用的同一份資料。

會改變資料結構的 SQL，例如建立或修改資料表，在這裡會被拒絕。請改用 migration。

```sh
openstep data migrate 0002_add_bookings ./migration.sql --app admin
```

- migration ID 看起來像 `0002_add_bookings`：四位或更多位數字、一個底線，然後是小寫名稱。
- 檔案必須是 UTF-8 文字，且最大 4 MiB。
- 指令會先 pull，所以請在執行前解決任何衝突。接著它會把 SQL 連同 App 的原始碼一起儲存，並套用到 App 的開發資料。

編輯者和擁有者都能執行這兩者。開發資料與上線資料如何保持分開，見 [網站資料](/zh-tw/build/data/)。

## 功能（Capabilities）

```sh
openstep capabilities list --app admin
openstep capabilities enable contract --app admin
```

`list` 會顯示 App 已開啟的功能，以及它可以使用的平台功能。`enable` 會為 App 加上一項功能：`web`、`server` 或 `contract`。CLI 無法關閉某項功能。這兩個指令都屬於擁有者。

## 合約

這裡的合約是你的某個 App 使用的智慧合約。你要編譯它、註冊它、查看部署要花多少，然後把它部署到 Base。準備與報價都是免費的。部署會花費 SSU。報價與部署僅限擁有者。

1. 在 App 的 Foundry 設定中編譯合約。

   ```sh
   cd apps/admin/contract
   forge build
   cd ../../..
   ```

2. 註冊編譯好的合約。這不會送出交易，也不花任何費用。編輯者就能做。

   ```sh
   openstep contracts prepare Token --app admin --artifact contract/out/Token.sol/Token.json --constructor-args contract/args.json --owner-arg-index 3
   ```

   - `Token` 是你自己取的名稱。接下來的指令會用到它。
   - `--artifact` 是合約的 Foundry JSON 檔。它必須包含 `abi` 和 `bytecode.object`。
   - `--constructor-args` 是選填。它是一個 JSON 檔，內容是字串清單，例如 `["MyToken", "MTK", "1000000000000000000000"]`。只有在建構函式不需要引數時才可以省略。
   - `--owner-arg-index` 是選填。它是應該接收擁有者 Smart Account 位址的建構函式引數的位置（從 0 開始算）。請不要把那個引數放進你的清單。
   - 兩個檔案路徑都是相對於 App 的資料夾。每個檔案必須是一般檔案，且最大 4 MiB。

3. 要求報價。它會顯示合約將部署在哪裡，以及部署最多可能花費多少 SSU。繼續之前請兩者都讀過。

   ```sh
   openstep contracts quote Token --app admin
   ```

4. 部署。沒有 `--confirm true` 時指令會拒絕。如果你沒有在這個資料夾中對相同名稱執行過 `quote`，它也會拒絕。

   ```sh
   openstep contracts deploy Token --app admin --confirm true
   ```

   要設定上限，請加上 `--max-fee <units>`。如果報價更高，部署就會停止。報價與 `--max-fee` 以基本單位計算 SSU：1 SSU 等於 1000000000000000000 個單位。

   部署確認後，CLI 會把更新後的程式碼拉進你的資料夾。

5. 隨時查看狀態。這只是讀取，不會送出任何東西。

   ```sh
   openstep contracts status --app admin
   ```

如果部署被中斷，而你不知道結果，請先執行 `openstep contracts status --app admin`。CLI 不會自行把部署送兩次。

`contract` 可以代替 `contracts` 使用。

## 注意事項

- CLI 絕不會替你編譯合約。它只讀取你給它的 JSON 檔。
- 機密值和 token 不應該放在原始碼檔案中。請使用環境值。
- 任何會花費 SSU 的操作都會顯示在你的餘額中。見 [查看餘額](/zh-tw/account/balance/)。

下一步：[帶入你現有的程式碼](/zh-tw/cli/bring-your-code/)。
