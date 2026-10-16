# Agentic Builders — website

https://agenticbuilders.ai. Static site, three modes for three audiences, built with [Eleventy](https://www.11ty.dev/) from one content file.

## Modes

| URL | Audience | Header action |
|---|---|---|
| `/` | Founders | Apply (→ `/apply/`) |
| `/agents/` | AI agents acting for a person | Download agents.md |
| `/investors/` | Investors | Contact |

Other pages: `/apply/` (redirects to the application form), `/privacy/`, `/legal/`, `404.html`.
Generated files: `/agents.md`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/agenticbuilders.vcf`, `/sitemap.xml`, JSON-LD in every page head.

## Run locally

Run these commands from the repository root:

```bash
npm ci
npm run dev
```

Opens http://localhost:8765 and previews `_site/`. The development server does not update the committed site in `docs/`.

`npm run build` rebuilds `_site/` and replaces `docs/` with the finished site. The build fails if any generated page or machine-readable file contains the word `TODO`, before replacing the committed output. This README is excluded from the published site.

You can also open `docs/index.html` directly in a browser. Page links and assets use paths relative to each page, with explicit `index.html` filenames for navigation. Canonical URLs and machine-readable URLs stay absolute. The hosted `404.html` retains root-relative paths because Pages can serve it at an unknown URL depth; preview that error page over HTTP.

## Where to edit

- **Every fact and sentence**: `content/fund.json`. The home page copy is under `home`, the investors page under `investors`, the agent instructions and application schema under `agents`, shared facts (check, program, criteria, portfolio, FAQ, team) at the top level. All pages and machine files render from this file; nothing is hardcoded in templates except layout.
- **Mode labels and URLs**: `content/site.json`. `api_base_url` is reserved for the future application API.
- **Templates**: `src/*.njk` (pages), `src/_includes/home.njk` (layout, header with the mode switcher, footer with legal lines), `src/_includes/agents-body.njk` (the text shared by `/agents/`, `agents.md` and `llms-full.txt`), `src/_includes/jsonld.njk`.
- **Styles**: `src/assets/hero.css` (shared tokens), `home.css` (founders page and shared components), `investors.css`, `agents.css`. Fonts: Urbanist, Inter, JetBrains Mono from Google Fonts.
- **Scripts**: `src/assets/home.js`. Every animation is gated on the `js` class on `<html>`; the page is complete without scripts.
- **Static assets**: `src/static/` contains brand assets, portfolio logos, icons, `CNAME`, and `.nojekyll`, copied to the website root.
- **Portfolio**: add a logo to `src/static/portfolio-logos/` (max 64px) and an entry in `content/fund.json → portfolio.companies`. Public logo URLs remain `/portfolio-logos/...`.

## Deploy

Use **Deploy from a branch**, branch **main**, folder **/docs**. This is a one-time change from the previous **/(root)** publishing folder when this PR is merged; `docs/` must exist on `main` before it can be selected. The generated `docs/.nojekyll` file makes Pages serve the finished files directly; Eleventy runs locally and no custom workflow is needed.

Before every commit that changes site content, templates, or assets:

```bash
npm run build
git diff
git add content src scripts eleventy.config.js package.json package-lock.json docs
git commit
```

Commit both the editable source and the generated `docs/` directory. Edit `content/` and `src/`, then rebuild; do not edit generated files directly. Each build replaces `docs/`, so removed pages and assets are removed from the published output too. `_site/` and `node_modules/` stay ignored.

Once Pages points to `/docs`, merging to `main` publishes the committed site through branch deployment. Keep the custom domain configured as `agenticbuilders.ai`; the build includes `docs/CNAME`. Asset URLs carry a content hash (`?v=`) for cache busting.
