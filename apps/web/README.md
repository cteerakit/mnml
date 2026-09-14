# mnml-pages

Static marketing site and privacy policy for the [mnml](https://github.com/cteerakit/mnml) Chrome extension. Built with [Astro](https://astro.build) and deployed to [GitHub Pages](https://pages.github.com/).

Part of the [mnml monorepo](../..). Install dependencies from the repo root (`pnpm install`).

Live site: [https://cteerakit.github.io/mnml/](https://cteerakit.github.io/mnml/)

## Pages

| Route | Description |
|-------|-------------|
| `/mnml/` | Single-page landing (Gmail, YouTube, privacy teaser) |
| `/mnml/privacy` | Chrome Web Store privacy policy |

## Development

From the repo root:

```bash
pnpm dev:web
```

Or from this directory:

```bash
pnpm dev
```

Open [http://localhost:4321/mnml/](http://localhost:4321/mnml/). The `/mnml` prefix matches the GitHub Pages project URL.

## Build

From the repo root:

```bash
pnpm build:web
pnpm preview:web
```

Output is written to `dist/`.

## Environment variables

Copy `.env.example` to `.env` for local builds. Production values are set in [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml).

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE` | Yes (production) | Canonical origin only, `https://cteerakit.github.io` (do not include `/mnml`) |
| `PUBLIC_CHROME_STORE_URL` | No | Chrome Web Store listing URL for the “Add to Chrome” button |
| `PUBLIC_GITHUB_URL` | No | Optional GitHub link in the footer |

`base` is `/mnml` in [`astro.config.mjs`](astro.config.mjs) so assets and routes work on the project Pages URL.

## Deploy to GitHub Pages

1. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
2. One-time: repo **Settings → Pages → Source:** GitHub Actions.
3. Site URL: [https://cteerakit.github.io/mnml/](https://cteerakit.github.io/mnml/)

## Content maintenance

- **Features:** Update [`src/data/features.ts`](src/data/features.ts) when toggles change in the extension ([`PlatformView.tsx`](../extension/entrypoints/sidepanel/views/PlatformView.tsx)).
- **Privacy:** Update [`src/content/privacy/policy.md`](src/content/privacy/policy.md) when [`PRIVACY.md`](../extension/PRIVACY.md) changes.
- **Icons:** Copy from `../extension/.output/chrome-mv3/icon/` into `public/icon/` after rebuilding the extension.
