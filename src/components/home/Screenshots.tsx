'use client'

import { useTranslation } from "react-i18next";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

export function Screenshots() {
  const { t } = useTranslation();
  const labels = ["inventory", "tasks", "waste", "shopping"] as const;

  return (
    <section className="py-20 lg:py-28 bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t("screens.title")}
        </h2>
      </div>
      <div className="mt-14 overflow-x-auto pb-6 scrollbar-thin">
        <div className="flex gap-6 px-5 lg:px-8 mx-auto" style={{ width: "max-content" }}>
          {labels.map((key) => (
            <div key={key} className="w-[220px] sm:w-[260px] flex-shrink-0">
              <PhoneMockup label={t(`screens.labels.${key}`)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
