import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<{ slug?: { current?: string }; publishedAt?: string }[]>(
    `*[_type == "post"]{ slug, publishedAt }`,
  )

  const blogPosts: MetadataRoute.Sitemap = (posts ?? [])
    .map((post) => {
      const slug = post.slug?.current
      if (!slug) return null
      return {
        url: `https://kitchflowapp.com/blog/${slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })
    .filter((e): e is NonNullable<typeof e> => e !== null)

  return [
    {
      url: 'https://kitchflowapp.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://kitchflowapp.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://kitchflowapp.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...blogPosts,
  ]
}
