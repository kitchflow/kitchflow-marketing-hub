import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/kitchflow-logo.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 object-contain"
        decoding="async"
      />
      <span className="font-display text-lg font-bold tracking-tight">KitchFlow</span>
    </span>
  );
}
