---
title: 앱을 로컬에서 실행하기
description: 각 앱이 시작되는 방식을 정의한 다음, openstep dev로 내 컴퓨터에서 프런트엔드와 백엔드를 실행합니다.
sidebar:
  order: 5
---

`openstep dev`는 내 컴퓨터에서 앱을 시작하며, Agent의 실제 개발 데이터에 연결됩니다. 각 앱이 어떻게 시작되는지는 `openstep.config.json` 파일에 적어 알려 줍니다.

## 설정

1. Agent 폴더에 `openstep.config.json`을 만듭니다. 실행할 앱마다 항목을 하나씩 추가하고, 앱 키를 이름으로 씁니다.

   ```json
   {
     "apps": {
       "web": {
         "cwd": "apps/web",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5173"], "port": 5173 },
         "backend": { "command": ["node", "functions/server.js"], "port": 8787 }
       },
       "admin": {
         "cwd": "apps/admin",
         "frontend": { "command": ["npm", "run", "dev", "--", "--port", "5174"], "port": 5174 }
       }
     }
   }
   ```

   - `cwd`는 Agent 폴더 기준으로 본 앱의 폴더입니다.
   - `frontend`와 `backend`는 각각 `command`와 `port`를 받습니다. `command`는 목록으로, 프로그램을 먼저 쓰고 그다음에 인수를 씁니다. `cwd` 안에서 실행됩니다.
   - 백엔드는 환경 변수 `PORT`를 해당 `port` 값으로 설정해 실행합니다. 셸에서 `PORT`를 설정해 두었어도 마찬가지입니다. `PORT`에서 요청을 받는 서버라면 따로 할 일이 없습니다.
   - 프런트엔드만 있는 앱에는 `backend`를 생략합니다.
   - 프로세스마다 고유한 포트를 지정합니다.

   앱에 실제로 있는 스크립트와 포트를 사용하세요. `package.json`을 확인합니다. 위의 값은 예시일 뿐입니다.

2. 각 앱의 의존성을 해당 앱의 폴더에서 설치합니다.

   ```sh
   cd apps/web
   npm install
   cd ../..
   ```

## 실행

1. Agent 폴더에서 설정에 있는 모든 앱을 시작합니다.

   ```sh
   openstep dev
   ```

   앱 하나만 시작하려면 다음과 같이 합니다.

   ```sh
   openstep dev --app web
   ```

2. CLI가 앱마다 주소를 출력합니다. 그 주소를 브라우저에서 엽니다. 프런트엔드 자체의 포트는 열지 마세요. CLI가 출력하는 주소가 앱을 플랫폼에 연결해 주는 주소입니다.
3. `apps/web`의 파일을 에디터에서 편집합니다. 프런트엔드 개발 서버가 평소처럼 변경 사항을 반영합니다.
4. Ctrl-C를 눌러 중지합니다. CLI가 프로세스를 멈추고 연결을 해제합니다.

## 라이브 사이트 규칙

백엔드가 있는 앱에서 `openstep dev`는 `/api`를 라이브 사이트의 규칙대로 처리하므로, 라이브 사이트에서 실패할 요청 대부분이 내 컴퓨터에서도 실패합니다. 요청 종류마다 처음 실패할 때 CLI가 `openstep:`으로 시작하는 경고를 출력해 무엇을 바꿔야 하는지 알려 줍니다. 각 규칙은 [라이브 사이트에서 달라지는 점](/ko/cli/bring-your-code/#라이브-사이트에서-달라지는-점)에서 설명합니다.

- 페이지가 `fetch`, `XMLHttpRequest`, `sendBeacon`으로 하는 호출은 평소처럼 서버에 도달합니다.
- 접두사 없는 `/api` URL을 그 밖의 방식으로 불러오면 공개 라이브 사이트처럼 404가 돌아옵니다. 예를 들어 컴포넌트가 렌더링하는 `<img>`, 링크, 폼, `window.location`이 그렇습니다. 이런 URL은 `src/lib/runtime`의 `releaseRuntimePath('/api/...')`로 만드세요. `openstep dev`에서는 `/_releases/openstep-dev/_generations/1` 아래의 경로를 돌려주며, CLI가 이를 접두사 없는 경로로 바꿔 서버에 전달합니다.
- HTML이나 CSS 파일에 적힌 `/api` URL도 404가 돌아옵니다. 이 경우 `openstep dev`는 이런 URL을 다시 써 주는 라이브 사이트보다 엄격합니다. 대신 스크립트에서 `releaseRuntimePath()`로 URL을 설정하세요.
- 앱의 `src/lib/runtime.ts`가 이 검사가 생기기 전의 버전이면, 이런 불러오기는 경고와 함께 여전히 서버에 도달합니다. `openstep pull`을 실행하세요. 플랫폼 파일을 플랫폼의 현재 버전으로 내 폴더에 되돌려 놓으며, 푸시할 때마다 마찬가지로 되돌려 놓습니다.
- `text/event-stream`을 요청하는 `/api` 요청은 모두 404가 돌아옵니다. 서버가 응답을 끝내면 라이브 사이트가 답해 줄 `fetch`도 마찬가지입니다. `/api`로 가는 WebSocket도 404가 돌아옵니다.
- 라이브 사이트가 통과시키는 헤더만 브라우저와 서버 사이를 오갑니다. CLI는 `Cookie`, `Set-Cookie`, `Location`, `Content-Disposition`을 제거할 때 경고합니다.
- 10 MiB를 넘는 요청 본문에는 413이 돌아옵니다.
- `curl` 같은 프로그램은 `Sec-Fetch-Dest` 헤더를 보내지 않으므로, 불러오기에 대한 404는 이런 프로그램에 적용되지 않습니다.

앱의 나머지, 예를 들어 페이지와 파일은 그대로 제공됩니다. 백엔드가 없는 앱에는 이 규칙이 하나도 없습니다. 라이브 사이트처럼 `/api`가 프런트엔드로 전달됩니다.

## 알아 두기

- 실제 데이터입니다. 로컬 실행은 작업 페이지에서 앱의 Preview가 쓰는 것과 같은 개발 데이터를 사용합니다. 실행한 SQL은 그 데이터를 바꿉니다. 버려도 되는 사본이 아닙니다. [사이트 데이터](/ko/build/data/)를 참고하세요.
- SSU가 듭니다. AI, 이메일, 체인 호출 같은 플랫폼 기능은 앱이 내 컴퓨터에서 실행되어도 평소처럼 차감됩니다. [잔액 확인](/ko/account/balance/)을 참고하세요.
- 서버는 나를 방문자로 봅니다. 모든 `/api` 요청에는 CLI에 로그인한 지갑이 `x-steps-user-address` 헤더로 실립니다. 브라우저에서도 같은 지갑을 연결하세요.
- 소스에 비밀 값을 넣지 마세요. CLI는 실행할 때마다 고유한 자격 증명과 해당 앱의 환경 값을 제공합니다. 값을 설정하려면 [앱, 데이터, 컨트랙트](/ko/cli/apps-data-contracts/)와 [환경 값](/ko/build/environment-values/)을 참고하세요.
- 시작하는 앱은 모두 `openstep.config.json`에 항목이 있어야 합니다. 모든 앱을 시작했는데 항목이 없는 앱이 있으면 명령이 멈추고 그 앱의 이름을 알려 줍니다.
- 설정한 프로세스 중 하나라도 종료되면 `openstep dev`는 시작한 모든 앱을 멈추고 명령을 끝냅니다. 종료 코드가 0이 아니면 `App runtime exited with code N` 오류와 함께 끝납니다. 이유는 실패한 프로세스 자체의 출력을 읽어 확인하세요.
- 설정의 경로는 Agent 폴더 안에 있어야 합니다.
- `openstep.config.json`은 로컬 파일입니다. `push`는 이 파일을 보내지 않습니다.

다음: [푸시와 게시](/ko/cli/push-publish/).
