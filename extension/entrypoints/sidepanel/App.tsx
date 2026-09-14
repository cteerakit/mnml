import { Mail, Settings2, Youtube } from 'lucide-react';
import { useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { GeneralView } from './views/GeneralView';
import { GmailView } from './views/GmailView';
import { PlatformView, YOUTUBE_TOGGLES } from './views/PlatformView';

type NavId = 'general' | 'gmail' | 'youtube';

type NavItem = {
  id: NavId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'gmail', label: 'Gmail', icon: Mail },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
];

function App() {
  const [active, setActive] = useState<NavId>('general');

  return (
    <Tabs
      value={active}
      onValueChange={(value) => setActive(value as NavId)}
      className="flex h-screen w-full flex-col bg-background"
    >
      <header className="shrink-0 border-b border-border px-3 py-2">
        <TabsList>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger
                key={item.id}
                value={item.id}
                title={item.label}
                className="px-2.5"
              >
                <Icon />
                <span className="sr-only">{item.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </header>

      <TabsContent value="general" className="mt-0 min-h-0 flex-1">
        <ScrollArea className="h-full">
          <GeneralView />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="gmail" className="mt-0 min-h-0 flex-1">
        <ScrollArea className="h-full">
          <GmailView />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="youtube" className="mt-0 min-h-0 flex-1">
        <ScrollArea className="h-full">
          <PlatformView
            platform="youtube"
            title="YouTube"
            subtitle="Hide feeds, Shorts, comments, and other distractions."
            toggles={YOUTUBE_TOGGLES}
          />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}

export default App;
