---
title: App、データ、コントラクト
description: App の追加とアーカイブ、環境値の設定、開発用データへの SQL の実行、App が使うスマートコントラクトのデプロイ。
sidebar:
  order: 7
---

これらのコマンドは、ソースファイル以外も変更します。どれも 1 つの App に対して動くので、ほとんどが `--app <app-key>` を取ります。agent フォルダーから実行してください。

## App を追加またはアーカイブする

1. agent が持っている App を確認します。

   ```sh
   openstep apps list
   ```

2. App を追加します。最初に App の説明を渡すので、agent は、なぜ別の App なのかを把握できます。

   ```sh
   openstep apps add admin --title "Admin" --purpose "Manage records" --audience "Owners" --boundary "Separate management UI" --capabilities web,server
   ```

   - `admin` は App キーです。フォルダー名 `apps/admin` になります。小文字、数字、ダッシュを使います。
   - `--title` は App の名前です。`--name` も使えます。
   - `--purpose`、`--audience`、`--boundary` で、App の目的、使う人、ほかの App の一部にしない理由を伝えます。
   - `--capabilities` は、`web`、`server`、`contract` をカンマ区切りで指定します。

   プラットフォームが新しい App を受け付けると、CLI はそのフォルダーを agent フォルダーに pull します。

3. App を退役させるには、アーカイブします。App の履歴は残り、コンピューター上のフォルダーも残ります。

   ```sh
   openstep apps archive admin
   ```

App の追加とアーカイブは、オーナーとエディターができます。CLI がローカルへのコピーを完了できなかった場合は、`openstep pull` を実行してください。

## 環境値

環境値は、App が読み取る設定で、たとえばアドレスやキーです。名前、種類（`variable` か `secret`）、そして読み取れる場所（`frontend`、`backend`、`builder`）を持ちます。

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

- `env list` は、各値の名前、種類、値が設定済みかどうかを表示します。シークレットは表示しません。
- `env define` は値を作成します。名前には大文字、数字、アンダースコアを使います。
- `env set` は、定義済みの値に新しい値を設定します。`env clear` はそれを消去します。
- `env targets` は、値を読み取れる場所を変更します。`env delete` は、誰も使わなくなった定義を削除します。
- ターゲットには 2 つの規則があります。`frontend` ターゲットには `variable` の種類と `VITE_` で始まる名前が必要で、`VITE_` で始まる名前は `frontend` をターゲットにしなければなりません。シークレットが `builder` をターゲットにすることはなく、変数が `builder` をターゲットにできるのは、チェーンのアドレスを保持している場合か、チェーンの RPC URL を保持する `BASE_RPC_URL` の場合だけです。
- `--environment` は `development` か `production` です。省略すると、コマンドは `development` を使います。
- シークレットをコマンドラインで渡すことはありません。CLI が非表示入力で尋ねるか、標準入力から読み取ります。シークレットに `--value` を使うと拒否されます。

値の定義、ターゲットの変更、削除は、オーナーが行います。エディターは開発用の値を設定または消去できます。本番の値はオーナー向けです。

`env` の代わりに `environment` も使えます。開発用と本番用の値の違いは、[環境値](/ja/build/environment-values/) を参照してください。

## データ

App の開発用データに対して SQL を実行します。

```sh
openstep data sql --app admin --sql "select 1"
openstep data sql --app admin ./query.sql
```

SQL は、`--sql` で渡すか、ファイルパスで渡すか、標準入力で渡せます。最大 64 KiB です。これは実際の開発用データで、App のプレビューが使うデータと同じです。

テーブルの作成や変更のように、データの形を変える SQL は、ここでは拒否されます。代わりにマイグレーションを使ってください。

```sh
openstep data migrate 0002_add_bookings ./migration.sql --app admin
```

- マイグレーション ID は `0002_add_bookings` のような形で、4 桁以上の数字、アンダースコア、小文字の名前の順です。
- ファイルは UTF-8 のテキストで、最大 4 MiB です。
- コマンドは最初に pull するので、競合があれば先に解決してから実行してください。そのあと、SQL を App のソースとともに保存し、App の開発用データに適用します。

エディターとオーナーは、どちらも実行できます。開発用データと公開中のデータがどのように分かれているかは、[サイトのデータ](/ja/build/data/) を参照してください。

## ケイパビリティ

```sh
openstep capabilities list --app admin
openstep capabilities enable contract --app admin
```

`list` は、App が有効にしているものと、使えるプラットフォームの機能を表示します。`enable` は App にケイパビリティを追加します。`web`、`server`、`contract` のいずれかです。ケイパビリティを CLI から無効にすることはできません。どちらのコマンドもオーナー向けです。

## コントラクト

ここでのコントラクトは、いずれかの App が使うスマートコントラクトのことです。コンパイルし、登録し、デプロイの費用を確認してから、Base にデプロイします。準備と見積もりは無料です。デプロイには SSU がかかります。見積もりとデプロイはオーナー専用です。

1. App の Foundry 環境でコントラクトをコンパイルします。

   ```sh
   cd apps/admin/contract
   forge build
   cd ../../..
   ```

2. コンパイルしたコントラクトを登録します。トランザクションは送られず、費用もかかりません。エディターもできます。

   ```sh
   openstep contracts prepare Token --app admin --artifact contract/out/Token.sol/Token.json --constructor-args contract/args.json --owner-arg-index 3
   ```

   - `Token` は自分で付ける名前です。以降のコマンドで使います。
   - `--artifact` は、コントラクトの Foundry の JSON ファイルです。`abi` と `bytecode.object` を含んでいる必要があります。
   - `--constructor-args` は任意です。文字列のリストを持つ JSON ファイルで、たとえば `["MyToken", "MTK", "1000000000000000000000"]` です。コンストラクターが引数を取らない場合に限り、省略できます。
   - `--owner-arg-index` は任意です。オーナーの Smart Account アドレスを受け取るコンストラクター引数の位置を、0 から数えて指定します。その引数は、自分で渡すリストには入れません。
   - 2 つのファイルパスは、どちらも App のフォルダーからの相対パスです。各ファイルは、最大 4 MiB の通常のファイルである必要があります。

3. 見積もりを取ります。コントラクトがデプロイされる場所と、デプロイにかかる SSU の上限が表示されます。先に進む前に、両方を確認してください。

   ```sh
   openstep contracts quote Token --app admin
   ```

4. デプロイします。`--confirm true` がないと、コマンドは拒否されます。同じ名前に対して、このフォルダーから `quote` を実行していない場合も拒否されます。

   ```sh
   openstep contracts deploy Token --app admin --confirm true
   ```

   上限を設けるには、`--max-fee <units>` を付けます。見積もりがそれより高いと、デプロイは中止されます。見積もりと `--max-fee` は、SSU を基本単位で数えます。1 SSU は 1000000000000000000 単位です。

   デプロイが確認されると、CLI は更新されたコードをフォルダーに pull します。

5. 状態は、いつでも確認できます。これは読み取りだけで、何も送りません。

   ```sh
   openstep contracts status --app admin
   ```

デプロイが途中で切れて結果がわからないときは、先に `openstep contracts status --app admin` を実行してください。CLI が自分でデプロイを二重に送ることはありません。

`contracts` の代わりに `contract` も使えます。

## 知っておくこと

- CLI がコントラクトをコンパイルしてくれることはありません。渡された JSON ファイルを読むだけです。
- シークレットやトークンは、ソースファイルに入れないでください。環境値を使います。
- SSU を使うものは、すべて残高に反映されます。[残高を確認する](/ja/account/balance/) を参照してください。

次へ：[既存のコードを持ち込む](/ja/cli/bring-your-code/)。
