const fs = require("fs");
const path = require("path");

function ensureDir(target) {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch {
    // No-op: we'll let Next handle any remaining errors.
  }
}

function ensureJsonFile(target, value) {
  try {
    fs.writeFileSync(target, JSON.stringify(value, null, 2), "utf8");
  } catch {
    // No-op: we'll let Next handle any remaining errors.
  }
}

function ensureNextManifests() {
  const root = process.cwd();
  const nextDir = path.join(root, ".next");
  const serverDir = path.join(nextDir, "server");
  const staticDir = path.join(nextDir, "static");
  const cacheDir = path.join(nextDir, "cache");
  const webpackCacheDir = path.join(cacheDir, "webpack");

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

ensureNextManifests();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Workaround for intermittent filesystem cache ENOENT issues that can break dev
    // (missing .pack.gz / missing chunks leading to /_next/static 404s).
    if (dev) config.cache = { type: "memory" };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com"
      }
    ]
  }
};

module.exports = nextConfig;
