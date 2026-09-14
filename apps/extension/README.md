# mnml

A Chrome extension that hides distracting UI on Gmail, YouTube, and more.

## Development

```bash
pnpm install
pnpm dev
```

Load the extension from `.output/chrome-mv3` in `chrome://extensions` (Developer mode → Load unpacked).

Click the toolbar icon to open the **side panel** and configure hides per platform.

## Build

```bash
pnpm build
pnpm zip
```

## Privacy policy

See [PRIVACY.md](./PRIVACY.md) for the source text. The public policy is hosted at [https://cteerakit.github.io/mnml/privacy](https://cteerakit.github.io/mnml/privacy) — use that URL in the Chrome Web Store developer dashboard.

## Stack

- [WXT](https://wxt.dev) + React + TypeScript
- shadcn/ui (Neutral) + Tailwind CSS v4

## Testing checklist

1. Load `.output/chrome-mv3` in `chrome://extensions` (Developer mode).
2. Click the mnml toolbar icon — side panel opens.
3. Open [Gmail](https://mail.google.com) — toggle hides in the Gmail section of the side panel.
4. Toggle options in the side panel — UI updates without a full reload when possible.
5. Disable **Enable mnml** under General — all hides clear.
6. Open [YouTube](https://www.youtube.com) — test Shorts, related videos, comments toggles.
7. Navigate YouTube (home → watch) — hides persist after SPA navigation.

CSS selectors live in [`assets/mnml.css`](assets/mnml.css) and [`lib/rules.ts`](lib/rules.ts). Google and YouTube change their DOM often; update selectors if a toggle stops working.
