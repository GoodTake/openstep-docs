---
title: 公開する
description: Publish はすべての App をまとめて公開します。以前のバージョンへのロールバック、サイトのオフライン化、再公開もできます。
sidebar:
  order: 12
---

**Publish** は、Preview で見ているものを、独自のアドレスを持つ公開サイトにします。agent のすべての App をまとめて公開し、実行できるのはオーナーだけです。公開するまで、サイトは Preview の中にしかありません。

1. builder の作業が終わるまで待ちます。作業中は、ヘッダーの **Publish** がグレー表示です。
2. ヘッダーの **Publish** をクリックします。ダイアログ **Publish your agent** が開き、**Every app of this agent goes live together.** と表示されます。次に起きること（**Check**、**Build**、**Go live**）と、**Publish 1 app · Data and learner progress stay as they are.** のような行が表示されます。各 App は状態付きで一覧され、初回の公開では **Not live yet**、2 回目以降は **Code changed** または **No changes** です。
3. ダイアログの **Publish** をクリックします。**Check your agent**、**Build and test every app**、**Switch every app live together** のステップがあるカードで進行が追えます。実行中も作業を続けられます。ある App では約 2 分かかりました。
4. 完了すると、カードに **Your agent is live** と App のアドレス、開くボタン、コピーするボタンが表示されます。

![The Cozy Coffee Table の Publish your agent ダイアログ。3 つのステップと、Not live yet と表示された App がある。](/images/build/go-live-2.webp)

そのあと **Console** を開いて **Production** を選びます。日付付きの **Live since**、各 App のアドレス、短い招待メッセージ（各 App のアドレス入り。**Access** が **Learners only** のときは参加リンクも入ります）をコピーする **Copy invitation**、公開した全バージョンの一覧 **Versions** が表示されます。現在のバージョンには **Live** の印が付きます。

![最初の Publish 後の Console → Production。日付付きの Live since、The Cozy Coffee Table のアドレス、Live の印が付いた 1 つのバージョン。](/images/build/go-live-1.webp)

## Publish がすること、しないこと

- すべての App がまとめて公開されます。どれか 1 つの App が失敗すると、Publish 全体が失敗し、何も変わらず、公開中のサイトはそのままです。ステータスには何が問題だったかが書かれ、**The live version did not change.** で終わります。
- チェックで App に問題が見つかった場合、builder が自分で修正して再度公開することがあります。値など、あなたから必要なものがあるときは、ステータスに **Publishing waits for you.** と表示されます。
- Publish はデータと学習者の進捗を保持し、新しいセッションを始めることもありません。予約など、公開中のレコードは残ります。更新によってデータが消える場合、たとえば新しいバージョンにはもうないテーブルやフィールドがあるときは、公開する前に Publish ダイアログが警告します。そのように削除されたデータは、元に戻せません。
- 公開後も、Preview は引き続き下書きです。あとの変更は、もう一度公開するまで公開中のサイトには届きません。
- サイトを開ける人（**Anyone with the link** か **Learners only**）は、agent の設定です。[公開と共有](/ja/agent/publish-and-share/) を参照してください。

## 以前のバージョンにロールバックする

1. **Console** を開いて **Production** を選び、**Versions** でバージョンを探します。
2. その横の **Roll back** をクリックします。ダイアログ **Roll back** が、その日付に公開されたバージョンに戻すかどうかを尋ねます。データと学習者の進捗はそのままです。
3. **Roll back to this version** をクリックします。すべての App がまとめて切り替わります。

ロールバックは、以前のバージョンのコードを元に戻します。データへの変更は取り消さず、Preview の下書きも変えません。新しいバージョンが、古いバージョンの読むデータを削除している場合は、拒否されます。プラットフォームが保持するのは、公開されていた直近 5 バージョンです。それより古いものには **No longer kept** と表示されます。ロールバックは構築の実行中は待機するので、先に構築を一時停止するか停止してください。

## サイトをオフラインにする

1. **Console** を開いて **Production** を選び、**Live since** の隣の **Unpublish** をクリックします。
2. ダイアログ **Unpublish** で、**Take it offline** をクリックします。

すべての App の配信が止まります。最後に公開されていたバージョン、そのデータ、ドメイン、設定は、すべて保持されます。

## オンラインに戻す

サイトがオフラインの間、**Production** には **This agent is offline. Its data is kept.** と表示されます。**Put the last version back** をクリックします。プラットフォームはこれを Republish と呼びます。最後に公開されていたバージョンを、再構築せずに戻します。そのあとサイトを変更している場合は、代わりに **Publish** をクリックして、新しいバージョンを公開します。

## 知っておくこと

- **Publish**、**Roll back**、**Unpublish**、そしてバージョンを元に戻す操作ができるのは、オーナーだけです。エディターとビューアーは **Production** を見られます。
- データを空にして最初からやり直すには、**Console** → **Sessions** の **Start a new session** を使います。Publish はそれを行いません。[公開と共有](/ja/agent/publish-and-share/) を参照してください。
- サイトに自分のアドレスを付けるには、[ドメイン](/ja/build/domains/) を参照してください。

次へ：[ドメイン](/ja/build/domains/)。
