import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Leaf className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">KitchFlow</span>
    </span>
  );
}
