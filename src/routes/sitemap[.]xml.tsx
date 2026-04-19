import { createFileRoute } from "@tanstack/react-router";
import { client } from "@/lib/sanity";
import { mockPosts } from "@/lib/blog-data";
import type { Post } from "@/types";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let posts: Post[] = [];
        try {
          const data = await client.fetch<Post[]>(
            `*[_type == "post"]{ slug, publishedAt }`,
          );
          posts = data && data.length > 0 ? data : mockPosts;
        } catch {
          posts = mockPosts;
        }

        const staticPaths = [
          { loc: `${SITE_URL}/`, priority: "1.0", changefreq: "weekly" },
          { loc: `${SITE_URL}/blog`, priority: "0.8", changefreq: "weekly" },
          { loc: `${SITE_URL}/contact`, priority: "0.6", changefreq: "monthly" },
        ];

        const postUrls = posts.map((p) => ({
          loc: `${SITE_URL}/blog/${p.slug.current}`,
          lastmod: p.publishedAt
            ? new Date(p.publishedAt).toISOString()
            : new Date().toISOString(),
          priority: "0.7",
          changefreq: "monthly",
        }));

        const urls = [
          ...staticPaths.map(
            (s) =>
              `  <url>\n    <loc>${s.loc}</loc>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority}</priority>\n  </url>`,
          ),
          ...postUrls.map(
            (p) =>
              `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
          ),
        ].join("\n");

        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
