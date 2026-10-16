// Doc sections, shared by the sidebar (astro.config.mjs) and the home page (HomeSections.astro).
export const sections = [
  {
    label: 'Get started',
    translations: { 'zh-TW': '開始使用', ja: 'はじめる', ko: '시작하기', fr: 'Commencer' },
    dirs: ['start'],
  },
  {
    label: 'Build your app',
    translations: { 'zh-TW': '打造你的應用', ja: 'アプリを作る', ko: '앱 만들기', fr: 'Créer votre app' },
    dirs: ['chat', 'build'],
  },
  {
    label: 'Publish',
    translations: { 'zh-TW': '發布與上線', ja: '公開する', ko: '게시하기', fr: 'Publier' },
    dirs: ['ship'],
  },
  {
    label: 'Projects',
    translations: { 'zh-TW': '專案與協作', ja: 'プロジェクト', ko: '프로젝트', fr: 'Projets' },
    dirs: ['projects'],
  },
  {
    label: 'SSU and account',
    translations: { 'zh-TW': 'SSU 與帳戶', ja: 'SSU とアカウント', ko: 'SSU와 계정', fr: 'SSU et compte' },
    dirs: ['account'],
  },
  {
    label: 'Reference',
    translations: { 'zh-TW': '參考', ja: '参考', ko: '참고', fr: 'Référence' },
    dirs: ['reference'],
  },
];
