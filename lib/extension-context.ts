function errorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

export function isExtensionContextValid(): boolean {
  try {
    return Boolean(chrome.runtime?.id);
  } catch {
    return false;
  }
}

export function isExtensionContextInvalidated(error: unknown): boolean {
  return errorMessage(error).includes('Extension context invalidated');
}

export function registerInvalidationRejectionGuard(): () => void {
  const handler = (event: PromiseRejectionEvent) => {
    if (isExtensionContextInvalidated(event.reason)) {
      event.preventDefault();
    }
  };

  window.addEventListener('unhandledrejection', handler);
  return () => window.removeEventListener('unhandledrejection', handler);
}
