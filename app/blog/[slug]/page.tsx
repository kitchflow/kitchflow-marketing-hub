import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostView } from '@/components/blog/BlogPostView'
import { BlogPostJsonLd } from '@/components/seo/JsonLd'
import { urlFor } from '@/lib/sanity'
import { getPostBySlug, getRelatedPosts, getAllBlogSlugs, loadPostWithSource } from '@/lib/posts'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Article | KitchFlow',
      description: 'Read more from the KitchFlow blog.',
      alternates: { canonical: `https://kitchflowapp.com/blog/${params.slug}` },
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `https://kitchflowapp.com/blog/${params.slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `https://kitchflowapp.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).height(630).auto('format').url() }]
        : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const loaded = await loadPostWithSource(params.slug)
  if (!loaded) notFound()

  const { post, source } = loaded
  const related = await getRelatedPosts(params.slug, post, source)
  const usingMock = source === 'mock'

  return (
    <>
      <BlogPostJsonLd post={post} />
      <BlogPostView post={post} related={related} usingMock={usingMock} />
    </>
  )
}
