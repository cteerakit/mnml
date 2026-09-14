import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSettings } from '@/hooks/use-settings';

import { ToggleRow } from '../components/ToggleRow';

export function GeneralView() {
  const { settings, loading, setGlobalEnabled } = useSettings();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">General</h1>
        <p className="text-sm text-muted-foreground">
          Control mnml across all supported sites.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Extension</CardTitle>
          <CardDescription>
            Turn off to restore the original UI on every site without losing your
            per-site toggles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleRow
            id="global-enabled"
            label="Enable mnml"
            description="Apply hide rules on Gmail and YouTube."
            checked={settings.global.enabled}
            disabled={loading}
            onCheckedChange={(checked) => void setGlobalEnabled(checked)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
