---
title: ドメイン
description: すべての App は openstep.academy 上のアドレスを持ちます。自分のドメインを接続すると、ブランドに合ったアドレスにできます。
sidebar:
  order: 13
---

公開すると、各 App に専用のアドレスが付きます。そのアドレスをそのまま使うことも、`cafe.example.com` のような自分のドメインを接続することもできます。**Console** を開いて **Domains** を選びます。対象は上部に表示された **App: The Cozy Coffee Table** の App です。agent に複数の App がある場合は、先にヘッダーで App を選んでください。

![The Cozy Coffee Table の Console → Domains。Open と Copy URL がある既定の STEPS ドメインと、その下の空のカスタムドメイン行。](/images/build/domains-1.webp)

## 既定のアドレス

**Default STEPS domain** の下の **HTTPS URL** が App のアドレスで、`https://app-<id>.openstep.academy` のような形です。カスタムドメインを接続していても、常に使えます。[公開](/ja/build/go-live/) すると、公開中のサイトが表示されます。**Open** をクリックすると開き、**Copy URL** をクリックするとコピーします。

## 自分のドメインを接続する

1. **Custom domain** の下の **CUSTOM HOSTNAME** に名前を入力します。入力するのはホスト名だけで、`https://`、ポート、パスは付けません。ルートドメインではなく、`app.example.com` のようなサブドメインを使います。
2. **Add domain** をクリックします。バッジが **CUSTOM · DNS SETUP REQUIRED** になり、**Configure your DNS record** と **DNS record** の表が表示されます。**Type** は CNAME、**Name / Host** はあなたのホスト名、**Target / Value** は向け先、**TTL** は Auto です。**Copy all** でまとめてコピーできます。
3. DNS プロバイダーでその CNAME レコードを作成します。公開 CNAME が OpenStep を直接指すように、DNS のプロキシはオフにし、apex flattening は使わないでください。
4. 戻って **Check connection** をクリックします。CNAME が見つかると、バッジが **CUSTOM · DNS-MANAGED** になり、**Custom domain** 行に **DNS connected · Opens the Live version after you publish** と表示されます。

**CNAME not detected** と表示された場合は、DNS の変更が行き渡るまで時間がかかるので、少し待ってからもう一度確認してください。**Having trouble?** によくある原因が一覧されています。

## ドメインを削除する

**Remove custom domain** をクリックします。DNS の設定待ちの間は **Cancel setup** です。ダイアログには、そのホスト名が App に振り分けられなくなること、既定のドメインは引き続き使えることが書かれています。気が変わったときは **Keep domain** をクリックします。DNS プロバイダーで、使わなくなった CNAME も削除してください。

## 知っておくこと

- カスタムドメインを接続または削除できるのは、オーナーだけです。
- ドメインは App ごとに持ちます。1 つのホスト名を 2 つの App に付けることはできません。
- agent が **Learners only** に設定されている場合、カスタムドメインは配信されません。カスタムドメインを使うには、**Settings** でアクセスを **Anyone with the link** にしてください。[公開と共有](/ja/agent/publish-and-share/) を参照してください。

次へ：[CLI でできること](/ja/cli/what-it-does/)。
