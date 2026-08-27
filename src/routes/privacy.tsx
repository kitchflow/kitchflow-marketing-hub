import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Privacy Policy | KitchFlow";
const DESCRIPTION =
  "Read the KitchFlow Privacy Policy to understand how we collect, use, and protect your personal data.";
const URL = `${SITE_URL}/privacy`;

export const Route = createFileRoute("/privacy")({
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
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="py-16 lg:py-24">
      <article className="mx-auto max-w-2xl px-5 lg:px-8">
        <p className="text-sm text-muted-foreground mb-4">
          Last updated: 29 June 2026
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10 font-[family-name:var(--font-display)]">
          Privacy Policy
        </h1>

        <div className="space-y-10 text-[15px] leading-[1.75] text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              1. Introduction
            </h2>
            <p>
              KitchFlow ("we", "us", "our") is a kitchen operations management
              app built for restaurants, cafés, and catering teams. We are based in
              Sweden. This Privacy Policy explains how we collect, use, and
              protect your personal data when you use our iOS app (bundle ID{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                com.kitchflowapp.ios
              </code>
              ) or visit our website at{" "}
              <a
                href="https://kitchflowapp.com"
                className="text-primary hover:underline"
              >
                kitchflowapp.com
              </a>
              .
            </p>
            <p className="mt-3">
              If you have any questions about this policy, please contact us at{" "}
              <a
                href="mailto:hello@kitchflow.app"
                className="text-primary hover:underline"
              >
                hello@kitchflow.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              2. Data We Collect
            </h2>
            <p>We collect the following categories of data:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>Account data:</strong> email address and name, collected
                when you sign up or log in via Supabase authentication.
              </li>
              <li>
                <strong>Operational data:</strong> information entered by
                restaurant managers and staff, including staff names and
                schedules, inventory records, waste logs, supplier and shopping
                list data, task assignments, and admin activity logs.
              </li>
              <li>
                <strong>Subscription data:</strong> managed by Apple and
                RevenueCat. We do not receive or store your payment card
                details.
              </li>
              <li>
                <strong>Device and usage data:</strong> standard technical
                information such as device type, operating system version, app
                version, and crash logs. This helps us keep the app running
                smoothly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              3. Why We Process Your Data
            </h2>
            <p>
              We process your data to provide and maintain the KitchFlow service,
              to fulfil our contract with you or the restaurant you represent, and
              for legitimate business operations such as customer support, fraud
              prevention, and improving the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              4. Roles and Responsibilities
            </h2>
            <p>
              For operational data entered by a restaurant about its staff and
              operations, the <strong>restaurant</strong> is the data controller
              and KitchFlow acts as a <strong>data processor</strong> on their
              behalf. We only process this data according to the restaurant’s
              instructions and this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              5. Third-Party Processors
            </h2>
            <p>
              We use carefully selected third-party services to run KitchFlow:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>Supabase</strong> — database and authentication hosting.
              </li>
              <li>
                <strong>RevenueCat</strong> — subscription management and
                in-app-purchase handling.
              </li>
              <li>
                <strong>Sanity</strong> — content management for our blog and
                marketing website. No personal data is stored in Sanity.
              </li>
              <li>
                <strong>Apple</strong> — App Store payment processing and
                subscription infrastructure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              6. Data Retention
            </h2>
            <p>
              We retain your data for as long as your account is active. If you
              delete your account, we will remove your personal data within{" "}
              <strong>30 days</strong> of receiving your deletion request, except
              where we are legally required to keep it for a longer period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              7. Your Rights Under GDPR
            </h2>
            <p>
              If you are in the European Union or European Economic Area, you have
              the following rights:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>Access</strong> — request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction</strong> — ask us to correct inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion</strong> — request that we delete your personal
                data.
              </li>
              <li>
                <strong>Data portability</strong> — receive your data in a
                structured, commonly used format.
              </li>
              <li>
                <strong>Objection</strong> — object to certain types of
                processing.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:hello@kitchflow.app"
                className="text-primary hover:underline"
              >
                hello@kitchflow.app
              </a>
              . We will respond within one month.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              8. Account Deletion
            </h2>
            <p>
              You can delete your account and all associated data directly from
              the KitchFlow app settings screen. Alternatively, you can email us
              at{" "}
              <a
                href="mailto:hello@kitchflow.app"
                className="text-primary hover:underline"
              >
                hello@kitchflow.app
              </a>{" "}
              and we will process your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              9. Children
            </h2>
            <p>
              KitchFlow is not directed at children under 16. We do not knowingly
              collect personal data from children. If you believe we have
              collected data from a child under 16, please contact us
              immediately and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              10. International Data Transfers
            </h2>
            <p>
              Your data may be processed outside the EU/EEA, including in the
              United States, where our hosting providers operate. When this
              happens, we ensure appropriate safeguards are in place, such as
              Standard Contractual Clauses, to protect your data in accordance
              with GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              11. Cookies and Analytics
            </h2>
            <p>
              Our marketing website may use standard analytics tools to
              understand how visitors use the site. These tools may place small
              cookies on your device. You can manage or disable cookies through
              your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we
              will revise the "last updated" date at the top of this page. We
              encourage you to review this page periodically so you stay informed
              about how we protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)] tracking-tight">
              13. Contact Information
            </h2>
            <p>
              KitchFlow AB
              <br />
              Stockholm, Sweden
            </p>
            <p className="mt-3">
              Email:{" "}
              <a
                href="mailto:hello@kitchflow.app"
                className="text-primary hover:underline"
              >
                hello@kitchflow.app
              </a>
            </p>
            <p className="mt-1">
              Website:{" "}
              <a
                href="https://kitchflowapp.com"
                className="text-primary hover:underline"
              >
                kitchflowapp.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </section>
  );
}
