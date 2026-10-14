import fs from "node:fs";
import path from "node:path";

export default function (eleventyConfig) {
  // Content: one JSON file is the source of truth for all modes and machine-readable files.
  eleventyConfig.addGlobalData("fund", () => JSON.parse(fs.readFileSync("content/fund.json", "utf8")));
  eleventyConfig.addGlobalData("site", () => JSON.parse(fs.readFileSync("content/site.json", "utf8")));
  eleventyConfig.addWatchTarget("content/");

  // Static assets copied as-is.
  for (const p of ["brand", "portfolio-logos", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "og-image.png", "CNAME"]) {
    eleventyConfig.addPassthroughCopy(p);
  }
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Filters used by templates.
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter("jsonInline", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("urlencode", (v) => encodeURIComponent(v));
  eleventyConfig.addFilter("isTodo", (v) => typeof v === "string" && /\bTODO\b/.test(v));
  eleventyConfig.addFilter("pad", (v, n) => String(v).padEnd(n));
  eleventyConfig.addFilter("byName", (companies, names) => names.map((n) => companies.find((c) => c.name === n)).filter(Boolean));

  // Generate TODO.md next to the build so the team can fill everything in one pass.
  eleventyConfig.on("eleventy.after", () => {
    const fund = JSON.parse(fs.readFileSync("content/fund.json", "utf8"));
    const site = JSON.parse(fs.readFileSync("content/site.json", "utf8"));
    const rows = [];
    const walk = (node, trail) => {
      if (typeof node === "string") {
        if (/\bTODO\b/.test(node)) rows.push({ kind: "TODO", path: trail, text: node });
        else if (/\bconfirm\b/i.test(node) && /note|source/.test(trail)) rows.push({ kind: "CONFIRM", path: trail, text: node });
      } else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${trail}[${i}]`));
      else if (node && typeof node === "object") Object.entries(node).filter(([k]) => !k.startsWith("_")).forEach(([k, v]) => walk(v, trail ? `${trail}.${k}` : k));
    };
    walk(fund, "fund.json");
    walk(site, "site.json");
    const lines = [
      "# TODO list for the site draft",
      "",
      `Generated from \`content/fund.json\` and \`content/site.json\` on build (${new Date().toISOString().slice(0, 10)}). Fill the values in the JSON files; this file is regenerated on every build.`,
      "",
      "| # | Kind | Where | Text |",
      "|---|---|---|---|",
      ...rows.map((r, i) => `| ${i + 1} | ${r.kind} | \`${r.path}\` | ${r.text.replace(/\|/g, "\\|")} |`),
      "",
      "## Not in the content file",
      "",
      "- OG images per mode are placeholders (`og-image.png` reused).",
      "- Team photos: add files to `brand/team/` and set `team[].photo`.",
      "- The 'upload a deck, the application fills itself' feature: placeholder block only (`src/index.njk`, section Apply).",
      "- GitHub Pages must be switched from 'Deploy from a branch' to 'GitHub Actions' before this branch is merged (see README).",
    ];
    fs.writeFileSync(path.join("TODO.md"), lines.join("\n") + "\n");
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
