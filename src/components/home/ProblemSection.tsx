'use client'

import { motion } from "framer-motion";
import { Package, Recycle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProblemSection() {
  const { t } = useTranslation();
  const items = [
    { Icon: Package, key: "stock" as const },
    { Icon: Recycle, key: "waste" as const },
    { Icon: Users, key: "staff" as const },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
            {t("problem.label")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("problem.title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map(({ Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 hover:shadow-lift transition-shadow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-lg font-medium leading-snug">
                {t(`problem.items.${key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
