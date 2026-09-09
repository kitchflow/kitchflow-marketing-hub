import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/KFButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { APP_STORE_URL } from "@/lib/seo";

export type FeaturePageContent = {
  path: string;
  title: string;
  socialTitle: string;
  description: string;
  h1: string;
  definition: string;
  problemTitle: string;
  problemBody: string;
  featuresTitle: string;
  features: { title: string; body: string }[];
  whoTitle: string;
  whoBody: string;
  faqs: { q: string; a: string }[];
  relatedBlog?: { href: string; label: string };
  screenshot?: { src: string; alt: string; label: string };
};

export function FeatureLanding({ content }: { content: FeaturePageContent }) {
  return (
    <article className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">
          KitchFlow – Kitchen Ops
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          {content.h1}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">{content.definition}</p>
        <div className="mt-8">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg">Download on the App Store</Button>
          </a>
        </div>

        {content.screenshot && (
          <div className="mt-12 mx-auto w-[220px] sm:w-[260px]">
            <PhoneMockup
              label={content.screenshot.label}
              image={content.screenshot.src}
              alt={content.screenshot.alt}
            />
          </div>
        )}

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{content.problemTitle}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">{content.problemBody}</p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">{content.featuresTitle}</h2>
          <div className="mt-6 space-y-6">
            {content.features.map((f) => (
              <div key={f.title}>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">{content.whoTitle}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">{content.whoBody}</p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
          <dl className="mt-6 space-y-6">
            {content.faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-2 text-muted-foreground leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">Get KitchFlow</h2>
          <p className="mt-2 text-muted-foreground">
            KitchFlow is available now on the App Store for iPhone.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Download on the App Store
            </a>
            <Link to="/blog" className="font-medium hover:underline">
              Read kitchen ops guides
            </Link>
            {content.relatedBlog && (
              <a href={content.relatedBlog.href} className="font-medium hover:underline">
                {content.relatedBlog.label}
              </a>
            )}
            <Link to="/about" className="font-medium hover:underline">
              About KitchFlow
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
