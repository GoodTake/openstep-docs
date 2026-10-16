import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import { movedPages } from './src/moved-pages.mjs';
import { sections } from './src/sections.mjs';

// Old page URLs keep working in every locale. The locale prefixes mirror `locales` below.
const localePrefixes = ['', 'zh-tw/', 'ja/', 'ko/', 'fr/'];
const movedRedirects = Object.fromEntries(
  localePrefixes.flatMap((prefix) =>
    Object.entries(movedPages).map(([from, to]) => [`/${prefix}${from}`, `/${prefix}${to}/`]),
  ),
);

export default defineConfig({
  site: 'https://docs.openstep.academy',
  redirects: {
    '/zh-cn': '/zh-tw',
    '/en': '/',
    ...movedRedirects,
  },
  integrations: [
    starlight({
      title: 'OpenStep',
      plugins: [starlightThemeBlack({})],
      customCss: ['./src/styles/brand.css'],
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
          },
        },
        {
          tag: 'script',
          content:
            "try { const t = localStorage.getItem('starlight-theme'); if (t !== 'light' && t !== 'dark') localStorage.setItem('starlight-theme', 'dark'); } catch {}",
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
        ja: { label: '日本語', lang: 'ja' },
        ko: { label: '한국어', lang: 'ko' },
        fr: { label: 'Français', lang: 'fr' },
      },
      sidebar: sections.map(({ label, translations, dirs }) => ({
        label,
        translations,
        items: dirs.map((directory) => ({ autogenerate: { directory } })),
      })),
    }),
  ],
});
