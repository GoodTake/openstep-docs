---
title: 설치와 로그인
description: openstep 명령을 설치하고 지갑으로 이 컴퓨터를 승인합니다.
sidebar:
  order: 2
---

npm으로 명령을 설치한 뒤 한 번 로그인합니다. 로그인은 Chrome의 지갑을 사용하므로, 터미널은 지갑이나 비밀번호를 볼 수 없습니다.

Node.js 24 이상이 필요합니다. `node --version`으로 확인하세요.

## 설치

1. 패키지를 설치합니다.

   ```sh
   npm install -g openstep
   ```

2. 제대로 동작하는지 확인합니다.

   ```sh
   openstep --version
   ```

   이 CLI 페이지들의 명령을 쓰려면 `openstep --version`이 0.3.0 이상을 출력해야 합니다.

## 로그인

1. 터미널에서 다음을 실행합니다.

   ```sh
   openstep login https://builder.openstep.academy
   ```

2. CLI가 기기 승인 URL을 출력합니다. 지갑 확장 프로그램이 있는 Chrome에서 엽니다. CLI가 브라우저를 대신 열어 주지는 않습니다.
3. 아직 로그인하지 않았다면 지갑을 연결하고 서명합니다. [로그인](/ko/start/sign-in/)을 참고하세요. 그러면 페이지가 승인 링크로 돌아갑니다.
4. **Requesting device** 상자를 확인합니다. 방금 `openstep login`을 실행한 컴퓨터가 표시되어야 합니다.
5. **Authorize openstep CLI**를 클릭합니다. 페이지에 터미널로 돌아가도 된다는 안내가 나옵니다.

![승인하기 전에 브라우저에 표시된 OpenStep CLI 승인 페이지.](/images/cli/install-1.webp)

6. 터미널로 돌아갑니다. 로그인이 확인되었다는 메시지가 나오고 명령이 끝납니다.

## 로그아웃

```sh
openstep logout https://builder.openstep.academy
```

이 컴퓨터의 승인이 취소됩니다. CLI를 다시 쓰려면 다시 로그인하세요.

브라우저에서도 기기를 로그아웃할 수 있습니다. 왼쪽 레일에서 **Settings**를 열고 **CLI ACCESS** 섹션을 찾습니다. 승인한 기기가 각각 나열됩니다. 기기 옆의 **Revoke**를 클릭하면 해당 기기가 로그아웃됩니다. 컴퓨터를 잃어버렸거나 모르는 기기가 있을 때 사용하세요.

## 알아 두기

- 승인하면 터미널이 내 계정의 권한을 갖습니다. **Requesting device**가 내 컴퓨터가 아니거나 `openstep login`을 실행한 적이 없다면 페이지를 닫으세요.
- 세션을 승인하지 못했다는 안내가 나오면 링크가 만료되었거나 이미 사용된 것입니다. `openstep login`을 다시 실행해 새 링크를 사용하세요.
- CLI는 로그인 정보를 `~/.openstep/credentials.json`에 보관합니다. 이 파일은 비공개로 유지하세요. 소스 파일에 복사하거나 공유하지 마세요.
- OpenStep 주소 여러 곳에 로그인되어 있다면, Agent 폴더 밖에서는 명령에 `--origin https://builder.openstep.academy`를 붙입니다. Agent 폴더 안에서는 체크아웃할 때 저장된 주소가 사용됩니다.

다음: [Agent 체크아웃](/ko/cli/checkout/).
