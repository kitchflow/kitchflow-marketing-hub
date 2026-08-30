import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import { mockPostsForLanguage } from "@/lib/blog-data";
import { resolveLang } from "@/lib/i18n";
import type { Post } from "@/types";
import { BlogList } from "@/components/blog/BlogList";
import { BlogListSkeleton } from "@/components/blog/BlogListSkeleton";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Kitchen Insights | KitchFlow Blog";
const DESCRIPTION =
  "Tips, guides, and stories for food business operators — inventory, waste, staff, and kitchen operations.";
const URL = `${SITE_URL}/blog`;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: BlogIndex,
});

const postsForLang = (items: Post[], lang: ReturnType<typeof resolveLang>) =>
  items.filter((post) => post.language === lang);

function BlogIndex() {
  const { t, i18n } = useTranslation();
  const lang = resolveLang(i18n.resolvedLanguage ?? i18n.language);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let mounted = true;
    setPosts(null);
    client
      .fetch<Post[]>(allPostsQuery, { lang })
      .then((data) => {
        if (!mounted) return;
        const localized = postsForLang(data ?? [], lang);
        setPosts(localized.length > 0 ? localized : mockPostsForLanguage(lang));
      })
      .catch((err) => {
        console.warn("Sanity fetch failed, using mock posts", err);
        if (!mounted) return;
        setPosts(mockPostsForLanguage(lang));
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("blog.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        {posts === null ? <BlogListSkeleton /> : <BlogList key={lang} posts={posts} />}
      </div>
    </section>
  );
}
