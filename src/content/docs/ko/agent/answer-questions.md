---
title: 질문에 답하기
description: Brainstorm Agent는 첫 메시지에서 비워 둔 것만 묻습니다. 추천 답을 고르거나 직접 입력하세요.
sidebar:
  order: 2
---

계획을 세우기 전에, **Brainstorm** 모드의 Agent는 팝업으로 몇 가지를 묻습니다. 첫 메시지에서 정하지 않은 것만 묻습니다. 이 예의 첫 메시지에는 목표, 장비, 요일, 세션 길이가 이미 들어 있었습니다(*I want to get stronger. I can train 3 days a week at the gym, about 45 minutes each time.*). 그래서 Health & fitness Agent는 건강, 경험, 단위에 대해 세 가지를 물었습니다.

1. Agent가 메시지를 읽을 때까지 기다립니다. Agent가 채팅에 짧은 메모를 쓰는데, 여기서는 “I'll shape Three Day Strength around three 45-minute gym sessions, with a strength plan and private workout and body logs. A few details will help tailor it to you.”입니다. 그러면 **Ask a question** 단계가 나타나고 대화 상자가 열립니다. Agent가 시작되는 동안에는 첫 답변까지 몇 분이 걸릴 수 있습니다.
2. 질문을 읽습니다. 맨 위의 작은 라벨은 주제(**HEALTH**)이고, 그 옆은 현재 라운드에서의 위치(**1 / 3**)입니다. 질문 아래에는 짧은 답 목록이 있고, 첫 번째 답에 **(Recommended)** 표시가 붙어 있습니다.

   ![대화 상자의 세 질문 중 첫 번째: HEALTH 질문과 None (Recommended), Injury or condition 답, Type your own answer 상자, Use recommendations, Stop brainstorming, Back, Next.](/images/agent/answer-questions-1.webp)

3. 답을 고르거나 **Type your own answer**에 직접 씁니다.
4. 다음 질문으로 가려면 **Next**를 클릭합니다. **Back**은 이전 질문으로 돌아갑니다. 마지막 질문에는 **Next** 대신 **Submit**이 있습니다.
5. **Submit**을 클릭합니다. Agent는 답에 맞춰 앱을 조정하겠다고, 다음 단계는 승인할 계획이라고 답합니다. 오른쪽의 미리보기 카드가 **Planning**으로 바뀌며 “Drafting the build plan”이라는 메모가 나옵니다.

이번 실행의 세 질문은 다음과 같았습니다.

- **HEALTH**: “Do you have any injuries or health conditions that could affect training?” 답: **None (Recommended)**, **Injury or condition**.
- **EXPERIENCE**: “How much strength-training experience do you have?” 답: **New (Recommended)**, **Trained for a while**, **Experienced**.
- **UNITS**: “Which units would you like for weights and body measurements?” 답: **kg and cm (Recommended)**, **lb and inches**.

예시에서 고른 답은 **None**, **Trained for a while**, **kg and cm**이었습니다. 두 번째는 추천 답이 아닙니다. 추천은 Agent의 가장 그럴듯한 추측일 뿐이기 때문입니다. 나에게 맞는 답을 고르세요.

## 알아 두기

- **Use recommendations**는 아직 답하지 않은 모든 질문에 추천 답을 채워서 한꺼번에 보냅니다. 이미 한 답은 그대로 유지됩니다. 특별한 의견이 없을 때 가장 빠르게 끝내는 방법입니다.
- Agent는 비워 둔 것만 묻기 때문에 첫 메시지가 길수록 질문이 줄어듭니다. Health & fitness Agent가 물을 수 있는 것은 일곱 가지입니다. 목표, 건강, 장비, 주당 일수, 경험, 세션 길이, 단위입니다. 모두 한 라운드에 묻기 때문에 한 번만 답하면 됩니다.
- 키와 몸무게를 물을 것이라고 생각할 수도 있지만, 묻지 않습니다. 몸무게는 앱이 만들어진 뒤 앱 안에서 기록합니다.
- 부상이나 건강 상태를 말하면 Agent는 더 조심스러운 계획을 만듭니다.
- **Stop brainstorming**은 질문에 답하지 않고 닫고, 입력 상자를 **Brainstorm**에서 **Build**로 바꿉니다. 닫기 버튼도 같은 일을 하므로, 이동할 때는 닫기 버튼이 아니라 **Back**과 **Next**를 사용하세요.
- **Submit** 이후에는 라운드가 끝납니다. 답이 잘못된 것으로 드러나면, 계획을 읽을 때 말하세요. 거기서 변경을 요청할 수 있습니다.
- Agent의 소유자와 편집자만 질문에 답할 수 있습니다. [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.

다음: [계획 승인하기](/ko/agent/approve-plan/).
