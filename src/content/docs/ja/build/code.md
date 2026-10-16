---
title: コードを見る
description: Console → Code でサイトのファイルを読みます。変更は引き続きチャットで行います。
sidebar:
  order: 8
---

サイトを作るのにコードを読む必要はありませんが、読むことはできます。**Code** には builder が書いたファイルが表示されるので、何が変わったかを確認できます。

1. ヘッダーの **Console** をクリックし、**Code** を選びます。ヘッダーの App 切り替えで選んだ App のファイルが表示されます。
2. **FILES** の下のフォルダーを開き、ファイルをクリックします。コーヒーショップでは `migrations`、`public`、`scripts`、`src` などのフォルダーがあり、`src/App.tsx` にサイトのページが一覧されています。
3. 右側のエディターでファイルを読みます。ファイルはタブで開き、開いているファイルのパスが上部に表示されます。
4. **Back to Console** をクリックすると、Console のほかのセクションに戻ります。

![The Cozy Coffee Table の Console → Code。左に FILES のツリー、右に読み取り専用のエディターで開いた src/App.tsx。](/images/build/code-1.webp)

エディター上部のツールバーには、**Files**、**Quick Open**、**Search**、**Refresh**、**Copy path**、**Copy content**、**Download file**、**Copy link** のボタンがあります。

## 知っておくこと

- Code は読み取り専用です。サイトを変えるには、左のチャットで頼みます。[欲しいものを伝える](/ja/build/describe/) を参照してください。
- **Copy path** は、builder にファイルを指し示したいときに便利です。メッセージにパスを貼り付けます。
- **Refresh** はファイルの一覧を再読み込みします。たとえば builder がファイルを追加した後に使います。
- Code に表示されるのは Preview と同じ下書きで、公開中のものではありません。

次へ：[サイトのデータ](/ja/build/data/)。
