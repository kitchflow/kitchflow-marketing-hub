import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/KFButton";
import { APP_STORE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <section className="border-y border-border bg-surface py-20 lg:py-28" id="faq">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <MessageCircleQuestion className="h-5 w-5" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase text-primary">{t("faq.label")}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{t("faq.title")}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{t("faq.subtitle")}</p>
          <p className="mt-7 text-sm text-muted-foreground">
            {t("faq.ready")}{" "}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {t("faq.appStore")}
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {Array.isArray(items) &&
            items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.q}>
                  <Button
                    variant="ghost"
                    className="h-auto min-h-16 w-full justify-between rounded-none px-0 py-5 text-start text-base shadow-none sm:text-lg"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="whitespace-normal pe-5 font-semibold">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180 text-primary",
                      )}
                    />
                  </Button>
                  <div
                    id={`faq-answer-${index}`}
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-2xl pb-5 pe-10 leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
