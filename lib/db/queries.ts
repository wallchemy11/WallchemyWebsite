import { db } from "./index";

// Helper to handle JSON
function jsonStringify(value: any) {
  return JSON.stringify(value);
}

// Pages
export async function getPage(slug: string) {
  const result = await db.query("SELECT * FROM pages WHERE slug = $1 LIMIT 1", [slug]);
  return result[0] || null;
}

export async function savePage(slug: string, title: string, content: any, seo: any) {
  await db.query(
    `INSERT INTO pages (slug, title, content, seo, updated_at)
     VALUES ($1, $2, $3::jsonb, $4::jsonb, NOW())
     ON CONFLICT (slug) 
     DO UPDATE SET 
       title = EXCLUDED.title,
       content = EXCLUDED.content,
       seo = EXCLUDED.seo,
       updated_at = NOW()`,
    [slug, title, jsonStringify(content), jsonStringify(seo)]
  );
}

// Projects
export async function getAllProjects() {
  return await db.query("SELECT * FROM projects ORDER BY display_order ASC, created_at DESC", []);
}

export async function getFeaturedProjects() {
  return await db.query(
    `SELECT p.* FROM projects p
     INNER JOIN home_featured_projects hfp ON p.id = hfp.project_id
     ORDER BY hfp.display_order ASC`,
    []
  );
}

export async function getProject(slug: string) {
  const result = await db.query("SELECT * FROM projects WHERE slug = $1 LIMIT 1", [slug]);
  return result[0] || null;
}

export async function getProjectIdBySlug(slug: string) {
  const result = await db.query("SELECT id FROM projects WHERE slug = $1 LIMIT 1", [slug]);
  return result[0]?.id || null;
}

export async function saveProject(data: {
  id?: number;
  title: string;
  slug: string;
  location?: string;
  areaSqFt?: number;
  heroImageUrl?: string;
  atmosphereNote?: string;
  displayOrder?: number;
  isFeatured?: boolean;
}) {
  if (data.id) {
    await db.query(
      `UPDATE projects SET
       title = $1, slug = $2, location = $3, area_sq_ft = $4, hero_image_url = $5,
       atmosphere_note = $6, display_order = $7, is_featured = $8, updated_at = NOW()
       WHERE id = $9`,
      [
        data.title,
        data.slug,
        data.location || null,
        data.areaSqFt || null,
        data.heroImageUrl || null,
        data.atmosphereNote || null,
        data.displayOrder || 0,
        data.isFeatured || false,
        data.id
      ]
    );
    return data.id;
  } else {
    const result = await db.query(
      `INSERT INTO projects (title, slug, location, area_sq_ft, hero_image_url, atmosphere_note, display_order, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        data.title,
        data.slug,
        data.location || null,
        data.areaSqFt || null,
        data.heroImageUrl || null,
        data.atmosphereNote || null,
        data.displayOrder || 0,
        data.isFeatured || false
      ]
    );
    return result[0]?.id;
  }
}

export async function deleteProject(id: number) {
  await db.query("DELETE FROM projects WHERE id = $1", [id]);
}

export async function setFeaturedProjects(projectIds: number[]) {
  await db.query("DELETE FROM home_featured_projects", []);
  for (let i = 0; i < projectIds.length; i++) {
    await db.query("INSERT INTO home_featured_projects (project_id, display_order) VALUES ($1, $2)", [
      projectIds[i],
      i
    ]);
  }
}

// Collections
export async function getAllCollections() {
  return await db.query("SELECT * FROM collections ORDER BY display_order ASC, created_at DESC", []);
}

export async function getFeaturedCollections() {
  return await db.query(
    `SELECT c.* FROM collections c
     INNER JOIN home_featured_collections hfc ON c.id = hfc.collection_id
     ORDER BY hfc.display_order ASC`,
    []
  );
}

export async function getCollection(slug: string) {
  const result = await db.query("SELECT * FROM collections WHERE slug = $1 LIMIT 1", [slug]);
  return result[0] || null;
}

export async function getCollectionIdBySlug(slug: string) {
  const result = await db.query("SELECT id FROM collections WHERE slug = $1 LIMIT 1", [slug]);
  return result[0]?.id || null;
}

export async function saveCollection(data: {
  id?: number;
  title: string;
  slug: string;
  heroImageUrl?: string;
  shortDescription?: string;
  displayOrder?: number;
}) {
  if (data.id) {
    await db.query(
      `UPDATE collections SET
       title = $1, slug = $2, hero_image_url = $3, short_description = $4, display_order = $5, updated_at = NOW()
       WHERE id = $6`,
      [
        data.title,
        data.slug,
        data.heroImageUrl || null,
        data.shortDescription || null,
        data.displayOrder || 0,
        data.id
      ]
    );
    return data.id;
  } else {
    const result = await db.query(
      `INSERT INTO collections (title, slug, hero_image_url, short_description, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [data.title, data.slug, data.heroImageUrl || null, data.shortDescription || null, data.displayOrder || 0]
    );
    return result[0]?.id;
  }
}

export async function deleteCollection(id: number) {
  await db.query("DELETE FROM collections WHERE id = $1", [id]);
}

export async function setFeaturedCollections(collectionIds: number[]) {
  await db.query("DELETE FROM home_featured_collections", []);
  for (let i = 0; i < collectionIds.length; i++) {
    await db.query("INSERT INTO home_featured_collections (collection_id, display_order) VALUES ($1, $2)", [
      collectionIds[i],
      i
    ]);
  }
}

// Site Settings
export async function getSiteSettings() {
  const result = await db.query("SELECT * FROM site_settings WHERE id = 1 LIMIT 1", []);
  if (result[0]) {
    return {
      palette: result[0].palette || {}
    };
  }
  return null;
}

export async function saveSiteSettings(data: {
  palette?: {
    ink?: string;
    alabaster?: string;
    brass?: string;
    smoke?: string;
    ember?: string;
  };
}) {
  await db.query(
    `INSERT INTO site_settings (id, palette, updated_at)
     VALUES (1, $1::jsonb, NOW())
     ON CONFLICT (id) 
     DO UPDATE SET 
      palette = EXCLUDED.palette,
       updated_at = NOW()`,
    [
      JSON.stringify(data.palette || {})
    ]
  );
}
