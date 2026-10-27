---
title: 帶入你現有的程式碼
description: 把你已經做好的網站搬進 Agent 的 App，然後在你自己的程式碼裡使用 OpenStep 登入、電子郵件、AI、鏈上操作和資料。
sidebar:
  order: 8
---

如果你已經有一個網站的程式碼，可以把它搬進 Agent，在 OpenStep 上執行。這樣你的程式碼就能從平台取得錢包登入、電子郵件、AI、鏈上操作和資料庫，並且和其他 App 一樣用 **Publish** 上線。

本頁從一個空資料夾帶你走到一個上線的網站。它假設你已經[安裝 CLI 並登入](/zh-tw/cli/install/)。

## 一個 Agent 包含一個或多個 App

Agent 不是單一網站。它包含一個或多個 **Apps**，每個 App 都是獨立的網站，有自己的程式碼、預覽、資料、設定和上線網址。**Publish** 會讓 Agent 的每個 App 一起上線。圖示見 [運作原理](/zh-tw/start/what-is/#運作原理)。

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

`agent create` 會以 JSON 印出新的 Agent，其中的 `id` 就是 Agent 的 ID。沒有 `--product` 時，Agent 使用 **Web builder**。`agent checkout` 會把 Agent 的各個 App 複製到 `apps/<app-key>/`；新的 Agent 有一個，通常是 `apps/app/`。下面的範例以 `app` 作為 App key；請改用 `apps list` 顯示的那一個。

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
```

這會在 App 裡加上一個 `functions/` 資料夾，並把它帶進你的資料夾：一個起始的 `server.js`、平台的伺服器輔助檔案 `platform.js`、`runtime-config.js` 和 `viem.cjs`，以及 `openapi.json`、`check-openapi.js`、`package.json` 和 `Dockerfile`。請在複製你自己的伺服器程式碼之前先做這一步，這樣你的檔案才會蓋在起始檔案之上。如果你的網站只有頁面，就跳過這一步。

## 3. 把你的程式碼搬進 App

把你的網站複製到 `apps/app/`，取代起始頁面。請保留 App 自己的 `package.json`、`package-lock.json`、`tsconfig.json`、`tsconfig.node.json` 和 `vite.config.ts`：平台檔案需要其中的套件和設定，例如 `wagmi`、`viem`、`@rainbow-me/rainbowkit`、`@tanstack/react-query`、`@supabase/supabase-js`，以及視覺化編輯用到的 `@babel/core`。請在 `apps/app` 裡用 `npm install <package>` 加入你的網站需要的套件，不要用你自己的 `package.json` 覆蓋它；你自己的 Vite 設定也請加進 App 的 `vite.config.ts`。App 需要具備以下結構：

| 部分 | App 需要什麼 |
|---|---|
| 頁面 | App 根目錄下的一組 npm 設定，包含 `package.json` 和 `package-lock.json`。`npm run build` 會把完成的網站寫到 `dist/`，最上層要有 `index.html`。 |
| 瀏覽器讀取的設定 | 以 `VITE_` 開頭的名稱，例如 `VITE_SITE_NAME`，用 [`openstep env`](/zh-tw/cli/apps-data-contracts/) 設定。 |
| 伺服器 | `functions/server.js`，以 `node server.js` 啟動。它監聽 `PORT` 環境變數指定的連接埠，回應 `GET /health`，並在 `/api/` 底下提供你的路由。`functions/package.json` 不列任何相依套件，所以請把你的伺服器用到的 npm 套件打包進 `functions/vendor.cjs`，並在你自己寫在 `server.js` 和 `functions/` 其餘檔案裡的程式碼中 `require('./vendor.cjs')`。見 [打包你的伺服器用到的 npm 套件](#打包你的伺服器用到的-npm-套件)。 |
| 伺服器設定和金鑰 | 用 `functions/runtime-config.js` 裡的 `getVariable('NAME')` 和 `getSecret('NAME')` 讀取，並用 `openstep env` 設定。除了 `process.env.PORT` 和 `process.env.NODE_ENV`，你在 `functions/` 裡自己寫的程式碼不可以讀取 `process.env`：線上的伺服器不在那裡保存任何設定，而且 Publish 會拒絕這個 App。 |
| 呼叫其他服務 | 在伺服器裡呼叫 `functions/platform.js` 的 `externalRequest(url)`，並把每個主機列在 App 值 `BACKEND_EGRESS_HOSTS` 裡（見下方）。 |
| 資料庫資料表 | 用 `openstep data migrate <id> <file> --app app` 建立，例如 `openstep data migrate 0002_add_bookings ./bookings.sql --app app`。名稱不要加 schema（寫 `bookings`，不寫 `public.bookings`），而且只能用 [migration 可以包含什麼](/zh-tw/cli/apps-data-contracts/#migration-可以包含什麼) 列出的陳述式。請保留 `migrations/0001_platform_baseline.sql`，它存放平台自己的資料表。 |

這些路徑屬於平台，所以不要把你自己的頁面放在這些路徑上：`/api/`（送到你的伺服器）、`/auth/`、`/data/`、`/_platform/`、`/__steps/` 和 `/_releases/`。

請保留 App 附帶的平台檔案。你的程式碼會依賴它們：

- 在 App 裡：`src/lib/platform.ts`、`src/lib/useUser.ts`、`src/lib/live-auth.ts`、`src/lib/supabase.ts`、`src/lib/runtime.ts`、`src/lib/wagmi.ts`、`src/main.tsx` 裡的錢包 provider，以及 `migrations/0001_platform_baseline.sql`。
- 在 `functions/` 裡：`platform.js`、`runtime-config.js`、`viem.cjs`、`openapi.json` 和 `check-openapi.js`。

`openstep pull` 和每一次 `openstep push`，都會把平台目前版本的 `src/lib/runtime.ts`、`src/lib/live-auth.ts`、`src/lib/supabase.ts`、`src/lib/useUser.ts`、`functions/platform.js`、`functions/runtime-config.js`、`functions/viem.cjs` 和 `functions/check-openapi.js` 放回你的資料夾，所以請用匯入的方式使用它們，不要編輯它們。`src/lib/platform.ts`、`src/lib/wagmi.ts` 和 `src/main.tsx` 在 App 建立之後就屬於你：可以依需要修改，但請保留其中屬於平台的部分。

以下這些請不要放進資料夾：

- 名稱以 `.env` 開頭的檔案（包括 `.env.example`）、`.npmrc`、`.yarnrc`、金鑰檔案（例如 `*.pem`、`*.key`、`*.p12` 和 `*.pfx`），以及名為 `key`、`keys`、`secret`、`secrets`、`credential` 或 `credentials` 的資料夾。請把它們的值放進環境值。只要其中任何一個還在 App 的資料夾裡，`openstep diff`、`pull` 和 `push` 就會停止，即使 App 的 `.gitignore` 列出的正是這個檔案或資料夾本身也一樣，並在訊息裡指出路徑和原因，例如 `Local source path refused: apps/app/.env.example (a secret-looking file; remove it and put its values in environment values)`。被 `.gitignore` 忽略、而且從未推送過的資料夾，裡面的檔案完全不會被查看。
- `node_modules` 和 `.git`。push 本來就會略過它們。
- `dist/` 之類的建置輸出。Publish 會自己建置網站。

App 資料夾裡的 `.gitignore` 檔案所忽略的路徑，例如 `dist/`，不會出現在 `openstep diff`、`push` 和 `pull` 中，發布時也不算尚未推送的編輯。App 已接受的原始碼本來就有的檔案是例外：它仍會隨每一次 push 送上去，例如舊版 CLI 推上去的 `dist/`。要移除它，請在你的資料夾裡刪除它，然後推送。如果 App 的 `.gitignore` 列出了你的網站需要的檔案（較舊的 App 會列出 `vite.config.js`），請在推送之前移除那一行。

要讓你的伺服器呼叫其他服務，請定義一次 `BACKEND_EGRESS_HOSTS`，並用逗號分隔列出主機：

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

`env define` 會建立這個值，並一併設好它的開發值，`env set` 再設定它的上線值。

### 打包你的伺服器用到的 npm 套件

Publish 會照你推送的原樣執行 `functions/`，不會跑 `npm install`。所以請把你的伺服器用到的 npm 套件放進一個打包好的檔案 `functions/vendor.cjs`，你自己的程式碼則留在 `server.js` 和 `functions/` 的其餘檔案裡。Publish 會檢查你自己的檔案，但不會檢查 `vendor.cjs`。

1. 在 Agent 資料夾裡，於 `apps/` 之外建立一個放套件的資料夾，這樣 push 就永遠不會送出它，然後在那裡連同 esbuild 一起安裝這些套件：

   ```sh
   mkdir server-packages
   cd server-packages
   npm init -y
   npm install express esbuild
   ```

2. 在那個資料夾裡寫一個 `index.js`。它匯出你的伺服器用到的東西：

   ```js
   module.exports = { express: require('express') };
   ```

3. 把它打包進 App，然後回到 Agent 資料夾：

   ```sh
   npx esbuild index.js --bundle --platform=node --format=cjs --outfile=../apps/app/functions/vendor.cjs
   cd ..
   ```

4. 在 `functions/server.js` 裡，從打包檔取用這些套件：

   ```js
   const { express } = require('./vendor.cjs');
   ```

每當你新增或更新套件，請在推送之前再打包一次。Publish 最多接受 128 MiB 的整個 `functions/`（包括 `vendor.cjs`），但每個單一檔案（`vendor.cjs` 也一樣）都要小於 25 MiB：更大的檔案會讓工作頁上該 App 的預覽和 builder 的每一輪都失敗。請確認 App 的 `.gitignore` 沒有忽略 `functions/vendor.cjs`（例如寫了一行 `*.cjs`）：push 會略過它忽略的檔案，打包檔就永遠到不了平台。

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

開啟 `openstep dev` 印出的網址。你的本機網站已經能和平台溝通：它會讀寫 App 的開發資料，AI 和電子郵件也能運作，並照常計費。`openstep dev` 啟動你的伺服器時，會把 `PORT` 設成 `backend` 的連接埠，這裡是 8080。它也會依照線上網站的規則處理 `/api`，並在某個請求到了線上網站會失敗時，向你發出警告。見 [線上網站有哪些不同](#線上網站有哪些不同) 和 [在本機執行 App](/zh-tw/cli/dev/)。

## 線上網站有哪些不同

在線上網站上，你的 App 是在平台的閘道後面執行。與在你自己的伺服器上相比，有幾件事在那裡運作得不一樣：

- 請求本文的上限是 10 MiB。你的伺服器可以接收 JSON、文字、表單和檔案上傳，每個請求最多 10 MiB；更大的請求會得到 413，而且不會送到你的伺服器。較大的檔案請用 App 的檔案儲存：你的伺服器透過 `functions/platform.js` 的 `files.createUpload()` 取得一個上傳連結，頁面再把檔案直接送到那個連結，每個檔案最多 25 MiB。
- 只有部分標頭能通過。從瀏覽器送來的請求，你的伺服器只會收到 `Accept`、`Accept-Language`、`Authorization`、`Content-Type`、`If-Match`、`If-None-Match`、`Range`、`Range-Unit` 和 `User-Agent`，加上平台自己以 `x-steps-` 開頭的標頭。回到瀏覽器的標頭只有 `Accept-Ranges`、`Cache-Control`、`Content-Language`、`Content-Range`、`Content-Type`、`ETag`、`Last-Modified`、`Preference-Applied` 和 `Vary`。
- 沒有 Cookie、重新導向或下載檔名。你的伺服器收不到任何 Cookie，它送出的 `Set-Cookie`、`Location` 和 `Content-Disposition` 標頭也永遠到不了瀏覽器。要知道是誰在呼叫，請用 `useUser()` 登入和 `x-steps-user-address` 標頭（見 [錢包登入](#錢包登入)），或是在 `Authorization` 標頭裡放你自己的 token。不要用重新導向，改回應 JSON，再在瀏覽器裡前往下一頁。要下載檔案時，請在頁面裡取得檔案，再從頁面儲存：

  ```ts
  const blob = await (await fetch('/api/export.csv')).blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'export.csv';
  link.click();
  ```

- 有些指向 `/api` 的網址需要 `releaseRuntimePath()`。線上網站會改寫你的頁面傳給 `fetch`、`XMLHttpRequest` 和 `sendBeacon` 的網址，以及它所提供的 HTML 和 CSS 檔案裡寫的網址。由指令碼設定的網址（例如 React 渲染出來的 `<img>`）、`<a href>` 或 `window.location`，如果指向單純的 `/api` 路徑，就需要用 `src/lib/runtime` 的 `releaseRuntimePath('/api/...')`，否則公開的線上網站會回應 404：

  ```tsx
  import { releaseRuntimePath } from './lib/runtime';

  function Avatar() {
    return <img src={releaseRuntimePath('/api/avatar/1')} alt="" />;
  }
  ```

- 不支援串流。伺服器的回應要等到結束才會送到瀏覽器，而且必須在 60 秒內結束。你的頁面或 `functions/` 裡只要出現 `new EventSource(` 或 `new WebSocket(`，Publish 就會拒絕這個 App。
- 只有你自己的頁面能連到你的伺服器。其他服務無法呼叫它：指向 `/api/` 的 webhook 或登入回呼無法通過。請改讓登入回呼指向你網站的一個頁面，再由那個頁面用 `fetch` 把收到的內容送給你的伺服器。會造成變更的請求，例如 `POST`，也必須來自你網站的頁面。
- 請使用平台的資料用戶端。你自己的資料庫用戶端，例如 `@supabase/supabase-js` 的 `createClient` 或 `supabase.co` 網址，會讓 Publish 拒絕這個 App，`index.html` 裡的 `<base>` 元素也一樣。請改用 `src/lib/supabase` 的 `supabase`（見 [資料](#資料)）。

對有伺服器的 App，`openstep dev` 會依照這些規則處理 `/api`，所以你大多會先在自己的電腦上遇到它們。CLI 第一次以下面的某個 404 或 413 回應，或捨棄下面的某個標頭時，會印出一則以 `openstep:` 開頭的警告，並說明該改什麼：

- 瀏覽器用 `fetch`、`XMLHttpRequest` 或 `sendBeacon` 以外的方式載入單純的 `/api` 網址，會得到 404。如果你的 App 的 `src/lib/runtime.ts` 是這條規則出現之前的舊版，載入仍會通過，但會有警告。請執行 `openstep pull`：它會把平台檔案的目前版本放回你的資料夾。
- 寫在 HTML 或 CSS 檔案裡的 `/api` 網址也會得到 404。這裡 `openstep dev` 比線上網站更嚴格，因為線上網站會改寫這樣的網址；請改在指令碼裡用 `releaseRuntimePath()` 設定網址。
- 任何要求 `text/event-stream` 的 `/api` 請求都會得到 404，即使是線上網站會等你的伺服器結束回應後才回覆的 `fetch` 也一樣。連到 `/api` 的 WebSocket 也會得到 404。
- 只有線上網站會放行的標頭，以及照原樣傳送本文所需的 `Content-Length`、`Transfer-Encoding` 和 `Content-Encoding`，才會在瀏覽器和你的伺服器之間傳遞。CLI 在捨棄 `Cookie`、`Set-Cookie`、`Location` 或 `Content-Disposition` 時，會發出警告。
- 超過 10 MiB 的請求本文會得到 413。
- `curl` 和其他程式不會送出 `Sec-Fetch-Dest` 標頭，所以它們的請求絕不會被當成載入而遭拒絕。
- 來自其他網站的請求，也就是 `Origin` 不是 `openstep dev` 印出的那個網址的請求，一律得到 403，而且不會有警告；用其他名稱連到那個網址的請求也一樣，例如用 `localhost` 而不是 `127.0.0.1`。這是為了不讓其他頁面使用你在本機的憑證。

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

在線上網站上，每個來自已登入訪客的 `/api/` 請求，都會在 `x-steps-user-address` 標頭中帶著他們的錢包位址；訪客登入之前，請求沒有這個標頭。用它來判斷是誰在呼叫。在 `openstep dev` 下，頁面使用你連接的錢包，不需要簽署，而你的伺服器看到的是你登入 CLI 時使用的錢包。請在瀏覽器裡連接同一個錢包。

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

   範本 ID 以小寫字母開頭，並使用小寫字母、數字和 `-`。值的類型是 `text`（最多 200 個字元）或 `url`。`url` 值要以 `href="{{link}}"` 放進連結裡，而且必須是 App 上線網址或其自訂網域上的 `https` 網址。範本裡其他的每個連結或圖片網址，也都必須是這樣的網址，或是 `mailto:` 連結。一個 App 最多可以有 20 個範本。

2. 註冊它們：

   ```sh
   openstep email templates register emails.json --app app
   ```

   檔案路徑是相對於 Agent 資料夾。註冊會把 App 的所有範本，替換成檔案裡的範本。

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

### 為某個動作向使用者收費（課程合作方）

只有 OpenStep 為課程合作方開通的 Agent 才能使用。其他 Agent 呼叫時會被拒絕，錯誤碼是 `partner_charge_not_enabled`。

從你的伺服器，用 `functions/platform.js` 的 `chargeUser`，為你的課程定義的某個動作，向發出這個請求的使用者收取 SSU：

```js
const { chargeUser } = require('./platform');

// 在你的 /api/ 路由裡
try {
  const { chargeId } = await chargeUser({
    headers: req.headers,          // 請求標頭帶著使用者的錢包
    amount: '0.1',                 // SSU，十進位字串
    action: 'Run sandbox payment', // 最多 64 個字元，會顯示在使用者的 Balance 頁面
    idempotencyKey: paymentId,     // 8 到 128 個字元，每筆收費一個
  });
  // 已收費：現在執行付費動作。
} catch (err) {
  if (err.code === 'insufficient_balance') {
    // 請使用者儲值，不要執行付費動作。
  }
}
```

- 誰在用這個 App 就向誰收費，包括 Agent 的擁有者和協作者。只有使用者自己儲值的 SSU 能支付；OpenStep 贈送的 SSU 不能。
- 每筆收費都不會請使用者確認，所以請在使用者使用這個動作之前，在頁面上標明價格。
- 用相同的 `idempotencyKey` 再送一次，不會再收費，並回傳同一個 `chargeId`。同一個 key 用在不同的金額、動作或使用者上，會以 `idempotency_key_reused` 失敗。
- `unknown_wallet` 表示這個錢包沒有 OpenStep 帳戶：請使用者登入 OpenStep 並儲值。`invalid_request` 表示有值缺少或不正確，例如請求裡沒有已登入使用者的錢包。
- 只有使用者已登入時，錢包才會送到你的伺服器（見上方的「錢包登入」）。在 Preview 裡，只有 Agent 的存取設定是 **Learners only**，或 Agent 有角色與任務時才會送出。在 `openstep dev` 下，收費會從你自己的錢包扣除。
- 這筆收費會以 Agent 名稱和動作名稱，顯示在使用者的 Balance 頁面。OpenStep 會與課程合作方分享這筆收入，合作方可以在 **Partner earnings** 頁面看到每一筆收費。

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

第一次 Publish 之前，請以 Agent 擁有者的身分，設定你的程式碼會讀取的上線值。Publish 會用 `npm ci` 和 `npm run build` 建置你的頁面，啟動 `functions/server.js`，檢查 `GET /health` 是否在 30 秒內回應 2xx 或 3xx 狀態，然後讓 App 上線。見 [推送與發布](/zh-tw/cli/push-publish/)。

## 注意事項

- AI 呼叫、電子郵件、鏈上操作，以及你已發布的 App 的執行時間，都以 SSU 向 Agent 的擁有者計費。見 [查看餘額](/zh-tw/account/balance/)。
- `openstep pull` 和每一次 push，都會把平台檔案的目前版本放回你的資料夾。請編輯你自己的檔案，並從平台檔案匯入。
- 等你的網站進了 App 之後，你也可以在工作頁的對話中，或用 `openstep agent chat` 來修改它。builder 處理的是同一份程式碼。

下一步：[SSU 是什麼](/zh-tw/account/what-is-ssu/)。
