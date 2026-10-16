---
title: agent をチェックアウトする
description: agent を作成するか、すでにあるものを選び、そのすべての App をコンピューター上のフォルダーにコピーします。
sidebar:
  order: 3
---

チェックアウトすると、agent のすべての有効な App が新しいフォルダーにコピーされます。以後はそのフォルダーで作業します。

## ターミナルから agent を作成する

ほしい agent がすでにある場合は、この部分は飛ばしてください。

1. 出発点にできる製品を確認します。Marketplace に一覧されているものです。

   ```sh
   openstep catalog
   ```

2. agent を作成します。一覧にあるプロダクトキーを使います。

   ```sh
   openstep agent create "My Agent" --product <product-key>
   ```

   `--product` を省略すると、Web builder から始まります。チームのワークスペースに agent を作成するには、`--workspace <workspace-slug>` を付けます。

agent を作成しても、builder にメッセージは送られません。コマンドは agent の ID を返します。agent が作業を始めるのは、[チャットしたとき](/ja/cli/chat/) です。

## agent をチェックアウトする

1. 開ける agent を一覧し、ほしいものの ID を控えます。特定のワークスペースだけを一覧するには、`--workspace <workspace-slug>` を付けます。

   ```sh
   openstep agent list
   ```

2. フォルダーにチェックアウトします。フォルダーは新規か空である必要があります。

   ```sh
   openstep agent checkout <agent-id> ./my-agent
   ```

   agent の準備がまだ終わっていない場合、コマンドは最大 2 分待ちます。それまでに準備が終わらなければ、もう一度コマンドを実行してください。

3. フォルダーに移動して、App を一覧します。

   ```sh
   cd my-agent
   openstep apps list
   ```

## フォルダーの中身

```
my-agent/
  apps/
    web/
    admin/
  AGENTS.md
  .openstep/
```

- `apps/<app-key>/` には 1 つの App のソースが入っています。App ごとに 1 つのフォルダーがあり、App キーが名前になります。編集はここで行います。
- `AGENTS.md` は、コンピューター上のコーディング agent に、OpenStep のルールとスキルについて `.openstep/instructions/README.md` を読むよう伝えます。CLI はこのファイル内の自分のブロックを最新に保ちます。ブロックの外にあるあなた自身の行は残ります。
- `.openstep/` は CLI 専用の内部管理用です。紐づけた agent、最後に同期したソースのコピー、処理中のリクエストの受領記録が入っています。

## 知っておくこと

- 以後のコマンドは、`apps/web` の中ではなく、このフォルダーから実行してください。
- `.openstep/` の中のものは編集も削除もしないでください。手で変更すると、`diff`、`pull`、`push` が、どれがあなたの変更か判断できなくなります。
- チェックアウトは、フォルダーの `.gitignore` に `.openstep/`、`openstep.config.json`、`/AGENTS.md` を追加するので、これらは git に含まれません。
- チェックアウトは、すでにファイルがあるフォルダーには書き込みません。新しい名前を選んでください。
- 次にできることは、ロールで決まります。オーナーは公開、オーナーとエディターは構築と編集、ビューアーは閲覧ができます。[CLI でできること](/ja/cli/what-it-does/) を参照してください。

次へ：[ターミナルからチャットする](/ja/cli/chat/)。または、先に [App をローカルで実行する](/ja/cli/dev/) へ進んでもかまいません。
