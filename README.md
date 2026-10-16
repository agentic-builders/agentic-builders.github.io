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

```bash
npm ci
npm run dev
```

Opens http://localhost:8765 and previews `_site/`. The development server does not update the committed site at the repository root.

`npm run build` rebuilds `_site/` and copies the finished site to the repository root. The build fails if any generated page or machine-readable file contains the word `TODO`, before copying the output.

## Where to edit

- **Every fact and sentence**: `content/fund.json`. The home page copy is under `home`, the investors page under `investors`, the agent instructions and application schema under `agents`, shared facts (check, program, criteria, portfolio, FAQ, team) at the top level. All pages and machine files render from this file; nothing is hardcoded in templates except layout.
- **Mode labels and URLs**: `content/site.json`. `api_base_url` is reserved for the future application API.
- **Templates**: `src/*.njk` (pages), `src/_includes/home.njk` (layout, header with the mode switcher, footer with legal lines), `src/_includes/agents-body.njk` (the text shared by `/agents/`, `agents.md` and `llms-full.txt`), `src/_includes/jsonld.njk`.
- **Styles**: `src/assets/hero.css` (shared tokens), `home.css` (founders page and shared components), `investors.css`, `agents.css`. Fonts: Urbanist, Inter, JetBrains Mono from Google Fonts.
- **Scripts**: `src/assets/home.js`. Every animation is gated on the `js` class on `<html>`; the page is complete without scripts.
- **Portfolio**: add a logo to `portfolio-logos/` (max 64px) and an entry in `fund.json → portfolio.companies`.

## Deploy

Keep the existing GitHub Pages settings: **Deploy from a branch**, branch **main**, folder **/(root)**. No custom workflow or Pages settings change is needed. The committed `.nojekyll` file makes Pages serve the finished files directly; Eleventy runs locally.

Before every commit that changes site content, templates, or assets:

```bash
npm run build
git diff
git add <changed source files and generated files>
git commit
```

Commit both the editable source and the generated files (`index.html`, page directories, `assets/`, and machine-readable files). Edit `content/` and `src/`, then rebuild; do not edit generated files directly. `_site/` and `node_modules/` stay ignored. If you remove or rename a page or asset, also remove its old generated file from the repository root.

Merging to `main` publishes the committed site through the existing Pages deployment. The custom domain stays configured as `agenticbuilders.ai`, with `CNAME` retained. Asset URLs carry a content hash (`?v=`) for cache busting.
