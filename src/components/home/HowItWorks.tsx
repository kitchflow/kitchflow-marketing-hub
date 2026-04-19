import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function HowItWorks() {
  const { t } = useTranslation();
  const steps = ["one", "two", "three"] as const;

  return (
    <section id="how" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
          {t("how.title")}
        </h2>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-border" />
          <div className="grid gap-12 md:grid-cols-3 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center"
              >
                <div className="relative mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-background border-2 border-primary text-primary font-display text-3xl font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  {t(`how.steps.${step}`)}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
