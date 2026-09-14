import { Label } from '@/components/ui/label';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import {
  GMAIL_CONTENT_WIDTHS,
  type GmailContentWidth,
} from '@/lib/settings';

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
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        spacing={0}
        value={value}
        disabled={disabled}
        onValueChange={(next) => {
          if (next) onChange(next as GmailContentWidth);
        }}
        aria-label="Limit main content width"
        className="grid w-full grid-cols-4"
      >
        {GMAIL_CONTENT_WIDTHS.map((width) => (
          <ToggleGroupItem
            key={width}
            value={width}
            className="w-full text-xs"
          >
            {WIDTH_LABELS[width]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
