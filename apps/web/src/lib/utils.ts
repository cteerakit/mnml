import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix a site-root path with Astro `base` (needed on GitHub Pages). */
export function withBase(path = '') {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const trimmed = path.replace(/^\/+/, '');
  return trimmed ? `${normalizedBase}${trimmed}` : normalizedBase;
}
