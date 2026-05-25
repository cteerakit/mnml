# AGENTS.md

## Cursor Cloud specific instructions

This is a Chrome extension (Manifest V3) built with WXT, React, TypeScript, and Tailwind CSS v4.

### Key Commands

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Type check (lint) | `pnpm compile` |
| Dev build (hot reload) | `pnpm dev` |
| Production build | `pnpm build` |
| Zip for distribution | `pnpm zip` |

### Development Notes

- **No ESLint or Prettier** — the only lint-like check is `pnpm compile` (`tsc --noEmit`).
- **`pnpm dev`** starts a WXT dev server on `localhost:3000` and outputs the extension to `.output/chrome-mv3-dev/`. It automatically opens a Chromium window with the extension pre-loaded.
- **`pnpm build`** outputs a production build to `.output/chrome-mv3/`. Use this path when manually loading the unpacked extension in `chrome://extensions`.
- **`postinstall` hook** runs `wxt prepare` which generates types into `.wxt/`. This runs automatically with `pnpm install`.
- The extension requires loading as an unpacked extension in Chrome/Chromium (`chrome://extensions` → Developer mode → Load unpacked). There is no standalone web app to test.
- Content scripts inject into `mail.google.com` and `www.youtube.com` — you need these sites accessible to test the content scripts end-to-end.
- CSS selectors in `assets/mnml.css` and `lib/rules.ts` target Google/YouTube DOM and may need updates when those sites change their markup.
