---
title: 計画を承認する
description: agent が作成した計画を読み、承認するか、変更を依頼します。承認するまで、何も構築されません。
sidebar:
  order: 3
---

あなたの答えを受けて、agent は構築の計画を作成します。承認するまで何も構築されないので、計画が望みどおりかを確かめるのはこのタイミングです。

1. 計画を待ちます。作成中は、右のプレビューカードに **Planning** と「Drafting the build plan」と表示されます。この例では約 8 分かかりました。準備ができると、チャットボックスの上にバーが現れます。**Plan ready · 6 tasks** で、「1 finding · 0 open questions」のような行と **View build** ボタンが付きます。その下に、**Show the plan**、**Approve plan**、**Request changes** のあるボックスがあります。

   ![Plan ready · 6 tasks のバーと、その下の Show the plan、Approve plan、Request changes。チャットボックスには、計画があなたの判断を待っていると表示されている。](/images/agent/approve-plan-1.webp)

2. **Show the plan** をクリックして計画を読みます。**Hide the plan** をクリックすると、また畳まれます。

   ![展開した計画。Awaiting your approval と表示された Build plan、カウンター 1 App、6 Tasks、0 Missions、0 Contracts、そして Review & setup セクション。](/images/agent/approve-plan-2.webp)

3. 判断します。
   - **Approve plan** をクリックすると、構築が始まります。バーが **Building · 0 of 6 done** に変わり、今のタスクの名前とタイマーが表示されます。チャットボックスには「Building — Pause or Stop to change direction.」と **Pause**、**Stop** が表示されます。続きは [構築を見守る](/ja/agent/watch-build/) へ進みます。
   - **Request changes** をクリックすると、計画が差し戻されます。変えてほしい点をチャットボックスに書いて送信します。先に何かをクリックしなくても、チャットボックスに直接入力できます。agent は計画し直し、新しい計画を見せます。その間、何も構築されません。

**Approve plan** と **Request changes** は、開いた計画の一番下にも繰り返し表示されるので、上までスクロールして戻る必要はありません。

## 計画に表示されるもの

- **Build plan**。**Awaiting your approval** と表示され、**App**、**Tasks**、**Missions**、**Contracts** のカウンターが付きます。この agent は **1 App** を **6 Tasks** で構築します。Missions と Contracts は、コースを運営する agent やブロックチェーンのコントラクトを使う agent 向けなので、ここでは 0 です。
- **REVIEW & SETUP**：計画はあなたが見る前に、自動レビューですべて確認されます。コメントがあるときは指摘として一覧され、セクションに「1 needs you」と表示されます。承認する前に読んでください。この例では、レビューの結果は **Approved with findings** で、計画を止めるような指摘はありませんでした。
- **WHAT THIS BUILDS**：「Tasks run one at a time, in this order.」タスクは App ごとにまとめられ、それぞれに 1 文の成果と、通過すべきチェックが付きます。この計画のあるタスクには「Let a signed-in person start a day, save individual sets, finish a workout and inspect their own history.」と書かれています。最後のグループ **Cross-app & integration** には、App どうしが連携して動くかの最終チェックが入っています。

## agent があなたに値を求めるとき

計画によっては、API キーや受け取り用のウォレットなど、あなたにしか渡せないものが必要です。agent がこれらをでっち上げることはありません。構築を続ける前に、ダイアログが値を求めます。

1. ダイアログには値の名前が付き、何に使うかが書かれています。値は App の環境値に、開発用と本番用の両方として保存されます。
2. 値を入力します。シークレットは入力中に隠れます。
3. **Provide and continue** をクリックします。構築は自動で続きます。

**Not now** をクリックすると、構築は待ちます。チャットには「The builder needs … to continue.」というメモが残り、ダイアログをもう一度開く **Provide** ボタンが付きます。まだ渡していない値は、Console の **Environment** にある **Requested by the build** にも一覧されます。

代わりに、いくつかの選択肢から選ぶよう求められることもあります。その場合は「Or write your own answer」と書かれたボックスに、自分の答えを書けます。

Health & fitness の agent は値を必要としないので、聞かれません。外部のサービスを呼び出す agent では必要になります。

## 知っておくこと

- 計画の承認、変更の依頼、値の提供ができるのは、agent のオーナーとエディターだけです。ビューアーは計画を読めます。[他の人と作業する](/ja/agent/work-with-others/) を参照してください。
- 計画の作成中は、チャットボックスにメッセージ欄の代わりに **Pause** と **Stop** が表示されます。[構築を見守る](/ja/agent/watch-build/) を参照してください。
- agent の作業には、計画も含めて SSU がかかります。

次へ：[構築を見守る](/ja/agent/watch-build/)。
