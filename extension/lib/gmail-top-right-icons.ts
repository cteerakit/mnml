import type { Settings } from './settings';
import { getSettings } from './settings';

const EXPANDED_ATTR = 'data-mnml-gmail-topRightIcons-expanded';
const SESSION_KEY = 'mnml_gmail_topRightExpanded';
const TOGGLE_WRAP_ID = 'mnml-top-right-toggle-wrap';
const CLUSTER_ATTR = 'data-mnml-gmail-top-right-cluster';
const HOVER_ATTR = 'data-mnml-gmail-top-right-hover';
const ACCOUNT_ATTR = 'data-mnml-gmail-account';
const ICON_ATTR = 'data-mnml-gmail-top-right-icon';
const ACCOUNT_SELECTOR = 'a[aria-label^="Google Account"]';
const CLUSTER_FALLBACK = '.gb_v.gb_we.bGJ';

const COLLAPSE_LABEL_RE =
  /^(Google apps|Support|Settings|Studio|Ask Gemini|Gemini|Open Gemini(?: side panel)?)$/i;

function findAccountLink(): HTMLElement | null {
  return document.querySelector(ACCOUNT_SELECTOR);
}

function findAccountWrap(account: HTMLElement | null): HTMLElement | null {
  return account?.parentElement ?? null;
}

function findCluster(accountWrap: HTMLElement | null): HTMLElement | null {
  const fallback = document.querySelector(CLUSTER_FALLBACK) as HTMLElement | null;
  const candidate = accountWrap?.parentElement ?? fallback;
  if (!candidate) return fallback;
  if (candidate.querySelector('form[role="search"]')) {
    return accountWrap ?? fallback;
  }
  return candidate;
}

function findHoverRoot(cluster: HTMLElement): HTMLElement {
  const parent = cluster.parentElement;
  if (
    !parent ||
    parent === document.body ||
    parent.querySelector('form[role="search"]')
  ) {
    return cluster;
  }
  return parent;
}

function markAccount(
  account: HTMLElement | null,
  accountWrap: HTMLElement | null,
  cluster: HTMLElement,
): void {
  if (account && account.parentElement === cluster) {
    setExclusiveAttr(account, ACCOUNT_ATTR);
    return;
  }
  if (accountWrap && cluster.contains(accountWrap) && accountWrap !== cluster) {
    setExclusiveAttr(accountWrap, ACCOUNT_ATTR);
    return;
  }
  if (account && cluster.contains(account)) {
    setExclusiveAttr(account, ACCOUNT_ATTR);
  }
}

function setExclusiveAttr(el: HTMLElement, attr: string): void {
  for (const prev of document.querySelectorAll(`[${attr}]`)) {
    if (prev !== el) prev.removeAttribute(attr);
  }
  el.setAttribute(attr, '');
}

function clearMarks(): void {
  for (const attr of [CLUSTER_ATTR, HOVER_ATTR, ACCOUNT_ATTR, ICON_ATTR]) {
    for (const el of document.querySelectorAll(`[${attr}]`)) {
      el.removeAttribute(attr);
    }
  }
}

function isAccountTree(el: Element): boolean {
  return Boolean(
    el.closest(`[${ACCOUNT_ATTR}]`) || el.closest(ACCOUNT_SELECTOR),
  );
}

function visualIconWrap(el: HTMLElement, cluster: HTMLElement): HTMLElement {
  const tooltip = el.closest<HTMLElement>('[data-is-tooltip-wrapper]');
  if (tooltip?.parentElement && tooltip.parentElement !== cluster) {
    return tooltip.parentElement;
  }

  const guest = el.closest<HTMLElement>('[data-guest-app-id], [id^="gsc-gab-"]');
  if (guest?.parentElement && guest.parentElement !== cluster) {
    return guest.parentElement;
  }

  let cur = el;
  while (cur.parentElement) {
    const parent = cur.parentElement;
    if (
      parent === cluster ||
      parent.id === 'gb' ||
      parent.tagName === 'HEADER' ||
      parent.querySelector('form[role="search"]')
    ) {
      break;
    }
    const rect = parent.getBoundingClientRect();
    if (rect.width > 80 || rect.height > 80) break;
    cur = parent;
  }

  return (
    cur.closest<HTMLElement>('#gbwa') ??
    cur.closest<HTMLElement>('.zo') ??
    cur
  );
}

function markCollapsibleIcon(el: HTMLElement, cluster: HTMLElement): void {
  if (el.id === TOGGLE_WRAP_ID || el.closest(`#${TOGGLE_WRAP_ID}`)) return;
  if (isAccountTree(el)) return;

  const wrap = visualIconWrap(el, cluster);
  if (wrap.id === TOGGLE_WRAP_ID || isAccountTree(wrap)) return;
  if (wrap.querySelector('form[role="search"]')) return;
  if (wrap === cluster) {
    el.setAttribute(ICON_ATTR, '');
    return;
  }
  wrap.setAttribute(ICON_ATTR, '');
}

function markGmailIconStrip(cluster: HTMLElement): void {
  const probe =
    document.querySelector<HTMLElement>('[aria-label="Ask Gemini"]') ??
    document.querySelector<HTMLElement>('[aria-label="Studio"]') ??
    document.querySelector<HTMLElement>('[aria-label="Support"]') ??
    document.querySelector<HTMLElement>('[data-tooltip="Support"]');
  if (!probe || cluster.contains(probe)) return;

  let cur: HTMLElement | null = probe.parentElement;
  while (cur && cur !== document.body) {
    if (cur === cluster || cur.querySelector(ACCOUNT_SELECTOR)) {
      cur = cur.parentElement;
      continue;
    }
    if (cur.querySelector('form[role="search"]')) break;

    const labels = [
      ...cur.querySelectorAll<HTMLElement>('[aria-label], [data-tooltip]'),
    ].map((node) =>
      (node.getAttribute('aria-label') ?? node.getAttribute('data-tooltip') ?? '')
        .trim(),
    );
    const matches = labels.filter((label) => COLLAPSE_LABEL_RE.test(label));
    if (matches.length >= 2) {
      cur.setAttribute(ICON_ATTR, '');
      cur.setAttribute(HOVER_ATTR, '');
      return;
    }
    cur = cur.parentElement;
  }
}

function markCollapsibleIcons(root: ParentNode, cluster: HTMLElement): void {
  for (const el of root.querySelectorAll<HTMLElement>(
    '[aria-label], [data-tooltip]',
  )) {
    const label = (
      el.getAttribute('aria-label') ??
      el.getAttribute('data-tooltip') ??
      ''
    ).trim();
    if (!COLLAPSE_LABEL_RE.test(label)) continue;
    markCollapsibleIcon(el, cluster);
  }
}

function markHeaderIcons(cluster: HTMLElement, hoverRoot: HTMLElement): void {
  markGmailIconStrip(cluster);
  markCollapsibleIcons(hoverRoot, cluster);
  if (hoverRoot !== cluster) markCollapsibleIcons(cluster, cluster);

  const parent = cluster.parentElement;
  if (parent) {
    for (const sibling of parent.children) {
      if (sibling === cluster || sibling === hoverRoot) continue;
      markCollapsibleIcons(sibling, cluster);
    }
  }

  const header =
    document.querySelector('#gb') ??
    document.querySelector('header') ??
    document.querySelector('[role="banner"]');
  if (header && header !== hoverRoot) markCollapsibleIcons(header, cluster);
}

function removeLegacyToggle(): void {
  document.getElementById(TOGGLE_WRAP_ID)?.remove();
  document.documentElement.removeAttribute(EXPANDED_ATTR);
  sessionStorage.removeItem(SESSION_KEY);
}

export function isTopRightIconsEnabled(settings: Settings): boolean {
  return settings.global.enabled && settings.platforms.gmail.topRightIcons;
}

export async function syncGmailTopRightIcons(
  settings?: Settings,
): Promise<void> {
  const resolved = settings ?? (await getSettings());
  removeLegacyToggle();

  if (!isTopRightIconsEnabled(resolved)) {
    clearMarks();
    return;
  }

  const account = findAccountLink();
  const accountWrap = findAccountWrap(account);
  const cluster = findCluster(accountWrap);
  if (!cluster) return;

  const hoverRoot = findHoverRoot(cluster);
  setExclusiveAttr(cluster, CLUSTER_ATTR);
  setExclusiveAttr(hoverRoot, HOVER_ATTR);
  markAccount(account, accountWrap, cluster);
  markHeaderIcons(cluster, hoverRoot);
}
