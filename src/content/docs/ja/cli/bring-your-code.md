---
title: 既存のコードを持ち込む
description: すでに作ったサイトを agent の App に移し、自分のコードから OpenStep のサインイン、メール、AI、オンチェーン操作、データを使います。
sidebar:
  order: 8
---

サイトのコードがすでにあるなら、それを agent に移して OpenStep で動かせます。コードはプラットフォームから、ウォレットでのサインイン、メール、AI、オンチェーン操作、データベースを使えるようになり、ほかの App と同じように **Publish** で公開されます。

このページでは、空のフォルダーから公開サイトまでを順に進めます。[CLI をインストールしてサインイン](/ja/cli/install/)済みであることが前提です。

## 1. サイト用の agent を作成する

```sh
openstep agent create "My site"
openstep agent checkout <agent-id> ./my-site
cd my-site
openstep apps list
```

`agent create` は新しい agent の ID を表示します。`--product` を付けないと、agent は **Web builder** を使います。`agent checkout` は、agent の App を `apps/<app-key>/`（通常は `apps/app/`）にコピーします。以下の例では App キーを `app` としています。`apps list` に表示されたキーを使ってください。

App は、小さく動くサイトと、コードが使うプラットフォームのファイルを持った状態で始まります。手順 3 で、サイトを自分のものに置き換えます。プラットフォームのファイルは残します。

## 2. サイトにサーバーがあるなら追加する

```sh
openstep capabilities enable server --app app
openstep pull
```

これで App に `functions/` フォルダーが追加され、サーバーの `server.js` のひな形と、プラットフォームのサーバー用ヘルパーが入ります。自分のサーバーコードをコピーする前に実行してください。そうすると、自分のファイルがひな形の上に重なります。サイトがページだけなら、この手順は飛ばします。

## 3. コードを App に移す

サイトを `apps/app/` にコピーし、ひな形のページを置き換えます。App には次の形が必要です。

| 部分 | App に必要なもの |
|---|---|
| ページ | App のルートにある npm の構成で、`package.json` と `package-lock.json` を含みます。`npm run build` が完成したサイトを `dist/` に書き出し、その最上位に `index.html` を置きます。 |
| ブラウザーが読む設定 | `VITE_` で始まる名前（例：`VITE_SITE_NAME`）。[`openstep env`](/ja/cli/apps-data-contracts/) で設定します。 |
| サーバー | `functions/server.js`。`node server.js` で起動します。環境変数 `PORT` のポートで待ち受け、`GET /health` に応答し、`/api/` の下にルートを提供します。`functions/package.json` には依存関係が書かれていません。サーバーが npm パッケージを使う場合は、push の前にそれらを `server.js` にバンドルしてください。 |
| サーバーの設定とキー | `functions/runtime-config.js` の `getVariable('NAME')` と `getSecret('NAME')` で読み、`openstep env` で設定します。 |
| ほかのサービスの呼び出し | サーバーから、`functions/platform.js` の `externalRequest(url)` を呼びます。各ホストは App の値 `BACKEND_EGRESS_HOSTS` に列挙します（下記参照）。 |
| データベースのテーブル | `openstep data migrate` で作成します。[App、データ、コントラクト](/ja/cli/apps-data-contracts/) を参照してください。 |

これらのパスはプラットフォームのものなので、自分のページはここに置かないでください。`/api/`（サーバーに送られます）、`/auth/`、`/data/`、`/_platform/`、`/__steps/`、`/_releases/` です。

App に付いてきたプラットフォームのファイルは残してください。コードはそれらからインポートします。

- App 内：`src/lib/platform.ts`、`src/lib/useUser.ts`、`src/lib/live-auth.ts`、`src/lib/supabase.ts`、`src/lib/runtime.ts`、`src/lib/wagmi.ts`、そして `src/main.tsx` のウォレットプロバイダー。
- `functions/` 内：`platform.js`、`runtime-config.js`、`viem.cjs`。

`openstep pull` は、これらの大半をプラットフォーム側のバージョンに戻します。編集せず、インポートして使ってください。

次のものはフォルダーに入れないでください。

- `.env` ファイル、`.npmrc`、キーなどの認証情報のファイル。`openstep push` は受け付けません。値は環境値に入れてください。
- `node_modules` と `.git`。push はもともとこれらを除外します。
- `dist/` などのビルド出力。Publish が自分でサイトをビルドします。

サーバーからほかのサービスを呼べるようにするには、`BACKEND_EGRESS_HOSTS` を一度定義し、ホストをカンマ区切りで渡します。

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app
openstep env set BACKEND_EGRESS_HOSTS --app app --environment development --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

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

App の依存関係をインストールしてから、起動します。

```sh
cd apps/app && npm install && cd ../..
openstep dev
```

`openstep dev` が表示するアドレスを開きます。ローカルのサイトはすでにプラットフォームとつながっています。App の開発用データを読み書きでき、AI とメールも動き、通常どおり課金されます。ウォレットでのサインインは、公開したサイトで行います。[App をローカルで実行する](/ja/cli/dev/) を参照してください。

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

サーバーでは、サインイン済みの訪問者からの `/api/` リクエストすべてに、そのウォレットアドレスが `x-steps-user-address` ヘッダーで付きます。誰が呼んでいるかは、これで判断します。

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

   テンプレート ID には、小文字、数字、`-` を使います。値の型は `text`（200 文字まで）か `url` で、`url` の値はリンクの中に `href="{{link}}"` として入れます。1 つの App には最大 20 個のテンプレートを置けます。

2. 登録します。

   ```sh
   openstep email templates register emails.json --app app
   ```

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

最初の Publish の前に、agent のオーナーとして、コードが読む本番の値を設定してください。Publish は `npm ci` と `npm run build` でページをビルドし、`functions/server.js` を起動し、`/health` を確認してから、App を公開します。[push と公開](/ja/cli/push-publish/) を参照してください。

## 知っておくこと

- AI の呼び出し、メール、オンチェーン操作、そして公開した App が動いている時間は、agent のオーナーに SSU で課金されます。[残高を確認する](/ja/account/balance/) を参照してください。
- `openstep pull` はプラットフォームのファイルを元に戻します。自分のファイルを編集し、プラットフォームのファイルからはインポートして使ってください。
- サイトが App に入ったあとは、作業ページのチャットや `openstep agent chat` からも変更できます。builder は同じコードを扱います。

次へ：[SSU とは](/ja/account/what-is-ssu/)。
