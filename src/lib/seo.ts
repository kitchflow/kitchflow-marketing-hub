export const SITE_URL = "https://kitchflowapp.com";
export const SITE_NAME = "KitchFlow";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const APP_STORE_URL = "https://apps.apple.com/us/app/kitchflow-kitchen-ops/id6762667252";

export const absoluteUrl = (path: string) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

type SocialMetaInput = {
  /** Browser tab title (can include " | KitchFlow") */
  documentTitle: string;
  /** Cleaner title for social cards; falls back to documentTitle */
  socialTitle?: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
  locale?: string;
  publishedAt?: string;
  authorName?: string;
};

/**
 * Full Open Graph + Twitter Card tags for link previews.
 * Image URLs must be absolute HTTPS JPG/PNG — never WebP (many scrapers reject it).
 */
export function socialMetaTags({
  documentTitle,
  socialTitle,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
  imageWidth = OG_IMAGE_WIDTH,
  imageHeight = OG_IMAGE_HEIGHT,
  type = "website",
  locale,
  publishedAt,
  authorName,
}: SocialMetaInput) {
  const title = socialTitle || documentTitle;
  const desc = description.slice(0, 200);

  return [
    { title: documentTitle },
    { name: "description", content: desc },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: image.endsWith(".png") ? "image/png" : "image/jpeg" },
    { property: "og:image:width", content: String(imageWidth) },
    { property: "og:image:height", content: String(imageHeight) },
    { property: "og:image:alt", content: imageAlt },
    ...(locale ? [{ property: "og:locale", content: locale }] : []),
    ...(type === "article" && publishedAt
      ? [{ property: "article:published_time", content: publishedAt }]
      : []),
    ...(type === "article" && authorName
      ? [{ property: "article:author", content: authorName }]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@KitchFlow" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
  ];
}
