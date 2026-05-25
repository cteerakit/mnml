import type { Settings } from './settings';

export const GMAIL_CONTENT_WIDTH_ATTR = 'data-mnml-gmail-contentWidth';
export const GMAIL_LAYOUT_ATTR = 'data-mnml-gmail-layout';

/** Inbox uses .nH.ar4.z; search/labels use .nH.ar4 with other suffixes (e.g. j7diG). */
const GMAIL_CONTENT_CARD_SELECTOR = '.nH.bkK > .nH:has(.nH.ar4)';
const GMAIL_HEIGHT_RESET_ATTR = 'data-mnml-gmail-height-reset';

/** Elements Gmail sizes with inline height / flex-grow; reset for inbox shrink-wrap only. */
const GMAIL_LIST_ROW_SELECTOR =
  'table.Cp tbody tr, tr:has(span[data-thread-id])';

const GMAIL_LIST_HEIGHT_RESET_SELECTORS = [
  '.nH.ar4',
  '.AO',
  '.Tm',
  '.aeF',
  '[role="main"]',
  '[role="main"] .Nr',
  '.Nu.tf',
] as const;

function isConstrained(settings: Settings): boolean {
  return (
    settings.global.enabled &&
    settings.platforms.gmail.contentWidth !== 'full-width'
  );
}

export function isGmailThreadView(): boolean {
  const main = document.querySelector('[role="main"]');
  if (!main?.querySelector('.h7')) return false;

  // Split pane / search can include .h7 in preview while the list is still visible.
  return !main.querySelector(GMAIL_LIST_ROW_SELECTOR);
}

export function isGmailListView(): boolean {
  if (isGmailThreadView()) return false;

  const main = document.querySelector('[role="main"]');
  if (!main) return false;

  return !!(
    main.querySelector('.Nr') ||
    main.querySelector('.Cp') ||
    main.querySelector('span[data-thread-id]')
  );
}

function clearGmailHeightResets(): void {
  for (const el of document.querySelectorAll<HTMLElement>(
    `[${GMAIL_HEIGHT_RESET_ATTR}]`,
  )) {
    el.style.removeProperty('height');
    el.style.removeProperty('min-height');
    el.style.removeProperty('flex-grow');
    el.style.removeProperty('flex');
    el.removeAttribute(GMAIL_HEIGHT_RESET_ATTR);
  }
}

function resetListElementLayout(el: HTMLElement): void {
  el.style.setProperty('height', 'auto', 'important');
  el.style.setProperty('min-height', '0', 'important');

  if (el.matches('.Nu.tf')) {
    el.style.setProperty('flex-grow', '0', 'important');
    el.style.setProperty('flex', '0 0 auto', 'important');
  }

  if (el.matches('[role="main"] .Nr')) {
    el.style.setProperty('flex', '0 1 auto', 'important');
  }

  el.setAttribute(GMAIL_HEIGHT_RESET_ATTR, '');
}

function syncGmailLayoutMode(): 'list' | 'thread' {
  const layout = isGmailThreadView() ? 'thread' : 'list';
  document.documentElement.setAttribute(GMAIL_LAYOUT_ATTR, layout);
  return layout;
}

/** Beat Gmail inline heights so the rounded pane can shrink-wrap on the inbox. */
export function syncGmailContentWidthLayout(settings: Settings): void {
  if (!isConstrained(settings)) {
    document.documentElement.removeAttribute(GMAIL_LAYOUT_ATTR);
    clearGmailHeightResets();
    return;
  }

  const layout = syncGmailLayoutMode();

  if (layout === 'thread') {
    clearGmailHeightResets();
    return;
  }

  const card = document.querySelector(GMAIL_CONTENT_CARD_SELECTOR);
  if (!card) return;

  for (const selector of GMAIL_LIST_HEIGHT_RESET_SELECTORS) {
    for (const el of card.querySelectorAll<HTMLElement>(selector)) {
      resetListElementLayout(el);
    }
  }
}

export function gmailContentWidthMatches(settings: Settings): boolean {
  const enabled = settings.global.enabled;
  const width = settings.platforms.gmail.contentWidth;
  const current = document.documentElement.getAttribute(GMAIL_CONTENT_WIDTH_ATTR);

  if (!enabled || width === 'full-width') {
    return (
      current === null &&
      !document.documentElement.hasAttribute(GMAIL_LAYOUT_ATTR)
    );
  }

  const layout = isGmailThreadView() ? 'thread' : 'list';
  const layoutAttr = document.documentElement.getAttribute(GMAIL_LAYOUT_ATTR);

  return current === width && layoutAttr === layout;
}

export function applyGmailContentWidth(settings: Settings): void {
  const enabled = settings.global.enabled;
  const width = settings.platforms.gmail.contentWidth;

  if (!enabled || width === 'full-width') {
    document.documentElement.removeAttribute(GMAIL_CONTENT_WIDTH_ATTR);
    document.documentElement.removeAttribute(GMAIL_LAYOUT_ATTR);
    clearGmailHeightResets();
    return;
  }

  document.documentElement.setAttribute(GMAIL_CONTENT_WIDTH_ATTR, width);
  syncGmailContentWidthLayout(settings);
}
