import { Skeleton } from "@/components/ui/skeleton";

const PILL_WIDTHS = ["w-16", "w-24", "w-20", "w-16", "w-28"];
const CARD_COUNT = 6;

export function BlogListSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading articles…</span>

      <div className="mt-10 flex flex-wrap gap-2 justify-center">
        {PILL_WIDTHS.map((width) => (
          <Skeleton key={width} className={`h-9 rounded-full ${width}`} />
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden">
            <Skeleton className="w-full rounded-none" style={{ aspectRatio: "16 / 10" }} />
            <div className="p-6">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="mt-3 h-6 w-full" />
              <Skeleton className="mt-2 h-6 w-3/4" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <div className="mt-5 flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
