---
title: 取得 SSU
description: 用 USDC 或信用卡購買 SSU、用錢包裡的 SSU 儲值，或兌換課程代碼。
sidebar:
  order: 4
---

SSU 是 OpenStep 用來計費的餘額：建造、你的 App 所使用的平台功能，以及 App 上線運作，都會從中扣款。取得的方式有三種：在 **Purchase SSU** 購買、用你錢包裡已有的 SSU 儲值，或兌換課程代碼。

## 購買 SSU

1. 開啟左側欄底部的帳號選單，選擇 **Purchase SSU**。頁面右上角會顯示 **Base mainnet**。
2. 在 **SSU AMOUNT** 底下輸入數量，或點選快速選項：**100**、**500**、**1,000** 或 **5,000**。每次可以購買 100 到 10,000 個整數 SSU。
3. 在 **PAYMENT** 底下，選擇 **USDC**（**On Base**）或 **Card**（**Stripe**）。
4. 確認摘要：**You pay** 與 **You receive**。付款前頁面會先顯示價格。**Destination** 是你的 **Builder Smart Account**，SSU 會送到這裡。
5. 依你選的方式點選按鈕：
   - **Recharge with USDC**：你的錢包會請你核准確切的 USDC 金額（**Approve exact USDC**），接著 **Confirm purchase**。頁面會依序顯示 **Switching to Base**、**Confirming on Base** 和 **Sending SSU**，最後顯示 **The destination balance is ready.**
   - **Continue to Stripe**：Stripe Checkout 會開啟，讓你用信用卡付款。付款完成前請保持頁面開啟。如果你取消，頁面會顯示 **Stripe Checkout was cancelled. No charge was made.**

![Purchase SSU 頁面，已輸入 500 SSU 並選了 USDC，尚未付款。](/images/start/get-ssu-1.webp)

購買完成後，你的餘額會更新。請到 [Balance](/zh-tw/account/balance/) 頁面查看。

## 用錢包裡的 SSU 儲值

如果你的錢包裡已經有 SSU，可以把它轉到你的平台餘額：

1. 點選左側欄底部的 **Balance**。
2. 在 **Top up** 底下，於 **TOP UP AMOUNT** 輸入數量，或點選 **Max**。頁面會顯示你的 **Wallet balance**。
3. 點選 **Top up**，並在錢包裡核准這筆轉帳。

如果你已經自己送出了 SSU，請把交易雜湊貼到 **Already sent? Paste transaction hash** 底下，然後點選 **Submit**。

## 兌換課程代碼

如果課程給了你一組代碼，兌換後你會加入該課程，並獲得你的名額隨附的 SSU。請在帳號選單選擇 **+ Redeem a code**，或在登入頁選擇 **Have a course code? Redeem it →**。見 [兌換代碼](/zh-tw/account/redeem/)。

## 注意事項

- **Buying with USDC**（用 USDC 購買）需要你的錢包在 Base 上有 USDC，以及少量 Base 上的 ETH 作為 gas。如果任一項不足，頁面會顯示 **Your wallet does not have enough USDC.** 或 **Your wallet needs more ETH on Base for gas.**
- **Card details stay with Stripe.** 信用卡資料由 Stripe 保管：你是在 Stripe Checkout 頁面輸入，不是在 OpenStep。
- 在建造或 App 呼叫進行期間，你的一部分 SSU 會被 **Held for running work**。每一筆扣款都會出現在 [Balance](/zh-tw/account/balance/) 頁面的 **Activity** 底下。
- 你可以在 [Balance](/zh-tw/account/balance/) 頁面，把尚未花掉的 SSU 退回你的錢包。

下一步：[建立你的第一個 Agent](/zh-tw/start/create-agent/)。
