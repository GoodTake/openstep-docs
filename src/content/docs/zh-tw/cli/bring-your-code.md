---
title: 帶入你現有的程式碼
description: 把你已經做好的網站搬進 Agent 的 App，然後在你自己的程式碼裡使用 OpenStep 登入、電子郵件、AI、鏈上操作和資料。
sidebar:
  order: 8
---

如果你已經有一個網站的程式碼，可以把它搬進 Agent，在 OpenStep 上執行。這樣你的程式碼就能從平台取得錢包登入、電子郵件、AI、鏈上操作和資料庫，並且和其他 App 一樣用 **Publish** 上線。

本頁從一個空資料夾帶你走到一個上線的網站。它假設你已經[安裝 CLI 並登入](/zh-tw/cli/install/)。

## 一個 Agent 包含一個或多個 App

Agent 不是單一網站。它包含一個或多個 **Apps**，每個 App 都是獨立的網站，有自己的程式碼、預覽、資料、設定和上線網址。**Publish** 會讓 Agent 的每個 App 一起上線。圖示見 [各部分如何組合](/zh-tw/start/what-is/#各部分如何組合)。

在 Agent 資料夾中，每個 App 在 `apps/` 底下都有自己的資料夾，以 App key 命名：

```txt
my-site/
  apps/
    app/      你的網站
    admin/    第二個 App，如果你有新增
  openstep.config.json
```

所以請先決定你的程式碼要怎麼分成 App：

- 一個網站：一個 App。全部放進 `apps/app/`。
- 好幾個網站，例如一個公開網站和一個獨立的後台網站：每個一個 App。你在第 1 步新增多出來的 App，每個網站放進自己的資料夾。

每個 App 都有自己的資料、設定和電子郵件範本，所以 `env`、`data`、`email` 和 `capabilities` 之類的指令要用 `--app <app-key>` 指明你指的是哪個 App。第 2 到 4 步要對每個 App 各做一次。資料夾的更多說明：[資料夾裡有什麼](/zh-tw/cli/checkout/#資料夾裡有什麼)。

## 1. 為你的網站建立一個 Agent

```sh
openstep agent create "My site"
openstep agent checkout <agent-id> ./my-site
cd my-site
openstep apps list
```

`agent create` 會印出新 Agent 的 ID。沒有 `--product` 時，Agent 使用 **Web builder**。`agent checkout` 會把 Agent 的各個 App 複製到 `apps/<app-key>/`；新的 Agent 有一個，通常是 `apps/app/`。下面的範例以 `app` 作為 App key；請改用 `apps list` 顯示的那一個。

App 一開始是一個能運作的小網站，加上你的程式碼會用到的平台檔案。你會在第 3 步用自己的網站取代那個小網站，並保留平台檔案。

如果你的程式碼是好幾個網站，請為每個多出來的網站新增一個 App。給它一個 key、一個標題、它的用途、誰使用它、它和其他 App 有何不同，以及它的功能（capabilities）：

```sh
openstep apps add admin --title "Admin" --purpose "Manage bookings" --audience "Shop staff" --boundary "Separate admin site" --capabilities web,server
openstep apps list
```

新的 App 會有自己的資料夾，這裡是 `apps/admin/`，內含相同的起始網站和平台檔案。新增和封存 App 的更多說明：[App、資料與合約](/zh-tw/cli/apps-data-contracts/#新增或封存-app)。

## 2. 如果你的網站有伺服器，請加上伺服器

```sh
openstep capabilities enable server --app app
openstep pull
```

這會在 App 裡加上一個 `functions/` 資料夾，內有一個起始的 `server.js` 和平台的伺服器輔助檔案。請在複製你自己的伺服器程式碼之前先做這一步，這樣你的檔案才會蓋在起始檔案之上。如果你的網站只有頁面，就跳過這一步。

## 3. 把你的程式碼搬進 App

把你的網站複製到 `apps/app/`，取代起始頁面。App 需要具備以下結構：

| 部分 | App 需要什麼 |
|---|---|
| 頁面 | App 根目錄下的一組 npm 設定，包含 `package.json` 和 `package-lock.json`。`npm run build` 會把完成的網站寫到 `dist/`，最上層要有 `index.html`。 |
| 瀏覽器讀取的設定 | 以 `VITE_` 開頭的名稱，例如 `VITE_SITE_NAME`，用 [`openstep env`](/zh-tw/cli/apps-data-contracts/) 設定。 |
| 伺服器 | `functions/server.js`，以 `node server.js` 啟動。它監聽 `PORT` 環境變數指定的連接埠，回應 `GET /health`，並在 `/api/` 底下提供你的路由。`functions/package.json` 不列任何相依套件，所以如果你的伺服器用了 npm 套件，請在推送之前把它們打包進 `server.js`。 |
| 伺服器設定和金鑰 | 用 `functions/runtime-config.js` 裡的 `getVariable('NAME')` 和 `getSecret('NAME')` 讀取，並用 `openstep env` 設定。 |
| 呼叫其他服務 | 在伺服器裡呼叫 `functions/platform.js` 的 `externalRequest(url)`，並把每個主機列在 App 值 `BACKEND_EGRESS_HOSTS` 裡（見下方）。 |
| 資料庫資料表 | 用 `openstep data migrate` 建立。見 [App、資料與合約](/zh-tw/cli/apps-data-contracts/)。 |

這些路徑屬於平台，所以不要把你自己的頁面放在這些路徑上：`/api/`（送到你的伺服器）、`/auth/`、`/data/`、`/_platform/`、`/__steps/` 和 `/_releases/`。

請保留 App 附帶的平台檔案。你的程式碼會從它們匯入：

- 在 App 裡：`src/lib/platform.ts`、`src/lib/useUser.ts`、`src/lib/live-auth.ts`、`src/lib/supabase.ts`、`src/lib/runtime.ts`、`src/lib/wagmi.ts`，以及 `src/main.tsx` 裡的錢包 provider。
- 在 `functions/` 裡：`platform.js`、`runtime-config.js` 和 `viem.cjs`。

`openstep pull` 會把其中大多數檔案換回平台自己的版本，所以請用匯入的方式使用它們，不要編輯它們。

以下這些請不要放進資料夾：

- `.env` 檔案、`.npmrc`、金鑰和其他憑證檔案。`openstep push` 會拒絕它們；請把它們的值放進環境值。
- `node_modules` 和 `.git`。push 本來就會略過它們。
- `dist/` 之類的建置輸出。Publish 會自己建置網站。

要讓你的伺服器呼叫其他服務，請定義一次 `BACKEND_EGRESS_HOSTS`，並用逗號分隔列出主機：

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app
openstep env set BACKEND_EGRESS_HOSTS --app app --environment development --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

## 4. 在你的電腦上執行

在 Agent 資料夾中建立 `openstep.config.json`，填入你自己的指令和連接埠：

```json
{
  "apps": {
    "app": {
      "cwd": "apps/app",
      "frontend": { "command": ["npm", "run", "dev"], "port": 5173 },
      "backend": { "command": ["node", "functions/server.js"], "port": 8080 }
    }
  }
}
```

有好幾個 App 時，在 `"apps"` 底下為每個 App 各加一段設定，各自使用自己的連接埠。`openstep dev` 會啟動全部；`openstep dev --app admin` 只啟動一個。

安裝 App 的相依套件，然後啟動它：

```sh
cd apps/app && npm install && cd ../..
openstep dev
```

開啟 `openstep dev` 印出的網址。你的本機網站已經能和平台溝通：它會讀寫 App 的開發資料，AI 和電子郵件也能運作，並照常計費。錢包登入要在已發布的網站上進行。見 [在本機執行 App](/zh-tw/cli/dev/)。

## 5. 在你的程式碼裡使用 OpenStep

### 錢包登入

在瀏覽器裡，`src/lib/useUser` 的 `useUser()` 會給你訪客的錢包：

```tsx
import { useUser } from './lib/useUser';

function Account() {
  const { wallet, needsSignIn, signIn, loading } = useUser();
  if (loading) return null;
  if (!wallet) return <p>Connect a wallet to continue.</p>;
  if (needsSignIn) return <button onClick={signIn}>Sign in</button>;
  return <p>Signed in as {wallet}</p>;
}
```

`signIn()` 會請訪客在 Base 上核准一次免費簽署。錢包按鈕來自 `src/main.tsx` 裡的 provider。

在你的伺服器上，每個來自已登入訪客的 `/api/` 請求，都會在 `x-steps-user-address` 標頭中帶著他們的錢包位址。用它來判斷是誰在呼叫。

### 電子郵件

1. 把你的範本寫在一個 JSON 檔案裡。`{{name}}` 標記一個你在寄信時填入的值：

   ```json
   {
     "templates": [
       {
         "templateId": "booking-confirmed",
         "html": "<p>Hi {{name}}, your table is booked for {{time}}.</p>",
         "manifest": {
           "subject": "Your booking at {{shop}}",
           "slots": {
             "name": { "type": "text" },
             "time": { "type": "text" },
             "shop": { "type": "text" }
           }
         }
       }
     ]
   }
   ```

   範本 ID 使用小寫字母、數字和 `-`。值的類型是 `text`（最多 200 個字元）或 `url`，而 `url` 值要以 `href="{{link}}"` 放進連結裡。一個 App 最多可以有 20 個範本。

2. 註冊它們：

   ```sh
   openstep email templates register emails.json --app app
   ```

3. 從瀏覽器（`src/lib/platform`）或伺服器（`functions/platform.js`）寄出：

   ```ts
   import { sendEmail } from './lib/platform';

   await sendEmail({
     template: 'booking-confirmed',
     to: 'guest@example.com',
     data: { name: 'Alex', time: '19:00', shop: 'The Cozy Coffee Table' },
   });
   ```

   一封郵件最多寄給 5 位收件人。

### AI

```ts
import { invokeAI } from './lib/platform';

const text = await invokeAI({ prompt: 'Write a one-line welcome for a coffee shop.' });
const menu = await invokeAI({ prompt: 'Suggest three drinks.', schema: { type: 'object' } });
```

`invokeAI` 會回傳文字。傳入 JSON Schema 作為 `schema`，就能拿回解析好的 JSON。它可以在瀏覽器（`src/lib/platform`）和伺服器（`functions/platform.js`）使用。

### 鏈上操作

從你的伺服器，用 `functions/platform.js` 的 `sendTransaction` 在 Base 上送出一筆交易：

```js
const { sendTransaction, publicClient } = require('./platform');

await sendTransaction({ to: contractAddress, data: callData, idempotencyKey: `order-${orderId}` });
```

它由 Agent 擁有者的帳戶送出，gas 以 SSU 支付。用相同的 `idempotencyKey` 再送一次，不會送出任何新的東西。改為傳入 `calls: [{ to, data }, …]`，可以在一筆交易裡執行多個呼叫。用同一個檔案裡的 `publicClient` 或 `rpc()` 讀取鏈上資料；讀取是免費的。

### 資料

在瀏覽器裡，`src/lib/supabase` 的 `supabase` 可以讀寫 App 的資料表：

```ts
import { supabase } from './lib/supabase';

const { data } = await supabase.from('bookings').select('*');
```

用 `openstep data migrate` 建立和修改資料表。在本機和預覽中，你使用的是開發資料；上線的網站有它自己的資料。

## 6. 推送與發布

```sh
openstep diff
openstep push
openstep publish --note "First release"
openstep status <operation-id>
```

第一次 Publish 之前，請以 Agent 擁有者的身分，設定你的程式碼會讀取的上線值。Publish 會用 `npm ci` 和 `npm run build` 建置你的頁面，啟動 `functions/server.js`，檢查 `/health`，然後讓 App 上線。見 [推送與發布](/zh-tw/cli/push-publish/)。

## 注意事項

- AI 呼叫、電子郵件、鏈上操作，以及你已發布的 App 的執行時間，都以 SSU 向 Agent 的擁有者計費。見 [查看餘額](/zh-tw/account/balance/)。
- `openstep pull` 會還原平台檔案。請編輯你自己的檔案，並從平台檔案匯入。
- 等你的網站進了 App 之後，你也可以在工作頁的對話中，或用 `openstep agent chat` 來修改它。builder 處理的是同一份程式碼。

下一步：[SSU 是什麼](/zh-tw/account/what-is-ssu/)。
