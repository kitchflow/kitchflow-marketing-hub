import { Link } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import type { Post } from "@/types";
import { urlFor } from "@/lib/sanity";
import { useTranslation } from "react-i18next";

function formatDate(d: string, locale: string) {
  try {
    return new Date(d).toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export function BlogCard({ post }: { post: Post }) {
  const { i18n, t } = useTranslation();
  const img = post.coverImage?.asset
    ? urlFor(post.coverImage).width(800).height(500).fit("crop").auto("format").url()
    : null;

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug.current }}
      className="group block rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative w-full bg-muted overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        {img ? (
          <img
            src={img}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            <Camera className="h-8 w-8" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary-soft rounded-full px-2.5 py-1">
          {post.category}
        </span>
        <h3 className="mt-3 text-xl font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex h-7 w-7 rounded-full bg-muted items-center justify-center font-semibold text-foreground">
            {post.author?.name?.[0] ?? "K"}
          </span>
          <span className="font-medium text-foreground">{post.author?.name}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt, i18n.language)}</span>
          {post.readTime && (
            <>
              <span>·</span>
              <span>
                {post.readTime} {t("blog.minRead")}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
