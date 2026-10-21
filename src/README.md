# Agentic Builders — website

https://agenticbuilders.ai. Static fund website with a founder-focused homepage, shared Portfolio and Team pages, and a plain-text reference for AI agents. Built with [Eleventy](https://www.11ty.dev/) from shared content. All editable source and build tooling live in `src/`; only the generated website lives in `docs/`.

## Pages

| URL | Purpose |
|---|---|
| `/` | Founder overview, four-week process, six portfolio examples, team introduction, FAQ and direct Notion application links |
| `/portfolio/` | All portfolio companies, introduction requests for angels and VCs, monthly newsletter |
| `/team/` | Human team, responsibilities, Abi's role and contact |
| `/investors/` | Legacy entry linking to Portfolio, excluded from indexing; no automatic redirect |
| `/llms-full.txt` | Full reference for AI agents |

Main navigation: For founders, For agents (direct full-text reference), Portfolio, Team, Apply. The homepage keeps its How it works links; AI reference, updates and utility links are also in the footer. Other pages: `/brand/`, `/privacy/`, `/legal/`, `404.html`.
Generated files: `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/agenticbuilders.vcf`, `/sitemap.xml`, JSON-LD in pages using the shared layout.

AI discovery uses a concise `llms.txt` index linked to the full plain-text reference in `llms-full.txt`. There is no separate agents HTML page or duplicate Markdown download. HTML pages advertise the index with `rel="describedby"`, following the [llms.txt proposal](https://llmstxt.org/). These files help agents consume the content; [Google's AI Search guidance](https://developers.google.com/search/docs/appearance/ai-features) does not require special AI text files. Both text files include a UTF-8 byte-order mark so browsers render punctuation correctly even without a charset response header.

## Run locally

Run these commands from the repository root:

```bash
npm --prefix src ci
npm --prefix src run dev
```

Opens http://localhost:8765 and previews `src/_site/`. The development server does not update the committed site in `docs/`.

`npm --prefix src run build` rebuilds `src/_site/` and replaces `docs/` with the finished site. The build fails if any generated page or machine-readable file contains the word `TODO`, before replacing the committed output. This README is outside the page input directory and is excluded from the published site. You can also run ordinary `npm` commands after `cd src`.

You can also open `docs/index.html` directly in a browser. Page links and assets use paths relative to each page, with explicit `index.html` filenames for navigation. Canonical URLs and machine-readable URLs stay absolute. The hosted `404.html` retains root-relative paths because Pages can serve it at an unknown URL depth; preview that error page over HTTP.

## Where to edit

- **Shared content**: `src/content/fund.json`. The homepage copy is under `home`, page introductions under `portfolio` and `team_page`, the agent instructions and application schema under `agents`, shared facts (check, program, criteria, portfolio, FAQ, team) at the top level. Pages and machine files render from this file; some page-specific text lives in the templates.
- **Navigation labels and URLs**: `src/content/site.json`. `api_base_url` is reserved for the future application API.
- **Templates**: `src/pages/*.njk` (pages), `src/pages/_includes/home.njk` (layout, shared header; footer markup is in `footer.njk`), `src/pages/llms-full.njk` (the full reference for AI agents), `src/pages/_includes/jsonld.njk`.
- **Styles**: `src/assets/hero.css` (shared tokens), `home.css` (founders page and shared components), `pages.css`, and shared `footer.css`. Fonts: Urbanist, Inter, JetBrains Mono from Google Fonts.
- **Scripts**: `src/assets/home.js`. Every animation is gated on the `js` class on `<html>`; the page is complete without scripts.
- **Static assets**: `src/static/` contains brand assets, portfolio logos, icons, `CNAME`, and `.nojekyll`, copied to the website root.
- **Team photos**: local copies of LinkedIn portraits live in `src/static/team/`. Update the `photo` path beside each person’s LinkedIn URL in `src/content/fund.json`; portraits link to those profiles and do not load images from LinkedIn at runtime.
- **Portfolio**: add a logo to `src/static/portfolio-logos/` (max 64px) and an entry in `src/content/fund.json → portfolio.companies`. Public logo URLs remain `/portfolio-logos/...`.
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
