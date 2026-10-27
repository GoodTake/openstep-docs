---
title: 在本機執行 App
description: 說明每個 App 如何啟動，然後用 openstep dev 在你的電腦上執行它的前端和後端。
sidebar:
  order: 5
---

`openstep dev` 會在你的電腦上啟動你的 App，並連接到 Agent 真實的開發資料。你在一個名為 `openstep.config.json` 的檔案裡，告訴它每個 App 如何啟動。

## 設定

1. 在 Agent 資料夾中建立 `openstep.config.json`。為你想執行的每個 App 加上一段設定，以 App key 作為名稱。

   ```json
   {
     "apps": {
       "web": {
         "cwd": "apps/web",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5173"], "port": 5173 },
         "backend": { "command": ["node", "functions/server.js"], "port": 8787 }
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
   - 後端執行時，`PORT` 環境變數會被設成它的 `port`，即使你的 shell 設定了 `PORT` 也一樣。監聽 `PORT` 的伺服器不需要再做其他設定。
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

2. CLI 會為每個 App 印出一個網址。請在瀏覽器中開啟那個網址。不要開啟前端本身的連接埠。CLI 印出的網址才是把 App 連接到平台的那一個。
3. 在你的編輯器裡編輯 `apps/web` 中的檔案。你的前端開發伺服器會照平常的方式接收變更。
4. 按 Ctrl-C 停止。CLI 會停止這些處理程序並釋放連線。

## 線上網站的規則

對有後端的 App，`openstep dev` 會依照線上網站的規則處理 `/api`，所以多數在線上網站會失敗的請求，在你的電腦上也會失敗。每一種請求第一次失敗時，CLI 會印出一則以 `openstep:` 開頭的警告，並說明該改什麼。每條規則的說明見 [線上網站有哪些不同](/zh-tw/cli/bring-your-code/#線上網站有哪些不同)。

- 頁面用 `fetch`、`XMLHttpRequest` 和 `sendBeacon` 發出的呼叫，照常送到你的伺服器。
- 任何其他以單純 `/api` 網址載入的情況，都會得到 404，和公開的線上網站一樣：例如元件渲染出來的 `<img>`、連結、表單或 `window.location`。這樣的網址請用 `src/lib/runtime` 的 `releaseRuntimePath('/api/...')` 組成。在 `openstep dev` 下，它回傳的是 `/_releases/openstep-dev/_generations/1` 底下的路徑，CLI 再把它以單純的路徑送到你的伺服器。
- 寫在 HTML 或 CSS 檔案裡的 `/api` 網址也會得到 404。這裡 `openstep dev` 比線上網站更嚴格，因為線上網站會改寫這樣的網址；請改在指令碼裡用 `releaseRuntimePath()` 設定網址。
- 如果你的 App 的 `src/lib/runtime.ts` 是這項檢查出現之前的舊版，這些載入仍會送到你的伺服器，但會有警告。請執行 `openstep pull`：它會把平台檔案的目前版本放回你的資料夾，每次 push 也一樣。
- 任何要求 `text/event-stream` 的 `/api` 請求都會得到 404，即使是線上網站會等你的伺服器結束回應後才回覆的 `fetch` 也一樣。連到 `/api` 的 WebSocket 也會得到 404。
- 只有線上網站會放行的標頭，才會在瀏覽器和你的伺服器之間傳遞。CLI 在捨棄 `Cookie`、`Set-Cookie`、`Location` 或 `Content-Disposition` 時，會發出警告。
- 超過 10 MiB 的請求本文會得到 413。
- `curl` 和其他程式不會送出 `Sec-Fetch-Dest` 標頭，所以針對載入的 404 不適用於它們。

App 的其餘部分，例如頁面和檔案，會照原樣提供。沒有後端的 App 沒有這些規則：它的 `/api` 會送到前端，和線上網站一樣。

## 注意事項

- 這是真實資料：在本機執行時，用的是和工作頁上該 App 的預覽相同的開發資料。你執行的 SQL 會改動那些資料。它不是用完即丟的副本。見 [網站資料](/zh-tw/build/data/)。
- 這會花費 SSU：AI、電子郵件和鏈上呼叫等平台功能照常計費，即使 App 是在你的電腦上執行。見 [查看餘額](/zh-tw/account/balance/)。
- 你的伺服器會把你當成訪客：每個 `/api` 請求都會在 `x-steps-user-address` 標頭裡，帶著你登入 CLI 時使用的錢包。請在瀏覽器裡連接同一個錢包。
- 不要把機密值放進原始碼：CLI 會為每次執行提供它自己的憑證，以及該 App 的環境值。要設定某個值，見 [App、資料與合約](/zh-tw/cli/apps-data-contracts/) 和 [環境值](/zh-tw/build/environment-values/)。
- 你啟動的每個 App 都需要在 `openstep.config.json` 中有一段設定。如果你啟動所有 App，而其中一個沒有設定，指令會停止並指出它。
- 如果你設定的任何一個處理程序結束，`openstep dev` 會停止它啟動的每個 App 並結束指令。非零的結束碼會讓它以錯誤 `App runtime exited with code N` 結束。請閱讀失敗的處理程序自己的輸出，了解原因。
- 設定檔中的路徑必須留在 Agent 資料夾之內。
- `openstep.config.json` 只存在本機。`push` 不會把它送出去。

下一步：[推送與發布](/zh-tw/cli/push-publish/)。
