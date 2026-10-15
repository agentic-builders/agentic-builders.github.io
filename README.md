# Agentic Builders — website

https://agenticbuilders.ai. Static site, three modes for three audiences, built with [Eleventy](https://www.11ty.dev/) from one content file.

## Modes

| URL | Audience | Header action |
|---|---|---|
| `/` | Founders | Apply (→ `/apply/`) |
| `/agents/` | AI agents acting for a person | Download agents.md |
| `/investors/` | Investors | Meet us |

Other pages: `/apply/` (redirects to the application form), `/privacy/`, `/legal/` (drafts for legal review), `404.html`.
Generated files: `/agents.md`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/agenticbuilders.vcf`, `/sitemap.xml`, JSON-LD in every page head.

## Run locally

```bash
npm ci
npm run dev
```

Opens http://localhost:8765. `npm run build` writes `_site/`. The build fails if any output contains the word `TODO`, so placeholders never reach the site.

## Where to edit

- **Every fact and sentence**: `content/fund.json`. The home page copy is under `home`, the investors page under `investors`, the agent instructions and application schema under `agents`, shared facts (check, program, criteria, portfolio, FAQ, team) at the top level. All pages and machine files render from this file; nothing is hardcoded in templates except layout.
- **Mode labels and URLs**: `content/site.json`. `api_base_url` is reserved for the future application API.
- **Templates**: `src/*.njk` (pages), `src/_includes/home.njk` (layout, header with the mode switcher, footer with legal lines), `src/_includes/agents-body.njk` (the text shared by `/agents/`, `agents.md` and `llms-full.txt`), `src/_includes/jsonld.njk`.
- **Styles**: `src/assets/hero.css` (shared tokens), `home.css` (founders page and shared components), `investors.css`, `agents.css`. Fonts: Urbanist, Inter, JetBrains Mono from Google Fonts.
- **Scripts**: `src/assets/home.js`. Every animation is gated on the `js` class on `<html>`; the page is complete without scripts.
- **Portfolio**: add a logo to `portfolio-logos/` (max 64px) and an entry in `fund.json → portfolio.companies`.

## Deploy

GitHub Pages must be set to **GitHub Actions** (Settings → Pages → Source) and the workflow moved to `.github/workflows/pages.yml` (it is kept as `deploy-pages.yml` in the repo root because the push token lacked the `workflow` scope). Do both before merging this branch: the legacy branch build would break on the Nunjucks templates. Asset URLs carry a content hash (`?v=`) for cache busting.
