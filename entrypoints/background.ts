import { DEFAULT_SETTINGS, SETTINGS_KEY } from '@/lib/settings';

export default defineBackground(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.runtime.onInstalled.addListener(async () => {
    const existing = await chrome.storage.sync.get(null);
    if (!existing[SETTINGS_KEY]) {
      await chrome.storage.sync.set({ [SETTINGS_KEY]: DEFAULT_SETTINGS });
    }
  });
});
