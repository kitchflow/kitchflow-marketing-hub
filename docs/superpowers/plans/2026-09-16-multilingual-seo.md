# Multilingual SEO Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Add SSR `/fr/blog` and `/ar/blog` hubs and crawlable language discovery without moving indexed article URLs.

**Architecture:** Flat article URLs stay; language hubs list by Sanity `language`; switcher uses real links for hubs/translations; document `lang`/`dir` from matched route.

**Tech Stack:** TanStack Start/Router, Sanity GROQ, react-i18next, existing `src/lib/seo.ts`.

## Global Constraints

- Do not change existing `/blog/{slug}` article URLs
- Do not build localized feature pages
- Keep Sanity `translationKey` + `language`
- Real `<a href>` for crawlable language destinations
- Hubs must SSR article lists in initial HTML

---

### Task 1: Locale path helpers

**Files:**
- Create: `src/lib/locale-path.ts`
- Modify: `src/locales/{en,fr,ar}.json` (add `nav.home` if missing)

- [ ] Add `blogHubPath(lang)`, `langFromPathname`, hub URL constants, breadcrumb home label keys
- [ ] Commit

### Task 2: Shared blog hub route + FR/AR routes

**Files:**
- Create: `src/components/blog/BlogHubPage.tsx` (or shared factory in `src/lib/blog-hub.ts`)
- Create: `src/routes/fr.blog.index.tsx`
- Create: `src/routes/ar.blog.index.tsx`
- Modify: `src/routes/blog.index.tsx`
- Route tree regenerates via plugin

- [ ] Each hub loader fetches `allPostsQuery` with fixed lang
- [ ] Localized title/H1/intro/meta/canonical/hreflang/OG/Twitter
- [ ] Remove English hub client refetch-on-language-switch
- [ ] Commit

### Task 3: Language switcher + nav/footer

**Files:**
- Modify: `src/components/ui/LanguageSwitcher.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] Switcher options become `<a href>` when destination known
- [ ] Blog nav/footer use `blogHubPath(currentLang)`
- [ ] Commit

### Task 4: Article breadcrumbs, visible switcher, html lang

**Files:**
- Modify: `src/routes/blog.$slug.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] Localized breadcrumbs; Blog → language hub
- [ ] Visible English | Français | العربية links for available translations
- [ ] SSR `html lang`/`dir` from matches / path
- [ ] Sync i18n language from article/hub route
- [ ] Commit

### Task 5: Sitemap + verification

**Files:**
- Modify: `src/routes/sitemap[.]xml.ts`

- [ ] Add `/fr/blog` and `/ar/blog`
- [ ] Verify locally (curl hubs, sample articles, sitemap)
- [ ] Note feature-page recommendation in PR/summary
- [ ] Commit
