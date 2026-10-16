---
title: 質問に答える
description: Brainstorm の agent が聞くのは、最初のメッセージで決まらなかったことだけです。おすすめの答えを選ぶか、自分の答えを入力します。
sidebar:
  order: 2
---

**Brainstorm** モードの agent は、何かを計画する前に、ポップアップでいくつか質問をします。聞くのは、最初のメッセージで決まらなかったことだけです。この例の最初のメッセージ *筋力をつけたい。週 3 日ジムでトレーニングでき、1 回あたり約 45 分。* には、目標、器具、日数、1 回の時間がすでにありました。そのため Health & fitness の agent の質問は 3 つで、健康状態、経験、単位についてでした。

1. agent があなたのメッセージを読むまで待ちます。チャットに短いメモが書かれます。ここでは「I'll shape Three Day Strength around three 45-minute gym sessions, with a strength plan and private workout and body logs. A few details will help tailor it to you.」です。続いて **Ask a question** のステップが表示され、ダイアログが開きます。agent の起動中は、最初の返信に数分かかることがあります。
2. 質問を読みます。上部の小さなラベルは話題（**HEALTH**）で、その横が今のラウンドでの位置（**1 / 3**）です。質問の下に短い答えの一覧があり、最初の 1 つに **(Recommended)** が付いています。

   ![ダイアログの 3 つの質問のうち 1 つ目。HEALTH の質問に、None (Recommended) と Injury or condition の答え、Type your own answer ボックス、Use recommendations、Stop brainstorming、Back、Next がある。](/images/agent/answer-questions-1.webp)

3. 答えを選ぶか、**Type your own answer** に自分の答えを書きます。
4. **Next** をクリックすると次の質問に進みます。**Back** で前の質問に戻ります。最後の質問には **Next** の代わりに **Submit** があります。
5. **Submit** をクリックします。agent は、あなたの答えに合わせてアプリを調整すること、次のステップはあなたが承認するための計画であることを返信します。右のプレビューカードは **Planning** に変わり、「Drafting the build plan」と表示されます。

この実行での 3 つの質問は次のとおりです。

- **HEALTH**：「Do you have any injuries or health conditions that could affect training?」（けがや、トレーニングに影響しそうな健康上の問題はありますか。）答えは **None (Recommended)** と **Injury or condition** です。
- **EXPERIENCE**：「How much strength-training experience do you have?」（筋力トレーニングの経験はどのくらいありますか。）答えは **New (Recommended)**、**Trained for a while**、**Experienced** です。
- **UNITS**：「Which units would you like for weights and body measurements?」（体重や体の寸法にはどの単位を使いますか。）答えは **kg and cm (Recommended)** と **lb and inches** です。

例での答えは **None**、**Trained for a while**、**kg and cm** でした。2 つ目はおすすめの答えではありません。おすすめとは、agent の最善の推測という意味にすぎないからです。自分に当てはまるものを選んでください。

## 知っておくこと

- **Use recommendations** は、まだ答えていないすべての質問におすすめの答えを入れ、まとめて送信します。すでにした答えは残ります。強いこだわりがないとき、いちばん早く終わらせる方法です。
- agent が聞くのは、あなたが決めていないことだけです。そのため最初のメッセージが長いほど、質問は減ります。Health & fitness の agent が聞ける項目は 7 つで、目標、健康状態、器具、週の日数、経験、1 回の時間、単位です。それらを 1 回のラウンドでまとめて聞くので、答えるのは 1 度で済みます。
- 身長や体重を聞かれると思うかもしれませんが、聞かれません。体重は、App ができてからその中で記録します。
- けがや健康上の問題を伝えると、agent はより慎重な計画を作ります。
- **Stop brainstorming** は、質問に答えずに閉じて、チャットボックスを **Brainstorm** から **Build** に切り替えます。閉じるボタンも同じことをするので、移動には閉じるボタンではなく **Back** と **Next** を使ってください。
- **Submit** のあとは、ラウンドは終わりです。答えが間違っていたとわかったら、計画を読むときにそう伝えてください。そこで変更を依頼できます。
- agent の質問に答えられるのは、その agent のオーナーとエディターだけです。[他の人と作業する](/ja/agent/work-with-others/) を参照してください。

次へ：[計画を承認する](/ja/agent/approve-plan/)。
