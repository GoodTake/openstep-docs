---
title: 앱, 데이터, 컨트랙트
description: 앱을 추가하거나 보관하고, 환경 값을 설정하고, 개발 데이터에 SQL을 실행하고, 앱이 쓰는 스마트 컨트랙트를 배포합니다.
sidebar:
  order: 7
---

이 명령들은 소스 파일 이상을 바꿉니다. 각 명령은 앱 하나에 적용되므로 대부분 `--app <app-key>`를 받습니다. Agent 폴더에서 실행합니다.

## 앱 추가 또는 보관

1. Agent가 가진 앱을 확인합니다.

   ```sh
   openstep apps list
   ```

2. 앱을 추가합니다. 앱을 미리 설명해 두므로, Agent가 왜 별도의 앱인지 알 수 있습니다.

   ```sh
   openstep apps add admin --title "Admin" --purpose "Manage records" --audience "Owners" --boundary "Separate management UI" --capabilities web,server
   ```

   - `admin`은 앱 키입니다. 폴더 이름 `apps/admin`이 됩니다. 소문자, 숫자, 대시를 사용합니다.
   - `--title`은 앱의 이름입니다. `--name`도 쓸 수 있습니다.
   - `--purpose`, `--audience`, `--boundary`는 앱의 용도, 사용자, 그리고 다른 앱의 일부가 아닌 이유를 설명합니다.
   - `--capabilities`는 `web`, `server`, `contract`를 쉼표로 구분한 목록입니다.

   플랫폼이 새 앱을 수락하면 CLI가 그 폴더를 내 Agent 폴더로 가져옵니다.

3. 앱을 정리하려면 보관합니다. 앱의 기록은 그대로 남고, 내 컴퓨터의 해당 폴더도 남습니다.

   ```sh
   openstep apps archive admin
   ```

소유자와 편집자는 앱을 추가하고 보관할 수 있습니다. CLI가 로컬 복사를 끝내지 못하면 `openstep pull`을 실행합니다.

## 환경 값

환경 값은 앱이 읽는 설정으로, 주소나 키 같은 것입니다. 이름, 종류(`variable` 또는 `secret`), 그리고 읽을 수 있는 위치(`frontend`, `backend`, `builder`)가 있습니다.

```sh
openstep env list --app admin
openstep env define BOOKING_EMAIL --kind variable --targets backend --app admin --value hello@example.com
openstep env define VITE_SITE_NAME --kind variable --targets frontend --app admin --value "Corner Cafe"
openstep env define SERVICE_KEY --kind secret --targets backend --app admin
openstep env set SERVICE_KEY --app admin --environment production
openstep env clear SERVICE_KEY --app admin
openstep env targets VITE_SITE_NAME --targets frontend,backend --app admin
openstep env delete BOOKING_EMAIL --app admin
```

- `env list`는 각 값의 이름, 종류, 제공 여부를 보여 줍니다. 비밀 값은 표시하지 않습니다.
- `env define`은 값을 만듭니다. 이름은 대문자, 숫자, 밑줄을 사용합니다.
- `env set`은 이미 정의된 값에 새 값을 지정합니다. `env clear`는 그 값을 제거합니다.
- `env targets`는 값을 읽을 수 있는 위치를 바꿉니다. `env delete`는 더 이상 아무도 쓰지 않는 정의를 제거합니다.
- 대상에는 두 가지 규칙이 있습니다. `frontend` 대상은 `variable` 종류이고 이름이 `VITE_`로 시작해야 하며, 이름이 `VITE_`로 시작하는 값은 반드시 `frontend`를 대상으로 해야 합니다. 비밀 값은 `builder`를 대상으로 할 수 없고, variable은 체인 주소를 담고 있거나 체인의 RPC URL을 담은 `BASE_RPC_URL`일 때만 `builder`를 대상으로 할 수 있습니다.
- `--environment`는 `development` 또는 `production`입니다. 생략하면 `development`를 사용합니다.
- 비밀 값은 명령줄에 직접 주지 않습니다. CLI가 숨김 입력으로 묻거나 표준 입력에서 읽습니다. 비밀 값에는 `--value`가 거부됩니다.

소유자는 값을 정의하고, 대상을 바꾸고, 삭제할 수 있습니다. 편집자는 개발용 값을 설정하고 지울 수 있습니다. 프로덕션 값은 소유자 전용입니다.

`environment`는 `env` 대신 쓸 수 있습니다. 개발용 값과 라이브용 값의 차이는 [환경 값](/ko/build/environment-values/)을 참고하세요.

## 데이터

앱의 개발 데이터에 SQL을 실행합니다.

```sh
openstep data sql --app admin --sql "select 1"
openstep data sql --app admin ./query.sql
```

SQL은 `--sql`로, 파일 경로로, 또는 표준 입력으로 줄 수 있습니다. 최대 64 KiB입니다. 앱의 Preview가 쓰는 것과 같은 실제 개발 데이터입니다.

테이블 생성이나 변경처럼 데이터의 구조를 바꾸는 SQL은 여기서 거부됩니다. 대신 마이그레이션을 사용합니다.

```sh
openstep data migrate 0002_add_bookings ./migration.sql --app admin
```

- 마이그레이션 ID는 `0002_add_bookings` 형태입니다. 숫자 네 자리 이상, 밑줄, 소문자 이름 순서입니다.
- 파일은 UTF-8 텍스트여야 하며 최대 4 MiB입니다.
- 이 명령은 먼저 pull을 하므로 실행하기 전에 충돌을 정리해 둡니다. 그다음 SQL을 앱의 소스와 함께 저장하고 앱의 개발 데이터에 적용합니다.

편집자와 소유자는 둘 다 실행할 수 있습니다. 개발 데이터와 라이브 데이터가 어떻게 분리되는지는 [사이트 데이터](/ko/build/data/)를 참고하세요.

## 앱 기능(capabilities)

```sh
openstep capabilities list --app admin
openstep capabilities enable contract --app admin
```

`list`는 앱이 켜 둔 기능과 사용할 수 있는 플랫폼 기능을 보여 줍니다. `enable`은 앱에 `web`, `server`, `contract` 중 하나의 기능을 추가합니다. CLI에서는 기능을 끌 수 없습니다. 두 명령 모두 소유자 전용입니다.

## 컨트랙트

여기서 컨트랙트는 내 앱 중 하나가 쓰는 스마트 컨트랙트를 말합니다. 컴파일하고, 등록하고, 배포 비용을 확인한 다음 Base에 배포합니다. 준비와 견적은 무료입니다. 배포에는 SSU가 듭니다. 견적과 배포는 소유자 전용입니다.

1. 앱의 Foundry 환경에서 컨트랙트를 컴파일합니다.

   ```sh
   cd apps/admin/contract
   forge build
   cd ../../..
   ```

2. 컴파일된 컨트랙트를 등록합니다. 트랜잭션을 보내지 않으며 비용이 들지 않습니다. 편집자도 할 수 있습니다.

   ```sh
   openstep contracts prepare Token --app admin --artifact contract/out/Token.sol/Token.json --constructor-args contract/args.json --owner-arg-index 3
   ```

   - `Token`은 내가 정하는 이름입니다. 다음 명령에서 사용합니다.
   - `--artifact`는 컨트랙트의 Foundry JSON 파일입니다. `abi`와 `bytecode.object`가 들어 있어야 합니다.
   - `--constructor-args`는 선택 사항입니다. 문자열 목록이 들어 있는 JSON 파일이며, 예를 들면 `["MyToken", "MTK", "1000000000000000000000"]`입니다. 생성자가 인수를 받지 않을 때만 생략합니다.
   - `--owner-arg-index`는 선택 사항입니다. 소유자의 Smart Account 주소를 받아야 하는 생성자 인수의 위치로, 0부터 셉니다. 그 인수는 내 목록에서 뺍니다.
   - 두 파일 경로 모두 앱의 폴더 기준입니다. 각 파일은 최대 4 MiB의 일반 파일이어야 합니다.

3. 견적을 요청합니다. 컨트랙트가 배포될 위치와 배포에 들 수 있는 최대 SSU가 표시됩니다. 계속하기 전에 둘 다 읽어 보세요.

   ```sh
   openstep contracts quote Token --app admin
   ```

4. 배포합니다. `--confirm true`가 없으면 명령이 거부됩니다. 이 폴더에서 같은 이름으로 `quote`를 실행하지 않았을 때도 거부됩니다.

   ```sh
   openstep contracts deploy Token --app admin --confirm true
   ```

   한도를 정하려면 `--max-fee <units>`를 붙입니다. 견적이 그보다 높으면 배포가 중단됩니다. 견적과 `--max-fee`는 SSU를 기본 단위로 셉니다. 1 SSU는 1000000000000000000 단위입니다.

   배포가 확인되면 CLI가 업데이트된 코드를 내 폴더로 가져옵니다.

5. 언제든 상태를 볼 수 있습니다. 읽기만 하며 아무것도 보내지 않습니다.

   ```sh
   openstep contracts status --app admin
   ```

배포가 중간에 끊겨 결과를 모른다면 먼저 `openstep contracts status --app admin`을 실행합니다. CLI가 스스로 배포를 두 번 보내지는 않습니다.

`contract`는 `contracts` 대신 쓸 수 있습니다.

## 알아 두기

- CLI는 컨트랙트를 대신 컴파일하지 않습니다. 내가 준 JSON 파일을 읽습니다.
- 비밀 값과 토큰은 소스 파일에 넣지 않습니다. 환경 값을 사용하세요.
- SSU를 쓰는 모든 일은 잔액에 나타납니다. [잔액 확인](/ko/account/balance/)을 참고하세요.

다음: [기존 코드 가져오기](/ko/cli/bring-your-code/).
