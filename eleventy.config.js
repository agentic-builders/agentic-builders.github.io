import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export default function (eleventyConfig) {
  // Non-HTML outputs (agents.md, llms*.txt, vcf) must not be HTML-escaped; HTML templates escape explicitly where needed.
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: false });

  // Content: one JSON file is the source of truth for all modes and machine-readable files.
  eleventyConfig.addGlobalData("fund", () => JSON.parse(fs.readFileSync("content/fund.json", "utf8")));
  eleventyConfig.addGlobalData("site", () => JSON.parse(fs.readFileSync("content/site.json", "utf8")));
  eleventyConfig.addWatchTarget("content/");

  for (const p of ["brand", "portfolio-logos", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "og-image.png", "CNAME", ".nojekyll"]) {
    eleventyConfig.addPassthroughCopy(p);
  }
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter("jsonInline", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("urlencode", (v) => encodeURIComponent(v));
  eleventyConfig.addFilter("isTodo", (v) => typeof v === "string" && /\bTODO\b/.test(v));
  eleventyConfig.addFilter("byName", (companies, names) => names.map((n) => companies.find((c) => c.name === n)).filter(Boolean));
  eleventyConfig.addFilter("escape", (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  eleventyConfig.addFilter("crlf", (v) => String(v).replace(/\r?\n/g, "\r\n"));
  // Cache busting: append a short content hash to asset URLs.
  eleventyConfig.addFilter("hashed", (url) => {
    const file = path.join("src", url);
    if (!fs.existsSync(file)) return url;
    const h = crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
    return `${url}?v=${h}`;
  });

  // Guard: no TODO text may reach the published site.
  eleventyConfig.on("eleventy.after", ({ results }) => {
    const leaks = [];
    for (const r of results) {
      if (/\bTODO\b/.test(r.content)) leaks.push(r.outputPath);
    }
    if (leaks.length) throw new Error("TODO text would be published in: " + leaks.join(", "));
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
