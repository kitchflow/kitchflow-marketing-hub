import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/KFButton";
import {
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_ENTITY,
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
  return (
    <article className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">
          {SITE_ENTITY}
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          About KitchFlow
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">{SITE_DESCRIPTION}</p>

        <section className="mt-14 space-y-4 text-[17px] leading-relaxed text-foreground/85">
          <h2 className="text-2xl font-bold tracking-tight">What KitchFlow is</h2>
          <p>
            KitchFlow (also written as KitchFlow – Kitchen Ops) is kitchen operations software for
            restaurants, cafés and food-service teams. It is built for day-to-day kitchen work:
            knowing what you have in stock, what you waste, who is on shift, what tasks are owed and
            what to order next.
          </p>
        </section>

        <section className="mt-12 space-y-4 text-[17px] leading-relaxed text-foreground/85">
          <h2 className="text-2xl font-bold tracking-tight">Who it serves</h2>
          <p>
            KitchFlow is designed for cafe owners, restaurant managers, kitchen leads and small
            food-service teams who need one shared system instead of spreadsheets and chat threads.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Problems it solves</h2>
          <ul className="mt-4 space-y-4 text-[17px] leading-relaxed text-foreground/85">
            <li>
              <strong>Inventory:</strong> count stock, set reorder points, receive deliveries and
              build shopping lists.{" "}
              <a
                href="/restaurant-inventory-management"
                className="text-primary font-medium hover:underline"
              >
                Inventory management
              </a>
            </li>
            <li>
              <strong>Food waste:</strong> log discards by reason with cost attached so patterns are
              visible.{" "}
              <a
                href="/restaurant-food-waste-management"
                className="text-primary font-medium hover:underline"
              >
                Waste tracking
              </a>
            </li>
            <li>
              <strong>Staff scheduling:</strong> invite staff and manage shifts with clear coverage.{" "}
              <a
                href="/restaurant-staff-scheduling"
                className="text-primary font-medium hover:underline"
              >
                Staff scheduling
              </a>
            </li>
            <li>
              <strong>Kitchen tasks:</strong> assign opening, closing and prep checklists with
              ownership.{" "}
              <a href="/kitchen-task-management" className="text-primary font-medium hover:underline">
                Task management
              </a>
            </li>
            <li>
              <strong>Suppliers:</strong> turn low stock into shopping lists for ordering.{" "}
              <a
                href="/restaurant-supplier-management"
                className="text-primary font-medium hover:underline"
              >
                Supplier lists
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-[17px] leading-relaxed text-foreground/85">
          <h2 className="text-2xl font-bold tracking-tight">Supported platforms</h2>
          <p>
            KitchFlow is available now on the App Store for iPhone. Android is not available yet.
          </p>
          <div className="pt-2">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Download on the App Store</Button>
            </a>
          </div>
        </section>

        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            Official website:{" "}
            <a href={SITE_URL} className="text-primary hover:underline">
              kitchflowapp.com
            </a>
          </p>
          <p className="mt-2">
            <Link to="/blog" className="text-primary hover:underline">
              Kitchen ops guides
            </Link>
            {" · "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}
