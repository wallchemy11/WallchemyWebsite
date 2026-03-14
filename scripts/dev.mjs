import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

function tryRemoveDir(dirPath) {
  fs.rmSync(dirPath, {
    recursive: true,
    force: true,
    maxRetries: 6,
    retryDelay: 120
  });
}

function tryRemoveFile(filePath) {
  try {
    fs.rmSync(filePath, { force: true });
  } catch {
    // No-op
  }
}

function cleanNextCaches() {
  // Use targeted cleanup instead of removing the entire .next directory.
  // This is more reliable in synced/macOS Desktop locations where rm -r can
  // intermittently hang or throw ENOTEMPTY.
  tryRemoveDir(path.join(nextDir, "cache", "webpack"));
  tryRemoveDir(path.join(nextDir, "server", "app"));
  tryRemoveDir(path.join(nextDir, "server", "pages"));
  tryRemoveDir(path.join(nextDir, "static", "chunks", "app"));
  tryRemoveFile(path.join(nextDir, "app-build-manifest.json"));
  tryRemoveFile(path.join(nextDir, "build-manifest.json"));
  tryRemoveFile(path.join(nextDir, "react-loadable-manifest.json"));
  tryRemoveFile(path.join(nextDir, "server", "middleware-manifest.json"));
  tryRemoveFile(path.join(nextDir, "server", "pages-manifest.json"));
  fs.mkdirSync(nextDir, { recursive: true });
}

// Clean stale caches before starting Next.
cleanNextCaches();

const nodeMajor = Number(process.versions.node.split(".")[0]);
if (Number.isFinite(nodeMajor) && nodeMajor !== 20) {
  console.warn(
    `Warning: Detected Node ${process.versions.node}. This project targets Node 20.x for stable Next.js dev behavior.`
  );
}

const devArgs = [nextBin, "dev"];
if (Number.isFinite(nodeMajor) && nodeMajor !== 20) {
  // Turbopack is more stable than webpack dev on newer Node versions.
  devArgs.push("--turbo");
  console.warn("Using Turbopack fallback for non-Node20 runtime.");
}

const child = spawn(process.execPath, devArgs, { stdio: "inherit" });

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
