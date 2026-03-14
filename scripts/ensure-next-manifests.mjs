import path from "node:path";
import fs from "node:fs";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const serverDir = path.join(nextDir, "server");
const staticDir = path.join(nextDir, "static");
const cacheDir = path.join(nextDir, "cache");
const webpackCacheDir = path.join(cacheDir, "webpack");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// Keep only directory bootstrap. Do NOT write manifest placeholders:
// writing empty pages/middleware manifests can break chunk resolution and /_document lookups.
ensureDir(serverDir);
ensureDir(staticDir);
ensureDir(cacheDir);
// Work around cases where webpack tries to write pack files into non-existent directories.
ensureDir(path.join(webpackCacheDir, "client-development"));
ensureDir(path.join(webpackCacheDir, "server-development"));
ensureDir(path.join(webpackCacheDir, "client-production"));
ensureDir(path.join(webpackCacheDir, "server-production"));

