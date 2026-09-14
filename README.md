# mnml

Monorepo for **mnml** — a Chrome extension that hides distracting UI on Gmail, YouTube, and more — plus its marketing site and privacy policy.

| Package | Path | Description |
|---------|------|-------------|
| Extension | [`apps/extension`](apps/extension) | WXT + React Chrome extension |
| Web | [`apps/web`](apps/web) | Astro marketing site (GitHub Pages) |

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

**Marketing site** ([http://localhost:4321/mnml/](http://localhost:4321/mnml/)):

```bash
pnpm dev:web
```

The site uses `base: '/mnml'` so local URLs match GitHub Pages (`https://cteerakit.github.io/mnml/`).

## Build

```bash
pnpm build          # extension
pnpm zip              # extension zip for store upload
pnpm build:web        # static site → apps/web/dist
pnpm preview:web      # preview built site
pnpm compile          # extension TypeScript check
```

## Privacy policy

The public privacy policy lives at [https://cteerakit.github.io/mnml/privacy](https://cteerakit.github.io/mnml/privacy). Source: [`apps/web/src/content/privacy/policy.md`](apps/web/src/content/privacy/policy.md) (sync with [`apps/extension/PRIVACY.md`](apps/extension/PRIVACY.md)).

## Deploy (GitHub Pages)

Pushes to `main` that touch the site (or this workflow) run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and publish to [https://cteerakit.github.io/mnml/](https://cteerakit.github.io/mnml/).

One-time setup in the GitHub repo:

1. **Settings → Pages → Source:** GitHub Actions
2. Optional: set `SITE` / `PUBLIC_*` as Actions variables if they differ from the workflow defaults (see [`apps/web/.env.example`](apps/web/.env.example))

See [`apps/web/README.md`](apps/web/README.md) for content maintenance and env var details.
