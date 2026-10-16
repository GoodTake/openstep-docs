---
title: CLI 能做什麼
description: 在你自己的電腦和編輯器上處理 Agent，然後推送你的變更並發布。
sidebar:
  order: 1
---

OpenStep CLI 讓你在自己的電腦上處理 Agent。你把 Agent 的 App 複製到同一個資料夾，在自己的編輯器裡編輯，在本機執行，再把變更送回去。

工作頁可以在瀏覽器裡做同樣的工作。當你想用自己的編輯器、你機器上的 coding agent，或在本機執行 App 時，就用 CLI。

## 你可以做什麼

- 取出 Agent：把 Agent 的每個 App 複製到一個資料夾。見 [取出 Agent](/zh-tw/cli/checkout/)。
- 在終端機裡對話：與 builder 交談、回答它的問題、核准它的計畫，以及暫停或停止它。見 [在終端機裡對話](/zh-tw/cli/chat/)。
- 在本機執行 App：在你的機器上啟動 App 的前端和後端。見 [在本機執行 App](/zh-tw/cli/dev/)。
- 推送與發布：把你的變更存回 Agent，然後讓每個 App 一起上線。見 [推送與發布](/zh-tw/cli/push-publish/)。
- 管理 App、資料與合約：新增 App、設定環境值、對開發資料執行 SQL，以及部署 App 使用的智慧合約。見 [App、資料與合約](/zh-tw/cli/apps-data-contracts/)。

## 從頭到尾的一次工作階段

以下是你會依序用到的指令。本章節的每一頁會說明其中一個步驟。

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

## 誰能做什麼

CLI 沿用和工作頁相同的角色。

- **Owner**（擁有者）：編輯者能做的一切，再加上 Publish、Rollback、Unpublish 和 Republish、上線環境值，以及部署合約。
- **Editor**（編輯者）：與 builder 對話、編輯並推送原始碼、新增或封存 App，以及設定開發環境值。
- **Viewer**（檢視者）：唯讀。

人們如何取得這些角色，見 [與他人協作](/zh-tw/agent/work-with-others/)。

## 注意事項

- 所有指令都要在 `agent checkout` 建立的 Agent 資料夾中執行。不要在 App 資料夾裡面執行指令。
- `openstep --help` 會列出所有指令。`openstep <command> --help` 會顯示單一指令與它的選項，例如 `openstep agent chat --help`。
- 在指令後加上 `--json`，可取得機器可讀的輸出。
- 在本機執行 App 會使用你真實的開發資料，而 AI 和電子郵件等平台功能照常花費 SSU。見 [在本機執行 App](/zh-tw/cli/dev/) 和 [查看餘額](/zh-tw/account/balance/)。

下一步：[安裝與登入](/zh-tw/cli/install/)。
