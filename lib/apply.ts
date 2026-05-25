import '@/assets/mnml.css';

import type { ContentScriptContext } from 'wxt/utils/content-script-context';

import {
  isExtensionContextInvalidated,
  registerInvalidationRejectionGuard,
} from './extension-context';
import { applyGmailContentWidth, gmailContentWidthMatches } from './gmail-content-width';
import { dataAttr, getRulesForPlatform } from './rules';
import {
  DEFAULT_SETTINGS,
  GMAIL_TOGGLE_KEYS,
  getSettings,
  SETTINGS_KEY,
  type PlatformId,
  type Settings,
  YOUTUBE_TOGGLE_KEYS,
} from './settings';
import { startDomObserver, stopDomObserver } from './observer';

if (typeof window !== 'undefined') {
  registerInvalidationRejectionGuard();
}

let stylesheetInjected = false;

function ensureStylesheet() {
  if (stylesheetInjected) return;
  stylesheetInjected = true;
}

function toggleKeysForPlatform(platform: PlatformId): readonly string[] {
  return platform === 'gmail' ? GMAIL_TOGGLE_KEYS : YOUTUBE_TOGGLE_KEYS;
}

function buildDesiredAttrs(
  platform: PlatformId,
  settings: Settings,
): Map<string, boolean> {
  const desired = new Map<string, boolean>();
  const enabled = settings.global.enabled;
  const platformSettings = settings.platforms[platform];
  const rules = getRulesForPlatform(platform);

  for (const key of toggleKeysForPlatform(platform)) {
    const attr = dataAttr(platform, key);
    const selectors = (rules as Record<string, string[]>)[key] ?? [];
    const isOn =
      enabled &&
      platformSettings[key as keyof typeof platformSettings] === true &&
      selectors.length > 0;
    desired.set(attr, isOn);
  }

  return desired;
}

function attrsMatchDesired(desired: Map<string, boolean>): boolean {
  for (const [attr, shouldExist] of desired) {
    const exists = document.documentElement.hasAttribute(attr);
    if (exists !== shouldExist) return false;
  }
  return true;
}

export async function applyRules(
  platform: PlatformId,
  settings?: Settings,
): Promise<void> {
  ensureStylesheet();
  const resolved = settings ?? (await getSettings());
  const desired = buildDesiredAttrs(platform, resolved);

  const gmailWidthOk =
    platform !== 'gmail' || gmailContentWidthMatches(resolved);

  if (attrsMatchDesired(desired) && gmailWidthOk) return;

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      for (const [attr, shouldExist] of desired) {
        if (shouldExist) {
          document.documentElement.setAttribute(attr, '');
        } else {
          document.documentElement.removeAttribute(attr);
        }
      }
      if (platform === 'gmail') {
        applyGmailContentWidth(resolved);
      }
      resolve();
    });
  });
}

export async function initPlatform(
  platform: PlatformId,
  ctx: ContentScriptContext,
  options?: {
    afterApply?: (settings: Settings) => void | Promise<void>;
  },
): Promise<void> {
  ensureStylesheet();

  const run = async (settings?: Settings) => {
    if (!ctx.isValid) return;

    try {
      const resolved = settings ?? (await getSettings());
      if (!ctx.isValid) return;

      await applyRules(platform, resolved);
      if (!ctx.isValid) return;

      await options?.afterApply?.(resolved);
    } catch (error) {
      if (isExtensionContextInvalidated(error)) return;
      throw error;
    }
  };

  const scheduleRun = (settings?: Settings) => {
    void run(settings).catch((error) => {
      if (isExtensionContextInvalidated(error)) return;
      throw error;
    });
  };

  await run();

  const onStorageChange = (
    changes: Record<string, chrome.storage.StorageChange>,
    area: string,
  ) => {
    if (!ctx.isValid || area !== 'sync' || !changes[SETTINGS_KEY]) return;
    const next =
      (changes[SETTINGS_KEY].newValue as Settings | undefined) ??
      DEFAULT_SETTINGS;
    scheduleRun(next);
  };

  chrome.storage.onChanged.addListener(onStorageChange);
  ctx.onInvalidated(() => {
    chrome.storage.onChanged.removeListener(onStorageChange);
    stopDomObserver();
  });

  startDomObserver(() => {
    if (!ctx.isValid) return;
    scheduleRun();
  }, ctx);
}
