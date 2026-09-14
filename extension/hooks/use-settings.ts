import { useCallback, useEffect, useState } from 'react';

import {
  DEFAULT_SETTINGS,
  getSettings,
  SETTINGS_KEY,
  setSettings,
  type GmailContentWidth,
  type GmailToggleKey,
  type PlatformId,
  type Settings,
  type YoutubeToggleKey,
} from '@/lib/settings';

export function useSettings() {
  const [settings, setLocal] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const stored = await getSettings();
      if (mounted) {
        setLocal(stored);
        setLoading(false);
      }
    })();

    const onChange = (
      changes: Record<string, chrome.storage.StorageChange>,
      area: string,
    ) => {
      if (area !== 'sync' || !changes[SETTINGS_KEY]) return;
      const next = changes[SETTINGS_KEY].newValue as Settings | undefined;
      if (next) setLocal(next);
    };

    chrome.storage.onChanged.addListener(onChange);
    return () => {
      mounted = false;
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, []);

  const persist = useCallback(async (next: Settings) => {
    setLocal(next);
    await setSettings(next);
  }, []);

  const setGlobalEnabled = useCallback(
    async (enabled: boolean) => {
      const current = await getSettings();
      await persist({
        ...current,
        global: { enabled },
      });
    },
    [persist],
  );

  const setPlatformToggle = useCallback(
    async (
      platform: PlatformId,
      key: GmailToggleKey | YoutubeToggleKey,
      value: boolean,
    ) => {
      const current = await getSettings();
      await persist({
        ...current,
        platforms: {
          ...current.platforms,
          [platform]: {
            ...current.platforms[platform],
            [key]: value,
          },
        },
      });
    },
    [persist],
  );

  const setGmailContentWidth = useCallback(
    async (contentWidth: GmailContentWidth) => {
      const current = await getSettings();
      await persist({
        ...current,
        platforms: {
          ...current.platforms,
          gmail: {
            ...current.platforms.gmail,
            contentWidth,
          },
        },
      });
    },
    [persist],
  );

  return {
    settings,
    loading,
    setGlobalEnabled,
    setPlatformToggle,
    setGmailContentWidth,
    persist,
  };
}
