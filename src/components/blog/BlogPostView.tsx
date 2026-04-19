'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Camera, Copy, Twitter, Linkedin } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { urlFor } from '@/lib/sanity'
import { mockBodyFor } from '@/lib/blog-data'
import type { Post } from '@/types'
import { BlogCard } from '@/components/blog/BlogCard'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { SITE_URL } from '@/lib/seo'

function formatDate(d: string, locale: string) {
  try {
    return new Date(d).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return d
  }
}

type BlogPostViewProps = {
  post: Post
  related: Post[]
  usingMock: boolean
}

export function BlogPostView({ post, related, usingMock }: BlogPostViewProps) {
  const { t, i18n } = useTranslation()
  const slug = post.slug.current
  const [shareUrl, setShareUrl] = useState(`${SITE_URL}/blog/${slug}`)

  useEffect(() => {
    setShareUrl(typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/blog/${slug}`)
  }, [slug])

  const cover = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1600).auto('format').url()
    : null

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied')
    } catch {
      toast.error('Could not copy')
    }
  }

  const mockParagraphs = usingMock ? mockBodyFor(slug) : []

  return (
    <article className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition"
        >
          {t('blog.back')}
        </Link>

        <div className="mt-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary-soft rounded-full px-2.5 py-1">
            {post.category}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">{post.title}</h1>

          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex h-9 w-9 rounded-full bg-muted items-center justify-center font-semibold text-foreground">
              {post.author?.name?.[0] ?? 'K'}
            </span>
            <span className="font-medium text-foreground">{post.author?.name}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt, i18n.language)}</span>
            {post.readTime && (
              <>
                <span>·</span>
                <span>
                  {post.readTime} {t('blog.minRead')}
                </span>
              </>
            )}
          </div>
        </div>

        <div
          className="mt-10 w-full bg-muted rounded-2xl border border-border overflow-hidden"
          style={{ aspectRatio: '16 / 9' }}
        >
          {cover ? (
            <img src={cover} alt={post.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              <Camera className="h-10 w-10" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="mt-12">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <>
              {post.excerpt && (
                <p className="text-xl leading-[1.7] text-foreground/85 font-medium">{post.excerpt}</p>
              )}
              {mockParagraphs.map((p, i) => (
                <p key={i} className="my-5 text-[18px] leading-[1.8] text-foreground/85">
                  {p}
                </p>
              ))}
            </>
          )}
        </div>

        <div className="mt-14 pt-6 border-t border-border flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground mr-2">{t('blog.share')}:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Share on X"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Copy link"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold tracking-tight">{t('blog.related')}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
