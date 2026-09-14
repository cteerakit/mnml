import type { Settings } from './settings';
import { getSettings } from './settings';

const EXPANDED_ATTR = 'data-mnml-gmail-topRightIcons-expanded';
const SESSION_KEY = 'mnml_gmail_topRightExpanded';
const TOGGLE_WRAP_ID = 'mnml-top-right-toggle-wrap';
const SVG_NS = 'http://www.w3.org/2000/svg';

function isExpanded(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

function setExpanded(expanded: boolean): void {
  if (expanded) {
    sessionStorage.setItem(SESSION_KEY, '1');
    document.documentElement.setAttribute(EXPANDED_ATTR, '');
  } else {
    sessionStorage.removeItem(SESSION_KEY);
    document.documentElement.removeAttribute(EXPANDED_ATTR);
  }
}

function findToggleParent(): HTMLElement | null {
  return document.querySelector('.gb_v.gb_we.bGJ') as HTMLElement | null;
}

function removeToggle(): void {
  document.getElementById(TOGGLE_WRAP_ID)?.remove();
}

function createChevronSvg(left: boolean): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 't7');
  svg.setAttribute('xmlns', SVG_NS);
  svg.setAttribute('width', '24px');
  svg.setAttribute('height', '24px');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#000000');
  svg.setAttribute('focusable', 'false');

  const clear = document.createElementNS(SVG_NS, 'path');
  clear.setAttribute('fill', 'none');
  clear.setAttribute('d', 'M0 0h24v24H0z');
  svg.appendChild(clear);

  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute(
    'd',
    left
      ? 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'
      : 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  );
  svg.appendChild(path);
  return svg;
}

function setChevronIcon(btn: HTMLElement, expanded: boolean): void {
  const existing = btn.querySelector('svg.t7');
  const svg = createChevronSvg(!expanded);
  if (existing) existing.replaceWith(svg);
  else btn.appendChild(svg);
}

function updateToggleUi(wrap: HTMLElement, expanded: boolean): void {
  const btn = wrap.querySelector<HTMLElement>('.mnml-top-right-toggle');
  if (!btn) return;

  btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  btn.setAttribute(
    'aria-label',
    expanded ? 'Hide account and tools' : 'Show account and tools',
  );
  setChevronIcon(btn, expanded);
}

function createToggle(expanded: boolean): HTMLElement {
  const wrap = document.createElement('div');
  wrap.id = TOGGLE_WRAP_ID;
  wrap.className = 'zo mnml-top-right-toggle-wrap';
  wrap.setAttribute('data-tooltip', 'Show or hide account and tools');

  const btn = document.createElement('a');
  btn.className = 'gb_xe gb_h gb_Kd t6 mnml-top-right-toggle';
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.href = '#';
  setChevronIcon(btn, expanded);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isExpanded();
    setExpanded(next);
    updateToggleUi(wrap, next);
  });

  wrap.appendChild(btn);
  updateToggleUi(wrap, expanded);
  return wrap;
}

function ensureToggle(expanded: boolean): void {
  const parent = findToggleParent();
  if (!parent) return;

  let wrap = document.getElementById(TOGGLE_WRAP_ID);
  if (!wrap) {
    wrap = createToggle(expanded);
    parent.insertBefore(wrap, parent.firstChild);
    return;
  }

  if (wrap.parentElement !== parent) {
    parent.insertBefore(wrap, parent.firstChild);
  }

  updateToggleUi(wrap, expanded);
}

export function isTopRightIconsEnabled(settings: Settings): boolean {
  return settings.global.enabled && settings.platforms.gmail.topRightIcons;
}

export async function syncGmailTopRightIcons(
  settings?: Settings,
): Promise<void> {
  const resolved = settings ?? (await getSettings());

  if (!isTopRightIconsEnabled(resolved)) {
    document.documentElement.removeAttribute(EXPANDED_ATTR);
    sessionStorage.removeItem(SESSION_KEY);
    removeToggle();
    return;
  }

  const expanded = isExpanded();
  setExpanded(expanded);
  ensureToggle(expanded);
}
