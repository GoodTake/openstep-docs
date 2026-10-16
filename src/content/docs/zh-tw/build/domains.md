---
title: 網域
description: 每個 App 在 openstep.academy 上都有一個網址。連接你自己的網域，就能有專屬品牌的網址。
sidebar:
  order: 13
---

你發布時，每個 App 都會有自己的網址。你可以沿用這個網址，也可以連接自己的網域，例如 `cafe.example.com`。開啟 **Console**，然後開啟 **Domains**。它作用於頂部指名的 App，**App: The Cozy Coffee Table**，所以如果 Agent 有不只一個 App，請先在標題列選好 App。

![The Cozy Coffee Table 的 Console → Domains：預設的 STEPS 網域，附有 Open 和 Copy URL，下方是空的自訂網域列。](/images/build/domains-1.webp)

## 預設網址

在 **Default STEPS domain** 底下，**HTTPS URL** 就是 App 的網址，長得像 `https://app-<id>.openstep.academy`。即使連接了自訂網域，它也一直可用。你[發布](/zh-tw/build/go-live/)之後，它會顯示你的線上網站。點選 **Open** 前往，或點選 **Copy URL** 複製。

## 連接你自己的網域

1. 在 **Custom domain** 底下，於 **CUSTOM HOSTNAME** 輸入名稱。只填主機名稱，不要加 `https://`、連接埠或路徑，並使用子網域，例如 `app.example.com`，不要用裸網域。
2. 點選 **Add domain**。標記會顯示 **CUSTOM · DNS SETUP REQUIRED**，並出現 **Configure your DNS record** 與一張 **DNS record** 表格：**Type** 是 CNAME，**Name / Host** 是你的主機名稱，**Target / Value** 是它必須指向的位置，**TTL** 是 Auto。**Copy all** 會一次複製全部。
3. 在你的 DNS 供應商建立那筆 CNAME 紀錄。請關閉 DNS 代理，也不要使用 apex flattening，讓公開的 CNAME 直接指向 OpenStep。
4. 回到這裡點選 **Check connection**。找到 CNAME 之後，標記會顯示 **CUSTOM · DNS-MANAGED**，而 **Custom domain** 那一列會顯示 **DNS connected · Opens the Live version after you publish**。

如果你看到 **CNAME not detected**，請稍候再檢查一次，因為 DNS 變更需要時間才會傳開。**Having trouble?** 列出了常見的原因。

## 移除網域

點選 **Remove custom domain**，或在它還在等待 DNS 時點選 **Cancel setup**。對話框會說明該主機名稱將不再導向 App，而預設網域仍然可用。點選 **Keep domain** 可以改變主意。也請到你的 DNS 供應商那裡刪除不用的 CNAME。

## 注意事項

- 只有擁有者能連接或移除自訂網域。
- 每個 App 有自己的網域。一個主機名稱不能附加到兩個 App。
- 如果 Agent 設為 **Learners only**，就不會提供自訂網域。要使用自訂網域，請在 **Settings** 把存取設為 **Anyone with the link**。見 [發布與分享](/zh-tw/agent/publish-and-share/)。

下一步：[CLI 能做什麼](/zh-tw/cli/what-it-does/)。
