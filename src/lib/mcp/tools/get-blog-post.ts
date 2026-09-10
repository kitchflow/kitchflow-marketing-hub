import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { client } from "@/lib/sanity";
import { SITE_URL } from "@/lib/seo";

type Block = { _type?: string; children?: Array<{ text?: string }> };

function toPlainText(body: Block[] | undefined): string {
  if (!body) return "";
  return body
    .filter((block) => block._type === "block")
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join("\n\n");
}

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Read the full text of one published KitchFlow blog post by its slug.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Post slug, e.g. reduce-coffee-shop-waste"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const post = await client.fetch<{
      title: string;
      excerpt?: string;
      category?: string;
      publishedAt?: string;
      language?: string;
      body?: Block[];
      author?: { name?: string };
    } | null>(
      `*[_type == "post" && slug.current == $slug][0]{
        title, excerpt, category, publishedAt, language, body, author->{name}
      }`,
      { slug },
    );

    if (!post) throw new ToolError(`No blog post found with slug "${slug}".`);

    const result = {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: post.publishedAt,
      language: post.language,
      author: post.author?.name,
      url: `${SITE_URL}/blog/${slug}`,
      content: toPlainText(post.body),
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
