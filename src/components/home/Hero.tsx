import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/KFButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-dot" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a href="#waitlist">
                <Button size="lg" className="w-full sm:w-auto">{t("hero.ctaPrimary")}</Button>
              </a>
              <a href="#how">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto group">
                  {t("hero.ctaSecondary")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["bg-primary/30", "bg-secondary/40", "bg-warning/40"].map((c, i) => (
                  <div key={i} className={`h-12 w-12 rounded-full border-2 border-background ${c}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{t("hero.social")}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-[260px] sm:w-[300px] lg:w-[340px]">
              <PhoneMockup label="KitchFlow" glow />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
