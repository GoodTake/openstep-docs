---
title: 모델 고르기
description: 모델을 Auto로 두거나, 이후 메시지에 쓸 모델을 직접 고릅니다.
sidebar:
  order: 5
---

builder는 AI 모델로 동작합니다. 기본값인 **Auto**는 요청마다 가장 알맞은 모델을 고르며, 대부분의 사이트에는 이것으로 충분합니다. 직접 고르고 싶다면 모드가 있는 같은 메뉴에서 이름이 있는 모델을 고를 수 있습니다.

1. 채팅 상자 아래쪽의 칩(예: **Auto · Build**)을 클릭합니다. **New agent**와 **Home**에서는 모델 컨트롤 **Auto**가 **Build** / **Brainstorm** 토글 옆에 있습니다.
2. **Select model**(**Choose how STEPS routes this turn**) 아래에서 **Auto**(**Best model for each request**)를 그대로 선택해 두거나, **Choose model**(**Pick a model for this run**) 아래의 목록에서 모델 하나를 클릭합니다.
3. 메시지를 보냅니다. 칩에 지금 표시된 모델로 실행됩니다.

![열린 채팅 상자의 칩: Auto에 체크된 Select model, 그 아래의 짧은 Choose model 목록, 맨 아래의 Run mode.](/images/build/choose-model-1.webp)

모델을 바꾼다고 저절로 무언가가 시작되지는 않습니다. 다음 메시지가 처리되는 방식만 바뀝니다.

## 알아 두기

- **Choose model** 아래의 목록은 시간이 지나며 바뀌므로, 이 안내서는 모델 이름을 적지 않습니다. 메뉴에는 항상 지금 쓸 수 있는 모델이 표시됩니다.
- builder가 작업하는 동안에는 칩이 회색으로 비활성화됩니다. 모델은 메시지 사이에 바꾸세요.
- 칩에 **Loading models**라고 나오면 잠시 기다립니다. **Models unavailable**이라고 나오면 칩을 클릭해 다시 시도합니다.
- 같은 메뉴에 모드도 있습니다. [Build와 Brainstorm](/ko/build/modes/)을 참고하세요.

다음: [진행 상황 확인하기](/ko/build/progress/).
