---
title: CLI가 하는 일
description: 내 컴퓨터와 에디터에서 Agent를 작업한 뒤, 변경 사항을 푸시하고 게시합니다.
sidebar:
  order: 1
---

OpenStep CLI를 쓰면 내 컴퓨터에서 Agent를 작업할 수 있습니다. Agent의 앱을 폴더 하나로 복사하고, 내 에디터에서 편집하고, 로컬에서 실행한 뒤, 변경 사항을 다시 보냅니다.

작업 페이지에서도 같은 일을 브라우저로 할 수 있습니다. 내 에디터, 내 컴퓨터의 코딩 Agent, 로컬에서 실행되는 앱이 필요할 때 CLI를 사용하세요.

## 할 수 있는 일

- Agent 체크아웃. Agent의 모든 앱을 폴더로 복사합니다. [Agent 체크아웃](/ko/cli/checkout/)을 참고하세요.
- 터미널에서 채팅. builder와 대화하고, 질문에 답하고, 계획을 승인하고, 일시정지하거나 중지합니다. [터미널에서 채팅하기](/ko/cli/chat/)를 참고하세요.
- 앱을 로컬에서 실행. 앱의 프런트엔드와 백엔드를 내 컴퓨터에서 시작합니다. [앱을 로컬에서 실행하기](/ko/cli/dev/)를 참고하세요.
- 푸시와 게시. 변경 사항을 Agent에 저장한 뒤 모든 앱을 함께 라이브로 올립니다. [푸시와 게시](/ko/cli/push-publish/)를 참고하세요.
- 앱, 데이터, 컨트랙트 관리. 앱을 추가하고, 환경 값을 설정하고, 개발 데이터에 SQL을 실행하고, 앱이 쓰는 스마트 컨트랙트를 배포합니다. [앱, 데이터, 컨트랙트](/ko/cli/apps-data-contracts/)를 참고하세요.
- 기존 코드 가져오기. 이미 만든 사이트를 앱으로 옮기고, 그 안에서 OpenStep 로그인, 이메일, AI, 온체인 동작을 사용합니다. [기존 코드 가져오기](/ko/cli/bring-your-code/)를 참고하세요.

## 처음부터 끝까지 한 번의 작업

사용하게 될 명령을 순서대로 나열했습니다. 이 섹션의 각 페이지가 한 단계씩 설명합니다.

```sh
openstep login https://builder.openstep.academy
openstep agent checkout <agent-id> ./my-agent
cd my-agent
openstep agent chat "Describe what you want" --mode build
openstep pull
openstep dev
openstep diff
openstep push
openstep publish --note "First release"
```

## 누가 무엇을 할 수 있는가

CLI는 작업 페이지와 같은 역할을 따릅니다.

- **Owner**: 편집자가 할 수 있는 모든 것에 더해 Publish, Rollback, Unpublish, Republish, 프로덕션 환경 값, 컨트랙트 배포.
- **Editor**: builder와 채팅, 소스 편집과 푸시, 앱 추가 또는 보관, 개발용 환경 값 설정.
- **Viewer**: 읽기 전용.

사람들이 이 역할을 얻는 방법은 [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.

## 알아 두기

- 모든 명령은 `agent checkout`이 만든 Agent 폴더에서 실행합니다. 앱 폴더 안에서 명령을 실행하지 마세요.
- `openstep --help`는 모든 명령을 나열합니다. `openstep <command> --help`는 명령 하나와 그 옵션을 보여 줍니다. 예: `openstep agent chat --help`.
- 명령에 `--json`을 붙이면 기계가 읽을 수 있는 출력이 나옵니다.
- 앱을 로컬에서 실행하면 실제 개발 데이터를 사용하며, AI나 이메일 같은 플랫폼 기능에는 평소처럼 SSU가 듭니다. [앱을 로컬에서 실행하기](/ko/cli/dev/)와 [잔액 확인](/ko/account/balance/)을 참고하세요.

다음: [설치와 로그인](/ko/cli/install/).
