---
title: 瀏覽程式碼
description: 在 Console → Code 閱讀你網站背後的檔案。修改仍然透過對話進行。
sidebar:
  order: 8
---

建造網站時你完全不需要讀程式碼，但你可以讀。**Code** 會顯示 builder 寫出的檔案，讓你檢查它改了什麼。

1. 點選標題列的 **Console**，然後點選 **Code**。它會顯示你在標題列的 App 切換器中選取的 App 的檔案。
2. 開啟 **FILES** 底下的資料夾，然後點選一個檔案。以咖啡店為例，資料夾包括 `migrations`、`public`、`scripts` 和 `src`，而 `src/App.tsx` 列出網站的頁面。
3. 在右邊的編輯器裡閱讀檔案。檔案會在分頁中開啟，頂部會顯示已開啟檔案的路徑。
4. 點選 **Back to Console** 回到 Console 的其他區段。

![The Cozy Coffee Table 的 Console → Code：左邊是 FILES 樹狀結構，唯讀編輯器裡開著 src/App.tsx。](/images/build/code-1.webp)

編輯器上方的工具列有這些按鈕：**Files**、**Quick Open**、**Search**、**Refresh**、**Copy path**、**Copy content**、**Download file** 和 **Copy link**。

## 注意事項

- Code 是唯讀的。要修改網站，請在左邊的對話中提出。見 [描述你想要的東西](/zh-tw/build/describe/)。
- 想請 builder 看某個檔案時，**Copy path** 很方便：把路徑貼進你的訊息即可。
- **Refresh** 會重新載入檔案清單，例如在 builder 新增了檔案之後。
- Code 顯示的是 Preview 所顯示的草稿，不是線上的內容。

下一步：[網站資料](/zh-tw/build/data/)。
