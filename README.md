# Agentic Builders — website

https://agenticbuilders.ai. Static site, three modes for three audiences, built with [Eleventy](https://www.11ty.dev/) from one content file.

## Modes

| URL | Audience | Header action |
|---|---|---|
| `/` | Founders | Apply |
| `/agents/` | AI agents acting for a person | Download agents.md |
| `/investors/` | Investors | Meet us |

Generated files: `/agents.md`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/agenticbuilders.vcf`, `/sitemap.xml`, JSON-LD in every page head.

## Run locally

```bash
npm ci
npm run dev
```

Opens http://localhost:8765. `npm run build` writes `_site/` and regenerates `TODO.md`.

## Where to edit

- **Facts** (fund, program, terms, criteria, portfolio, FAQ, team, application schema, agent instructions): `content/fund.json`. Everything on all three pages and in all machine-readable files comes from here, so the agent version can never drift from the human one.
- **Hero headline variant**: `content/site.json` → `hero_variant` (1, 2 or 3; the texts are in `hero_variants`).
- **Mode labels and header actions**: `content/site.json` → `modes`.
- **Templates**: `src/*.njk` (pages), `src/_includes/` (layout, header with mode switcher, footer, JSON-LD).
- **Styles**: `src/assets/draft.css` (typography and grid only; visual design comes later). Places for visuals are marked with `VISUAL: …` blocks.
- **TODOs**: `TODO.md` is generated on every build from every `TODO` and `confirm` note in the content files.

## Why Eleventy

No build step existed in this repository. Eleventy was chosen over Astro because it is a single dev dependency, needs no framework code, renders plain HTML from Nunjucks templates, and emits non-HTML files (Markdown, text, vCard, XML) from the same data with a `permalink`. The output is static and works on GitHub Pages.

## Deploy

GitHub Pages is currently set to "Deploy from a branch" (main, root). This branch needs the Pages source switched to **GitHub Actions** (Settings → Pages → Source) and `deploy-pages.yml` moved to `.github/workflows/pages.yml` (the file sits in the repo root because the push token had no `workflow` scope) so it builds `_site/` on push to `main`. Do this before merging; until then the branch is a draft.
