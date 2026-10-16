import fs from "node:fs";

// docs/ contains only generated files and is GitHub Pages' publishing folder.
// Eleventy finishes (including the placeholder guard) before this script runs.
fs.rmSync("docs", { recursive: true, force: true });
fs.cpSync("_site", "docs", { recursive: true });
