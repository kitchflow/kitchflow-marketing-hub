import { useEffect } from "react";
import type { Post } from "@/types";
import { BlogList } from "@/components/blog/BlogList";
import { setLanguage, type Lang } from "@/lib/i18n";
import { HUB_META } from "@/lib/locale-path";

export function BlogHubPage({ lang, posts }: { lang: Lang; posts: Post[] }) {
  const meta = HUB_META[lang];

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {meta.socialTitle}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{meta.description}</p>
        </div>

        <BlogList key={lang} posts={posts} />
      </div>
    </section>
  );
}
