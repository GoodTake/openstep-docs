---
title: 推送與發布
description: 用 push 把你的變更存到 Agent，再用 publish 讓每個 App 一起上線。
sidebar:
  order: 6
---

推送與發布是兩個步驟。推送會把你的原始碼存到 Agent。發布會讓存好的原始碼上線。推送絕不會發布。

兩者都作用於整個 Agent，所以每個 App 一起移動。

## 儲存你的變更

1. 查看改了什麼。這會針對每個 App，把你的資料夾與 Agent 已接受的原始碼做比較。它也會顯示自你上次同步之後，Agent 是否有變動，例如 builder 完成了一輪。

   ```sh
   openstep diff
   ```

2. 帶進 Agent 上的任何新內容。Pull 會把 Agent 已接受的變更合併進你的資料夾，而且不會覆蓋你自己的編輯。

   ```sh
   openstep pull
   ```

3. 如果 pull 回報衝突，請開啟檔案並保留你要的文字。如果是二進位檔，請保留你要的版本。然後告訴 CLI 這個檔案已經處理好。每個有衝突的檔案都要這麼做。

   ```sh
   openstep resolve apps/web/src/App.tsx
   ```

4. 推送。

   ```sh
   openstep push
   ```

   Agent 現在把你的變更當作它的原始碼。線上版本不會改變。

## 發布

發布是擁有者的工作。

1. 執行 publish。備註是選填，長度必須是 1 到 500 個字元。

   ```sh
   openstep publish --note "First release"
   ```

   Publish 需要每個 App 都已同步，沒有衝突，也沒有尚未推送的編輯。它絕不會替你推送。如果它說你的本機原始碼有未發布的編輯，請檢視 diff 並先推送。

2. 檢查結果如何。使用 publish 指令給出的 operation ID。當狀態為 `succeeded` 時，發布就完成了。

   ```sh
   openstep status <operation-id>
   ```

   不帶 ID 的 `openstep status` 會讀取你最近一次啟動的 publish、rollback、unpublish 或 republish。如果沒有，它會讀取 Agent。

發布會保留你的資料。誰可以開啟上線的 App，以及訪客會看到什麼，見 [發布與分享](/zh-tw/agent/publish-and-share/)。

## 回復、下線與重新上線

這些同樣作用於整個 Agent。它們沒有 `--app` 選項。全都可以加上選填的 `--note`。

```sh
openstep rollback <generation-id> --note "Restore prior release"
openstep unpublish --note "Take the agent offline"
openstep republish --note "Bring back the last live version"
```

- rollback 會還原 Agent 仍保留的某個較早發行版本。成功的 publish 會回報它所建立的發行版本的 ID。
- unpublish 會讓每個 App 下線。
- republish 會把你用 unpublish 下線的那個版本帶回來。

在瀏覽器中做同樣的操作，見 [讓網站上線](/zh-tw/build/go-live/)。

## 如果結果未知

如果 push 或 publish 被中斷，例如網路斷線，你可能不知道它有沒有成功。不要重新開始一個新的。

- 在同一個資料夾再執行一次相同的指令。CLI 會記得它送出的請求，並詢問平台發生了什麼事。它不會把變更送兩次。
- 如果是 publish，`openstep status <operation-id>` 會讀取同一個操作。
- 如果 push 說你的變更已被接受但仍在同步，請先執行 `openstep pull` 再發布。
- 當某個上線指令仍在等待中時，執行任何上線指令都只會讀取那個等待中的指令。不會再啟動另一個。
- 當 push 仍在等待中時，publish 會拒絕啟動。請先讓 push 完成。
- 保持 `.openstep/` 原樣。不要為了脫困而刪除那裡的檔案。

## 注意事項

- 推送是擁有者和編輯者的工作。發布、回復、下線與重新上線是擁有者的工作。
- builder 正在執行已規劃的建造時，Agent 是唯讀的。請等它完成，然後 `pull`，再推送。
- `diff`、`push` 和 `pull` 會略過 App 資料夾裡的 `.gitignore` 檔案所忽略的檔案，例如 `dist/`，除非 Agent 已接受的原始碼本來就有這些檔案，這和 Git 對待已追蹤檔案的方式一樣。發布時，它們也不算尚未推送的編輯。要把這樣的檔案從已接受的原始碼中移除，請在你的資料夾裡刪除它，然後推送。
- 名稱以 `.env` 開頭的檔案、`.npmrc`、金鑰檔案等，會讓 `diff`、`pull` 和 `push` 停止，即使 `.gitignore` 列出了它們也一樣。訊息會指出路徑和原因，開頭是 `Local source path refused:`。見 [把你的程式碼搬進 App](/zh-tw/cli/bring-your-code/#3-把你的程式碼搬進-app)。

下一步：[App、資料與合約](/zh-tw/cli/apps-data-contracts/)。
