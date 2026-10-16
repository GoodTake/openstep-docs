#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(root, 'src/content/docs');
const distRoot = join(root, 'dist');
const checkBuilt = process.argv.includes('--built');

const ROOT_PAGES = [
  'index.mdx',
  'start/what-is.md',
  'start/sign-in.md',
  'start/create-project.md',
  'start/first-generation.md',
  'chat/editor.md',
  'chat/modes.md',
  'chat/confirm-plan.md',
  'chat/progress.md',
  'chat/choose-model.md',
  'chat/describe-what-you-want.md',
  'build/preview.md',
  'build/code.md',
  'build/data.md',
  'build/what-your-app-can-do.md',
  'ship/publish.md',
  'ship/deploy-backend.md',
  'ship/domains.md',
  'projects/members.md',
  'projects/settings.md',
  'projects/agents.md',
  'account/what-is-ssu.md',
  'account/balance.md',
  'account/redeem.md',
  'reference/faq.md',
  'reference/limits.md',
];

const LOCALES = ['zh-tw', 'ja', 'ko', 'fr'];

const REQUIRED_DOCS = [
  ...ROOT_PAGES,
  ...LOCALES.flatMap((locale) => ROOT_PAGES.map((rel) => `${locale}/${rel}`)),
];

const FORBIDDEN = [
  /\bStripe\b/i,
  /\bPayPal\b/i,
  /\bUSDC\b/i,
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
  if (!/^---\r?\n[\s\S]*?^title:\s+\S[\s\S]*?\r?\n---/m.test(text)) {
    errors.push(`${rel}: missing title: frontmatter`);
  }
  for (const re of FORBIDDEN) {
    if (re.test(text)) errors.push(`${rel}: forbidden term ${re}`);
  }
}

if (checkBuilt) {
  const requiredHtml = [
    'index.html',
    'start/what-is/index.html',
    'zh-tw/index.html',
    'zh-tw/start/what-is/index.html',
    'ja/index.html',
    'ja/chat/editor/index.html',
    'ko/index.html',
    'ko/ship/publish/index.html',
    'fr/index.html',
    'fr/start/what-is/index.html',
    'build/preview/index.html',
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
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`ok: ${REQUIRED_DOCS.length} pages, red-line scan clean${checkBuilt ? ', dist checked' : ''}`);
