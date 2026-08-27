import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import ar from "@/locales/ar.json";

export const SUPPORTED_LANGS = ["en", "fr", "ar"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

/** Map i18next codes (e.g. en-US) to a supported CMS / UI language. */
export const resolveLang = (code?: string | null): Lang => {
  const base = (code ?? "en").split("-")[0] as Lang;
  return SUPPORTED_LANGS.includes(base) ? base : "en";
};

const getInitialLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("kf-lang") as Lang | null;
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = window.navigator.language.slice(0, 2) as Lang;
  return SUPPORTED_LANGS.includes(browser) ? browser : "en";
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
        ar: { translation: ar },
      },
      lng: getInitialLang(),
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
}

export const applyLangToDocument = (lang: Lang) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
};

export const setLanguage = (lang: Lang) => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") window.localStorage.setItem("kf-lang", lang);
  applyLangToDocument(lang);
};

export default i18n;
