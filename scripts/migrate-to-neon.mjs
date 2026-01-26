import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const root = process.cwd();
const dataDir = path.join(root, "data");
const schemaPath = path.join(root, "lib/db/schema.sql");

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
const args = process.argv.slice(2);
const shouldInit = args.includes("--init");

function readJson(filePath) {
  const fullPath = path.join(dataDir, filePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

async function runSchema() {
  const schema = fs.readFileSync(schemaPath, "utf-8");
  const withoutComments = schema
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");
  const statements = withoutComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const statement of statements) {
    try {
      await db.query(statement, []);
    } catch (error) {
      if (!String(error?.message || "").includes("already exists")) {
        console.warn("Schema warning:", error?.message || error);
      }
    }
  }

  await db.query("ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS palette JSONB DEFAULT '{}'", []);
}

async function upsertPage(slug, data) {
  const { seo = {}, ...content } = data || {};
  const title = data?.title || slug;
  await db.query(
    `INSERT INTO pages (slug, title, content, seo, updated_at)
     VALUES ($1, $2, $3::jsonb, $4::jsonb, NOW())
     ON CONFLICT (slug)
     DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content, seo = EXCLUDED.seo, updated_at = NOW()`,
    [slug, title, JSON.stringify(content), JSON.stringify(seo)]
  );
}

async function upsertProject(project) {
  await db.query(
    `INSERT INTO projects (title, slug, location, area_sq_ft, hero_image_url, atmosphere_note, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     ON CONFLICT (slug)
     DO UPDATE SET title = EXCLUDED.title, location = EXCLUDED.location, area_sq_ft = EXCLUDED.area_sq_ft,
       hero_image_url = EXCLUDED.hero_image_url, atmosphere_note = EXCLUDED.atmosphere_note, updated_at = NOW()`,
    [
      project.title,
      project.slug,
      project.location || null,
      project.areaSqFt || null,
      project.heroImageUrl || null,
      project.atmosphereNote || null
    ]
  );
}

async function upsertCollection(collection) {
  await db.query(
    `INSERT INTO collections (title, slug, hero_image_url, short_description, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (slug)
     DO UPDATE SET title = EXCLUDED.title, hero_image_url = EXCLUDED.hero_image_url,
       short_description = EXCLUDED.short_description, updated_at = NOW()`,
    [
      collection.title,
      collection.slug,
      collection.heroImageUrl || null,
      collection.shortDescription || null
    ]
  );
}

async function setFeaturedFromHome(home) {
  const projectSlugs = home?.selectedProjectSlugs || [];
  const collectionSlugs = home?.textureHighlightSlugs || [];

  await db.query("DELETE FROM home_featured_projects", []);
  for (let i = 0; i < projectSlugs.length; i += 1) {
    const rows = await db.query("SELECT id FROM projects WHERE slug = $1 LIMIT 1", [projectSlugs[i]]);
    if (rows[0]) {
      await db.query("INSERT INTO home_featured_projects (project_id, display_order) VALUES ($1, $2)", [
        rows[0].id,
        i
      ]);
    }
  }

  await db.query("DELETE FROM home_featured_collections", []);
  for (let i = 0; i < collectionSlugs.length; i += 1) {
    const rows = await db.query("SELECT id FROM collections WHERE slug = $1 LIMIT 1", [collectionSlugs[i]]);
    if (rows[0]) {
      await db.query("INSERT INTO home_featured_collections (collection_id, display_order) VALUES ($1, $2)", [
        rows[0].id,
        i
      ]);
    }
  }
}

async function upsertSettings(settings) {
  const palette = settings?.palette || {};
  await db.query(
    `INSERT INTO site_settings (id, palette, updated_at)
     VALUES (1, $1::jsonb, NOW())
     ON CONFLICT (id)
     DO UPDATE SET palette = EXCLUDED.palette, updated_at = NOW()`,
    [JSON.stringify(palette)]
  );
}

async function migrate() {
  if (shouldInit) {
    await runSchema();
  }

  const home = readJson("pages/home.json");
  const about = readJson("pages/about.json");
  const textures = readJson("pages/textures.json");
  const processPage = readJson("pages/process.json");
  const projectsPage = readJson("pages/projects.json");
  const contact = readJson("pages/contact.json");
  const settings = readJson("settings.json");

  await upsertPage("home", home);
  await upsertPage("about", about);
  await upsertPage("textures", textures);
  await upsertPage("process", processPage);
  await upsertPage("projects", projectsPage);
  await upsertPage("contact", contact);
  await upsertSettings(settings);

  const projectsDir = path.join(dataDir, "projects");
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const project = JSON.parse(fs.readFileSync(path.join(projectsDir, file), "utf-8"));
      await upsertProject(project);
    }
  }

  const collectionsDir = path.join(dataDir, "collections");
  if (fs.existsSync(collectionsDir)) {
    const files = fs.readdirSync(collectionsDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const collection = JSON.parse(fs.readFileSync(path.join(collectionsDir, file), "utf-8"));
      await upsertCollection(collection);
    }
  }

  await setFeaturedFromHome(home);

  console.log("Migration completed.");
}

await migrate();
