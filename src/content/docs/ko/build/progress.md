---
title: 진행 상황 확인하기
description: builder가 작업하는 동안 채팅과 미리보기 카드에 무엇이 표시되는지, 그리고 턴을 멈추는 방법.
sidebar:
  order: 6
---

메시지를 보내면 턴이 시작되고, builder는 끝날 때까지 작업합니다. 왼쪽의 채팅과 오른쪽의 미리보기 카드, 두 곳에서 지켜볼 수 있습니다.

1. 채팅의 단계를 읽습니다. builder는 하는 일을 한 줄씩 보여 줍니다. **Run a command**, **Read**, **Edit**, **Update the plan** 등이며, 할 말이 있으면 그 사이에 짧은 메모를 남깁니다.
2. builder 답변 아래의 상태 줄을 읽습니다. builder가 준비하는 동안에는 **Preparing**으로 시작합니다. 모든 슬롯이 사용 중이면 **Waiting for a free build slot**이 나올 수 있고, 이어서 **Thinking**, **Planning**, **Building**이 타이머와 함께 표시됩니다(예: **Building · 2:39**). 1분 동안 새로운 내용이 없으면 **Still working — this step can take a few minutes**가 덧붙습니다.
3. 오른쪽의 미리보기 카드를 봅니다. **Thinking**, **Planning**, **Writing code**, **Preview & test**, **Done**이 표시되며 끝날 때마다 체크됩니다. 사이트가 준비되면 사이트가 카드 자리를 대신합니다.
4. 상태 줄에 **Done**과 함께 끝난 지 얼마나 됐는지가 표시되면 턴이 끝난 것입니다. builder의 마지막 메시지에 무엇이 바뀌었는지 적혀 있습니다.

![진행 중인 Build 턴: 왼쪽에 builder의 단계와 Building 상태 줄, 오른쪽에 Writing code가 진행 중인 미리보기 카드.](/images/build/progress-1.webp)

## 턴 멈추기

builder가 작업하는 동안에는 다른 메시지를 보낼 수 없습니다. 멈추려면 전송 화살표가 있던 자리의 빨간 정지 버튼을 클릭합니다. 그러면 상태 줄에 **Cancelled**가 표시됩니다. 작업은 서버에서 실행되므로, 상태 줄에 **Reconnecting…** 표시가 오랫동안 이어지면 페이지를 새로고침하세요. 작업이 이어집니다.

## 턴이 실패할 때

상태 줄이 빨간색으로 바뀌며 무슨 일이 있었는지 쉬운 말로 알려 줍니다. 같은 메시지를 다시 보내면 도움이 될 때는 **Retry**가 표시됩니다. SSU가 떨어지면 그렇게 알려 주고 **Top up balance**를 제안합니다. [SSU 받기](/ko/start/get-ssu/)를 참고하세요.

## 알아 두기

- 계획을 승인하면 시작되는 **Brainstorm** 빌드는 채팅 상자 위에 자체 진행 막대를 표시합니다. **Building · 0 of 6 done**과 함께 **Pause**, **Stop**, **View build**가 나옵니다. [빌드 지켜보기](/ko/agent/watch-build/)를 참고하세요.
- 변경 사항은 라이브 사이트가 아니라 Preview에 나타납니다. [사이트 미리보기](/ko/build/preview/)를 참고하세요.

다음: [사이트 미리보기](/ko/build/preview/).
