# OpenStep docs

User-facing product docs for the OpenStep builder (`builder.openstep.academy`).

English is the source of truth (root URLs, no locale prefix). Translations live
under `zh-tw/`, `ja/`, `ko/`, and `fr/`. Product UI strings stay English in every locale.

## Local

    npm install
    npm run dev

Open http://localhost:4321

    npm run check
    npm run build

## Publish

Push to `main`. Cloudflare Pages builds and deploys it automatically
(`npm run build`, output `dist`). Pull requests get a preview URL.

Cloudflare `_redirects` sends `/zh-cn/*` to `/zh-tw/*` and `/en/*` to the
English root. Do not add matching Astro splat redirects — they do not map
onto Starlight routes.
