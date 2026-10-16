---
title: 환경 값
description: 사이트가 읽는 값(이름이나 외부 서비스 키 등)을 개발용과 라이브용으로 나누어 설정합니다.
sidebar:
  order: 11
---

환경 값은 사이트가 읽는, 이름이 붙은 설정입니다. 표시 이름이나 외부 서비스 키가 그 예입니다. 각 값에는 Preview가 쓰는 개발용 설정과 게시된 사이트가 쓰는 라이브용 설정이 하나씩 있습니다. 두 설정은 **Console** → **Environment**에서 따로 지정합니다.

백엔드를 위한 별도의 Deploy 단계는 더 이상 없습니다. 개발용 값은 Preview에서 바로 쓰이고, 라이브용 값은 **Publish**를 따라갑니다.

1. 헤더에서 **Console**을 클릭한 다음 **Environment**를 클릭합니다. 페이지 제목은 **Environment Values**이고 **Values for The Cozy Coffee Table.** 문구가 나옵니다. 헤더의 앱 전환기에서 고른 앱이 표시됩니다.
2. 목록을 읽습니다. 값마다 카드가 있으며 이름, 사용할 수 있는 위치(예: **Public bundle**, **Frontend**), 종류(**Variable** 또는 **Secret**), 그리고 나란히 놓인 두 설정 **Development · Preview**와 **Production · Live**가 표시됩니다. 필터 칩 **All**, **Frontend**, **Backend**, **Secrets**, **Needs attention**으로 목록을 좁힐 수 있습니다.
3. 값을 추가하려면 **+ Add value**를 클릭합니다. **Add App value** 패널에서 이름을 입력하고, **Available to**를 고르고, **Value type**을 고르고, **Preview**, **Live** 또는 둘 다에 쓸 값을 채운 뒤 **Add value**를 클릭합니다.
4. 나중에 값을 바꾸려면 카드의 ⋯ 버튼을 클릭하고, 수정한 뒤 **Save changes**를 클릭합니다.

![The Cozy Coffee Table의 Console → Environment: 두 값이 있고, 각각 Development · Preview와 Production · Live 설정이 있음.](/images/build/environment-values-1.webp)

## 값을 사용할 수 있는 위치

- **Frontend** 값은 웹 페이지에 포함됩니다. 모든 방문자가 읽을 수 있으므로 사이트 이름처럼 공개해도 되는 것만 넣습니다. 이 값의 이름은 `VITE_`로 시작하며, 양식이 접두사를 자동으로 붙여 줍니다.
- **Backend** 값은 서버에 남고 브라우저에는 전달되지 않습니다. 외부 서비스의 키는 여기에 둡니다.
- **Builder** 값은 builder가 빌드하는 동안 읽을 수 있는 변수입니다. 비밀 값은 builder에게 절대 제공되지 않습니다.

## Variable과 비밀 값

**Variable**은 저장한 뒤에도 다시 읽을 수 있습니다. **Secret**은 쓰기 전용입니다. 저장하고 나면 페이지에는 설정되었다는 사실과 설정된 시점만 표시되고 값은 표시되지 않습니다. 비밀 값을 바꾸려면 새 값으로 교체합니다. 비밀 값은 백엔드에서만 쓸 수 있으며, 값을 만든 뒤에는 종류를 바꿀 수 없습니다.

## 개발용과 라이브용

- **Development · Preview**는 바로 적용됩니다. **Frontend** 값을 바꾸면 Preview가 다시 시작됩니다.
- **Production · Live** 변수는 **Applied with the next Publish.** 상태가 됩니다. 변경한 뒤에는 **Publish**를 클릭합니다. 코드가 바뀌지 않았더라도 대화 상자에는 앱이 **Live values changed**로 표시됩니다.
- **Production** 비밀 값은 저장하는 즉시 **Available to the live backend runtime** 상태가 됩니다. 비밀 값은 게시된 버전에 포함되지 않으므로, [롤백](/ko/build/go-live/)해도 예전 값이 돌아오지 않습니다.
- 개발용 값은 소유자와 편집자가 설정합니다. 라이브용 값은 소유자만 바꿀 수 있습니다.

## builder가 값을 요청할 때

어떤 기능은 이메일 서비스의 키처럼 나만 줄 수 있는 값이 필요합니다. 그러면 값의 이름과 용도가 적힌 대화 상자가 열립니다. 값을 입력하고 **Provide and continue**를 클릭하면 개발용과 라이브용에 모두 저장되고 builder가 작업을 이어갑니다. 나중에 하려면 **Not now**를 클릭합니다. 그러면 채팅에 builder가 해당 값을 필요로 한다는 안내와 **Provide** 버튼이 나옵니다. 승인된 계획이 요청했는데 아직 주지 않은 값은 **Environment** 맨 위의 **Requested by the build** 아래에도 **View request** 버튼과 함께 나열됩니다. 계획에 대해서는 [계획 승인하기](/ko/agent/approve-plan/)를 참고하세요.

## 알아 두기

- 스크린샷의 값은 builder가 직접 만들었습니다. 사이트 이름과 공개용 지갑 연결 ID입니다. builder는 알 수 없는 것만 묻습니다.
- 비밀 값을 채팅에 붙여 넣을 필요는 없습니다. **Environment**나 builder가 여는 대화 상자를 사용하세요.
- 이메일처럼 값이 필요할 수 있는 기능은 [사이트가 할 수 있는 일](/ko/build/what-your-site-can-do/)에 설명되어 있습니다.

다음: [라이브로 전환하기](/ko/build/go-live/).
