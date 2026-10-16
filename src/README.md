# Agentic Builders — website

https://agenticbuilders.ai. Static site, founder and investor pages plus a plain-text reference for AI agents, built with [Eleventy](https://www.11ty.dev/) from one content file. All editable source and build tooling live in `src/`; only the generated website lives in `docs/`.

## Modes

| URL | Audience | Header action |
|---|---|---|
| `/` | Founders | Apply (direct Notion form link) |
| `/llms-full.txt` | AI agents acting for a person | Plain-text reference |
| `/investors/` | Investors | Contact |

Other pages: `/privacy/`, `/legal/`, `404.html`.
Generated files: `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/agenticbuilders.vcf`, `/sitemap.xml`, JSON-LD in every page head.

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

- **Shared content**: `src/content/fund.json`. The home page copy is under `home`, the investors page under `investors`, the agent instructions and application schema under `agents`, shared facts (check, program, criteria, portfolio, FAQ, team) at the top level. Pages and machine files render from this file; some page-specific text lives in the templates.
- **Mode labels and URLs**: `src/content/site.json`. `api_base_url` is reserved for the future application API.
- **Templates**: `src/pages/*.njk` (pages), `src/pages/_includes/home.njk` (layout, header with the mode switcher, footer with legal lines), `src/pages/llms-full.njk` (the full reference for AI agents), `src/pages/_includes/jsonld.njk`.
- **Styles**: `src/assets/hero.css` (shared tokens), `home.css` (founders page and shared components), `investors.css`, and shared `footer.css`. Fonts: Urbanist, Inter, JetBrains Mono from Google Fonts.
- **Scripts**: `src/assets/home.js`. Every animation is gated on the `js` class on `<html>`; the page is complete without scripts.
- **Static assets**: `src/static/` contains brand assets, portfolio logos, icons, `CNAME`, and `.nojekyll`, copied to the website root.
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
