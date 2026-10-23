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

The doc sections are defined in `src/sections.mjs`, and the redirects for old
page paths are in `src/moved-pages.mjs`.

## Publish

Push to `main`. Cloudflare Pages builds and deploys it automatically
(`npm run build`, output `dist`). Pull requests get a preview URL.

Cloudflare `_redirects` sends `/zh-cn/*` to `/zh-tw/*` and `/en/*` to the
English root. Do not add matching Astro splat redirects — they do not map
onto Starlight routes.

## Architecture diagrams

The "How it works" pages embed interactive diagrams from
`public/architecture/<locale>/{overview,agent}.html` through
`src/components/ArchDiagram.astro`. Each HTML file is generated with archify
from the matching spec in `diagrams/<locale>/`. From the archify skill
directory (`~/.claude/skills/archify`), with the spec path made absolute:

    node bin/archify.mjs deliver architecture diagrams/en/agent.architecture.json /tmp/arch/agent.html --quality showcase
    node bin/archify.mjs visual-check /tmp/arch/agent.html

Deliver outside `public/` (archify writes sidecar files next to the output),
then copy only the `.html` into `public/architecture/<locale>/`. English is the
source; keep the other four locales in step when a diagram changes.
