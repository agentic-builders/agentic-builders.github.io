import fs from "node:fs";
import path from "node:path";

// Commit the built site at the repository root, where GitHub Pages serves it.
// Eleventy finishes (including the placeholder guard) before this script runs.
for (const entry of fs.readdirSync("_site")) {
  fs.cpSync(path.join("_site", entry), entry, { recursive: true });
}
