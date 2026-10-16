---
title: URL과 커스텀 도메인
description: Domains에서 프로젝트 서브도메인을 확인하고 내 도메인을 연결합니다.
sidebar:
  order: 3
---

Console → PUBLISH → **Domains**를 엽니다.

**Default domain**은 게시된 버전에 자동으로 생성되는 호스트입니다. 패널에서 **Copy**하세요.

프로젝트 소유자는 **Custom domain**에 정확한 호스트명 하나를 입력하고 **Save domain**을 선택할 수 있습니다.
처음에는 `DNS check needed`로 표시되며 아직 라우팅되지 않습니다.

패널의 DNS-only CNAME을 만들고 DNS 제공자의 proxy 또는 CNAME flattening을 끈 다음 **Check DNS**를 선택하세요. STEPS가 CNAME을 확인한 뒤에만 `Configured`가 됩니다. 첫 HTTPS 방문에서 인증서가 발급되고 현재 Live release가 열립니다. `https://`, 포트, 경로 없이 `app.example.com` 같은 호스트명만 입력하세요.

연결을 해제하려면 **Remove**를 선택하세요. STEPS를 계속 가리키지 않도록 DNS 레코드도 삭제하세요.
