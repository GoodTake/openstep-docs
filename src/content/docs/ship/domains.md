---
title: URLs and custom domains
description: Check the project subdomain and bind your own domain in Domains.
sidebar:
  order: 3
---

Open Console → PUBLISH → **Domains**.

**Default domain** is the generated hostname for the project's published version. Use **Copy** on the panel.

The project owner can enter one exact hostname under **Custom domain** and select **Save domain**.
The binding first shows `DNS check needed` and is not routed yet.

Create the DNS-only CNAME record shown on the panel, turn off provider proxying or CNAME flattening,
then select **Check DNS**. `Configured` appears only after STEPS confirms the CNAME target. The first
HTTPS visit then requests the certificate and opens the project's current Live release. Enter only a
hostname such as `app.example.com`, without `https://`, a port, or a path.

Select **Remove** to detach it. Also delete the DNS record so it does not remain pointed at STEPS.
