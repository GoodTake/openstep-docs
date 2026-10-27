---
title: 既存のコードを持ち込む
description: すでに作ったサイトを agent の App に移し、自分のコードから OpenStep のサインイン、メール、AI、オンチェーン操作、データを使います。
sidebar:
  order: 8
---

サイトのコードがすでにあるなら、それを agent に移して OpenStep で動かせます。コードはプラットフォームから、ウォレットでのサインイン、メール、AI、オンチェーン操作、データベースを使えるようになり、ほかの App と同じように **Publish** で公開されます。

このページでは、空のフォルダーから公開サイトまでを順に進めます。[CLI をインストールしてサインイン](/ja/cli/install/)済みであることが前提です。

## agent は 1 つ以上の App を持つ

agent は 1 つのサイトではありません。1 つ以上の **Apps** を持ち、各 App は、独自のコード、プレビュー、データ、設定、公開アドレスを持つ別々のサイトです。**Publish** は、agent のすべての App をまとめて公開します。図は [しくみ](/ja/start/what-is/#しくみ) にあります。

agent フォルダーでは、各 App が `apps/` の下に、App キーを名前とした専用のフォルダーを持ちます。

```txt
my-site/
  apps/
    app/      あなたのサイト
    admin/    2 つ目の App（追加した場合）
  openstep.config.json
```

まず、コードを App にどう分けるかを決めます。

- サイトが 1 つ：App も 1 つです。すべてを `apps/app/` に入れます。
- 複数のサイト（たとえば公開サイトと、別の管理サイト）：サイトごとに 1 つの App にします。追加の App は手順 1 で追加し、各サイトはそれぞれのフォルダーに入れます。

各 App は自分のデータ、設定、メールテンプレートを持つので、`env`、`data`、`email`、`capabilities` などのコマンドは、どの App かを示す `--app <app-key>` を取ります。手順 2〜4 は App ごとに行います。フォルダーについての詳細：[フォルダーの中身](/ja/cli/checkout/#フォルダーの中身)。

## 1. サイト用の agent を作成する

```sh
openstep agent create "My site"
openstep agent checkout <agent-id> ./my-site
cd my-site
openstep apps list
```

`agent create` は新しい agent を JSON で表示し、その `id` が agent の ID です。`--product` を付けないと、agent は **Web builder** を使います。`agent checkout` は、agent の App を `apps/<app-key>/` にコピーします。新しい agent の App は 1 つで、通常は `apps/app/` です。以下の例では App キーを `app` としています。`apps list` に表示されたキーを使ってください。

App は、小さく動くサイトと、コードが使うプラットフォームのファイルを持った状態で始まります。手順 3 で、サイトを自分のものに置き換えます。プラットフォームのファイルは残します。

コードが複数のサイトなら、追加のサイトごとに App を 1 つ追加します。キー、タイトル、用途、使う人、ほかの App との違い、そしてケイパビリティを渡します。

```sh
openstep apps add admin --title "Admin" --purpose "Manage bookings" --audience "Shop staff" --boundary "Separate admin site" --capabilities web,server
openstep apps list
```

新しい App には専用のフォルダー（ここでは `apps/admin/`）ができ、同じひな形のサイトとプラットフォームのファイルが入ります。App の追加とアーカイブについての詳細：[App、データ、コントラクト](/ja/cli/apps-data-contracts/#app-を追加またはアーカイブする)。

## 2. サイトにサーバーがあるなら追加する

```sh
openstep capabilities enable server --app app
```

これで App に `functions/` フォルダーが追加され、あなたのフォルダーにも取り込まれます。中身は、サーバーの `server.js` のひな形、プラットフォームのサーバー用ヘルパーの `platform.js`、`runtime-config.js`、`viem.cjs`、そして `openapi.json`、`check-openapi.js`、`package.json`、`Dockerfile` です。自分のサーバーコードをコピーする前に実行してください。そうすると、自分のファイルがひな形の上に重なります。サイトがページだけなら、この手順は飛ばします。

## 3. コードを App に移す

サイトを `apps/app/` にコピーし、ひな形のページを置き換えます。App には次の形が必要です。

| 部分 | App に必要なもの |
|---|---|
| ページ | App のルートにある npm の構成で、`package.json` と `package-lock.json` を含みます。`npm run build` が完成したサイトを `dist/` に書き出し、その最上位に `index.html` を置きます。 |
| ブラウザーが読む設定 | `VITE_` で始まる名前（例：`VITE_SITE_NAME`）。[`openstep env`](/ja/cli/apps-data-contracts/) で設定します。 |
| サーバー | `functions/server.js`。`node server.js` で起動します。環境変数 `PORT` のポートで待ち受け、`GET /health` に応答し、`/api/` の下にルートを提供します。`functions/package.json` には依存関係が書かれていません。サーバーが使う npm パッケージは `functions/vendor.cjs` にバンドルし、`server.js` と `functions/` のほかの自分のコードから `require('./vendor.cjs')` で読み込んでください。[サーバーの npm パッケージをバンドルする](#サーバーの-npm-パッケージをバンドルする) を参照してください。 |
| サーバーの設定とキー | `functions/runtime-config.js` の `getVariable('NAME')` と `getSecret('NAME')` で読み、`openstep env` で設定します。`process.env.PORT` と `process.env.NODE_ENV` を除き、`functions/` にある自分のコードは `process.env` を読んではいけません。公開中のサーバーはそこに設定を持たず、Publish は App を拒否します。 |
| ほかのサービスの呼び出し | サーバーから、`functions/platform.js` の `externalRequest(url)` を呼びます。各ホストは App の値 `BACKEND_EGRESS_HOSTS` に列挙します（下記参照）。 |
| データベースのテーブル | `openstep data migrate <id> <file> --app app` で作成します。たとえば `openstep data migrate 0002_add_bookings ./bookings.sql --app app` です。プラットフォーム自身のテーブルを含む `migrations/0001_platform_baseline.sql` は残してください。[App、データ、コントラクト](/ja/cli/apps-data-contracts/#データ) を参照してください。 |

これらのパスはプラットフォームのものなので、自分のページはここに置かないでください。`/api/`（サーバーに送られます）、`/auth/`、`/data/`、`/_platform/`、`/__steps/`、`/_releases/` です。

App に付いてきたプラットフォームのファイルは残してください。コードはそれらに依存します。

- App 内：`src/lib/platform.ts`、`src/lib/useUser.ts`、`src/lib/live-auth.ts`、`src/lib/supabase.ts`、`src/lib/runtime.ts`、`src/lib/wagmi.ts`、`src/main.tsx` のウォレットプロバイダー、そして `migrations/0001_platform_baseline.sql`。
- `functions/` 内：`platform.js`、`runtime-config.js`、`viem.cjs`、`openapi.json`、`check-openapi.js`。

`openstep pull` を実行したときと、`openstep push` のたびに、`src/lib/runtime.ts`、`src/lib/live-auth.ts`、`src/lib/supabase.ts`、`src/lib/useUser.ts`、`functions/platform.js`、`functions/runtime-config.js`、`functions/viem.cjs`、`functions/check-openapi.js` のプラットフォーム側の現在のバージョンが、フォルダーに戻されます。編集せず、インポートして使ってください。`src/lib/platform.ts`、`src/lib/wagmi.ts`、`src/main.tsx` は、App を作成したあとはあなたのものです。必要に応じて変更し、プラットフォームの部分は残してください。

次のものはフォルダーに入れないでください。

- 名前が `.env` で始まるファイル（`.env.example` も含みます）、`.npmrc`、`.yarnrc`、`*.pem`、`*.key`、`*.p12`、`*.pfx` などのキーファイル、そして `key`、`keys`、`secret`、`secrets`、`credential`、`credentials` という名前のフォルダー。値は環境値に入れてください。これらのどれかが App のフォルダーにある間は、App の `.gitignore` にそのファイルやフォルダー自体が書かれていても、`openstep diff`、`pull`、`push` は停止し、パスと理由を示すメッセージを出します。たとえば `Local source path refused: apps/app/.env.example (a secret-looking file; remove it and put its values in environment values)` です。`.gitignore` が無視していて、一度も push されていないフォルダーの中のファイルは、まったく調べられません。
- `node_modules` と `.git`。push はもともとこれらを除外します。
- `dist/` などのビルド出力。Publish が自分でサイトをビルドします。

App のフォルダーにある `.gitignore` ファイルが無視するパス（たとえば `dist/`）は、`openstep diff`、`push`、`pull` の対象になりません。公開するときも、push していない編集には数えられません。例外は、App の承認済みのソースにすでにあるファイルです。そのファイルは、push のたびに引き続き送られます。たとえば、古い CLI が push した `dist/` です。取り除くには、自分のフォルダーで削除して push してください。App の `.gitignore` に、サイトが必要とするファイルが書かれている場合（古い App では `vite.config.js` が書かれています）は、push の前にその行を削除してください。

サーバーからほかのサービスを呼べるようにするには、`BACKEND_EGRESS_HOSTS` を一度定義し、ホストをカンマ区切りで渡します。

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

`env define` は値を開発用の設定とともに作成し、`env set` は本番用の設定を渡します。

### サーバーの npm パッケージをバンドルする

Publish は `functions/` を、push したとおりに、`npm install` なしで実行します。そのため、サーバーが使う npm パッケージは、バンドルした 1 つのファイル `functions/vendor.cjs` にまとめ、自分のコードは `server.js` と `functions/` のほかのファイルに置いてください。Publish が確認するのは自分のファイルで、`vendor.cjs` は確認しません。

1. agent フォルダーで、パッケージ用のフォルダーを `apps/` の外に作り、push で送られないようにします。そこに、esbuild と一緒にパッケージをインストールします。

   ```sh
   mkdir server-packages
   cd server-packages
   npm init -y
   npm install express esbuild
   ```

2. そのフォルダーに `index.js` を書きます。サーバーが使うものをエクスポートします。

   ```js
   module.exports = { express: require('express') };
   ```

3. App にバンドルして、agent フォルダーに戻ります。

   ```sh
   npx esbuild index.js --bundle --platform=node --format=cjs --outfile=../apps/app/functions/vendor.cjs
   cd ..
   ```

4. `functions/server.js` で、バンドルからパッケージを取り込みます。

   ```js
   const { express } = require('./vendor.cjs');
   ```

パッケージを追加または更新したときは、push の前にもう一度バンドルしてください。Publish は `vendor.cjs` を含む `functions/` 全体を最大 128 MiB まで受け付けますが、ファイルは 1 つずつ、`vendor.cjs` も含めて 25 MiB 未満にしてください。それより大きいファイルがあると、作業ページでの App のプレビューと builder のターンが失敗します。App の `.gitignore` が、`*.cjs` という行などで `functions/vendor.cjs` を無視していないか確認してください。push は無視されたファイルを送らないので、バンドルがプラットフォームに届かなくなります。

## 4. 自分のコンピューターで実行する

agent フォルダーに `openstep.config.json` を作成し、自分のコマンドとポートを書きます。

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

App が複数ある場合は、`"apps"` の下に App ごとにエントリを 1 つ追加し、それぞれ別のポートを割り当てます。`openstep dev` はすべてを起動し、`openstep dev --app admin` は 1 つだけを起動します。

App の依存関係をインストールしてから、起動します。

```sh
cd apps/app && npm install && cd ../..
openstep dev
```

`openstep dev` が表示するアドレスを開きます。ローカルのサイトはすでにプラットフォームとつながっています。App の開発用データを読み書きでき、AI とメールも動き、通常どおり課金されます。`openstep dev` は、`PORT` を `backend` のポート（ここでは 8080）にしてサーバーを起動します。また、`/api` を公開中のサイトのルールで扱い、そこで失敗するリクエストについては警告します。[公開中のサイトでの動作の違い](#公開中のサイトでの動作の違い) と [App をローカルで実行する](/ja/cli/dev/) を参照してください。

## 公開中のサイトでの動作の違い

公開中のサイトでは、App はプラットフォームのゲートウェイの背後で動きます。そのため、自分で用意したサーバーとは動作が異なる点がいくつかあります。

- リクエストボディの上限は 10 MiB です。サーバーは、JSON、テキスト、フォーム、ファイルのアップロードを、1 リクエストあたり 10 MiB まで受け取れます。それより大きいリクエストは 413 になり、サーバーには届きません。大きなファイルには、App のファイルストレージを使います。サーバーが `functions/platform.js` の `files.createUpload()` にアップロード用のリンクを求め、ページがそのリンクに直接ファイルを送ります。1 ファイルあたり 25 MiB までです。
- 通るヘッダーは一部だけです。ブラウザーからサーバーに届くのは、`Accept`、`Accept-Language`、`Authorization`、`Content-Type`、`If-Match`、`If-None-Match`、`Range`、`Range-Unit`、`User-Agent` と、プラットフォーム自身の `x-steps-` ヘッダーだけです。ブラウザーに返るのは、`Accept-Ranges`、`Cache-Control`、`Content-Language`、`Content-Range`、`Content-Type`、`ETag`、`Last-Modified`、`Preference-Applied`、`Vary` だけです。
- Cookie、リダイレクト、ダウンロードのファイル名は使えません。サーバーには Cookie が届かず、サーバーが返す `Set-Cookie`、`Location`、`Content-Disposition` ヘッダーはブラウザーに届きません。誰が呼んでいるかを知るには、`useUser()` によるサインインと `x-steps-user-address` ヘッダー（[ウォレットでのサインイン](#ウォレットでのサインイン) を参照）か、`Authorization` ヘッダーに入れた自分のトークンを使います。リダイレクトの代わりに JSON を返し、次のページへはブラウザーで移動します。ダウンロードでは、ページでファイルを取得し、そこから保存します。

  ```ts
  const blob = await (await fetch('/api/export.csv')).blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'export.csv';
  link.click();
  ```

- `/api` への URL には、`releaseRuntimePath()` が必要なものがあります。公開中のサイトは、ページが `fetch`、`XMLHttpRequest`、`sendBeacon` に渡す URL と、配信する HTML や CSS のファイルに書かれた URL を書き換えます。素の `/api` パスを指す、スクリプトで設定した URL（たとえば React が描画する `<img>`）、`<a href>`、`window.location` には、`src/lib/runtime` の `releaseRuntimePath('/api/...')` が必要です。これがないと、公開サイトは 404 を返します。

  ```tsx
  import { releaseRuntimePath } from './lib/runtime';

  function Avatar() {
    return <img src={releaseRuntimePath('/api/avatar/1')} alt="" />;
  }
  ```

- ストリーミングはできません。サーバーのレスポンスは、終了してはじめてブラウザーに届きます。60 秒以内に終了しなければなりません。ページや `functions/` に `new EventSource(` や `new WebSocket(` があると、Publish は App を拒否します。
- サーバーに届くのは、自分のページからのリクエストだけです。ほかのサービスはサーバーを呼び出せません。`/api/` を指す webhook やサインインのコールバックは届きません。代わりに、サインインのコールバックはサイトのページに向け、そのページが受け取った内容を `fetch` でサーバーに送らせてください。`POST` のように何かを変更するリクエストも、サイトのページから送られたものでなければなりません。
- プラットフォームのデータクライアントを使ってください。`@supabase/supabase-js` の `createClient` や `supabase.co` のアドレスのような自前のデータベースクライアントがあると、Publish は App を拒否します。`index.html` に `<base>` 要素があるときも同じです。代わりに `src/lib/supabase` の `supabase` を使ってください（[データ](#データ) を参照）。

サーバーのある App では、`openstep dev` が `/api` をこれらのルールで扱うので、ほとんどは、まず自分のコンピューターで確認できます。各種類のリクエストが最初に失敗したとき、CLI は `openstep:` で始まる警告を表示し、何を変えるべきかを伝えます。

- ブラウザーが `fetch`、`XMLHttpRequest`、`sendBeacon` 以外の方法で読み込む素の `/api` URL は、404 になります。App の `src/lib/runtime.ts` がこのルールより前のバージョンの場合、読み込みは警告付きで通ります。`openstep pull` を実行してください。プラットフォームのファイルの現在のバージョンが、フォルダーに戻されます。
- HTML や CSS のファイルに書かれた `/api` の URL も 404 になります。この場合、`openstep dev` は、そうした URL を書き換える公開中のサイトより厳格です。代わりに、スクリプトで `releaseRuntimePath()` を使って URL を設定してください。
- `text/event-stream` を求める `/api` リクエストは、すべて 404 になります。サーバーがレスポンスを終えれば公開中のサイトが応答するはずの `fetch` でも同じです。`/api` への WebSocket も同様です。
- ブラウザーとサーバーの間を通るのは、公開中のサイトが通すヘッダーと、ボディを送られたとおりに運ぶ `Content-Length`、`Transfer-Encoding`、`Content-Encoding` だけです。CLI は、`Cookie`、`Set-Cookie`、`Location`、`Content-Disposition` を取り除いたときに警告します。
- 10 MiB を超えるリクエストボディは 413 になります。
- `curl` などのプログラムは `Sec-Fetch-Dest` ヘッダーを送らないので、それらのリクエストが読み込みとして拒否されることはありません。

## 5. コードから OpenStep を使う

### ウォレットでのサインイン

ブラウザーでは、`src/lib/useUser` の `useUser()` が訪問者のウォレットを返します。

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

`signIn()` は、訪問者に Base で無料の署名を 1 回承認してもらいます。ウォレットのボタンは、`src/main.tsx` のプロバイダーから提供されます。

公開中のサイトでは、サインインした訪問者からの `/api/` リクエストすべてに、そのウォレットアドレスが `x-steps-user-address` ヘッダーで付きます。サインインする前は、このヘッダーはありません。誰が呼んでいるかは、これで判断します。`openstep dev` では、ページは接続したウォレットを署名なしで使い、サーバーには、CLI にサインインしたウォレットが見えます。ブラウザーでも同じウォレットを接続してください。

### メール

1. テンプレートを JSON ファイルに書きます。`{{name}}` は、送信時に埋める値の印です。

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

   テンプレート ID は小文字で始まり、小文字、数字、`-` を使います。値の型は `text`（200 文字まで）か `url` です。`url` の値はリンクの中に `href="{{link}}"` として入れ、App の公開アドレスかカスタムドメイン上の `https` の URL でなければなりません。テンプレート内のほかのリンクや画像の URL も、そうした URL か、`mailto:` のリンクでなければなりません。1 つの App には最大 20 個のテンプレートを置けます。

2. 登録します。

   ```sh
   openstep email templates register emails.json --app app
   ```

   ファイルのパスは、agent フォルダーからの相対パスです。登録すると、App のすべてのテンプレートが、ファイルにあるものに置き換わります。

3. ブラウザー（`src/lib/platform`）またはサーバー（`functions/platform.js`）から送信します。

   ```ts
   import { sendEmail } from './lib/platform';

   await sendEmail({
     template: 'booking-confirmed',
     to: 'guest@example.com',
     data: { name: 'Alex', time: '19:00', shop: 'The Cozy Coffee Table' },
   });
   ```

   1 通のメッセージを送れる宛先は最大 5 件です。

### AI

```ts
import { invokeAI } from './lib/platform';

const text = await invokeAI({ prompt: 'Write a one-line welcome for a coffee shop.' });
const menu = await invokeAI({ prompt: 'Suggest three drinks.', schema: { type: 'object' } });
```

`invokeAI` はテキストを返します。`schema` に JSON Schema を渡すと、パース済みの JSON が返ります。ブラウザー（`src/lib/platform`）とサーバー（`functions/platform.js`）のどちらからでも使えます。

### オンチェーン操作

サーバーから、`functions/platform.js` の `sendTransaction` で Base にトランザクションを送ります。

```js
const { sendTransaction, publicClient } = require('./platform');

await sendTransaction({ to: contractAddress, data: callData, idempotencyKey: `order-${orderId}` });
```

送信するのは agent のオーナーのアカウントで、ガスも SSU で支払われます。同じ `idempotencyKey` で再度送っても、新しい送信は行われません。1 つのトランザクションで複数の呼び出しを実行するには、代わりに `calls: [{ to, data }, …]` を渡します。チェーンの読み取りは、同じファイルの `publicClient` か `rpc()` で行います。読み取りは無料です。

### 操作ごとにユーザーへ課金する（コースパートナー）

OpenStep がコースパートナー向けに有効にした agent でだけ使えます。それ以外の agent で呼び出すと、`partner_charge_not_enabled` で拒否されます。

サーバーから、`functions/platform.js` の `chargeUser` で、コースが定めた操作について、リクエストを送ったユーザーに SSU で課金します。

```js
const { chargeUser } = require('./platform');

// /api/ のルートの中で
try {
  const { chargeId } = await chargeUser({
    headers: req.headers,          // リクエストヘッダーにユーザーのウォレットが入っている
    amount: '0.1',                 // SSU、10 進数の文字列
    action: 'Run sandbox payment', // 64 文字まで。ユーザーの Balance ページに表示される
    idempotencyKey: paymentId,     // 8〜128 文字。課金ごとに 1 つ
  });
  // 課金済み：ここで有料の操作を行う。
} catch (err) {
  if (err.code === 'insufficient_balance') {
    // ユーザーに Top up を頼み、有料の操作は行わない。
  }
}
```

- App を使っている人に課金されます。agent のオーナーや共同作業者も例外ではありません。支払えるのはユーザーが自分で Top up した SSU だけで、OpenStep から贈られた SSU は使えません。
- 課金のたびにユーザーへ確認は求めません。ユーザーがその操作を使う前に、ページに価格を表示してください。
- 同じ `idempotencyKey` で再度送っても新たな課金はされず、同じ `chargeId` が返ります。同じキーを別の金額、操作、ユーザーに使うと `idempotency_key_reused` で失敗します。
- `unknown_wallet` は、そのウォレットに OpenStep アカウントがないことを意味します。ユーザーに OpenStep へのサインインと Top up を頼んでください。`invalid_request` は値が欠けているか正しくないことを意味します。たとえば、サインインしたユーザーのウォレットがリクエストに含まれていない場合です。
- ウォレットがサーバーに届くのは、ユーザーがサインインしているときだけです（上の「ウォレットでのサインイン」を参照）。Preview では、agent のアクセスが **Learners only** のとき、または agent にロールとミッションがあるときだけ送られます。`openstep dev` では、自分のウォレットから課金されます。
- 課金はユーザーの Balance ページに、agent の名前と操作名で表示されます。OpenStep は収益をコースパートナーと分け合い、パートナーは **Partner earnings** ページで各課金を確認できます。

### データ

ブラウザーでは、`src/lib/supabase` の `supabase` で App のテーブルを読み書きします。

```ts
import { supabase } from './lib/supabase';

const { data } = await supabase.from('bookings').select('*');
```

テーブルの作成と変更は `openstep data migrate` で行います。ローカルとプレビューでは開発用データを使います。公開したサイトには、専用のデータがあります。

## 6. push して公開する

```sh
openstep diff
openstep push
openstep publish --note "First release"
openstep status <operation-id>
```

最初の Publish の前に、agent のオーナーとして、コードが読む本番の値を設定してください。Publish は `npm ci` と `npm run build` でページをビルドし、`functions/server.js` を起動し、`GET /health` が 30 秒以内に 2xx か 3xx のステータスで応答することを確認してから、App を公開します。[push と公開](/ja/cli/push-publish/) を参照してください。

## 知っておくこと

- AI の呼び出し、メール、オンチェーン操作、そして公開した App が動いている時間は、agent のオーナーに SSU で課金されます。[残高を確認する](/ja/account/balance/) を参照してください。
- `openstep pull` を実行したときと、push のたびに、プラットフォームのファイルの現在のバージョンが、フォルダーに戻されます。自分のファイルを編集し、プラットフォームのファイルからはインポートして使ってください。
- サイトが App に入ったあとは、作業ページのチャットや `openstep agent chat` からも変更できます。builder は同じコードを扱います。

次へ：[SSU とは](/ja/account/what-is-ssu/)。
