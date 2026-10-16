---
title: 계획 승인하기
description: Agent가 작성한 계획을 읽고 승인하거나 변경을 요청합니다. 승인하기 전에는 아무것도 빌드되지 않습니다.
sidebar:
  order: 3
---

답을 받으면 Agent가 빌드 계획 초안을 작성합니다. 승인하기 전에는 아무것도 빌드되지 않으므로, 계획이 원하는 대로인지 확인할 때입니다.

1. 계획을 기다립니다. 초안을 작성하는 동안 오른쪽의 미리보기 카드에 **Planning**과 "Drafting the build plan"이 표시됩니다. 이 예에서는 약 8분이 걸렸습니다. 준비되면 입력 상자 위에 **Plan ready · 6 tasks** 막대가 나타나고, "1 finding · 0 open questions" 같은 한 줄과 **View build** 버튼이 있습니다. 그 아래에는 **Show the plan**, **Approve plan**, **Request changes**가 있는 상자가 있습니다.

   ![채팅: Plan ready · 6 tasks 막대와 그 아래의 Show the plan, Approve plan, Request changes. 입력 상자에는 계획이 결정을 기다리고 있다고 표시됨.](/images/agent/approve-plan-1.webp)

2. **Show the plan**을 클릭해 계획을 읽습니다. 다시 접으려면 **Hide the plan**을 클릭합니다.

   ![펼친 계획: Awaiting your approval이 표시된 Build plan, 1 App·6 Tasks·0 Missions·0 Contracts 카운터, Review & setup 섹션.](/images/agent/approve-plan-2.webp)

3. 결정합니다.
   - **Approve plan**을 클릭하면 빌드가 시작됩니다. 막대가 **Building · 0 of 6 done**으로 바뀌고 현재 작업의 이름과 타이머가 표시되며, 입력 상자에는 "Building — Pause or Stop to change direction."라는 안내와 함께 **Pause**와 **Stop**이 나옵니다. [빌드 지켜보기](/ko/agent/watch-build/)로 넘어가세요.
   - **Request changes**를 클릭하면 계획이 돌아갑니다. 메시지 상자에 바꾸고 싶은 내용을 쓰고 보냅니다. 먼저 아무것도 클릭하지 않고 메시지 상자에 바로 입력해도 됩니다. Agent가 다시 계획을 세우고 새 계획을 보여 줍니다. 그동안에는 아무것도 빌드되지 않습니다.

**Approve plan**과 **Request changes**는 펼친 계획의 맨 아래에도 있으므로 위로 다시 스크롤할 필요가 없습니다.

## 계획에 표시되는 내용

- **Build plan**에는 **Awaiting your approval** 표시가 붙고, **App**, **Tasks**, **Missions**, **Contracts** 카운터가 있습니다. 이 Agent는 **6 Tasks**로 **1 App**을 만듭니다. Missions와 Contracts는 코스를 운영하거나 블록체인 컨트랙트를 쓰는 Agent를 위한 것이라 여기서는 0입니다.
- **REVIEW & SETUP**: 모든 계획은 보기 전에 자동 검토를 거칩니다. 의견이 있으면 발견 사항으로 나열되고, 섹션에 "1 needs you"라고 표시됩니다. 승인하기 전에 읽어 보세요. 이 예에서는 검토 결과가 **Approved with findings**였고, 어떤 발견 사항도 계획을 멈추게 하지 않았습니다.
- **WHAT THIS BUILDS**: "Tasks run one at a time, in this order." 작업은 앱별로 묶여 있고, 각 작업에는 한 문장짜리 결과와 통과해야 하는 점검이 있습니다. 이 계획의 한 작업은 이렇게 적혀 있습니다. "Let a signed-in person start a day, save individual sets, finish a workout and inspect their own history." 마지막 그룹인 **Cross-app & integration**에는 앱들이 함께 동작하는지 보는 최종 점검이 들어 있습니다.

## Agent가 나에게 값을 요청할 때

어떤 계획에는 API 키나 지급용 지갑처럼 나만 줄 수 있는 것이 필요합니다. Agent는 이런 값을 지어내지 않습니다. 빌드를 이어가기 전에 대화 상자가 값을 요청합니다.

1. 대화 상자의 이름은 값의 이름이고, 무엇에 쓰는지 알려 줍니다. 값은 앱의 환경 값에 개발용과 라이브용으로 저장됩니다.
2. 값을 입력합니다. 비밀 값은 입력하는 동안 가려집니다.
3. **Provide and continue**를 클릭합니다. 빌드가 저절로 이어집니다.

**Not now**를 클릭하면 빌드는 기다립니다. 채팅에는 "The builder needs … to continue."라는 메모와, 대화 상자를 다시 여는 **Provide** 버튼이 남습니다. 아직 입력하지 않은 값은 Console → **Environment**의 **Requested by the build** 아래에도 나열됩니다.

가끔은 값 대신 몇 가지 선택지 중에서 고르라고 묻기도 합니다. 이때는 "Or write your own answer"라고 적힌 상자에 직접 답을 쓸 수 있습니다.

Health & fitness Agent에는 필요한 값이 없어서 묻지 않습니다. 외부 서비스를 호출하는 Agent는 값을 필요로 합니다.

## 알아 두기

- Agent의 소유자와 편집자만 계획을 승인하고, 변경을 요청하고, 값을 입력할 수 있습니다. 뷰어는 계획을 읽을 수 있습니다. [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.
- 계획을 아직 작성하는 중에는 입력 상자에 메시지 상자 대신 **Pause**와 **Stop**이 나옵니다. [빌드 지켜보기](/ko/agent/watch-build/)를 참고하세요.
- 계획 작성을 포함해 Agent의 작업에는 SSU가 듭니다.

다음: [빌드 지켜보기](/ko/agent/watch-build/).
