---
title: 기존 코드 가져오기
description: 이미 만든 사이트를 Agent의 앱으로 옮긴 다음, 내 코드에서 OpenStep 로그인, 이메일, AI, 온체인 동작, 데이터를 사용합니다.
sidebar:
  order: 8
---

이미 사이트의 코드가 있다면 Agent로 옮겨서 OpenStep에서 실행할 수 있습니다. 그러면 내 코드가 플랫폼에서 지갑 로그인, 이메일, AI, 온체인 동작, 데이터베이스를 쓸 수 있게 되고, 다른 앱과 똑같이 **Publish**로 라이브가 됩니다.

이 페이지는 빈 폴더에서 라이브 사이트까지 이어서 안내합니다. [CLI를 설치하고 로그인](/ko/cli/install/)했다고 가정합니다.

## Agent는 앱을 하나 이상 가집니다

Agent는 사이트 하나가 아닙니다. **Apps**를 하나 이상 가지며, 각 앱은 자체 코드, Preview, 데이터, 설정, 라이브 주소를 가진 별도의 사이트입니다. **Publish**는 Agent의 모든 앱을 함께 라이브로 올립니다. 그림은 [작동 방식](/ko/start/what-is/#작동-방식)에 있습니다.

Agent 폴더에서 각 앱은 `apps/` 아래에 앱 키 이름의 자체 폴더를 가집니다.

```txt
my-site/
  apps/
    app/      내 사이트
    admin/    두 번째 앱, 추가한 경우
  openstep.config.json
```

먼저 내 코드를 앱으로 어떻게 나눌지 정합니다.

- 사이트 하나: 앱 하나. 모두 `apps/app/`에 들어갑니다.
- 사이트 여러 개(예: 공개 사이트와 별도의 관리자 사이트): 각각 앱 하나. 추가 앱은 1단계에서 추가하고, 각 사이트는 자기 폴더에 넣습니다.

앱마다 자체 데이터, 설정, 이메일 템플릿이 있으므로 `env`, `data`, `email`, `capabilities` 같은 명령은 어느 앱인지 알려 주는 `--app <app-key>`를 받습니다. 2~4단계는 앱마다 따로 합니다. 폴더에 대한 자세한 내용: [폴더의 구성](/ko/cli/checkout/#폴더의-구성).

## 1. 내 사이트를 위한 Agent 만들기

```sh
openstep agent create "My site"
openstep agent checkout <agent-id> ./my-site
cd my-site
openstep apps list
```

`agent create`는 새 Agent를 JSON으로 출력하며, 그 안의 `id`가 Agent ID입니다. `--product`를 쓰지 않으면 Agent는 **Web builder**를 사용합니다. `agent checkout`은 Agent의 앱들을 `apps/<app-key>/`로 복사하며, 새 Agent에는 앱이 하나 있고 보통 `apps/app/`입니다. 아래 예시는 앱 키로 `app`을 씁니다. `apps list`에 나온 키를 사용하세요.

앱은 작게 동작하는 사이트와, 내 코드가 쓸 플랫폼 파일을 가진 채로 시작합니다. 3단계에서 사이트를 내 것으로 바꾸고, 플랫폼 파일은 그대로 둡니다.

코드가 사이트 여러 개라면, 추가 사이트마다 앱을 하나씩 추가합니다. 키, 제목, 용도, 사용자, 다른 앱과 어떻게 다른지, 그리고 기능(capabilities)을 지정합니다.

```sh
openstep apps add admin --title "Admin" --purpose "Manage bookings" --audience "Shop staff" --boundary "Separate admin site" --capabilities web,server
openstep apps list
```

새 앱은 자체 폴더(여기서는 `apps/admin/`)를 갖고, 같은 시작용 사이트와 플랫폼 파일이 들어갑니다. 앱 추가와 보관에 대한 자세한 내용: [앱, 데이터, 컨트랙트](/ko/cli/apps-data-contracts/#앱-추가-또는-보관).

## 2. 사이트에 서버가 있다면 추가하기

```sh
openstep capabilities enable server --app app
```

이렇게 하면 앱에 `functions/` 폴더가 추가되고, 그 폴더가 내 폴더로 들어옵니다. 안에는 시작용 `server.js`, 플랫폼의 서버 도우미인 `platform.js`, `runtime-config.js`, `viem.cjs`, 그리고 `openapi.json`, `check-openapi.js`, `package.json`, `Dockerfile`이 있습니다. 내 서버 코드를 복사해 넣기 전에 먼저 하세요. 그래야 내 파일이 시작용 파일 위에 덮입니다. 사이트에 페이지만 있다면 이 단계는 건너뜁니다.

## 3. 내 코드를 앱으로 옮기기

내 사이트를 `apps/app/`에 복사해 시작용 페이지를 바꿉니다. 앱 자체의 `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`는 그대로 두세요. 플랫폼 파일에는 이 파일들에 있는 패키지와 설정이 필요합니다. 예를 들어 `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `@tanstack/react-query`, `@supabase/supabase-js`, 그리고 비주얼 편집에 쓰이는 `@babel/core`가 그렇습니다. 내 `package.json`으로 덮어쓰지 말고, `apps/app`에서 `npm install <package>`로 사이트의 패키지를 추가하세요. 내 Vite 설정도 앱의 `vite.config.ts`에 추가하세요.

앱의 `index.html`을 내 것으로 바꾼다면 그 `<head>`에 이 줄을 남겨 두세요. 그러지 않으면 **Console**의 **Analytics**가 사이트 방문자를 더 이상 세지 않습니다.

```html
<script defer referrerpolicy="same-origin" src="/_platform/analytics.js"></script>
```

앱에는 다음과 같은 구성이 필요합니다.

| 부분 | 앱에 필요한 것 |
|---|---|
| 페이지 | 앱 루트의 npm 구성으로, `package.json`과 `package-lock.json`이 있어야 합니다. `npm run build`가 완성된 사이트를 `dist/`에 쓰며, 그 최상위에 `index.html`이 있어야 합니다. |
| 브라우저가 읽는 설정 | `VITE_`로 시작하는 이름(예: `VITE_SITE_NAME`)이며, [`openstep env`](/ko/cli/apps-data-contracts/)로 설정합니다. |
| 서버 | `functions/server.js`이며 `node server.js`로 시작합니다. 환경 변수 `PORT`의 포트에서 요청을 받고, `GET /health`에 응답하며, `/api/` 아래에서 내 라우트를 제공합니다. `functions/package.json`에는 의존성이 적혀 있지 않으므로, 서버가 쓰는 npm 패키지는 `functions/vendor.cjs`에 번들로 묶고, `server.js`와 `functions/`의 나머지에 있는 내 코드에서는 `require('./vendor.cjs')`로 가져오세요. [서버의 npm 패키지를 번들로 묶기](#서버의-npm-패키지를-번들로-묶기)를 참고하세요. |
| 서버 설정과 키 | `functions/runtime-config.js`의 `getVariable('NAME')`과 `getSecret('NAME')`으로 읽고, `openstep env`로 설정합니다. `process.env.PORT`와 `process.env.NODE_ENV`를 제외하면, `functions/`에 있는 내 코드는 `process.env`를 읽으면 안 됩니다. 라이브 서버는 거기에 설정을 두지 않으며, Publish가 그런 앱을 거부합니다. |
| 다른 서비스 호출 | 서버에서 `functions/platform.js`의 `externalRequest(url)`을 호출하고, 각 호스트를 앱 값 `BACKEND_EGRESS_HOSTS`에 적습니다(아래 참고). |
| 데이터베이스 테이블 | `openstep data migrate <id> <file> --app app`으로 만듭니다. 예를 들면 `openstep data migrate 0002_add_bookings ./bookings.sql --app app`입니다. 이름에는 스키마를 붙이지 말고(`public.bookings`가 아니라 `bookings`), [마이그레이션에 쓸 수 있는 문](/ko/cli/apps-data-contracts/#마이그레이션에-쓸-수-있는-문)에 나온 문만 쓰세요. 플랫폼 자체의 테이블이 들어 있는 `migrations/0001_platform_baseline.sql`은 그대로 두세요. `migrations/`에 복사한 SQL 파일도 같은 방법으로 적용하세요. 개발 데이터에 한 번도 적용되지 않은 파일은 푸시가 거부하고, 실행할 명령을 알려 줍니다. 페이지는 `supabase`로, 서버는 `dataRequest`로 테이블을 읽고 쓰며, 이때 내가 작성한 행 수준 보안 정책이 적용됩니다. [데이터](#데이터)를 참고하세요. |

이 경로들은 플랫폼의 것이므로 내 페이지를 여기에 두지 마세요. `/api/`(내 서버로 전달됨), `/auth/`, `/data/`, `/_platform/`, `/__steps/`, `/_releases/`입니다.

앱과 함께 온 플랫폼 파일은 그대로 두세요. 내 코드가 이 파일들에 의존합니다.

- 앱 안에서: `src/lib/platform.ts`, `src/lib/useUser.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/runtime.ts`, `src/lib/wagmi.ts`, `src/main.tsx`의 지갑 provider, 그리고 `migrations/0001_platform_baseline.sql`.
- `functions/` 안에서: `platform.js`, `runtime-config.js`, `viem.cjs`, `openapi.json`, `check-openapi.js`.

`openstep pull`과 모든 `openstep push`는 `src/lib/runtime.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/useUser.ts`, `functions/platform.js`, `functions/runtime-config.js`, `functions/viem.cjs`, `functions/check-openapi.js`를 플랫폼의 현재 버전으로 내 폴더에 되돌려 놓습니다. 그러니 편집하지 말고 가져와서 쓰세요. `src/lib/platform.ts`, `src/lib/wagmi.ts`, `src/main.tsx`는 앱이 만들어진 뒤에는 내 것입니다. 필요한 대로 바꾸되, 그 안의 플랫폼 부분은 그대로 두세요.

`functions/openapi.json`도 내 것입니다. 서버의 라우트를 설명하는 파일입니다. 처음에는 시작용 `GET /health`와 `GET /api/info`가 들어 있으니, `/api/info`는 내 라우트로 바꾸세요. 유효한 OpenAPI 3.1 문서로 유지하세요. `openapi.json`이 유효하지 않으면 작업 페이지의 앱 Preview가 서버를 시작하지 않고 `invalid_openapi_contract`라고 알려 줍니다. 확인하려면 `functions/`에서 `npm run api:check`를 실행하세요.

다음은 폴더에 넣지 마세요.

- 이름이 `.env`로 시작하는 파일(`.env.example` 포함), `.npmrc`, `.yarnrc`, 키 파일(`*.pem`, `*.key`, `*.p12`, `*.pfx` 등), 그리고 이름이 `key`, `keys`, `secret`, `secrets`, `credential`, `credentials` 중 하나인 폴더. 그 값은 환경 값에 넣으세요. 이 중 하나라도 앱 폴더에 있으면 앱의 `.gitignore`에 그 파일이나 폴더 자체가 적혀 있어도 `openstep diff`, `pull`, `push`가 멈추고, 그 경로와 이유를 알려 주는 메시지가 나옵니다. 예를 들면 `Local source path refused: apps/app/.env.example (a secret-looking file; remove it and put its values in environment values)`입니다. `.gitignore`가 무시하고 한 번도 푸시된 적 없는 폴더 안의 파일은 아예 살펴보지 않습니다.
- `node_modules`와 `.git`. 푸시는 어차피 건너뜁니다.
- `dist/` 같은 빌드 결과물. Publish가 사이트를 직접 빌드합니다.

앱 폴더의 `.gitignore` 파일이 무시하는 경로(예: `dist/`)는 `openstep diff`, `push`, `pull`에서 제외되며, 게시할 때도 푸시하지 않은 편집으로 세지 않습니다. 앱의 수락된 소스에 이미 있는 파일은 예외입니다. 그런 파일은 푸시할 때마다 여전히 함께 올라갑니다. 예를 들어 이전 버전 CLI가 푸시한 `dist/`가 그렇습니다. 없애려면 내 폴더에서 삭제한 뒤 푸시하세요. 앱의 `.gitignore`에 사이트에 필요한 파일이 적혀 있다면(예전에 만든 앱에는 `vite.config.js`가 적혀 있습니다), 푸시하기 전에 그 줄을 지우세요.

서버가 다른 서비스를 호출할 수 있게 하려면 `BACKEND_EGRESS_HOSTS`를 한 번 정의하고, 호스트를 쉼표로 구분해 지정합니다.

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

`env define`은 값을 만들 때 개발용 값도 함께 지정하고, `env set`은 프로덕션 값을 지정합니다.

### 서버의 npm 패키지를 번들로 묶기

Publish는 `functions/`를 푸시한 그대로 실행하며 `npm install`을 하지 않습니다. 그러니 서버가 쓰는 npm 패키지는 번들 파일 하나, `functions/vendor.cjs`에 넣고, 내 코드는 `server.js`와 `functions/`의 나머지에 두세요. Publish는 내가 작성한 파일은 검사하지만 `vendor.cjs`는 검사하지 않습니다.

1. Agent 폴더에서 패키지용 폴더를 `apps/` 밖에 만들면 푸시가 그 폴더를 보내지 않습니다. 그 안에 패키지를 esbuild와 함께 설치합니다.

   ```sh
   mkdir server-packages
   cd server-packages
   npm init -y
   npm install express esbuild
   ```

2. 그 폴더에 `index.js`를 작성합니다. 서버가 쓰는 것을 내보내는 파일입니다.

   ```js
   module.exports = { express: require('express') };
   ```

3. 번들로 묶어 앱에 넣고 Agent 폴더로 돌아갑니다.

   ```sh
   npx esbuild index.js --bundle --platform=node --format=cjs --outfile=../apps/app/functions/vendor.cjs
   cd ..
   ```

4. `functions/server.js`에서 번들의 패키지를 가져옵니다.

   ```js
   const { express } = require('./vendor.cjs');
   ```

패키지를 추가하거나 업데이트할 때마다 푸시하기 전에 다시 번들로 묶으세요. Publish는 `vendor.cjs`를 포함한 `functions/` 전체를 최대 128 MiB까지 받지만, 파일 하나하나는 `vendor.cjs`까지 포함해 25 MiB 미만으로 유지하세요. 그보다 큰 파일이 있으면 작업 페이지에서 앱의 Preview와 builder의 턴이 실패합니다. 앱의 `.gitignore`가 `*.cjs` 같은 줄로 `functions/vendor.cjs`를 무시하고 있지 않은지 확인하세요. 푸시는 무시되는 파일을 빼고 올리므로, 그러면 번들이 플랫폼에 닿지 않습니다.

## 4. 내 컴퓨터에서 실행하기

Agent 폴더에 `openstep.config.json`을 만들고, 내 명령과 포트를 적습니다.

```json
{
  "apps": {
    "app": {
      "cwd": "apps/app",
      "frontend": { "command": ["npm", "run", "dev"], "port": 5173 },
      "backend": { "command": ["node", "functions/server.js"], "port": 8080 }
    }
  }
}
```

앱이 여럿이면 `"apps"` 아래에 앱마다 항목을 하나씩 추가하고, 각각 자기 포트를 지정합니다. `openstep dev`는 모두 시작하고, `openstep dev --app admin`은 하나만 시작합니다.

앱의 의존성을 설치한 다음 시작합니다.

```sh
cd apps/app && npm install && cd ../..
openstep dev
```

`openstep dev`가 출력하는 주소를 엽니다. 로컬 사이트는 이미 플랫폼과 이어져 있습니다. 앱의 개발 데이터를 읽고 쓰며, AI와 이메일도 동작하고 평소처럼 요금이 청구됩니다. `openstep dev`는 `PORT`를 `backend` 포트(여기서는 8080)로 설정해 서버를 시작합니다. 또한 `/api`를 라이브 사이트의 규칙대로 처리하고, 라이브 사이트에서 실패할 요청이 있으면 경고합니다. [라이브 사이트에서 달라지는 점](#라이브-사이트에서-달라지는-점)과 [앱을 로컬에서 실행하기](/ko/cli/dev/)를 참고하세요.

## 라이브 사이트에서 달라지는 점

라이브 사이트에서 내 앱은 플랫폼의 게이트웨이 뒤에서 실행되므로, 내가 직접 운영하는 서버와 다르게 동작하는 부분이 몇 가지 있습니다.

- 요청 본문은 10 MiB까지입니다. 서버는 JSON, 텍스트, 폼, 파일 업로드를 요청당 최대 10 MiB까지 받을 수 있습니다. 그보다 큰 요청은 413 응답을 받고 서버에 도달하지 않습니다. 더 큰 파일은 앱의 파일 저장소를 사용하세요. 서버가 `functions/platform.js`의 `files.createUpload()`로 업로드 링크를 받아 오면, 페이지가 그 링크로 파일을 곧바로 보냅니다. 파일 하나당 최대 25 MiB입니다.
- 일부 헤더만 통과합니다. 브라우저에서 보낸 것 중 서버가 받는 헤더는 `Accept`, `Accept-Language`, `Authorization`, `Content-Type`, `If-Match`, `If-None-Match`, `Range`, `Range-Unit`, `User-Agent`와 플랫폼 자체의 `x-steps-` 헤더뿐입니다. 브라우저가 돌려받는 헤더는 `Accept-Ranges`, `Cache-Control`, `Content-Language`, `Content-Range`, `Content-Type`, `ETag`, `Last-Modified`, `Preference-Applied`, `Vary`뿐입니다.
- 쿠키, 리디렉션, 다운로드 파일 이름을 쓸 수 없습니다. 서버는 쿠키를 받지 못하고, 서버가 보낸 `Set-Cookie`, `Location`, `Content-Disposition` 헤더는 브라우저에 도달하지 않습니다. 누가 호출하는지 알려면 `useUser()` 로그인과 `x-steps-user-address` 헤더([지갑 로그인](#지갑-로그인) 참고)를 쓰거나, `Authorization` 헤더에 내 토큰을 넣으세요. 리디렉션 대신 JSON으로 응답하고, 다음 페이지로의 이동은 브라우저에서 하세요. 다운로드는 페이지에서 파일을 가져와 그 페이지에서 저장하세요.

  ```ts
  const blob = await (await fetch('/api/export.csv')).blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'export.csv';
  link.click();
  ```

- `/api`로 가는 일부 URL에는 `releaseRuntimePath()`가 필요합니다. 라이브 사이트는 페이지가 `fetch`, `XMLHttpRequest`, `sendBeacon`에 넘기는 URL과, 제공하는 HTML 및 CSS 파일에 적힌 URL을 다시 써 줍니다. 스크립트로 설정한 URL(예를 들어 React가 렌더링하는 `<img>`), `<a href>`, `window.location`이 접두사 없는 `/api` 경로를 가리키면 `src/lib/runtime`의 `releaseRuntimePath('/api/...')`를 써야 합니다. 쓰지 않으면 공개 라이브 사이트가 404로 응답합니다.

  ```tsx
  import { releaseRuntimePath } from './lib/runtime';

  function Avatar() {
    return <img src={releaseRuntimePath('/api/avatar/1')} alt="" />;
  }
  ```

- 스트리밍은 되지 않습니다. 서버의 응답은 끝난 뒤에야 브라우저에 도달하며, 60초 안에 끝나야 합니다. 페이지나 `functions/`에 `new EventSource(`나 `new WebSocket(`이 있으면 Publish가 앱을 거부합니다.
- 내 사이트의 페이지만 서버에 도달합니다. 다른 서비스는 서버를 호출할 수 없습니다. `/api/`를 가리키는 웹훅이나 로그인 콜백은 통과하지 못합니다. 로그인 콜백은 대신 내 사이트의 페이지로 지정하고, 그 페이지가 받은 내용을 `fetch`로 서버에 보내게 하세요. `POST`처럼 무언가를 바꾸는 요청도 내 사이트의 페이지에서 와야 합니다.
- 플랫폼의 데이터 클라이언트를 사용하세요. `@supabase/supabase-js`의 `createClient` 같은 자체 데이터베이스 클라이언트나 `supabase.co` 주소가 있으면 Publish가 앱을 거부하며, `index.html`에 `<base>` 요소가 있어도 마찬가지입니다. 대신 `src/lib/supabase`의 `supabase`를 사용하세요([데이터](#데이터) 참고).

서버가 있는 앱에서는 `openstep dev`가 `/api`를 이 규칙대로 처리하므로, 대부분을 내 컴퓨터에서 먼저 만나게 됩니다. 아래의 404나 413 중 하나로 처음 응답하거나 아래의 헤더 중 하나를 처음 제거할 때, CLI가 `openstep:`으로 시작하는 경고를 출력해 무엇을 바꿔야 하는지 알려 줍니다.

- 브라우저가 `fetch`, `XMLHttpRequest`, `sendBeacon`이 아닌 다른 방식으로 불러오는 접두사 없는 `/api` URL에는 404가 돌아옵니다. 앱의 `src/lib/runtime.ts`가 이 규칙이 생기기 전의 버전이면, 그 불러오기는 경고와 함께 그대로 통과합니다. `openstep pull`을 실행하세요. 플랫폼 파일을 플랫폼의 현재 버전으로 내 폴더에 되돌려 놓습니다.
- HTML이나 CSS 파일에 적힌 `/api` URL도 404가 돌아옵니다. 이 경우 `openstep dev`는 이런 URL을 다시 써 주는 라이브 사이트보다 엄격합니다. 대신 스크립트에서 `releaseRuntimePath()`로 URL을 설정하세요.
- `text/event-stream`을 요청하는 `/api` 요청은 모두 404가 돌아옵니다. 서버가 응답을 끝내면 라이브 사이트가 답해 줄 `fetch`도 마찬가지입니다. `/api`로 가는 WebSocket에도 404가 돌아옵니다.
- 라이브 사이트가 통과시키는 헤더와, 본문을 보낸 그대로 전달하는 데 필요한 `Content-Length`, `Transfer-Encoding`, `Content-Encoding`만 브라우저와 서버 사이를 오갑니다. CLI는 `Cookie`, `Set-Cookie`, `Location`, `Content-Disposition`을 제거할 때 경고합니다.
- 10 MiB를 넘는 요청 본문에는 413이 돌아옵니다.
- `curl` 같은 프로그램은 `Sec-Fetch-Dest` 헤더를 보내지 않으므로, 그 요청이 불러오기로 간주되어 거부되는 일은 없습니다.
- 다른 사이트에서 온 요청, 즉 `Origin`이 `openstep dev`가 출력한 주소가 아닌 요청은 경고 없이 403을 받습니다. 그 주소에 다른 이름으로 접속한 요청도 마찬가지입니다(예: `127.0.0.1` 대신 `localhost`). 다른 페이지가 내 로컬 자격 증명을 쓰지 못하게 하기 위해서입니다.

## 5. 내 코드에서 OpenStep 사용하기

### 지갑 로그인

브라우저에서는 `src/lib/useUser`의 `useUser()`가 방문자의 지갑을 알려 줍니다.

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUser } from './lib/useUser';

function Account() {
  const { wallet, needsSignIn, signIn, loading } = useUser();
  if (loading) return null;
  if (!wallet) return <ConnectButton />;
  if (needsSignIn) return <button onClick={signIn}>Sign in</button>;
  return <p>Signed in as {wallet}</p>;
}
```

`<ConnectButton />`은 `src/main.tsx`의 provider가 설정한 지갑 목록을 엽니다. 버튼을 직접 꾸미려면 같은 패키지의 `<ConnectButton.Custom>`을 사용하세요. 그다음 `signIn()`은 방문자에게 Base에서 무료 서명 한 번을 승인해 달라고 요청합니다.

라이브 사이트에서는 로그인한 방문자가 보낸 모든 `/api/` 요청에 그 지갑 주소가 `x-steps-user-address` 헤더로 실립니다. 로그인하기 전에는 이 헤더가 없습니다. 누가 호출하는지 구분할 때 이 값을 사용하세요. `openstep dev`에서는 페이지가 내가 연결한 지갑을 서명 없이 사용하고, 서버는 내가 CLI에 로그인한 지갑을 봅니다. 브라우저에서도 같은 지갑을 연결하세요.

### 이메일

1. 템플릿을 JSON 파일에 적습니다. `{{name}}`은 보낼 때 채우는 값을 나타냅니다.

   ```json
   {
     "templates": [
       {
         "templateId": "booking-confirmed",
         "html": "<p>Hi {{name}}, your table is booked for {{time}}.</p>",
         "manifest": {
           "subject": "Your booking at {{shop}}",
           "slots": {
             "name": { "type": "text" },
             "time": { "type": "text" },
             "shop": { "type": "text" }
           }
         }
       }
     ]
   }
   ```

   템플릿 ID는 소문자로 시작하며 소문자, 숫자, `-`를 사용합니다. 값의 종류는 `text`(최대 200자) 또는 `url`입니다. `url` 값은 링크 안에 `href="{{link}}"`로 넣으며, 앱의 라이브 주소나 커스텀 도메인에 있는 `https` URL이어야 합니다. 템플릿의 다른 모든 링크나 이미지 URL도 그런 URL이거나 `mailto:` 링크여야 합니다. 앱 하나에는 템플릿을 최대 20개까지 둘 수 있습니다.

2. 등록합니다.

   ```sh
   openstep email templates register emails.json --app app
   ```

   파일 경로는 Agent 폴더 기준입니다. 등록하면 앱의 템플릿 전체가 파일에 있는 템플릿으로 교체됩니다.

3. 브라우저(`src/lib/platform`) 또는 서버(`functions/platform.js`)에서 보냅니다.

   ```ts
   import { sendEmail } from './lib/platform';

   await sendEmail({
     template: 'booking-confirmed',
     to: 'guest@example.com',
     data: { name: 'Alex', time: '19:00', shop: 'The Cozy Coffee Table' },
   });
   ```

   메시지 하나는 최대 5명에게 보낼 수 있습니다.

### AI

```ts
import { invokeAI } from './lib/platform';

const text = await invokeAI({ prompt: 'Write a one-line welcome for a coffee shop.' });
const menu = await invokeAI({
  prompt: 'Suggest three drinks.',
  schema: {
    type: 'object',
    properties: {
      drinks: { type: 'array', items: { type: 'string' } },
    },
    required: ['drinks'],
  },
});
```

`invokeAI`는 텍스트를 돌려줍니다. `schema`로 JSON Schema를 넘기면 파싱된 JSON이 돌아옵니다. 브라우저(`src/lib/platform`)와 서버(`functions/platform.js`) 모두에서 쓸 수 있습니다.

스키마에는 `type`, `properties`, `required`, `items`, `enum`, `description`만 쓸 수 있습니다. `object`에는 `properties`가, `array`에는 `items`가 필요하고, `enum`은 문자열이나 숫자의 목록입니다. 중첩은 4단계까지, 속성은 모두 합쳐 최대 64개까지 가능합니다. `additionalProperties`, `minLength`, `format` 같은 다른 키워드는 `invalid_schema`로 거부됩니다.

### 온체인 동작

서버에서 `functions/platform.js`의 `sendTransaction`으로 Base에 트랜잭션을 보냅니다.

```js
const { sendTransaction, publicClient } = require('./platform');

await sendTransaction({ to: contractAddress, data: callData, idempotencyKey: `order-${orderId}` });
```

트랜잭션은 Agent 소유자의 계정이 보내고, 가스도 SSU로 지불됩니다. 같은 `idempotencyKey`로 다시 보내면 새로 전송되는 것이 없습니다. 한 트랜잭션에서 여러 호출을 실행하려면 대신 `calls: [{ to, data }, …]`를 넘기세요. 체인은 같은 파일의 `publicClient`나 `rpc()`로 읽습니다. 읽기는 무료입니다.

### 동작마다 사용자에게 요금 받기(코스 파트너)

OpenStep이 코스 파트너용으로 활성화한 Agent에서만 쓸 수 있습니다. 다른 Agent에서 호출하면 `partner_charge_not_enabled`로 거절됩니다.

서버에서 `functions/platform.js`의 `chargeUser`로, 코스가 정한 동작에 대해 요청을 보낸 사용자에게 SSU로 요금을 받습니다.

```js
const { chargeUser } = require('./platform');

// /api/ 라우트 안에서
try {
  const { chargeId } = await chargeUser({
    headers: req.headers,          // 요청 헤더에 사용자의 지갑이 들어 있음
    amount: '0.1',                 // SSU, 십진수 문자열
    action: 'Run sandbox payment', // 최대 64자, 사용자의 Balance 페이지에 표시됨
    idempotencyKey: paymentId,     // 8~128자, 요금마다 하나
  });
  // 요금 청구됨: 이제 유료 동작을 실행합니다.
} catch (err) {
  if (err.code === 'insufficient_balance') {
    // 사용자에게 Top up을 요청하고, 유료 동작은 실행하지 않습니다.
  }
}
```

- 앱을 쓰는 사람에게 청구됩니다. Agent 소유자와 공동 작업자도 마찬가지입니다. 사용자가 직접 Top up한 SSU만 쓸 수 있고, OpenStep이 선물한 SSU로는 낼 수 없습니다.
- 요금마다 사용자에게 확인을 받지 않으니, 사용자가 그 동작을 쓰기 전에 페이지에 가격을 보여 주세요.
- 같은 `idempotencyKey`로 다시 보내면 새로 청구되지 않고 같은 `chargeId`가 돌아옵니다. 같은 키를 다른 금액, 동작, 사용자에 다시 쓰면 `idempotency_key_reused`로 실패합니다.
- `unknown_wallet`은 그 지갑에 OpenStep 계정이 없다는 뜻입니다. 사용자에게 OpenStep에 로그인하고 Top up하라고 안내하세요. `invalid_request`는 값이 빠졌거나 잘못됐다는 뜻으로, 예를 들어 로그인한 사용자의 지갑이 요청에 없을 때입니다.
- 지갑은 사용자가 로그인했을 때만 서버에 전달됩니다(위의 '지갑 로그인' 참고). Preview에서는 Agent의 접근 설정이 **Learners only**이거나 Agent에 역할과 미션이 있을 때만 전달됩니다. `openstep dev`에서는 내 지갑에서 청구됩니다.
- 요금은 사용자의 Balance 페이지에 Agent 이름과 동작 이름으로 표시됩니다. OpenStep은 수익을 코스 파트너와 나누고, 파트너는 **Partner earnings** 페이지에서 각 요금을 볼 수 있습니다.

### 데이터

테이블은 `openstep data migrate`로 만들고 바꿉니다. 로컬과 Preview에서는 개발 데이터로 작업하고, 라이브 사이트에는 별도의 데이터가 있습니다.

브라우저에서는 `src/lib/supabase`의 `supabase`로 앱의 테이블을 읽고 씁니다.

```ts
import { supabase } from './lib/supabase';

const { data } = await supabase.from('bookings').select('*');
```

서버에서는 `functions/platform.js`의 `dataRequest`가 같은 일을 하며, 쿼리는 PostgREST 문법으로 씁니다.

```js
const { dataRequest } = require('./platform');

const DESK = '0x000000000000000000000000000000000000c0ff';

const rows = await dataRequest('bookings', {
  as: DESK,
  query: 'select=name,party_size&booking_date=eq.2026-11-01&order=booking_time.asc',
});

const [booking] = await dataRequest('bookings', {
  as: DESK,
  method: 'POST',
  body: { name: 'Alex', booking_date: '2026-11-01', booking_time: '19:00', party_size: 2 },
  returnRows: true,
});
```

- `as`는 필수입니다. 요청이 어느 지갑으로서 읽고 쓰는지를 나타내는 지갑 주소입니다. 아래를 참고하세요.
- `method`는 지정하지 않으면 `GET`입니다. `POST`는 행을 삽입하고, `PATCH`와 `DELETE`는 `query`와 일치하는 행을 변경하거나 삭제합니다. 이 세 가지는 `returnRows: true`를 넘기지 않으면 `[]`를 돌려줍니다.
- 거부된 요청은 `status`와 `code`가 있는 오류를 던집니다.

마이그레이션에 작성한 행 수준 보안 정책이 누가 어떤 행을 읽고 쓸 수 있는지 결정합니다. 정책이 아는 신원은 하나, 요청이 대신하는 주소인 `steps_request_wallet_address()`입니다.

- 페이지에서 보낸 요청은 방문자의 지갑으로서 동작합니다. 라이브 사이트에서는 방문자가 `useUser()`로 로그인한 지갑입니다. 로그인하기 전에는 지갑이 없으므로, 정책이 지갑 하나에 한정한 행은 비어서 돌아오고 삽입은 거부됩니다. `openstep dev`에서는 브라우저에서 연결한 지갑입니다.
- 서버에서 보낸 요청은 `as`로 넘긴 주소로서 동작합니다.

각 방문자가 자기 행만 읽고 쓰는 테이블의 예입니다.

```sql
CREATE TABLE notes (
  id bigserial PRIMARY KEY,
  wallet_address text NOT NULL,
  body text NOT NULL
);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY notes_read_own ON notes FOR SELECT
  USING (wallet_address = steps_request_wallet_address());
CREATE POLICY notes_insert_own ON notes FOR INSERT
  WITH CHECK (wallet_address = steps_request_wallet_address());
```

- 메뉴처럼 누구나 읽을 수 있는 테이블에는 `USING (true)`를 쓰세요.
- 손님의 이메일이 담긴 예약처럼 서버만 다뤄야 하는 기록은, 정책이 서버가 `as`로 넘기는 주소만 허용하게 하세요. 위의 `DESK`처럼 어떤 지갑도 로그인할 수 없는 주소를 고르세요. 어떤 페이지도 그 주소로 동작할 수 없으므로, 페이지는 `/api/` 라우트를 통해 그 기록을 받고 어떤 열을 돌려줄지는 서버가 결정합니다. 정책은 행 전체 단위로 작동하므로, 열을 비공개로 유지하는 방법도 이것입니다.
- 플랫폼은 앱의 데이터로 들어오는 모든 `0x` 주소를 소문자로 바꾸므로, 주소는 소문자로 돌아옵니다. 코드에서도 소문자로 비교하세요.

## 6. 푸시하고 게시하기

```sh
openstep diff
openstep push
openstep publish --note "First release"
openstep status <operation-id>
```

첫 Publish 전에, Agent의 소유자로서 내 코드가 읽는 프로덕션 값을 설정하세요. Publish는 `npm ci`와 `npm run build`로 페이지를 빌드하고, `functions/server.js`를 시작하고, `GET /health`가 30초 안에 2xx 또는 3xx 상태로 응답하는지 확인한 다음 앱을 라이브로 올립니다. [푸시와 게시](/ko/cli/push-publish/)를 참고하세요.

앱의 라이브 주소는 `https://app-<id>.openstep.academy`이며, `<id>`는 `openstep apps list`가 앱에 대해 보여 주는 `projectId`입니다. 첫 Publish가 끝나면 응답하며, 그 전에는 앱이 게시되지 않았다고 표시됩니다. 작업 페이지에서 **Console** → **Domains**에도 같은 주소가 표시됩니다. [도메인](/ko/build/domains/)을 참고하세요.

## 알아 두기

- AI 호출, 이메일, 온체인 동작, 그리고 게시한 앱이 실행되는 시간은 Agent 소유자에게 SSU로 청구됩니다. [잔액 확인](/ko/account/balance/)을 참고하세요.
- `openstep pull`과 모든 푸시는 플랫폼 파일을 플랫폼의 현재 버전으로 내 폴더에 되돌려 놓습니다. 내 파일을 편집하고, 플랫폼 파일에서는 가져와서 쓰세요.
- 사이트가 앱 안에 들어간 뒤에는 작업 페이지의 채팅이나 `openstep agent chat`으로도 바꿀 수 있습니다. builder는 같은 코드를 작업합니다.

다음: [SSU란](/ko/account/what-is-ssu/).
