---
title: SSU を入手する
description: USDC またはカードで SSU を購入する、ウォレット内の SSU からチャージする、またはコースコードを引き換えます。
sidebar:
  order: 4
---

SSU は、構築、App が使うプラットフォーム機能、そして App の公開運用に対して OpenStep が課金する残高です。入手方法は 3 つあります。**Purchase SSU** で購入する、ウォレットにすでにある SSU からチャージする、コースコードを引き換える、です。

## SSU を購入する

1. 左レール下部のアカウントメニューを開き、**Purchase SSU** を選びます。ページの右上に **Base mainnet** と表示されます。
2. **SSU AMOUNT** に金額を入力するか、クイック選択の **100**、**500**、**1,000**、**5,000** をクリックします。一度に購入できるのは 100 〜 10,000 SSU（整数）です。
3. **PAYMENT** で **USDC**（**On Base**）か **Card**（**Stripe**）を選びます。
4. 概要を確認します。**You pay** と **You receive** です。支払う前にページに価格が表示されます。**Destination** は **Builder Smart Account** で、SSU はここに届きます。
5. 選んだ方法のボタンをクリックします。
   - **Recharge with USDC**：ウォレットで、ちょうどその USDC 額の承認（**Approve exact USDC**）と **Confirm purchase** を求められます。ページには **Switching to Base**、**Confirming on Base**、**Sending SSU** の順に進行が表示され、最後に **The destination balance is ready.** と表示されます。
   - **Continue to Stripe**：Stripe Checkout が開き、カードで支払います。支払いが完了するまでページを開いたままにしてください。キャンセルした場合、ページに **Stripe Checkout was cancelled. No charge was made.** と表示されます。

![SSU を 500 入力して USDC を選んだ、支払い前の Purchase SSU ページ。](/images/start/get-ssu-1.webp)

購入が完了すると残高が更新されます。[Balance](/ja/account/balance/) ページで確認できます。

## ウォレット内の SSU からチャージする

ウォレットにすでに SSU がある場合は、プラットフォームの残高に移せます。

1. 左レール下部の **Balance** をクリックします。
2. **Top up** の **TOP UP AMOUNT** に金額を入力するか、**Max** をクリックします。**Wallet balance** も表示されます。
3. **Top up** をクリックし、ウォレットで送金を承認します。

SSU をすでに自分で送った場合は、**Already sent? Paste transaction hash** にトランザクションハッシュを貼り付けて **Submit** をクリックします。

## コースコードを引き換える

コースからコードをもらった場合は、引き換えるとそのコースに参加でき、席に付いてくる SSU を受け取れます。アカウントメニューの **+ Redeem a code**、またはサインインページの **Have a course code? Redeem it →** を選びます。[コードを引き換える](/ja/account/redeem/) を参照してください。

## 知っておくこと

- **USDC で購入する**には、Base 上のウォレットに USDC と、ガス用の少量の ETH（Base 上）が必要です。どちらかが足りないと、ページに **Your wallet does not have enough USDC.** または **Your wallet needs more ETH on Base for gas.** と表示されます。
- **カード情報は Stripe が扱います。** カード情報は OpenStep ではなく、Stripe Checkout のページで入力します。
- 構築や App の呼び出しが実行されている間、SSU の一部は **Held for running work** になります。各課金は [Balance](/ja/account/balance/) ページの **Activity** に表示されます。
- 使っていない SSU は、[Balance](/ja/account/balance/) ページからウォレットに返金できます。

次へ：[最初の agent を作る](/ja/start/create-agent/)。
