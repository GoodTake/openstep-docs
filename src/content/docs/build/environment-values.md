---
title: Environment values
description: Set the values your site reads, such as its name or a key for an outside service, separately for development and live.
sidebar:
  order: 11
---

An environment value is a named setting your site reads, such as its display name or a key for an outside service. Each value has one setting for development, which Preview uses, and one for live, which the published site uses. You set them independently in **Console** → **Environment**.

There is no separate Deploy step for the back end any more. Development values are used by Preview straight away, and live values follow **Publish**.

1. Click **Console** in the header, then **Environment**. The page is titled **Environment Values** and says **Values for The Cozy Coffee Table.** It shows the App chosen in the header's App switcher.
2. Read the list. Each value is a card with its name, where it is available (for example **Public bundle**, **Frontend**), its type (**Variable** or **Secret**), and two settings side by side: **Development · Preview** and **Production · Live**. The filter chips **All**, **Frontend**, **Backend**, **Secrets** and **Needs attention** narrow the list.
3. To add a value, click **+ Add value**. In the panel **Add App value**, type a name, choose **Available to**, choose **Value type**, fill in the value for **Preview**, **Live** or both, and click **Add value**.
4. To change a value later, click the ⋯ button on its card, edit it and click **Save changes**.

![Console → Environment for The Cozy Coffee Table: two values, each with a Development · Preview and a Production · Live setting.](/images/build/environment-values-1.webp)

## Where a value is available

- **Frontend** values are built into the web page. Every visitor can read them, so only put public things there, such as the site name. Names for these start with `VITE_`, and the form adds the prefix for you.
- **Backend** values stay on the server and never reach the browser. Keys for outside services go here.
- **Builder** values are variables that the builder can read while it builds. Secrets are never available to the builder.

## Variable or secret

A **Variable** can be read again after you save it. A **Secret** is write-only: once saved, the page shows only that it is set, and when, and never the value. To change a secret, replace it. Secrets are available to the back end only, and the type cannot be changed after you create the value.

## Development and live

- **Development · Preview** takes effect straight away. Changing a **Frontend** value restarts Preview.
- **Production · Live** variables are **Applied with the next Publish.** After you change one, click **Publish**. The dialog shows the App as **Live values changed** even if no code changed.
- **Production** secrets are **Available to the live backend runtime** as soon as you save them. A secret is never part of a published version, so [rolling back](/build/go-live/) does not bring an old one back.
- The owner and editors set development values. Only the owner changes live values.

## When the builder asks for a value

Some features need something only you can give, such as a key for an email service. When that happens a dialog opens with the value's name and what it is for. Type the value and click **Provide and continue**: it is saved for development and live, and the builder carries on. Click **Not now** to put it off. The chat then says that the builder needs the value, with a **Provide** button. A value that an approved plan asked for and you have not given yet is also listed under **Requested by the build** at the top of **Environment**, with a **View request** button. For plans, see [Approve the plan](/agent/approve-plan/).

## Good to know

- The builder created the values in the screenshot itself: the site name, and a public wallet-connection id. It asks you only for what it cannot know.
- You never need to paste a secret into the chat. Use **Environment**, or the dialog the builder opens.
- Features that may need a value, such as email, are described in [What your site can do](/build/what-your-site-can-do/).

Next: [Go live](/build/go-live/).
