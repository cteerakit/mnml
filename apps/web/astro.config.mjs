// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

const site = process.env.SITE ?? 'https://cteerakit.github.io';

// https://astro.build/config
export default defineConfig({
  site,
  // GitHub Pages project site: https://cteerakit.github.io/mnml/
  base: '/mnml',
  output: 'static',
  vite: {
    resolve: {
      // Required when Vite 8 is hoisted from the extension workspace: @tailwindcss/vite
      // spreads resolve options and Vite 8 rejects configs without `tsconfigPaths`.
      tsconfigPaths: true,
    },
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});