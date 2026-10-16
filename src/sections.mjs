// Doc sections, shared by the sidebar (astro.config.mjs) and the home page (HomeSections.astro).
export const sections = [
  {
    label: 'Get started',
    translations: { 'zh-TW': '開始使用', ja: 'はじめる', ko: '시작하기', fr: 'Commencer' },
    dirs: ['start'],
  },
  {
    label: 'Agent',
    translations: { 'zh-TW': 'Agent', ja: 'Agent', ko: 'Agent', fr: 'Agent' },
    dirs: ['agent'],
  },
  {
    label: 'Build',
    translations: { 'zh-TW': 'Build', ja: 'Build', ko: 'Build', fr: 'Build' },
    dirs: ['build'],
  },
  {
    label: 'OpenStep CLI',
    translations: { 'zh-TW': 'OpenStep CLI', ja: 'OpenStep CLI', ko: 'OpenStep CLI', fr: 'OpenStep CLI' },
    dirs: ['cli'],
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
