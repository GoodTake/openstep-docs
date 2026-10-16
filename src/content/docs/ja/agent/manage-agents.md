---
title: agent を管理する
description: My agents で自分の agent を探し、名前変更、複製、移動、譲渡、削除をします。agent を持つワークスペースの管理もここです。
sidebar:
  order: 8
---

自分の agent は **My agents** に一覧され、agent ごとに Console に独自の設定があります。agent を持つワークスペースにも、それ自身の設定があります。

## My agents

左レールの **My agents** をクリックします。ページには「Everything you own or collaborate on, newest activity first.」と表示され、右上に **+ New agent** があります。

1. タブで一覧を絞り込みます。**All**、**Needs your answer**、**Building**、**Ready to publish**、**Live**、**Draft** です。名前で探すには、**Search agents…** に入力します。
2. カードを読みます。各カードには、状態バッジ（**Building**、**Live**、**Draft**、**Ready to publish**）、agent の名前、今何をしているかの 1 行（**Planning**、**Working**、**Unpublished changes** など）、ベースにした agent、最後に動いた時刻が表示されます。
3. カードをクリックすると、その agent の作業ページが開きます。

   ![絞り込みのタブと agent のカードのグリッドがある My agents ページ。Building と表示された Three Day Strength も含まれる。](/images/agent/manage-agents-1.webp)

ほかの人があなたに共有した agent も、あなたのアクセスレベル付きでここに表示されます。参加した学習体験は **Campus Earth** に残ります。

## 1 つの agent を変更する

agent を開き、ヘッダーの **Console**、**Settings** の順にクリックします。

- 名前の変更。**Display** の下で **Agent name** を変更し、**Save changes** をクリックします。ここでは **Avatar** の色と **Card image** も選べ、**Upload image** か **Generate** が使えます。**Language** と **Tone** は agent の書き方と話し方を変え、次に構築するときに反映されます。名前を変更できるのは、オーナーとエディターです。
- **Duplicate agent**。**Ownership and workspace** の下で **Duplicate agent** をクリックします。すべての App のコードのコピーを持つ新しい agent ができるので、元の agent に触れずに変更できます。データ、値、シークレットは元の agent に残ります。ボタンの横のボックスには`<agent name> (copy)`が入っています。ほかの名前にしたいときは、そこに入力します。
- **Move to another workspace**。**Choose a workspace** と書かれたメニューを開いてワークスペースを選び、**Move** をクリックして、**Move agent** で確定します。App とそのデータも一緒に移り、そのワークスペースのメンバーは agent を見られます。共同作業者はその agent でのロールを失い、まだ使われていない招待リンクは使えなくなります。
- **Transfer ownership**。**Choose a collaborator** と書かれたメニューを開いて人を選び、**Transfer ownership** をクリックして、**Transfer** で確定します。あなたはエディターとして agent に残り、公開、誰が開けるかの変更、削除ができるのは新しいオーナーだけになります。譲渡するには、agent に共同作業者がいる必要があります。[他の人と作業する](/ja/agent/work-with-others/) を参照してください。
- **Delete agent**。一番下の **Danger zone** で **Delete agent** をクリックします。ダイアログ **Delete agent permanently** は、agent、そのファイル、会話、すべての App とそのデータが削除され、元に戻せないことを知らせます。確認のために agent の名前を入力し、**Delete agent** をクリックします。

agent の複製、移動、譲渡、削除ができるのは、オーナーだけです。**Access** と共同作業者の一覧も同じページにあり、こちらもオーナー専用です。[公開と共有](/ja/agent/publish-and-share/) を参照してください。

## ワークスペースの設定

左レールの **WORKSPACE** の下にある **Settings** をクリックします。ページには「Manage the workspace that holds your agents.」と表示されます。レール上部のワークスペースメニューの **Workspace settings** からも開けます。

- **GENERAL** には、ワークスペースの **Name** と **Slug** があります。チームワークスペースでは、オーナーが名前を変更して **Save** をクリックできます。個人ワークスペースの名前は固定です。
- **Usage & balance** には、SSU での **Available balance** と、このワークスペースの **Your agents** の数が表示されます。
- **CLI ACCESS** には、openstep コマンドラインを通じて自分として動くことを許可したデバイスが一覧され、それぞれに **Revoke** があります。[インストールとサインイン](/ja/cli/install/) を参照してください。
- **TRANSFER OWNERSHIP** は、チームワークスペースを別のアクティブなメンバーに渡します。**New owner** を選び、**Transfer ownership** をクリックして、**Transfer** で確定します。
- **DANGER ZONE** はチームワークスペースにだけあります。オーナーは **Delete workspace** で、名前を入力して確認すると、ワークスペースとその中のすべての agent を完全に削除できます。ほかのメンバーには、代わりに **Leave workspace** が表示されます。

左レールの **Members** には、ワークスペースの人たちが一覧されます。[他の人と作業する](/ja/agent/work-with-others/) を参照してください。

## 知っておくこと

- 共同作業者、アクセス、公開の設定は、agent ごとに保持されます。ワークスペースのページでは変わりません。
- 準備中の agent は削除できません。準備が終わるのを待ってください。
- ワークスペースを削除すると、その中のすべての agent が削除されます。残したい agent は、先に外へ移してください。

用意された agent の流れは、ここまでです。ウェブサイトを作るには、[ウェブサイトを始める](/ja/build/start-website/) から始めてください。
