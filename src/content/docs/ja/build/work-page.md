---
title: 作業ページ
description: 左にチャット、右にサイト、ヘッダーに Publish と Console があります。
sidebar:
  order: 2
---

どの agent にも作業ページがあり、時間の多くはここで過ごします。左で builder と話し、右でサイトを見ます。agent を始めるとすぐに開き、あとからは **My agents**、または左レールの **RECENT AGENTS** から戻れます。

![The Cozy Coffee Table の作業ページ。左に builder の返信、右にサイトのリアルタイムのプレビュー。](/images/build/work-page-1.webp)

1. ヘッダー。左から順に、**My agents / The Cozy Coffee Table**（**My agents** をクリックすると一覧に戻ります）、App 切り替え、**Publish**、**Console** です。agent は複数の App を持てます。App 切り替えで、右側に表示する App と、Console の **Code**、**Domains**、**Environment** が対象にする App を選びます。このページでは、左レールがアイコンだけに縮みます。
2. 左側のチャット。あなたのメッセージと builder の返信が、1 ステップ 1 行で並び、各返信の下にステータス行があります。一番下が入力ボックスです。**+** はファイルを添付し、チップ（たとえば **Auto · Build**）はモデルとモードを選びます。builder が作業している間、送信の矢印は赤い停止ボタンに変わります。
3. 右側の App ビュー。**Preview** と **Data** のタブに、ヘッダーで選んだ App が表示されます。**Contract** はスマートコントラクトを持つ App にだけ表示されます。Preview のツールバーには、再読み込みボタン、ページ選択（**Home**、**Menu**、**Book a table**）、デバイス選択、**Edit mode** 用の鉛筆、サイトを別タブで開く **Open** があります。
4. Console。ヘッダーの **Console** をクリックすると App ビューの上に開き、✕ で閉じます。セクションは次のとおりです。

## Console にあるもの

- **Overview**：agent の名前と製品、開ける人、あなたのロール、公開されているか、そして App の一覧です。
- **Build**：承認済みの計画に沿った構築のタスク、計画、App です。そのような構築がある agent に表示されます。[構築を見守る](/ja/agent/watch-build/) を参照してください。
- **Code**：App のファイルを読み取り専用で表示します。[コードを見る](/ja/build/code/) を参照してください。
- **Files**：builder に参考として渡せる、PDF、PowerPoint、Word のファイル（任意）です。
- **Memory**：あなたが下した判断を含め、agent が記録した内容です。
- **Sessions**：App の中身と、オーナーが **Start a new session** できる場所です。
- **Plugins**：agent の製品に組み込まれた機能です。
- **Domains**：App の Web アドレスと、自分のドメインです。[ドメイン](/ja/build/domains/) を参照してください。
- **Production**：公開中のもの、そのバージョン、そして **Unpublish** です。[公開する](/ja/build/go-live/) を参照してください。
- **Scheduled tasks**：App が決まった時刻に実行するジョブです。[サイトでできること](/ja/build/what-your-site-can-do/) を参照してください。
- **Environment**：App が読み取る値で、開発用と本番用に分けて保持されます。[環境値](/ja/build/environment-values/) を参照してください。
- **Learners**：参加した人たちです。学習者やコースがある agent に表示されます。
- **Settings**：agent の名前、アクセス、共同作業者、所有権、削除です。[agent を管理する](/ja/agent/manage-agents/) を参照してください。

## 知っておくこと

- **Publish** は、builder が作業している間と、公開するものがまだない間はグレー表示になります。
- できることはロールによって変わります。オーナーは **Publish**、本番の **Environment** 値、**Domains** を含め、すべてできます。エディターはチャットと構築ができます。ビューアーは見るだけです。[他の人と作業する](/ja/agent/work-with-others/) を参照してください。

次へ：[Build と Brainstorm](/ja/build/modes/)。
