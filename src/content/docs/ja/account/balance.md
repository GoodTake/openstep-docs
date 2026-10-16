---
title: 残高を確認する
description: SSU の残高、作業中のために確保されている額、課金の内容を確認し、Balance ページでチャージや返金を行います。
sidebar:
  order: 2
---

左レール下部の **Balance** をクリックすると、Balance ページが開きます。**Home** の **+ Top up** ボタンも同じページを開きます。

![Balance ページ。Available、Held for running work、Balance の 3 つのタイル、左に Top up と Refund、右に Activity の一覧がある。](/images/account/balance-1.webp)

## 3 つのタイル

- **Available**：いますぐ使える SSU です。
- **Held for running work**：構築やアプリの呼び出しの実行中に確保されている SSU です。
- **Balance**：アカウントがプラットフォーム上に持っている SSU です。

## チャージ

**Top up** は、ウォレットがすでに持っている SSU をプラットフォームの残高に移します。ページには **Wallet balance** が表示されます。手順は [SSU を入手する](/ja/start/get-ssu/) にあり、SSU を追加するほかの方法（購入と、コースコードの引き換え）も載っています。

## 返金

**Refund** は、使っていない SSU を、接続しているウォレットに戻します。

1. **REFUND AMOUNT** に金額を入力するか、**Max** をクリックします。**Available** がいくらかがページに表示されます。
2. **Request refund** をクリックします。

返金の履歴はボタンの下に一覧されます。まだ返金を依頼していない間は **No refunds yet.** と表示されます。

## Activity

**Activity** は、残高に対するすべての変更の一覧です。新しいものから順に、SSU の金額付きで表示されます。

- 構築と、アプリが使うプラットフォーム機能への課金。
- アプリの公開運用に対する、agent の名前と日付が付いた **Live runtime**。
- **Top up**、**Course grant**、**Refund** の行。

**Load more** をクリックすると、古い行が表示されます。

## 知っておくこと

- **Top up** と **Request refund** は、接続しているウォレットを使います。サインインに使ったウォレットである必要があります。別のネットワークにある場合、ページは Base mainnet への切り替えを求め、**Switch network** が表示されます。
- 課金は、構築している間もアプリが動いている間も、残高から自動的に引かれます。何に SSU がかかるかは、[SSU とは](/ja/account/what-is-ssu/) を読んでください。
