// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

const site = process.env.SITE ?? 'https://mnml.pages.dev';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});