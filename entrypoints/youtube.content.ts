import { initPlatform } from '@/lib/apply';

export default defineContentScript({
  matches: ['https://www.youtube.com/*'],
  runAt: 'document_idle',
  async main() {
    await initPlatform('youtube');
  },
});
