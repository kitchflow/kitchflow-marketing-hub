import type { Metadata } from 'next'
import { BlogList } from '@/components/blog/BlogList'
import { BlogPageHeading } from '@/components/blog/BlogPageHeading'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Kitchen Insights — Blog',
  description:
    'Tips, guides and stories for restaurant managers and kitchen teams. Learn how to reduce waste, manage inventory and run smarter operations.',
  alternates: { canonical: 'https://kitchflowapp.com/blog' },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <BlogPageHeading />

        <BlogList posts={posts} />
      </div>
    </section>
  )
}
