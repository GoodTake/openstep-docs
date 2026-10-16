import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.openstep.academy',
  redirects: {
    '/zh-cn': '/zh-tw',
    '/en': '/',
  },
  integrations: [
    starlight({
      title: 'OpenStep',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
        ja: { label: '日本語', lang: 'ja' },
        ko: { label: '한국어', lang: 'ko' },
        fr: { label: 'Français', lang: 'fr' },
      },
      sidebar: [
        {
          label: 'Get started',
          translations: { 'zh-TW': '開始使用', ja: 'はじめる', ko: '시작하기', fr: 'Commencer' },
          items: [{ autogenerate: { directory: 'start' } }],
        },
        {
          label: 'Build your app',
          translations: { 'zh-TW': '打造你的應用', ja: 'アプリを作る', ko: '앱 만들기', fr: 'Créer votre app' },
          items: [
            { autogenerate: { directory: 'chat' } },
            { autogenerate: { directory: 'build' } },
          ],
        },
        {
          label: 'Publish',
          translations: { 'zh-TW': '發布與上線', ja: '公開する', ko: '게시하기', fr: 'Publier' },
          items: [{ autogenerate: { directory: 'ship' } }],
        },
        {
          label: 'Projects',
          translations: { 'zh-TW': '專案與協作', ja: 'プロジェクト', ko: '프로젝트', fr: 'Projets' },
          items: [{ autogenerate: { directory: 'projects' } }],
        },
        {
          label: 'SSU and account',
          translations: { 'zh-TW': 'SSU 與帳戶', ja: 'SSU とアカウント', ko: 'SSU와 계정', fr: 'SSU et compte' },
          items: [{ autogenerate: { directory: 'account' } }],
        },
        {
          label: 'Reference',
          translations: { 'zh-TW': '參考', ja: '参考', ko: '참고', fr: 'Référence' },
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
  ],
});
