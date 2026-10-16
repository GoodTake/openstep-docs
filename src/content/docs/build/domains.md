---
title: Domains
description: Every App gets an address on openstep.academy. Connect your own domain for a branded address.
sidebar:
  order: 13
---

When you publish, each App gets an address of its own. You can keep that address, or connect a domain of your own, such as `cafe.example.com`. Open **Console** and then **Domains**. It acts on the App named at the top, **App: The Cozy Coffee Table**, so pick the App in the header first if the agent has more than one.

![Console → Domains for The Cozy Coffee Table: the default STEPS domain with Open and Copy URL, and the empty custom domain row below it.](/images/build/domains-1.webp)

## The default address

Under **Default STEPS domain** the **HTTPS URL** is the App's address, which looks like `https://app-<id>.openstep.academy`. It is always available, even when a custom domain is connected. It shows your live site once you [publish](/build/go-live/). Click **Open** to visit it, or **Copy URL** to copy it.

## Connect your own domain

1. Under **Custom domain**, type the name in **CUSTOM HOSTNAME**. Give the hostname only, with no `https://`, port or path, and use a subdomain such as `app.example.com`, not the bare domain.
2. Click **Add domain**. The badge reads **CUSTOM · DNS SETUP REQUIRED** and **Configure your DNS record** appears with a **DNS record** table: **Type** is CNAME, **Name / Host** is your hostname, **Target / Value** is where it must point, and **TTL** is Auto. **Copy all** copies them together.
3. At your DNS provider, create that CNAME record. Turn off DNS proxying, and do not use apex flattening, so that the public CNAME points straight to OpenStep.
4. Come back and click **Check connection**. When the CNAME is found, the badge reads **CUSTOM · DNS-MANAGED** and the **Custom domain** row says **DNS connected · Opens the Live version after you publish**.

If you see **CNAME not detected**, wait a little and check again, because DNS changes take time to spread. **Having trouble?** lists the usual causes.

## Remove a domain

Click **Remove custom domain**, or **Cancel setup** while it is still waiting for DNS. The dialog says that the hostname will stop routing to the App and that the default domain keeps working. Click **Keep domain** to change your mind. Also delete the unused CNAME at your DNS provider.

## Good to know

- Only the owner can connect or remove a custom domain.
- Each App has its own domains. A hostname cannot be attached to two Apps.
- If the agent is set to **Learners only**, custom domains are not served. Set access to **Anyone with the link** in **Settings** to use one. See [Publish and share](/agent/publish-and-share/).

Next: [Publish and share](/agent/publish-and-share/).
