---
title: 公開と共有
description: agent を公開して公開リンクを得て、誰が開けるかを選び、まっさらな状態にしたいときは新しいセッションを始めます。
sidebar:
  order: 6
---

公開すると、agent のすべての App が、ほかの人に送れるアドレスでまとめて公開されます。agent を公開できるのは、オーナーだけです。

## はじめて公開する

1. ヘッダーの **Publish** をクリックします。構築が終わるとボタンが明るくなります。グレー表示のときは、横の行が理由を教えてくれます。たとえば agent がまだ構築中なら、「Publishing opens once the build stops.」と表示されます。
2. ダイアログを読みます。ダイアログの名前は **Publish your agent** で、「Every app of this agent goes live together.」と表示されます。**What happens next** の下に **Check** › **Build** › **Go live** と「You can keep working while it runs.」が表示されます。その下の「Publish 1 app · Data and learner progress stay as they are.」に、各 App が状態付きで一覧され、初回は **Not live yet** です。ボタンの上の **Show the review** を開くと、構築の最終レビューが展開されます。

   ![Three Day Strength の Publish your agent ダイアログ。Check、Build、Go live のある What happens next、Not live yet と表示された Three Day Strength の行、Show the review、Cancel と Publish ボタン。](/images/agent/publish-and-share-1.webp)

3. **Publish** をクリックします。ダイアログが閉じ、右下にカードが現れて **Publishing…** と 3 つのステップ **Check your agent**、**Build and test every app**、**Switch every app live together** が表示されます。実行中は、ヘッダーの **Publish** ボタンがグレー表示になります。チャットでの作業はそのまま続けられます。この App 1 つの公開には約 1 分半かかりました。
4. カードが **Your agent is live** に変わると、各 App の名前とアドレスが表示され、開くボタンとリンクをコピーするボタンが付きます。アドレスは `https://app-….openstep.academy` のような形です。

## リンクを共有する

アプリを試してほしい人に、カードのアドレスを送ります。あとで Console の **Production** でも確認できます。日時付きの **Live since** と、その横の **Unpublish** が表示され、続いて各 App の公開アドレスと **Copy invitation** があります。これは App のリンクが入った短いメッセージをコピーするので、貼り付けて送れます。**Versions** では、公開中のバージョンに **Live** の印が付きます。

![Publish 後の Console の Production。Unpublish の付いた Live since 16 Oct 2026, 8:13 pm、Three Day Strength の公開アドレス、Copy invitation、Live の印が付いたバージョンのある Versions。](/images/agent/publish-and-share-2.webp)

リンクを開いた人は誰でも App を見られます。ワークアウト、体重、体の寸法の記録を残すには、訪問者がそれぞれ自分のウォレットでサインインし、自分の記録だけを見ます。

## 誰が開けるかを選ぶ

**Console** を開き、**Settings** を選びます。**Access** は **Collaborators** の下にあります。変更できるのはオーナーだけです。変更はすぐに反映され、データには触れません。

- **Anyone with the link** は、アドレスを知っている人なら誰でもアプリを開けます。**Health & fitness** で選ばれているのはこちらです。
- **Learners only** は、参加リンクで参加した学習者と、agent の共同作業者だけが開けます。このモードでは、カスタムドメインは配信されません。これを選ぶと、**Copy invitation** には、学習者が最初に使う参加リンクも含まれます。

![Console の Settings。Manage collaborators のある Collaborators カードと、Anyone with the link が選択され、その下に Learners only がある Access。](/images/agent/publish-and-share-3.webp)

## あとから変更を公開する

アプリを変更してもう一度公開するとき、ダイアログの名前は **Publish your changes** になります。**Production** では、各 App に何が変わったかが表示されます。**No changes**、**Code changed**、**Live values changed** です。公開してもデータと学習者の進捗は保持され、新しいセッションが始まることもありません。更新によってデータが消える場合、たとえば新しいバージョンにはもうないテーブルやフィールドがあるときは、**Publish** をクリックする前に、Publish ダイアログに「This version may remove data from …」と表示されます。そのように削除されたデータは、元に戻せません。以前のバージョンへのロールバック、アプリのオフライン化、オンラインに戻す方法は、[公開する](/ja/build/go-live/) を参照してください。自分のアドレスを追加するには、[ドメイン](/ja/build/domains/) を参照してください。

## 新しいセッションを始める

**Start a new session** は、たとえば新しいグループの人たちのために、まっさらな状態に戻すためのものです。実行できるのはオーナーだけです。**Console** を開き、**Sessions** を選んで、**Start a new session** をクリックします。ダイアログは「Start a new session?」と尋ね、すべての App のデータとすべての学習者の進捗が消去されることを説明します。メンバー、ロール、名前は残ります。進めるなら **Clear and start again**、やめるなら **Cancel** をクリックします。

公開がこれを行うことはありません。ボタンがグレー表示のときは、ページに「There is no session to clear yet.」と表示されます。agent がまだ構築中なら、先に構築を停止するか、終わるのを待ってください。

## 知っておくこと

- 公開したアプリを動かす費用は、構築と同じく、SSU の残高から引かれます。それぞれの課金は、[Balance](/ja/account/balance/) ページの **Activity** に表示されます。
- ほかの人が agent を変更できるのは、あなたが追加したときだけです。[他の人と作業する](/ja/agent/work-with-others/) を参照してください。

次へ：[他の人と作業する](/ja/agent/work-with-others/)。
