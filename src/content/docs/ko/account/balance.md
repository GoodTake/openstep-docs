---
title: 잔액 확인
description: SSU가 얼마나 있는지, 진행 중인 작업에 묶인 금액과 차감 내역을 확인하고 Balance 페이지에서 충전하거나 환불받습니다.
sidebar:
  order: 2
---

왼쪽 레일 맨 아래의 **Balance**를 클릭하면 Balance 페이지가 열립니다. **Home**의 **+ Top up** 버튼도 같은 페이지를 엽니다.

![Balance 페이지: Available, Held for running work, Balance 타일, 왼쪽의 Top up과 Refund, 오른쪽의 Activity 목록.](/images/account/balance-1.webp)

## 세 개의 타일

- **Available**: 지금 쓸 수 있는 SSU.
- **Held for running work**: 빌드나 앱 호출이 진행되는 동안 따로 묶어 둔 SSU.
- **Balance**: 내 계정이 플랫폼에 보유한 SSU.

## 충전(Top up)

**Top up**은 지갑에 이미 있는 SSU를 플랫폼 잔액으로 옮깁니다. 페이지에 내 **Wallet balance**가 표시됩니다. 절차는 [SSU 받기](/ko/start/get-ssu/)에 있으며, SSU를 늘리는 다른 방법인 구매와 코스 코드 사용도 함께 나옵니다.

## 환불(Refund)

**Refund**는 쓰지 않은 SSU를 연결된 지갑으로 돌려보냅니다.

1. **REFUND AMOUNT** 아래에 수량을 입력하거나 **Max**를 클릭합니다. 페이지에 **Available**이 얼마인지 표시됩니다.
2. **Request refund**를 클릭합니다.

환불 내역은 버튼 아래에 나열됩니다. 환불을 요청하기 전에는 **No refunds yet.** 문구가 나타납니다.

## 내역(Activity)

**Activity**는 잔액의 모든 변동을 최신순으로 나열한 목록이며, 각 항목에 SSU 금액이 표시됩니다.

- 빌드와 앱이 쓰는 플랫폼 기능에 대한 차감.
- 앱의 라이브 운영에 대한 **Live runtime** 항목으로, Agent 이름과 날짜가 함께 표시됩니다.
- **Top up**, **Course grant**, **Refund** 항목.

더 오래된 항목을 보려면 **Load more**를 클릭합니다.

## 알아 두기

- **Top up**과 **Request refund**는 연결된 지갑을 사용합니다. 로그인할 때 쓴 지갑이어야 합니다. 지갑이 다른 네트워크에 있으면 페이지가 Base mainnet으로 전환하라고 안내하고 **Switch network**를 제공합니다.
- 차감은 빌드하는 동안과 앱이 실행되는 동안 잔액에서 저절로 나갑니다. 무엇이 SSU를 쓰는지는 [SSU란](/ko/account/what-is-ssu/)을 읽어 보세요.
