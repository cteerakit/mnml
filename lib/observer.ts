import type { ContentScriptContext } from 'wxt/utils/content-script-context';

import { isExtensionContextInvalidated } from './extension-context';

let observer: MutationObserver | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | number | null = null;

function runObserverCallback(onMutate: () => void | Promise<void>): void {
  void Promise.resolve(onMutate()).catch((error) => {
    if (isExtensionContextInvalidated(error)) return;
    throw error;
  });
}

export function startDomObserver(
  onMutate: () => void | Promise<void>,
  ctx?: ContentScriptContext,
): () => void {
  if (observer) return stopDomObserver;

  const schedule = () => {
    if (ctx && !ctx.isValid) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    const scheduleCallback = () => {
      debounceTimer = null;
      if (ctx && !ctx.isValid) return;
      runObserverCallback(onMutate);
    };
    debounceTimer = ctx
      ? ctx.setTimeout(scheduleCallback, 300)
      : setTimeout(scheduleCallback, 300);
  };

  observer = new MutationObserver(schedule);
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        observer?.observe(document.body, { childList: true, subtree: true });
      },
      { once: true },
    );
  }

  return stopDomObserver;
}

export function stopDomObserver(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  observer?.disconnect();
  observer = null;
}
