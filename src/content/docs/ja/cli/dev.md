---
title: App をローカルで実行する
description: 各 App の起動方法を記述し、openstep dev でフロントエンドとバックエンドを自分のコンピューターで実行します。
sidebar:
  order: 5
---

`openstep dev` は、agent の実際の開発用データにつないだまま、App を自分のコンピューターで起動します。各 App の起動方法は、`openstep.config.json` というファイルで伝えます。

## 準備

1. agent フォルダーに `openstep.config.json` を作成します。実行したい App ごとに、App キーを名前にしたエントリを 1 つ追加します。

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

   - `cwd` は App のフォルダーで、agent フォルダーからの相対パスです。
   - `frontend` と `backend` はそれぞれ `command` と `port` を取ります。`command` はリストで、最初がプログラム、続いて引数です。`cwd` の中で実行されます。
   - フロントエンドだけの App では `backend` を省略します。
   - プロセスごとに別のポートを割り当てます。

   App に実際にあるスクリプトとポートを使ってください。`package.json` を確認します。上のものは例にすぎません。

2. 各 App の依存関係を、その App のフォルダーでインストールします。

   ```sh
   cd apps/web
   npm install
   cd ../..
   ```

## 実行

1. agent フォルダーから、設定にあるすべての App を起動します。

   ```sh
   openstep dev
   ```

   1 つの App だけを起動するには：

   ```sh
   openstep dev --app web
   ```

2. CLI が各 App のアドレスを表示します。そのアドレスをブラウザーで開いてください。フロントエンド自身のポートは開かないでください。CLI が表示するアドレスが、App をプラットフォームにつなぐものです。
3. エディターで `apps/web` のファイルを編集します。フロントエンドの開発サーバーが、通常どおり変更を反映します。
4. 止めるには Ctrl-C を押します。CLI がプロセスを停止し、接続を解放します。

## 知っておくこと

- **実際のデータです。** ローカルでの実行は、作業ページでの App のプレビューと同じ開発用データを使います。実行した SQL はそのデータを変更します。使い捨てのコピーではありません。[サイトのデータ](/ja/build/data/) を参照してください。
- **SSU がかかります。** AI、メール、チェーン呼び出しなどのプラットフォームの機能は、App が自分のコンピューターで動いていても、通常どおり課金されます。[残高を確認する](/ja/account/balance/) を参照してください。
- **シークレットをソースに入れないでください。** CLI は、実行ごとに専用の認証情報と、その App の環境値を渡します。値を設定するには、[App、データ、コントラクト](/ja/cli/apps-data-contracts/) と [環境値](/ja/build/environment-values/) を参照してください。
- 起動するすべての App には、`openstep.config.json` にエントリが必要です。すべての App を起動したときにエントリのないものがあると、コマンドは停止して、その App 名を示します。
- 設定したプロセスのどれかが終了すると、`openstep dev` は起動したすべての App を停止し、コマンドを終了します。終了コードが 0 以外の場合は、`App runtime exited with code N` というエラーで終わります。原因は、失敗したプロセス自身の出力を読んで確認してください。
- 設定内のパスは、agent フォルダーの中に収まっている必要があります。
- `openstep.config.json` はローカル専用です。`push` では送られません。

次へ：[push と公開](/ja/cli/push-publish/)。
