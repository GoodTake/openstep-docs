---
title: CLI でできること
description: 自分のコンピューターとエディターで agent の作業を行い、変更を push して公開します。
sidebar:
  order: 1
---

OpenStep CLI を使うと、自分のコンピューターで agent の作業ができます。agent の App を 1 つのフォルダーにコピーし、自分のエディターで編集し、ローカルで実行して、変更を送り返します。

作業ページでも、同じことをブラウザー上でできます。自分のエディター、手元のコンピューターのコーディング agent、ローカルで動く App がほしいときに CLI を使います。

## できること

- **agent をチェックアウトする。** agent のすべての App をフォルダーにコピーします。[agent をチェックアウトする](/ja/cli/checkout/) を参照してください。
- **ターミナルからチャットする。** builder と話し、質問に答え、計画を承認し、一時停止や停止をします。[ターミナルからチャットする](/ja/cli/chat/) を参照してください。
- **App をローカルで実行する。** App のフロントエンドとバックエンドを手元のコンピューターで起動します。[App をローカルで実行する](/ja/cli/dev/) を参照してください。
- **push と公開。** 変更を agent に保存し、すべての App をまとめて公開します。[push と公開](/ja/cli/push-publish/) を参照してください。
- **App、データ、コントラクトを管理する。** App の追加、環境値の設定、開発用データへの SQL の実行、App が使うスマートコントラクトのデプロイができます。[App、データ、コントラクト](/ja/cli/apps-data-contracts/) を参照してください。

## 最初から最後までの 1 セッション

使うコマンドを順に並べます。このセクションの各ページが、1 つのステップを説明します。

```sh
openstep login https://builder.openstep.academy
openstep agent checkout <agent-id> ./my-agent
cd my-agent
openstep agent chat "Describe what you want" --mode build
openstep pull
openstep dev
openstep diff
openstep push
openstep publish --note "First release"
```

## 誰が何をできるか

CLI は、作業ページと同じロールに従います。

- **Owner**：エディターができることすべてに加えて、Publish、Rollback、Unpublish、Republish、本番の環境値、コントラクトのデプロイができます。
- **Editor**：builder とのチャット、ソースの編集と push、App の追加とアーカイブ、開発用の環境値の設定ができます。
- **Viewer**：読み取り専用です。

ロールの付与については [他の人と作業する](/ja/agent/work-with-others/) を参照してください。

## 知っておくこと

- すべてのコマンドは、`agent checkout` が作成した agent フォルダーから実行してください。App フォルダーの中からは実行しないでください。
- `openstep --help` で全コマンドが一覧されます。`openstep <command> --help` で 1 つのコマンドとそのオプションが表示されます（例：`openstep agent chat --help`）。
- コマンドに `--json` を付けると、機械で読める出力になります。
- App をローカルで実行すると、実際の開発用データを使い、AI やメールなどのプラットフォームの機能は通常どおり SSU がかかります。[App をローカルで実行する](/ja/cli/dev/) と [残高を確認する](/ja/account/balance/) を参照してください。

次へ：[インストールとサインイン](/ja/cli/install/)。
