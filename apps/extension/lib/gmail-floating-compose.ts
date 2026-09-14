import type { Settings } from './settings';
import { getSettings } from './settings';

const FAB_ID = 'mnml-floating-compose';

function findNativeCompose(): HTMLElement | null {
  return document.querySelector(
    '[role="navigation"] [gh="cm"][role="button"]',
  ) as HTMLElement | null;
}

function removeFab(): void {
  document.getElementById(FAB_ID)?.remove();
}

function createFab(): HTMLElement {
  const btn = document.createElement('button');
  btn.id = FAB_ID;
  btn.type = 'button';
  btn.className = 'mnml-floating-compose';
  btn.setAttribute('aria-label', 'Compose');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    findNativeCompose()?.click();
  });

  return btn;
}

function ensureFab(): void {
  if (document.getElementById(FAB_ID)) return;
  document.body.appendChild(createFab());
}

export function isFloatingComposeEnabled(settings: Settings): boolean {
  return settings.global.enabled && settings.platforms.gmail.floatingCompose;
}

export async function syncGmailFloatingCompose(
  settings?: Settings,
): Promise<void> {
  const resolved = settings ?? (await getSettings());

  if (!isFloatingComposeEnabled(resolved)) {
    removeFab();
    return;
  }

  ensureFab();
}
