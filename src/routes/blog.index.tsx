import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import { mockPosts } from "@/lib/blog-data";
import type { Post } from "@/types";
import { BlogList } from "@/components/blog/BlogList";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Kitchen Insights | KitchFlow" },
      {
        name: "description",
        content:
          "Tips, guides, and stories for restaurant operators. Inventory, waste, staff, and operations.",
      },
      { property: "og:title", content: "Kitchen Insights — KitchFlow Blog" },
      {
        property: "og:description",
        content: "Practical advice for running a tighter, smarter kitchen.",
      },
    ],
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
