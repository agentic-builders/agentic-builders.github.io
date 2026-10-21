# Agentic Builders — website

https://agenticbuilders.ai. Static fund website with a founder-focused homepage, shared Portfolio and Team pages, and a plain-text reference for AI agents. Built with [Eleventy](https://www.11ty.dev/) from shared content. All editable source and build tooling live in `src/`; only the generated website lives in `docs/`.

## Pages

| URL | Purpose |
|---|---|
| `/` | Founder overview, investment track, team introduction, FAQ and direct Notion application links; navigation links to the full Portfolio page |
| `/portfolio/` | All portfolio companies, introduction requests for angels and VCs, monthly newsletter |
| `/team/` | Team members including Abi, responsibilities and contact |
| `/llms-full.txt` | Full reference for AI agents |

Main navigation: For founders, For agents (direct full-text reference), Portfolio, Team, Apply. The homepage keeps its How it works links; AI reference, updates and utility links are also in the footer. Other pages: `/brand/`, `/privacy/`, `/legal/`, `404.html`.
Generated files: `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/agenticbuilders.vcf`, `/sitemap.xml`, JSON-LD in pages using the shared layout.

AI discovery uses a concise `llms.txt` index linked to the full plain-text reference in `llms-full.txt`. There is no separate agents HTML page or duplicate Markdown download. HTML pages advertise the index with `rel="describedby"`, following the [llms.txt proposal](https://llmstxt.org/). These files help agents consume the content; [Google's AI Search guidance](https://developers.google.com/search/docs/appearance/ai-features) does not require special AI text files. Both text files include a UTF-8 byte-order mark so browsers render punctuation correctly even without a charset response header.

## Search indexing

- `sitemap.xml` is generated from Eleventy's indexable HTML pages, including Brand. Setting `noindex: true` excludes a page; the 404 is excluded. The sitemap uses absolute canonical URLs and the content update date.
- `robots.txt` permits crawling and advertises the sitemap. Page content and navigation are present in the generated HTML without JavaScript.
- All HTML pages use `pages/_includes/seo.njk` for titles, descriptions, canonical URLs, robots directives, Open Graph and Twitter metadata, and the AI-reference link. Keep directory canonical URLs consistent with the sitemap (`/brand/`, not `/brand`).
- Indexable pages include Organization, WebSite and page JSON-LD. Portfolio adds CollectionPage and an ItemList of the companies shown; Team adds AboutPage and Person entries for the three people, linked to their profiles and local portraits. Abi is not marked as a person. The homepage FAQ schema uses the same content as its visible answers. Do not add unverified publication dates or claims to structured data.
- After publishing, submit `https://agenticbuilders.ai/sitemap.xml` through Google Search Console and Bing Webmaster Tools, then check the homepage, Portfolio and Team with URL inspection. Sitemap discovery and structured data help search engines understand the site; they do not guarantee indexing or special search-result displays. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Run locally

Run these commands from the repository root:

```bash
npm --prefix src ci
npm --prefix src run dev
```

Opens http://localhost:8765 and previews `src/_site/`. The development server does not update the committed site in `docs/`.

`npm --prefix src run build` rebuilds `src/_site/` and replaces `docs/` with the finished site. The build fails if any generated page or machine-readable file contains the word `TODO`, before replacing the committed output. This README is outside the page input directory and is excluded from the published site. You can also run ordinary `npm` commands after `cd src`.

Use the local HTTP server to preview navigation: header and footer links use clean directory URLs such as `/portfolio/`, matching the hosted site. Assets and other page links remain relative to each page, so individual HTML files still display when opened directly from disk. Canonical URLs and machine-readable URLs stay absolute. The hosted `404.html` retains root-relative paths because Pages can serve it at an unknown URL depth; preview that error page over HTTP.

## Where to edit

- **Shared content**: `src/content/fund.json`. The homepage copy is under `home`, page introductions under `portfolio` and `team_page`, the agent instructions and application schema under `agents`, shared facts (check, program, criteria, portfolio, FAQ, team) at the top level. Pages and machine files render from this file; some page-specific text lives in the templates.
- **Terminology**: use “AI agents” when describing agents that do work, including teams of people and agents. Keep “AI” for broader concepts such as AI search, AI adoption, models and tokens; do not describe a product as agent-based unless its current offering supports that claim. Application labels, hints, required flags and choices must match the live external form, in form order. Copy labels and helper text separately and verbatim; keep required asterisks in the `required` flag. Update `agents.application_form_verified` after checking the live form; both agent text files use that date. Field keys and illustrative examples belong to the reference, not the form.
- **Navigation labels and URLs**: `src/content/site.json`. Footer links begin with the same `navigation` items in the same order, followed by the utility links in `footer_links`. `api_base_url` is reserved for the future application API.
- **Templates**: `src/pages/*.njk` (pages), `src/pages/_includes/home.njk` (layout, shared header; footer markup is in `footer.njk`), `src/pages/llms-full.njk` (the full reference for AI agents), `src/pages/_includes/jsonld.njk`.
- **Styles**: `src/assets/hero.css` (shared tokens), `home.css` (founders page and shared components), `pages.css`, and shared `footer.css`. Text blocks fill their containing columns; keep width limits on page wrappers or intentional controls instead of adding narrower paragraph caps. Investment cards use the content column's width to switch between one and three columns. Fonts: Urbanist, Inter, JetBrains Mono from Google Fonts.
- **Scripts**: `src/assets/home.js`. Every animation is gated on the `js` class on `<html>`; the page is complete without scripts.
- **Contact download**: `src/pages/vcf.njk` generates the vCard 3.0 file from shared fund details. `src/scripts/vcard.mjs` escapes text values, folds long lines without splitting UTF-8 characters, and emits CRLF throughout, including the final line ending.
- **Static assets**: `src/static/` contains brand assets, portfolio logos, icons, `CNAME`, and `.nojekyll`, copied to the website root.
- **Team photos**: local copies of LinkedIn portraits live in `src/static/team/`. Update the `photo` path beside each person’s LinkedIn URL in `src/content/fund.json`; portraits link to those profiles and do not load images from LinkedIn at runtime.
- **Portfolio**: add a logo to `src/static/portfolio-logos/` (max 64px) and an entry in `src/content/fund.json → portfolio.companies`. Keep `for_humans` and `for_agents` short; `description` supplies the longer copy on Portfolio and in `llms-full.txt`. Check the company's current website when updating its positioning. Public logo URLs remain `/portfolio-logos/...`.
- **Build tooling**: `src/package.json`, `src/package-lock.json`, `src/eleventy.config.js`, and `src/scripts/`.

## Deploy

Use **Deploy from a branch**, branch **main**, folder **/docs**. This is a one-time change from the previous **/(root)** publishing folder when this PR is merged; `docs/` must exist on `main` before it can be selected. The generated `docs/.nojekyll` file makes Pages serve the finished files directly; Eleventy runs locally and no custom workflow is needed.

Before every commit that changes site content, templates, or assets:

```bash
npm --prefix src run build
git diff
git add src docs
git commit
```

Commit both the editable `src/` directory and the generated `docs/` directory. Rebuild after editing source; do not edit generated files directly. Each build replaces `docs/`, so removed pages and assets are removed from the published output too. `src/_site/` and `src/node_modules/` stay ignored.

Once Pages points to `/docs`, merging to `main` publishes the committed site through branch deployment. Keep the custom domain configured as `agenticbuilders.ai`; the build includes `docs/CNAME`. Asset URLs carry a content hash (`?v=`) for cache busting.
