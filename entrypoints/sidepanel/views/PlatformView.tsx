import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSettings } from '@/hooks/use-settings';
import type {
  GmailToggleKey,
  PlatformId,
  YoutubeToggleKey,
} from '@/lib/settings';

import { ToggleRow } from '../components/ToggleRow';

type GmailToggleDef = {
  key: GmailToggleKey;
  label: string;
  description: string;
};

type YoutubeToggleDef = {
  key: YoutubeToggleKey;
  label: string;
  description: string;
};

type PlatformViewProps = {
  platform: PlatformId;
  title: string;
  subtitle: string;
  toggles: YoutubeToggleDef[];
};

export function PlatformView({
  platform,
  title,
  subtitle,
  toggles,
}: PlatformViewProps) {
  const { settings, loading, setPlatformToggle } = useSettings();
  const disabled = loading || !settings.global.enabled;
  const platformSettings = settings.platforms[platform];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {!settings.global.enabled && (
        <div className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          mnml is disabled. Enable it under General to apply these hides.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
          <CardDescription>
            Choose which elements to hide on {title}. Changes apply immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {toggles.map((toggle, index) => (
            <div key={toggle.key}>
              {index > 0 && <Separator />}
              <ToggleRow
                id={`${platform}-${toggle.key}`}
                label={toggle.label}
                description={toggle.description}
                checked={platformSettings[toggle.key as keyof typeof platformSettings]}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  void setPlatformToggle(platform, toggle.key, checked)
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export const GMAIL_TOGGLES: GmailToggleDef[] = [
  {
    key: 'logo',
    label: 'Hide Gmail logo',
    description: 'Hide the Gmail logo link in the header.',
  },
  {
    key: 'leftSidebarMenus',
    label: 'Hide left sidebar menus until hover',
    description:
      'Hide Inbox, labels, and other items in the left sidebar. They appear when you hover the sidebar or move focus into it. Compose stays visible unless floating Compose is on.',
  },
  {
    key: 'floatingCompose',
    label: 'Floating Compose button',
    description:
      'Move Compose to a floating icon button in the bottom-right corner and hide it in the left sidebar.',
  },
  {
    key: 'listToolbar',
    label: 'Hide list toolbar until hover',
    description:
      'Hide the Select, Refresh, and action bar above your messages. It appears when you hover that area or tab into it.',
  },
  {
    key: 'sidePanel',
    label: 'Hide side panel (Add-on)',
    description: 'Hide the right add-on side panel and its toggle.',
  },
  {
    key: 'searchBar',
    label: 'Hide search bar',
    description: 'Hide the mail search field in the header.',
  },
  {
    key: 'minimalSearchBar',
    label: 'Minimal search bar',
    description:
      'Show a compact centered search field. Hover to expand and reveal the options icon and placeholder.',
  },
  {
    key: 'topRightIcons',
    label: 'Hide top-right menu icons',
    description:
      'Collapse Support, Settings, Gemini, Google apps, and your account avatar. Use the chevron to expand them.',
  },
  {
    key: 'footer',
    label: 'Footer links',
    description: 'Hide Gmail footer links and promos.',
  },
];

export const YOUTUBE_TOGGLES: YoutubeToggleDef[] = [
  {
    key: 'sidebar',
    label: 'Sidebar',
    description: 'Hide the left guide and navigation drawer.',
  },
  {
    key: 'homeFeed',
    label: 'Home feed',
    description: 'Hide the main video grid on the YouTube homepage.',
  },
  {
    key: 'shorts',
    label: 'Shorts',
    description: 'Hide Shorts shelves and navigation entries.',
  },
  {
    key: 'comments',
    label: 'Comments',
    description: 'Hide the comment section on watch pages.',
  },
  {
    key: 'related',
    label: 'Related videos',
    description: 'Hide the right-hand suggestions column.',
  },
  {
    key: 'endScreen',
    label: 'End screens',
    description: 'Hide end-screen overlays and cards in the player.',
  },
];
