import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckSquare,
  Package,
  Recycle,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/KFButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import appHomeScreenshot from "@/assets/app-home-screenshot.png";
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  APP_STORE_URL,
  socialMetaTags,
  organizationJsonLd,
} from "@/lib/seo";

const TITLE = "About KitchFlow – Kitchen Ops for Restaurants & Cafés";
const SOCIAL_TITLE = "About KitchFlow – Kitchen Ops";
const DESCRIPTION =
  "KitchFlow is kitchen operations software for restaurants, cafés and food-service teams. Inventory, waste, staff, tasks and suppliers on iPhone.";
const URL = `${SITE_URL}/about`;

const CAPABILITIES = [
  { key: "inventory" as const, to: "/restaurant-inventory-management", Icon: Package },
  { key: "waste" as const, to: "/restaurant-food-waste-management", Icon: Recycle },
  { key: "staff" as const, to: "/restaurant-staff-scheduling", Icon: Users },
  { key: "tasks" as const, to: "/kitchen-task-management", Icon: CheckSquare },
  { key: "supplier" as const, to: "/restaurant-supplier-management", Icon: ShoppingCart },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: socialMetaTags({
      documentTitle: TITLE,
      socialTitle: SOCIAL_TITLE,
      description: DESCRIPTION,
      url: URL,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "About KitchFlow – Kitchen Ops",
      type: "website",
    }),
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();

  return (
    <article>
      <section className="overflow-hidden border-b border-border py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">{t("about.eyebrow")}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              {t("about.h1")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
              {t("about.intro")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto">
                  {t("about.download")}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </Button>
              </a>
              <Link to="/" hash="features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t("about.explore")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-x-8 top-1/2 h-40 -translate-y-1/2 rounded-full bg-primary-soft blur-3xl" />
            <div className="relative w-[230px] sm:w-[270px]">
              <PhoneMockup
                label={t("about.phoneLabel")}
                image={appHomeScreenshot}
                alt="KitchFlow daily kitchen operations overview"
                glow
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-primary">{t("about.togetherLabel")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {t("about.togetherTitle")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.togetherBody")}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ key, to, Icon }) => (
              <Link
                key={key}
                to={to}
                className="group min-h-56 rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-xl font-semibold">
                  {t(`about.capabilities.${key}.title`)}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {t(`about.capabilities.${key}.description`)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t("about.learnMore")}{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                </span>
              </Link>
            ))}
            <div className="flex min-h-56 flex-col justify-between rounded-lg bg-foreground p-6 text-background">
              <div>
                <p className="text-sm font-semibold text-background/65">{t("about.serviceLabel")}</p>
                <h3 className="mt-3 text-2xl font-bold">{t("about.serviceTitle")}</h3>
              </div>
              <p className="mt-6 leading-relaxed text-background/70">{t("about.serviceBody")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">{t("about.whoLabel")}</p>
            <h2 className="mt-3 text-3xl font-bold">{t("about.whoTitle")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">{t("about.whoBody")}</p>
          </div>
          <div className="border-s-2 border-primary ps-7">
            <p className="text-sm font-semibold uppercase text-primary">{t("about.availableLabel")}</p>
            <h2 className="mt-3 text-3xl font-bold">{t("about.availableTitle")}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t("about.availableBody")}</p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              {t("about.viewStore")} <ArrowRight className="h-4 w-4 rtl-flip" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
