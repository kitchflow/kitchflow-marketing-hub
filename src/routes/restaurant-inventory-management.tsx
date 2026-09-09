import { createFileRoute } from "@tanstack/react-router";
import { FeatureLanding } from "@/components/seo/FeatureLanding";
import { featurePageByPath } from "@/lib/feature-pages";
import { SITE_URL, DEFAULT_OG_IMAGE, socialMetaTags } from "@/lib/seo";

const content = featurePageByPath("/restaurant-inventory-management")!;
const URL = `${SITE_URL}${content.path}`;

export const Route = createFileRoute("/restaurant-inventory-management")({
  head: () => ({
    meta: socialMetaTags({
      documentTitle: content.title,
      socialTitle: content.socialTitle,
      description: content.description,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "KitchFlow restaurant inventory management",
      type: "website",
    }),
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => <FeatureLanding content={content} />,
});
