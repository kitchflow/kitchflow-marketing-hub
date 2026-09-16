import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { SUPPORTED_LANGS, resolveLang, setLanguage, type Lang } from "@/lib/i18n";
import { useOptionalBlogTranslations } from "@/contexts/blog-translation";
import { blogHubPath, isBlogHubPath, isBlogPostPath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

const labels: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };
const fullNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

function destinationForLang(
  lang: Lang,
  pathname: string,
  findSlugForLanguage?: (lang: Lang) => string | null,
): string | null {
  if (isBlogPostPath(pathname) && findSlugForLanguage) {
    const slug = findSlugForLanguage(lang);
    return slug ? `/blog/${slug}` : null;
  }
  if (isBlogHubPath(pathname)) {
    return blogHubPath(lang);
  }
  return null;
}

export function LanguageSwitcher({
  compact = false,
  dropUp = false,
}: {
  compact?: boolean;
  dropUp?: boolean;
}) {
  const { i18n } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const blogTranslations = useOptionalBlogTranslations();
  const [open, setOpen] = useState(false);
  const current = resolveLang(i18n.resolvedLanguage ?? i18n.language);

  const handleUiOnlyChange = (lang: Lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    const onClick = () => setOpen(false);
    if (open) window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative z-[80]" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border px-3 h-9 text-sm font-medium hover:bg-muted transition-colors",
          compact && "border-transparent hover:border-border",
        )}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span>{labels[current]}</span>
      </button>
      {open && (
        <div
          className={cn(
            "absolute end-0 w-44 rounded-2xl border border-border bg-popover shadow-lift overflow-hidden z-[200]",
            dropUp ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {SUPPORTED_LANGS.map((lang) => {
            const href = destinationForLang(lang, pathname, blogTranslations?.findSlugForLanguage);
            const className =
              "flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-muted text-start";

            if (href) {
              return (
                <a
                  key={lang}
                  href={href}
                  className={className}
                  onClick={() => {
                    setLanguage(lang);
                    setOpen(false);
                  }}
                  hrefLang={lang}
                >
                  <span>{fullNames[lang]}</span>
                  {current === lang && <Check className="h-4 w-4 text-primary" />}
                </a>
              );
            }

            return (
              <button
                key={lang}
                type="button"
                onClick={() => handleUiOnlyChange(lang)}
                className={className}
              >
                <span>{fullNames[lang]}</span>
                {current === lang && <Check className="h-4 w-4 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
