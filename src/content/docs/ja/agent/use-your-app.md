---
title: アプリを使う
description: 完成したアプリを Preview で試し、Data タブで保存されたものを確認し、agent に変更を依頼します。
sidebar:
  order: 5
---

構築が終わると、アプリは作業ページの **Preview** で試せる状態になっています。これは開発用のコピーです。ほかの人に見せる前に、好きなだけ使ってテストできます。

1. 作業ページの右側を見ます。構築中のカードは App に置き換わっています。Console がまだ開いているときは、**✕** で閉じてください。App の上には、**Preview** と **Data** のタブ、**Home** から始まるページメニュー、デスクトップサイズとスマートフォンサイズを切り替えるメニュー、そしてプレビューを新しいタブで開く **Open ↗** があります。
2. App そのものを見ます。Three Day Strength には、上部に独自のメニュー **Plan**、**Workout**、**History**、**Progress** があります。ホームページには「Get stronger, one focused session at a time.」と書かれ、**Start logging →** と **Connect Wallet** のボタンがあります。さらに「Three days. Four movements. Steady progress.」というカードが、プランをまとめています。45 分、週 3 日、4 種目です。
3. **Plan** を開きます。**THE PLAN**、「Repeat weekly · rest between sessions」で、日ごとに分かれています。**Day A** は「Session 1 · 4 movements」で、各種目にイラスト、セット数とレップ数、鍛える筋肉が付いています。最初の 2 つは、バックスクワット（3 セット × 5〜8 レップ）と、バーベルベンチプレス（3 セット × 5〜8 レップ）です。この下に、さらに別の日が続きます。計画は、サインインしなくても読めます。

   ![構築後の Three Day Strength の作業ページ。チャットに Ready to publish のバー、Preview に App の Plan ページが表示され、Day A のイラスト付きの種目、Back squat と Barbell bench press が見える。](/images/agent/use-your-app-1.webp)

4. トレーニングを記録します。記録は非公開なので、App はまずウォレットでサインインするよう求めます。それまで **Workout** には「Sign in with your wallet to log your private workouts.」と **Connect Wallet** ボタンが表示されます。サインインしたあとは、トレーニングしながら 1 セットずつ保存します（「One set at a time. Save your work as you go.」）。
5. 履歴と進捗を確認します。**History** と **Progress** も同じように非公開です。各自が自分のウォレットでサインインし、自分の記録だけを見ます。agent は、1 セットごとの記録と、あなたが選んだ単位 kg と cm での、非公開の体重と寸法の記録を計画しました。体重と体の寸法は **Progress** に入れます。
6. **Data** タブを開いて、App が保存しているものを確認します。「View and manage the data stored in your app.」と表示され、テーブルごとに 1 枚のカードと、その行数があります。Three Day Strength のテーブルは `measurements`、`orders`、`settings`、`users`、`weight_entries`、`workout_sets`、`workouts` です。テーブルを開くと行が見られます。この実行では、まだ誰も何も記録していなかったため、どのテーブルも空でした。
7. 変更を依頼します。左のチャットボックスに入力します。たとえば、4 日目のトレーニング日、文言の変更、見た目の変更などを頼めます。

App のどのページも、これは医学的なアドバイスではなく、新しいトレーニングや減量のプランを始める前に医師や有資格のコーチに相談してください、という注意書きで終わります。

## 知っておくこと

- **Preview** での操作は開発用データです。公開後のライブの App のデータとは別に保たれるので、自由にテストできます。[サイトのデータ](/ja/build/data/) を参照してください。
- **Open ↗** は、アプリを実際のサイズで確認するときや、スマートフォンで確認するときに便利です。
- 文言、数字、色、画像などの小さな変更は、すぐに行われます。**Brainstorm** での大きな変更は、質問と計画をもう一度通り、計画を承認してから構築されます。[Build と Brainstorm](/ja/build/modes/) を参照してください。
- App のコードは Console の **Code** で読めますが、アプリを変更するにはチャットで頼みます。[コードを見る](/ja/build/code/) を参照してください。
- まだ何も公開されていません。アプリは、公開したときにライブになります。

次へ：[公開と共有](/ja/agent/publish-and-share/)。
