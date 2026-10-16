---
title: Install and sign in
description: Install the openstep command and approve this computer with your wallet.
sidebar:
  order: 2
---

Install the command with npm, then sign in once. Sign-in uses your wallet in Chrome, so the terminal never sees your wallet or a password.

You need Node.js 24 or newer. Check with `node --version`.

## Install

1. Install the package.

   ```sh
   npm install -g openstep
   ```

2. Check that it works.

   ```sh
   openstep --version
   ```

## Sign in

1. In the terminal, run:

   ```sh
   openstep login https://builder.openstep.academy
   ```

2. The CLI prints a device authorization URL. Open it in Chrome with your wallet extension. The CLI does not open a browser for you.
3. If you are not signed in yet, connect your wallet and sign. See [Sign in](/start/sign-in/). The page then returns to the authorization link.
4. Check the **Requesting device** box. It should show the computer where you just ran `openstep login`.
5. Click **Authorize openstep CLI**. The page says you can return to your terminal.

![The OpenStep CLI authorization page in the browser, shown before you approve.](/images/cli/install-1.webp)

6. Go back to the terminal. It confirms the sign-in and the command ends.

## Sign out

```sh
openstep logout https://builder.openstep.academy
```

This revokes the authorization for this computer. To use the CLI again, sign in again.

You can also sign a device out from the browser. Open **Settings** in the left rail and find the **CLI ACCESS** section. It lists each device you have authorized. Click **Revoke** next to a device to sign it out. Do this if you lost a computer or no longer recognize a device.

## Good to know

- Approving gives the terminal your account's permissions. If **Requesting device** is not your computer, or you did not run `openstep login`, close the page.
- If the page says it could not authorize the session, the link has expired or was already used. Run `openstep login` again and use the new link.
- The CLI keeps your sign-in in `~/.openstep/credentials.json`. Keep that file private. Never copy it into source files or share it.
- Outside an agent folder, add `--origin https://builder.openstep.academy` to a command if you are signed in to more than one OpenStep address. Inside an agent folder, the address saved at checkout is used.

Next: [Check out an agent](/cli/checkout/).
