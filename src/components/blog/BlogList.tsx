'use client'

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Post } from "@/types";
import { BlogCard } from "./BlogCard";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Inventory", "Waste", "Staff", "Operations"] as const;
const PAGE_SIZE = 6;

export function BlogList({ posts }: { posts: Post[] }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.category === filter)),
    [posts, filter],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setPage(0);
            }}
            className={cn(
              "h-9 px-4 rounded-full text-sm font-medium transition-colors border",
              filter === cat
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground/40",
            )}
          >
            {cat === "All" ? t("blog.all") : cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No articles yet.</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-3">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border disabled:opacity-40 hover:bg-muted transition"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 rtl-flip" />
          </button>
          <span className="text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border disabled:opacity-40 hover:bg-muted transition"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 rtl-flip" />
          </button>
        </div>
      )}
    </>
  );
}
