# Search Console Runbook

## Property and Sitemap Setup

1. Open [Google Search Console](https://search.google.com/search-console/about).
2. Select the domain property for `oneirsolutions.com`.
3. Go to **Sitemaps**.
4. Submit:
   - `https://oneirsolutions.com/sitemap.xml`
5. Confirm status is **Success** and no parse errors are reported.

## Initial Indexing Actions

Use **URL Inspection** and request indexing for high-priority pages first:

- `/en`
- `/fr`
- `/en/success-stories`
- `/fr/success-stories`
- `/en/product-manuals`
- `/fr/product-manuals`
- `/en/media-and-articles`
- `/fr/media-and-articles`

Then inspect a sample of success-story detail pages in both languages.

## Expected Indexing Behavior

- Search/sign-in URLs should be excluded from indexing:
  - `/en/search`, `/fr/search`
  - `/en/signin`, `/fr/signin`
- Canonical and language alternates should map EN/FR equivalents.

## Ongoing Monitoring (Weekly)

1. **Pages report**
   - Check Indexed vs Not Indexed trends.
   - Investigate sudden drops or spikes.
2. **Sitemaps report**
   - Verify submitted URL count matches expected public route count.
3. **Performance report**
   - Filter by `en` and `fr` directories to compare visibility.
4. **Enhancements / Rich results**
   - Watch for structured data warnings on FAQ/article pages.

## Monthly Technical QA

- Run local SEO audit:
  - `npm run seo:audit`
- Re-run Lighthouse / Core Web Vitals spot checks on:
  - Home
  - Success Stories index
  - A success story detail page
  - Media and Articles
  - Common Questions
