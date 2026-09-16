import { resolveLang, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export const BLOG_HUB_PATH: Record<Lang, string> = {
  en: "/blog",
  fr: "/fr/blog",
  ar: "/ar/blog",
};

export function blogHubPath(lang: Lang): string {
  return BLOG_HUB_PATH[lang];
}

export function blogHubAbsoluteUrl(lang: Lang): string {
  return `${SITE_URL}${blogHubPath(lang)}`;
}

/** Infer UI/content language from a public pathname when the URL encodes locale. */
export function langFromPathname(pathname: string): Lang | null {
  if (
    pathname === "/fr/blog" ||
    pathname.startsWith("/fr/blog/") ||
    pathname === "/fr" ||
    pathname.startsWith("/fr/")
  ) {
    return "fr";
  }
  if (
    pathname === "/ar/blog" ||
    pathname.startsWith("/ar/blog/") ||
    pathname === "/ar" ||
    pathname.startsWith("/ar/")
  ) {
    return "ar";
  }
  if (pathname === "/blog" || pathname === "/blog/") {
    return "en";
  }
  return null;
}

export function documentLangFromMatches(
  pathname: string,
  matches: Array<{ loaderData?: unknown }>,
): Lang {
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const data = matches[i]?.loaderData as { post?: { language?: string } } | undefined;
    if (data?.post?.language) {
      return resolveLang(data.post.language);
    }
  }
  return langFromPathname(pathname) ?? "en";
}

export function isBlogPostPath(pathname: string): boolean {
  return pathname.startsWith("/blog/") && pathname !== "/blog/" && !pathname.endsWith("/feed.xml");
}

export function isBlogHubPath(pathname: string): boolean {
  return (
    pathname === "/blog" ||
    pathname === "/blog/" ||
    pathname === "/fr/blog" ||
    pathname === "/fr/blog/" ||
    pathname === "/ar/blog" ||
    pathname === "/ar/blog/"
  );
}

export const HOME_LABEL: Record<Lang, string> = {
  en: "Home",
  fr: "Accueil",
  ar: "الرئيسية",
};

export const BLOG_LABEL: Record<Lang, string> = {
  en: "Blog",
  fr: "Blog",
  ar: "المدونة",
};

export const HUB_META: Record<
  Lang,
  {
    documentTitle: string;
    socialTitle: string;
    description: string;
    imageAlt: string;
    locale: string;
  }
> = {
  en: {
    documentTitle: "Kitchen Insights | KitchFlow Blog",
    socialTitle: "Kitchen Insights",
    description:
      "Tips and guides for cafe and kitchen operators: inventory, waste, staffing, and day-to-day ops.",
    imageAlt: "KitchFlow blog — kitchen operations insights",
    locale: "en_US",
  },
  fr: {
    documentTitle: "Insights cuisine | Blog KitchFlow",
    socialTitle: "Insights cuisine",
    description:
      "Conseils et guides pour les cafés et cuisines : stocks, gaspillage, équipe et opérations du quotidien.",
    imageAlt: "Blog KitchFlow — insights opérations cuisine",
    locale: "fr_FR",
  },
  ar: {
    documentTitle: "رؤى من المطبخ | مدونة KitchFlow",
    socialTitle: "رؤى من المطبخ",
    description:
      "نصائح وأدلة لمشغّلي المقاهي والمطابخ: المخزون والهدر والفريق والعمليات اليومية.",
    imageAlt: "مدونة KitchFlow — رؤى تشغيل المطبخ",
    locale: "ar_AR",
  },
};

export function blogHubAlternateLinks() {
  return [
    { rel: "alternate" as const, hrefLang: "en", href: blogHubAbsoluteUrl("en") },
    { rel: "alternate" as const, hrefLang: "fr", href: blogHubAbsoluteUrl("fr") },
    { rel: "alternate" as const, hrefLang: "ar", href: blogHubAbsoluteUrl("ar") },
    { rel: "alternate" as const, hrefLang: "x-default", href: blogHubAbsoluteUrl("en") },
  ];
}
