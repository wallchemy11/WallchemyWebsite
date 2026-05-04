import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const root = process.cwd();

function loadEnvFile(filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [key, ...rest] = line.split("=");
    const value = rest.join("=").replace(/^"|"$/g, "").replace(/^'|'$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const db = neon(dbUrl);

const palette = {
  ink: "#3e3630",       // Dune
  alabaster: "#ece0d9", // Pearl Bush
  brass: "#c1b4a0",     // Campagne
  smoke: "#a0948b",     // Mountain Mist
  ember: "#d2d0cd"      // Soho Grey
};

const typography = {
  displayFont: "lancea",
  bodyFont: "kindsans",
  textColor: "#ece0d9"
};

const heroOverlay = {
  color: "#3e3630",
  opacity: 0.55
};

async function ensureColumns() {
  await db.query(
    `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS typography JSONB DEFAULT '{}'::jsonb`
  );
  await db.query(
    `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_overlay JSONB DEFAULT '{}'::jsonb`
  );
}

async function applySettings() {
  await db.query(
    `INSERT INTO site_settings (id, palette, typography, hero_overlay, updated_at)
     VALUES (1, $1::jsonb, $2::jsonb, $3::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET
       palette = EXCLUDED.palette,
       typography = EXCLUDED.typography,
       hero_overlay = EXCLUDED.hero_overlay,
       updated_at = NOW()`,
    [JSON.stringify(palette), JSON.stringify(typography), JSON.stringify(heroOverlay)]
  );
}

async function applyPageBackgrounds() {
  // Update each page's content.backgroundColor in pages table to Dune.
  const slugs = ["home", "about", "textures", "process", "projects", "contact"];
  for (const slug of slugs) {
    await db.query(
      `UPDATE pages
       SET content = jsonb_set(COALESCE(content, '{}'::jsonb), '{backgroundColor}', $2::jsonb, true),
           updated_at = NOW()
       WHERE slug = $1`,
      [slug, JSON.stringify(palette.ink)]
    );
  }
}

async function main() {
  console.log("Applying brand defaults to Neon DB…");
  await ensureColumns();
  await applySettings();
  console.log("  ✓ site_settings updated (palette, typography, heroOverlay)");
  await applyPageBackgrounds();
  console.log("  ✓ page backgroundColor set to Dune (#3e3630) for all pages");
  console.log("Done.");
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
