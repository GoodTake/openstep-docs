import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import { sections } from './src/sections.mjs';

export default defineConfig({
  site: 'https://docs.openstep.academy',
  redirects: {
    '/zh-cn': '/zh-tw',
    '/en': '/',
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
            "try { if (localStorage.getItem('starlight-theme') === null) localStorage.setItem('starlight-theme', 'dark'); } catch {}",
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
