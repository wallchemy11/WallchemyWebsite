import { getDb } from "./index";

async function queryRows<T = any>(text: string, params: any[] = []) {
  const db = getDb();
  const result: any = await db.query(text, params);
  if (Array.isArray(result)) return result as T[];
  if (Array.isArray(result?.rows)) return result.rows as T[];
  return [];
}

// Helper to handle JSON
function jsonStringify(value: any) {
  return JSON.stringify(value);
}

// Pages
export async function getPage(slug: string) {
  const result = await queryRows("SELECT * FROM pages WHERE slug = $1 LIMIT 1", [slug]);
  return result[0] || null;
}

export async function savePage(slug: string, title: string, content: any, seo: any) {
  const db = getDb();
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
  return await queryRows("SELECT * FROM projects ORDER BY display_order ASC, created_at DESC", []);
}

export async function getFeaturedProjects() {
  return await queryRows(
    `SELECT p.* FROM projects p
     INNER JOIN home_featured_projects hfp ON p.id = hfp.project_id
     ORDER BY hfp.display_order ASC`,
    []
  );
}

export async function getProject(slug: string) {
  const result = await queryRows("SELECT * FROM projects WHERE slug = $1 LIMIT 1", [slug]);
  return result[0] || null;
}

export async function getProjectIdBySlug(slug: string) {
  const result = await queryRows<{ id: number }>("SELECT id FROM projects WHERE slug = $1 LIMIT 1", [slug]);
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
    const db = getDb();
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
    const result = await queryRows<{ id: number }>(
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
  const db = getDb();
  await db.query("DELETE FROM projects WHERE id = $1", [id]);
}

export async function setFeaturedProjects(projectIds: number[]) {
  const db = getDb();
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
  return await queryRows("SELECT * FROM collections ORDER BY display_order ASC, created_at DESC", []);
}

export async function getFeaturedCollections() {
  return await queryRows(
    `SELECT c.* FROM collections c
     INNER JOIN home_featured_collections hfc ON c.id = hfc.collection_id
     ORDER BY hfc.display_order ASC`,
    []
  );
}

export async function getCollection(slug: string) {
  const result = await queryRows("SELECT * FROM collections WHERE slug = $1 LIMIT 1", [slug]);
  return result[0] || null;
}

export async function getCollectionIdBySlug(slug: string) {
  const result = await queryRows<{ id: number }>("SELECT id FROM collections WHERE slug = $1 LIMIT 1", [slug]);
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
    const db = getDb();
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
    const result = await queryRows<{ id: number }>(
      `INSERT INTO collections (title, slug, hero_image_url, short_description, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [data.title, data.slug, data.heroImageUrl || null, data.shortDescription || null, data.displayOrder || 0]
    );
    return result[0]?.id;
  }
}

export async function deleteCollection(id: number) {
  const db = getDb();
  await db.query("DELETE FROM collections WHERE id = $1", [id]);
}

export async function setFeaturedCollections(collectionIds: number[]) {
  const db = getDb();
  await db.query("DELETE FROM home_featured_collections", []);
  for (let i = 0; i < collectionIds.length; i++) {
    await db.query("INSERT INTO home_featured_collections (collection_id, display_order) VALUES ($1, $2)", [
      collectionIds[i],
      i
    ]);
  }
}

// Selected Work
export async function getAllSelectedWork() {
  return await queryRows(
    "SELECT * FROM selected_work ORDER BY display_order ASC, created_at DESC",
    []
  );
}

export async function getFeaturedSelectedWork() {
  return await queryRows(
    `SELECT sw.* FROM selected_work sw
     INNER JOIN home_featured_selected_work hfsw ON sw.id = hfsw.selected_work_id
     ORDER BY hfsw.display_order ASC`,
    []
  );
}

export async function getSelectedWorkIdBySlug(slug: string) {
  const result = await queryRows<{ id: number }>(
    "SELECT id FROM selected_work WHERE slug = $1 LIMIT 1",
    [slug]
  );
  return result[0]?.id || null;
}

export async function saveSelectedWork(data: {
  id?: number;
  title: string;
  slug: string;
  heroImageUrl?: string;
  description?: string;
  displayOrder?: number;
}) {
  if (data.id) {
    const db = getDb();
    await db.query(
      `UPDATE selected_work SET
       title = $1, slug = $2, hero_image_url = $3, description = $4,
       display_order = $5, updated_at = NOW()
       WHERE id = $6`,
      [
        data.title,
        data.slug,
        data.heroImageUrl || null,
        data.description || null,
        data.displayOrder || 0,
        data.id
      ]
    );
    return data.id;
  } else {
    const result = await queryRows<{ id: number }>(
      `INSERT INTO selected_work (title, slug, hero_image_url, description, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [data.title, data.slug, data.heroImageUrl || null, data.description || null, data.displayOrder || 0]
    );
    return result[0]?.id;
  }
}

export async function deleteSelectedWork(id: number) {
  const db = getDb();
  await db.query("DELETE FROM selected_work WHERE id = $1", [id]);
}

export async function setFeaturedSelectedWork(ids: number[]) {
  const db = getDb();
  await db.query("DELETE FROM home_featured_selected_work", []);
  for (let i = 0; i < ids.length; i++) {
    await db.query(
      "INSERT INTO home_featured_selected_work (selected_work_id, display_order) VALUES ($1, $2)",
      [ids[i], i]
    );
  }
}

// Material Library
export async function getAllMaterialLibraryItems() {
  return await queryRows(
    "SELECT * FROM material_library ORDER BY display_order ASC, created_at DESC",
    []
  );
}

export async function getFeaturedMaterialLibraryItems() {
  return await queryRows(
    `SELECT ml.* FROM material_library ml
     INNER JOIN home_featured_material_library hfml ON ml.id = hfml.material_library_id
     ORDER BY hfml.display_order ASC`,
    []
  );
}

export async function getMaterialLibraryIdBySlug(slug: string) {
  const result = await queryRows<{ id: number }>(
    "SELECT id FROM material_library WHERE slug = $1 LIMIT 1",
    [slug]
  );
  return result[0]?.id || null;
}

export async function saveMaterialLibraryItem(data: {
  id?: number;
  title: string;
  slug: string;
  heroImageUrl?: string;
  description?: string;
  displayOrder?: number;
}) {
  if (data.id) {
    const db = getDb();
    await db.query(
      `UPDATE material_library SET
       title = $1, slug = $2, hero_image_url = $3, description = $4,
       display_order = $5, updated_at = NOW()
       WHERE id = $6`,
      [
        data.title,
        data.slug,
        data.heroImageUrl || null,
        data.description || null,
        data.displayOrder || 0,
        data.id
      ]
    );
    return data.id;
  } else {
    const result = await queryRows<{ id: number }>(
      `INSERT INTO material_library (title, slug, hero_image_url, description, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [data.title, data.slug, data.heroImageUrl || null, data.description || null, data.displayOrder || 0]
    );
    return result[0]?.id;
  }
}

export async function deleteMaterialLibraryItem(id: number) {
  const db = getDb();
  await db.query("DELETE FROM material_library WHERE id = $1", [id]);
}

export async function setFeaturedMaterialLibraryItems(ids: number[]) {
  const db = getDb();
  await db.query("DELETE FROM home_featured_material_library", []);
  for (let i = 0; i < ids.length; i++) {
    await db.query(
      "INSERT INTO home_featured_material_library (material_library_id, display_order) VALUES ($1, $2)",
      [ids[i], i]
    );
  }
}

// Site Settings
export async function getSiteSettings() {
  const result = await queryRows("SELECT * FROM site_settings WHERE id = 1 LIMIT 1", []);
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
  const db = getDb();
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
