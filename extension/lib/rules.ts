import type { GmailToggleKey, PlatformId, YoutubeToggleKey } from './settings';

type RuleMap<T extends string> = Record<T, string[]>;

/** CSS selectors per toggle. Multiple selectors = broader coverage when DOM varies. */
export const GMAIL_RULES: RuleMap<GmailToggleKey> = {
  logo: ['a[aria-label="Gmail"]'],
  leftSidebarMenus: ['[role="navigation"] .V3'],
  floatingCompose: ['[role="navigation"] .aic'],
  listToolbar: ['[role="main"] [gh="tm"]'],
  sidePanel: [
    '[role="complementary"][aria-label="Side panel"]',
    '.companion-collapser-button-container',
    '[aria-label="Show side panel"]',
    '[aria-label="Hide side panel"]',
    '[data-tooltip="Show side panel"]',
    '[data-tooltip="Hide side panel"]',
  ],
  searchBar: [
    'form[role="search"]',
    'input[aria-label="Search mail"]',
    'input[aria-label="Ask Gmail"]',
  ],
  minimalSearchBar: ['form[role="search"]'],
  topRightIcons: [
    '[data-mnml-gmail-top-right-cluster] > :not([data-mnml-gmail-account])',
    '[data-mnml-gmail-top-right-icon]',
    'a[aria-label="Google apps"]',
    '#gbwa',
    '[aria-label="Studio"]',
    'div:has(> span[data-is-tooltip-wrapper] > [aria-label="Ask Gemini"])',
  ],
  footer: [
    '.yg',
    'div[role="contentinfo"]',
    '.bvz',
  ],
};

export const YOUTUBE_RULES: RuleMap<YoutubeToggleKey> = {
  leftSidebar: [
    'ytd-mini-guide-renderer',
    '#guide-button',
    'ytd-masthead button[aria-label="Guide"]',
  ],
  createButton: [
    'ytd-masthead ytd-button-renderer:has(button[aria-label="Create"])',
    'ytd-masthead button[aria-label="Create"]',
  ],
  notificationButton: [
    'ytd-masthead ytd-notification-topbar-button-renderer',
    'ytd-masthead ytd-notification-topbar-button-renderer-lite',
    'ytd-masthead button[aria-label="Notifications"]',
  ],
  voiceSearch: [
    'ytd-masthead #voice-search-button',
    'ytd-masthead button[aria-label="Search with your voice"]',
  ],
  logo: [
    'ytd-masthead ytd-topbar-logo-renderer',
    'ytd-masthead ytd-youtube-premium-logo-renderer',
  ],
  searchChips: [
    'ytd-feed-filter-chip-bar-renderer',
    '#chips-wrapper',
    '#frosted-glass',
    'ytd-rich-grid-renderer #header',
  ],
  shorts: [
    'ytd-guide-entry-renderer a[title="Shorts"]',
    'ytd-reel-shelf-renderer',
    '[is-shorts]',
    'ytd-mini-guide-entry-renderer a[title="Shorts"]',
  ],
  comments: [
    '#comments',
    'ytd-comments',
    '#comment-teaser',
  ],
  related: [
    '#secondary',
    '#related',
    'ytd-watch-next-secondary-results-renderer',
  ],
  endScreen: [
    '.ytp-endscreen-content',
    '.ytp-ce-element',
    '.ytp-ce-covering-overlay',
  ],
};

export function getRulesForPlatform(platform: PlatformId) {
  return platform === 'gmail' ? GMAIL_RULES : YOUTUBE_RULES;
}

export function dataAttr(platform: PlatformId, key: string): string {
  return `data-mnml-${platform}-${key}`;
}
