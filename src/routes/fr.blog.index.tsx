import { createFileRoute } from "@tanstack/react-router";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import type { Post } from "@/types";
import { BlogHubPage } from "@/components/blog/BlogHubPage";
import { DEFAULT_OG_IMAGE, socialMetaTags } from "@/lib/seo";
import { blogHubAbsoluteUrl, blogHubAlternateLinks, HUB_META } from "@/lib/locale-path";

const LANG = "fr" as const;
const meta = HUB_META[LANG];
const URL = blogHubAbsoluteUrl(LANG);

export const Route = createFileRoute("/fr/blog/")({
  loader: async () => {
    try {
      const posts = await client.fetch<Post[]>(allPostsQuery, { lang: LANG });
      return { posts: posts ?? [] };
    } catch {
      return { posts: [] as Post[] };
    }
  },
  head: () => ({
    meta: socialMetaTags({
      documentTitle: meta.documentTitle,
      socialTitle: meta.socialTitle,
      description: meta.description,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: meta.imageAlt,
      type: "website",
      locale: meta.locale,
    }),
    links: [{ rel: "canonical", href: URL }, ...blogHubAlternateLinks()],
  }),
  component: FrenchBlogIndex,
});

function FrenchBlogIndex() {
  const { posts } = Route.useLoaderData();
  return <BlogHubPage lang={LANG} posts={posts} />;
}
