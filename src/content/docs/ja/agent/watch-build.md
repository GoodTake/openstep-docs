---
title: 構築を見守る
description: チャットと Console で構築をタスクごとに追い、一時停止、停止、続行をします。
sidebar:
  order: 4
---

計画を承認すると、agent はそれを 1 つずつタスクにして構築します。そのまま放っておいても、各タスクの実行を見守ってもかまいません。

1. チャットボックスの上のバーを見ます。**Building · 0 of 6 done** と、作業中のタスクの名前が表示され、タスクが終わるごとに数が増えていきます。右のプレビューカードは、**Thinking**、**Planning**、**Writing code**、**Preview & test**、**Done** と進みます。
2. **View build** をクリックします。App ビューの代わりに、右側で **Console** が **Build** セクションを開きます。**Building** と **Pause**、**Stop**、終わったタスクの数、構築の経過時間、構築に使っている製品のバージョンが表示されます。
3. **Tasks** タブを開きます。タスクごとに 1 行あり、実行順に、番号、名前、属する App、ラウンド、実行時間が表示されます。実行中のタスクは「Round 1 · running」と表示されます。タスクは 1 つずつ実行されるので、その下のものは順番を待ちます。
4. Console の右上の **✕** をクリックして閉じると、App ビューに戻ります。**View build** や、ヘッダーの **Console** からリストの **Build** を選べば、いつでも戻れます。

   ![Build セクションを開いた Console。Building と Pause、Stop、0 of 6 done、6 つのタスクを一覧した Tasks タブで、1 つ目が実行中。](/images/agent/watch-build-1.webp)

この実行での 6 つのタスクは、順に、フィットネスの土台を整える、公開用のトレーニングページを作る、ワークアウトと履歴の機能を実装する、エクササイズのイラストを生成する、体の変化の記録を実装する、そしてすべての App にわたる最終チェックでした。

**Tasks** の隣の **Plan** と **Apps** タブには、承認した計画と、それが構築する App が表示されます。**Code** や **Files** など、Console の他のセクションは左のリストにありますが、構築を追うだけなら必要ありません。

## 一時停止、停止、続行

操作は Console とチャットボックスの横に表示されます。

- **Pause** は構築を保留にします。ボタンは **Continue** に変わります。
- **Continue** は同じ構築を続けます。
- **Stop** は構築を終わらせます。先に確認が出ます。「Stop this build? Finished tasks are kept. Your next Brainstorm starts a new plan.」（この構築を停止しますか。終わったタスクは残ります。次の Brainstorm は新しい計画から始まります。）確定するなら **Stop the build**、やめるなら **Cancel** をクリックします。停止したあとは、次の **Brainstorm** のメッセージが、新しい計画で新しい構築を始めます。ひと休みしたいだけなら、**Pause** を使ってください。

構築中は、チャットボックスのメッセージ欄の代わりに **Pause** と **Stop** が表示されます。「Building — Pause or Stop to change direction.」新しく何かを伝えるには、先に一時停止か停止をして、そのあとメッセージを送ります。一時停止中にメッセージを送ると、**Stop** と同じようにその構築は終了します。

## 構築が自分で止まるとき

ときどき、あなたなしでは進められないタスクがあります。構築は止まり、何を待っているかを知らせます。

- 質問：チャットで答えると、構築は自動で続きます。
- あなたにしか渡せない値：ダイアログが求めます。[計画を承認する](/ja/agent/approve-plan/) を参照してください。

構築は、プラットフォーム側の問題で止まることもあります。このときバーに **Platform issue** と表示され、Console の **Build** には次のように書かれます。「The build is paused on a platform problem. It is listed for the platform team and continues once they fix it. Nothing for you to do. To change direction, stop the build.」（構築はプラットフォームの問題で一時停止しています。プラットフォームチームに共有されており、修正されると続行します。あなたがすることはありません。方向を変えるには、構築を停止してください。）待っていれば、問題が直ったところで構築は自動で続きます。

チャットに **Reconnecting…** が長く出続けるときは、ページを再読み込みしてください。構築はサーバー上で動き続けています。

## 構築が終わるとき

最後のタスクが終わり、最終レビューが済むと、構築は公開できる状態になります。

1. チャットボックスの上のバーが **Ready to publish** に変わり、「0 findings · 0 parked」の行と **View build** が付きます。この実行では、どちらの数も 0 でした。
2. その下に緑のボックスが現れます。「The build finished. Publish from the top bar puts every app live together.」その中の **Show the review** をクリックすると、最終レビューを読めます。
3. ヘッダーの **Publish** ボタンが明るくなります。
4. Console の **Build** には、**Ready to publish** と「Publish from the top bar puts every app live together. Data and learner progress stay as they are.」と表示されます。その下の **MECHANICAL CHECKS** に各チェックが並び、すべて **Passed** と表示されます。**REVIEW FINDINGS** には最終レビュー（「The reviewer reported no findings.」）が、**PARKED TASK RULINGS** には None と表示されます。

最終レビューの指摘は、**REVIEW FINDINGS** に一覧されます。公開する前に、今すぐ **Preview** でアプリを試せます。

## 知っておくこと

- 構築には時間がかかります。この構築は、プラットフォーム側の問題での一時停止を 1 回含めて、承認から **Ready to publish** まで約 75 分かかりました。agent は各タスクを次に進む前に確認し、チェックに失敗すれば修復するので、1 回では終わらないタスクもあります。
- 構築の **Pause**、**Stop**、**Continue** ができるのは、オーナーとエディターだけです。ビューアーは見守れます。
- 構築の実行中や一時停止中は公開できません。構築が止まるか終わると、**Publish** が使えるようになります。[公開と共有](/ja/agent/publish-and-share/) を参照してください。

次へ：[アプリを使う](/ja/agent/use-your-app/)。
