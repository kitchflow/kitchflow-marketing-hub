import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { client } from "@/lib/sanity";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published KitchFlow blog posts with title, slug, excerpt, category and publish date.",
  inputSchema: {
    language: z
      .enum(["en", "fr", "ar"])
      .default("en")
      .describe("Language of the posts to list."),
    limit: z.number().int().default(20).describe("Maximum number of posts to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ language, limit }) => {
    const max = Math.min(Math.max(limit ?? 20, 1), 50);
    const posts = await client.fetch<
      Array<{
        title: string;
        slug: string;
        excerpt?: string;
        category?: string;
        publishedAt?: string;
        readTime?: number;
      }>
    >(
      `*[_type == "post" && language == $lang] | order(publishedAt desc)[0...$max]{
        title, "slug": slug.current, excerpt, category, publishedAt, readTime
      }`,
      { lang: language ?? "en", max },
    );

    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
      structuredContent: { posts },
    };
  },
});
