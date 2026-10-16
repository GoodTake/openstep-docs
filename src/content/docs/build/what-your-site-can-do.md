---
title: What your site can do
description: A plain-language map of what the platform adds to your site, from AI and email to on-chain actions, SSU payments and scheduled tasks.
sidebar:
  order: 10
---

A site can be more than pages and a form. The platform offers a set of features that the builder can wire into your site, and you do not set any of them up yourself. This page is a map of what exists, not a manual: you ask for what you want in the chat, and the builder knows how to build it.

1. Say what you want in plain words. For the coffee shop: *When someone books a table, email them a confirmation.*
2. The builder adds it. If it needs a value only you have, such as a key for an outside service, it asks you in a dialog. See [Environment values](/build/environment-values/).
3. Try it in [Preview](/build/preview/), then [publish](/build/go-live/).

## AI features

Your site can ask an AI to write or work something out while a visitor uses it. The coffee shop could suggest a drink from a few answers, or draft a reply to a message. Each call costs a little SSU, after a free monthly allowance.

## Email

Your site can send email, such as the booking confirmation above, a receipt or an access link. Each message costs a little SSU, after a free monthly allowance, and there is a daily limit on what the platform sends for you. You can connect your own email service instead, and then the daily limit no longer applies.

## On-chain actions

Your site can work with smart contracts on Base: read them, write to them, and let visitors sign in by connecting a wallet. It can also send transactions from the site's back end, for example to record something on a contract. The gas for those is charged in SSU to the owner's balance.

## Payments in SSU

Your site can take payment from visitors in SSU, for products, orders, tips or memberships. SSU is the only payment channel a site has. Do not ask the builder to add an outside payment service.

## Scheduled tasks

Your site can run jobs at set times, once it is published. The coffee shop could, for example, prepare tomorrow's list of bookings every evening. The times are in UTC. Open **Console** and then **Scheduled tasks** to see what each App has scheduled, in development and live.

## Stored data

Your site can keep its own records, such as the bookings in the coffee shop. You can look at them in the **Data** tab. See [Site data](/build/data/).

## Good to know

- Building, these features and running a site live are all charged in SSU. Each charge is listed on the [Balance](/account/balance/) page. See also [What is SSU](/account/what-is-ssu/).
- If you are not sure a feature exists, ask the builder. It will say what it can and cannot do.

Next: [Environment values](/build/environment-values/).
