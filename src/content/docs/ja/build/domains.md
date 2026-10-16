---
title: URL とカスタムドメイン
description: Domains でプロジェクトのサブドメインを確認し、自分のドメインを付ける。
sidebar:
  order: 13
---

Console → PUBLISH → **Domains** を開きます。

**Default domain** は公開版用に自動生成されるホスト名です。パネルで **Copy** できます。

プロジェクト所有者は **Custom domain** に 1 つの正確なホスト名を入力し、**Save domain** を選べます。
最初は `DNS check needed` と表示され、この時点ではまだルーティングされません。

パネルに表示された DNS-only CNAME を作成し、DNS プロバイダーの proxy または CNAME flattening を無効にして **Check DNS** を選びます。STEPS が CNAME を確認した後だけ `Configured` になります。最初の HTTPS アクセスで証明書が発行され、現在の Live release が開きます。`https://`、ポート、パスを含めず、`app.example.com` のようなホスト名だけを入力してください。

解除するには **Remove** を選びます。STEPS を向いたままにしないよう DNS レコードも削除してください。
