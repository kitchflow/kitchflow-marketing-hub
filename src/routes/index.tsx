import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Screenshots } from "@/components/home/Screenshots";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { DownloadCTA } from "@/components/home/DownloadCTA";
import { HomeFaq } from "@/components/home/HomeFaq";
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  socialMetaTags,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo";

const TITLE = "KitchFlow – Kitchen Operations Management for Restaurants & Cafés";
const SOCIAL_TITLE = "KitchFlow – Kitchen Ops";
const DESCRIPTION =
  "KitchFlow is an all-in-one kitchen operations app for restaurants and cafés. Manage inventory, food waste, staff schedules, daily tasks and suppliers from one place.";
const URL = `${SITE_URL}/`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: socialMetaTags({
      documentTitle: TITLE,
      socialTitle: SOCIAL_TITLE,
      description: DESCRIPTION,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "KitchFlow – kitchen operations management app",
      type: "website",
    }),
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareApplicationJsonLd()),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <section className="py-10 lg:py-12 border-y border-border bg-surface">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-lg leading-relaxed text-foreground/90">{SITE_DESCRIPTION}</p>
        </div>
      </section>
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <Screenshots />
      <WhoItsFor />
      <HomeFaq />
      <DownloadCTA />
    </>
  );
}
