import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  socialMetaTags,
} from "@/lib/seo";

type LoaderData = {
  title: string;
  socialTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
  publishedAt: string;
  authorName: string;
  locale: string;
  alternates: PostTranslation[];
};

const LOCALE_BY_LANG: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_AR",
};

/** Social scrapers often reject WebP — force JPEG at 1200x630. */
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

    if (!post) {
      return {
        title: "Article | KitchFlow",
        socialTitle: "KitchFlow Blog",
        description: "Practical guides for kitchen and cafe operators from KitchFlow.",
        image: DEFAULT_OG_IMAGE,
        imageAlt: "KitchFlow",
        url,
        publishedAt: new Date().toISOString(),
        authorName: "KitchFlow Team",
        locale: "en_US",
        alternates: [],
      };
    }

    const alternates = await loadTranslations(post);
    const socialTitle = (post.seoTitle || post.title).trim();
    const description = (post.seoDescription || post.excerpt || "").trim().slice(0, 160);
    const image = ogImageUrl(post.coverImage) ?? DEFAULT_OG_IMAGE;
    const imageAlt = post.coverImage?.alt?.trim() || `${socialTitle} — KitchFlow`;

    return {
      title: `${socialTitle} | KitchFlow`,
      socialTitle,
      description: description || "Practical guides for kitchen and cafe operators from KitchFlow.",
      image,
      imageAlt,
      url,
      publishedAt: post.publishedAt,
      authorName: post.author?.name ?? "KitchFlow Team",
      locale: LOCALE_BY_LANG[post.language] ?? "en_US",
      alternates,
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
      authorName,
      locale,
      alternates,
    } = loaderData;
    const defaultAlternate = alternates.find((item) => item.language === "en") ?? alternates[0];

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
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: socialTitle,
            description,
            image,
            datePublished: publishedAt,
            author: { "@type": "Person", name: authorName },
            publisher: {
              "@type": "Organization",
              name: "KitchFlow",
              url: SITE_URL,
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            inLanguage: locale.replace("_", "-"),
          }),
        },
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
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const { setTranslations } = useBlogTranslations();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    setPost(null);
    setRelated([]);

    client
      .fetch<Post | null>(postBySlugQuery, { slug })
      .then(async (data) => {
        if (!mounted) return;

        if (!data) {
          setPost(null);
          setTranslations(null);
          setStatus("missing");
          return;
        }

        setPost(data);
        setStatus("ready");
        const translations = await loadTranslations(data);
        if (mounted) setTranslations(translations);

        client
          .fetch<Post[]>(relatedPostsQuery, {
            slug,
            category: data.category,
            language: data.language,
          })
          .then((rel) => mounted && setRelated(rel ?? []))
          .catch(() => mounted && setRelated([]));
      })
      .catch(() => {
        if (!mounted) return;
        setPost(null);
        setTranslations(null);
        setStatus("missing");
      });

    return () => {
      mounted = false;
      setTranslations(null);
    };
  }, [slug, setTranslations]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <p className="text-muted-foreground">{t("blog.loading")}</p>
      </div>
    );
  }

  if (status === "missing" || !post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <p className="text-muted-foreground">{t("blog.notFound")}</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
        >
          {t("blog.back")}
        </Link>
      </div>
    );
  }

  const cover = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1600).auto("format").url()
    : null;

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : `${SITE_URL}/blog/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <article className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition"
        >
          {t("blog.back")}
        </Link>

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
            <span>{formatDate(post.publishedAt, i18n.language)}</span>
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
            <img src={cover} alt={post.title} className="h-full w-full object-cover" />
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
              <p className="text-xl leading-[1.7] text-foreground/85 font-medium">{post.excerpt}</p>
            )
          )}
        </div>

        <div className="mt-14 pt-6 border-t border-border flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground mr-2">{t("blog.share")}:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            aria-label="Share on X"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
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
