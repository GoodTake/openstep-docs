---
title: 在本機執行 App
description: 說明每個 App 如何啟動，然後用 openstep dev 在你的電腦上執行它的前端和後端。
sidebar:
  order: 5
---

`openstep dev` 會在你的電腦上啟動你的 App，並連接到 Agent 真實的開發資料。你在一個名為 `openstep.config.json` 的檔案裡，告訴它每個 App 如何啟動。

## 設定

1. 在 Agent 資料夾中建立 `openstep.config.json`。為你想執行的每個 App 加上一個項目，以 App key 作為名稱。

   ```json
   {
     "apps": {
       "web": {
         "cwd": "apps/web",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5173"], "port": 5173 },
         "backend": { "command": ["npm", "run", "dev:server"], "port": 8787 }
       },
       "admin": {
         "cwd": "apps/admin",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5174"], "port": 5174 }
       }
     }
   }
   ```

   - `cwd` 是 App 的資料夾，相對於 Agent 資料夾。
   - `frontend` 和 `backend` 各自需要一個 `command` 和一個 `port`。`command` 是一份清單：先是程式，然後是它的引數。它在 `cwd` 裡執行。
   - 只有前端的 App 請省略 `backend`。
   - 每個處理程序都要使用自己的連接埠。

   請使用你的 App 真正有的 scripts 和連接埠。檢查它的 `package.json`。上面的內容只是範例。

2. 在每個 App 的資料夾裡安裝該 App 的相依套件。

   ```sh
   cd apps/web
   npm install
   cd ../..
   ```

## 執行

1. 在 Agent 資料夾中，啟動設定檔裡的所有 App。

   ```sh
   openstep dev
   ```

   只啟動一個 App：

   ```sh
   openstep dev --app web
   ```

2. CLI 會為每個 App 印出一個位址。請在瀏覽器中開啟那個位址。不要開啟前端本身的連接埠。CLI 印出的位址才是把 App 連接到平台的那一個。
3. 在你的編輯器裡編輯 `apps/web` 中的檔案。你的前端開發伺服器會照平常的方式接收變更。
4. 按 Ctrl-C 停止。CLI 會停止這些處理程序並釋放連線。

## 注意事項

- 這是真實資料：在本機執行時，用的是和工作頁上該 App 的預覽相同的開發資料。你執行的 SQL 會改動那些資料。它不是用完即丟的副本。見 [網站資料](/zh-tw/build/data/)。
- 這會花費 SSU：AI、電子郵件和鏈上呼叫等平台功能照常計費，即使 App 是在你的電腦上執行。見 [查看餘額](/zh-tw/account/balance/)。
- 不要把 Secret 放進原始碼：CLI 會為每次執行提供它自己的憑證，以及該 App 的環境值。要設定某個值，見 [App、資料與合約](/zh-tw/cli/apps-data-contracts/) 和 [環境值](/zh-tw/build/environment-values/)。
- 你啟動的每個 App 都需要在 `openstep.config.json` 中有一個項目。如果你啟動所有 App，而其中一個沒有項目，指令會停止並指出它。
- 如果你設定的任何一個處理程序結束，`openstep dev` 會停止它啟動的每個 App 並結束指令。非零的結束碼會讓它以錯誤 `App runtime exited with code N` 結束。請閱讀失敗的處理程序自己的輸出，了解原因。
- 設定檔中的路徑必須留在 Agent 資料夾之內。
- `openstep.config.json` 只存在本機。`push` 不會把它送出去。

下一步：[推送與發布](/zh-tw/cli/push-publish/)。
