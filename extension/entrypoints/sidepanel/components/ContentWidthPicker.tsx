import { Label } from '@/components/ui/label';
import {
  GMAIL_CONTENT_WIDTHS,
  type GmailContentWidth,
} from '@/lib/settings';
import { cn } from '@/lib/utils';

const WIDTH_LABELS: Record<GmailContentWidth, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  'full-width': 'Full',
};

type ContentWidthPickerProps = {
  value: GmailContentWidth;
  disabled?: boolean;
  onChange: (value: GmailContentWidth) => void;
};

export function ContentWidthPicker({
  value,
  disabled,
  onChange,
}: ContentWidthPickerProps) {
  return (
    <div className="flex flex-col gap-2 py-3">
      <Label className="text-sm font-medium">Limit main content width</Label>
      <p className="text-xs text-muted-foreground">
        Limit how wide the inbox and reading pane can grow. Full uses Gmail&apos;s
        default layout.
      </p>
      <div
        className="grid grid-cols-4 gap-1 rounded-lg border bg-muted/40 p-1"
        role="radiogroup"
        aria-label="Limit main content width"
      >
        {GMAIL_CONTENT_WIDTHS.map((width) => {
          const selected = value === width;
          return (
            <button
              key={width}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(width)}
              className={cn(
                'rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
                selected
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
                disabled && 'pointer-events-none opacity-50',
              )}
            >
              {WIDTH_LABELS[width]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
