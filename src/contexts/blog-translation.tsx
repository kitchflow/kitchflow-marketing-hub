import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { PostTranslation } from "@/types";

type BlogTranslationContextValue = {
  translations: PostTranslation[];
  setTranslations: (translations: PostTranslation[] | null) => void;
  findSlugForLanguage: (language: string) => string | undefined;
};

const BlogTranslationContext = createContext<BlogTranslationContextValue | null>(null);

export function BlogTranslationProvider({ children }: { children: ReactNode }) {
  const [translations, setTranslationsState] = useState<PostTranslation[]>([]);

  const setTranslations = useCallback((next: PostTranslation[] | null) => {
    setTranslationsState(next ?? []);
  }, []);

  const findSlugForLanguage = useCallback(
    (language: string) => translations.find((t) => t.language === language)?.slug,
    [translations],
  );

  const value = useMemo(
    () => ({ translations, setTranslations, findSlugForLanguage }),
    [translations, setTranslations, findSlugForLanguage],
  );

  return (
    <BlogTranslationContext.Provider value={value}>{children}</BlogTranslationContext.Provider>
  );
}

export function useBlogTranslations() {
  const ctx = useContext(BlogTranslationContext);
  if (!ctx) {
    throw new Error("useBlogTranslations must be used within BlogTranslationProvider");
  }
  return ctx;
}

export function useOptionalBlogTranslations() {
  return useContext(BlogTranslationContext);
}
