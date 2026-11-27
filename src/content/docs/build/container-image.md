---
title: Publish a container image
description: Run your course App from a private container image and charge learners in SSU.
sidebar:
  order: 14
---

Use your own container image for a course App while keeping OpenStep's Publish, learner access and earnings workflow. You don't need the OpenStep CLI for this: build and push the image with Docker, then set it up and publish it on the Agent's page.

## Before you start

You need an authorized course partner account, credentials for a private registry organization such as `git.openstep.academy/partner-<slug>`, and an Agent created through the normal OpenStep workflow. The Agent must be a course Agent, or its access must be **Private** (**Console → People → Access**: only its collaborators and people who joined with its join link can open it). Ask OpenStep to authorize the Agent for your registry organization. Only its owner can save image settings and publish.

## Prepare your container

- Build for `linux/amd64`. The compressed image must be at most 1 GB (1,000,000,000 bytes). Across all layers, decompressed tar data (including headers and padding) must stay within 4 GiB, and the total entry count must not exceed 200,000.
- Serve a standard HTTP/HTTPS web application. Phase 1 does not support WebSocket upgrades or unauthenticated inbound webhooks.
- Listen on `PORT`, which OpenStep sets to your configured port (8080 by default). Return an HTTP `2xx` response on your configured health path, such as `/health`.
- Keep your database outside the container. Local disk is ephemeral and is cleared when the container sleeps or restarts. External image containers have direct outbound TCP and HTTPS internet access: connect directly to external Postgres, MySQL, Redis, MongoDB or third-party HTTPS APIs. No egress allowlist is needed.
- Put database URLs, API keys and other configuration in **Console → Environment**, as **Production** backend Variables & Secrets. They become environment variables at runtime. Do not override `PORT` or any `STEPS_*` variable.
- Choose `lite`, `standard-1` (the default, with 4 GiB of memory) or `standard-2`. Runtime usage is charged to the owner's balance per second while the container is awake, at the selected size's rate.

## Identify learners and charge SSU

Learners enter through the Agent's **Join Link** or Campus Earth. OpenStep verifies the learner's session and adds `x-steps-user-address` to every request to your App. Read that header on your backend to identify the learner. Client-supplied `x-steps-*` headers and `steps_*` cookies are stripped. Your App's own cookies are forwarded, with response cookies restricted to the App's host (host-only cookies).

OpenStep reserves only `/__steps/*`, `/.steps/*` and `/_platform/analytics.js`. Your App owns the other paths, including `/`, `/auth/*`, `/api/*` and `/data/*`.

To charge a learner from your backend, send:

```http
POST {STEPS_API_URL}/partner/charge
x-steps-runtime-token: {STEPS_RUNTIME_TOKEN}
Content-Type: application/json

{
  "wallet": "<x-steps-user-address>",
  "amount": "10",
  "action": "course_unlock",
  "idempotencyKey": "order-12345"
}
```

For example, inside a Node.js HTTP request handler:

```js
async function chargeCourseUnlock(req, orderId) {
  const wallet = req.headers['x-steps-user-address'];
  if (typeof wallet !== 'string' || !wallet) {
    throw new Error('A signed-in learner is required.');
  }
  const response = await fetch(`${process.env.STEPS_API_URL}/partner/charge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-steps-runtime-token': process.env.STEPS_RUNTIME_TOKEN,
    },
    body: JSON.stringify({
      wallet,
      amount: '10',
      action: 'course_unlock',
      idempotencyKey: `order-${orderId}`,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(String(result?.error?.code ?? result?.error?.message ?? response.status));
  return result;
}
```

OpenStep supplies `STEPS_API_URL` and `STEPS_RUNTIME_TOKEN`; keep the token on the backend. Show the SSU price before the learner takes the paid action, and grant access only after the charge succeeds. An `insufficient_balance` response means the learner needs to top up. Reuse the same `idempotencyKey` when retrying the same order: it returns the existing charge without charging twice. Use a different key for a different order, and never reuse a key with a different wallet, amount or action. Charges and the partner's share appear on **Partner earnings** (`/partner`).

Requests have a **10 MiB body limit** and a **60-second timeout**. For `partner/charge`, `idempotencyKey` must contain **8–128 characters** and `action` must contain **1–64 characters**.

## Push and publish

Use a Gitea access token with the **`write:package`** scope as the password for `docker login`; this scope is required for `docker push`.

Replace `<slug>`, `<repo>` and `<tag>` with your registry organization, image name and version:

```sh
docker login git.openstep.academy
docker build --platform linux/amd64 -t git.openstep.academy/partner-<slug>/<repo>:<tag> .
docker push git.openstep.academy/partner-<slug>/<repo>:<tag>
```

1. Open the Agent's **Console → Deployments → Container Image** section for your App.
2. Enter **Registry repository** without a tag, for example `git.openstep.academy/partner-<slug>/<repo>`. Enter **Tag** separately, then set **Port**, **Health path** and **Instance size**. Click **Save**.
3. Add the required Production backend Variables & Secrets in **Console → Environment**.
4. Click **Publish**. OpenStep checks the image and its health endpoint before making it live. Learners can then enter through the Join Link or Campus Earth.

To update, push a new image and publish again. You can keep the same tag: every **Publish** resolves its current digest and rolls out that version. Because OpenStep cannot see when you push, the Publish panel always lists an image App as **App changed**. **Rollback**, **Unpublish**, **Republish**, **Join Link**, **Learners** and **Partner earnings** work as they do for built-in Apps. Rollback and Republish restore their saved image version, even if its tag now points elsewhere.

To return to code, the owner can choose **Switch back to Code** in the same Container Image section, including after partner authorization has been revoked. This removes the saved image source. Full Agent builds and planned Brainstorm builds require every App to use Code; a mixed Agent can still use CLI push to change its Code Apps while leaving image App snapshots unchanged.
