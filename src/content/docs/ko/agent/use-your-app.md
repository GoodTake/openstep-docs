---
title: 앱 사용해 보기
description: Preview에서 완성된 앱을 써 보고, Data 탭에서 저장된 내용을 확인하고, Agent에게 변경을 요청합니다.
sidebar:
  order: 5
---

빌드가 끝나면 작업 페이지의 **Preview**에서 앱을 써 볼 수 있습니다. 이것은 개발용 사본입니다. 다른 사람이 보기 전에 얼마든지 사용하고 테스트할 수 있습니다.

1. 작업 페이지의 오른쪽을 봅니다. 빌드 카드가 앱으로 바뀌어 있습니다. Console이 아직 열려 있으면 **✕** 버튼으로 닫습니다. 앱 위에는 **Preview**와 **Data** 탭, **Home**으로 시작하는 페이지 메뉴, 데스크톱과 휴대폰 크기를 전환하는 메뉴, 그리고 미리보기를 새 탭에서 여는 **Open ↗** 버튼이 있습니다.
2. 앱 자체를 봅니다. Three Day Strength에는 맨 위에 자체 메뉴인 **Plan**, **Workout**, **History**, **Progress**가 있습니다. 홈 페이지에는 "Get stronger, one focused session at a time."라는 문구와 **Start logging →**, **Connect Wallet** 버튼이 있고, "Three days. Four movements. Steady progress." 카드가 계획을 요약합니다. 45분, 주 3일, 운동 4가지입니다.
3. **Plan**을 엽니다. **THE PLAN**, "Repeat weekly · rest between sessions"이며 요일별로 나뉘어 있습니다. **Day A**는 "Session 1 · 4 movements"이고, 각 운동에는 일러스트, 세트와 반복 횟수, 자극하는 근육이 있습니다. 처음 두 개는 백 스쿼트(3세트 × 5–8회)와 바벨 벤치 프레스(3세트 × 5–8회)입니다. 아래에 더 많은 날이 이어집니다. 로그인하지 않아도 계획을 읽을 수 있습니다.

   ![빌드가 끝난 뒤의 Three Day Strength 작업 페이지: 채팅의 Ready to publish 막대, 그리고 Preview에서 Back squat과 Barbell bench press 일러스트가 있는 Day A를 보여 주는 앱의 Plan 페이지.](/images/agent/use-your-app-1.webp)

4. 훈련을 기록합니다. 기록은 비공개이므로 앱이 먼저 지갑으로 로그인하라고 요청합니다. 로그인하기 전에는 **Workout**에 "Sign in with your wallet to log your private workouts."라는 문구와 **Connect Wallet** 버튼이 나옵니다. 로그인한 뒤에는 운동하면서 세트를 하나씩 저장합니다("One set at a time. Save your work as you go.").
5. 기록과 진행 상황을 확인합니다. **History**와 **Progress**도 같은 방식으로 비공개입니다. 각 사람이 자신의 지갑으로 로그인하고 자신의 기록만 봅니다. Agent는 세트별 기록과, 내가 고른 단위인 kg과 cm로 된 비공개 몸무게·신체 치수 추적을 계획했습니다. 몸무게와 신체 치수는 **Progress**에 입력합니다.
6. **Data** 탭을 열어 앱이 저장하는 내용을 봅니다. "View and manage the data stored in your app."라는 문구와 함께 테이블마다 카드가 하나씩 있고 행 수가 표시됩니다. Three Day Strength의 테이블은 `measurements`, `orders`, `settings`, `users`, `weight_entries`, `workout_sets`, `workouts`입니다. 테이블을 열면 행이 보입니다. 이번 실행에서는 아직 아무도 기록하지 않아서 모든 테이블이 비어 있었습니다.
7. 변경을 요청합니다. 왼쪽 메시지 상자에 입력하세요. 예를 들어 네 번째 훈련일, 다른 문구, 다른 디자인을 요청해 보세요.

앱의 모든 페이지 끝에는 의학적 조언이 아니며, 새로운 훈련이나 체중 감량 계획을 시작하기 전에 의사나 자격을 갖춘 코치와 상담해야 한다는 안내가 있습니다.

## 알아 두기

- **Preview**에서 하는 일은 개발용 데이터입니다. 게시한 뒤의 라이브 앱 데이터와는 분리되어 있으므로 마음껏 테스트할 수 있습니다. [사이트 데이터](/ko/build/data/)를 참고하세요.
- 앱을 실제 크기로 보거나 휴대폰에서 확인하려면 **Open ↗** 버튼이 편리합니다.
- 새로운 문구, 숫자, 색상, 이미지 같은 작은 변경은 바로 반영됩니다. **Brainstorm**에서 더 큰 변경은 질문과 계획을 다시 거치며, 무언가가 빌드되기 전에 계획을 승인합니다. [Build와 Brainstorm](/ko/build/modes/)을 참고하세요.
- 앱의 코드는 Console의 **Code**에서 읽을 수 있지만, 앱은 채팅으로 요청해서 바꿉니다. [코드 보기](/ko/build/code/)를 참고하세요.
- 아직 공개된 것은 없습니다. 게시해야 앱이 라이브가 됩니다.

다음: [게시와 공유](/ko/agent/publish-and-share/).
