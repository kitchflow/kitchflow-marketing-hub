import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import { mockPosts } from "@/lib/blog-data";
import type { Post } from "@/types";
import { BlogList } from "@/components/blog/BlogList";
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

function BlogIndex() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    let mounted = true;
    client
      .fetch<Post[]>(allPostsQuery)
      .then((data) => {
        if (mounted && data && data.length > 0) setPosts(data);
      })
      .catch((err) => console.warn("Sanity fetch failed, using mock posts", err));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("blog.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        <BlogList posts={posts} />
      </div>
    </section>
  );
}
