---
title: 도메인
description: 모든 앱은 openstep.academy 주소를 받습니다. 내 도메인을 연결하면 브랜드 주소를 쓸 수 있습니다.
sidebar:
  order: 13
---

게시하면 각 앱은 자체 주소를 받습니다. 그 주소를 그대로 쓰거나 `cafe.example.com` 같은 내 도메인을 연결할 수 있습니다. **Console**을 열고 **Domains**를 클릭합니다. 맨 위에 표시된 앱(**App: The Cozy Coffee Table**)에 적용되므로, Agent에 앱이 둘 이상이면 먼저 헤더에서 앱을 고르세요.

![The Cozy Coffee Table의 Console → Domains: Open과 Copy URL이 있는 기본 STEPS 도메인, 그 아래의 비어 있는 커스텀 도메인 행.](/images/build/domains-1.webp)

## 기본 주소

**Default STEPS domain** 아래의 **HTTPS URL**이 앱의 주소이며, `https://app-<id>.openstep.academy` 형태입니다. 커스텀 도메인을 연결해도 항상 사용할 수 있습니다. [게시](/ko/build/go-live/)하면 이 주소에서 라이브 사이트가 보입니다. **Open**을 클릭하면 방문하고, **Copy URL**을 클릭하면 복사합니다.

## 내 도메인 연결

1. **Custom domain** 아래의 **CUSTOM HOSTNAME**에 이름을 입력합니다. `https://`, 포트, 경로 없이 호스트 이름만 입력하며, 루트 도메인이 아니라 `app.example.com` 같은 서브도메인을 사용합니다.
2. **Add domain**을 클릭합니다. 배지에 **CUSTOM · DNS SETUP REQUIRED**가 표시되고, **DNS record** 표가 있는 **Configure your DNS record**가 나타납니다. **Type**은 CNAME, **Name / Host**는 내 호스트 이름, **Target / Value**는 가리켜야 할 대상, **TTL**은 Auto입니다. **Copy all**을 클릭하면 한 번에 복사됩니다.
3. DNS 제공업체에서 해당 CNAME 레코드를 만듭니다. 공개 CNAME이 OpenStep을 곧바로 가리키도록 DNS 프록시를 끄고 apex flattening은 사용하지 않습니다.
4. 돌아와서 **Check connection**을 클릭합니다. CNAME이 확인되면 배지에 **CUSTOM · DNS-MANAGED**가 표시되고 **Custom domain** 행에 **DNS connected · Opens the Live version after you publish** 문구가 나타납니다.

**CNAME not detected**가 보이면 DNS 변경이 퍼지는 데 시간이 걸리므로 잠시 기다렸다가 다시 확인합니다. **Having trouble?** 항목에 흔한 원인이 나열되어 있습니다.

## 도메인 제거

**Remove custom domain**을 클릭하거나, 아직 DNS를 기다리는 중이라면 **Cancel setup**을 클릭합니다. 대화 상자에 해당 호스트 이름이 더 이상 앱으로 연결되지 않으며 기본 도메인은 계속 동작한다는 안내가 나옵니다. 마음이 바뀌면 **Keep domain**을 클릭합니다. DNS 제공업체에서 쓰지 않는 CNAME도 삭제합니다.

## 알아 두기

- 커스텀 도메인은 소유자만 연결하거나 제거할 수 있습니다.
- 앱마다 자체 도메인이 있습니다. 호스트 이름 하나를 두 앱에 연결할 수는 없습니다.
- Agent가 **Learners only**로 설정되어 있으면 커스텀 도메인은 제공되지 않습니다. 커스텀 도메인을 쓰려면 **Settings**에서 접근 권한을 **Anyone with the link**로 설정하세요. [게시와 공유](/ko/agent/publish-and-share/)를 참고하세요.

다음: [게시와 공유](/ko/agent/publish-and-share/).
