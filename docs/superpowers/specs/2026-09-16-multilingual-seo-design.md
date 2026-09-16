# Multilingual SEO design — language blog hubs

Date: 2026-09-16  
Site: https://kitchflowapp.com  
Languages: `en`, `fr`, `ar`

## Goal

Make English, French, and Arabic first-class SEO content sections without moving indexed article URLs.

## Decisions

1. **Article URLs stay flat:** `/blog/{localized-slug}` for all languages. No migration to `/fr/blog/...` or `/ar/blog/...` in this project.
2. **Add SSR hubs:** `/blog` (en), `/fr/blog` (fr), `/ar/blog` (ar). Each hub lists only that language’s articles in the initial HTML.
3. **CMS grouping:** keep existing Sanity fields `language` + `translationKey` (no rename).
4. **Language switcher (option B):** real `<a href>` when a localized destination exists (article translations or blog hubs); elsewhere UI-only language change on the same URL.
5. **Nav Blog link:** follows active language (`/blog`, `/fr/blog`, `/ar/blog`) and updates when language changes.
6. **Breadcrumbs:** localized labels; Blog crumb → language hub; Home → `/`.
7. **Feature/commercial localized URLs:** recommend only; do not build in this project.
8. **Sitemap:** include the three hubs + all published articles. Prefer HTML hreflang as source of truth; skip sitemap `xhtml:link` unless generation is clean and non-conflicting.

## Current baseline (audit)

Already working on articles: reciprocal hreflang, self-canonical, localized meta/OG/Twitter/BlogPosting, language-aware related posts, sitemap article discovery.

Gaps: no `/fr/blog` or `/ar/blog`; English hub SSR only; switcher is buttons/JS; SSR `<html lang="en">` always; breadcrumbs English + always `/blog`; nav Blog always `/blog`.

## Architecture

| Surface | Behavior |
|---|---|
| `/blog` | SSR English posts; self-canonical; hub hreflang; English meta |
| `/fr/blog` | SSR French posts; self-canonical; hub hreflang; French meta |
| `/ar/blog` | SSR Arabic posts; self-canonical; hub hreflang; Arabic meta; `dir=rtl` |
| `/blog/$slug` | Unchanged URL; fix breadcrumbs + visible crawlable translation links; keep existing hreflang/canonical |
| Nav/Footer Blog | `blogHubPath(lang)` |
| Language switcher | Link to translation or hub when available |

Hub hreflang:

- `en` → `https://kitchflowapp.com/blog`
- `fr` → `https://kitchflowapp.com/fr/blog`
- `ar` → `https://kitchflowapp.com/ar/blog`
- `x-default` → `https://kitchflowapp.com/blog`

## SSR document language

Derive `lang`/`dir` from the matched route during render:

- `/fr/*` → `fr`
- `/ar/*` → `ar`
- blog article → `post.language` from loader data
- `/blog` hub → `en`
- other marketing pages → active UI language when known, else `en`

Arabic uses `dir="rtl"`.

## Out of scope

- Moving article URLs
- Localized feature page routes
- Mechanically translating commercial SEO pages
- Renaming `translationKey`

## Follow-up recommendation (feature pages)

FR/AR articles and UI already exist; commercial feature URLs remain English-only with English meta. If Search Console / traffic later show FR or AR demand for inventory, waste, or staff topics, consider dedicated hubs such as `/fr/gestion-stock-restaurant` — only with high-quality localized copy, not keyword swaps.

## Success criteria

- `/fr/blog` and `/ar/blog` return 200 with article links in initial HTML
- Existing article URLs unchanged and still 200
- Crawlable language links on translated articles and between hubs
- Correct SSR `lang`/`dir`, self-canonical hubs, hub hreflang, sitemap hubs
- Blog nav points at the language hub
