---
title: 터미널에서 채팅하기
description: 터미널을 떠나지 않고 builder와 대화하고, 질문에 답하고, 계획을 승인하고, 빌드를 일시정지하거나 중지합니다.
sidebar:
  order: 4
---

`openstep agent chat` 명령은 Agent의 builder에게 메시지를 하나 보냅니다. 작업 페이지에서 대화하는 것과 같은 builder입니다. CLI는 턴이 진행되는 모습을 그대로 보여 줍니다. 턴이 끝나거나, 질문·승인할 계획·제공할 값처럼 builder가 나에게서 필요한 것이 생기면 멈춥니다.

Agent의 소유자 또는 편집자여야 합니다. 빌드에는 작업 페이지와 마찬가지로 SSU가 듭니다.

## 메시지 보내기

1. 모드를 고릅니다. 먼저 원하는 것을 이야기하려면 `brainstorm`을, builder가 Agent를 바로 바꾸게 하려면 `build`를 사용합니다. [Build와 Brainstorm](/ko/build/modes/)을 참고하세요.

   ```sh
   openstep agent chat "Add a page where guests can book a table" --mode brainstorm
   ```

   `--mode`가 없으면 메시지는 `build`로 실행됩니다.

2. builder에게 내가 보고 있는 앱과 파일을 알려 주려면 `--app`과 `--path`를 붙입니다. 이는 힌트일 뿐 제한이 아닙니다. builder는 다른 앱도 바꿀 수 있습니다.

   ```sh
   openstep agent chat "Make this header sticky" --mode build --app web --path src/App.tsx
   ```

3. CLI는 턴의 이벤트를 터미널에 출력하고, 턴 ID와 상태를 끝으로 마칩니다. 턴 ID를 보관하세요. 질문에 답하거나 이어서 볼 때 필요합니다.

## 질문에 답하기

Brainstorm에서는 builder가 질문을 한 라운드 합니다. 출력의 질문 이벤트에 요청 ID가 들어 있습니다.

```sh
openstep agent question --turn <turn-id> --request <request-id> --answers '[["Option A"],["Yes"]]'
```

`--answers`는 질문마다 안쪽 목록 하나씩을 담은 JSON 목록입니다. 질문에 답하지 않으려면 `--answers` 대신 `--reject true`를 사용합니다.

## 계획 승인하기

builder가 내 응답을 기다리는 계획을 보여 주면 출력에 계획과 그 해시가 포함됩니다. 승인하거나 변경을 요청합니다.

```sh
openstep agent plan approve --hash <plan-hash>
openstep agent plan request-changes --hash <plan-hash> --comment "Leave out the admin page"
```

`request-changes`에는 `--comment`가 필요합니다. `approve`에서는 코멘트가 선택 사항입니다. 작업 페이지의 [계획 승인하기](/ko/agent/approve-plan/)와 같은 단계입니다.

## 요청받은 값 제공하기

일부 계획은 API 키처럼 나만 줄 수 있는 값을 선언합니다. 무엇이 요청되었고 이미 무엇을 제공했는지 보려면 다음을 실행합니다.

```sh
openstep agent plan values --app <app-key>
```

값을 제공하려면 다음 명령을 실행하고, 요청이 나오면 값을 입력합니다. 입력한 값은 화면에 표시되지 않으며 채팅 기록에도 저장되지 않습니다. 표준 입력으로 값을 파이프로 넘길 수도 있습니다.

```sh
openstep agent plan value <name> --app <app-key>
```

builder는 빌드 도중에 멈추고 입력을 요청할 수도 있습니다. 출력에 나온 입력 요청 ID로 답합니다.

```sh
openstep agent input <input-request-id> --choice <option>
openstep agent input <input-request-id> --text "your answer"
```

`--choice`와 `--text`를 생략하면 위와 같은 방식으로 값을 숨김 입력으로 제공합니다.

빌드가 작업 하나에서 멈추고 질문하면, 출력에 나온 작업 키로 답합니다.

```sh
openstep agent task-answer <task-key> --text "your answer"
```

## 빌드 일시정지, 계속, 중지

```sh
openstep agent pause
openstep agent continue
openstep agent stop
```

`openstep agent stop --turn <turn-id>`는 턴 하나를 중지합니다. CLI가 어떤 조작의 결과를 알 수 없다고 하면, 다시 시도하기 전에 `openstep status`를 실행해 Agent의 상태를 확인합니다.

## 턴 이어서 보기

연결이 끊기거나 터미널을 닫아도 턴은 플랫폼에서 계속 실행됩니다. CLI는 메시지를 보내기 전에 턴 ID를 `.openstep/chat.json`에 저장합니다. 계속 지켜보려면 턴을 이어서 봅니다.

```sh
openstep agent chat --turn <turn-id>
openstep agent chat
```

두 번째 형태는 CLI가 저장한 턴을 사용합니다. 복구하려고 같은 메시지를 다시 보내지 마세요. 두 번째 턴이 시작됩니다. 이전 채팅을 읽으려면 다음을 실행합니다.

```sh
openstep agent chat --history true
```

## 알아 두기

- builder가 끝나면 `openstep pull`을 실행해 변경 사항을 내 폴더로 가져옵니다. 내 편집은 그 뒤에 푸시합니다. [푸시와 게시](/ko/cli/push-publish/)를 참고하세요.
- `--json`을 붙이면 스트림 대신 기계가 읽을 수 있는 결과 하나를 얻습니다.

다음: [앱을 로컬에서 실행하기](/ko/cli/dev/).
