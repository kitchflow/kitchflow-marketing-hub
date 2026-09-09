import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/KFButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import type { FeaturePageMeta } from "@/lib/feature-pages";
import { APP_STORE_URL } from "@/lib/seo";

export function FeatureLanding({ content }: { content: FeaturePageMeta }) {
  const { t } = useTranslation();
  const base = `featurePages.${content.id}`;
  const features = t(`${base}.features`, { returnObjects: true }) as {
    title: string;
    body: string;
  }[];
  const faqs = t(`${base}.faqs`, { returnObjects: true }) as { q: string; a: string }[];

  return (
    <article className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">
          {t("featurePages.common.entity")}
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          {t(`${base}.h1`)}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">
          {t(`${base}.definition`)}
        </p>
        <div className="mt-8">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg">{t("featurePages.common.download")}</Button>
          </a>
        </div>

        <div className="mt-12 mx-auto w-[220px] sm:w-[260px]">
          <PhoneMockup
            label={t(`${base}.screenshotLabel`)}
            image={content.screenshot.src}
            alt={content.screenshot.alt}
          />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{t(`${base}.problemTitle`)}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">
            {t(`${base}.problemBody`)}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">{t(`${base}.featuresTitle`)}</h2>
          <div className="mt-6 space-y-6">
            {Array.isArray(features) &&
              features.map((f) => (
                <div key={f.title}>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">{t(`${base}.whoTitle`)}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">
            {t(`${base}.whoBody`)}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">{t("featurePages.common.faq")}</h2>
          <dl className="mt-6 space-y-6">
            {Array.isArray(faqs) &&
              faqs.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold">{item.q}</dt>
                  <dd className="mt-2 text-muted-foreground leading-relaxed">{item.a}</dd>
                </div>
              ))}
          </dl>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">{t("featurePages.common.getTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("featurePages.common.getBody")}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {t("featurePages.common.download")}
            </a>
            <Link to="/blog" className="font-medium hover:underline">
              {t("featurePages.common.blogLink")}
            </Link>
            {content.relatedBlog && (
              <a href={content.relatedBlog.href} className="font-medium hover:underline">
                {t(`${base}.relatedBlog`)}
              </a>
            )}
            <Link to="/about" className="font-medium hover:underline">
              {t("featurePages.common.aboutLink")}
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
