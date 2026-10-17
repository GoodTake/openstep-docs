---
title: 기존 코드 가져오기
description: 이미 만든 사이트를 Agent의 앱으로 옮긴 다음, 내 코드에서 OpenStep 로그인, 이메일, AI, 온체인 동작, 데이터를 사용합니다.
sidebar:
  order: 8
---

이미 사이트의 코드가 있다면 Agent로 옮겨서 OpenStep에서 실행할 수 있습니다. 그러면 내 코드가 플랫폼에서 지갑 로그인, 이메일, AI, 온체인 동작, 데이터베이스를 쓸 수 있게 되고, 다른 앱과 똑같이 **Publish**로 라이브가 됩니다.

이 페이지는 빈 폴더에서 라이브 사이트까지 이어서 안내합니다. [CLI를 설치하고 로그인](/ko/cli/install/)했다고 가정합니다.

## Agent는 앱을 하나 이상 가집니다

Agent는 사이트 하나가 아닙니다. **Apps**를 하나 이상 가지며, 각 앱은 자체 코드, Preview, 데이터, 설정, 라이브 주소를 가진 별도의 사이트입니다. **Publish**는 Agent의 모든 앱을 함께 라이브로 올립니다. 그림은 [구성 요소의 관계](/ko/start/what-is/#구성-요소의-관계)에 있습니다.

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

`agent create`는 새 Agent의 ID를 출력합니다. `--product`를 쓰지 않으면 Agent는 **Web builder**를 사용합니다. `agent checkout`은 Agent의 앱들을 `apps/<app-key>/`로 복사하며, 새 Agent에는 앱이 하나 있고 보통 `apps/app/`입니다. 아래 예시는 앱 키로 `app`을 씁니다. `apps list`에 나온 키를 사용하세요.

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
openstep pull
```

이렇게 하면 앱에 `functions/` 폴더가 추가되고, 시작용 `server.js`와 플랫폼의 서버 도우미가 들어옵니다. 내 서버 코드를 복사해 넣기 전에 먼저 하세요. 그래야 내 파일이 시작용 파일 위에 덮입니다. 사이트에 페이지만 있다면 이 단계는 건너뜁니다.

## 3. 내 코드를 앱으로 옮기기

내 사이트를 `apps/app/`에 복사해 시작용 페이지를 바꿉니다. 앱에는 다음과 같은 구성이 필요합니다.

| 부분 | 앱에 필요한 것 |
|---|---|
| 페이지 | 앱 루트의 npm 구성으로, `package.json`과 `package-lock.json`이 있어야 합니다. `npm run build`가 완성된 사이트를 `dist/`에 쓰며, 그 최상위에 `index.html`이 있어야 합니다. |
| 브라우저가 읽는 설정 | `VITE_`로 시작하는 이름(예: `VITE_SITE_NAME`)이며, [`openstep env`](/ko/cli/apps-data-contracts/)로 설정합니다. |
| 서버 | `functions/server.js`이며 `node server.js`로 시작합니다. 환경 변수 `PORT`의 포트에서 요청을 받고, `GET /health`에 응답하며, `/api/` 아래에서 내 라우트를 제공합니다. `functions/package.json`에는 의존성이 적혀 있지 않으므로, 서버가 npm 패키지를 쓴다면 푸시하기 전에 `server.js`에 번들로 묶으세요. |
| 서버 설정과 키 | `functions/runtime-config.js`의 `getVariable('NAME')`과 `getSecret('NAME')`으로 읽고, `openstep env`로 설정합니다. |
| 다른 서비스 호출 | 서버에서 `functions/platform.js`의 `externalRequest(url)`을 호출하고, 각 호스트를 앱 값 `BACKEND_EGRESS_HOSTS`에 적습니다(아래 참고). |
| 데이터베이스 테이블 | `openstep data migrate`로 만듭니다. [앱, 데이터, 컨트랙트](/ko/cli/apps-data-contracts/)를 참고하세요. |

이 경로들은 플랫폼의 것이므로 내 페이지를 여기에 두지 마세요. `/api/`(내 서버로 전달됨), `/auth/`, `/data/`, `/_platform/`, `/__steps/`, `/_releases/`입니다.

앱과 함께 온 플랫폼 파일은 그대로 두세요. 내 코드가 이 파일들에서 가져다 씁니다.

- 앱 안에서: `src/lib/platform.ts`, `src/lib/useUser.ts`, `src/lib/live-auth.ts`, `src/lib/supabase.ts`, `src/lib/runtime.ts`, `src/lib/wagmi.ts`, 그리고 `src/main.tsx`의 지갑 provider.
- `functions/` 안에서: `platform.js`, `runtime-config.js`, `viem.cjs`.

`openstep pull`은 이 파일들 대부분을 플랫폼의 버전으로 되돌립니다. 편집하지 말고 가져와서 쓰세요.

다음은 폴더에 넣지 마세요.

- `.env` 파일, `.npmrc`, 키와 그 밖의 자격 증명 파일. `openstep push`가 거부합니다. 그 값은 환경 값에 넣으세요.
- `node_modules`와 `.git`. 푸시는 어차피 건너뜁니다.
- `dist/` 같은 빌드 결과물. Publish가 사이트를 직접 빌드합니다.

서버가 다른 서비스를 호출할 수 있게 하려면 `BACKEND_EGRESS_HOSTS`를 한 번 정의하고, 호스트를 쉼표로 구분해 지정합니다.

```sh
openstep env define BACKEND_EGRESS_HOSTS --kind variable --targets backend --app app
openstep env set BACKEND_EGRESS_HOSTS --app app --environment development --value "api.example.com"
openstep env set BACKEND_EGRESS_HOSTS --app app --environment production --value "api.example.com"
```

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

`openstep dev`가 출력하는 주소를 엽니다. 로컬 사이트는 이미 플랫폼과 이어져 있습니다. 앱의 개발 데이터를 읽고 쓰며, AI와 이메일도 동작하고 평소처럼 요금이 청구됩니다. 지갑 로그인은 게시한 사이트에서 이루어집니다. [앱을 로컬에서 실행하기](/ko/cli/dev/)를 참고하세요.

## 5. 내 코드에서 OpenStep 사용하기

### 지갑 로그인

브라우저에서는 `src/lib/useUser`의 `useUser()`가 방문자의 지갑을 알려 줍니다.

```tsx
import { useUser } from './lib/useUser';

function Account() {
  const { wallet, needsSignIn, signIn, loading } = useUser();
  if (loading) return null;
  if (!wallet) return <p>Connect a wallet to continue.</p>;
  if (needsSignIn) return <button onClick={signIn}>Sign in</button>;
  return <p>Signed in as {wallet}</p>;
}
```

`signIn()`은 방문자에게 Base에서 무료 서명 한 번을 승인해 달라고 요청합니다. 지갑 버튼은 `src/main.tsx`의 provider에서 제공됩니다.

서버에서는 로그인한 방문자가 보낸 모든 `/api/` 요청에 그 지갑 주소가 `x-steps-user-address` 헤더로 실립니다. 누가 호출하는지 구분할 때 이 값을 사용하세요.

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

   템플릿 ID에는 소문자, 숫자, `-`를 사용합니다. 값의 종류는 `text`(최대 200자) 또는 `url`이며, `url` 값은 링크 안에 `href="{{link}}"`로 넣습니다. 앱 하나에는 템플릿을 최대 20개까지 둘 수 있습니다.

2. 등록합니다.

   ```sh
   openstep email templates register emails.json --app app
   ```

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
const menu = await invokeAI({ prompt: 'Suggest three drinks.', schema: { type: 'object' } });
```

`invokeAI`는 텍스트를 돌려줍니다. `schema`로 JSON Schema를 넘기면 파싱된 JSON이 돌아옵니다. 브라우저(`src/lib/platform`)와 서버(`functions/platform.js`) 모두에서 쓸 수 있습니다.

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

브라우저에서는 `src/lib/supabase`의 `supabase`로 앱의 테이블을 읽고 씁니다.

```ts
import { supabase } from './lib/supabase';

const { data } = await supabase.from('bookings').select('*');
```

테이블은 `openstep data migrate`로 만들고 바꿉니다. 로컬과 Preview에서는 개발 데이터로 작업하고, 라이브 사이트에는 별도의 데이터가 있습니다.

## 6. 푸시하고 게시하기

```sh
openstep diff
openstep push
openstep publish --note "First release"
openstep status <operation-id>
```

첫 Publish 전에, Agent의 소유자로서 내 코드가 읽는 프로덕션 값을 설정하세요. Publish는 `npm ci`와 `npm run build`로 페이지를 빌드하고, `functions/server.js`를 시작하고, `/health`를 확인한 다음 앱을 라이브로 올립니다. [푸시와 게시](/ko/cli/push-publish/)를 참고하세요.

## 알아 두기

- AI 호출, 이메일, 온체인 동작, 그리고 게시한 앱이 실행되는 시간은 Agent 소유자에게 SSU로 청구됩니다. [잔액 확인](/ko/account/balance/)을 참고하세요.
- `openstep pull`은 플랫폼 파일을 되돌립니다. 내 파일을 편집하고, 플랫폼 파일에서는 가져와서 쓰세요.
- 사이트가 앱 안에 들어간 뒤에는 작업 페이지의 채팅이나 `openstep agent chat`으로도 바꿀 수 있습니다. builder는 같은 코드를 작업합니다.

다음: [SSU란](/ko/account/what-is-ssu/).
