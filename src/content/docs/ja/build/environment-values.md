---
title: 環境値
description: サイトが読み取る値（サイト名や外部サービスのキーなど）を、開発用と本番用に分けて設定します。
sidebar:
  order: 11
---

環境値は、サイトが読み取る名前付きの設定です。たとえば表示名や、外部サービスのキーです。値ごとに、Preview が使う開発用の設定と、公開されたサイトが使う本番用の設定が 1 つずつあり、**Console** → **Environment** でそれぞれ独立して設定します。

バックエンド用の個別の Deploy ステップは、もうありません。開発用の値は Preview がすぐに使い、本番用の値は **Publish** に従って反映されます。

1. ヘッダーの **Console** をクリックし、**Environment** を選びます。ページのタイトルは **Environment Values** で、**Values for The Cozy Coffee Table.** と表示されます。ヘッダーの App 切り替えで選んだ App が対象です。
2. 一覧を読みます。値ごとにカードがあり、名前、利用できる場所（例：**Public bundle**、**Frontend**）、種類（**Variable** か **Secret**）、そして 2 つの設定が並んで表示されます。**Development · Preview** と **Production · Live** です。フィルターチップの **All**、**Frontend**、**Backend**、**Secrets**、**Needs attention** で一覧を絞り込めます。
3. 値を追加するには **+ Add value** をクリックします。パネル **Add App value** で、名前を入力し、**Available to** を選び、**Value type** を選び、**Preview**、**Live**、またはその両方の値を入力して、**Add value** をクリックします。
4. 値をあとから変更するには、カードの ⋯ ボタンをクリックして編集し、**Save changes** をクリックします。

![The Cozy Coffee Table の Console → Environment。2 つの値があり、それぞれに Development · Preview と Production · Live の設定がある。](/images/build/environment-values-1.webp)

## 値が使える場所

- **Frontend** の値は Web ページに組み込まれます。訪問者の誰もが読めるので、サイト名のような公開してよいものだけを入れてください。これらの名前は `VITE_` で始まり、フォームが接頭辞を付けてくれます。
- **Backend** の値はサーバー上にあり、ブラウザーには届きません。外部サービスのキーはここに入れます。
- **Builder** の値は、構築中に builder が読める変数です。シークレットが builder から使えることはありません。

## 変数とシークレット

**Variable** は保存したあとでも読み返せます。**Secret** は書き込み専用です。保存すると、設定されていることとその日時だけが表示され、値は二度と表示されません。シークレットを変えるには、置き換えます。シークレットはバックエンド専用で、値を作成したあとは種類を変更できません。

## 開発用と本番用

- **Development · Preview** はすぐに反映されます。**Frontend** の値を変更すると Preview が再起動します。
- **Production · Live** の変数は **Applied with the next Publish.** です。変更したら **Publish** をクリックします。コードが変わっていなくても、ダイアログにはその App が **Live values changed** と表示されます。
- **Production** のシークレットは、保存するとすぐに **Available to the live backend runtime** になります。シークレットは公開バージョンに含まれることはないので、[ロールバック](/ja/build/go-live/) しても古いシークレットは戻りません。
- 開発用の値を設定できるのは、オーナーとエディターです。本番用の値を変更できるのは、オーナーだけです。

## builder が値を求めるとき

機能によっては、メールサービスのキーのように、あなたしか渡せないものが必要です。そのときはダイアログが開き、値の名前と用途が表示されます。値を入力して **Provide and continue** をクリックすると、開発用と本番用の両方に保存され、builder は作業を続けます。あとにしたい場合は **Not now** をクリックします。その場合、チャットに builder がその値を必要としていることが表示され、**Provide** ボタンが付きます。承認済みの計画が求めた値で、まだ渡していないものは、**Environment** の上部の **Requested by the build** にも **View request** ボタン付きで一覧されます。計画については [計画を承認する](/ja/agent/approve-plan/) を参照してください。

## 知っておくこと

- スクリーンショットの値は builder 自身が作成したものです。サイト名と、公開のウォレット接続用 ID です。builder が尋ねるのは、自分では知りえないものだけです。
- シークレットをチャットに貼り付ける必要はありません。**Environment** か、builder が開くダイアログを使ってください。
- メールのように値が必要になりうる機能は、[サイトでできること](/ja/build/what-your-site-can-do/) で説明しています。

次へ：[公開する](/ja/build/go-live/)。
