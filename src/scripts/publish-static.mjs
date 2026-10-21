import fs from "node:fs";

// docs/ contains only generated files and is GitHub Pages' publishing folder.
// Eleventy finishes (including the placeholder guard) before this script runs.
const published = new URL("../../docs/", import.meta.url);
const built = new URL("../_site/", import.meta.url);
fs.rmSync(published, { recursive: true, force: true });
fs.cpSync(built, published, { recursive: true });
