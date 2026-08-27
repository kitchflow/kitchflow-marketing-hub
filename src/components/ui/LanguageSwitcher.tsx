import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { SUPPORTED_LANGS, resolveLang, setLanguage, type Lang } from "@/lib/i18n";
import { useOptionalBlogTranslations } from "@/contexts/blog-translation";
import { cn } from "@/lib/utils";

const labels: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };
const fullNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const blogTranslations = useOptionalBlogTranslations();
  const [open, setOpen] = useState(false);
  const current = resolveLang(i18n.resolvedLanguage ?? i18n.language);

  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";

  const handleLanguageChange = (lang: Lang) => {
    setLanguage(lang);
    setOpen(false);

    if (isBlogPost && blogTranslations) {
      const nextSlug = blogTranslations.findSlugForLanguage(lang);
      if (nextSlug) {
        navigate({ to: "/blog/$slug", params: { slug: nextSlug } });
      }
    }
  };

  useEffect(() => {
    const onClick = () => setOpen(false);
    if (open) window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border px-3 h-9 text-sm font-medium hover:bg-muted transition-colors",
          compact && "border-transparent hover:border-border",
        )}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{labels[current]}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-border bg-popover shadow-lift overflow-hidden z-50">
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-muted text-left"
            >
              <span>{fullNames[lang]}</span>
              {current === lang && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
