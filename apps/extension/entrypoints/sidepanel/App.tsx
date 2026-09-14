import {
  Calendar,
  LayoutGrid,
  Mail,
  Settings2,
  Share2,
  Users,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { GeneralView } from './views/GeneralView';
import { GmailView } from './views/GmailView';
import { PlatformView, YOUTUBE_TOGGLES } from './views/PlatformView';

type NavId = 'general' | 'gmail' | 'youtube';

type NavItem = {
  id: NavId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  soon?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'gmail', label: 'Gmail', icon: Mail },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
];

const COMING_SOON = [
  { label: 'Calendar', icon: Calendar },
  { label: 'X', icon: Share2 },
  { label: 'Facebook', icon: Users },
];

function App() {
  const [active, setActive] = useState<NavId>('general');

  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="flex w-52 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex flex-col gap-1 border-b border-sidebar-border px-4 py-5">
          <div className="flex items-center gap-2">
            <LayoutGrid className="size-4 text-sidebar-foreground" />
            <span className="text-sm font-semibold tracking-tight">mnml</span>
          </div>
          <p className="text-xs text-muted-foreground">Minimal web UI</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60',
                )}
              >
                <Icon className="size-4 shrink-0 opacity-80" />
                {item.label}
              </button>
            );
          })}

          <Separator className="my-2" />

          <p className="px-3 py-1 text-xs font-medium text-muted-foreground">
            Coming soon
          </p>
          {COMING_SOON.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-60"
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  Soon
                </Badge>
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <ScrollArea className="h-screen">
          {active === 'general' && <GeneralView />}
          {active === 'gmail' && <GmailView />}
          {active === 'youtube' && (
            <PlatformView
              platform="youtube"
              title="YouTube"
              subtitle="Hide feeds, Shorts, comments, and other distractions."
              toggles={YOUTUBE_TOGGLES}
            />
          )}
        </ScrollArea>
      </main>
    </div>
  );
}

export default App;
