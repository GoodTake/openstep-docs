---
title: 網址與自訂網域
description: 在 Domains 查看專案子網域並綁定自己的網域。
sidebar:
  order: 3
---

打開 Console → PUBLISH → **Domains**。

**Default domain** 是專案發佈版本的自動產生主機名稱，可在面板上 **Copy**。

專案 owner 可以在 **Custom domain** 輸入一個完整主機名稱，再選 **Save domain**。
綁定會先顯示 `DNS check needed`，此時尚未加入路由。

依面板建立 DNS-only CNAME，關閉 DNS 供應商的 proxy 或 CNAME flattening，再選 **Check DNS**。
只有 STEPS 確認 CNAME 後才會顯示 `Configured`。第一次 HTTPS 存取會申請憑證並打開目前的 Live
release。只輸入像 `app.example.com` 的主機名稱，不要包含 `https://`、連接埠或路徑。

選 **Remove** 可解除綁定；也要刪除 DNS 記錄，避免它繼續指向 STEPS。
