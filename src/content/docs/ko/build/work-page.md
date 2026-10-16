---
title: 작업 페이지
description: 왼쪽은 채팅, 오른쪽은 사이트, 헤더에는 Publish와 Console이 있습니다.
sidebar:
  order: 2
---

모든 Agent에는 작업 페이지가 있고, 대부분의 시간을 여기서 보냅니다. 왼쪽에서 builder와 대화하고 오른쪽에서 사이트를 봅니다. Agent를 시작하면 바로 열리며, 나중에 **My agents**나 왼쪽 레일의 **RECENT AGENTS**에서 다시 올 수 있습니다.

![The Cozy Coffee Table의 작업 페이지: 왼쪽에 builder의 답변, 오른쪽에 사이트의 실시간 미리보기.](/images/build/work-page-1.webp)

1. 헤더입니다. 왼쪽부터 **My agents / The Cozy Coffee Table**(**My agents**를 클릭하면 목록으로 돌아갑니다), 앱 전환기, **Publish**, **Console**이 있습니다. Agent는 앱을 둘 이상 가질 수 있습니다. 앱 전환기는 오른쪽에 어떤 앱을 보여 줄지, 그리고 Console의 **Code**, **Domains**, **Environment**가 어떤 앱에 적용될지를 정합니다. 이 페이지에서는 왼쪽 레일이 아이콘으로 줄어듭니다.
2. 왼쪽의 채팅입니다. 내 메시지와 builder의 답변이 단계마다 한 줄씩 표시되고, 답변 아래에는 상태 줄이 붙습니다. 맨 아래가 입력하는 상자입니다. **+** 버튼은 파일을 첨부하고, **Auto · Build** 같은 칩은 모델과 모드를 고릅니다. builder가 작업하는 동안에는 전송 화살표가 빨간 정지 버튼으로 바뀝니다.
3. 오른쪽의 앱 보기입니다. **Preview**와 **Data** 탭은 헤더에서 고른 앱을 보여 줍니다. **Contract**는 스마트 컨트랙트가 있는 앱에만 나타납니다. Preview 도구 모음에는 새로고침 버튼, 페이지 선택기(**Home**, **Menu**, **Book a table**), 기기 선택기, **Edit mode**를 켜는 연필, 그리고 사이트를 별도 탭에서 여는 **Open**이 있습니다.
4. Console입니다. 헤더에서 **Console**을 클릭하면 앱 보기 위에 열리고, ✕를 클릭하면 닫힙니다. 섹션은 아래에 나열되어 있습니다.

## Console의 구성

- **Overview**: Agent의 이름과 제품, 열람할 수 있는 사람, 내 역할, 게시 여부, 그리고 앱 목록.
- **Build**: 승인된 계획에 따라 진행되는 빌드의 작업, 계획, 앱. 그런 빌드가 있을 때 나타납니다. [빌드 지켜보기](/ko/agent/watch-build/)를 참고하세요.
- **Code**: 앱의 파일(읽기 전용). [코드 보기](/ko/build/code/)를 참고하세요.
- **Files**: builder에게 참고 자료로 줄 수 있는 PDF, PowerPoint, Word 파일(선택 사항).
- **Memory**: Agent가 기록한 내용으로, 내가 내린 결정도 포함됩니다.
- **Sessions**: 앱에 담긴 내용, 그리고 소유자가 **Start a new session**을 할 수 있는 곳.
- **Plugins**: Agent 제품에 내장된 기능.
- **Domains**: 앱의 웹 주소와 내 도메인. [도메인](/ko/build/domains/)을 참고하세요.
- **Production**: 라이브 상태, 버전, 그리고 **Unpublish**. [라이브로 전환하기](/ko/build/go-live/)를 참고하세요.
- **Scheduled tasks**: 앱이 정해진 시간에 실행하는 작업. [사이트가 할 수 있는 일](/ko/build/what-your-site-can-do/)을 참고하세요.
- **Environment**: 앱이 읽는 값으로, 개발용과 라이브용을 따로 둡니다. [환경 값](/ko/build/environment-values/)을 참고하세요.
- **Learners**: 학습자나 코스가 있는 Agent에서 참여한 사람들.
- **Settings**: Agent의 이름, 접근 권한, 협업자, 소유권, 삭제. [Agent 관리하기](/ko/agent/manage-agents/)를 참고하세요.

## 알아 두기

- builder가 작업하는 동안, 그리고 게시할 것이 아직 없을 때는 **Publish**가 회색으로 비활성화됩니다.
- 할 수 있는 일은 역할에 따라 다릅니다. 소유자는 **Publish**, 라이브 **Environment** 값, **Domains**를 포함해 모든 것을 할 수 있습니다. 편집자는 채팅하고 빌드할 수 있습니다. 뷰어는 볼 수만 있습니다. [다른 사람과 함께 작업하기](/ko/agent/work-with-others/)를 참고하세요.

다음: [Build와 Brainstorm](/ko/build/modes/).
