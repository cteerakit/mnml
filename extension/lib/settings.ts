import {
  isExtensionContextInvalidated,
  isExtensionContextValid,
} from './extension-context';

export const SETTINGS_KEY = 'mnml_settings';

export type PlatformId = 'gmail' | 'youtube';

export const GMAIL_TOGGLE_KEYS = [
  'logo',
  'leftSidebarMenus',
  'floatingCompose',
  'listToolbar',
  'sidePanel',
  'searchBar',
  'minimalSearchBar',
  'topRightIcons',
  'footer',
] as const;

export type GmailToggleKey = (typeof GMAIL_TOGGLE_KEYS)[number];

export const GMAIL_CONTENT_WIDTHS = [
  'small',
  'medium',
  'large',
  'full-width',
] as const;

export type GmailContentWidth = (typeof GMAIL_CONTENT_WIDTHS)[number];

export type GmailPlatformSettings = Record<GmailToggleKey, boolean> & {
  contentWidth: GmailContentWidth;
};

export const YOUTUBE_TOGGLE_KEYS = [
  'leftSidebar',
  'createButton',
  'notificationButton',
  'voiceSearch',
  'logo',
  'searchChips',
  'shorts',
  'comments',
  'related',
  'endScreen',
] as const;

export type YoutubeToggleKey = (typeof YOUTUBE_TOGGLE_KEYS)[number];

export type Settings = {
  version: 1;
  global: { enabled: boolean };
  platforms: {
    gmail: GmailPlatformSettings;
    youtube: Record<YoutubeToggleKey, boolean>;
  };
};

export const DEFAULT_SETTINGS: Settings = {
  version: 1,
  global: { enabled: true },
  platforms: {
    gmail: {
      logo: true,
      leftSidebarMenus: true,
      floatingCompose: true,
      listToolbar: true,
      sidePanel: true,
      searchBar: false,
      minimalSearchBar: true,
      topRightIcons: true,
      footer: true,
      contentWidth: 'small',
    },
    youtube: {
      leftSidebar: false,
      createButton: false,
      notificationButton: false,
      voiceSearch: false,
      logo: false,
      searchChips: false,
      shorts: true,
      comments: false,
      related: true,
      endScreen: true,
    },
  },
};

export async function getSettings(): Promise<Settings> {
  if (!isExtensionContextValid()) {
    return structuredClone(DEFAULT_SETTINGS);
  }

  try {
    const result = await chrome.storage.sync.get(SETTINGS_KEY);
    const stored = result[SETTINGS_KEY] as Settings | undefined;
    if (!stored || stored.version !== 1) {
      return structuredClone(DEFAULT_SETTINGS);
    }
    return mergeWithDefaults(stored);
  } catch (error) {
    if (isExtensionContextInvalidated(error)) {
      return structuredClone(DEFAULT_SETTINGS);
    }
    throw error;
  }
}

export async function setSettings(settings: Settings): Promise<void> {
  await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
}

export async function updateSettings(
  updater: (current: Settings) => Settings,
): Promise<Settings> {
  const current = await getSettings();
  const next = updater(current);
  await setSettings(next);
  return next;
}

function mergeWithDefaults(stored: Settings): Settings {
  const merged = structuredClone(DEFAULT_SETTINGS);
  merged.global = { ...merged.global, ...stored.global };
  merged.platforms.gmail = {
    ...merged.platforms.gmail,
    ...stored.platforms?.gmail,
  };
  merged.platforms.youtube = {
    ...merged.platforms.youtube,
    ...stored.platforms?.youtube,
  };
  return merged;
}
