'use client'

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { SUPPORTED_LANGS, setLanguage, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const labels: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };
const fullNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = (i18n.language as Lang) || "en";

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
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
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
