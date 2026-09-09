import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Screenshots } from "@/components/home/Screenshots";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { DownloadCTA } from "@/components/home/DownloadCTA";
import { SITE_URL, DEFAULT_OG_IMAGE, socialMetaTags } from "@/lib/seo";

const TITLE = "KitchFlow — Kitchen Operations Management App";
const SOCIAL_TITLE = "KitchFlow";
const DESCRIPTION =
  "Run inventory, staff, tasks, waste, and scheduling from one kitchen ops app. Free on the App Store.";
const URL = `${SITE_URL}/`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "KitchFlow",
  description: DESCRIPTION,
  operatingSystem: "iOS",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: socialMetaTags({
      documentTitle: TITLE,
      socialTitle: SOCIAL_TITLE,
      description: DESCRIPTION,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "KitchFlow — kitchen operations management app",
      type: "website",
    }),
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <Screenshots />
      <WhoItsFor />
      <DownloadCTA />
    </>
  );
}
