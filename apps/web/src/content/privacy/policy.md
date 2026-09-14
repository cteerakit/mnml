---
title: Privacy Policy for mnml
description: How the mnml Chrome extension handles your data—local settings only, no analytics, no developer servers.
lastUpdated: May 25, 2026
---

**Last updated:** May 25, 2026

This privacy policy describes how the **mnml** browser extension ("mnml", "the extension", "we") handles information when you install and use it. mnml is developed by the publisher listed on the [Chrome Web Store](https://chrome.google.com/webstore) listing for this extension.

mnml is **not** affiliated with, endorsed by, or sponsored by Google. Gmail and YouTube are trademarks of Google LLC.

## Summary

- mnml only runs on **Gmail** (`mail.google.com`) and **YouTube** (`youtube.com`).
- We **do not** read your email, messages, watch history, or page content for storage or transmission to the developer.
- We **do not** sell data or use advertising or analytics SDKs.
- We **do not** send data to servers operated by the mnml developer.
- The extension stores **your settings** (which UI hides are on or off) using Chrome’s extension storage APIs, which may sync through your Google account when Chrome Sync is enabled.

## What data we collect

mnml collects only **configuration data** you set in the extension:

| Data | Examples | Purpose |
|------|----------|---------|
| Global preference | Whether mnml is enabled | Turn all hides on or off |
| Gmail preferences | Toggle states (e.g. hide logo, minimal search bar, content width) | Apply your chosen Gmail layout |
| YouTube preferences | Toggle states (e.g. hide Shorts, hide sidebar until hover) | Apply your chosen YouTube layout |

We do **not** collect:

- Email content, subjects, senders, or attachments
- YouTube watch history, subscriptions, comments you write, or recommendations
- Passwords, payment information, or government identifiers
- General browsing history outside the host sites listed above
- Precise location, contacts, or microphone/camera data

## How data is stored and processed

### On your device

Settings are stored with the Chrome extension API `chrome.storage.sync` under the key `mnml_settings`. Chrome may also keep a local copy as part of normal extension storage behavior.

### Sync via Google (Chrome Sync)

If you are signed into Chrome and have **Chrome Sync** turned on, Google may sync your extension settings across your signed-in devices according to [Google’s privacy policy](https://policies.google.com/privacy). That sync is provided by **Google**, not by the mnml developer. We do not operate a separate cloud account or backend for your settings.

### What happens on Gmail and YouTube

To apply your choices, mnml injects CSS and scripts **only** on:

- `https://mail.google.com/*`
- `https://www.youtube.com/*`

Those scripts read the current page’s structure (DOM) in your browser to show or hide UI elements. That processing happens **locally in your browser** and is not uploaded to the mnml developer.

## Third-party services

mnml does **not** embed third-party analytics, advertising, crash reporting, or authentication services controlled by the developer.

The extension relies on:

- **Google Chrome** (extension platform, storage, side panel)
- **Gmail and YouTube** (websites where mnml runs)

Use of those products is governed by Google’s terms and policies.

## Data sharing

We **do not** sell, rent, or trade your data.

We **do not** share your settings with other companies or individuals except as described above (local processing on your device and optional sync through Google Chrome when you use Chrome Sync).

## Data retention and deletion

Settings remain until you change them, disable the extension, remove the extension, or clear extension data.

You can delete mnml’s stored data by:

1. Turning off **Enable mnml** in the side panel (stops applying hides; settings remain stored), or
2. Removing mnml from `chrome://extensions`, or
3. Clearing site/extension data for mnml in Chrome settings, or
4. Disabling or signing out of Chrome Sync (affects synced copies on other devices per Google’s behavior)

Uninstalling the extension removes its local data from that browser profile.

## Children’s privacy

mnml is not directed at children under 13, and we do not knowingly collect personal information from children.

## Security

Because settings stay in Chrome’s extension storage (and optionally Google’s sync infrastructure), security depends on your device and Google account protections. Keep your OS and browser updated and use a strong Google account password if you use Chrome Sync.

## Changes to this policy

We may update this policy when mnml’s behavior or legal requirements change. The **Last updated** date at the top will change when we do. Continued use of the extension after an update means you accept the revised policy. For material changes, we may also update the Chrome Web Store listing description.

## Your rights

Depending on where you live, you may have rights to access, correct, or delete personal data. For mnml, your settings are under your control via the extension UI and Chrome as described in **Data retention and deletion**. Contact us if you need help exercising those rights.

## Contact

For privacy questions or requests about mnml, contact the developer using the **support email** shown on the Chrome Web Store listing for mnml.

If the source code is published in a public repository, you may also report privacy concerns through that repository’s issue tracker.
