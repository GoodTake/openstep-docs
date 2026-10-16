---
title: 다른 사람과 함께 작업하기
description: 팀 워크스페이스에서 Agent에 협업자를 초대하는 방법, 그리고 소유자, 편집자, 뷰어가 각각 할 수 있는 일.
sidebar:
  order: 7
---

모든 Agent는 워크스페이스에 속합니다. 개인 워크스페이스에는 다른 멤버가 없으므로, 다른 사람과 함께 Agent를 작업하려면 팀 워크스페이스가 필요합니다. 추가한 사람은 협업자가 되며, 각 협업자는 Agent에서 역할을 가집니다.

## 누가 무엇을 할 수 있는가

| 역할 | 할 수 있는 일 |
| --- | --- |
| 소유자 | 편집자가 할 수 있는 모든 일에 더해 **Publish**, **Roll back**, **Put the last version back**, **Unpublish**; Agent를 열 수 있는 사람 변경; **Start a new session**; 라이브 환경 값과 도메인; 협업자 추가와 초대 발송; 소유권 이전, Agent 이동·복제·삭제. |
| 편집자 | **Build**와 **Brainstorm**; **Approve plan**과 **Request changes**; Agent의 질문에 답하고 Agent가 요청하는 값 입력; 빌드 **Pause**, **Stop**, **Continue**; Agent 이름 변경; 개발용 환경 값. |
| 뷰어 | 읽기 전용. Agent를 열어 모든 것을 볼 수 있지만 아무것도 바꿀 수 없습니다. |

Agent의 소유자는 한 명입니다. 워크스페이스의 다른 모든 사람은 Agent를 볼 수 있고, 누가 편집할 수 있는지는 소유자가 정합니다.

## 팀 워크스페이스 만들기

1. 왼쪽 레일 맨 위의 워크스페이스 이름을 클릭합니다. 처음에는 **Personal**이라고 되어 있습니다. **WORKSPACES** 메뉴가 열리고 내 워크스페이스가 나열되며, 현재 워크스페이스에는 체크 표시가 있습니다.
2. **+ New workspace**를 클릭합니다. **Create workspace** 대화 상자에서 **Name**을 입력하고 **Create**를 클릭합니다.
3. 왼쪽 레일의 **WORKSPACE** 아래에서 **Members**를 클릭한 뒤 **Invite member**를 클릭합니다. **Add workspace member** 대화 상자에서 상대의 **Wallet address**를 입력하고 **Add member**를 클릭합니다. 추가된 지갑은 이 워크스페이스의 모든 Agent를 볼 수 있습니다.
4. Agent를 그 워크스페이스에 둡니다. 전환기에서 해당 워크스페이스를 선택한 채로 새 Agent를 시작하거나, 기존 Agent를 옮깁니다. Agent를 열고 **Console**, **Settings**를 클릭한 뒤 **Move to another workspace**를 찾아 **Choose a workspace**라고 적힌 메뉴를 열고, 워크스페이스를 고르고, **Move**를 클릭한 뒤 **Move agent**로 확인합니다.

워크스페이스에서 누군가를 내보내려면 **Members**에서 그 사람 행의 **⋯** 메뉴를 열고 **Remove**를 선택합니다. 워크스페이스 소유자만 멤버를 추가하고 제거할 수 있습니다.

## Agent에 협업자 초대하기

1. Agent를 열고 **Console**, **Settings**를 클릭합니다. **Collaborators** 아래의 **Manage collaborators**를 클릭합니다. **Agent collaborators** 대화 상자가 열립니다. **PEOPLE** 아래에 모든 사람이 역할과 함께 나열됩니다.
2. 누군가를 편집자로 만들려면 **Add a workspace member**를 사용합니다. “0x… wallet address”라고 적힌 상자에 지갑 주소를 입력하고, 옆의 드롭다운에서 **Editor**나 **Viewer**를 고른 뒤 **Add**를 클릭합니다. 그 사람은 이미 워크스페이스의 멤버여야 합니다.
3. 아직 워크스페이스에 없는 사람을 초대하려면 대신 **Invite link**를 사용합니다. **Create invite link** 옆의 드롭다운에서 **Editor**나 **Viewer**를 고르고 **Create invite link**를 클릭한 뒤 **Copy**로 링크를 복사합니다. 링크를 열고 로그인하는 사람은 누구나 선택한 역할로 이 팀 워크스페이스에 들어오며, 그 안의 모든 Agent를 볼 수 있습니다. 링크는 한 번만 쓸 수 있고 만료 시점이 표시됩니다.
4. **Done**을 클릭합니다.

   ![개인 워크스페이스에 있는 Agent의 Agent collaborators 대화 상자: 개인 워크스페이스에는 다른 멤버가 없다는 안내와 People 아래의 소유자.](/images/agent/work-with-others-1.webp)

개인 워크스페이스에서는 대화 상자에 초대 옵션 대신 그림의 안내가 표시됩니다. “A personal workspace has no other members. Move this agent to a team workspace to invite collaborators.”

누군가의 편집 권한을 없애려면 이름 옆의 **Make viewer**를 클릭하고 확인합니다. 그 사람은 워크스페이스에 남아 있으며 Agent를 계속 볼 수 있습니다.

## 알아 두기

- Agent를 관리하는 사람은 소유자만 바꿀 수 있습니다. 편집자와 뷰어에게는 “Only the owner adds or removes collaborators.”라고 나옵니다.
- 협업자는 Agent를 관리합니다. 코스에 참여하는 사람인 학습자는 다른 방식으로 참여하며 Console의 **Learners**에 나타납니다.
- Agent를 다른 워크스페이스로 옮기면 협업자의 역할이 사라지고, 아직 쓰지 않은 초대 링크는 작동하지 않습니다. [Agent 관리하기](/ko/agent/manage-agents/)를 참고하세요.
- 소유자가 아닌 워크스페이스 멤버는 **Settings**의 **Leave workspace**로 나갈 수 있습니다.

다음: [Agent 관리하기](/ko/agent/manage-agents/).
