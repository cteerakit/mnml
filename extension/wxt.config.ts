import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'mnml',
    description: 'Hide distracting UI on Gmail, YouTube, and more.',
    permissions: ['storage', 'sidePanel'],
    action: {},
    host_permissions: [
      'https://mail.google.com/*',
      'https://www.youtube.com/*',
    ],
  },
});
