---
title: Agent 관리하기
description: My agents에서 Agent를 찾고, 이름 변경, 복제, 이동, 이전, 삭제를 하고, Agent를 담은 워크스페이스를 관리합니다.
sidebar:
  order: 8
---

내 Agent는 **My agents**에 나열되고, 각 Agent에는 Console에 자체 설정이 있습니다. Agent를 담은 워크스페이스에도 자체 설정이 있습니다.

## My agents

왼쪽 레일에서 **My agents**를 클릭합니다. 페이지에 "Everything you own or collaborate on, newest activity first."라고 나오며 오른쪽 위에 **+ New agent**가 있습니다.

1. 탭으로 목록을 거릅니다: **All**, **Needs your answer**, **Building**, **Ready to publish**, **Live**, **Draft**. 이름으로 찾으려면 **Search agents…** 상자에 입력합니다.
2. 카드를 읽습니다. 각 카드에는 상태 배지(**Building**, **Live**, **Draft**, **Ready to publish**), Agent의 이름, 지금 하는 일을 나타내는 한 줄(**Planning**, **Working**, **Unpublished changes** 등), 기반이 된 Agent, 마지막 활동 시점이 표시됩니다.
3. 카드를 클릭하면 해당 Agent의 작업 페이지가 열립니다.

   ![필터 탭과 Agent 카드 격자가 있는 My agents 페이지. Building으로 표시된 Three Day Strength가 포함되어 있음.](/images/agent/manage-agents-1.webp)

다른 사람이 나와 공유한 Agent도 내 접근 수준과 함께 여기에 나타납니다. 내가 참여한 학습 경험은 **Campus Earth**에 남아 있습니다.

## Agent 하나 바꾸기

Agent를 열고 헤더의 **Console**을 클릭한 뒤 **Settings**를 클릭합니다.

- 이름 변경. **Display** 아래에서 **Agent name**을 바꾸고 **Save changes**를 클릭합니다. 여기서 **Avatar** 색상과 **Card image**도 고를 수 있으며, **Upload image** 또는 **Generate**를 사용합니다. **Language**와 **Tone**은 Agent가 쓰고 말하는 방식을 바꾸며 다음 빌드부터 적용됩니다. 소유자와 편집자가 이름을 바꿀 수 있습니다.
- **Duplicate agent**. **Ownership and workspace** 아래에서 **Duplicate agent**를 클릭합니다. 원본을 건드리지 않고 바꿀 수 있도록, 모든 앱의 코드 사본이 담긴 새 Agent가 생깁니다. 데이터, 값, 비밀 값은 원본에 남습니다. 버튼 옆 상자에는 "&lt;Agent 이름&gt; (copy)"가 제안되어 있으며, 다른 이름을 쓰고 싶으면 거기에 입력합니다.
- **Move to another workspace**. **Choose a workspace**라고 적힌 메뉴를 열고 하나를 고른 뒤 **Move**를 클릭하고 **Move agent**로 확인합니다. Agent의 앱과 데이터가 함께 옮겨지며, 그 워크스페이스의 멤버는 Agent를 볼 수 있습니다. 협업자는 Agent에서의 역할을 잃고, 아직 쓰지 않은 초대 링크는 작동하지 않습니다.
- **Transfer ownership**. **Choose a collaborator**라고 적힌 메뉴를 열고 사람을 고른 뒤 **Transfer ownership**을 클릭하고 **Transfer**로 확인합니다. 나는 편집자로 Agent에 남으며, 새 소유자만 Agent를 게시하고, 열 수 있는 사람을 바꾸고, 삭제할 수 있습니다. 이전하려면 Agent에 협업자가 있어야 합니다. [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.
- **Delete agent**. 맨 아래 **Danger zone**에서 **Delete agent**를 클릭합니다. **Delete agent permanently** 대화 상자는 Agent, 파일, 대화, 모든 앱과 그 데이터가 삭제되며 되돌릴 수 없다고 안내합니다. 확인을 위해 Agent의 이름을 입력한 뒤 **Delete agent**를 클릭합니다.

Agent의 복제, 이동, 이전, 삭제는 소유자만 할 수 있습니다. **Access**와 협업자 목록도 같은 페이지에 있으며 마찬가지로 소유자만 쓸 수 있습니다. [게시와 공유](/ko/agent/publish-and-share/)를 참고하세요.

## 워크스페이스 설정

왼쪽 레일의 **WORKSPACE** 아래에서 **Settings**를 클릭합니다. 페이지에 "Manage the workspace that holds your agents."라고 나옵니다. 레일 맨 위의 워크스페이스 메뉴에서 **Workspace settings**로도 들어갈 수 있습니다.

- **GENERAL**에는 워크스페이스의 **Name**과 **Slug**가 있습니다. 팀 워크스페이스에서는 소유자가 이름을 바꾸고 **Save**를 클릭할 수 있습니다. 개인 워크스페이스의 이름은 고정되어 있습니다.
- **Usage & balance**는 SSU 단위의 **Available balance**와 이 워크스페이스의 **Your agents** 수를 보여 줍니다.
- **CLI ACCESS**는 openstep 명령줄로 나를 대신해 동작하도록 승인한 기기를 나열하며, 각각 **Revoke**가 있습니다. [설치와 로그인](/ko/cli/install/)을 참고하세요.
- **TRANSFER OWNERSHIP**은 팀 워크스페이스를 다른 활성 멤버에게 넘깁니다. **New owner**를 고르고 **Transfer ownership**을 클릭한 뒤 **Transfer**로 확인합니다.
- **DANGER ZONE**은 팀 워크스페이스에만 있습니다. 소유자는 이름을 입력해 확인한 뒤 **Delete workspace**로 워크스페이스와 그 안의 모든 Agent를 영구 삭제할 수 있습니다. 다른 멤버에게는 대신 **Leave workspace**가 보입니다.

왼쪽 레일의 **Members**는 워크스페이스의 사람들을 나열합니다. [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.

## 알아 두기

- 각 Agent는 협업자, 접근 권한, 게시에 대한 설정을 자체적으로 가집니다. 워크스페이스 페이지는 이를 바꾸지 않습니다.
- Agent를 설정하는 중에는 삭제할 수 없습니다. 설정이 끝날 때까지 기다리세요.
- 워크스페이스를 삭제하면 그 안의 모든 Agent가 삭제되므로, 남기고 싶은 Agent는 먼저 옮기세요.

준비된 Agent를 쓰는 전체 과정은 여기까지입니다. 대신 웹사이트를 만들려면 [웹사이트 시작하기](/ko/build/start-website/)부터 시작하세요.
