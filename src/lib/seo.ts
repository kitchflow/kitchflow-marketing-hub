export const SITE_URL = "https://kitchflowapp.com";
export const SITE_NAME = "KitchFlow";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const absoluteUrl = (path: string) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
