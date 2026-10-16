---
title: 게시와 공유
description: Agent를 게시해 라이브 링크를 받고, 열 수 있는 사람을 정하고, 깨끗한 상태로 돌아가고 싶을 때 새 세션을 시작합니다.
sidebar:
  order: 6
---

게시하면 Agent의 모든 앱이 다른 사람에게 보낼 수 있는 주소로 함께 라이브가 됩니다. Agent는 소유자만 게시할 수 있습니다.

## 처음 게시하기

1. 헤더의 **Publish**를 클릭합니다. 빌드가 끝나면 버튼이 밝아집니다. 회색으로 비활성화되어 있으면 버튼에 마우스를 올려 이유를 확인하세요. 예를 들어 Agent가 아직 빌드 중이면 “Publishing opens once the build stops.”라고 나옵니다.
2. 대화 상자를 읽습니다. 이름은 **Publish your agent**이며 “Every app of this agent goes live together.”라고 나옵니다. **What happens next** 아래에는 **Check** › **Build** › **Go live**와 “You can keep working while it runs.”가 있습니다. 그 아래의 “Publish 1 app · Data and learner progress stay as they are.”에는 각 앱이 상태와 함께 나열되며, 처음에는 **Not live yet**입니다. 버튼 위의 **Show the review**를 펼치면 빌드의 최종 검토가 나옵니다.

   ![Three Day Strength의 Publish your agent 대화 상자: Check, Build, Go live가 있는 What happens next, Not live yet으로 표시된 Three Day Strength 행, Show the review, 그리고 Cancel과 Publish 버튼.](/images/agent/publish-and-share-1.webp)

3. **Publish**를 클릭합니다. 대화 상자가 닫히고 오른쪽 아래에 **Publishing…** 문구와 세 단계가 있는 카드가 나타납니다. 세 단계는 **Check your agent**, **Build and test every app**, **Switch every app live together**입니다. 실행되는 동안 헤더의 **Publish** 버튼은 회색으로 비활성화됩니다. 그동안 채팅에서 계속 작업할 수 있습니다. 이 앱 하나를 게시하는 데 약 1분 30초가 걸렸습니다.
4. 카드가 **Your agent is live**로 바뀌면 각 앱의 이름과 주소, 그리고 주소를 여는 버튼과 링크를 복사하는 버튼이 표시됩니다. 주소는 `https://app-….openstep.academy` 형태입니다.

## 링크 공유하기

카드의 주소를 앱을 써 보게 하고 싶은 누구에게나 보내세요. Console의 **Production**에서 다시 찾을 수 있습니다. 날짜와 시간이 있는 **Live since**와 그 옆의 **Unpublish**, 각 앱의 라이브 주소, 그리고 각 앱의 주소(**Access**가 **Learners only**일 때는 참여 링크도)가 담긴 짧은 초대 메시지를 복사해 붙여 넣을 수 있게 해 주는 **Copy invitation**이 표시됩니다. **Versions** 아래에서는 라이브 중인 버전에 **Live** 표시가 붙습니다.

![Publish 이후의 Console, Production: 16 Oct 2026, 8:13 pm의 Live since와 Unpublish, Three Day Strength의 라이브 주소, Copy invitation, 그리고 라이브 버전에 Live가 표시된 Versions.](/images/agent/publish-and-share-2.webp)

링크를 여는 누구나 앱을 볼 수 있습니다. 운동, 몸무게, 신체 치수 기록을 남기려면 각 방문자가 자신의 지갑으로 로그인하며, 자신의 기록은 본인만 봅니다.

## 열 수 있는 사람 정하기

**Console**을 열고 **Settings**를 엽니다. **Access**는 **Collaborators** 아래에 있습니다. 소유자만 바꿀 수 있습니다. 변경은 즉시 적용되며 데이터에는 영향을 주지 않습니다.

- **Anyone with the link**는 주소를 아는 누구나 앱을 열 수 있게 합니다. **Health & fitness**에서 선택되어 있는 설정입니다.
- **Learners only**는 참여 링크로 들어온 학습자와 Agent의 협업자만 열 수 있게 합니다. 이 모드에서는 커스텀 도메인이 제공되지 않습니다. 이 설정을 선택하면 **Copy invitation**에 학습자가 먼저 사용하는 참여 링크도 포함됩니다.

![Console, Settings: Manage collaborators가 있는 Collaborators 카드, 그리고 Anyone with the link가 선택되고 그 아래에 Learners only가 있는 Access.](/images/agent/publish-and-share-3.webp)

## 나중에 변경 게시하기

앱을 바꾸고 다시 게시하면 대화 상자의 이름은 **Publish your changes**입니다. **Production**에서 각 앱에 무엇이 바뀌었는지가 **No changes**, **Code changed**, **Live values changed** 중 하나로 표시됩니다. 게시해도 데이터와 학습자 진행 상황은 유지되며 새 세션이 시작되지 않습니다. 업데이트가 데이터를 제거하게 되는 경우, 예를 들어 새 버전에 더 이상 없는 테이블이나 필드가 있으면 **Publish**를 클릭하기 전에 Publish 대화 상자가 “This version may remove data from …”이라고 알려 주며, 그렇게 제거된 데이터는 되돌릴 수 없습니다. 이전 버전으로 되돌리거나 앱을 오프라인으로 내리거나 다시 올리는 방법은 [라이브로 전환하기](/ko/build/go-live/)를, 내 주소를 추가하는 방법은 [도메인](/ko/build/domains/)을 참고하세요.

## 새 세션 시작하기

**Start a new session**은 예를 들어 새로운 그룹을 위해 깨끗한 상태로 돌아가는 기능입니다. 소유자만 할 수 있습니다. **Console**을 열고 **Sessions**를 연 뒤 **Start a new session**을 클릭합니다. 대화 상자에 “Start a new session?”이라는 질문이 나오고, 모든 앱의 데이터와 모든 학습자의 진행 상황을 지운다는 설명이 있습니다. 멤버, 역할, 이름은 유지됩니다. 진행하려면 **Clear and start again**을 클릭하고, 취소하려면 **Cancel**을 클릭합니다.

게시는 절대 이렇게 하지 않습니다. 버튼이 회색으로 비활성화되어 있으면 페이지에 “There is no session to clear yet.”라고 나옵니다. Agent가 아직 빌드 중이면 먼저 빌드를 중지하거나 끝나기를 기다리세요.

## 알아 두기

- 앱을 라이브로 운영하는 데도 빌드와 마찬가지로 SSU 잔액이 차감됩니다. 각 차감 내역은 [잔액 확인](/ko/account/balance/) 페이지의 **Activity** 아래에 표시됩니다.
- 다른 사람은 내가 추가해야만 Agent를 바꿀 수 있습니다. [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.

다음: [다른 사람과 함께 작업하기](/ko/agent/work-with-others/).
