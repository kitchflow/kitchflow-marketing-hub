import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  className?: string;
  ratio?: string; // e.g. "16 / 9"
  label?: string;
}

export function PlaceholderImage({
  className,
  ratio = "16 / 9",
  label,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-muted border border-border rounded-2xl overflow-hidden flex items-center justify-center text-muted-foreground",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div className="flex flex-col items-center gap-2">
        <Camera className="h-8 w-8" strokeWidth={1.5} />
        {label && <span className="text-xs font-medium">{label}</span>}
      </div>
    </div>
  );
}
