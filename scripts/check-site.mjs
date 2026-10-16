#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { movedPages } from '../src/moved-pages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(root, 'src/content/docs');
const distRoot = join(root, 'dist');
const checkBuilt = process.argv.includes('--built');

const ROOT_PAGES = [
  'index.mdx',
  'start/what-is.mdx',
  'start/sign-in.md',
  'start/find-your-way.md',
  'start/get-ssu.md',
  'start/create-agent.md',
  'agent/pick-agent.md',
  'agent/answer-questions.md',
  'agent/approve-plan.md',
  'agent/watch-build.md',
  'agent/use-your-app.md',
  'agent/publish-and-share.md',
  'agent/work-with-others.md',
  'agent/manage-agents.md',
  'build/start-website.md',
  'build/work-page.md',
  'build/modes.md',
  'build/describe.md',
  'build/choose-model.md',
  'build/progress.md',
  'build/preview.md',
  'build/code.md',
  'build/data.md',
  'build/what-your-site-can-do.md',
  'build/environment-values.md',
  'build/go-live.md',
  'build/domains.md',
  'cli/what-it-does.md',
  'cli/install.md',
  'cli/checkout.md',
  'cli/chat.md',
  'cli/dev.md',
  'cli/push-publish.md',
  'cli/apps-data-contracts.md',
  'cli/bring-your-code.md',
  'account/what-is-ssu.md',
  'account/balance.md',
  'account/redeem.md',
  'reference/faq.md',
  'reference/limits.md',
];

const LOCALES = ['zh-tw', 'ja', 'ko', 'fr'];

// Pages that may name a payment term below: the SSU page explains why outside payment rails are not used.
const PAYMENT_TERM_EXEMPT_PAGE = 'start/get-ssu.md';
const PAYMENT_TERMS = [/\bStripe\b/i, /\bUSDC\b/i];

const REQUIRED_DOCS = [
  ...ROOT_PAGES,
  ...LOCALES.flatMap((locale) => ROOT_PAGES.map((rel) => `${locale}/${rel}`)),
];

const FORBIDDEN = [
  ...PAYMENT_TERMS,
  /\bPayPal\b/i,
  /法币/,
  /\bai\.invoke\b/,
  /\bemail\.send\b/,
  /\bssu\.payment\b/,
  /\bcontract\.interact\b/,
  /\bauth\.wallet\b/,
  /\bdata\.supabase\b/,
  /\bopencode\b/i,
  /\bCoolify\b/,
  /\bSupabase\b/,
  /\bprojects?\b/i,
  /專案/,
  /プロジェクト/,
  /프로젝트/,
  /\bprojets?\b/i,
];

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(md|mdx)$/.test(name)) acc.push(full);
  }
  return acc;
}

const errors = [];

for (const rel of REQUIRED_DOCS) {
  if (!existsSync(join(docsRoot, rel))) {
    errors.push(`missing required page: ${rel}`);
  }
}

for (const file of walk(docsRoot)) {
  const rel = relative(docsRoot, file);
  const text = readFileSync(file, 'utf8');
  const localeRel = rel.replace(/^(zh-tw|ja|ko|fr)\//, '');
  if (!/^---\r?\n[\s\S]*?^title:\s+\S[\s\S]*?\r?\n---/m.test(text)) {
    errors.push(`${rel}: missing title: frontmatter`);
  }
  for (const re of FORBIDDEN) {
    if (localeRel === PAYMENT_TERM_EXEMPT_PAGE && PAYMENT_TERMS.includes(re)) continue;
    if (re.test(text)) errors.push(`${rel}: forbidden term ${re}`);
  }
}

function walkHtml(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkHtml(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const REDIRECT_PREFIXES = ['', 'zh-tw/', 'ja/', 'ko/', 'fr/'];

// Every old URL must still exist and point at the page's new URL.
function checkMovedPages() {
  for (const [from, to] of Object.entries(movedPages)) {
    for (const prefix of REDIRECT_PREFIXES) {
      const file = join(distRoot, `${prefix}${from}/index.html`);
      if (!existsSync(file)) {
        errors.push(`missing redirect: dist/${prefix}${from}/index.html`);
        continue;
      }
      if (!readFileSync(file, 'utf8').includes(`/${prefix}${to}/`)) {
        errors.push(`redirect does not reach /${prefix}${to}/: dist/${prefix}${from}/index.html`);
      }
    }
  }
}

// Every site-internal href/src in the built pages must land on a built file.
function checkLinks() {
  for (const file of walkHtml(distRoot)) {
    const page = relative(distRoot, file);
    const html = readFileSync(file, 'utf8');
    const seen = new Set();
    for (const match of html.matchAll(/\b(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
      const target = match[1].replace(/[#?].*$/, '');
      if (target.startsWith('/_astro/') || target.startsWith('/pagefind/')) continue;
      if (seen.has(target)) continue;
      seen.add(target);
      const path = target.slice(1);
      const isFile = !target.endsWith('/') && existsSync(join(distRoot, path)) && statSync(join(distRoot, path)).isFile();
      const found = isFile || existsSync(join(distRoot, path, 'index.html'));
      if (!found) errors.push(`broken link: ${page} -> ${target}`);
    }
  }
}

if (checkBuilt) {
  const requiredHtml = [
    'index.html',
    'start/what-is/index.html',
    'agent/pick-agent/index.html',
    'build/go-live/index.html',
    'cli/install/index.html',
    'zh-tw/start/what-is/index.html',
    'ja/agent/answer-questions/index.html',
    'ko/build/work-page/index.html',
    'fr/cli/push-publish/index.html',
    'account/what-is-ssu/index.html',
    'reference/faq/index.html',
  ];
  for (const rel of requiredHtml) {
    if (!existsSync(join(distRoot, rel))) {
      errors.push(`missing build output: dist/${rel}`);
    }
  }
  const pagefind = ['pagefind', '_pagefind'].some((name) => existsSync(join(distRoot, name)));
  if (!pagefind) errors.push('missing Pagefind index under dist/');
  checkMovedPages();
  checkLinks();
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`ok: ${REQUIRED_DOCS.length} pages, red-line scan clean${checkBuilt ? ', dist checked' : ''}`);
