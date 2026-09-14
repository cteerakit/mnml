# mnml

Monorepo for **mnml** — a Chrome extension that hides distracting UI on Gmail, YouTube, and more — plus its marketing site and privacy policy.

| Package | Path | Description |
|---------|------|-------------|
| Extension | [`apps/extension`](apps/extension) | WXT + React Chrome extension |
| Web | [`apps/web`](apps/web) | Static HTML/CSS marketing site (GitHub Pages) |

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

**Marketing site** ([http://localhost:4321/](http://localhost:4321/)):

```bash
pnpm dev:web
```

## Build

```bash
pnpm build          # extension
pnpm zip              # extension zip for store upload
pnpm compile          # extension TypeScript check
```

The website has no build step — edit HTML/CSS in `apps/web/` directly.

## Privacy policy

The public privacy policy lives at [https://cteerakit.github.io/mnml/privacy/](https://cteerakit.github.io/mnml/privacy/). Source: [`apps/web/privacy/index.html`](apps/web/privacy/index.html) (sync with [`apps/extension/PRIVACY.md`](apps/extension/PRIVACY.md)).

## Deploy (GitHub Pages)

Pushes to `main` that touch `apps/web/` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and publish to [https://cteerakit.github.io/mnml/](https://cteerakit.github.io/mnml/).

One-time setup: **Settings → Pages → Source: GitHub Actions**.

See [`apps/web/README.md`](apps/web/README.md) for content maintenance.
