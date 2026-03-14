#!/usr/bin/env node
/**
 * Copies texture images from "Wallchemy Pictures/<Texture Name>/" into
 * public/textures/<slug>/ as <slug>-1.jpg, <slug>-2.jpg, etc.
 * Run from project root: node scripts/copy-texture-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "Wallchemy Pictures");
const targetDir = path.join(root, "public", "textures");

const folderToSlug = {
  "Velvet Lime": "velvet-lime",
  "Aurora Metal": "aurora-metal",
  "Raw Terra": "raw-terra",
  "Infinity Flow": "infinity-flow",
  "Venetian Glow": "venetian-glow"
};

if (!fs.existsSync(sourceDir)) {
  console.error("Source not found:", sourceDir);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let total = 0;
for (const [folderName, slug] of Object.entries(folderToSlug)) {
  const srcFolder = path.join(sourceDir, folderName);
  if (!fs.existsSync(srcFolder)) {
    console.warn("Skip (folder not found):", folderName);
    continue;
  }
  const destFolder = path.join(targetDir, slug);
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
  }
  const files = fs.readdirSync(srcFolder).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  files.forEach((file, i) => {
    const ext = path.extname(file).toLowerCase();
    const destName = `${slug}-${i + 1}${ext}`;
    const srcPath = path.join(srcFolder, file);
    const destPath = path.join(destFolder, destName);
    fs.copyFileSync(srcPath, destPath);
    console.log("Copied:", path.relative(root, srcPath), "->", path.relative(root, destPath));
    total++;
  });
}

console.log("\nDone. Total files copied:", total);
console.log("Hero images (used by default): /textures/<slug>/<slug>-1.jpg");
