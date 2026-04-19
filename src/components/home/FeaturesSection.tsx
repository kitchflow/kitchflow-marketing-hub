import { motion } from "framer-motion";
import {
  Package,
  Recycle,
  CheckSquare,
  ShoppingCart,
  Users,
  ScrollText,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeaturesSection() {
  const { t } = useTranslation();
  const features = [
    { Icon: Package, key: "inventory" as const },
    { Icon: Recycle, key: "waste" as const },
    { Icon: CheckSquare, key: "tasks" as const },
    { Icon: ShoppingCart, key: "supplier" as const },
    { Icon: Users, key: "staff" as const },
    { Icon: ScrollText, key: "logs" as const },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
            {t("features.label")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("features.title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift relative overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-xl font-semibold">
                {t(`features.list.${key}.title`)}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {t(`features.list.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
