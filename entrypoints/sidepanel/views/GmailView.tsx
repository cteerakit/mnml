import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSettings } from '@/hooks/use-settings';

import { ContentWidthPicker } from '../components/ContentWidthPicker';
import { ToggleRow } from '../components/ToggleRow';
import { GMAIL_TOGGLES } from './PlatformView';

export function GmailView() {
  const { settings, loading, setPlatformToggle, setGmailContentWidth } =
    useSettings();
  const disabled = loading || !settings.global.enabled;
  const gmail = settings.platforms.gmail;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">Gmail</h1>
        <p className="text-sm text-muted-foreground">
          Hide distracting panels and chrome in Gmail.
        </p>
      </div>

      {!settings.global.enabled && (
        <div className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          mnml is disabled. Enable it under General to apply these options.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>
            Adjust how much horizontal space the main Gmail area uses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContentWidthPicker
            value={gmail.contentWidth}
            disabled={disabled}
            onChange={(width) => void setGmailContentWidth(width)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
          <CardDescription>
            Choose which elements to hide on Gmail. Changes apply immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {GMAIL_TOGGLES.map((toggle, index) => (
            <div key={toggle.key}>
              {index > 0 && <Separator />}
              <ToggleRow
                id={`gmail-${toggle.key}`}
                label={toggle.label}
                description={toggle.description}
                checked={gmail[toggle.key]}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  void setPlatformToggle('gmail', toggle.key, checked)
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
