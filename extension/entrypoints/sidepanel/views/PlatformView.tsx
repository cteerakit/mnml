import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
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
        <Alert>
          <AlertDescription>
            mnml is disabled. Enable it under General to apply these hides.
          </AlertDescription>
        </Alert>
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
      'Hide Inbox, labels, and other items in the left sidebar. The main menu button stays subdued until you hover or focus it. Sidebar items appear when you hover the sidebar, the main menu button, or move focus into either. Compose stays visible unless floating Compose is on.',
  },
  {
    key: 'floatingCompose',
    label: 'Move Compose to floating button',
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
    label: 'Show minimal search bar',
    description:
      'Show a compact centered search field that stays subdued until you hover or focus it. Expands to reveal the options icon and placeholder.',
  },
  {
    key: 'topRightIcons',
    label: 'Hide top-right menu icons',
    description:
      'Hide Support, Settings, Studio, Gemini, and Google apps. Your account avatar stays visible. The other icons appear when you hover or tab into that corner.',
  },
  {
    key: 'footer',
    label: 'Hide footer links',
    description: 'Hide Gmail footer links and promos.',
  },
];

export const YOUTUBE_TOGGLES: YoutubeToggleDef[] = [
  {
    key: 'leftSidebar',
    label: 'Hide left sidebar until hover',
    description:
      'Collapse the mini guide and reclaim horizontal space. Hover the left edge or Guide (hamburger) button to reveal navigation. A pinned full guide still opens normally.',
  },
  {
    key: 'createButton',
    label: 'Hide Create button',
    description: 'Hide the Create upload button in the top bar.',
  },
  {
    key: 'notificationButton',
    label: 'Hide notifications button',
    description: 'Hide the notifications bell in the top bar.',
  },
  {
    key: 'voiceSearch',
    label: 'Hide voice search button',
    description: 'Hide the microphone button next to the search field.',
  },
  {
    key: 'logo',
    label: 'Hide YouTube / Premium logo',
    description: 'Hide the YouTube or YouTube Premium logo in the header.',
  },
  {
    key: 'searchChips',
    label: 'Hide search chips',
    description: 'Hide the category filter chips below the search bar on the home feed.',
  },
  {
    key: 'shorts',
    label: 'Hide Shorts',
    description: 'Hide Shorts shelves and navigation entries.',
  },
  {
    key: 'comments',
    label: 'Hide comments',
    description: 'Hide the comment section on watch pages.',
  },
  {
    key: 'related',
    label: 'Hide related videos',
    description: 'Hide the right-hand suggestions column.',
  },
  {
    key: 'endScreen',
    label: 'Hide end screens',
    description: 'Hide end-screen overlays and cards in the player.',
  },
];
