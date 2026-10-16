---
title: 他の人と作業する
description: チームワークスペースから agent に共同作業者を招待します。オーナー、エディター、ビューアーそれぞれにできること。
sidebar:
  order: 7
---

どの agent もワークスペースに属します。個人ワークスペースには他のメンバーがいないので、他の人と agent で作業するには、チームワークスペースが必要です。追加した人は共同作業者になり、それぞれが agent に対するロールを持ちます。

## 誰が何をできるか

| ロール | できること |
| --- | --- |
| オーナー | エディターができることすべてに加え、**Publish**、**Roll back**、**Put the last version back**、**Unpublish**。agent を誰が開けるかの変更。**Start a new session**。本番の環境値とドメイン。共同作業者の追加と招待の送信。所有権の譲渡、agent の移動、複製、削除。 |
| エディター | **Build** と **Brainstorm**。**Approve plan** と **Request changes**。agent の質問への回答と、求められた値の提供。構築の **Pause**、**Stop**、**Continue**。agent の名前変更。開発用の環境値。 |
| ビューアー | 読み取り専用です。agent を開いてすべてを見られますが、何も変更できません。 |

agent のオーナーは 1 人です。ワークスペースの他のメンバーは全員 agent を見ることができ、誰が編集できるかはオーナーが選びます。

## チームワークスペースを用意する

1. 左レールの上部にあるワークスペース名をクリックします。最初は **Personal** と表示されています。**WORKSPACES** というメニューが開き、自分のワークスペースが一覧されて、現在のものにチェックマークが付きます。
2. **+ New workspace** をクリックします。**Create workspace** ダイアログで **Name** を入力し、**Create** をクリックします。
3. 左レールの **WORKSPACE** の下にある **Members** をクリックし、**Invite member** をクリックします。**Add workspace member** ダイアログで、相手の **Wallet address** を入力し、**Add member** をクリックします。追加されたウォレットは、このワークスペースのすべての agent を見られます。
4. agent をそのワークスペースに置きます。切り替えでそのワークスペースを選んだ状態で新しい agent を始めるか、既存の agent を移動します。移動するには、agent を開き、**Console**、**Settings** の順にクリックし、**Move to another workspace** を探して、**Choose a workspace** と書かれたメニューを開き、ワークスペースを選んで **Move** をクリックし、**Move agent** で確定します。

ワークスペースから誰かを外すには、**Members** のその人の行の **⋯** メニューを開いて **Remove** を選びます。メンバーを追加したり外したりできるのは、ワークスペースのオーナーだけです。

## agent に共同作業者を招待する

1. agent を開き、**Console**、**Settings** の順にクリックします。**Collaborators** の下の **Manage collaborators** をクリックします。**Agent collaborators** ダイアログが開きます。**PEOPLE** の下に、全員がロール付きで一覧されます。
2. 誰かをエディターにするには、**Add a workspace member** を使います。「0x… wallet address」と書かれたボックスにウォレットアドレスを入力し、横のドロップダウンで **Editor** か **Viewer** を選び、**Add** をクリックします。その人は、すでにワークスペースのメンバーである必要があります。
3. まだワークスペースにいない人を招待するには、代わりに **Invite link** を使います。**Create invite link** の横のドロップダウンで **Editor** か **Viewer** を選び、**Create invite link** をクリックして、**Copy** でリンクをコピーします。リンクを開いてサインインした人は、選んだロールでこのチームワークスペースに参加し、その中のすべての agent を見られます。リンクは 1 回だけ使え、有効期限も表示されます。
4. **Done** をクリックします。

   ![個人ワークスペースの agent の Agent collaborators ダイアログ。個人ワークスペースには他のメンバーがいないという注意書きと、People の下のオーナー。](/images/agent/work-with-others-1.webp)

個人ワークスペースでは、ダイアログに招待のオプションの代わりに、画像のメモが表示されます。「A personal workspace has no other members. Move this agent to a team workspace to invite collaborators.」

誰かから編集権限を外すには、名前の横の **Make viewer** をクリックして確定します。その人はワークスペースに残り、agent は引き続き見られます。

## 知っておくこと

- agent を管理する人を変更できるのは、オーナーだけです。エディターとビューアーには「Only the owner adds or removes collaborators.」と表示されます。
- 共同作業者は agent を管理します。学習者、つまりコースに参加する人たちは別の方法で参加し、Console の **Learners** に表示されます。
- agent を別のワークスペースに移動すると、共同作業者のロールは削除され、まだ使われていない招待リンクは使えなくなります。[agent を管理する](/ja/agent/manage-agents/) を参照してください。
- オーナーではないワークスペースのメンバーは、**Settings** の **Leave workspace** で退出できます。

次へ：[agent を管理する](/ja/agent/manage-agents/)。
