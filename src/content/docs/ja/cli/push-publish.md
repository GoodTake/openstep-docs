---
title: push と公開
description: push で変更を agent に保存し、publish ですべての App をまとめて公開します。
sidebar:
  order: 6
---

push と公開は、2 つの別のステップです。push はソースを agent に保存します。publish は、保存したソースを公開します。push が公開までしてしまうことはありません。

どちらも agent 全体に作用するので、すべての App がまとめて動きます。

## 変更を保存する

1. 何が変わったかを確認します。各 App について、あなたのフォルダーと agent の承認済みのソースを比較します。前回の同期以降に agent 側が変わったかどうかも表示されます。たとえば builder がターンを終えた場合です。

   ```sh
   openstep diff
   ```

2. agent 側の新しい変更を取り込みます。pull は agent の承認済みの変更をフォルダーにマージし、あなた自身の編集を上書きしません。

   ```sh
   openstep pull
   ```

3. pull が競合を報告したら、ファイルを開いて、残したいテキストを残します。バイナリファイルは、残したい版を選びます。そのあと、そのファイルが解決済みであることを CLI に伝えます。競合しているファイルごとに行ってください。

   ```sh
   openstep resolve apps/web/src/App.tsx
   ```

4. push します。

   ```sh
   openstep push
   ```

   これで agent はあなたの変更をソースとして保持します。公開中のバージョンは変わりません。

## 公開する

公開はオーナー向けです。

1. publish を実行します。メモは任意です。1 〜 500 文字で指定します。

   ```sh
   openstep publish --note "First release"
   ```

   publish には、すべての App が同期済みで、競合がなく、push していない編集がないことが必要です。publish が代わりに push することはありません。ローカルのソースに未公開の編集があると表示された場合は、diff を確認して、先に push してください。

2. 結果を確認します。publish コマンドが返した操作 ID を使います。ステータスが `succeeded` になれば、publish は完了です。

   ```sh
   openstep status <operation-id>
   ```

   ID を付けない `openstep status` は、最後に開始した publish、rollback、unpublish、republish を読みます。それがなければ、agent の状態を読みます。

公開してもデータは保持されます。公開された App を誰が開けるか、訪問者に何が見えるかは、[公開と共有](/ja/agent/publish-and-share/) を参照してください。

## ロールバック、unpublish、republish

これらも agent 全体に作用します。`--app` オプションはありません。どれも任意の `--note` を取ります。

```sh
openstep rollback <generation-id> --note "Restore prior release"
openstep unpublish --note "Take the agent offline"
openstep republish --note "Bring back the last live version"
```

- rollback は、agent がまだ保持している以前のリリースを復元します。publish が成功すると、作成したリリースの ID が報告されます。
- unpublish はすべての App をオフラインにします。
- republish は、unpublish でオフラインにしたバージョンを元に戻します。

ブラウザーで同じ操作をするには、[公開する](/ja/build/go-live/) を参照してください。

## 結果が不明なとき

ネットワークの切断などで push や publish が途中で切れると、成功したかどうかわからないことがあります。新しく始め直さないでください。

- 同じフォルダーから、同じコマンドをもう一度実行します。CLI は送ったリクエストを記憶していて、何が起きたかをプラットフォームに問い合わせます。変更が二重に送られることはありません。
- publish の場合、`openstep status <operation-id>` で同じ操作を読めます。
- push で、変更は受け付けられたがまだ同期中と表示された場合は、publish する前に `openstep pull` を実行します。
- 公開系のコマンドが保留中の間は、どの公開系コマンドを実行しても、保留中のものを読むだけです。別のものは始まりません。
- push が保留中の間は、publish は開始を拒否します。先に push を終わらせてください。
- `.openstep/` はそのままにしてください。行き詰まりを解消しようとして、中のファイルを削除しないでください。

## 知っておくこと

- push はオーナーとエディター向けです。公開、ロールバック、unpublish、republish はオーナー向けです。
- builder が計画された構築を実行している間、agent は読み取り専用です。終わるのを待ってから `pull` し、そのあと push してください。
- `diff`、`push`、`pull` は、App のフォルダーにある `.gitignore` ファイルが無視するファイル（たとえば `dist/`）を対象にしません。ただし、agent の承認済みのソースにすでにあるファイルは別で、Git が追跡済みのファイルを扱うのと同じです。公開するときも、これらは push していない編集には数えられません。そうしたファイルを承認済みのソースから取り除くには、自分のフォルダーで削除して push してください。
- 名前が `.env` で始まるファイル、`.npmrc`、キーファイルなどがあると、`.gitignore` に書かれていても、`diff`、`pull`、`push` は停止します。[コードを App に移す](/ja/cli/bring-your-code/#3-コードを-app-に移す) を参照してください。

次へ：[App、データ、コントラクト](/ja/cli/apps-data-contracts/)。
