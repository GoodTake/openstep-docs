---
title: Agent 체크아웃
description: Agent를 만들거나 이미 있는 Agent를 고른 뒤, 모든 앱을 내 컴퓨터의 폴더로 복사합니다.
sidebar:
  order: 3
---

체크아웃하면 Agent의 활성 앱이 모두 새 폴더로 복사됩니다. 이후에는 그 폴더에서 작업합니다.

## 터미널에서 Agent 만들기

원하는 Agent가 이미 있다면 이 부분은 건너뜁니다.

1. 시작할 수 있는 제품을 확인합니다. Marketplace에 나열된 제품들입니다.

   ```sh
   openstep catalog
   ```

2. Agent를 만듭니다. 목록의 제품 키를 사용합니다.

   ```sh
   openstep agent create "My Agent" --product <product-key>
   ```

   `--product`를 생략하면 Web builder에서 시작합니다. 팀 워크스페이스에 Agent를 만들려면 `--workspace <workspace-slug>`를 붙입니다.

Agent를 만든다고 builder에게 메시지가 전송되지는 않습니다. 명령은 Agent의 ID를 알려 줍니다. [채팅](/ko/cli/chat/)을 시작하면 Agent가 작업을 시작합니다.

## Agent 체크아웃하기

1. 열 수 있는 Agent를 나열하고, 원하는 Agent의 ID를 적어 둡니다. 워크스페이스 하나만 나열하려면 `--workspace <workspace-slug>`를 붙입니다.

   ```sh
   openstep agent list
   ```

2. 폴더로 체크아웃합니다. 폴더는 새 폴더이거나 비어 있어야 합니다.

   ```sh
   openstep agent checkout <agent-id> ./my-agent
   ```

   Agent가 아직 준비 중이면 명령이 최대 2분 동안 기다립니다. 그때까지 준비되지 않으면 명령을 다시 실행합니다.

3. 폴더로 들어가 앱을 나열합니다.

   ```sh
   cd my-agent
   openstep apps list
   ```

## 폴더의 구성

```
my-agent/
  apps/
    web/
    admin/
  AGENTS.md
  .openstep/
```

- `apps/<app-key>/`에는 앱 하나의 소스가 있습니다. 앱마다 폴더가 하나씩 있으며 앱 키가 폴더 이름입니다. 편집은 여기에서 합니다.
- `AGENTS.md`는 내 컴퓨터의 코딩 Agent에게 OpenStep 규칙과 스킬이 담긴 `.openstep/instructions/README.md`를 읽으라고 안내합니다. CLI는 이 파일의 자기 블록을 최신 상태로 유지합니다. 그 블록 밖에 직접 쓴 줄은 그대로 유지됩니다.
- `.openstep/`은 CLI의 내부 기록 공간입니다. 연결된 Agent, 마지막으로 동기화한 소스의 사본, 진행 중인 요청에 대한 접수 기록이 들어 있습니다.

## 알아 두기

- 이후의 모든 명령은 `apps/web` 안이 아니라 이 폴더에서 실행합니다.
- `.openstep/`의 내용은 수정하거나 삭제하지 마세요. 직접 바꾸면 `diff`, `pull`, `push`가 무엇이 내 것인지 더 이상 구분하지 못합니다.
- 체크아웃은 폴더의 `.gitignore`에 `.openstep/`, `openstep.config.json`, `/AGENTS.md`를 추가하므로 git에는 포함되지 않습니다.
- 체크아웃은 이미 파일이 있는 폴더에는 쓰지 않습니다. 새 이름을 고르세요.
- 다음에 할 수 있는 일은 역할에 따라 다릅니다. 소유자는 게시하고, 소유자와 편집자는 빌드하고 편집하며, 뷰어는 읽기만 합니다. [CLI가 하는 일](/ko/cli/what-it-does/)을 참고하세요.

다음: [터미널에서 채팅하기](/ko/cli/chat/), 또는 바로 [앱을 로컬에서 실행하기](/ko/cli/dev/)로 이동합니다.
