---
title: SSU 받기
description: USDC나 카드로 SSU를 구매하거나, 지갑에 있는 SSU로 충전하거나, 코스 코드를 사용합니다.
sidebar:
  order: 4
---

SSU는 OpenStep이 빌드, 앱이 쓰는 플랫폼 기능, 앱의 라이브 운영에 대해 차감하는 잔액입니다. 얻는 방법은 세 가지입니다. **Purchase SSU**에서 구매하거나, 지갑에 이미 있는 SSU로 충전하거나, 코스 코드를 사용합니다.

## SSU 구매

1. 왼쪽 레일 맨 아래의 계정 메뉴를 열고 **Purchase SSU**를 선택합니다. 페이지 오른쪽 위에 **Base mainnet**이 표시됩니다.
2. **SSU AMOUNT** 아래에 수량을 입력하거나 빠른 선택 **100**, **500**, **1,000**, **5,000** 중 하나를 클릭합니다. 한 번에 100에서 10,000 SSU까지, 정수 단위로 구매할 수 있습니다.
3. **PAYMENT** 아래에서 **USDC**(**On Base**) 또는 **Card**(**Stripe**)를 선택합니다.
4. 요약을 확인합니다. **You pay**와 **You receive**가 표시되며, 결제 전에 가격을 볼 수 있습니다. **Destination**은 SSU가 도착하는 **Builder Smart Account**입니다.
5. 선택한 방법에 맞는 버튼을 클릭합니다.
   - **Recharge with USDC**: 지갑에서 정확한 USDC 금액을 승인(**Approve exact USDC**)한 다음 **Confirm purchase**를 요청합니다. 페이지에는 **Switching to Base**, **Confirming on Base**, **Sending SSU** 순으로 진행 상황이 나오고, 이어서 **The destination balance is ready.** 문구가 나타납니다.
   - **Continue to Stripe**: Stripe Checkout이 열리고 카드로 결제합니다. 결제가 끝날 때까지 페이지를 열어 둡니다. 취소하면 페이지에 **Stripe Checkout was cancelled. No charge was made.** 문구가 나타납니다.

![SSU AMOUNT에 500 SSU를 입력하고 USDC를 선택한, 결제 전의 Purchase SSU 페이지.](/images/start/get-ssu-1.webp)

구매가 끝나면 잔액이 갱신됩니다. [Balance](/ko/account/balance/) 페이지에서 확인하세요.

## 지갑에 있는 SSU로 충전

지갑에 이미 SSU가 있다면 플랫폼 잔액으로 옮길 수 있습니다.

1. 왼쪽 레일 맨 아래의 **Balance**를 클릭합니다.
2. **Top up** 아래의 **TOP UP AMOUNT**에 수량을 입력하거나 **Max**를 클릭합니다. 페이지에 내 **Wallet balance**가 표시됩니다.
3. **Top up**을 클릭하고 지갑에서 전송을 승인합니다.

이미 SSU를 직접 보냈다면 **Already sent? Paste transaction hash** 아래에 트랜잭션 해시를 붙여 넣고 **Submit**을 클릭합니다.

## 코스 코드 사용

코스에서 코드를 받았다면, 코드를 사용해 코스에 참여하고 자리에 딸린 SSU를 받습니다. 계정 메뉴에서 **+ Redeem a code**를 선택하거나, 로그인 페이지에서 **Have a course code? Redeem it →** 링크를 사용합니다. [코드 사용](/ko/account/redeem/)을 참고하세요.

## 알아 두기

- USDC로 구매하려면 지갑에 Base의 USDC와 가스용 Base ETH가 조금 필요합니다. 하나라도 부족하면 페이지에 **Your wallet does not have enough USDC.** 또는 **Your wallet needs more ETH on Base for gas.** 문구가 나타납니다.
- **카드 정보는 Stripe에만 있습니다.** Stripe Checkout 페이지에서 입력하며, OpenStep에는 입력하지 않습니다.
- 빌드나 앱 호출이 진행되는 동안 SSU 일부는 **Held for running work** 상태가 됩니다. 각 차감 내역은 [Balance](/ko/account/balance/) 페이지의 **Activity**에 표시됩니다.
- 쓰지 않은 SSU는 [Balance](/ko/account/balance/) 페이지에서 지갑으로 환불받을 수 있습니다.

다음: [첫 Agent 만들기](/ko/start/create-agent/).
