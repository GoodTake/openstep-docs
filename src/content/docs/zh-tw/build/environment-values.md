---
title: 環境值
description: 設定你的網站會讀取的值，例如名稱或外部服務的金鑰，開發與上線分開設定。
sidebar:
  order: 11
---

環境值是你的網站會讀取的具名設定，例如顯示名稱或外部服務的金鑰。每個值有一組給開發用的設定（Preview 使用），和一組給上線用的設定（已發布的網站使用）。你在 **Console** → **Environment** 分別設定它們。

後端不再有獨立的 Deploy 步驟。開發值會立刻被 Preview 使用，上線值則隨著 **Publish** 生效。

1. 點選標題列的 **Console**，然後點選 **Environment**。頁面標題是 **Environment Values**，並寫著 **Values for The Cozy Coffee Table.** 它顯示的是你在標題列的 App 切換器中選取的 App。
2. 閱讀清單。每個值是一張卡片，上面有名稱、可用範圍（例如 **Public bundle**、**Frontend**）、類型（**Variable** 或 **Secret**），以及並排的兩組設定：**Development · Preview** 和 **Production · Live**。篩選標籤 **All**、**Frontend**、**Backend**、**Secrets** 和 **Needs attention** 可縮小清單範圍。
3. 要新增值，請點選 **+ Add value**。在 **Add App value** 面板中輸入名稱，選擇 **Available to**，選擇 **Value type**，填入 **Preview**、**Live** 或兩者的值，然後點選 **Add value**。
4. 之後要修改值，請點選它卡片上的 ⋯ 按鈕，編輯後點選 **Save changes**。

![The Cozy Coffee Table 的 Console → Environment：兩個值，每個都有 Development · Preview 和 Production · Live 設定。](/images/build/environment-values-1.webp)

## 值在哪裡可用

- **Frontend** 值會被建進網頁裡。每位訪客都讀得到，所以只能放公開的東西，例如網站名稱。這類值的名稱以 `VITE_` 開頭，表單會自動替你加上前綴。
- **Backend** 值只留在伺服器上，永遠不會到達瀏覽器。外部服務的金鑰放在這裡。
- **Builder** 值是 builder 在建造時可以讀取的變數。機密值永遠不會提供給 builder。

## 變數或機密值

**Variable** 在你儲存後還能再讀取。**Secret** 是只能寫入的：一旦儲存，頁面只會顯示它已設定以及何時設定，永遠不會顯示它的值。要修改機密值，請直接取代它。機密值只能用於後端，而且建立值之後就不能更改類型。

## 開發與上線

- **Development · Preview** 會立即生效。修改 **Frontend** 值會重新啟動 Preview。
- **Production · Live** 的變數在修改後會顯示 **Applied with the next Publish.**，也就是下次 Publish 時才會生效。修改之後，請點選 **Publish**。即使程式碼沒有變，對話框也會把該 App 顯示為 **Live values changed**。
- **Production** 的機密值在你儲存後，會顯示 **Available to the live backend runtime**，也就是上線的後端執行環境已經讀得到它。機密值永遠不屬於已發布版本的一部分，所以[回復](/zh-tw/build/go-live/)不會帶回舊的機密值。
- 擁有者和編輯者設定開發值。只有擁有者能更改上線值。

## 當 builder 向你要一個值

有些功能需要只有你能提供的東西，例如電子郵件服務的金鑰。這時會開啟一個對話框，列出該值的名稱與用途。輸入該值並點選 **Provide and continue**：它會同時儲存為開發與上線的值，builder 繼續進行。點選 **Not now** 可以延後。這時對話中會說明 builder 需要該值，並附上 **Provide** 按鈕。已核准的計畫要求、而你還沒提供的值，也會列在 **Environment** 頂部的 **Requested by the build** 底下，並附有 **View request** 按鈕。計畫的部分，見 [核准計畫](/zh-tw/agent/approve-plan/)。

## 注意事項

- 螢幕截圖中的值是 builder 自己建立的：網站名稱，以及一個公開的錢包連線 id。它只會詢問它無從得知的東西。
- 你永遠不需要把機密值貼進對話。請使用 **Environment**，或 builder 開啟的對話框。
- 可能需要值的功能（例如電子郵件），在 [你的網站能做什麼](/zh-tw/build/what-your-site-can-do/) 中說明。

下一步：[讓網站上線](/zh-tw/build/go-live/)。
