import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/KFButton";
import { APP_STORE_URL } from "@/lib/seo";

export function DownloadCTA() {
  const { t } = useTranslation();

  return (
    <section id="download" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t("download.title")}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("download.subtitle")}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full sm:w-auto group">
              {t("download.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
