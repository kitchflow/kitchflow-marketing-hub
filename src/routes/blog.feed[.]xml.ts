import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@sanity/client";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";

const sanity = createClient({
  projectId: "oigasmdp",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

type FeedPost = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  _updatedAt?: string;
};

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

async function buildRssXml() {
  let posts: FeedPost[] = [];
  try {
    posts = await sanity.fetch<FeedPost[]>(
      `*[_type == "post" && !(_id in path("drafts.**")) && language == "en" && defined(slug.current)]
        | order(publishedAt desc)[0...30] {
          title,
          "slug": slug.current,
          excerpt,
          publishedAt,
          _updatedAt
        }`,
    );
  } catch (err) {
    console.warn("rss: Sanity fetch failed", err);
  }

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : undefined;
      const updated = post._updatedAt
        ? new Date(post._updatedAt).toISOString()
        : undefined;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      ${post.excerpt ? `<description>${xmlEscape(post.excerpt)}</description>` : ""}
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      ${updated ? `<atom:updated>${updated}</atom:updated>` : ""}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KitchFlow Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

const rssHeaders = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, max-age=300, s-maxage=3600",
};

export const Route = createFileRoute("/blog/feed.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(await buildRssXml(), {
          headers: rssHeaders,
        }),
      HEAD: async () =>
        new Response(null, {
          headers: rssHeaders,
        }),
    },
  },
});
