---
title: Apps, data and contracts
description: Add or archive Apps, set environment values, run SQL on development data, and deploy a smart contract an App uses.
sidebar:
  order: 7
---

These commands change more than source files. Each one works on one App, so most of them take `--app <app-key>`. Run them from the agent folder.

## Add or archive an App

1. See the Apps the agent has.

   ```sh
   openstep apps list
   ```

2. Add an App. You describe it up front, so the agent knows why it is a separate App.

   ```sh
   openstep apps add admin --title "Admin" --purpose "Manage records" --audience "Owners" --boundary "Separate management UI" --capabilities web,server
   ```

   - `admin` is the App key. It becomes the folder name `apps/admin`. Use lowercase letters, digits and dashes.
   - `--title` is the App's name. `--name` works too.
   - `--purpose`, `--audience` and `--boundary` say what the App is for, who uses it, and why it is not part of another App.
   - `--capabilities` is a comma-separated list of `web`, `server` and `contract`.

   When the platform accepts the new App, the CLI pulls its folder into your agent folder.

3. To retire an App, archive it. The App's history stays, and so does its folder on your computer.

   ```sh
   openstep apps archive admin
   ```

Owners and editors can add and archive Apps. If the CLI cannot finish the local copy, run `openstep pull`.

## Environment values

An environment value is a setting an App reads, such as an address or a key. It has a name, a kind (`variable` or `secret`), and the places that can read it: `frontend`, `backend` and `builder`.

```sh
openstep env list --app admin
openstep env define BOOKING_EMAIL --kind variable --targets backend --app admin --value hello@example.com
openstep env define VITE_SITE_NAME --kind variable --targets frontend --app admin --value "Corner Cafe"
openstep env define SERVICE_KEY --kind secret --targets backend --app admin
openstep env set SERVICE_KEY --app admin --environment production
openstep env clear SERVICE_KEY --app admin
openstep env targets VITE_SITE_NAME --targets frontend,backend --app admin
openstep env delete BOOKING_EMAIL --app admin
```

- `env list` shows each value's name, kind and whether it is provided. It does not show a secret.
- `env define` creates a value. Names use capital letters, digits and underscores.
- `env set` gives a value that is already defined a new value. `env clear` removes it.
- `env targets` changes where a value can be read. `env delete` removes a definition nobody uses any more.
- Targets follow two rules. A `frontend` target needs the `variable` kind and a name that starts with `VITE_`, and a name that starts with `VITE_` must target `frontend`. A secret never targets `builder`, and a variable may target `builder` only if it holds a chain address, or if it is `BASE_RPC_URL` holding the chain's RPC URL.
- `--environment` is `development` or `production`. Without it, the command uses `development`.
- A secret is never given on the command line. The CLI asks for it with hidden entry, or reads it from standard input. `--value` is refused for a secret.

Owners define values, change their targets and delete them. Editors can set and clear development values. Production values are for owners.

`environment` works in place of `env`. See [Environment values](/build/environment-values/) for how development and live values differ.

## Data

Run SQL on the App's development data:

```sh
openstep data sql --app admin --sql "select 1"
openstep data sql --app admin ./query.sql
```

You can give the SQL with `--sql`, as a file path, or on standard input. It can be up to 64 KiB. This is the real development data, the same data the App's preview uses.

SQL that changes the shape of the data, such as creating or altering a table, is refused here. Use a migration instead.

```sh
openstep data migrate 0002_add_bookings ./migration.sql --app admin
```

- The migration ID looks like `0002_add_bookings`: four or more digits, an underscore, then a lowercase name.
- The file must be UTF-8 text and at most 4 MiB.
- The command pulls first, so settle any conflicts before you run it. It then saves the SQL with the App's source and applies it to the App's development data.

Editors and owners can run both. See [Site data](/build/data/) for how development data and live data stay apart.

## Capabilities

```sh
openstep capabilities list --app admin
openstep capabilities enable contract --app admin
```

`list` shows what the App has switched on and the platform abilities it can use. `enable` adds a capability to the App: `web`, `server` or `contract`. A capability cannot be switched off from the CLI. Both commands are for owners.

## Contracts

A contract here is a smart contract one of your Apps uses. You compile it, register it, check what deployment would cost, and then deploy it to Base. Preparing and quoting are free. Deploying spends SSU. Quote and deploy are owner-only.

1. Compile the contract in the App's Foundry setup.

   ```sh
   cd apps/admin/contract
   forge build
   cd ../../..
   ```

2. Register the compiled contract. This sends no transaction and costs nothing. An editor can do it.

   ```sh
   openstep contracts prepare Token --app admin --artifact contract/out/Token.sol/Token.json --constructor-args contract/args.json --owner-arg-index 3
   ```

   - `Token` is a name you pick. You use it in the next commands.
   - `--artifact` is the Foundry JSON file for the contract. It must hold `abi` and `bytecode.object`.
   - `--constructor-args` is optional. It is a JSON file holding a list of strings, for example `["MyToken", "MTK", "1000000000000000000000"]`. Leave it out only if the constructor takes no arguments.
   - `--owner-arg-index` is optional. It is the position, counting from 0, of the constructor argument that should receive the owner's Smart Account address. Leave that argument out of your list.
   - Both file paths are relative to the App's folder. Each file must be a plain file of at most 4 MiB.

3. Ask for a quote. It shows where the contract would be deployed and the most SSU the deployment can cost. Read both before you go on.

   ```sh
   openstep contracts quote Token --app admin
   ```

4. Deploy. Without `--confirm true` the command refuses. It also refuses if you have not run `quote` for the same name from this folder.

   ```sh
   openstep contracts deploy Token --app admin --confirm true
   ```

   To set a limit, add `--max-fee <units>`. The deploy stops if the quote is higher. The quote and `--max-fee` count SSU in base units: 1 SSU is 1000000000000000000 units.

   When the deployment is confirmed, the CLI pulls the updated code into your folder.

5. Look at the state at any time. This only reads. It sends nothing.

   ```sh
   openstep contracts status --app admin
   ```

If a deployment is cut off and you do not know the result, run `openstep contracts status --app admin` first. The CLI does not send a deployment twice by itself.

`contract` works in place of `contracts`.

## Good to know

- The CLI never compiles a contract for you. It reads the JSON file you give it.
- Secrets and tokens do not belong in source files. Use environment values.
- Anything that spends SSU shows up in your balance. See [Check your balance](/account/balance/).

Next: [Bring your existing code](/cli/bring-your-code/).
