'use client'

import { motion } from "framer-motion";
import { Utensils, Coffee, Truck, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhoItsFor() {
  const { t } = useTranslation();
  const items = [
    { Icon: Utensils, key: "restaurants" as const },
    { Icon: Coffee, key: "cafes" as const },
    { Icon: Truck, key: "catering" as const },
    { Icon: Building2, key: "any" as const },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t("who.title")}
        </h2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl bg-surface p-7 text-center hover:bg-primary-soft transition-colors"
            >
              <Icon className="h-8 w-8 mx-auto text-primary" strokeWidth={1.75} />
              <p className="mt-4 text-lg font-semibold">
                {t(`who.items.${key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
