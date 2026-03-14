import "server-only";
import fs from "fs";
import path from "path";
import {
  getPage,
  getAllProjects as getAllProjectsFromDb,
  getFeaturedProjects,
  getAllCollections as getAllCollectionsFromDb,
  getFeaturedCollections,
  getSiteSettings as getSiteSettingsFromDb,
  savePage,
  saveProject as saveProjectToDb,
  saveCollection as saveCollectionToDb,
  saveSelectedWork as saveSelectedWorkToDb,
  saveMaterialLibraryItem as saveMaterialLibraryItemToDb,
  deleteProject as deleteProjectFromDb,
  deleteCollection as deleteCollectionFromDb,
  deleteSelectedWork as deleteSelectedWorkFromDb,
  deleteMaterialLibraryItem as deleteMaterialLibraryItemFromDb,
  setFeaturedProjects,
  setFeaturedCollections,
  setFeaturedSelectedWork,
  setFeaturedMaterialLibraryItems,
  getProjectIdBySlug,
  getCollectionIdBySlug,
  getSelectedWorkIdBySlug,
  getMaterialLibraryIdBySlug,
  getAllSelectedWork as getAllSelectedWorkFromDb,
  getAllMaterialLibraryItems as getAllMaterialLibraryItemsFromDb,
  getFeaturedSelectedWork,
  getFeaturedMaterialLibraryItems,
  saveSiteSettings as saveSiteSettingsToDb
} from "./db/queries";
import {
  defaultAboutPage,
  defaultContactPage,
  defaultHomePage,
  defaultProcessPage,
  defaultProjectsPage,
  defaultTexturesPage,
  defaultSiteSettings
} from "./cms-defaults";
import { FALLBACK_IMAGE } from "./hero";

function normalizeImageUrls(rawUrls: unknown): string[] {
  if (Array.isArray(rawUrls)) {
    return rawUrls.filter((u): u is string => typeof u === "string" && u.trim().length > 0);
  }

  if (typeof rawUrls === "string") {
    const trimmed = rawUrls.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      return normalizeImageUrls(parsed);
    } catch {
      return trimmed
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    }
  }

  if (rawUrls && typeof rawUrls === "object") {
    return Object.values(rawUrls)
      .filter((u): u is string => typeof u === "string" && u.trim().length > 0)
      .map((u) => u.trim());
  }

  return [];
}

function getExistingLocalTextureUrls(slug: string) {
  if (!slug) return [];
  const root = process.cwd();
  const urls: string[] = [];
  for (let i = 1; i <= 4; i += 1) {
    const rel = `/textures/${slug}/${slug}-${i}.jpg`;
    const full = path.join(root, "public", rel);
    if (fs.existsSync(full)) urls.push(rel);
  }
  return urls;
}

// Helper to transform database results
function transformProject(project: any) {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    location: project.location,
    areaSqFt: project.area_sq_ft,
    heroImage: project.hero_image_url,
    atmosphereNote: project.atmosphere_note
  };
}

function transformCollection(collection: any) {
  const slug = collection.slug || "";
  const urls = normalizeImageUrls(collection.image_urls);
  const localUrls = getExistingLocalTextureUrls(slug);
  const heroUrl =
    urls[0] ||
    localUrls[0] ||
    collection.hero_image_url ||
    FALLBACK_IMAGE;
  const mergedImages = Array.from(
    new Set([
      ...urls,
      ...localUrls,
      ...(collection.hero_image_url ? [collection.hero_image_url] : [])
    ])
  )
    .filter(Boolean)
    .slice(0, 4);
  return {
    id: collection.id,
    title: collection.title,
    slug,
    heroImage: heroUrl,
    images: mergedImages.length > 0 ? mergedImages : heroUrl ? [heroUrl] : [],
    shortDescription: collection.short_description
  };
}

function transformSelectedWork(item: any) {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    heroImage: item.hero_image_url,
    description: item.description
  };
}

function transformMaterialLibrary(item: any) {
  const slug = item.slug || "";
  const heroUrl = item.hero_image_url || FALLBACK_IMAGE;
  return {
    id: item.id,
    title: item.title,
    slug,
    heroImage: heroUrl,
    description: item.description
  };
}

// Home Page
export async function getHomePage() {
  try {
    const page = await getPage("home");
    if (page && page.content) {
      const featuredProjects = await getFeaturedProjects();
      const featuredCollections = await getFeaturedCollections();
      const featuredSelectedWork = await getFeaturedSelectedWork();
      const featuredMaterialLibrary = await getFeaturedMaterialLibraryItems();
      const allCollections = await getAllCollections();
      const allMaterialLibrary = await getAllMaterialLibraryItems();
      const resolvedCollections =
        featuredCollections.length > 0 ? featuredCollections : allCollections;
      const resolvedMaterialLibrary =
        featuredMaterialLibrary.length > 0
          ? featuredMaterialLibrary
          : allMaterialLibrary;
      
      return {
        ...page.content,
        selectedProjects: featuredProjects.map(transformProject),
        textureHighlights: resolvedCollections.map(transformCollection),
        selectedWork: featuredSelectedWork.map(transformSelectedWork),
        materialLibrary: resolvedMaterialLibrary.map(transformMaterialLibrary),
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching home page:", error);
  }
  return defaultHomePage;
}

// About Page
export async function getAboutPage() {
  try {
    const page = await getPage("about");
    if (page && page.content) {
      return {
        ...page.content,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching about page:", error);
  }
  return defaultAboutPage;
}

// Textures Page
export async function getTexturesPage() {
  try {
    const page = await getPage("textures");
    if (page && page.content) {
      const collections = await getAllCollections();
      return {
        ...page.content,
        collections: collections.map(transformCollection),
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching textures page:", error);
  }
  return defaultTexturesPage;
}

// Process Page
export async function getProcessPage() {
  try {
    const page = await getPage("process");
    if (page && page.content) {
      return {
        ...page.content,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching process page:", error);
  }
  return defaultProcessPage;
}

// Projects Page
export async function getProjectsPage() {
  try {
    const page = await getPage("projects");
    if (page && page.content) {
      const allProjects = await getAllProjects();
      const projects = allProjects.map(transformProject);
      const selectedWorkItems = (await getAllSelectedWork()).map(transformSelectedWork);
      return {
        ...page.content,
        selectedWorkItems,
        projects,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching projects page:", error);
  }
  return defaultProjectsPage;
}

// Contact Page
export async function getContactPage() {
  try {
    const page = await getPage("contact");
    if (page && page.content) {
      return {
        ...page.content,
        seo: page.seo || {}
      };
    }
  } catch (error) {
    console.error("Error fetching contact page:", error);
  }
  return defaultContactPage;
}

// Site Settings
export async function getSiteSettings() {
  try {
    const settings = await getSiteSettingsFromDb();
    if (settings) return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }
  return defaultSiteSettings;
}

function splitSeo(content: any) {
  const { seo = {}, ...rest } = content || {};
  return { seo, content: rest };
}

export async function saveHomePage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("home", data?.title || "Home", content, seo);
  if (Array.isArray(data?.selectedProjectSlugs)) {
    const ids: number[] = [];
    for (const slug of data.selectedProjectSlugs) {
      const id = await getProjectIdBySlug(slug);
      if (id) ids.push(id);
    }
    await setFeaturedProjects(ids);
  }
  if (Array.isArray(data?.textureHighlightSlugs)) {
    const ids: number[] = [];
    for (const slug of data.textureHighlightSlugs) {
      const id = await getCollectionIdBySlug(slug);
      if (id) ids.push(id);
    }
    await setFeaturedCollections(ids);
  }
  if (Array.isArray(data?.selectedWorkSlugs)) {
    const ids: number[] = [];
    for (const slug of data.selectedWorkSlugs) {
      const id = await getSelectedWorkIdBySlug(slug);
      if (id) ids.push(id);
    }
    await setFeaturedSelectedWork(ids);
  }
  if (Array.isArray(data?.materialLibrarySlugs)) {
    const ids: number[] = [];
    for (const slug of data.materialLibrarySlugs) {
      const id = await getMaterialLibraryIdBySlug(slug);
      if (id) ids.push(id);
    }
    await setFeaturedMaterialLibraryItems(ids);
  }
  return true;
}

export async function saveAboutPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("about", data?.title || "About", content, seo);
  return true;
}

export async function saveTexturesPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("textures", data?.title || "Textures", content, seo);
  return true;
}

export async function saveProcessPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("process", data?.title || "Process", content, seo);
  return true;
}

export async function saveProjectsPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("projects", data?.title || "Projects", content, seo);
  return true;
}

export async function saveContactPage(data: any) {
  const { seo, content } = splitSeo(data);
  await savePage("contact", data?.title || "Contact", content, seo);
  return true;
}

export async function saveSiteSettings(data: any) {
  await saveSiteSettingsToDb({ palette: data?.palette || {} });
  return true;
}

export async function getAllProjects() {
  return getAllProjectsFromDb();
}

export async function getAllCollections() {
  return getAllCollectionsFromDb();
}

export async function getAllSelectedWork() {
  return getAllSelectedWorkFromDb();
}

export async function getAllMaterialLibraryItems() {
  return getAllMaterialLibraryItemsFromDb();
}

export async function saveProject(slug: string, data: any) {
  await saveProjectToDb({
    id: data.id,
    title: data.title,
    slug,
    location: data.location,
    areaSqFt: data.areaSqFt,
    heroImageUrl: data.heroImageUrl,
    atmosphereNote: data.atmosphereNote
  });
  return true;
}

export async function saveCollection(slug: string, data: any) {
  const normalizedImageUrls = normalizeImageUrls(
    data?.imageUrls ?? data?.image_urls
  );
  await saveCollectionToDb({
    id: data.id,
    title: data.title,
    slug,
    heroImageUrl: normalizedImageUrls[0] || data.heroImageUrl,
    imageUrls: normalizedImageUrls,
    shortDescription: data.shortDescription
  });
  return true;
}

export async function saveSelectedWork(slug: string, data: any) {
  await saveSelectedWorkToDb({
    id: data.id,
    title: data.title,
    slug,
    heroImageUrl: data.heroImageUrl,
    description: data.description,
    displayOrder: data.displayOrder || 0
  });
  return true;
}

export async function saveMaterialLibraryItem(slug: string, data: any) {
  await saveMaterialLibraryItemToDb({
    id: data.id,
    title: data.title,
    slug,
    heroImageUrl: data.heroImageUrl,
    description: data.description,
    displayOrder: data.displayOrder || 0
  });
  return true;
}

export async function deleteProject(id: string) {
  await deleteProjectFromDb(Number(id));
  return true;
}

export async function deleteCollection(id: string) {
  await deleteCollectionFromDb(Number(id));
  return true;
}

export async function deleteSelectedWork(id: string) {
  await deleteSelectedWorkFromDb(Number(id));
  return true;
}

export async function deleteMaterialLibraryItem(id: string) {
  await deleteMaterialLibraryItemFromDb(Number(id));
  return true;
}
