---
title: 라이브로 전환하기
description: Publish는 모든 앱을 함께 온라인에 올립니다. 이전 버전으로 롤백하거나, 사이트를 오프라인으로 내리거나, 다시 올릴 수 있습니다.
sidebar:
  order: 12
---

**Publish**는 Preview에서 보이는 것을 자체 주소가 있는 라이브 사이트로 바꿉니다. Agent의 모든 앱을 함께 라이브로 올리며, 소유자만 할 수 있습니다. 게시하기 전까지 사이트는 Preview에만 있습니다.

1. builder가 작업을 마칠 때까지 기다립니다. 작업하는 동안에는 헤더의 **Publish**가 회색으로 비활성화됩니다.
2. 헤더의 **Publish**를 클릭합니다. **Publish your agent** 대화 상자가 열리며 **Every app of this agent goes live together.** 문구가 나옵니다. 다음에 일어날 일인 **Check**, **Build**, **Go live**와, **Publish 1 app · Data and learner progress stay as they are.** 같은 한 줄이 표시됩니다. 각 앱은 상태와 함께 나열됩니다. 처음 게시할 때는 **Not live yet**, 이후에는 **Code changed** 또는 **No changes**입니다.
3. 대화 상자에서 **Publish**를 클릭합니다. **Check your agent**, **Build and test every app**, **Switch every app live together** 단계가 있는 카드가 진행 상황을 보여 줍니다. 진행되는 동안에도 계속 작업할 수 있습니다. 앱 하나에 약 2분이 걸렸습니다.
4. 끝나면 **Your agent is live** 카드가 앱의 주소와 함께 나타나며, 주소를 열거나 복사하는 버튼이 있습니다.

![The Cozy Coffee Table의 Publish your agent 대화 상자. 세 단계가 있고 앱이 Not live yet으로 나열됨.](/images/build/go-live-2.webp)

그런 다음 **Console**을 열고 **Production**을 클릭합니다. 날짜와 함께 **Live since**, 각 앱의 주소, 각 앱의 주소(**Access**가 **Learners only**일 때는 참여 링크도)가 담긴 짧은 초대 메시지를 복사하는 **Copy invitation**, 게시한 모든 버전의 목록인 **Versions**가 표시됩니다. 현재 버전에는 **Live** 표시가 붙습니다.

![첫 Publish 이후의 Console → Production: Live since 날짜, The Cozy Coffee Table의 주소, Live로 표시된 버전 하나.](/images/build/go-live-1.webp)

## Publish가 하는 일과 하지 않는 일

- 모든 앱이 함께 라이브로 올라갑니다. 앱 하나라도 실패하면 Publish 전체가 실패하고, 아무것도 바뀌지 않으며 라이브 사이트는 이전 그대로입니다. 상태에 무엇이 잘못되었는지가 표시되고 **The live version did not change.** 문구로 끝납니다.
- 점검에서 앱의 문제가 발견되면 builder가 직접 고치고 다시 게시할 수 있습니다. 값처럼 나에게서 받아야 할 것이 있으면 상태에 **Publishing waits for you.** 문구가 나타납니다.
- Publish는 데이터와 학습자 진행 상황을 유지하며 새 세션을 시작하지 않습니다. 예약 등 라이브 기록은 그대로 남습니다. 업데이트가 데이터를 제거하게 되는 경우, 예를 들어 새 버전에 더 이상 없는 테이블이나 필드가 있으면 게시하기 전에 Publish 대화 상자가 경고하며, 그렇게 제거된 데이터는 되돌릴 수 없습니다.
- 게시한 뒤에도 Preview는 계속 초안으로 동작합니다. 이후의 변경은 다시 게시하기 전까지 라이브 사이트에 반영되지 않습니다.
- 사이트를 열 수 있는 사람(**Anyone with the link** 또는 **Learners only**)은 Agent의 설정입니다. [게시와 공유](/ko/agent/publish-and-share/)를 참고하세요.

## 이전 버전으로 롤백

1. **Console**을 열고 **Production**을 클릭한 뒤 **Versions**에서 해당 버전을 찾습니다.
2. 버전 옆의 **Roll back**을 클릭합니다. **Roll back** 대화 상자가 해당 날짜에 게시된 버전으로 돌아갈지 묻습니다. 데이터와 학습자 진행 상황은 그대로 유지됩니다.
3. **Roll back to this version**을 클릭합니다. 모든 앱이 함께 전환됩니다.

롤백은 이전 버전의 코드를 되돌립니다. 데이터의 변경을 되돌리지는 않으며, Preview의 초안도 바꾸지 않습니다. 더 새로운 버전이 이전 버전이 읽는 데이터를 제거했다면 롤백이 거부됩니다. 플랫폼은 라이브였던 최근 다섯 버전을 보관합니다. 그보다 오래된 버전에는 **No longer kept**가 표시됩니다. 빌드가 실행 중일 때는 롤백도 기다려야 하므로, 먼저 빌드를 일시정지하거나 중지하세요.

## 사이트를 오프라인으로 내리기

1. **Console**을 열고 **Production**에서 **Live since** 옆의 **Unpublish**를 클릭합니다.
2. **Unpublish** 대화 상자에서 **Take it offline**을 클릭합니다.

모든 앱이 서비스를 멈춥니다. 마지막 라이브 버전, 데이터, 도메인, 설정은 모두 유지됩니다.

## 다시 온라인으로 올리기

사이트가 오프라인인 동안 **Production**에 **This agent is offline. Its data is kept.** 문구가 나타납니다. **Put the last version back**을 클릭합니다. 플랫폼에서는 이를 Republish라고 부릅니다. 마지막 라이브 버전을 다시 빌드하지 않고 되돌립니다. 그 사이에 사이트를 바꿨다면 대신 **Publish**를 클릭해 새 버전을 라이브로 올립니다.

## 알아 두기

- **Publish**, **Roll back**, **Unpublish**, 그리고 버전 되돌리기는 소유자만 할 수 있습니다. 편집자와 뷰어는 **Production**을 볼 수 있습니다.
- 데이터를 비우고 처음부터 다시 시작하려면 **Console** → **Sessions**의 **Start a new session**을 사용합니다. Publish는 절대 그렇게 하지 않습니다. [게시와 공유](/ko/agent/publish-and-share/)를 참고하세요.
- 사이트에 내 주소를 주려면 [도메인](/ko/build/domains/)을 참고하세요.

다음: [도메인](/ko/build/domains/).
