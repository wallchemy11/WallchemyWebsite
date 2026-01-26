import "server-only";
import fs from "fs";
import path from "path";
import { FALLBACK_IMAGE } from "./hero";

const dataDir = path.join(process.cwd(), "data");

function readJsonFile<T>(filePath: string): T | null {
  try {
    const fullPath = path.join(dataDir, filePath);
    if (!fs.existsSync(fullPath)) return null;
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    const fullPath = path.join(dataDir, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

function applyHeroDefaults(page: any) {
  if (!page) return page;
  if (!page.heroPoster) {
    page.heroPoster = FALLBACK_IMAGE;
  }
  return page;
}

// Page data getters
export async function getHomePage() {
  const page = readJsonFile<any>("pages/home.json");
  if (!page) return null;
  applyHeroDefaults(page);
  const projectsPage = readJsonFile<any>("pages/projects.json") || {};
  const texturesPage = readJsonFile<any>("pages/textures.json") || {};
  
  // Resolve featured projects and collections
  const allProjects = await getAllProjects();
  const allCollections = await getAllCollections();
  
  // If home page has slugs, resolve them
  if (page.selectedProjectSlugs && Array.isArray(page.selectedProjectSlugs) && page.selectedProjectSlugs.length > 0) {
    page.selectedProjects = page.selectedProjectSlugs
      .map((slug: string) => allProjects.find((p: any) => p.slug === slug))
      .filter(Boolean)
      .map((p: any) => ({
        title: p.title,
        slug: p.slug,
        location: p.location,
        areaSqFt: p.area_sq_ft,
        heroImage: p.hero_image_url || projectsPage.defaultProjectImage || FALLBACK_IMAGE
      }));
  } else {
    page.selectedProjects = [];
  }
  
  if (page.textureHighlightSlugs && Array.isArray(page.textureHighlightSlugs) && page.textureHighlightSlugs.length > 0) {
    page.textureHighlights = page.textureHighlightSlugs
      .map((slug: string) => allCollections.find((c: any) => c.slug === slug))
      .filter(Boolean)
      .map((c: any) => ({
        title: c.title,
        slug: c.slug,
        heroImage: c.hero_image_url || texturesPage.defaultCollectionImage || FALLBACK_IMAGE,
        shortDescription: c.short_description
      }));
  } else {
    page.textureHighlights = [];
  }
  
  // Ensure primaryCtas is always an array
  if (!page.primaryCtas || !Array.isArray(page.primaryCtas)) {
    page.primaryCtas = [];
  }
  
  return page;
}

export async function getAboutPage() {
  const page = readJsonFile<any>("pages/about.json");
  if (!page) return null;
  applyHeroDefaults(page);
  if (!page.studioDividerImage) {
    page.studioDividerImage = FALLBACK_IMAGE;
  }
  if (!page.valuesDividerImage) {
    page.valuesDividerImage = FALLBACK_IMAGE;
  }
  return page;
}

export async function getTexturesPage() {
  const page = readJsonFile<any>("pages/textures.json");
  if (!page) return null;
  const defaultCollectionImage = page.defaultCollectionImage || FALLBACK_IMAGE;
  if (!page.dividerImage) {
    page.dividerImage = FALLBACK_IMAGE;
  }
  
  // Load all collections
  const allCollections = await getAllCollections();
  page.collections = allCollections.map((c: any) => ({
    title: c.title,
    slug: c.slug,
    heroImage: c.hero_image_url || defaultCollectionImage,
    shortDescription: c.short_description
  }));
  
  return page;
}

export async function getProcessPage() {
  const page = readJsonFile<any>("pages/process.json");
  if (!page) return null;
  applyHeroDefaults(page);
  if (!page.dividerImage) {
    page.dividerImage = FALLBACK_IMAGE;
  }
  if (Array.isArray(page.steps)) {
    page.steps = page.steps.map((step: any) => {
      if (typeof step === "string") {
        return { title: step, body: page.stepBody || "" };
      }
      return {
        title: step?.title || "",
        body: step?.body || ""
      };
    });
  } else {
    page.steps = [];
  }
  return page;
}

export async function getProjectsPage() {
  const page = readJsonFile<any>("pages/projects.json");
  if (!page) return null;
  const defaultProjectImage = page.defaultProjectImage || FALLBACK_IMAGE;
  const home = readJsonFile<any>("pages/home.json");
  
  // Load all projects
  const allProjects = await getAllProjects();
  const projects = allProjects.map((p: any) => ({
    title: p.title,
    slug: p.slug,
    location: p.location,
    areaSqFt: p.area_sq_ft,
    heroImage: p.hero_image_url || defaultProjectImage,
    atmosphereNote: p.atmosphere_note
  }));
  
  // Featured projects are shared with homepage (Selected Work)
  if (home?.selectedProjectSlugs && Array.isArray(home.selectedProjectSlugs)) {
    page.featuredProjects = home.selectedProjectSlugs
      .map((slug: string) => projects.find((p: any) => p.slug === slug))
      .filter(Boolean);
  } else if (page.featuredProjectSlugs && Array.isArray(page.featuredProjectSlugs)) {
    page.featuredProjects = page.featuredProjectSlugs
      .map((slug: string) => projects.find((p: any) => p.slug === slug))
      .filter(Boolean);
  } else {
    page.featuredProjects = projects.slice(0, 3); // Default: first 3
  }
  
  page.projects = projects;
  applyHeroDefaults(page);
  return page;
}

export async function getContactPage() {
  const page = readJsonFile<any>("pages/contact.json");
  if (!page) return null;
  applyHeroDefaults(page);
  if (!page.dividerImage) {
    page.dividerImage = FALLBACK_IMAGE;
  }
  return page;
}

export async function getSiteSettings() {
  const settings = readJsonFile<any>("settings.json") || {};
  settings.palette = settings.palette || {
    ink: "#0b0a09",
    alabaster: "#f2ede4",
    brass: "#c9a66b",
    smoke: "#8c877f",
    ember: "#a5744f"
  };
  return settings;
}

// Get all projects
export async function getAllProjects() {
  try {
    const projectsPage = readJsonFile<any>("pages/projects.json") || {};
    const defaultProjectImage = projectsPage.defaultProjectImage || FALLBACK_IMAGE;
    const projectsDir = path.join(dataDir, "projects");
    if (!fs.existsSync(projectsDir)) return [];
    
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith(".json"));
    if (files.length === 0) return [];
    
    const projects = files.map((file, idx) => {
      const data = readJsonFile<any>(`projects/${file}`);
      if (!data) return null;
      return {
        id: idx + 1,
        title: data.title,
        slug: data.slug || file.replace(".json", ""),
        location: data.location,
        area_sq_ft: data.areaSqFt,
        hero_image_url: data.heroImageUrl || data.heroImage || defaultProjectImage,
        atmosphere_note: data.atmosphereNote
      };
    }).filter(Boolean);
    return projects;
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

// Get all collections
export async function getAllCollections() {
  try {
    const texturesPage = readJsonFile<any>("pages/textures.json") || {};
    const defaultCollectionImage = texturesPage.defaultCollectionImage || FALLBACK_IMAGE;
    const collectionsDir = path.join(dataDir, "collections");
    if (!fs.existsSync(collectionsDir)) return [];
    
    const files = fs.readdirSync(collectionsDir).filter(f => f.endsWith(".json"));
    if (files.length === 0) return [];
    
    const collections = files.map((file, idx) => {
      const data = readJsonFile<any>(`collections/${file}`);
      if (!data) return null;
      return {
        id: idx + 1,
        title: data.title,
        slug: data.slug || file.replace(".json", ""),
        hero_image_url: data.heroImageUrl || data.heroImage || defaultCollectionImage,
        short_description: data.shortDescription
      };
    }).filter(Boolean);
    return collections;
  } catch (error) {
    console.error("Error loading collections:", error);
    return [];
  }
}

// Admin write functions
export async function saveHomePage(data: any) {
  return writeJsonFile("pages/home.json", data);
}

export async function saveAboutPage(data: any) {
  return writeJsonFile("pages/about.json", data);
}

export async function saveTexturesPage(data: any) {
  return writeJsonFile("pages/textures.json", data);
}

export async function saveProcessPage(data: any) {
  return writeJsonFile("pages/process.json", data);
}

export async function saveProjectsPage(data: any) {
  return writeJsonFile("pages/projects.json", data);
}

export async function saveContactPage(data: any) {
  return writeJsonFile("pages/contact.json", data);
}

export async function saveSiteSettings(data: any) {
  return writeJsonFile("settings.json", data);
}

export async function saveProject(slug: string, data: any) {
  const projectData = {
    title: data.title,
    slug: data.slug || slug,
    location: data.location,
    areaSqFt: data.areaSqFt,
    heroImageUrl: data.heroImageUrl,
    heroImage: data.heroImageUrl, // Legacy support
    atmosphereNote: data.atmosphereNote
  };
  return writeJsonFile(`projects/${data.slug || slug}.json`, projectData);
}

export async function saveCollection(slug: string, data: any) {
  const collectionData = {
    title: data.title,
    slug: data.slug || slug,
    heroImageUrl: data.heroImageUrl,
    heroImage: data.heroImageUrl, // Legacy support
    shortDescription: data.shortDescription
  };
  return writeJsonFile(`collections/${data.slug || slug}.json`, collectionData);
}

export async function deleteProject(id: string | number) {
  try {
    const projects = await getAllProjects();
    const project = projects.find((p: any) => p.id === parseInt(String(id)));
    if (project) {
      const filePath = path.join(dataDir, "projects", `${project.slug}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}

export async function deleteCollection(id: string | number) {
  try {
    const collections = await getAllCollections();
    const collection = collections.find((c: any) => c.id === parseInt(String(id)));
    if (collection) {
      const filePath = path.join(dataDir, "collections", `${collection.slug}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error deleting collection:", error);
    return false;
  }
}
