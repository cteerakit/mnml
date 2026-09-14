# mnml-pages

Static marketing site and privacy policy for the [mnml](https://github.com/cteerakit/mnml) Chrome extension. Built with [Astro](https://astro.build) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

Part of the [mnml monorepo](../..). Install dependencies from the repo root (`pnpm install`).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Single-page landing (Gmail, YouTube, privacy teaser) |
| `/privacy` | Chrome Web Store privacy policy |

## Development

From the repo root:

```bash
pnpm dev:web
```

Or from this directory:

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

From the repo root:

```bash
pnpm build:web
pnpm preview:web
```

Output is written to `dist/`.

## Environment variables

Copy `.env.example` to `.env` for local builds, and set the same variables in Cloudflare Pages → Settings → Environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE` | Yes (production) | Canonical site URL, e.g. `https://mnml.example` |
| `PUBLIC_CHROME_STORE_URL` | No | Chrome Web Store listing URL for the “Add to Chrome” button |
| `PUBLIC_GITHUB_URL` | No | Optional GitHub link in the footer |

## Deploy to Cloudflare Pages

1. Connect the **mnml** monorepo (not the archived mnml-pages repo).
2. **Build command:** `pnpm --filter mnml-pages build`
3. **Build output directory:** `apps/web/dist`
4. **Node version:** 22 or later (see root `package.json` `engines`)
5. Set `SITE` and `PUBLIC_*` variables for the Production environment.

## Content maintenance

- **Features:** Update [`src/data/features.ts`](src/data/features.ts) when toggles change in the extension ([`PlatformView.tsx`](../extension/entrypoints/sidepanel/views/PlatformView.tsx)).
- **Privacy:** Update [`src/content/privacy/policy.md`](src/content/privacy/policy.md) when [`PRIVACY.md`](../extension/PRIVACY.md) changes.
- **Icons:** Copy from `../extension/.output/chrome-mv3/icon/` into `public/icon/` after rebuilding the extension.
