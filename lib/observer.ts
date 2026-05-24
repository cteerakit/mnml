let observer: MutationObserver | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function startDomObserver(onMutate: () => void | Promise<void>): void {
  if (observer) return;

  const schedule = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      void onMutate();
    }, 300);
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
}
