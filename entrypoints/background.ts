import { DEFAULT_SETTINGS, SETTINGS_KEY } from '@/lib/settings';

const HOST_TAB_URLS = [
  'https://mail.google.com/*',
  'https://www.youtube.com/*',
] as const;

async function reloadHostTabs(): Promise<void> {
  const tabs = await chrome.tabs.query({ url: [...HOST_TAB_URLS] });
  await Promise.all(
    tabs
      .map((tab) => tab.id)
      .filter((id): id is number => id != null)
      .map((id) => chrome.tabs.reload(id).catch(() => undefined)),
  );
}

export default defineBackground(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.runtime.onInstalled.addListener(async (details) => {
    const existing = await chrome.storage.sync.get(null);
    if (!existing[SETTINGS_KEY]) {
      await chrome.storage.sync.set({ [SETTINGS_KEY]: DEFAULT_SETTINGS });
    }

    // After a dev reload, refresh open Gmail/YouTube tabs so stale content
    // scripts do not keep calling extension APIs with an invalidated context.
    if (import.meta.env.DEV && details.reason === 'update') {
      await reloadHostTabs();
    }
  });
});
