import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import { resolveLang } from "@/lib/i18n";
import type { Post } from "@/types";
import { BlogList } from "@/components/blog/BlogList";
import { SITE_URL, DEFAULT_OG_IMAGE, socialMetaTags } from "@/lib/seo";

const TITLE = "Kitchen Insights | KitchFlow Blog";
const SOCIAL_TITLE = "Kitchen Insights";
const DESCRIPTION =
  "Tips and guides for cafe and kitchen operators: inventory, waste, staffing, and day-to-day ops.";
const URL = `${SITE_URL}/blog`;

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    // Default English for crawlers / first paint; language switcher refetches client-side.
    try {
      const posts = await client.fetch<Post[]>(allPostsQuery, { lang: "en" });
      return { posts: posts ?? [] };
    } catch {
      return { posts: [] as Post[] };
    }
  },
  head: () => ({
    meta: socialMetaTags({
      documentTitle: TITLE,
      socialTitle: SOCIAL_TITLE,
      description: DESCRIPTION,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "KitchFlow blog — kitchen operations insights",
      type: "website",
    }),
    links: [
      { rel: "canonical", href: URL },
      { rel: "alternate", type: "application/rss+xml", href: `${SITE_URL}/blog/feed.xml` },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { t, i18n } = useTranslation();
  const lang = resolveLang(i18n.resolvedLanguage ?? i18n.language);
  const { posts: initialPosts } = Route.useLoaderData();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    let mounted = true;
    if (lang === "en") {
      setPosts(initialPosts);
      return;
    }
    client
      .fetch<Post[]>(allPostsQuery, { lang })
      .then((data) => {
        if (mounted) setPosts(data ?? []);
      })
      .catch(() => {
        if (mounted) setPosts([]);
      });
    return () => {
      mounted = false;
    };
  }, [lang, initialPosts]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("blog.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        <BlogList key={lang} posts={posts} />
      </div>
    </section>
  );
}
