---
title: 푸시와 게시
description: push로 변경 사항을 Agent에 저장하고, publish로 모든 앱을 함께 라이브로 올립니다.
sidebar:
  order: 6
---

푸시와 게시는 두 단계입니다. Push는 소스를 Agent에 저장합니다. Publish는 저장된 소스를 라이브로 올립니다. 푸시만으로는 절대 게시되지 않습니다.

둘 다 Agent 전체에 적용되므로 모든 앱이 함께 움직입니다.

## 변경 사항 저장하기

1. 무엇이 바뀌었는지 확인합니다. 앱마다 내 폴더를 Agent가 수락한 소스와 비교합니다. 마지막으로 동기화한 뒤 Agent가 바뀌었는지도 보여 줍니다. 예를 들어 builder가 턴을 마쳤을 때입니다.

   ```sh
   openstep diff
   ```

2. Agent의 새 내용을 가져옵니다. pull은 Agent가 수락한 변경 사항을 내 폴더에 병합하며 내 편집을 덮어쓰지 않습니다.

   ```sh
   openstep pull
   ```

3. pull이 충돌을 알리면 파일을 열고 남기고 싶은 내용을 남깁니다. 바이너리 파일은 원하는 버전을 남깁니다. 그런 다음 CLI에 파일이 정리되었음을 알립니다. 충돌하는 파일마다 이렇게 합니다.

   ```sh
   openstep resolve apps/web/src/App.tsx
   ```

4. 푸시합니다.

   ```sh
   openstep push
   ```

   이제 Agent는 내 변경 사항을 소스로 가집니다. 라이브 버전은 바뀌지 않습니다.

## 게시

게시는 소유자 전용입니다.

1. publish를 실행합니다. 노트는 선택 사항이며 1자에서 500자여야 합니다.

   ```sh
   openstep publish --note "First release"
   ```

   publish를 하려면 모든 앱이 동기화되어 있고, 충돌이 없으며, 푸시하지 않은 편집이 없어야 합니다. 대신 푸시해 주지는 않습니다. 로컬 소스에 게시되지 않은 편집이 있다고 나오면 diff를 검토하고 먼저 푸시합니다.

2. 결과를 확인합니다. publish 명령이 출력한 작업 ID를 사용합니다. 상태가 `succeeded`이면 게시가 끝난 것입니다.

   ```sh
   openstep status <operation-id>
   ```

   ID 없이 `openstep status`를 실행하면 마지막으로 시작한 publish, rollback, unpublish, republish를 읽습니다. 없으면 Agent를 읽습니다.

게시해도 데이터는 유지됩니다. 라이브 앱을 열 수 있는 사람과 방문자에게 보이는 내용은 [게시와 공유](/ko/agent/publish-and-share/)를 참고하세요.

## 롤백, 게시 취소, 다시 게시

이 명령도 Agent 전체에 적용됩니다. `--app` 옵션은 없습니다. 모두 선택 사항인 `--note`를 받습니다.

```sh
openstep rollback <generation-id> --note "Restore prior release"
openstep unpublish --note "Take the agent offline"
openstep republish --note "Bring back the last live version"
```

- rollback은 Agent가 아직 보관 중인 이전 릴리스를 복원합니다. 게시에 성공하면 만들어진 릴리스의 ID가 출력됩니다.
- unpublish는 모든 앱을 오프라인으로 내립니다.
- republish는 unpublish로 내린 버전을 다시 올립니다.

브라우저에서 같은 동작을 하려면 [라이브로 전환하기](/ko/build/go-live/)를 참고하세요.

## 결과를 알 수 없을 때

네트워크 끊김 등으로 푸시나 게시가 중간에 끊기면 반영되었는지 알 수 없을 수 있습니다. 새로 시작하지 마세요.

- 같은 폴더에서 같은 명령을 다시 실행합니다. CLI는 보낸 요청을 기억하고 플랫폼에 무슨 일이 있었는지 묻습니다. 변경을 두 번 보내지 않습니다.
- 게시라면 `openstep status <operation-id>`가 같은 작업을 읽습니다.
- 푸시가 변경은 수락되었지만 아직 동기화 중이라고 알리면, 게시하기 전에 `openstep pull`을 실행합니다.
- 라이브 명령이 아직 대기 중일 때는 어떤 라이브 명령을 실행해도 대기 중인 명령을 읽기만 하고 다른 명령을 시작하지 않습니다.
- 푸시가 아직 대기 중일 때는 publish가 시작되지 않습니다. 먼저 푸시를 끝내세요.
- `.openstep/`은 그대로 두세요. 막힌 상황을 풀려고 그 안의 파일을 삭제하지 마세요.

## 알아 두기

- 푸시는 소유자와 편집자가 할 수 있습니다. 게시, 롤백, 게시 취소, 다시 게시는 소유자 전용입니다.
- builder가 계획된 빌드를 실행하는 동안 Agent는 읽기 전용입니다. 끝날 때까지 기다린 뒤 `pull`하고 푸시합니다.
- `diff`, `push`, `pull`은 앱 폴더의 `.gitignore` 파일이 무시하는 파일(예: `dist/`)을 대상에서 뺍니다. 단 Agent가 수락한 소스에 이미 있는 파일은 빼지 않습니다. Git이 이미 추적하는 파일을 다루는 방식과 같습니다. 게시할 때도 이런 파일은 푸시하지 않은 편집으로 세지 않습니다. 이런 파일을 Agent가 수락한 소스에서 없애려면 내 폴더에서 삭제한 뒤 푸시하세요.
- 이름이 `.env`로 시작하는 파일, `.npmrc`, 키 파일 등이 폴더에 있으면 `.gitignore`에 적혀 있어도 `diff`, `pull`, `push`가 멈춥니다. 메시지는 `Local source path refused:`로 시작하며 경로와 이유를 알려 줍니다. [내 코드를 앱으로 옮기기](/ko/cli/bring-your-code/#3-내-코드를-앱으로-옮기기)를 참고하세요.

다음: [앱, 데이터, 컨트랙트](/ko/cli/apps-data-contracts/).
