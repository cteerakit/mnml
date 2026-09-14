import type { Settings } from './settings';
import { getSettings } from './settings';

const SIDE_PANEL_TOGGLE =
  /^(Show|Hide) side panel$/i;

function isSidePanelToggle(el: Element): boolean {
  const label =
    el.getAttribute('aria-label') ??
    el.getAttribute('data-tooltip') ??
    '';
  return SIDE_PANEL_TOGGLE.test(label.trim());
}

function hideSidePanelTrigger(el: Element): void {
  const container =
    el.closest('.companion-collapser-button-container') ??
    el.closest('[role="button"]') ??
    el;

  if (container instanceof HTMLElement) {
    container.style.setProperty('display', 'none', 'important');
  }
}

function clearSidePanelTriggerStyles(): void {
  for (const selector of [
    '.companion-collapser-button-container',
    '[aria-label="Show side panel"]',
    '[aria-label="Hide side panel"]',
    '[data-tooltip="Show side panel"]',
    '[data-tooltip="Hide side panel"]',
  ]) {
    for (const el of document.querySelectorAll<HTMLElement>(selector)) {
      el.style.removeProperty('display');
    }
  }
}

function hideSidePanelTriggers(): void {
  for (const el of document.querySelectorAll(
    '.companion-collapser-button-container, [aria-label], [data-tooltip]',
  )) {
    if (isSidePanelToggle(el)) {
      hideSidePanelTrigger(el);
    }
  }
}

export function isSidePanelHideEnabled(settings: Settings): boolean {
  return settings.global.enabled && settings.platforms.gmail.sidePanel;
}

export async function syncGmailSidePanel(settings?: Settings): Promise<void> {
  const resolved = settings ?? (await getSettings());

  if (!isSidePanelHideEnabled(resolved)) {
    clearSidePanelTriggerStyles();
    return;
  }

  hideSidePanelTriggers();
}
