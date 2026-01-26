import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const serverDir = path.join(nextDir, "server");
const staticDir = path.join(nextDir, "static");
const cacheDir = path.join(nextDir, "cache");
const webpackCacheDir = path.join(cacheDir, "webpack");

function ensureDir(target) {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch {
    // No-op
  }
}

function ensureJsonFile(target, value) {
  try {
    fs.writeFileSync(target, JSON.stringify(value, null, 2), "utf8");
  } catch {
    // No-op
  }
}

function ensureManifests() {
  ensureDir(serverDir);
  ensureDir(staticDir);
  ensureDir(cacheDir);
  ensureDir(path.join(webpackCacheDir, "client-development"));
  ensureDir(path.join(webpackCacheDir, "server-development"));
  ensureDir(path.join(webpackCacheDir, "client-production"));
  ensureDir(path.join(webpackCacheDir, "server-production"));

  ensureJsonFile(path.join(serverDir, "middleware-manifest.json"), {
    sortedMiddleware: [],
    middleware: {},
    functions: {}
  });

  ensureJsonFile(path.join(serverDir, "pages-manifest.json"), {});
}

function cleanNextCaches() {
  try {
    fs.rmSync(path.join(nextDir, "cache", "webpack"), { recursive: true, force: true });
  } catch {
    // No-op
  }
  try {
    fs.rmSync(path.join(nextDir, "server"), { recursive: true, force: true });
  } catch {
    // No-op
  }
}

// Clean stale caches before starting Next.
cleanNextCaches();

// Pre-create before starting Next.
ensureManifests();

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "dev"],
  { stdio: "inherit" }
);

// Keep ensuring manifests for the first 30s in case Next clears .next.
const timer = setInterval(() => {
  ensureManifests();
}, 100);

child.on("exit", (code) => {
  clearInterval(timer);
  process.exit(code ?? 0);
});
