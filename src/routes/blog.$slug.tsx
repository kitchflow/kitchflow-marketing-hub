import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Camera, Copy, Twitter, Linkedin } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { client, urlFor } from "@/lib/sanity";
import { postBySlugQuery, postTranslationsQuery, relatedPostsQuery } from "@/lib/queries";
import { useBlogTranslations } from "@/contexts/blog-translation";
import type { Post, PostTranslation } from "@/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  APP_STORE_URL,
  socialMetaTags,
} from "@/lib/seo";

type LoaderData = {
  post: Post;
  related: Post[];
  alternates: PostTranslation[];
  title: string;
  socialTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
  publishedAt: string;
  modifiedAt: string;
  authorName: string;
  locale: string;
};

const LOCALE_BY_LANG: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_AR",
};

function ogImageUrl(coverImage: Post["coverImage"]): string | null {
  if (!coverImage?.asset) return null;
  return urlFor(coverImage)
    .width(OG_IMAGE_WIDTH)
    .height(OG_IMAGE_HEIGHT)
    .fit("crop")
    .format("jpg")
    .quality(80)
    .url();
}

async function loadPost(slug: string): Promise<Post | null> {
  try {
    return (await client.fetch<Post | null>(postBySlugQuery, { slug })) ?? null;
  } catch {
    return null;
  }
}

async function loadTranslations(post: Post): Promise<PostTranslation[]> {
  if (!post.translationKey) return [];
  try {
    return (
      (await client.fetch<PostTranslation[]>(postTranslationsQuery, {
        translationKey: post.translationKey,
      })) ?? []
    );
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<LoaderData> => {
    const url = `${SITE_URL}/blog/${params.slug}`;
    const post = await loadPost(params.slug);
    if (!post) throw notFound();

    const [alternates, related] = await Promise.all([
      loadTranslations(post),
      client
        .fetch<Post[]>(relatedPostsQuery, {
          slug: params.slug,
          category: post.category,
          language: post.language,
        })
        .catch(() => [] as Post[]),
    ]);

    const socialTitle = (post.seoTitle || post.title).trim();
    const description = (post.seoDescription || post.excerpt || "")
      .trim()
      .slice(0, 160);
    const image = ogImageUrl(post.coverImage) ?? DEFAULT_OG_IMAGE;
    const imageAlt = post.coverImage?.alt?.trim() || `${socialTitle} — KitchFlow`;

    return {
      post,
      related: related ?? [],
      alternates,
      title: `${socialTitle} | KitchFlow`,
      socialTitle,
      description:
        description || "Practical guides for kitchen and cafe operators from KitchFlow.",
      image,
      imageAlt,
      url,
      publishedAt: post.publishedAt,
      modifiedAt: post._updatedAt || post.publishedAt,
      authorName: post.author?.name ?? "KitchFlow Team",
      locale: LOCALE_BY_LANG[post.language] ?? "en_US",
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const {
      title,
      socialTitle,
      description,
      image,
      imageAlt,
      url,
      publishedAt,
      modifiedAt,
      authorName,
      locale,
      alternates,
      post,
    } = loaderData;
    const defaultAlternate =
      alternates.find((item) => item.language === "en") ?? alternates[0];

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: socialTitle,
          item: url,
        },
      ],
    };

    const article = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: socialTitle,
      description,
      image,
      datePublished: publishedAt,
      dateModified: modifiedAt,
      author: { "@type": "Person", name: authorName },
      publisher: {
        "@type": "Organization",
        name: "KitchFlow",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/kitchflow-logo.svg`,
        },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: locale.replace("_", "-"),
      articleSection: post.category,
    };

    return {
      meta: socialMetaTags({
        documentTitle: title,
        socialTitle,
        description,
        url,
        image,
        imageAlt,
        type: "article",
        locale,
        publishedAt,
        authorName,
      }),
      links: [
        { rel: "canonical", href: url },
        ...alternates.map((item) => ({
          rel: "alternate" as const,
          hrefLang: item.language,
          href: `${SITE_URL}/blog/${item.slug}`,
        })),
        ...(defaultAlternate
          ? [
              {
                rel: "alternate" as const,
                hrefLang: "x-default",
                href: `${SITE_URL}/blog/${defaultAlternate.slug}`,
              },
            ]
          : []),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(article) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
      ],
    };
  },
  component: BlogPostPage,
});

function formatDate(d: string, locale: string) {
  try {
    return new Date(d).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

function BlogPostPage() {
  const { post, related, alternates, url } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const { setTranslations } = useBlogTranslations();

  useEffect(() => {
    setTranslations(alternates);
    return () => setTranslations(null);
  }, [alternates, setTranslations]);

  const cover = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1600).auto("format").url()
    : null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <article className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-foreground transition">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/blog" className="hover:text-foreground transition">
                {t("nav.blog")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground line-clamp-1">{post.title}</li>
          </ol>
        </nav>

        <div className="mt-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary-soft rounded-full px-2.5 py-1">
            {post.category}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex h-12 w-12 rounded-full bg-muted items-center justify-center text-base font-semibold text-foreground">
              {post.author?.name?.[0] ?? "K"}
            </span>
            <span className="font-medium text-foreground">{post.author?.name}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, i18n.language)}
            </time>
            {post.readTime && (
              <>
                <span>·</span>
                <span>
                  {post.readTime} {t("blog.minRead")}
                </span>
              </>
            )}
          </div>
        </div>

        <div
          className="mt-10 w-full bg-muted rounded-2xl border border-border overflow-hidden"
          style={{ aspectRatio: "16 / 9" }}
        >
          {cover ? (
            <img
              src={cover}
              alt={post.coverImage?.alt || post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              <Camera className="h-12 w-12" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="mt-12">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            post.excerpt && (
              <p className="text-xl leading-[1.7] text-foreground/85 font-medium">
                {post.excerpt}
              </p>
            )
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-primary-soft/40 p-6">
          <p className="text-[17px] leading-relaxed text-foreground/90">
            {t("blog.appCta")}
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            {t("nav.download")}
          </a>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            {t("blog.share")}:
          </span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Share on X"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <button
            onClick={copyLink}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Copy link"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold tracking-tight">{t("blog.related")}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
