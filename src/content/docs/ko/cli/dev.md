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
         "backend": { "command": ["npm", "run", "dev:server"], "port": 8787 }
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

## 알아 두기

- 실제 데이터입니다. 로컬 실행은 작업 페이지에서 앱의 Preview가 쓰는 것과 같은 개발 데이터를 사용합니다. 실행한 SQL은 그 데이터를 바꿉니다. 버려도 되는 사본이 아닙니다. [사이트 데이터](/ko/build/data/)를 참고하세요.
- SSU가 듭니다. AI, 이메일, 체인 호출 같은 플랫폼 기능은 앱이 내 컴퓨터에서 실행되어도 평소처럼 차감됩니다. [잔액 확인](/ko/account/balance/)을 참고하세요.
- 소스에 Secret을 넣지 마세요. CLI는 실행할 때마다 고유한 자격 증명과 해당 앱의 환경 값을 제공합니다. 값을 설정하려면 [앱, 데이터, 컨트랙트](/ko/cli/apps-data-contracts/)와 [환경 값](/ko/build/environment-values/)을 참고하세요.
- 시작하는 앱은 모두 `openstep.config.json`에 항목이 있어야 합니다. 모든 앱을 시작했는데 항목이 없는 앱이 있으면 명령이 멈추고 그 앱의 이름을 알려 줍니다.
- 설정한 프로세스 중 하나라도 종료되면 `openstep dev`는 시작한 모든 앱을 멈추고 명령을 끝냅니다. 종료 코드가 0이 아니면 `App runtime exited with code N` 오류와 함께 끝납니다. 이유는 실패한 프로세스 자체의 출력을 읽어 확인하세요.
- 설정의 경로는 Agent 폴더 안에 있어야 합니다.
- `openstep.config.json`은 로컬 파일입니다. `push`는 이 파일을 보내지 않습니다.

다음: [푸시와 게시](/ko/cli/push-publish/).
