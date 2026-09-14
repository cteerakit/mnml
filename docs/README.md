# mnml site

Static marketing site and privacy policy for the [mnml](https://github.com/cteerakit/mnml) Chrome extension. Plain HTML and CSS.

Live site: [https://mnml.teerakit.com/](https://mnml.teerakit.com/)

## Pages

| File | URL |
|------|-----|
| `index.html` | `/` |
| `privacy/index.html` | `/privacy/` |

## Development

From the repo root:

```bash
pnpm dev:web
```

Open [http://localhost:4321/](http://localhost:4321/).

## Deploy (GitHub Pages)

In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**

- **Branch:** `main`
- **Folder:** `/docs`

No build step. Push changes under `docs/` to publish.

## Content maintenance

- **Features:** Update the Gmail and YouTube lists in [`index.html`](index.html).
- **Privacy:** Update [`privacy/index.html`](privacy/index.html) and keep in sync with [`../extension/PRIVACY.md`](../extension/PRIVACY.md).
- **Icons:** Copy from `../extension/.output/chrome-mv3/icon/` into `icon/` after rebuilding the extension.
