export const siteConfig = {
  name: 'mnml',
  tagline: 'Less clutter on Gmail and YouTube',
  description:
    'A free Chrome extension that lets you hide the parts of Gmail and YouTube you do not need. Turn options on or off anytime—your choices stay private on your computer.',
  chromeStoreUrl:
    import.meta.env.PUBLIC_CHROME_STORE_URL ??
    'https://chromewebstore.google.com/detail/jkbikdenghbgmceehglljbbnhfalkcpg',
  githubUrl: import.meta.env.PUBLIC_GITHUB_URL,
  feedbackUrl: 'https://mnml.featurebase.app/',
} as const;

export const comingSoonPlatforms = [
  'Calendar',
  'X',
  'Facebook',
] as const;
