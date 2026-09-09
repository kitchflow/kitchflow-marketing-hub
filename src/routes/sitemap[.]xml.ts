import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@sanity/client";
import { SITE_URL } from "@/lib/seo";

const sanity = createClient({
  projectId: "oigasmdp",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

type SitemapPost = {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
};

const STATIC_PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
];

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toDate = (value?: string) => {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
};

const urlEntry = (loc: string, opts?: { lastmod?: string; changefreq?: string; priority?: string }) => {
  const lines = [`  <url>`, `    <loc>${xmlEscape(loc)}</loc>`];
  if (opts?.lastmod) lines.push(`    <lastmod>${opts.lastmod}</lastmod>`);
  if (opts?.changefreq) lines.push(`    <changefreq>${opts.changefreq}</changefreq>`);
  if (opts?.priority) lines.push(`    <priority>${opts.priority}</priority>`);
  lines.push(`  </url>`);
  return lines.join("\n");
};

async function buildSitemapXml() {
  let posts: SitemapPost[] = [];
  try {
    posts = await sanity.fetch<SitemapPost[]>(
      `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]
        | order(publishedAt desc) {
          "slug": slug.current,
          publishedAt,
          _updatedAt
        }`,
    );
  } catch (err) {
    console.warn("sitemap: Sanity fetch failed, serving static pages only", err);
  }

  const staticEntries = STATIC_PAGES.map((page) =>
    urlEntry(`${SITE_URL}${page.path === "/" ? "" : page.path}`, {
      changefreq: page.changefreq,
      priority: page.priority,
    }),
  );

  const postEntries = posts.map((post) =>
    urlEntry(`${SITE_URL}/blog/${post.slug}`, {
      lastmod: toDate(post._updatedAt) ?? toDate(post.publishedAt),
      changefreq: "monthly",
      priority: "0.7",
    }),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...postEntries].join("\n")}
</urlset>
`;
}

const sitemapHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=300, s-maxage=3600",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(await buildSitemapXml(), {
          headers: sitemapHeaders,
        }),
      HEAD: async () =>
        new Response(null, {
          headers: sitemapHeaders,
        }),
    },
  },
});
