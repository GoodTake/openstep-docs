---
title: 安裝與登入
description: 安裝 openstep 指令，並用你的錢包核准這台電腦。
sidebar:
  order: 2
---

用 npm 安裝指令，然後登入一次。登入使用你在 Chrome 中的錢包，所以終端機永遠看不到你的錢包或密碼。

你需要 Node.js 24 或更新的版本。請用 `node --version` 檢查。

## 安裝

1. 安裝套件。

   ```sh
   npm install -g openstep
   ```

2. 確認它可以運作。

   ```sh
   openstep --version
   ```

## 登入

1. 在終端機裡執行：

   ```sh
   openstep login https://builder.openstep.academy
   ```

2. CLI 會印出一個裝置授權網址。請在 **Chrome with your wallet extension**（裝有你錢包擴充功能的 Chrome）中開啟它。CLI 不會替你開啟瀏覽器。
3. 如果你還沒登入，請連接錢包並簽署。見 [登入](/zh-tw/start/sign-in/)。頁面接著會回到授權連結。
4. 檢查 **Requesting device** 方塊。它應該顯示你剛才執行 `openstep login` 的那台電腦。
5. 點選 **Authorize openstep CLI**。頁面會告訴你可以回到終端機。

![瀏覽器中的 OpenStep CLI 授權頁面，顯示在你核准之前。](/images/cli/install-1.webp)

6. 回到終端機。它會確認登入，指令隨即結束。

## 登出

```sh
openstep logout https://builder.openstep.academy
```

這會撤銷這台電腦的授權。要再次使用 CLI，請重新登入。

你也可以從瀏覽器讓某個裝置登出。開啟左側欄的 **Settings**，找到 **CLI ACCESS** 區段。它會列出你授權過的每個裝置。點選裝置旁邊的 **Revoke** 就能讓它登出。如果你遺失了電腦，或不認得某個裝置，請這麼做。

## 注意事項

- 核准會讓終端機取得你帳號的權限。如果 **Requesting device** 不是你的電腦，或你沒有執行 `openstep login`，請關閉該頁面。
- 如果頁面說無法授權該工作階段，表示連結已過期或已被使用。請再次執行 `openstep login`，並使用新的連結。
- CLI 把你的登入資訊存放在 `~/.openstep/credentials.json`。請保持該檔案私密。永遠不要把它複製到原始碼檔案中，也不要分享它。
- 在 Agent 資料夾之外，如果你登入了不只一個 OpenStep 位址，請在指令後加上 `--origin https://builder.openstep.academy`。在 Agent 資料夾之內，則使用取出時存下的位址。

下一步：[取出 Agent](/zh-tw/cli/checkout/)。
