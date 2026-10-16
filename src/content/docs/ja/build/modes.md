---
title: Build と Brainstorm
description: Build はサイトをすぐに変更します。Brainstorm は質問して計画を作り、承認後に構築します。
sidebar:
  order: 3
---

送るメッセージは、必ず 2 つのモードのどちらかで実行されます。**Build** はサイトを直接変更します。**Brainstorm** は先に質問をして計画を作ります。モードは **New agent** の **Build** / **Brainstorm** の切り替えで選び、あとからはチャットボックスのチップで変えられます。

1. チャットボックス下部のチップをクリックします。モデルとモードが表示されています（例：**Auto · Build**）。
2. **Run mode**（**Choose how the agent works**）で、**Build**（**Changes it directly.**）か **Brainstorm**（**Asks, plans, then builds task by task.**）を選びます。
3. メッセージを送ります。ボックスのヒントはモードに応じて変わります。**Build** では **Tell me what you want to build**、**Brainstorm** では **Describe it — I'll ask a few questions first** です。

![開いたチャットボックスのチップ。Select model に Auto、その下に Choose model、さらに Run mode があり、Build が選択され、その下に Brainstorm がある。](/images/build/modes-1.webp)

## Build

builder は依頼を読み、サイトを変更し、結果を確認して、何をしたかを伝えます。最初のメッセージでも、計画は書かず、承認も待ちません。agent のすべての App を見て、どれを変更するかを判断します。変更は Preview に表示されます。**Publish** するまで、公開中のサイトはそのままです。

何がほしいかが決まっていて、変更が小さいか明確なときは **Build** を使います。たとえば、コーヒーショップのような最初の小さなサイト、新しいページ、見出しの変更、営業時間の変更です。

## Brainstorm

builder は 1 回以上のラウンドで質問をします。そのあと計画を作り、あなたが承認するまで止まります。承認すると、計画をタスクごとに構築し、各タスクを確認して、最終レビューで締めくくります。そこで **Publish** できる状態になります。質問と計画の扱いは [計画を承認する](/ja/agent/approve-plan/) を参照してください。

アイデアがまだ固まっていないときや、計画がほしいほどサイトが大きいときは **Brainstorm** を使います。たとえば、注文も受けて確認メールも送るコーヒーショップです。

既存の文章、名前、数字、色、画像を変えるだけの小さな編集には、計画は要りません。**Brainstorm** でも、builder はすぐに変更します。

## 知っておくこと

- モードはメッセージの合間に変えられますが、builder が作業している間は変えられません。ターンが終わるまで、チップはグレー表示です。
- **Brainstorm** の構築には、専用の操作（**Pause** と **Stop**）と専用の進捗があります。[進捗を見る](/ja/build/progress/) を参照してください。
- **Build** で始めて、変更が思ったより大きいとわかったときに **Brainstorm** へ切り替えることもできます。

次へ：[欲しいものを伝える](/ja/build/describe/)。
