import { initPlatform } from '@/lib/apply';
import { syncGmailContentWidthLayout } from '@/lib/gmail-content-width';
import { syncGmailFloatingCompose } from '@/lib/gmail-floating-compose';
import { syncGmailTopRightIcons } from '@/lib/gmail-top-right-icons';

export default defineContentScript({
  matches: ['https://mail.google.com/*'],
  runAt: 'document_idle',
  async main(ctx) {
    await initPlatform('gmail', ctx, {
      afterApply: async (settings) => {
        syncGmailContentWidthLayout(settings);
        await syncGmailTopRightIcons(settings);
        await syncGmailFloatingCompose(settings);
      },
    });
  },
});
