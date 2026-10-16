import { getCollection, type CollectionEntry } from 'astro:content';

type Doc = CollectionEntry<'docs'>;

// Pages of the current locale, keyed by their locale-free slug (e.g. "chat/modes").
export async function localeDocs(locale: string | undefined): Promise<Map<string, Doc>> {
  const prefix = locale ? `${locale}/` : '';
  const docs = await getCollection('docs');
  const map = new Map<string, Doc>();
  for (const doc of docs) {
    if (!doc.id.startsWith(prefix)) continue;
    const slug = doc.id.slice(prefix.length);
    // Root locale ids have no prefix, so skip other locales' pages.
    if (!locale && /^(zh-tw|ja|ko|fr)\//.test(doc.id)) continue;
    map.set(slug, doc);
  }
  return map;
}

export function inDir(docs: Map<string, Doc>, dir: string) {
  return [...docs]
    .filter(([slug]) => slug.startsWith(`${dir}/`) && !slug.slice(dir.length + 1).includes('/'))
    .sort(([a, x], [b, y]) => (x.data.sidebar?.order ?? 999) - (y.data.sidebar?.order ?? 999) || a.localeCompare(b));
}

export const href = (doc: Doc) => `/${doc.id}/`;
