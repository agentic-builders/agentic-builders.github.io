import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export default function (eleventyConfig) {
  // Non-HTML outputs (llms*.txt, vcf) must not be HTML-escaped; HTML templates escape explicitly where needed.
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: false });

  // Content: one JSON file is the source of truth for all modes and machine-readable files.
  eleventyConfig.addGlobalData("fund", () => JSON.parse(fs.readFileSync("content/fund.json", "utf8")));
  eleventyConfig.addGlobalData("site", () => JSON.parse(fs.readFileSync("content/site.json", "utf8")));
  eleventyConfig.addWatchTarget("content/");

  eleventyConfig.addPassthroughCopy({ "static": "/" });
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter("jsonInline", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("urlencode", (v) => encodeURIComponent(v));
  eleventyConfig.addFilter("isTodo", (v) => typeof v === "string" && /\bTODO\b/.test(v));
  eleventyConfig.addFilter("byName", (companies, names) => names.map((n) => companies.find((c) => c.name === n)).filter(Boolean));
  eleventyConfig.addFilter("escape", (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  eleventyConfig.addFilter("crlf", (v) => String(v).replace(/\r?\n/g, "\r\n"));
  // Explicit index.html links also work when opening the generated site from disk.
  eleventyConfig.addFilter("relativeUrl", (url, pageUrl) => {
    // A hosted 404 may be served at any URL depth, so it needs root-relative URLs.
    if (!url.startsWith("/") || url.startsWith("//") || pageUrl === "/404.html") return url;
    const [, pathname, suffix] = url.match(/^([^?#]*)(.*)$/);
    let target = pathname;
    if (target.endsWith("/")) target += "index.html";
    else if (!path.posix.extname(target)) target += "/index.html";
    const current = pageUrl.endsWith("/") ? pageUrl + "index.html" : pageUrl;
    return path.posix.relative(path.posix.dirname(current), target) + suffix;
  });
  // Cache busting: append a short content hash to asset URLs.
  eleventyConfig.addFilter("hashed", (url) => {
    const file = url.replace(/^\//, "");
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
    dir: { input: "pages", includes: "_includes", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
