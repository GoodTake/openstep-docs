// Old page slug -> new page slug (no locale prefix, no leading or trailing slash).
// Used by astro.config.mjs to redirect old URLs and by scripts/check-site.mjs to verify those redirects.
export const movedPages = {
  'start/create-project': 'start/create-agent',
  'start/first-generation': 'build/start-website',
  'projects/agents': 'agent/pick-agent',
  'chat/confirm-plan': 'agent/approve-plan',
  'projects/members': 'agent/work-with-others',
  'projects/settings': 'agent/manage-agents',
  'chat/editor': 'build/work-page',
  'chat/modes': 'build/modes',
  'chat/describe-what-you-want': 'build/describe',
  'chat/choose-model': 'build/choose-model',
  'chat/progress': 'build/progress',
  'build/what-your-app-can-do': 'build/what-your-site-can-do',
  'ship/deploy-backend': 'build/environment-values',
  'ship/publish': 'build/go-live',
  'ship/domains': 'build/domains',
};
