# mnml

Monorepo for **mnml** — a Chrome extension that hides distracting UI on Gmail, YouTube, and more — plus its marketing site and privacy policy.

| Package | Path | Description |
|---------|------|-------------|
| Extension | [`apps/extension`](apps/extension) | WXT + React Chrome extension |
| Web | [`apps/web`](apps/web) | Astro marketing site (Cloudflare Pages) |

## Setup

From the repo root:

```bash
pnpm install
```

## Development

**Extension** (loads from `apps/extension/.output/chrome-mv3`):

```bash
pnpm dev
```

**Marketing site** ([http://localhost:4321](http://localhost:4321)):

```bash
pnpm dev:web
```

## Build

```bash
pnpm build          # extension
pnpm zip              # extension zip for store upload
pnpm build:web        # static site → apps/web/dist
pnpm preview:web      # preview built site
pnpm compile          # extension TypeScript check
```

## Privacy policy

The public privacy policy lives at [https://mnml.pages.dev/privacy](https://mnml.pages.dev/privacy). Source: [`apps/web/src/content/privacy/policy.md`](apps/web/src/content/privacy/policy.md) (sync with [`apps/extension/PRIVACY.md`](apps/extension/PRIVACY.md)).

## Deploy (Cloudflare Pages)

Point the Pages project at this repository:

- **Build command:** `pnpm --filter mnml-pages build`
- **Build output directory:** `apps/web/dist`
- **Node version:** 22 or later
- Set `SITE` and `PUBLIC_*` env vars (see [`apps/web/.env.example`](apps/web/.env.example))

See [`apps/web/README.md`](apps/web/README.md) for content maintenance and env var details.
