import { client } from "@/lib/sanity";
import { allPostsQuery, postBySlugQuery, relatedPostsQuery } from "@/lib/queries";
import { mockPosts } from "@/lib/blog-data";
import type { Post } from "@/types";

export async function getAllPosts(): Promise<Post[]> {
  try {
    const data = await client.fetch<Post[]>(allPostsQuery);
    if (data && data.length > 0) return data;
  } catch (err) {
    console.warn("Sanity fetch failed, using mock posts", err);
  }
  return mockPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data = await client.fetch<Post | null>(postBySlugQuery, { slug });
    if (data) return data;
  } catch {
    // ignore — fall through to mock
  }
  return mockPosts.find((p) => p.slug.current === slug) ?? null;
}

export type PostSource = "sanity" | "mock";

export async function loadPostWithSource(
  slug: string,
): Promise<{ post: Post; source: PostSource } | null> {
  try {
    const data = await client.fetch<Post | null>(postBySlugQuery, { slug });
    if (data) return { post: data, source: "sanity" };
  } catch {
    // ignore
  }
  const mock = mockPosts.find((p) => p.slug.current === slug) ?? null;
  if (mock) return { post: mock, source: "mock" };
  return null;
}

export async function getRelatedPosts(
  slug: string,
  post: Post,
  source: PostSource,
): Promise<Post[]> {
  if (source === "sanity") {
    try {
      const rel = await client.fetch<Post[]>(relatedPostsQuery, {
        slug,
        category: post.category,
      });
      return rel ?? [];
    } catch {
      return [];
    }
  }
  return mockPosts
    .filter((p) => p.category === post.category && p.slug.current !== slug)
    .slice(0, 2);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const fromMock = mockPosts.map((p) => p.slug.current);
  try {
    const rows = await client.fetch<{ slug?: { current?: string } }[]>(
      `*[_type == "post"]{ slug }`,
    );
    const fromSanity = (rows ?? [])
      .map((r) => r.slug?.current)
      .filter((s): s is string => Boolean(s));
    const merged = [...fromMock, ...fromSanity]
    const unique: string[] = []
    for (const s of merged) {
      if (!unique.includes(s)) unique.push(s)
    }
    return unique
  } catch {
    return fromMock;
  }
}
