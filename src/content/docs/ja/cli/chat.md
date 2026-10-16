---
title: ターミナルからチャットする
description: ターミナルを離れずに、builder と話し、質問に答え、計画を承認し、構築を一時停止または停止します。
sidebar:
  order: 4
---

`openstep agent chat` は、agent の builder に 1 件のメッセージを送ります。作業ページで話しかけるのと同じ builder です。CLI はターンの進行をそのまま表示します。ターンが終わるか、builder があなたから何かを必要としたとき（質問、承認待ちの計画、提供してほしい値）に停止します。

agent のオーナーかエディターである必要があります。構築には、作業ページと同じく SSU がかかります。

## メッセージを送る

1. モードを選びます。先に作りたいものを話し合うには `brainstorm` を使います。builder にすぐ agent を変更させるには `build` を使います。[Build と Brainstorm](/ja/build/modes/) を参照してください。

   ```sh
   openstep agent chat "Add a page where guests can book a table" --mode brainstorm
   ```

   `--mode` を付けない場合、メッセージは `build` で実行されます。

2. どの App とファイルを見ているかを builder に伝えるには、`--app` と `--path` を付けます。これはヒントであって制限ではありません。builder はほかの App も変更することがあります。

   ```sh
   openstep agent chat "Make this header sticky" --mode build --app web --path src/App.tsx
   ```

3. CLI はターンのイベントをターミナルに書き出し、最後にターン ID とステータスを表示して終わります。ターン ID は控えておいてください。質問への回答や再開に必要です。

## 質問に答える

Brainstorm では、builder が一連の質問をします。出力の質問イベントにはリクエスト ID が付いています。

```sh
openstep agent question --turn <turn-id> --request <request-id> --answers '[["Option A"],["Yes"]]'
```

`--answers` は JSON のリストで、質問ごとに 1 つの内側のリストを持ちます。質問に答えないときは、`--answers` の代わりに `--reject true` を使います。

## 計画を承認する

builder が承認待ちの計画を表示すると、出力に計画とそのハッシュが含まれます。承認するか、変更を求めます。

```sh
openstep agent plan approve --hash <plan-hash>
openstep agent plan request-changes --hash <plan-hash> --comment "Leave out the admin page"
```

`request-changes` には `--comment` が必要です。`approve` ではコメントは任意です。これは、作業ページの [計画を承認する](/ja/agent/approve-plan/) と同じステップです。

## 求められた値を渡す

計画によっては、API キーのように、あなたしか渡せない値を宣言していることがあります。何が求められ、何をすでに渡したかを確認するには、次を実行します。

```sh
openstep agent plan values --app <app-key>
```

値を渡すには、次のコマンドを実行し、求められたら値を入力します。入力は画面に表示されず、チャットの記録にも保存されません。標準入力から値をパイプで渡すこともできます。

```sh
openstep agent plan value <name> --app <app-key>
```

builder は、構築の途中で止まって入力を求めることもあります。出力にある入力リクエスト ID で答えます。

```sh
openstep agent input <input-request-id> --choice <option>
openstep agent input <input-request-id> --text "your answer"
```

`--choice` と `--text` を省略すると、上と同じように非表示入力で値を渡します。

構築があるタスクで止まって質問してきた場合は、出力にあるタスクキーで答えます。

```sh
openstep agent task-answer <task-key> --text "your answer"
```

## 構築を一時停止、再開、停止する

```sh
openstep agent pause
openstep agent continue
openstep agent stop
```

`openstep agent stop --turn <turn-id>` は 1 つのターンを停止します。操作の結果が不明だと CLI に表示された場合は、やり直す前に `openstep status` で agent の状態を確認してください。

## ターンを再開する

接続が切れたり、ターミナルを閉じたりしても、ターンはプラットフォーム上で動き続けます。CLI はメッセージを送る前に、ターン ID を `.openstep/chat.json` に保存します。見守りを続けるには、ターンを再開します。

```sh
openstep agent chat --turn <turn-id>
openstep agent chat
```

2 番目の形は、CLI が保存したターンを使います。復旧のために同じメッセージを再送しないでください。2 つ目のターンが始まってしまいます。以前のチャットを読むには、次を実行します。

```sh
openstep agent chat --history true
```

## 知っておくこと

- builder が終わったら、`openstep pull` で変更を手元のフォルダーに取り込みます。自分の編集を push するのは、そのあとにしてください。[push と公開](/ja/cli/push-publish/) を参照してください。
- `--json` を付けると、ストリームの代わりに、機械で読める結果が 1 つ返ります。

次へ：[App をローカルで実行する](/ja/cli/dev/)。
