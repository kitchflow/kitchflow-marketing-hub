import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Screenshots } from "@/components/home/Screenshots";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { WaitlistCTA } from "@/components/home/WaitlistCTA";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "KitchFlow — Kitchen Operations Management App";
const DESCRIPTION =
  "KitchFlow is the all-in-one mobile app for kitchen operations: inventory, staff, tasks, waste tracking, and scheduling. Coming soon.";
const URL = `${SITE_URL}/`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "KitchFlow",
  description: DESCRIPTION,
  operatingSystem: "iOS, Android",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
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
      <WaitlistCTA />
    </>
  );
}
