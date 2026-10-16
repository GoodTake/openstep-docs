---
title: 빌드 지켜보기
description: 채팅과 Console에서 빌드를 작업별로 따라가고, 일시정지하거나 중지하거나 계속합니다.
sidebar:
  order: 4
---

계획을 승인하면 Agent는 작업을 하나씩 차례로 빌드합니다. 그냥 두어도 되고, 각 작업이 실행되는 모습을 지켜봐도 됩니다.

1. 입력 상자 위의 막대를 봅니다. **Building · 0 of 6 done**이라고 표시되고 진행 중인 작업의 이름이 붙으며, 작업이 끝날 때마다 숫자가 올라갑니다. 오른쪽의 미리보기 카드는 **Thinking**, **Planning**, **Writing code**, **Preview & test**, **Done**을 차례로 거칩니다.
2. **View build**를 클릭합니다. 오른쪽에서 앱 보기 대신 **Console**이 **Build** 섹션으로 열립니다. **Building**과 함께 **Pause**와 **Stop**, 끝난 작업 수와 빌드가 실행된 시간, 그리고 빌드에 쓰는 제품 버전이 표시됩니다.
3. **Tasks** 탭을 엽니다. 작업마다 한 행이 있으며, 실행 순서대로 번호, 이름, 속한 앱, 라운드, 실행된 시간이 표시됩니다. 실행 중인 작업에는 “Round 1 · running”이라고 나옵니다. 작업은 하나씩 실행되므로, 그 아래 작업은 순서를 기다립니다.
4. Console 오른쪽 위의 **✕** 버튼을 클릭하면 Console이 닫히고 앱 보기가 다시 보입니다. 언제든 **View build**로, 또는 헤더의 **Console**을 클릭한 뒤 목록의 **Build**를 클릭해 돌아올 수 있습니다.

   ![Build 섹션의 Console: Building 표시와 Pause, Stop, 0 of 6 done, 그리고 첫 번째 작업이 실행 중인 여섯 작업이 나열된 Tasks 탭.](/images/agent/watch-build-1.webp)

이번 실행의 여섯 작업은 순서대로 피트니스 기반 설정, 공개 훈련 페이지 만들기, 운동과 기록 기능 구현, 운동 일러스트 생성, 신체 변화 기능 구현, 그리고 모든 앱에 걸친 마지막 점검이었습니다.

**Tasks** 옆의 **Plan**과 **Apps** 탭은 승인한 계획과 계획이 만드는 앱을 보여 줍니다. **Code**나 **Files** 같은 다른 Console 섹션은 왼쪽 목록에 있지만, 빌드를 따라가는 데는 필요하지 않습니다.

## 일시정지, 중지, 계속

이 컨트롤은 Console과 입력 상자 옆에 나타납니다.

- **Pause**는 빌드를 보류합니다. 버튼이 **Continue**로 바뀝니다.
- **Continue**는 같은 빌드를 이어갑니다.
- **Stop**은 빌드를 끝냅니다. 먼저 “Stop this build? Finished tasks are kept. Your next Brainstorm starts a new plan.”라고 묻습니다. 확인하려면 **Stop the build**를 클릭하고, 취소하려면 **Cancel**을 클릭합니다. 중지한 뒤에는 다음 **Brainstorm** 메시지가 새 계획으로 새 빌드를 시작합니다. 잠깐 쉬고 싶다면 **Pause**를 사용하세요.

빌드가 실행되는 동안 입력 상자에는 메시지 상자 대신 **Pause**와 **Stop**이 표시되고, “Building — Pause or Stop to change direction.”이라는 안내가 나옵니다. 새로 할 말이 있으면 먼저 일시정지하거나 중지한 다음 메시지를 보내세요. 빌드가 일시정지된 상태에서 메시지를 보내면 **Stop**과 마찬가지로 그 빌드가 끝납니다.

## 빌드가 저절로 멈출 때

가끔 작업이 나 없이는 진행되지 못할 때가 있습니다. 그러면 빌드가 멈추고 무엇을 기다리는지 알려 줍니다.

- 질문: 채팅에서 답하면 빌드가 저절로 이어집니다.
- 나만 줄 수 있는 값: 대화 상자가 값을 요청합니다. [계획 승인하기](/ko/agent/approve-plan/)를 참고하세요.

플랫폼 쪽 문제로 빌드가 일시정지될 수도 있습니다. 그러면 막대에 **Platform issue**라고 나오고, Console의 **Build**에는 “The build is paused on a platform problem. It is listed for the platform team and continues once they fix it. Nothing for you to do. To change direction, stop the build.”라고 표시됩니다. 기다리면 문제가 해결된 뒤 빌드가 저절로 이어집니다.

채팅에 **Reconnecting…** 표시가 오랫동안 이어지면 페이지를 새로고침하세요. 빌드는 서버에서 계속 진행됩니다.

## 빌드가 끝날 때

마지막 작업이 끝나고 최종 검토까지 마치면 빌드를 게시할 준비가 된 것입니다.

1. 입력 상자 위의 막대가 **Ready to publish**로 바뀌고, “0 findings · 0 parked”라는 한 줄과 **View build**가 표시됩니다. 이번 실행에서는 두 숫자 모두 0이었습니다.
2. 그 아래에 초록색 상자가 나타납니다. “The build finished. Publish from the top bar puts every app live together.” 상자의 **Show the review**를 클릭하면 최종 검토를 읽을 수 있습니다.
3. 헤더의 **Publish** 버튼이 밝아집니다.
4. Console에서 **Build**에 이제 **Ready to publish**와 “Publish from the top bar puts every app live together. Data and learner progress stay as they are.”가 표시됩니다. 그 아래 **MECHANICAL CHECKS**에는 각 점검이 나열되며 모두 **Passed**로 표시됩니다. **REVIEW FINDINGS**에는 최종 검토(“The reviewer reported no findings.”)가 나오고, **PARKED TASK RULINGS**에는 None이라고 표시됩니다.

최종 검토의 발견 사항은 **REVIEW FINDINGS** 아래에 나열됩니다. 게시하기 전에 지금 **Preview**에서 앱을 써 볼 수 있습니다.

## 알아 두기

- 빌드에는 시간이 걸립니다. 이번 빌드는 승인부터 **Ready to publish**까지 약 75분이 걸렸으며, 플랫폼 문제로 한 번 일시정지된 시간이 포함됩니다. Agent는 각 작업을 넘어가기 전에 점검하고 점검에 실패하면 고치므로, 어떤 작업은 라운드가 두 번 이상입니다.
- 소유자와 편집자만 빌드를 **Pause**, **Stop**, **Continue**할 수 있습니다. 뷰어는 지켜볼 수 있습니다.
- 빌드가 실행 중이거나 일시정지된 상태에서는 게시할 수 없습니다. 빌드가 멈추거나 끝나면 **Publish**를 쓸 수 있습니다. [게시와 공유](/ko/agent/publish-and-share/)를 참고하세요.

다음: [앱 사용해 보기](/ko/agent/use-your-app/).
