import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const serverDir = path.join(nextDir, "server");
const staticDir = path.join(nextDir, "static");
const cacheDir = path.join(nextDir, "cache");
const webpackCacheDir = path.join(cacheDir, "webpack");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function ensureJsonFile(p, value) {
  // Always write to ensure the file exists with correct structure
  fs.writeFileSync(p, JSON.stringify(value, null, 2), "utf8");
}

// Next 14 can sometimes crash if these manifests are missing during the first request.
// Creating placeholders avoids hard 500s; Next will overwrite them when it finishes compiling.
ensureDir(serverDir);
ensureDir(staticDir);
ensureDir(cacheDir);
// Work around cases where webpack tries to write pack files into non-existent directories.
ensureDir(path.join(webpackCacheDir, "client-development"));
ensureDir(path.join(webpackCacheDir, "server-development"));
ensureDir(path.join(webpackCacheDir, "client-production"));
ensureDir(path.join(webpackCacheDir, "server-production"));

// Create middleware manifest - Next.js 14.2.35 requires this even without middleware
ensureJsonFile(path.join(serverDir, "middleware-manifest.json"), {
  sortedMiddleware: [],
  middleware: {},
  functions: {}
});

// Create pages manifest with proper structure
ensureJsonFile(path.join(serverDir, "pages-manifest.json"), {});

