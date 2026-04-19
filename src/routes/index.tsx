import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Screenshots } from "@/components/home/Screenshots";
import { WhoItsFor } from "@/components/home/WhoItsFor";
import { WaitlistCTA } from "@/components/home/WaitlistCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KitchFlow — Run Your Kitchen. Not Just Your Menu." },
      {
        name: "description",
        content:
          "The all-in-one app for kitchen inventory, staff, tasks, waste tracking, and scheduling. Coming soon.",
      },
      { property: "og:title", content: "KitchFlow — Kitchen operations, simplified" },
      {
        property: "og:description",
        content: "Inventory, staff, tasks, waste — one app for every kitchen.",
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
