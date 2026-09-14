# mnml-pages

Static marketing site and privacy policy for the [mnml](https://github.com/cteerakit/mnml) Chrome extension. Plain HTML and CSS — no build step.

Part of the [mnml monorepo](../..).

Live site: [https://cteerakit.github.io/mnml/](https://cteerakit.github.io/mnml/)

## Pages

| File | URL |
|------|-----|
| `index.html` | `/mnml/` |
| `privacy/index.html` | `/mnml/privacy/` |

## Development

From the repo root:

```bash
pnpm dev:web
```

Open [http://localhost:4321/](http://localhost:4321/).

Or use any static file server in this directory.

## Deploy

Pushes to `main` that touch `apps/web/` run [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml). No build step — GitHub Pages serves the files as-is.

One-time: repo **Settings → Pages → Source: GitHub Actions**.

## Content maintenance

- **Features:** Update the Gmail and YouTube lists in [`index.html`](index.html) when toggles change in the extension.
- **Privacy:** Update [`privacy/index.html`](privacy/index.html) and keep in sync with [`../extension/PRIVACY.md`](../extension/PRIVACY.md).
- **Icons:** Copy from `../extension/.output/chrome-mv3/icon/` into `icon/` after rebuilding the extension.
