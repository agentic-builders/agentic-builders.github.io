# Agentic Builders

Website for Agentic Builders: https://agenticbuilders.ai

Static site served by GitHub Pages from the `main` branch (custom domain in `CNAME`).

## Structure

- `index.html` — the single landing page (thesis, who we back, how it works, portfolio, FAQ, contact)
- `assets/style.css`, `assets/main.js` — styles and progressive enhancements (scroll reveal, hero network animation, marquee, FAQ). No build step, no frameworks.
- `brand/` — brand page and logo files
- `portfolio-logos/` — portfolio company logos
- `llms.txt`, `llms-full.txt` — machine-readable summaries for AI answer engines (GEO)
- `robots.txt`, `sitemap.xml` — crawler configuration; AI search bots are explicitly allowed
- `404.html` — not-found page
- `og-image-generate.sh` — regenerates `og-image.png` (needs ImageMagick 7 and the brand fonts)

## Editing

- Portfolio: add a logo to `portfolio-logos/`, then add a card in the Portfolio section, a logo in the marquee, an entry in the `ItemList` JSON-LD, and a line in both `llms*.txt`. Update the "Portfolio last updated" date.
- Copy changes: keep the FAQ text, the `FAQPage` JSON-LD and `llms-full.txt` in sync.
- Dates: `dateModified` in JSON-LD, the footer "Last updated" line, and `<lastmod>` in `sitemap.xml` should match.
- Cache busting: bump the `?v=` query on the CSS/JS links in `index.html` and `404.html`.
