---
title: 進捗を見る
description: builder の作業中にチャットとプレビューカードに表示されるものと、ターンの止め方。
sidebar:
  order: 6
---

メッセージを送るとターンが始まり、builder は終わるまで作業を続けます。進み具合は、左のチャットと右のプレビューカードの 2 か所で見られます。

1. チャットのステップを読みます。builder は行う作業を、**Run a command**、**Read**、**Edit**、**Update the plan** などの 1 行として表示し、伝えることがあるときはその間に短いメモを挟みます。
2. builder の返信の下のステータス行を読みます。builder の準備中は **Preparing** から始まります。すべての枠が埋まっていると **Waiting for a free build slot** と表示されることがあり、そのあと **Thinking**、**Planning**、**Building** と進み、タイマーが付きます（例：**Building · 2:39**）。1 分間新しい動きがないと、**Still working — this step can take a few minutes** が加わります。
3. 右のプレビューカードを見ます。**Thinking**、**Planning**、**Writing code**、**Preview & test**、**Done** が表示され、終わるごとにチェックされていきます。サイトの準備ができると、カードの場所にサイトが表示されます。
4. ステータス行が **Done** になり、終了からの経過時間が続くと、ターンは終了です。builder の最後のメッセージに、何が変わったかが書かれています。

![進行中の Build ターン。左に builder のステップと Building のステータス行、右に Writing code が進行中のプレビューカード。](/images/build/progress-1.webp)

## ターンを止める

builder が作業している間は、別のメッセージを送れません。止めるには、送信の矢印があった場所の赤い停止ボタンをクリックします。ステータス行は **Cancelled** になります。作業はサーバー上で動いているので、ステータス行に **Reconnecting…** が長く出続けるときは、ページを再読み込みすれば続きから表示されます。

## ターンが失敗したとき

ステータス行が赤くなり、何が起きたかを平易な言葉で伝えます。同じメッセージをもう一度送れば解決しそうな場合は、**Retry** が表示されます。SSU が足りなくなった場合はそう表示され、**Top up balance** が出ます。[SSU を入手する](/ja/start/get-ssu/) を参照してください。

## 知っておくこと

- 計画を承認すると始まる **Brainstorm** の構築では、チャットボックスの上に専用の進捗バーが表示されます。**Building · 0 of 6 done** と、**Pause**、**Stop**、**View build** です。[構築を見守る](/ja/agent/watch-build/) を参照してください。
- 変更は公開中のサイトではなく、Preview に表示されます。[サイトをプレビューする](/ja/build/preview/) を参照してください。

次へ：[サイトをプレビューする](/ja/build/preview/)。
